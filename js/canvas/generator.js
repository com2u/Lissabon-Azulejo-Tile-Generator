/**
 * Canvas Generator Module
 * Generates canvas layouts from tiles.
 * 
 * ARCHITECTURE ROLE:
 * - Core engine for multi-tile canvas layouts.
 * - Implements clustering, rotation, and overlapping algorithms.
 * - Renders the final grid into a single large SVG.
 * 
 * DEPENDENCIES:
 * - js/seedrandom.js (Math.seedrandom) - Seeded RNG for reproducible layouts.
 * - js/ui/canvasGenerator.js (CanvasGeneratorUI) - UI controller for this engine.
 */

const CanvasGenerator = {
    // Place a cluster of same tiles
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
                    if (rot !== 0) transform += `rotate(${rot}, 100, 100) `;
                }
                if (allowFlip) {
                    if (rng() > 0.5) transform += `scale(-1, 1) translate(-200, 0) `;
                    if (rng() > 0.5) transform += `scale(1, -1) translate(0, -200) `;
                }

                let overlapTransform = '';
                if (rng() < overlapProb) {
                    const offsets = [
                        { x: 100, y: 0 }, { x: -100, y: 0 }, { x: 0, y: 100 }, { x: 0, y: -100 },
                        { x: 100, y: 100 }, { x: -100, y: 100 }, { x: 100, y: -100 }, { x: -100, y: -100 },
                        { x: 50, y: 0 }, { x: 150, y: 0 }, { x: 0, y: 50 }, { x: 0, y: 150 },
                        { x: 25, y: 25 }, { x: 75, y: 75 }
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
    },
    
    // Generate canvas grid (Clustered algorithm)
    generate(selectedTiles, width, height, clusterSize, clusterProb, allowRotation, allowFlip, overlapProb, seed) {
        // Initialize RNG
        let rng;
        const seedStr = (seed !== undefined && seed !== null) ? seed.toString() : Date.now().toString();
        
        if (typeof Math.seedrandom === 'function') {
            Math.seedrandom(seedStr);
            rng = { random: () => Math.random() };
        } else if (typeof window.seedrandom === 'function') {
            const sr = new window.seedrandom(seedStr);
            rng = { random: () => sr() };
        } else {
            let s = parseInt(seedStr) || Date.now();
            rng = {
                random: () => {
                    s = (s * 9301 + 49297) % 233280;
                    return s / 233280;
                }
            };
        }
        
        // Create grid
        const grid = Array(height).fill().map(() => Array(width).fill(null));
        const totalCells = width * height;
        let filledCells = 0;
        
        // Natural random placement algorithm
        while (filledCells < totalCells) {
            let r, c;
            do {
                r = Math.floor(rng.random() * height);
                c = Math.floor(rng.random() * width);
            } while (grid[r][c] !== null);
            
            const tileIndex = Math.floor(rng.random() * selectedTiles.length);
            const tile = selectedTiles[tileIndex];
            
            const currentClusterSize = Math.floor(rng.random() * clusterSize) + 1;
            
            this.placeCluster(grid, r, c, tile, currentClusterSize, clusterProb, rng.random, allowRotation, allowFlip, overlapProb);
            
            filledCells = grid.flat().filter(cell => cell !== null).length;
        }
        
        return grid;
    },

    // Generate canvas grid (New Pattern algorithm from Canvas_pattern_generation.md)
    generatePattern(selectedTiles, width, height, clusterSize, clusterProb, allowRotation, allowFlip, overlapProb, seed) {
        if (selectedTiles.length === 0) return null;

        // Initialize RNG - using Math.seedrandom as per documentation
        const seedStr = (seed !== undefined && seed !== null) ? seed.toString() : Date.now().toString();
        const rng = new Math.seedrandom(seedStr);

        const grid = Array(height).fill().map(() => Array(width).fill(null));
        const totalCells = width * height;
        let filledCells = 0;

        while (filledCells < totalCells) {
            let r, c;
            do {
                r = Math.floor(rng() * height);
                c = Math.floor(rng() * width);
            } while (grid[r][c] !== null);

            const tileIndex = Math.floor(rng() * selectedTiles.length);
            const tile = selectedTiles[tileIndex];

            const currentClusterSize = Math.floor(rng() * clusterSize) + 1;

            this.placeClusterPattern(grid, r, c, tile, currentClusterSize, clusterProb, rng, allowRotation, allowFlip, overlapProb);

            filledCells = grid.flat().filter(cell => cell !== null).length;
        }

        return grid;
    },

    // Place a cluster (New Pattern version)
    placeClusterPattern(grid, r, c, tile, size, prob, rng, allowRotation, allowFlip, overlapProb) {
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
    },
    
    // Generate procedural canvas grid (Old algorithm)
    generateProcedural(width, height, seed) {
        const grid = Array(height).fill().map(() => Array(width).fill(null));
        
        // Get current parameters from the main generator
        const baseParams = typeof Params !== 'undefined' ? Params.get() : {};
        
        for (let r = 0; r < height; r++) {
            for (let c = 0; c < width; c++) {
                const tileSeed = seed + (r * width) + c;
                const tileParams = { ...baseParams, seed: tileSeed, showGrid: false };
                
                // Generate a unique tile for this cell
                const content = typeof TileGenerator !== 'undefined' ? TileGenerator.generate(tileParams) : '';
                
                grid[r][c] = {
                    content: content,
                    transform: '',
                    overlapTransform: ''
                };
            }
        }
        
        return grid;
    },
    
    // Render the grid to a single SVG
    render(grid, width, height, bgColor, enableCanvasBorder, canvasBorderColor, canvasBorderWidth, canvasTileBorderColor, isPattern = false) {
        const tileSize = isPattern ? 100 : 200;
        const canvasWidth = width * tileSize;
        const canvasHeight = height * tileSize;
        
        let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${canvasWidth} ${canvasHeight}" width="${canvasWidth}" height="${canvasHeight}">`;
        
        // Add a background rect
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
        
        // Add canvas border if enabled
        if (enableCanvasBorder) {
            svgContent += `<rect x="${canvasBorderWidth/2}" y="${canvasBorderWidth/2}" width="${canvasWidth - canvasBorderWidth}" height="${canvasHeight - canvasBorderWidth}" fill="none" stroke="${canvasBorderColor}" stroke-width="${canvasBorderWidth}" />`;
        }

        // Add tile borders (grid lines)
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
};

// Export for use in other modules
window.CanvasGenerator = CanvasGenerator;
