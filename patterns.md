# Azulejo Pattern Generators - Technical Specification

## Overview
This document specifies the pattern generation algorithms for the Lissabon azulejo tile generator. Each generator creates distinctive visual effects inspired by Portuguese ceramic traditions while maintaining mathematical precision for seamless tiling.

## Core Architecture

### Seed-Based Randomization
All generators use a seeded PRNG (seedrandom.js) ensuring:
- Reproducible results from same seed
- Deterministic variation within parameters
- Consistent behavior across browsers

### SVG Coordinate System
- ViewBox: 0 0 200 200 (tile size)
- Safe area: 10-190 (for borders)
- Pattern area: 15-185

## Pattern Generators

### 1. Geometric Generator
**Description**: Pure geometric shapes arranged in structured patterns

**Sub-patterns**:
- `grid`: Regular grid of shapes
- `diamond`: Diamond grid arrangement
- `hex`: Hexagonal packing
- `triangle`: Triangle tessellation
- `wave`: Wavy line patterns

**Parameters**:
- Shape type: circle, square, triangle, diamond, hexagon
- Grid density: 2-10 cells
- Fill: solid, outline, mixed
- Rotation: 0, 45, 90 degrees

**Algorithm**:
```
1. Calculate cell size based on density
2. For each cell position:
   a. Apply symmetry transforms
   b. Generate base shape
   c. Apply fill/stroke based on parameters
3. Add optional connecting lines
```

### 2. Floral Generator
**Description**: Organic, flower-inspired motifs

**Sub-patterns**:
- `rosette`: Central flower with petals
- `vine`: Flowing vine patterns
- `branch`: Branching organic forms
- `paisley`: Traditional paisley curves

**Parameters**:
- Petal count: 4-12
- Petal shape: round, pointed, wavy
- Center type: dot, circle, star
- Arrangement: radial, linear, scattered

**Algorithm**:
```
1. Generate center point(s)
2. For each petal position (360° / petalCount):
   a. Create petal path using bezier curves
   b. Vary petal size slightly for organic feel
   c. Add vein details if complex
3. Add center decoration
4. Apply symmetry
```

### 3. Ornamental Generator
**Description**: Traditional Portuguese ornamental patterns

**Sub-patterns**:
- `corda`: Rope/chain patterns
- `enxaixo`: Crossed lines
- `arabesque`: Islamic-inspired curves
- `estrelas`: Star patterns

**Parameters**:
- Complexity: 1-5
- Line weight: thin, medium, thick
- Fill: none, partial, full

**Algorithm**:
```
1. Generate primary motifs along paths
2. Add secondary decorative elements
3. Connect with border elements
4. Apply traditional color rules
```

### 4. Striped Generator
**Description**: Linear stripe patterns

**Sub-patterns**:
- `horizontal`: Horizontal lines
- `vertical`: Vertical lines
- `diagonal`: 45-degree lines
- `chevron`: V-shaped patterns
- `wave`: Wavy parallel lines

**Parameters**:
- Stripe width: 2-20px
- Stripe spacing: equal, varied, graduated
- Stripe count: 2-20
- Alternating: yes/no
- Width variation: none, slight, dramatic

**Algorithm**:
```
1. Calculate stripe positions
2. For each stripe:
   a. Determine width and position
   b. Apply color from palette (alternating)
   c. Add end caps at borders
3. Add border decorations
```

### 5. Checker Generator
**Description**: Checkered and grid patterns

**Sub-patterns**:
- `classic`: Simple 2-color checkerboard
- `compound`: Multi-size checkers
- `harlequin`: Diamond checkers
- `frame`: Checkered border with center

**Parameters**:
- Grid size: 2-8
- Checker size: calculated from grid
- Fill patterns: solid, outlined, mixed
- Corner treatment: sharp, rounded

**Algorithm**:
```
1. Calculate checker dimensions
2. For each grid position:
   a. Determine checker color (alternating)
   b. Apply shape (square or diamond)
   c. Handle border cases
3. Add frame if enabled
```

### 6. Radial Generator
**Description**: Circular and radial symmetry patterns

**Sub-patterns**:
- `mandala`: Complex layered mandala
- `sunburst`: Radiating lines
- `target`: Concentric circles
- `spiral`: Spiral arrangements

**Parameters**:
- Fold count: 4, 6, 8, 12
- Layer count: 1-5
- Element type: lines, shapes, mixed
- Center size: small, medium, large

**Algorithm**:
```
1. Define center point (100, 100)
2. For each layer (outer to inner):
   a. Calculate radius
   b. For each fold position:
      i. Generate element
      ii. Apply rotation
3. Add center decoration
```

### 7. Celtic Generator
**Description**: Interlacing knot patterns

**Sub-patterns**:
- `knot`: Single knot
- `braid`: Braided pattern
- `chain`: Linked elements
- ` spiral`: Celtic spirals

**Parameters**:
- Strand count: 2-6
- Cell size: small, medium, large
- Complexity: simple, medium, complex

