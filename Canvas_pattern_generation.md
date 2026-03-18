# Canvas Pattern Generation - Implementation and Algorithm Documentation

## Purpose
This document describes the current Canvas View implementation in the Lissabon project, with a focus on how a multi-tile SVG canvas is generated from selected tile assets.

It covers:
- UI inputs and state used by the algorithm
- End-to-end generation flow
- Cluster-based placement logic
- Rotation, flipping, and overlap transforms
- SVG rendering pipeline
- Export behavior
- Source code excerpts from the current implementation

## Implementation Location
Main implementation is in:
- `js/app.js`

Key Canvas functions:
- `showCanvasView()`
- `loadTileGallery()`
- `toggleTileSelection()`
- `generateCanvas()`
- `placeCluster()`
- `renderCanvasSVG()`
- `regenerateCanvas()`
- `exportCanvasSVG()`
- `exportCanvasPNG()`
- `exportLargePNG()`

Canvas UI controls are defined in:
- `index.html` (Canvas Settings, Tile Selection, Border, Export sections)

## Canvas Generation Model

### 1. Input Tile Pool
Canvas generation starts from the user-selected tiles in:
- `App.canvasState.selectedTiles`

Each selected entry stores:
- `name`: tile file name
- `content`: raw SVG string

The gallery is populated via `loadTileGallery()` by fetching files from `tiles/`.

### 2. Seeded Randomness (Deterministic Run)
Canvas generation uses:
```js
const rng = new Math.seedrandom(this.canvasState.seed);
```
This means a given seed and identical settings produce the same layout and transforms.

`regenerateCanvas()` sets a new seed using `Date.now()` and re-runs generation.

### 3. Grid Representation
`generateCanvas()` creates a 2D array:
```js
const grid = Array(height).fill().map(() => Array(width).fill(null));
```

Each non-null cell later becomes:
```js
{
  content: tile.content,
  transform: "...",        // rotation/flip transforms
  overlapTransform: "..."  // optional translation overlap
}
```

## End-to-End Algorithm

### Step A: Validate Selection
If no tiles are selected, generation is aborted with a warning toast.

### Step B: Read Canvas Controls
Values read from DOM:
- Width and height in tile units (`canvasWidth`, `canvasHeight`)
- Cluster max size (`clusterSize`)
- Cluster spread probability (`clusterProb` as 0-1)
- Rotation enable (`allowRotation`)
- Flip enable (`allowFlip`)
- Overlap probability (`overlap` as 0-1)

### Step C: Fill Grid via Random Cluster Placement
The algorithm repeatedly picks random empty cells until all cells are filled:
1. Pick random empty coordinate `(r, c)`.
2. Pick one random tile from selected tile pool.
3. Pick random cluster target size in `[1, clusterSize]`.
4. Call `placeCluster(...)` to paint neighboring cells with the same tile, with probabilistic growth.
5. Recount filled cells and continue.

This creates natural patches (clusters) rather than strictly uniform random per-cell assignment.

### Step D: Render Composite SVG
`renderCanvasSVG(grid, width, height)` converts the grid into one large SVG by:
- Creating root canvas SVG sized at `width * 100` by `height * 100`
- Parsing each tile SVG string with `DOMParser`
- Extracting inner tile content
- Injecting each tile into a translated group per cell
- Applying optional overlap and orientation transforms
- Adding optional outer canvas border
- Adding tile-separator lines (grid lines)

### Step E: Save and Preview
Result is stored in:
- `this.canvasState.currentCanvasSVG`

And displayed in:
- `#canvasPreview`

## Cluster Placement Algorithm (`placeCluster`)

The placement method is queue-based (BFS-like) and local-neighbor driven.

### Core behavior
- Start queue with seed cell.
- While queue not empty and cluster not at target size:
1. Pop next position.
2. If cell is empty, place tile there.
3. Randomly enqueue orthogonal neighbors (up/down/left/right) with probability `prob`.

### Consequences
- Higher `clusterProb` creates larger contiguous regions.
- Lower `clusterProb` creates fragmented textures.
- Realized cluster size can be smaller than requested if expansion dies out.

## Transform System

### 1. Rotation
If enabled, rotation is selected from strict 90-degree increments:
- `0`, `90`, `180`, `270`

Applied around local tile center `(50, 50)` in the cell space.

### 2. Flip
If enabled, horizontal and vertical flips are independently applied with 50% chance each:
- `scale(-1, 1) translate(-100, 0)`
- `scale(1, -1) translate(0, -100)`