**Algorithm**:
```
1. Define knot grid
2. Generate weave pattern:
   a. Over/under interlacing
   b. Maintain continuous paths
3. Add terminal ends
4. Apply symmetry
```

### 8. Moroccan Generator
**Description**: Islamic geometric patterns

**Sub-patterns**:
- `zellij`: Traditional tile patterns
- `gidra`: Star and polygon combinations
- `muqarnas`: Honeycomb patterns
- `lattice`: Interlaced geometry

**Parameters**:
- Pattern type: stars, polygons, combined
- Star points: 6, 8, 12
- Density: sparse, medium, dense
- Line weight: fine, medium, bold

**Algorithm**:
```
1. Generate base polygon grid
2. Create star formations at intersections
3. Add connecting lattice
4. Apply traditional color fills
```

### 9. Baroque Generator
**Description**: Complex, ornate traditional patterns

**Sub-patterns**:
- `royal`: Highly elaborate central motif
- `floral-baroque`: Flowing baroque florals
- `scroll`: C-scroll and S-scroll patterns
- `architectural`: Arch and column motifs

**Parameters**:
- Ornament level: 1-5
- Density: minimal, moderate, maximal
- Fill coverage: low, medium, high

**Algorithm**:
```
1. Generate central elaborate motif
2. Add secondary flourishes
3. Build decorative border
4. Layer background patterns
5. Apply gold accent colors
```

### 10. Kaleidoscope Generator
**Description**: Mirrored, rotationally repeated ornamental motifs that resemble kaleidoscopic geometry while maintaining ceramic tile aesthetics.

**Sub-patterns**:
- `geometric`: Geometric shapes in kaleidoscope segments
- `floral`: Petal-based floral kaleidoscope
- `line`: Line-based radiating patterns
- `mosaic`: Mosaic-style varied shapes
- `medallion`: Ceremonial medallion style
- `starburst`: Starburst radiating pattern
- `handmade`: Soft organic curves

**Parameters**:
- Segments: 4-16 (radial repeat count)
- Layers: 1-5 (concentric rings)
- Complexity: low to high detail
- Style: geometric, floral, curved

**Algorithm**:
```
1. Define wedge segment angle (360° / segments)
2. Generate motif inside one segment:
   a. Create geometric or floral elements
   b. Apply layering from center outward
3. Repeat segment radially around center:
   a. Apply rotation transform
   b. Mirror alternating segments if enabled
4. Add center decoration
```

**Use Cases**:
- Strong central feature tiles
- Ceremonial medallion tiles
- Rosette-like radial tiles
- Highly symmetric decorative hero tiles

### 11. Guilloché Generator
**Description**: Refined interlaced line-based ornamental patterns inspired by guilloché engraving, banknote ornament, and medallion linework.

**Sub-patterns**:
- `circular`: Circular guilloché rings
- `medallion`: Center-focused medallion style
- `border`: Border-concentrated guilloché
- `oval`: Elliptical guilloché frames
- `radial`: Radial petal-based guilloché
- `spirograph`: Spirograph-like ornamental loops
- `ribbon`: Broad ribbon-style curves
- `engraved`: Fine parallel engraved lines

**Parameters**:
- Ring count: 2-6 concentric rings
- Frequency: harmonic oscillation rate
- Amplitude: wave height
- Line density: sparse to dense
- Style: strict geometric to soft organic

**Algorithm**:
```
1. Define base curve (circle, oval, or path)
2. Apply harmonic modulation:
   a. Calculate offset using sin/cos waves
   b. Vary frequency and amplitude
3. Generate multiple interleaved curves
4. Add center medallion if enabled
5. Apply engraving-style parallel lines
```

**Use Cases**:
- Ultra-refined center medallions
- Elegant border decoration
- Delicate line-heavy premium tile series
- Luxury monochrome engraving styles

### 12. Lace / Filigree Generator
**Description**: Fine ornamental lace-like structures and delicate decorative tracery.

**Sub-patterns**:
- `delicate`: Fine lines with small details
- `filigree`: Intricate scrollwork patterns
- `web`: Lace web connections
- `floral-lace`: Floral lace patterns
- `geometric-lace`: Angular lace structures

**Parameters**:
- Density: thread count
- Loop size: individual element size
- Openness: spacing between elements

**Use Cases**:
- Luxury overlays
- Border detailing
- Corner flourishes

### 13. Interlace / Knotwork Generator
**Description**: Woven, braided, and crossing ornamental bands with over-under logic.

**Sub-patterns**:
- `braid`: Braided weave pattern
- `celtic-knot`: Celtic knot style
- `chain`: Chain link interlace
- `basket`: Basket weave grid
- `diagonal-weave`: Diagonal interlocking

**Parameters**:
- Band count: 2-6 strands
- Crossing frequency: weave density
- Braid tightness: curve amplitude

**Use Cases**:
- Borders
- Full-tile woven patterns
- Central knot medallions

### 14. Tessellation Generator
**Description**: Dense repeated micro-motifs that create decorative tessellated fields.