### 3. Overlap Translation
If overlap is triggered (with probability `overlapProb`), one translation offset is chosen from a predefined set, for example:
- Half-cell shifts: `(50, 0)`, `(0, 50)`, etc.
- Quarter-like shifts: `(25, 0)`, `(0, 25)`, `(75, 0)`, `(0, 75)`
- Smaller offsets: `(12.5, 12.5)`, `(37.5, 37.5)`

Important detail: overlap does not mean two different tiles share one cell object; it means the rendered tile in that cell is translated, so it visually intrudes into neighboring area.

## SVG Rendering Details

`renderCanvasSVG()` uses `tileSize = 100` for each canvas cell. For every filled cell:
1. Parse the tile SVG string.
2. Extract all root children from the tile SVG.
3. Wrap in `<g transform="translate(x, y)">` based on grid position.
4. Apply `overlapTransform` then `transform` if present.

After tile content:
- Optional canvas border is drawn if enabled.
- Tile border lines are always drawn between rows/columns using `canvasTileBorderColor`.
- Background color uses current generator `bgColor` control.

## Source Code Excerpts (Current Implementation)

### A. `generateCanvas()`
```js
generateCanvas() {
    if (this.canvasState.selectedTiles.length === 0) {
        this.showToast('Please select at least one tile', 'warning');
        return;
    }

    const width = parseInt(document.getElementById('canvasWidth').value) || 16;
    const height = parseInt(document.getElementById('canvasHeight').value) || 9;
    const clusterSize = parseInt(document.getElementById('clusterSize').value) || 4;
    const clusterProb = (parseInt(document.getElementById('clusterProb').value) || 60) / 100;
    const allowRotation = document.getElementById('allowRotation').checked;
    const allowFlip = document.getElementById('allowFlip').checked;
    const overlapProb = (parseInt(document.getElementById('overlap')?.value) || 0) / 100;

    const rng = new Math.seedrandom(this.canvasState.seed);

    const grid = Array(height).fill().map(() => Array(width).fill(null));
    const totalCells = width * height;
    let filledCells = 0;

    while (filledCells < totalCells) {
        let r, c;
        do {
            r = Math.floor(rng() * height);
            c = Math.floor(rng() * width);
        } while (grid[r][c] !== null);

        const tileIndex = Math.floor(rng() * this.canvasState.selectedTiles.length);
        const tile = this.canvasState.selectedTiles[tileIndex];

        const currentClusterSize = Math.floor(rng() * clusterSize) + 1;

        this.placeCluster(grid, r, c, tile, currentClusterSize, clusterProb, rng, allowRotation, allowFlip, overlapProb);

        filledCells = grid.flat().filter(cell => cell !== null).length;
    }

    const canvasSVG = this.renderCanvasSVG(grid, width, height);
    this.canvasState.currentCanvasSVG = canvasSVG;
    canvasPreview.innerHTML = canvasSVG;
}
```

### B. `placeCluster()`
```js
placeCluster(grid, r, c, tile, size, prob, rng, allowRotation, allowFlip, overlapProb) {
    const height = grid.length;
    const width = grid[0].length;

    const queue = [[r, c]];
    let placed = 0;

    while (queue.length > 0 && placed < size) {
        const [currR, currC] = queue.shift();

        if (grid[currR][currC] === null) {
            let transform = '';
            if (allowRotation) {
                const rotations = [0, 90, 180, 270];
                const rot = rotations[Math.floor(rng() * rotations.length)];
                if (rot !== 0) transform += `rotate(${rot}, 50, 50) `;
            }
            if (allowFlip) {
                if (rng() > 0.5) transform += `scale(-1, 1) translate(-100, 0) `;
                if (rng() > 0.5) transform += `scale(1, -1) translate(0, -100) `;
            }

            let overlapTransform = '';
            if (rng() < overlapProb) {
                const offsets = [
                    { x: 50, y: 0 }, { x: -50, y: 0 }, { x: 0, y: 50 }, { x: 0, y: -50 },
                    { x: 50, y: 50 }, { x: -50, y: 50 }, { x: 50, y: -50 }, { x: -50, y: -50 },
                    { x: 25, y: 0 }, { x: 75, y: 0 }, { x: 0, y: 25 }, { x: 0, y: 75 },
                    { x: 12.5, y: 12.5 }, { x: 37.5, y: 37.5 }
                ];
                const offset = offsets[Math.floor(rng() * offsets.length)];
                overlapTransform = `translate(${offset.x}, ${offset.y})`;
            }

            grid[currR][currC] = {
                content: tile.content,
                transform: transform.trim(),
                overlapTransform: overlapTransform
            };
            placed++;

            const neighbors = [[currR-1, currC], [currR+1, currC], [currR, currC-1], [currR, currC+1]];
            for (let i = neighbors.length - 1; i > 0; i--) {
                const j = Math.floor(rng() * (i + 1));
                [neighbors[i], neighbors[j]] = [neighbors[j], neighbors[i]];
            }

            for (const [nR, nC] of neighbors) {
                if (nR >= 0 && nR < height && nC >= 0 && nC < width && grid[nR][nC] === null) {
                    if (rng() < prob) {
                        queue.push([nR, nC]);
                    }
                }
            }
        }
    }
}
```

### C. `renderCanvasSVG()`
```js
renderCanvasSVG(grid, width, height) {
    const tileSize = 100;
    const canvasWidth = width * tileSize;
    const canvasHeight = height * tileSize;

    let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${canvasWidth} ${canvasHeight}" width="${canvasWidth}" height="${canvasHeight}">`;

    const bgColor = document.getElementById('bgColor').value || '#ffffff';
    svgContent += `<rect width="100%" height="100%" fill="${bgColor}" />`;

    const parser = new DOMParser();

    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            const cell = grid[r][c];
            if (cell) {
                const doc = parser.parseFromString(cell.content, 'image/svg+xml');
                const svgRoot = doc.documentElement;
                let innerContent = '';

                for (const child of svgRoot.childNodes) {
                    innerContent += new XMLSerializer().serializeToString(child);
                }

                const x = c * tileSize;
                const y = r * tileSize;

                svgContent += `<g transform="translate(${x}, ${y})">`;
                let transform = '';
                if (cell.overlapTransform) transform += cell.overlapTransform + ' ';
                if (cell.transform) transform += cell.transform;

                if (transform.trim()) {
                    svgContent += `<g transform="${transform.trim()}">${innerContent}</g>`;
                } else {
                    svgContent += innerContent;
                }
                svgContent += `</g>`;
            }
        }
    }

    const enableCanvasBorder = document.getElementById('enableCanvasBorder')?.checked;
    if (enableCanvasBorder) {
        const canvasBorderColor = document.getElementById('canvasBorderColor')?.value || '#1e3c72';
        const canvasBorderWidth = parseInt(document.getElementById('canvasBorderWidth')?.value) || 10;

        svgContent += `<rect x="${canvasBorderWidth/2}" y="${canvasBorderWidth/2}" width="${canvasWidth - canvasBorderWidth}" height="${canvasHeight - canvasBorderWidth}" fill="none" stroke="${canvasBorderColor}" stroke-width="${canvasBorderWidth}" />`;
    }

    const canvasTileBorderColor = document.getElementById('canvasTileBorderColor')?.value || '#ffffff';
    for (let i = 1; i < width; i++) {
        const x = i * tileSize;
        svgContent += `<line x1="${x}" y1="0" x2="${x}" y2="${canvasHeight}" stroke="${canvasTileBorderColor}" stroke-width="1" />`;
    }
    for (let i = 1; i < height; i++) {
        const y = i * tileSize;
        svgContent += `<line x1="0" y1="${y}" x2="${canvasWidth}" y2="${y}" stroke="${canvasTileBorderColor}" stroke-width="1" />`;
    }

    svgContent += `</svg>`;
    return svgContent;
}
```

## Algorithm Characteristics

### Visual Characteristics
- Produces patchy, natural-looking tile distributions due to local cluster growth.
- Preserves coherent motifs when cluster settings are high.
- Supports controlled variation through seeded random transforms.

### Complexity
Let `N = width * height`.
- Grid fill loop aims to fill all N cells.
- Cluster placement is bounded by chosen cluster size and available neighbors.
- Rendering iterates all N cells and parses each used tile SVG.

Approximate runtime behavior is near linear in N for typical settings, with extra constant overhead from SVG parsing and serialization.

## Current Behavior Notes and Constraints
- Tile cell size in canvas render is fixed to `100` units.
- Overlap is translation-based per cell, not multi-occupancy of a single grid index.
- The generation loop recomputes `filledCells` by flatten/filter each iteration; this is simple and correct but not the most optimized approach.
- Background color is inherited from the standard tile generator background control (`bgColor`).
- Tile separator lines are always drawn in current implementation.

## Summary
The Canvas View uses a seeded, stochastic cluster-growth algorithm over a tile grid, then composes selected tile SVGs into a single large SVG with optional orientation and overlap transforms. The result is deterministic per seed while still visually organic, making it suitable for repeatable decorative wall/floor-style pattern generation.