**Sub-patterns**:
- `diamonds`: Diamond grid field
- `stars`: Star pattern field
- `hex-grid`: Hexagonal grid
- `triangles`: Triangle mesh
- `octagons`: Octagon with square centers

**Parameters**:
- Cell size: small to large
- Density: sparse to dense
- Fill: outlined, filled, mixed

**Use Cases**:
- Background textures
- Secondary layers behind centerpieces

### 15. Chisel / Engraved Generator
**Description**: Incised, etched, engraved-looking line ornament with depth simulation.

**Sub-patterns**:
- `lines`: Chiseled parallel lines
- `hatching`: Hatching pattern
- `crosshatch`: Cross-hatching
- `carving`: Carved concentric details

**Parameters**:
- Line count: sparse to dense
- Hatching angle: direction
- Depth effect: shadow offset

**Use Cases**:
- Monochrome luxury tiles
- Vintage ceramic reinterpretations

### 16. Ribbon Generator
**Description**: Flowing ribbon-like decorative bands that curve, loop, and frame.

**Sub-patterns**:
- `flowing`: Curved flowing ribbons
- `twist`: Twisting ribbon paths
- `frame`: Ribbon frame around tile
- `bouquet`: Radiating ribbon bundle

**Parameters**:
- Ribbon count: 1-6 bands
- Curvature: gentle to dramatic
- Width: thin to broad

**Use Cases**:
- Frame motifs
- Dramatic center compositions

### 17. Petal Field Generator
**Description**: Repeated petal-, lobe-, or floral-unit based fields.

**Sub-patterns**:
- `rosette`: Central rosette with petals
- `overlapping`: Layered overlapping petals
- `fan`: Fan-shaped arrangement
- `layered`: Multiple petal layers

**Parameters**:
- Petal count: 6-16
- Elongation: round to pointed
- Layer count: 1-4

**Use Cases**:
- Floral azulejo reinterpretations
- Medallion centers

### 18. Lattice Generator
**Description**: Decorative structural grids, trellises, and ornamental line lattices.

**Sub-patterns**:
- `diamond-lattice`: Diamond grid
- `arc-lattice`: Curved arc trellis
- `star-lattice`: Star intersection lattice
- `trellis`: Garden trellis curves

**Parameters**:
- Cell size: grid density
- Line width: structural weight
- Curvature: straight to curved

**Use Cases**:
- Structured backgrounds
- Geometric support layers

### 19. Halo / Concentric Generator
**Description**: Layered concentric ornament systems with rings, echoes, and repeated bands.

**Sub-patterns**:
- `concentric`: Simple concentric rings
- `scalloped`: Scalloped edge rings
- `echo`: Repeating echo lines
- `medallion-halo`: Mixed ornament rings

**Parameters**:
- Ring count: 3-7
- Ring spacing: tight to loose
- Decoration: dots, lines, mixed

**Use Cases**:
- Hero medallions
- Ceremonial centerpiece tiles

## Symmetry Modes

### None
- Free placement of elements
- Random scattering allowed
- No transformations applied

### Horizontal Mirror (Reflection)
- Reflect across vertical center axis
- Elements duplicated and flipped

### Vertical Mirror (Reflection)
- Reflect across horizontal center axis
- Elements duplicated and flipped

### Quadruple Mirror (Both)
- Apply both horizontal and vertical reflection
- Creates 4-fold reflection symmetry

### 4-Fold Rotational
- Rotate 90° increments
- Creates kaleidoscope effect
- Elements appear 4 times

### 8-Fold Radial
- Rotate 45° increments
- Creates mandala effect
- Elements appear 8 times

## Border Styles

### Simple Border
- Single line rectangle
- Configurable width and color

### Double Border
- Two parallel lines
- Optional gap fill

### Ornate Border
- Corner flourishes
- Decorative end caps
- Patterned line fills

## Color Rules

### Traditional Portuguese Palette
```javascript
{
  azul: ['#1e3c72', '#2a5298', '#3b82f6'],
  branco: ['#ffffff', '#f8f8f8'],
  verde: ['#228b22', '#2e8b57'],
  amarelo: ['#ffd700', '#d4af37'],
  vermelho: ['#dc143c', '#b22222'],
  preto: ['#1a1a1a', '#2d2d2d'],
  terracota: ['#cd853f', '#bc8f8f']
}
```

### Color Application Rules
1. Background: Always use single solid color
2. Foreground: Cycle through palette colors
3. Accents: Use gold/yellow sparingly
4. Outlines: Use darker shade of fill
5. Symmetry: Maintain color consistency across mirrors

## Output Format

### SVG Structure
```xml
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Reusable patterns, gradients, filters -->
  </defs>
  <g class="background">
    <!-- Background rect -->
  </g>
  <g class="pattern">
    <!-- Main pattern elements -->
  </g>
  <g class="borders">
    <!-- Border elements -->
  </g>
  <g class="corners">
    <!-- Corner decorations -->
  </g>
</svg>
```

### Quality Requirements
- Clean, valid SVG output
- Proper grouping for editing
- Appropriate stroke widths
- Consistent color application
- No overlapping artifacts
- Tiling-compatible edges
