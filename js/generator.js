/**
 * Generator.js - Tile Pattern Generation Engine
 * Core SVG generation logic for all pattern types
 */

const Generator = {
    // Tile dimensions
    TILE_SIZE: 200,
    SAFE_AREA: 10,
    PATTERN_AREA: 15,
    
    // Current PRNG
    rng: null,
    
    // Initialize with seed
    init(seed) {
        const seedStr = (seed !== undefined && seed !== null) ? seed.toString() : Date.now().toString();
        
        // Use seedrandom library
        if (typeof Math.seedrandom === 'function') {
            Math.seedrandom(seedStr);
            this.rng = null;
        } else if (typeof window.seedrandom === 'function') {
            this.rng = new window.seedrandom(seedStr);
        } else {
            // Fallback to Math.random
            let s = parseInt(seedStr) || Date.now();
            this.rng = {
                random: () => {
                    s = (s * 9301 + 49297) % 233280;
                    return s / 233280;
                }
            };
        }
    },
    
    // Random number helper
    random() {
        return this.rng ? this.rng.random() : Math.random();
    },
    
    // Random integer in range
    randInt(min, max) {
        return Math.floor(this.random() * (max - min + 1)) + min;
    },
    
    // Random item from array
    randItem(arr) {
        return arr[Math.floor(this.random() * arr.length)];
    },
    
    // Get color from palette
    getColor(palette, index = null) {
        if (index !== null) {
            return palette[index % palette.length];
        }
        return this.randItem(palette);
    },
    
    // Generate the complete tile SVG
    generate(params) {
        // Initialize RNG
        this.init(params.seed);
        
        // Get parameters
        const {
            patternType,
            subPattern,
            bgColor,
            palette,
            strokeWidth,
            fillOpacity,
            complexity,
            symmetry,
            enableBorder,
            borderStyle,
            borderColor,
            borderWidth,
            borderOpacity,
            enableCorners,
            cornerStyle,
            cornerStrokeWidth,
            cornerOpacity,
            enableCenter,
            centerType,
            centerSize,
            centerStrokeWidth,
            centerOpacity
        } = params;
        
        // Create SVG
        let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">`;
        
        // Defs
        svg += `<defs>`;
        svg += `</defs>`;
        
        // Background
        svg += `<rect width="200" height="200" fill="${bgColor}"/>`;
        
        // Pattern group
        svg += `<g class="pattern">`;
        
        // Generate base pattern
        svg += this.generatePattern(patternType, subPattern, palette, strokeWidth, fillOpacity, complexity, symmetry);
        
        svg += `</g>`;
        
        // Centerpiece
        if (enableCenter && centerType !== 'none') {
            svg += this.generateCenterpiece(centerType, palette, strokeWidth, fillOpacity, centerSize, centerStrokeWidth, centerOpacity);
        }
        
        // Corners
        if (enableCorners && cornerStyle !== 'none') {
            svg += this.generateCorners(cornerStyle, palette, strokeWidth, cornerStrokeWidth, cornerOpacity);
        }
        
        // Border
        if (enableBorder) {
            svg += this.generateBorder(borderStyle, borderColor, borderWidth, borderOpacity);
        }
        
        svg += `</svg>`;
        
        return svg;
    },
    
    // Generate main pattern
    generatePattern(type, subType, palette, strokeWidth, fillOpacity, complexity, symmetry) {
        let pattern = '';
        const hasSymmetry = symmetry && symmetry !== 'none';
        
        // Generate base elements
        switch (type) {
            case 'geometric':
                pattern = this.generateGeometric(subType, palette, strokeWidth, fillOpacity, complexity, hasSymmetry ? symmetry : 'none');
                break;
            case 'floral':
                pattern = this.generateFloral(subType, palette, strokeWidth, fillOpacity, complexity, hasSymmetry ? symmetry : 'none');
                break;
            case 'ornamental':
                pattern = this.generateOrnamental(subType, palette, strokeWidth, fillOpacity, complexity, hasSymmetry ? symmetry : 'none');
                break;
            case 'striped':
                pattern = this.generateStriped(subType, palette, strokeWidth, fillOpacity, complexity, hasSymmetry ? symmetry : 'none');
                break;
            case 'checker':
                pattern = this.generateChecker(subType, palette, strokeWidth, fillOpacity, complexity, hasSymmetry ? symmetry : 'none');
                break;
            case 'radial':
                pattern = this.generateRadial(subType, palette, strokeWidth, fillOpacity, complexity, hasSymmetry ? symmetry : 'none');
                break;
            case 'celtic':
                pattern = this.generateCeltic(subType, palette, strokeWidth, fillOpacity, complexity, hasSymmetry ? symmetry : 'none');
                break;
            case 'moroccan':
                pattern = this.generateMoroccan(subType, palette, strokeWidth, fillOpacity, complexity, hasSymmetry ? symmetry : 'none');
                break;
            case 'baroque':
                pattern = this.generateBaroque(subType, palette, strokeWidth, fillOpacity, complexity, hasSymmetry ? symmetry : 'none');
                break;
            // NEW ADVANCED GENERATOR FAMILIES
            case 'kaleidoscope':
                pattern = this.generateKaleidoscope(subType, palette, strokeWidth, fillOpacity, complexity, hasSymmetry ? symmetry : 'none');
                break;
            case 'guilloché':
                pattern = this.generateGuilloche(subType, palette, strokeWidth, fillOpacity, complexity, hasSymmetry ? symmetry : 'none');
                break;
            case 'lace':
                pattern = this.generateLace(subType, palette, strokeWidth, fillOpacity, complexity, hasSymmetry ? symmetry : 'none');
                break;
            case 'interlace':
                pattern = this.generateInterlace(subType, palette, strokeWidth, fillOpacity, complexity, hasSymmetry ? symmetry : 'none');
                break;
            case 'tessellation':
                pattern = this.generateTessellation(subType, palette, strokeWidth, fillOpacity, complexity, hasSymmetry ? symmetry : 'none');
                break;
            case 'chisel':
                pattern = this.generateChisel(subType, palette, strokeWidth, fillOpacity, complexity, hasSymmetry ? symmetry : 'none');
                break;
            case 'ribbon':
                pattern = this.generateRibbon(subType, palette, strokeWidth, fillOpacity, complexity, hasSymmetry ? symmetry : 'none');
                break;
            case 'petal':
                pattern = this.generatePetal(subType, palette, strokeWidth, fillOpacity, complexity, hasSymmetry ? symmetry : 'none');
                break;
            case 'lattice':
                pattern = this.generateLattice(subType, palette, strokeWidth, fillOpacity, complexity, hasSymmetry ? symmetry : 'none');
                break;
            case 'halo':
                pattern = this.generateHalo(subType, palette, strokeWidth, fillOpacity, complexity, hasSymmetry ? symmetry : 'none');
                break;
            default:
                pattern = this.generateGeometric('grid', palette, strokeWidth, fillOpacity, complexity, 'none');
        }
        
        // Apply symmetry transformations
        if (hasSymmetry) {
            return this.applySymmetry(pattern, symmetry);
        }
        
        return pattern;
    },
    
    // Apply symmetry transformation
    applySymmetry(pattern, symmetry) {
        if (!pattern || symmetry === 'none' || symmetry === undefined) {
            return pattern;
        }
        
        // Parse the pattern to extract elements and apply transformations
        // The tile is 200x200, center is at 100,100
        // Pattern area is 15-185
        
        // For symmetry, we generate a base pattern and transform it
        // We'll wrap in a group and use transforms
        
        let transformedPattern = '';
        
        switch (symmetry) {
            case 'horizontal':
                // Mirror left to right
                transformedPattern = `<g class="symmetry-horizontal">`;
                transformedPattern += pattern; // Original (left half)
                // Mirror horizontally across center (100, 100)
                transformedPattern += `<g transform="translate(200, 0) scale(-1, 1)">${pattern}</g>`;
                transformedPattern += `</g>`;
                break;
                
            case 'vertical':
                // Mirror top to bottom
                transformedPattern = `<g class="symmetry-vertical">`;
                transformedPattern += pattern; // Original (top half)
                // Mirror vertically across center (100, 100)
                transformedPattern += `<g transform="translate(0, 200) scale(1, -1)">${pattern}</g>`;
                transformedPattern += `</g>`;
                break;
                
            case 'both':
                // Quadruple: mirror both horizontally and vertically
                transformedPattern = `<g class="symmetry-both">`;
                transformedPattern += pattern; // Top-left (original)
                // Mirror horizontally (top-right)
                transformedPattern += `<g transform="translate(200, 0) scale(-1, 1)">${pattern}</g>`;
                // Mirror vertically (bottom-left)
                transformedPattern += `<g transform="translate(0, 200) scale(1, -1)">${pattern}</g>`;
                // Mirror both (bottom-right)
                transformedPattern += `<g transform="translate(200, 200) scale(-1, -1)">${pattern}</g>`;
                transformedPattern += `</g>`;
                break;
                
            case 'rotational':
                // 4-fold rotational symmetry (90 degree rotations)
                transformedPattern = `<g class="symmetry-rotational">`;
                transformedPattern += pattern; // 0 degrees
                // 90 degrees
                transformedPattern += `<g transform="rotate(90, 100, 100)">${pattern}</g>`;
                // 180 degrees
                transformedPattern += `<g transform="rotate(180, 100, 100)">${pattern}</g>`;
                // 270 degrees
                transformedPattern += `<g transform="rotate(270, 100, 100)">${pattern}</g>`;
                transformedPattern += `</g>`;
                break;
                
            case 'radial':
                // 8-fold radial symmetry (45 degree rotations)
                transformedPattern = `<g class="symmetry-radial">`;
                transformedPattern += pattern; // 0 degrees
                // 45, 90, 135, 180, 225, 270, 315 degrees
                for (let angle = 45; angle < 360; angle += 45) {
                    transformedPattern += `<g transform="rotate(${angle}, 100, 100)">${pattern}</g>`;
                }
                transformedPattern += `</g>`;
                break;
            
            case 'diagonal-falling':
                // Mirror along the falling diagonal (top-left to bottom-right)
                // This mirrors the top-right half to the bottom-left
                transformedPattern = `<g class="symmetry-diagonal-falling">`;
                transformedPattern += pattern; // Original (top-left half)
                // Mirror across falling diagonal (y = x, passing through center)
                // Transform: swap x,y coordinates and translate
                transformedPattern += `<g transform="translate(0, 0)">${pattern}</g>`;
                // For falling diagonal, we reflect across y = x - 100 (shifted for center at 100,100)
                // Using transform matrix for diagonal reflection
                transformedPattern += `<g transform="matrix(0, 1, 1, 0, 0, 0)">${pattern}</g>`;
                transformedPattern += `</g>`;
                break;
            
            case 'diagonal-rising':
                // Mirror along the rising diagonal (top-right to bottom-left)
                transformedPattern = `<g class="symmetry-diagonal-rising">`;
                transformedPattern += pattern; // Original
                // For rising diagonal, we reflect across y = -x + 200 (shifted for center at 100,100)
                // Using transform matrix for diagonal reflection
                transformedPattern += `<g transform="matrix(0, 1, -1, 0, 200, 0)">${pattern}</g>`;
                transformedPattern += `</g>`;
                break;
            
            case 'diagonal-both':
                // Mirror along both diagonals (quadruple symmetry)
                transformedPattern = `<g class="symmetry-diagonal-both">`;
                transformedPattern += pattern; // Original (top-left)
                // Mirror across falling diagonal (y = x)
                transformedPattern += `<g transform="matrix(0, 1, 1, 0, 0, 0)">${pattern}</g>`;
                // Mirror across rising diagonal (y = -x + 200)
                transformedPattern += `<g transform="matrix(0, 1, -1, 0, 200, 0)">${pattern}</g>`;
                // Mirror across both (rotate 180)
                transformedPattern += `<g transform="rotate(180, 100, 100)">${pattern}</g>`;
                transformedPattern += `</g>`;
                break;
                
            default:
                transformedPattern = pattern;
        }
        
        return transformedPattern;
    },
    
    // Helper: Check if point is in the symmetry-limited generation area
    isInSymmetryArea(x, y, symmetry) {
        if (!symmetry || symmetry === 'none') return true;
        
        // Center point
        const cx = 100;
        const cy = 100;
        
        // Check if point is in the relevant quadrant/slice
        switch (symmetry) {
            case 'horizontal':
                // Only generate in left half (x < 100)
                return x <= cx;
                
            case 'vertical':
                // Only generate in top half (y < 100)
                return y <= cy;
                
            case 'both':
            case 'rotational':
                // Only generate in top-left quadrant
                return x <= cx && y <= cy;
                
            case 'radial':
                // Only generate in the 0-45 degree slice (right of vertical, above horizontal)
                // This is a simplified approach - generate in first octant
                const dx = x - cx;
                const dy = y - cy;
                // First octant: angle between 0 and 45 degrees (below the diagonal y=x)
                return dx >= 0 && dy >= 0 && dy <= dx;
            
            case 'diagonal-falling':
                // Only generate in the upper triangle (y < x, above the main diagonal)
                const dx1 = x - cx;
                const dy1 = y - cy;
                // Above the diagonal y = x means y - cy < x - cx (for centered coordinates)
                return dy1 <= dx1;
            
            case 'diagonal-rising':
                // Only generate in the upper triangle (y > -x, above the anti-diagonal)
                const dx2 = x - cx;
                const dy2 = y - cy;
                // Above the diagonal y = -x means y - cy > -(x - cx)
                return dy2 >= -dx2;
            
            case 'diagonal-both':
                // Only generate in the upper quadrant (between both diagonals)
                const dx3 = x - cx;
                const dy3 = y - cy;
                // Between diagonals: above both y=x and y=-x
                return dy3 <= dx3 && dy3 >= -dx3;
                
            default:
                return true;
        }
    },
    
    // ============ Pattern Generators ============
    
    // Geometric patterns
    generateGeometric(subType, palette, strokeWidth, fillOpacity, complexity, symmetry = 'none') {
        let svg = '';
        const cells = Math.max(2, Math.min(8, complexity + 2));
        const cellSize = 170 / cells;
        const startX = 15;
        const startY = 15;
        
        switch (subType) {
            case 'grid':
                for (let row = 0; row < cells; row++) {
                    for (let col = 0; col < cells; col++) {
                        const x = startX + col * cellSize;
                        const y = startY + row * cellSize;
                        
                        // Check if element is in symmetry area
                        if (!this.isInSymmetryArea(x + cellSize/2, y + cellSize/2, symmetry)) continue;
                        
                        const color = this.getColor(palette, row + col);
                        const size = cellSize - 2;
                        
                        if (this.random() > 0.3) {
                            svg += `<rect x="${x + 1}" y="${y + 1}" width="${size}" height="${size}" `;
                            svg += `fill="${color}" fill-opacity="${fillOpacity / 100}" `;
                            svg += `stroke="${this.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
                        }
                    }
                }
                break;
                
            case 'diamond':
                for (let row = 0; row < cells; row++) {
                    for (let col = 0; col < cells; col++) {
                        const cx = startX + col * cellSize + cellSize / 2;
                        const cy = startY + row * cellSize + cellSize / 2;
                        
                        if (!this.isInSymmetryArea(cx, cy, symmetry)) continue;
                        
                        const color = this.getColor(palette, row * cells + col);
                        const size = cellSize / 2 - 1;
                        
                        svg += `<polygon points="${cx},${cy - size} ${cx + size},${cy} ${cx},${cy + size} ${cx - size},${cy}" `;
                        svg += `fill="${color}" fill-opacity="${fillOpacity / 100}" `;
                        svg += `stroke="${this.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
                    }
                }
                break;
                
            case 'hex':
                const hexSize = 170 / (cells * 1.5);
                for (let row = 0; row < cells * 1.5; row++) {
                    for (let col = 0; col < cells; col++) {
                        const cx = startX + col * hexSize * 1.5 + (row % 2) * hexSize * 0.75;
                        const cy = startY + row * hexSize * 0.866;
                        
                        if (!this.isInSymmetryArea(cx, cy, symmetry)) continue;
                        
                        const color = this.getColor(palette, row + col);
                        
                        svg += this.createHexagon(cx, cy, hexSize - 1, color, fillOpacity, strokeWidth);
                    }
                }
                break;
                
            case 'triangle':
                for (let row = 0; row < cells; row++) {
                    for (let col = 0; col < cells * 2; col++) {
                        const cx = startX + col * cellSize / 2;
                        const cy = startY + row * cellSize;
                        
                        if (!this.isInSymmetryArea(cx, cy, symmetry)) continue;
                        
                        const color = this.getColor(palette, row + col);
                        const size = cellSize / 2 - 1;
                        const pointUp = (row + col) % 2 === 0;
                        
                        if (pointUp) {
                            svg += `<polygon points="${cx},${cy} ${cx + size},${cy + size} ${cx - size},${cy + size}" `;
                        } else {
                            svg += `<polygon points="${cx},${cy + size} ${cx + size},${cy} ${cx - size},${cy}" `;
                        }
                        svg += `fill="${color}" fill-opacity="${fillOpacity / 100}" `;
                        svg += `stroke="${this.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
                    }
                }
                break;
                
            case 'wave':
                const waveCount = Math.max(3, complexity + 2);
                const waveHeight = 170 / waveCount;
                for (let i = 0; i < waveCount; i++) {
                    const y = startY + i * waveHeight;
                    
                    // For vertical symmetry, only generate in top half
                    if (!this.isInSymmetryArea(100, y + waveHeight/2, symmetry)) continue;
                    
                    const color = this.getColor(palette, i);
                    const amplitude = waveHeight * 0.3;
                    
                    // For horizontal symmetry, limit to left half
                    let maxX = 185;
                    if (symmetry === 'horizontal' || symmetry === 'both' || symmetry === 'rotational' || symmetry === 'radial') {
                        maxX = 100;
                    }
                    
                    svg += `<path d="M15,${y + waveHeight / 2} `;
                    for (let x = 15; x <= maxX; x += 10) {
                        const waveY = y + waveHeight / 2 + Math.sin((x - 15) / 30 * Math.PI * 2) * amplitude;
                        svg += `L${x},${waveY} `;
                    }
                    svg += `" fill="none" stroke="${color}" stroke-width="${waveHeight * 0.6}" stroke-linecap="round"/>`;
                }
                break;
                
            default:
                svg = this.generateGeometric('grid', palette, strokeWidth, fillOpacity, complexity, symmetry);
        }
        
        return svg;
    },
    
    // Floral patterns
    generateFloral(subType, palette, strokeWidth, fillOpacity, complexity) {
        let svg = '';
        const centerX = 100;
        const centerY = 100;
        
        switch (subType) {
            case 'rosette':
                const petalCount = Math.max(4, Math.min(12, complexity + 4));
                const petalSize = 30 + complexity * 5;
                
                // Draw petals
                for (let i = 0; i < petalCount; i++) {
                    const angle = (i / petalCount) * Math.PI * 2 - Math.PI / 2;
                    const x = centerX + Math.cos(angle) * 20;
                    const y = centerY + Math.sin(angle) * 20;
                    const color = this.getColor(palette, i);
                    
                    svg += this.createPetal(x, y, petalSize, angle, color, fillOpacity, strokeWidth);
                }
                
                // Center
                svg += `<circle cx="${centerX}" cy="${centerY}" r="${10 + complexity}" `;
                svg += `fill="${this.getColor(palette, 0)}" stroke="${this.darkenColor(this.getColor(palette, 0), 30)}" stroke-width="${strokeWidth}"/>`;
                break;
                
            case 'vine':
                // Create vine patterns
                const vineCount = Math.max(2, Math.min(6, complexity));
                for (let v = 0; v < vineCount; v++) {
                    const startAngle = (v / vineCount) * Math.PI * 2;
                    let x = centerX;
                    let y = centerY;
                    
                    svg += `<path d="M${x},${y} `;
                    
                    for (let i = 0; i < 8; i++) {
                        const angle = startAngle + this.random() * 0.5 - 0.25;
                        const len = 15 + this.random() * 15;
                        x += Math.cos(angle) * len;
                        y += Math.sin(angle) * len;
                        svg += `Q${x},${y} ${x + 5},${y + 5} `;
                    }
                    
                    svg += `" fill="none" stroke="${this.getColor(palette, v)}" stroke-width="${strokeWidth * 2}" stroke-linecap="round"/>`;
                    
                    // Add leaves
                    x = centerX;
                    y = centerY;
                    for (let i = 0; i < 8; i++) {
                        const angle = startAngle + this.random() * 0.5 - 0.25;
                        const len = 15 + this.random() * 15;
                        x += Math.cos(angle) * len;
                        y += Math.sin(angle) * len;
                        
                        if (this.random() > 0.5) {
                            svg += this.createLeaf(x, y, angle, this.getColor(palette, (v + 1) % palette.length), strokeWidth);
                        }
                    }
                }
                break;
                
            case 'branch':
                svg += this.createBranch(centerX, centerY, 60, Math.PI / 2, palette, strokeWidth, 0);
                break;
                
            case 'paisley':
                for (let i = 0; i < 4; i++) {
                    const angle = (i / 4) * Math.PI * 2;
                    const x = centerX + Math.cos(angle) * 40;
                    const y = centerY + Math.sin(angle) * 40;
                    const color = this.getColor(palette, i);
                    
                    svg += this.createPaisley(x, y, 25 + complexity * 3, angle, color, fillOpacity, strokeWidth);
                }
                // Center
                svg += `<circle cx="${centerX}" cy="${centerY}" r="15" fill="${palette[0]}" fill-opacity="${fillOpacity / 100}" stroke="${this.darkenColor(palette[0], 30)}" stroke-width="${strokeWidth}"/>`;
                break;
                
            default:
                svg = this.generateFloral('rosette', palette, strokeWidth, fillOpacity, complexity);
        }
        
        return svg;
    },
    
    // Ornamental patterns
    generateOrnamental(subType, palette, strokeWidth, fillOpacity, complexity) {
        let svg = '';
        const centerX = 100;
        const centerY = 100;
        
        switch (subType) {
            case 'corda': // Rope pattern
                const ropeCount = Math.max(2, Math.min(6, complexity + 1));
                const radius = 30 + complexity * 10;
                
                for (let i = 0; i < ropeCount; i++) {
                    const angle = (i / ropeCount) * Math.PI * 2;
                    const color = this.getColor(palette, i);
                    
                    svg += `<ellipse cx="${centerX}" cy="${centerY}" rx="${radius}" ry="${radius * 0.3}" `;
                    svg += `transform="rotate(${angle * 180 / Math.PI}, ${centerX}, ${centerY})" `;
                    svg += `fill="none" stroke="${color}" stroke-width="${strokeWidth * 2}" `;
                    svg += `stroke-dasharray="${strokeWidth * 2},${strokeWidth}"/>`;
                }
                break;
                
            case 'enxaixo': // Crossed lines
                const lineCount = Math.max(3, Math.min(9, complexity + 3));
                const spacing = 170 / lineCount;
                const start = 15;
                
                for (let i = 0; i < lineCount; i++) {
                    const color = this.getColor(palette, i);
                    
                    // Horizontal
                    svg += `<line x1="${start}" y1="${start + i * spacing}" x2="${185}" y2="${start + i * spacing}" `;
                    svg += `stroke="${color}" stroke-width="${strokeWidth * 1.5}"/>`;
                    
                    // Vertical
                    svg += `<line x1="${start + i * spacing}" y1="${start}" x2="${start + i * spacing}" y2="${185}" `;
                    svg += `stroke="${color}" stroke-width="${strokeWidth * 1.5}"/>`;
                }
                break;
                
            case 'arabesque':
                for (let i = 0; i < 4; i++) {
                    const angle = (i / 4) * Math.PI * 2;
                    const x = centerX + Math.cos(angle) * 45;
                    const y = centerY + Math.sin(angle) * 45;
                    const color = this.getColor(palette, i);
                    
                    svg += `<path d="M${centerX},${centerY} Q${x},${y} ${centerX + Math.cos(angle + 0.5) * 70},${centerY + Math.sin(angle + 0.5) * 70}" `;
                    svg += `fill="none" stroke="${color}" stroke-width="${strokeWidth * 2}" stroke-linecap="round"/>`;
                }
                // Inner circles
                svg += `<circle cx="${centerX}" cy="${centerY}" r="20" fill="none" stroke="${palette[0]}" stroke-width="${strokeWidth * 2}"/>`;
                svg += `<circle cx="${centerX}" cy="${centerY}" r="35" fill="none" stroke="${palette[1] || palette[0]}" stroke-width="${strokeWidth * 1.5}"/>`;
                break;
                
            case 'estrelas': // Stars
                const starCount = Math.max(2, Math.min(5, Math.floor(complexity / 2) + 2));
                for (let i = 0; i < starCount; i++) {
                    for (let j = 0; j < starCount; j++) {
                        const x = 30 + i * 70;
                        const y = 30 + j * 70;
                        const color = this.getColor(palette, i + j);
                        const size = 15 + complexity * 2;
                        
                        svg += this.createStar(x, y, size, 5, color, fillOpacity, strokeWidth);
                    }
                }
                break;
                
            default:
                svg = this.generateOrnamental('corda', palette, strokeWidth, fillOpacity, complexity);
        }
        
        return svg;
    },
    
    // Striped patterns
    generateStriped(subType, palette, strokeWidth, fillOpacity, complexity) {
        let svg = '';
        const stripeCount = Math.max(3, Math.min(12, complexity + 3));
        
        switch (subType) {
            case 'horizontal':
                const h = 170 / stripeCount;
                for (let i = 0; i < stripeCount; i++) {
                    const color = this.getColor(palette, i);
                    const y = 15 + i * h;
                    svg += `<rect x="15" y="${y}" width="170" height="${h}" `;
                    svg += `fill="${color}" fill-opacity="${i % 2 === 0 ? fillOpacity / 100 : 0}" `;
                    svg += `stroke="${color}" stroke-width="${strokeWidth}"/>`;
                }
                break;
                
            case 'vertical':
                const w = 170 / stripeCount;
                for (let i = 0; i < stripeCount; i++) {
                    const color = this.getColor(palette, i);
                    const x = 15 + i * w;
                    svg += `<rect x="${x}" y="15" width="${w}" height="170" `;
                    svg += `fill="${color}" fill-opacity="${i % 2 === 0 ? fillOpacity / 100 : 0}" `;
                    svg += `stroke="${color}" stroke-width="${strokeWidth}"/>`;
                }
                break;
                
            case 'diagonal':
                for (let i = -8; i < 16; i++) {
                    const color = this.getColor(palette, Math.abs(i));
                    svg += `<line x1="${i * 25}" y1="15" x2="${i * 25 + 200}" y2="185" `;
                    svg += `stroke="${color}" stroke-width="${170 / stripeCount}" stroke-linecap="square"/>`;
                }
                break;
                
            case 'chevron':
                const chevronCount = Math.max(3, Math.min(8, complexity + 2));
                const ch = 170 / chevronCount;
                for (let i = 0; i < chevronCount; i++) {
                    const color = this.getColor(palette, i);
                    const y = 15 + i * ch;
                    
                    svg += `<polygon points="15,${y} 185,${y} 185,${y + ch} 15,${y + ch}" `;
                    svg += `fill="${color}" fill-opacity="${fillOpacity / 100}"/>`;
                    svg += `<line x1="15" y1="${y + ch}" x2="185" y2="${y}" `;
                    svg += `stroke="${this.darkenColor(color, 40)}" stroke-width="${strokeWidth * 2}"/>`;
                }
                break;
                
            case 'wave':
                const waveCount = Math.max(3, Math.min(8, complexity + 2));
                const waveH = 170 / waveCount;
                for (let i = 0; i < waveCount; i++) {
                    const color = this.getColor(palette, i);
                    const baseY = 15 + i * waveH + waveH / 2;
                    
                    svg += `<path d="M15,${baseY} `;
                    for (let x = 15; x <= 185; x += 5) {
                        const wy = baseY + Math.sin((x - 15) / 20 * Math.PI) * waveH * 0.35;
                        svg += `L${x},${wy} `;
                    }
                    svg += `" fill="none" stroke="${color}" stroke-width="${waveH * 0.5}" stroke-linecap="round"/>`;
                }
                break;
                
            default:
                svg = this.generateStriped('horizontal', palette, strokeWidth, fillOpacity, complexity);
        }
        
        return svg;
    },
    
    // Checker patterns
    generateChecker(subType, palette, strokeWidth, fillOpacity, complexity) {
        let svg = '';
        const gridSize = Math.max(2, Math.min(6, Math.floor(complexity / 2) + 2));
        const cellSize = 170 / gridSize;
        const startX = 15;
        const startY = 15;
        
        switch (subType) {
            case 'classic':
                for (let row = 0; row < gridSize; row++) {
                    for (let col = 0; col < gridSize; col++) {
                        const x = startX + col * cellSize;
                        const y = startY + row * cellSize;
                        const color = this.getColor(palette, (row + col) % 2);
                        const size = cellSize - 1;
                        
                        svg += `<rect x="${x + 0.5}" y="${y + 0.5}" width="${size}" height="${size}" `;
                        svg += `fill="${color}" fill-opacity="${fillOpacity / 100}" `;
                        svg += `stroke="${this.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
                    }
                }
                break;
                
            case 'compound':
                const subGrid = Math.min(gridSize * 2, 8);
                const subSize = 170 / subGrid;
                for (let row = 0; row < subGrid; row++) {
                    for (let col = 0; col < subGrid; col++) {
                        const x = startX + col * subSize;
                        const y = startY + row * subSize;
                        const color = this.getColor(palette, Math.floor(row / 2) + Math.floor(col / 2)) % 2 === 0 ? palette[0] : palette[1] || palette[0];
                        const size = subSize - 1;
                        
                        if (this.random() > 0.3) {
                            svg += `<rect x="${x + 0.5}" y="${y + 0.5}" width="${size}" height="${size}" `;
                            svg += `fill="${color}" fill-opacity="${fillOpacity / 100}" `;
                            svg += `stroke="${this.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
                        }
                    }
                }
                break;
                
            case 'harlequin':
                for (let row = 0; row < gridSize; row++) {
                    for (let col = 0; col < gridSize; col++) {
                        const cx = startX + col * cellSize + cellSize / 2;
                        const cy = startY + row * cellSize + cellSize / 2;
                        const color = this.getColor(palette, (row + col) % 2);
                        const size = cellSize / 2 - 1;
                        
                        svg += `<polygon points="${cx},${cy - size} ${cx + size},${cy} ${cx},${cy + size} ${cx - size},${cy}" `;
                        svg += `fill="${color}" fill-opacity="${fillOpacity / 100}" `;
                        svg += `stroke="${this.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
                    }
                }
                break;
                
            case 'frame':
                // Border
                svg += `<rect x="${startX}" y="${startY}" width="170" height="170" `;
                svg += `fill="${palette[0]}" fill-opacity="${fillOpacity / 100}" `;
                svg += `stroke="${this.darkenColor(palette[0], 40)}" stroke-width="${strokeWidth * 2}"/>`;
                
                // Inner checkers
                const innerGrid = gridSize - 2;
                const innerSize = 170 / gridSize * (gridSize - 2) / gridSize;
                const innerOffset = 170 / gridSize;
                
                for (let row = 0; row < innerGrid; row++) {
                    for (let col = 0; col < innerGrid; col++) {
                        const x = startX + innerOffset + col * innerSize / innerGrid;
                        const y = startY + innerOffset + row * innerSize / innerGrid;
                        const color = this.getColor(palette, (row + col) % 2 + 1);
                        const size = innerSize / innerGrid - 1;
                        
                        svg += `<rect x="${x + 0.5}" y="${y + 0.5}" width="${size}" height="${size}" `;
                        svg += `fill="${color}" fill-opacity="${fillOpacity / 100}" `;
                        svg += `stroke="${this.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
                    }
                }
                break;
                
            default:
                svg = this.generateChecker('classic', palette, strokeWidth, fillOpacity, complexity);
        }
        
        return svg;
    },
    
    // Radial patterns
    generateRadial(subType, palette, strokeWidth, fillOpacity, complexity, symmetry = 'none') {
        let svg = '';
        const centerX = 100;
        const centerY = 100;
        
        // Calculate angular limits based on symmetry
        let angularMultiplier = 1;
        if (symmetry === 'radial') angularMultiplier = 8;
        else if (symmetry === 'rotational') angularMultiplier = 4;
        
        switch (subType) {
            case 'mandala':
                const layers = Math.max(2, Math.min(5, complexity));
                const layerSize = 70 / layers;
                
                for (let l = layers; l >= 1; l--) {
                    const radius = l * layerSize;
                    const color = this.getColor(palette, layers - l);
                    const baseSegments = 4 + l * 2;
                    const segments = baseSegments * angularMultiplier;
                    
                    for (let i = 0; i < segments; i++) {
                        const angle1 = (i / segments) * Math.PI * 2;
                        const angle2 = ((i + 1) / segments) * Math.PI * 2;
                        
                        const x1 = centerX + Math.cos(angle1) * radius;
                        const y1 = centerY + Math.sin(angle1) * radius;
                        const x2 = centerX + Math.cos(angle2) * radius;
                        const y2 = centerY + Math.sin(angle2) * radius;
                        
                        svg += `<path d="M${centerX},${centerY} L${x1},${y1} A${radius},${radius} 0 0,1 ${x2},${y2} Z" `;
                        svg += `fill="${color}" fill-opacity="${fillOpacity / 100}" `;
                        svg += `stroke="${this.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
                    }
                }
                // Center circle
                svg += `<circle cx="${centerX}" cy="${centerY}" r="8" fill="${palette[0]}" stroke="${this.darkenColor(palette[0], 40)}" stroke-width="${strokeWidth}"/>`;
                break;
                
            case 'sunburst':
                const rays = Math.max(8, Math.min(24, complexity * 4)) * angularMultiplier;
                const rayLength = 70;
                
                for (let i = 0; i < rays; i++) {
                    const angle = (i / rays) * Math.PI * 2;
                    const color = this.getColor(palette, i % palette.length);
                    
                    const x1 = centerX + Math.cos(angle) * 15;
                    const y1 = centerY + Math.sin(angle) * 15;
                    const x2 = centerX + Math.cos(angle) * rayLength;
                    const y2 = centerY + Math.sin(angle) * rayLength;
                    
                    svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" `;
                    svg += `stroke="${color}" stroke-width="${strokeWidth * 2}" stroke-linecap="round"/>`;
                }
                // Center
                svg += `<circle cx="${centerX}" cy="${centerY}" r="12" fill="${palette[0]}" stroke="${this.darkenColor(palette[0], 40)}" stroke-width="${strokeWidth}"/>`;
                break;
                
            case 'target':
                const rings = Math.max(3, Math.min(8, complexity + 2));
                const ringSize = 75 / rings;
                
                for (let r = rings; r >= 1; r--) {
                    const radius = r * ringSize;
                    const color = this.getColor(palette, r % palette.length);
                    
                    svg += `<circle cx="${centerX}" cy="${centerY}" r="${radius}" `;
                    svg += `fill="none" stroke="${color}" stroke-width="${ringSize - 2}" `;
                    svg += `fill-opacity="${fillOpacity / 100}"/>`;
                }
                // Center dot
                svg += `<circle cx="${centerX}" cy="${centerY}" r="5" fill="${palette[0]}"/>`;
                break;
                
            case 'spiral':
                const spirals = Math.max(3, Math.min(8, complexity + 2));
                
                for (let s = 0; s < spirals; s++) {
                    const color = this.getColor(palette, s);
                    let d = `M${centerX},${centerY} `;
                    
                    // Limit spiral length for symmetry
                    const maxI = symmetry === 'none' ? 100 : (100 / angularMultiplier);
                    
                    for (let i = 0; i < maxI; i++) {
                        const angle = i * 0.2 + (s / spirals) * Math.PI * 2;
                        const r = i * 0.8;
                        const x = centerX + Math.cos(angle) * r;
                        const y = centerY + Math.sin(angle) * r;
                        d += `L${x},${y} `;
                    }
                    
                    svg += `<path d="${d}" fill="none" stroke="${color}" stroke-width="${strokeWidth * 1.5}" stroke-linecap="round"/>`;
                }
                break;
                
            default:
                svg = this.generateRadial('mandala', palette, strokeWidth, fillOpacity, complexity, symmetry);
        }
        
        return svg;
    },
    
    // Celtic patterns
    generateCeltic(subType, palette, strokeWidth, fillOpacity, complexity) {
        let svg = '';
        const centerX = 100;
        const centerY = 100;
        
        switch (subType) {
            case 'knot':
                const knotSize = 40 + complexity * 10;
                
                // Simple knot - interlocking circles
                svg += `<circle cx="${centerX - knotSize/2}" cy="${centerY}" r="${knotSize/2}" `;
                svg += `fill="none" stroke="${palette[0]}" stroke-width="${strokeWidth * 3}"/>`;
                svg += `<circle cx="${centerX + knotSize/2}" cy="${centerY}" r="${knotSize/2}" `;
                svg += `fill="none" stroke="${palette[1] || palette[0]}" stroke-width="${strokeWidth * 3}"/>`;
                
                // Cover to create knot effect
                svg += `<circle cx="${centerX}" cy="${centerY - knotSize/2}" r="${knotSize/3}" `;
                svg += `fill="${palette[0]}" stroke="none"/>`;
                svg += `<circle cx="${centerX}" cy="${centerY + knotSize/2}" r="${knotSize/3}" `;
                svg += `fill="${palette[1] || palette[0]}" stroke="none"/>`;
                break;
                
            case 'braid':
                const strands = Math.max(3, Math.min(6, complexity + 2));
                const braidRadius = 50;
                
                for (let s = 0; s < strands; s++) {
                    const color = this.getColor(palette, s);
                    let d = '';
                    
                    for (let i = 0; i <= 20; i++) {
                        const angle = (i / 20) * Math.PI * 4 + (s / strands) * Math.PI * 2;
                        const r = braidRadius + Math.sin(angle * strands) * 15;
                        const x = centerX + Math.cos(angle) * r;
                        const y = centerY + Math.sin(angle) * r;
                        d += i === 0 ? `M${x},${y} ` : `L${x},${y} `;
                    }
                    
                    svg += `<path d="${d}" fill="none" stroke="${color}" stroke-width="${strokeWidth * 2}" stroke-linecap="round"/>`;
                }
                break;
                
            case 'chain':
                for (let i = 0; i < 4; i++) {
                    const angle = (i / 4) * Math.PI * 2;
                    const x = centerX + Math.cos(angle) * 40;
                    const y = centerY + Math.sin(angle) * 40;
                    const color = this.getColor(palette, i);
                    
                    svg += `<ellipse cx="${x}" cy="${y}" rx="20" ry="12" `;
                    svg += `transform="rotate(${angle * 180 / Math.PI}, ${x}, ${y})" `;
                    svg += `fill="none" stroke="${color}" stroke-width="${strokeWidth * 2}"/>`;
                }
                // Connecting lines
                for (let i = 0; i < 4; i++) {
                    const angle1 = (i / 4) * Math.PI * 2;
                    const angle2 = ((i + 1) / 4) * Math.PI * 2;
                    const x1 = centerX + Math.cos(angle1) * 40;
                    const y1 = centerY + Math.sin(angle1) * 40;
                    const x2 = centerX + Math.cos(angle2) * 40;
                    const y2 = centerY + Math.sin(angle2) * 40;
                    
                    svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" `;
                    svg += `stroke="${palette[0]}" stroke-width="${strokeWidth * 2}"/>`;
                }
                break;
                
            case 'spiral':
                for (let i = 0; i < 3; i++) {
                    const color = this.getColor(palette, i);
                    const startAngle = (i / 3) * Math.PI * 2;
                    let d = '';
                    
                    for (let j = 0; j <= 40; j++) {
                        const angle = startAngle + j * 0.15;
                        const r = 5 + j * 2.5;
                        const x = centerX + Math.cos(angle) * r;
                        const y = centerY + Math.sin(angle) * r;
                        d += j === 0 ? `M${x},${y} ` : `L${x},${y} `;
                    }
                    
                    svg += `<path d="${d}" fill="none" stroke="${color}" stroke-width="${strokeWidth * 2}" stroke-linecap="round"/>`;
                }
                break;
                
            default:
                svg = this.generateCeltic('knot', palette, strokeWidth, fillOpacity, complexity);
        }
        
        return svg;
    },
    
    // Moroccan patterns
    generateMoroccan(subType, palette, strokeWidth, fillOpacity, complexity) {
        let svg = '';
        const centerX = 100;
        const centerY = 100;
        
        switch (subType) {
            case 'zellij':
                const zellijSize = Math.max(3, Math.min(6, complexity + 1));
                const zCell = 170 / zellijSize;
                
                for (let row = 0; row < zellijSize; row++) {
                    for (let col = 0; col < zellijSize; col++) {
                        const x = 15 + col * zCell;
                        const y = 15 + row * zCell;
                        const color = this.getColor(palette, (row + col) % 2);
                        
                        // Create L-shaped tile
                        svg += `<path d="M${x},${y} L${x + zCell},${y} L${x + zCell},${y + zCell} L${x},${y + zCell} Z" `;
                        svg += `fill="${color}" fill-opacity="${fillOpacity / 100}"/>`;
                        svg += `<path d="M${x},${y} L${x + zCell/2},${y} L${x},${y + zCell/2} Z" `;
                        svg += `fill="${this.darkenColor(color, 20)}" fill-opacity="${fillOpacity / 100}"/>`;
                    }
                }
                break;
                
            case 'gidra':
                const starPoints = Math.max(6, Math.min(12, complexity * 2 + 6));
                const starRadius = 25 + complexity * 8;
                
                for (let i = 0; i < 4; i++) {
                    const angle = (i / 4) * Math.PI * 2;
                    const cx = centerX + Math.cos(angle) * 45;
                    const cy = centerY + Math.sin(angle) * 45;
                    const color = this.getColor(palette, i);
                    
                    svg += this.createStar(cx, cy, starRadius, starPoints / 2, color, fillOpacity, strokeWidth);
                }
                
                // Center star
                svg += this.createStar(centerX, centerY, starRadius * 0.6, starPoints / 2, palette[0], fillOpacity, strokeWidth);
                break;
                
            case 'muqarnas':
                const muqCount = Math.max(4, Math.min(8, complexity + 3));
                const muqRadius = 70;
                
                for (let i = 0; i < muqCount; i++) {
                    const angle = (i / muqCount) * Math.PI * 2;
                    const x = centerX + Math.cos(angle) * muqRadius * 0.5;
                    const y = centerY + Math.sin(angle) * muqRadius * 0.5;
                    const color = this.getColor(palette, i);
                    
                    // Half circles
                    svg += `<path d="M${x - 15},${y - 10} A15,15 0 0,1 ${x + 15},${y - 10} L${x + 15},${y + 10} A15,15 0 0,0 ${x - 15},${y + 10} Z" `;
                    svg += `fill="${color}" fill-opacity="${fillOpacity / 100}" stroke="${this.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
                }
                
                // Inner ring
                svg += `<circle cx="${centerX}" cy="${centerY}" r="25" fill="none" stroke="${palette[0]}" stroke-width="${strokeWidth * 2}"/>`;
                break;
                
            case 'lattice':
                const latCount = Math.max(4, Math.min(8, complexity + 2));
                const latSpacing = 170 / latCount;
                
                for (let i = 0; i <= latCount; i++) {
                    const pos = 15 + i * latSpacing;
                    const color = this.getColor(palette, i % palette.length);
                    
                    // Diagonal lines
                    svg += `<line x1="${pos}" y1="15" x2="${185}" y2="${185 - (pos - 15)}" `;
                    svg += `stroke="${color}" stroke-width="${strokeWidth}"/>`;
                    svg += `<line x1="15" y1="${pos}" x2="${185 - (pos - 15)}" y2="185" `;
                    svg += `stroke="${color}" stroke-width="${strokeWidth}"/>`;
                }
                
                // Intersections
                for (let i = 1; i < latCount; i++) {
                    for (let j = 1; j < latCount; j++) {
                        const x = 15 + i * latSpacing;
                        const y = 15 + j * latSpacing;
                        
                        svg += `<circle cx="${x}" cy="${y}" r="3" fill="${palette[0]}"/>`;
                    }
                }
                break;
                
            default:
                svg = this.generateMoroccan('zellij', palette, strokeWidth, fillOpacity, complexity);
        }
        
        return svg;
    },
    
    // Baroque patterns
    generateBaroque(subType, palette, strokeWidth, fillOpacity, complexity) {
        let svg = '';
        const centerX = 100;
        const centerY = 100;
        
        switch (subType) {
            case 'royal':
                // Central medallion
                svg += `<circle cx="${centerX}" cy="${centerY}" r="45" fill="none" stroke="${palette[0]}" stroke-width="${strokeWidth * 3}"/>`;
                svg += `<circle cx="${centerX}" cy="${centerY}" r="35" fill="${palette[1] || palette[0]}" fill-opacity="${fillOpacity / 100}" stroke="${this.darkenColor(palette[0], 30)}" stroke-width="${strokeWidth}"/>`;
                
                // Inner details
                for (let i = 0; i < 8; i++) {
                    const angle = (i / 8) * Math.PI * 2;
                    const x = centerX + Math.cos(angle) * 25;
                    const y = centerY + Math.sin(angle) * 25;
                    
                    svg += `<circle cx="${x}" cy="${y}" r="5" fill="${palette[0]}" stroke="${this.darkenColor(palette[0], 40)}" stroke-width="${strokeWidth}"/>`;
                }
                
                // Center
                svg += `<circle cx="${centerX}" cy="${centerY}" r="12" fill="${palette[2] || palette[0]}" stroke="${this.darkenColor(palette[2] || palette[0], 40)}" stroke-width="${strokeWidth}"/>`;
                
                // Outer rays
                for (let i = 0; i < 12; i++) {
                    const angle = (i / 12) * Math.PI * 2;
                    const x1 = centerX + Math.cos(angle) * 50;
                    const y1 = centerY + Math.sin(angle) * 50;
                    const x2 = centerX + Math.cos(angle) * 75;
                    const y2 = centerY + Math.sin(angle) * 75;
                    
                    svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${palette[0]}" stroke-width="${strokeWidth * 2}"/>`;
                }
                break;
                
            case 'floral-baroque':
                // Main flowers
                const fbCount = Math.max(4, Math.min(8, complexity + 3));
                for (let i = 0; i < fbCount; i++) {
                    const angle = (i / fbCount) * Math.PI * 2;
                    const x = centerX + Math.cos(angle) * 50;
                    const y = centerY + Math.sin(angle) * 50;
                    const color = this.getColor(palette, i);
                    
                    // Flower petals
                    for (let p = 0; p < 6; p++) {
                        const pAngle = (p / 6) * Math.PI * 2 + angle;
                        const px = x + Math.cos(pAngle) * 15;
                        const py = y + Math.sin(pAngle) * 15;
                        
                        svg += `<circle cx="${px}" cy="${py}" r="8" fill="${color}" fill-opacity="${fillOpacity / 100}" stroke="${this.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
                    }
                    
                    svg += `<circle cx="${x}" cy="${y}" r="8" fill="${palette[0]}" stroke="${this.darkenColor(palette[0], 40)}" stroke-width="${strokeWidth}"/>`;
                }
                
                // Center
                svg += `<circle cx="${centerX}" cy="${centerY}" r="20" fill="${palette[2] || palette[0]}" fill-opacity="${fillOpacity / 100}" stroke="${this.darkenColor(palette[2] || palette[0], 40)}" stroke-width="${strokeWidth * 2}"/>`;
                break;
                
            case 'scroll':
                for (let i = 0; i < 4; i++) {
                    const angle = (i / 4) * Math.PI * 2;
                    const color = this.getColor(palette, i);
                    
                    // C-scroll
                    const cx = centerX + Math.cos(angle) * 40;
                    const cy = centerY + Math.sin(angle) * 40;
                    
                    svg += `<path d="M${cx - 30},${cy} Q${cx - 30},${cy - 30} ${cx},${cy - 30} Q${cx + 30},${cy - 30} ${cx + 30},${cy} Q${cx + 30},${cy + 30} ${cx},${cy + 30} Q${cx - 30},${cy + 30} ${cx - 30},${cy}" `;
                    svg += `fill="none" stroke="${color}" stroke-width="${strokeWidth * 2}" stroke-linecap="round"/>`;
                }
                
                // Center
                svg += `<circle cx="${centerX}" cy="${centerY}" r="15" fill="none" stroke="${palette[0]}" stroke-width="${strokeWidth * 3}"/>`;
                break;
                
            case 'architectural':
                // Arch
                svg += `<path d="M40,185 L40,100 A60,60 0 0,1 160,100 L160,185" fill="none" stroke="${palette[0]}" stroke-width="${strokeWidth * 3}"/>`;
                
                // Columns
                svg += `<rect x="30" y="80" width="20" height="105" fill="${palette[1] || palette[0]}" fill-opacity="${fillOpacity / 100}" stroke="${this.darkenColor(palette[1] || palette[0], 40)}" stroke-width="${strokeWidth}"/>`;
                svg += `<rect x="150" y="80" width="20" height="105" fill="${palette[1] || palette[0]}" fill-opacity="${fillOpacity / 100}" stroke="${this.darkenColor(palette[1] || palette[0], 40)}" stroke-width="${strokeWidth}"/>`;
                
                // Top decoration
                svg += `<rect x="25" y="70" width="150" height="15" fill="${palette[2] || palette[0]}" fill-opacity="${fillOpacity / 100}" stroke="${this.darkenColor(palette[2] || palette[0], 40)}" stroke-width="${strokeWidth}"/>`;
                
                // Inner arch
                svg += `<path d="M60,185 L60,110 A40,40 0 0,1 140,110 L140,185" fill="none" stroke="${palette[2] || palette[0]}" stroke-width="${strokeWidth * 2}"/>`;
                break;
                
            default:
                svg = this.generateBaroque('royal', palette, strokeWidth, fillOpacity, complexity);
        }
        
        return svg;
    },
    
    // ============ NEW ADVANCED GENERATORS ============
    
    // Kaleidoscope Generator
    generateKaleidoscope(subType, palette, strokeWidth, fillOpacity, complexity, symmetry = 'none') {
        let svg = '';
        const centerX = 100;
        const centerY = 100;
        const segments = Math.max(4, Math.min(16, complexity * 2 + 4));
        const segmentAngle = (Math.PI * 2) / segments;
        
        switch (subType) {
            case 'geometric':
                // Generate geometric kaleidoscope
                const geoLayers = Math.max(2, Math.min(5, Math.floor(complexity / 2) + 2));
                for (let layer = 0; layer < geoLayers; layer++) {
                    const layerRadius = 15 + layer * 18;
                    const color = this.getColor(palette, layer);
                    
                    for (let i = 0; i < segments; i++) {
                        const angle1 = i * segmentAngle - Math.PI / 2;
                        const angle2 = (i + 1) * segmentAngle - Math.PI / 2;
                        
                        // Triangle slice
                        const x1 = centerX + Math.cos(angle1) * layerRadius;
                        const y1 = centerY + Math.sin(angle1) * layerRadius;
                        const x2 = centerX + Math.cos(angle2) * layerRadius;
                        const y2 = centerY + Math.sin(angle2) * layerRadius;
                        
                        svg += `<polygon points="${centerX},${centerY} ${x1},${y1} ${x2},${y2}" `;
                        svg += `fill="${color}" fill-opacity="${fillOpacity / 100 * (0.6 + this.random() * 0.4)}" `;
                        svg += `stroke="${this.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
                    }
                }
                break;
                
            case 'floral':
                // Generate floral kaleidoscope with petals
                const floralLayers = Math.max(2, Math.min(4, Math.floor(complexity / 2) + 1));
                for (let layer = 0; layer < floralLayers; layer++) {
                    const layerRadius = 20 + layer * 22;
                    const petalsInLayer = segments;
                    
                    for (let i = 0; i < petalsInLayer; i++) {
                        const angle = (i / petalsInLayer) * Math.PI * 2 - Math.PI / 2;
                        const color = this.getColor(palette, layer + i);
                        
                        // Petal shape
                        const petalLength = 15 + layer * 5;
                        const petalWidth = 8 + layer * 2;
                        const tipX = centerX + Math.cos(angle) * layerRadius;
                        const tipY = centerY + Math.sin(angle) * layerRadius;
                        const ctrlX1 = centerX + Math.cos(angle - 0.3) * (layerRadius - petalLength * 0.3);
                        const ctrlY1 = centerY + Math.sin(angle - 0.3) * (layerRadius - petalLength * 0.3);
                        const ctrlX2 = centerX + Math.cos(angle + 0.3) * (layerRadius - petalLength * 0.3);
                        const ctrlY2 = centerY + Math.sin(angle + 0.3) * (layerRadius - petalLength * 0.3);
                        
                        svg += `<path d="M${centerX},${centerY} Q${ctrlX1},${ctrlY1} ${tipX},${tipY} Q${ctrlX2},${ctrlY2} ${centerX},${centerY}" `;
                        svg += `fill="${color}" fill-opacity="${fillOpacity / 100}" `;
                        svg += `stroke="${this.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
                    }
                }
                // Center circle
                svg += `<circle cx="${centerX}" cy="${centerY}" r="10" fill="${palette[0]}" stroke="${this.darkenColor(palette[0], 40)}" stroke-width="${strokeWidth * 2}"/>`;
                break;
                
            case 'line':
                // Line-based kaleidoscope
                const lineCount = Math.max(3, Math.min(8, complexity + 2));
                for (let i = 0; i < segments; i++) {
                    const angle = i * segmentAngle - Math.PI / 2;
                    const color = this.getColor(palette, i % palette.length);
                    
                    for (let j = 0; j < lineCount; j++) {
                        const innerR = 10 + j * 10;
                        const outerR = innerR + 8;
                        
                        const x1 = centerX + Math.cos(angle) * innerR;
                        const y1 = centerY + Math.sin(angle) * innerR;
                        const x2 = centerX + Math.cos(angle + segmentAngle * 0.8) * outerR;
                        const y2 = centerY + Math.sin(angle + segmentAngle * 0.8) * outerR;
                        
                        svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" `;
                        svg += `stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round"/>`;
                    }
                }
                break;
                
            case 'mosaic':
                // Mosaic-style kaleidoscope with varied shapes
                for (let i = 0; i < segments; i++) {
                    const angle = i * segmentAngle - Math.PI / 2;
                    const nextAngle = (i + 1) * segmentAngle - Math.PI / 2;
                    const color = this.getColor(palette, i);
                    
                    // Wedge shape
                    const midR = 40 + this.random() * 40;
                    const x1 = centerX + Math.cos(angle) * midR;
                    const y1 = centerY + Math.sin(angle) * midR;
                    const x2 = centerX + Math.cos(nextAngle) * midR;
                    const y2 = centerY + Math.sin(nextAngle) * midR;
                    
                    svg += `<polygon points="${centerX},${centerY} ${x1},${y1} ${x2},${y2}" `;
                    svg += `fill="${color}" fill-opacity="${fillOpacity / 100}" `;
                    svg += `stroke="${this.darkenColor(color, 40)}" stroke-width="${strokeWidth}"/>`;
                    
                    // Inner detail
                    const innerR = midR * 0.5;
                    const ix1 = centerX + Math.cos(angle + segmentAngle * 0.3) * innerR;
                    const iy1 = centerY + Math.sin(angle + segmentAngle * 0.3) * innerR;
                    svg += `<circle cx="${ix1}" cy="${iy1}" r="3" fill="${this.darkenColor(color, 20)}"/>`;
                }
                break;
                
            case 'medallion':
                // Ceremonial medallion kaleidoscope
                const medalRings = Math.max(2, Math.min(5, Math.floor(complexity / 2) + 2));
                for (let ring = 0; ring < medalRings; ring++) {
                    const ringRadius = 15 + ring * 18;
                    const color = this.getColor(palette, ring);
                    
                    for (let i = 0; i < segments; i++) {
                        const angle1 = i * segmentAngle - Math.PI / 2;
                        const angle2 = (i + 1) * segmentAngle - Math.PI / 2;
                        
                        const x1 = centerX + Math.cos(angle1) * ringRadius;
                        const y1 = centerY + Math.sin(angle1) * ringRadius;
                        const x2 = centerX + Math.cos(angle2) * ringRadius;
                        const y2 = centerY + Math.sin(angle2) * ringRadius;
                        const xm = centerX + Math.cos(angle1 + segmentAngle / 2) * (ringRadius - 5);
                        const ym = centerY + Math.sin(angle1 + segmentAngle / 2) * (ringRadius - 5);
                        
                        // Arc segment
                        svg += `<path d="M${centerX},${centerY} L${x1},${y1} A${ringRadius},${ringRadius} 0 0,1 ${x2},${y2} Z" `;
                        svg += `fill="${color}" fill-opacity="${fillOpacity / 100 * 0.7}" `;
                        svg += `stroke="${this.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
                        
                        // Decorative center of segment
                        svg += `<circle cx="${xm}" cy="${ym}" r="3" fill="${this.darkenColor(color, 50)}"/>`;
                    }
                }
                // Center gem
                svg += `<circle cx="${centerX}" cy="${centerY}" r="8" fill="${palette[0]}" stroke="${this.darkenColor(palette[0], 50)}" stroke-width="${strokeWidth * 2}"/>`;
                svg += `<circle cx="${centerX}" cy="${centerY}" r="4" fill="${palette[1] || palette[0]}"/>`;
                break;
                
            case 'starburst':
                // Starburst kaleidoscope
                for (let i = 0; i < segments; i++) {
                    const angle = i * segmentAngle - Math.PI / 2;
                    const color = this.getColor(palette, i % palette.length);
                    
                    // Radial lines
                    for (let r = 0; r < 5; r++) {
                        const innerR = 10 + r * 15;
                        const outerR = innerR + 12;
                        
                        const x1 = centerX + Math.cos(angle) * innerR;
                        const y1 = centerY + Math.sin(angle) * innerR;
                        const x2 = centerX + Math.cos(angle) * outerR;
                        const y2 = centerY + Math.sin(angle) * outerR;
                        
                        svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" `;
                        svg += `stroke="${color}" stroke-width="${strokeWidth * 1.5}" stroke-linecap="round"/>`;
                    }
                    
                    // Cross decoration
                    const midR = 45;
                    const mx = centerX + Math.cos(angle) * midR;
                    const my = centerY + Math.sin(angle) * midR;
                    svg += `<circle cx="${mx}" cy="${my}" r="4" fill="${color}" stroke="${this.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
                }
                break;
                
            case 'handmade':
                // Soft handmade kaleidoscope with curves
                for (let i = 0; i < segments; i++) {
                    const angle = i * segmentAngle - Math.PI / 2;
                    const nextAngle = (i + 1) * segmentAngle - Math.PI / 2;
                    const color = this.getColor(palette, i);
                    
                    // Curved wedge with organic feel
                    const midAngle = angle + segmentAngle / 2;
                    const controlR = 30 + this.random() * 30;
                    const outerR = 70;
                    
                    const x1 = centerX + Math.cos(angle) * 15;
                    const y1 = centerY + Math.sin(angle) * 15;
                    const x2 = centerX + Math.cos(nextAngle) * 15;
                    const y2 = centerY + Math.sin(nextAngle) * 15;
                    const cx1 = centerX + Math.cos(midAngle - segmentAngle * 0.3) * controlR;
                    const cy1 = centerY + Math.sin(midAngle - segmentAngle * 0.3) * controlR;
                    const cx2 = centerX + Math.cos(midAngle + segmentAngle * 0.3) * controlR;
                    const cy2 = centerY + Math.sin(midAngle + segmentAngle * 0.3) * controlR;
                    const ox = centerX + Math.cos(midAngle) * outerR;
                    const oy = centerY + Math.sin(midAngle) * outerR;
                    
                    svg += `<path d="M${centerX},${centerY} Q${cx1},${cy1} ${ox},${oy} Q${cx2},${cy2} ${centerX},${centerY}" `;
                    svg += `fill="${color}" fill-opacity="${fillOpacity / 100 * 0.6}" `;
                    svg += `stroke="${this.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
                }
                break;
                
            default:
                svg = this.generateKaleidoscope('geometric', palette, strokeWidth, fillOpacity, complexity, symmetry);
        }
        
        return svg;
    },
    
    // Guilloché Generator
    generateGuilloche(subType, palette, strokeWidth, fillOpacity, complexity, symmetry = 'none') {
        let svg = '';
        const centerX = 100;
        const centerY = 100;
        
        switch (subType) {
            case 'circular':
                // Circular guilloché rings
                const circRings = Math.max(2, Math.min(5, Math.floor(complexity / 2) + 2));
                const loopsPerRing = Math.max(8, complexity * 3 + 4);
                
                for (let ring = 0; ring < circRings; ring++) {
                    const baseRadius = 20 + ring * 15;
                    const amplitude = 5 + ring * 2;
                    const color = this.getColor(palette, ring);
                    
                    for (let loop = 0; loop < loopsPerRing; loop++) {
                        const angle = (loop / loopsPerRing) * Math.PI * 2;
                        const r = baseRadius + Math.sin(angle * (3 + ring)) * amplitude;
                        
                        const x = centerX + Math.cos(angle) * r;
                        const y = centerY + Math.sin(angle) * r;
                        
                        if (loop === 0) {
                            svg += `<circle cx="${x}" cy="${y}" r="${strokeWidth}" fill="${color}"/>`;
                        } else {
                            const prevAngle = ((loop - 1) / loopsPerRing) * Math.PI * 2;
                            const prevR = baseRadius + Math.sin(prevAngle * (3 + ring)) * amplitude;
                            const prevX = centerX + Math.cos(prevAngle) * prevR;
                            const prevY = centerY + Math.sin(prevAngle) * prevR;
                            
                            svg += `<line x1="${prevX}" y1="${prevY}" x2="${x}" y2="${y}" `;
                            svg += `stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round"/>`;
                        }
                    }
                }
                break;
                
            case 'medallion':
                // Medallion guilloché with center focus
                const medRings = Math.max(3, Math.min(6, complexity + 2));
                
                for (let ring = 0; ring < medRings; ring++) {
                    const baseR = 15 + ring * 14;
                    const amp = 4 + ring * 1.5;
                    const freq = 2 + ring;
                    const points = 60 + ring * 20;
                    const color = this.getColor(palette, ring);
                    
                    let d = '';
                    for (let i = 0; i <= points; i++) {
                        const angle = (i / points) * Math.PI * 2;
                        const r = baseR + Math.sin(angle * freq) * amp;
                        const x = centerX + Math.cos(angle) * r;
                        const y = centerY + Math.sin(angle) * r;
                        d += i === 0 ? `M${x},${y} ` : `L${x},${y} `;
                    }
                    d += 'Z';
                    
                    svg += `<path d="${d}" fill="none" stroke="${color}" stroke-width="${strokeWidth * 1.2}" stroke-linecap="round"/>`;
                }
                
                // Center detail
                svg += `<circle cx="${centerX}" cy="${centerY}" r="8" fill="none" stroke="${palette[0]}" stroke-width="${strokeWidth * 2}"/>`;
                svg += `<circle cx="${centerX}" cy="${centerY}" r="4" fill="${palette[0]}"/>`;
                break;
                
            case 'border':
                // Border guilloché - concentrated near edges
                const borderRings = Math.max(2, Math.min(4, Math.floor(complexity / 2) + 2));
                
                for (let ring = 0; ring < borderRings; ring++) {
                    const baseR = 60 + ring * 25;
                    const amp = 8 + ring * 3;
                    const freq = 6 + ring * 2;
                    const points = 80;
                    const color = this.getColor(palette, ring);
                    
                    let d = '';
                    for (let i = 0; i <= points; i++) {
                        const angle = (i / points) * Math.PI * 2;
                        const r = baseR + Math.sin(angle * freq) * amp;
                        const x = centerX + Math.cos(angle) * r;
                        const y = centerY + Math.sin(angle) * r;
                        d += i === 0 ? `M${x},${y} ` : `L${x},${y} `;
                    }
                    d += 'Z';
                    
                    svg += `<path d="${d}" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round"/>`;
                }
                break;
                
            case 'oval':
                // Oval/elliptical guilloché
                const ovalFreq = Math.max(3, complexity + 2);
                const colorOval = this.getColor(palette, 0);
                
                for (let i = 0; i < 8; i++) {
                    const offset = i * 0.2;
                    let d = '';
                    const points = 60;
                    
                    for (let j = 0; j <= points; j++) {
                        const angle = (j / points) * Math.PI * 2;
                        const rx = 50 + Math.sin(angle * ovalFreq + offset) * 15;
                        const ry = 35 + Math.cos(angle * ovalFreq + offset) * 10;
                        const x = centerX + Math.cos(angle) * rx;
                        const y = centerY + Math.sin(angle) * ry;
                        d += j === 0 ? `M${x},${y} ` : `L${x},${y} `;
                    }
                    d += 'Z';
                    
                    svg += `<path d="${d}" fill="none" stroke="${this.getColor(palette, i % palette.length)}" stroke-width="${strokeWidth}" stroke-linecap="round"/>`;
                }
                break;
                
            case 'radial':
                // Radial guilloché - petals from center
                const radialPetals = Math.max(6, complexity * 2 + 4);
                
                for (let i = 0; i < radialPetals; i++) {
                    const angle = (i / radialPetals) * Math.PI * 2 - Math.PI / 2;
                    const color = this.getColor(palette, i % palette.length);
                    let d = '';
                    
                    for (let j = 0; j <= 20; j++) {
                        const t = j / 20;
                        const r = 10 + t * 65 + Math.sin(t * Math.PI * 4) * 8;
                        const x = centerX + Math.cos(angle + t * 0.5) * r;
                        const y = centerY + Math.sin(angle + t * 0.5) * r;
                        d += j === 0 ? `M${x},${y} ` : `L${x},${y} `;
                    }
                    
                    svg += `<path d="${d}" fill="none" stroke="${color}" stroke-width="${strokeWidth * 0.8}" stroke-linecap="round"/>`;
                }
                break;
                
            case 'spirograph':
                // Spirograph-like pattern
                const spiroArms = Math.max(2, Math.min(5, Math.floor(complexity / 2) + 2));
                const spiroPoints = Math.max(80, complexity * 30);
                
                for (let arm = 0; arm < spiroArms; arm++) {
                    const color = this.getColor(palette, arm);
                    let d = '';
                    
                    for (let i = 0; i <= spiroPoints; i++) {
                        const t = (i / spiroPoints) * Math.PI * 10;
                        const R = 50;
                        const r = 15 + arm * 5;
                        const x = centerX + (R - r) * Math.cos(t) + r * Math.cos((R - r) / r * t);
                        const y = centerY + (R - r) * Math.sin(t) - r * Math.sin((R - r) / r * t);
                        d += i === 0 ? `M${x},${y} ` : `L${x},${y} `;
                    }
                    
                    svg += `<path d="${d}" fill="none" stroke="${color}" stroke-width="${strokeWidth * 0.8}" stroke-linecap="round"/>`;
                }
                break;
                
            case 'ribbon':
                // Ribbon-style guilloché
                for (let i = 0; i < 5; i++) {
                    const color = this.getColor(palette, i);
                    let d = '';
                    const ribbonPoints = 40;
                    
                    for (let j = 0; j <= ribbonPoints; j++) {
                        const t = j / ribbonPoints;
                        const angle = t * Math.PI * 2 + i * 0.5;
                        const r = 30 + Math.sin(angle * 3) * 20 + t * 40;
                        const x = centerX + Math.cos(angle) * r;
                        const y = centerY + Math.sin(angle) * r;
                        d += j === 0 ? `M${x},${y} ` : `L${x},${y} `;
                    }
                    
                    svg += `<path d="${d}" fill="none" stroke="${color}" stroke-width="${strokeWidth * 2}" stroke-linecap="round"/>`;
                }
                break;
                
            case 'engraved':
                // Engraved style - fine parallel lines
                const engRings = Math.max(3, Math.min(6, complexity + 2));
                
                for (let ring = 0; ring < engRings; ring++) {
                    const baseR = 20 + ring * 18;
                    const color = this.getColor(palette, ring);
                    
                    for (let line = 0; line < 3; line++) {
                        const offset = line * 3;
                        let d = '';
                        const points = 40;
                        
                        for (let i = 0; i <= points; i++) {
                            const angle = (i / points) * Math.PI * 2;
                            const r = baseR + offset + Math.sin(angle * (4 + ring)) * 3;
                            const x = centerX + Math.cos(angle) * r;
                            const y = centerY + Math.sin(angle) * r;
                            d += i === 0 ? `M${x},${y} ` : `L${x},${y} `;
                        }
                        d += 'Z';
                        
                        svg += `<path d="${d}" fill="none" stroke="${color}" stroke-width="${strokeWidth * 0.6}" stroke-linecap="round"/>`;
                    }
                }
                break;
                
            default:
                svg = this.generateGuilloche('circular', palette, strokeWidth, fillOpacity, complexity, symmetry);
        }
        
        return svg;
    },
    
    // Lace / Filigree Generator
    generateLace(subType, palette, strokeWidth, fillOpacity, complexity, symmetry = 'none') {
        let svg = '';
        const centerX = 100;
        const centerY = 100;
        
        switch (subType) {
            case 'delicate':
                // Delicate lace with fine lines
                const delicateCount = Math.max(8, complexity * 4 + 6);
                
                for (let i = 0; i < delicateCount; i++) {
                    const angle = (i / delicateCount) * Math.PI * 2;
                    const color = this.getColor(palette, i % palette.length);
                    const len = 20 + this.random() * 40;
                    
                    const x1 = centerX + Math.cos(angle) * 15;
                    const y1 = centerY + Math.sin(angle) * 15;
                    const x2 = centerX + Math.cos(angle) * len;
                    const y2 = centerY + Math.sin(angle) * len;
                    
                    // Curved line
                    const ctrlX = centerX + Math.cos(angle + 0.2) * (len * 0.5);
                    const ctrlY = centerY + Math.sin(angle + 0.2) * (len * 0.5);
                    
                    svg += `<path d="M${x1},${y1} Q${ctrlX},${ctrlY} ${x2},${y2}" `;
                    svg += `fill="none" stroke="${color}" stroke-width="${strokeWidth * 0.5}" stroke-linecap="round"/>`;
                    
                    // Small dot at end
                    svg += `<circle cx="${x2}" cy="${y2}" r="1.5" fill="${color}"/>`;
                }
                break;
                
            case 'filigree':
                // Filigree - intricate ornamental work
                const filiLayers = Math.max(2, Math.min(4, Math.floor(complexity / 2) + 1));
                
                for (let layer = 0; layer < filiLayers; layer++) {
                    const layerR = 20 + layer * 25;
                    const filiCount = 8 + layer * 4;
                    
                    for (let i = 0; i < filiCount; i++) {
                        const angle = (i / filiCount) * Math.PI * 2;
                        const color = this.getColor(palette, layer + i);
                        
                        // C-scroll filigree
                        const startX = centerX + Math.cos(angle) * layerR;
                        const startY = centerY + Math.sin(angle) * layerR;
                        const ctrlX1 = startX + Math.cos(angle + 0.5) * 12;
                        const ctrlY1 = startY + Math.sin(angle + 0.5) * 12;
                        const ctrlX2 = startX + Math.cos(angle - 0.5) * 12;
                        const ctrlY2 = startY + Math.sin(angle - 0.5) * 12;
                        const endX = centerX + Math.cos(angle) * (layerR + 10);
                        const endY = centerY + Math.sin(angle) * (layerR + 10);
                        
                        svg += `<path d="M${startX},${startY} Q${ctrlX1},${ctrlY1} ${endX},${endY} Q${ctrlX2},${ctrlY2} ${startX},${startY}" `;
                        svg += `fill="none" stroke="${color}" stroke-width="${strokeWidth * 0.7}" stroke-linecap="round"/>`;
                    }
                }
                break;
                
            case 'web':
                // Lace web pattern
                const webRings = Math.max(2, Math.min(4, Math.floor(complexity / 2) + 2));
                const webSpokes = Math.max(8, complexity * 2 + 6);
                
                // Spokes
                for (let i = 0; i < webSpokes; i++) {
                    const angle = (i / webSpokes) * Math.PI * 2;
                    const color = this.getColor(palette, i % palette.length);
                    
                    for (let ring = 1; ring <= webRings; ring++) {
                        const r = ring * 18;
                        const x = centerX + Math.cos(angle) * r;
                        const y = centerY + Math.sin(angle) * r;
                        
                        svg += `<circle cx="${x}" cy="${y}" r="1" fill="${color}"/>`;
                    }
                }
                
                // Concentric rings
                for (let ring = 1; ring <= webRings; ring++) {
                    const r = ring * 18;
                    svg += `<circle cx="${centerX}" cy="${centerY}" r="${r}" fill="none" stroke="${palette[0]}" stroke-width="${strokeWidth * 0.5}"/>`;
                }
                
                // Connecting web lines
                for (let i = 0; i < webSpokes; i++) {
                    const angle1 = (i / webSpokes) * Math.PI * 2;
                    const angle2 = ((i + 1) / webSpokes) * Math.PI * 2;
                    const color = this.getColor(palette, i);
                    
                    for (let ring = 1; ring <= webRings; ring++) {
                        const r = ring * 18;
                        const x1 = centerX + Math.cos(angle1) * r;
                        const y1 = centerY + Math.sin(angle1) * r;
                        const x2 = centerX + Math.cos(angle2) * r;
                        const y2 = centerY + Math.sin(angle2) * r;
                        
                        svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${strokeWidth * 0.3}"/>`;
                    }
                }
                break;
                
            case 'floral-lace':
                // Floral lace pattern
                const floralPetals = Math.max(6, complexity * 2 + 4);
                
                for (let i = 0; i < floralPetals; i++) {
                    const angle = (i / floralPetals) * Math.PI * 2 - Math.PI / 2;
                    const color = this.getColor(palette, i % palette.length);
                    
                    // Outer petal loop
                    const petalR = 15 + (i % 3) * 10;
                    let d = '';
                    for (let j = 0; j <= 12; j++) {
                        const t = j / 12;
                        const a = angle + (t - 0.5) * 0.8;
                        const r = petalR * Math.sin(t * Math.PI);
                        const x = centerX + Math.cos(a) * r;
                        const y = centerY + Math.sin(a) * r;
                        d += j === 0 ? `M${x},${y} ` : `L${x},${y} `;
                    }
                    d += 'Z';
                    
                    svg += `<path d="${d}" fill="none" stroke="${color}" stroke-width="${strokeWidth * 0.8}" stroke-linecap="round"/>`;
                }
                break;
                
            case 'geometric-lace':
                // Geometric lace with angular patterns
                const geoLaceCount = Math.max(4, complexity + 3);
                
                for (let i = 0; i < geoLaceCount; i++) {
                    for (let j = 0; j < geoLaceCount; j++) {
                        const x = 25 + i * 50;
                        const y = 25 + j * 50;
                        
                        // Skip center area for some variety
                        if (Math.abs(x - 100) < 20 && Math.abs(y - 100) < 20) continue;
                        
                        const color = this.getColor(palette, i + j);
                        
                        // Small diamond
                        const size = 8;
                        svg += `<polygon points="${x},${y - size} ${x + size},${y} ${x},${y + size} ${x - size},${y}" `;
                        svg += `fill="none" stroke="${color}" stroke-width="${strokeWidth * 0.6}"/>`;
                        
                        // Inner detail
                        svg += `<circle cx="${x}" cy="${y}" r="2" fill="${color}"/>`;
                    }
                }
                break;
                
            default:
                svg = this.generateLace('delicate', palette, strokeWidth, fillOpacity, complexity, symmetry);
        }
        
        return svg;
    },
    
    // Interlace / Knotwork Generator
    generateInterlace(subType, palette, strokeWidth, fillOpacity, complexity, symmetry = 'none') {
        let svg = '';
        const centerX = 100;
        const centerY = 100;
        
        switch (subType) {
            case 'braid':
                // Braided weave pattern
                const braidStrands = Math.max(3, Math.min(6, complexity + 2));
                const braidRadius = 30 + complexity * 5;
                
                for (let s = 0; s < braidStrands; s++) {
                    const color = this.getColor(palette, s);
                    let d = '';
                    
                    for (let i = 0; i <= 40; i++) {
                        const t = i / 40;
                        const angle = t * Math.PI * 4 + (s / braidStrands) * Math.PI * 2;
                        const r = braidRadius + Math.sin(angle * braidStrands) * 10;
                        const x = centerX + Math.cos(angle) * r;
                        const y = centerY + Math.sin(angle) * r;
                        d += i === 0 ? `M${x},${y} ` : `L${x},${y} `;
                    }
                    
                    svg += `<path d="${d}" fill="none" stroke="${color}" stroke-width="${strokeWidth * 2}" stroke-linecap="round"/>`;
                }
                break;
                
            case 'celtic-knot':
                // Celtic knot pattern
                const knotSize = 25 + complexity * 8;
                const knotColor = palette[0];
                
                // Horizontal figure-8s
                svg += `<path d="M${centerX - knotSize},${centerY - knotSize} C${centerX + knotSize},${centerY - knotSize} ${centerX + knotSize},${centerY + knotSize} ${centerX - knotSize},${centerY + knotSize}" `;
                svg += `fill="none" stroke="${knotColor}" stroke-width="${strokeWidth * 3}"/>`;
                svg += `<path d="M${centerX + knotSize},${centerY - knotSize} C${centerX - knotSize},${centerY - knotSize} ${centerX - knotSize},${centerY + knotSize} ${centerX + knotSize},${centerY + knotSize}" `;
                svg += `fill="none" stroke="${this.getColor(palette, 1)}" stroke-width="${strokeWidth * 3}"/>`;
                
                // Vertical figure-8s
                svg += `<path d="M${centerX - knotSize},${centerY - knotSize} C${centerX - knotSize},${centerY + knotSize} ${centerX + knotSize},${centerY + knotSize} ${centerX + knotSize},${centerY - knotSize}" `;
                svg += `fill="none" stroke="${this.getColor(palette, 2) || knotColor}" stroke-width="${strokeWidth * 3}"/>`;
                svg += `<path d="M${centerX - knotSize},${centerY + knotSize} C${centerX - knotSize},${centerY - knotSize} ${centerX + knotSize},${centerY - knotSize} ${centerX + knotSize},${centerY + knotSize}" `;
                svg += `fill="none" stroke="${this.getColor(palette, 3) || knotColor}" stroke-width="${strokeWidth * 3}"/>`;
                
                // Overlap circles to create knot illusion
                svg += `<circle cx="${centerX}" cy="${centerY - knotSize}" r="${strokeWidth * 2}" fill="${palette[1] || palette[0]}" stroke="none"/>`;
                svg += `<circle cx="${centerX}" cy="${centerY + knotSize}" r="${strokeWidth * 2}" fill="${palette[0]}" stroke="none"/>`;
                break;
                
            case 'chain':
                // Chain link pattern
                const chainLinks = Math.max(4, complexity + 3);
                
                for (let i = 0; i < chainLinks; i++) {
                    const angle = (i / chainLinks) * Math.PI * 2;
                    const x = centerX + Math.cos(angle) * 45;
                    const y = centerY + Math.sin(angle) * 45;
                    const color = this.getColor(palette, i);
                    
                    // Link as ellipse
                    svg += `<ellipse cx="${x}" cy="${y}" rx="18" ry="10" `;
                    svg += `transform="rotate(${angle * 180 / Math.PI}, ${x}, ${y})" `;
                    svg += `fill="none" stroke="${color}" stroke-width="${strokeWidth * 2}"/>`;
                }
                
                // Connecting links
                for (let i = 0; i < chainLinks; i++) {
                    const angle1 = (i / chainLinks) * Math.PI * 2;
                    const angle2 = ((i + 1) / chainLinks) * Math.PI * 2;
                    const x1 = centerX + Math.cos(angle1) * 45;
                    const y1 = centerY + Math.sin(angle1) * 45;
                    const x2 = centerX + Math.cos(angle2) * 45;
                    const y2 = centerY + Math.sin(angle2) * 45;
                    
                    svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${palette[0]}" stroke-width="${strokeWidth * 2}"/>`;
                }
                break;
                
            case 'basket':
                // Basket weave pattern
                const basketCells = Math.max(2, Math.min(4, Math.floor(complexity / 2) + 2));
                const cellSize = 170 / (basketCells * 2 + 1);
                
                for (let row = 0; row < basketCells * 2 + 1; row++) {
                    for (let col = 0; col < basketCells * 2 + 1; col++) {
                        const x = 15 + col * cellSize + cellSize / 2;
                        const y = 15 + row * cellSize + cellSize / 2;
                        
                        if (!this.isInSymmetryArea(x, y, symmetry)) continue;
                        
                        const color = this.getColor(palette, (row + col) % palette.length);
                        const isOver = (row + col) % 2 === 0;
                        
                        if (isOver) {
                            // Horizontal weave
                            svg += `<rect x="${x - cellSize/2}" y="${y - cellSize * 0.3}" width="${cellSize}" height="${cellSize * 0.6}" `;
                            svg += `fill="${color}" fill-opacity="${fillOpacity / 100}" stroke="${this.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
                        } else {
                            // Vertical weave
                            svg += `<rect x="${x - cellSize * 0.3}" y="${y - cellSize/2}" width="${cellSize * 0.6}" height="${cellSize}" `;
                            svg += `fill="${color}" fill-opacity="${fillOpacity / 100}" stroke="${this.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
                        }
                    }
                }
                break;
                
            case 'diagonal-weave':
                // Diagonal weave pattern
                const diagCells = Math.max(3, Math.min(6, complexity + 2));
                const diagSize = 170 / diagCells;
                
                for (let row = 0; row < diagCells; row++) {
                    for (let col = 0; col < diagCells; col++) {
                        const x = 15 + col * diagSize + diagSize / 2;
                        const y = 15 + row * diagSize + diagSize / 2;
                        
                        if (!this.isInSymmetryArea(x, y, symmetry)) continue;
                        
                        const color = this.getColor(palette, (row + col) % palette.length);
                        const size = diagSize * 0.4;
                        
                        // Diagonal diamond
                        svg += `<polygon points="${x},${y - size} ${x + size},${y} ${x},${y + size} ${x - size},${y}" `;
                        svg += `fill="${color}" fill-opacity="${fillOpacity / 100}" stroke="${this.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
                        
                        // Weave over/under lines
                        if ((row + col) % 2 === 0) {
                            svg += `<line x1="${x - size}" y1="${y}" x2="${x + size}" y2="${y}" stroke="${this.darkenColor(color, 50)}" stroke-width="${strokeWidth}"/>`;
                        } else {
                            svg += `<line x1="${x}" y1="${y - size}" x2="${x}" y2="${y + size}" stroke="${this.darkenColor(color, 50)}" stroke-width="${strokeWidth}"/>`;
                        }
                    }
                }
                break;
                
            default:
                svg = this.generateInterlace('braid', palette, strokeWidth, fillOpacity, complexity, symmetry);
        }
        
        return svg;
    },
    
    // Tessellation Generator
    generateTessellation(subType, palette, strokeWidth, fillOpacity, complexity, symmetry = 'none') {
        let svg = '';
        
        switch (subType) {
            case 'diamonds':
                // Diamond field tessellation
                const diamondRows = Math.max(3, Math.min(7, complexity + 2));
                const diamondCols = Math.max(3, Math.min(7, complexity + 2));
                const dSize = 170 / diamondCols;
                
                for (let row = 0; row < diamondRows; row++) {
                    for (let col = 0; col < diamondCols; col++) {
                        const cx = 15 + col * dSize + dSize / 2;
                        const cy = 15 + row * dSize + dSize / 2;
                        
                        if (!this.isInSymmetryArea(cx, cy, symmetry)) continue;
                        
                        const color = this.getColor(palette, (row + col) % palette.length);
                        const size = dSize / 2 - 2;
                        
                        svg += `<polygon points="${cx},${cy - size} ${cx + size},${cy} ${cx},${cy + size} ${cx - size},${cy}" `;
                        svg += `fill="${color}" fill-opacity="${fillOpacity / 100}" `;
                        svg += `stroke="${this.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
                    }
                }
                break;
                
            case 'stars':
                // Star field tessellation
                const starCount = Math.max(3, Math.min(6, complexity + 2));
                const starSpacing = 170 / starCount;
                
                for (let row = 0; row < starCount; row++) {
                    for (let col = 0; col < starCount; col++) {
                        const x = 15 + col * starSpacing + starSpacing / 2;
                        const y = 15 + row * starSpacing + starSpacing / 2;
                        
                        if (!this.isInSymmetryArea(x, y, symmetry)) continue;
                        
                        const color = this.getColor(palette, row + col);
                        const size = starSpacing * 0.35;
                        
                        svg += this.createStar(x, y, size, 5, color, fillOpacity, strokeWidth);
                    }
                }
                break;
                
            case 'hex-grid':
                // Hexagonal grid tessellation
                const hexRows = Math.max(3, Math.min(6, complexity + 1));
                const hexSize = 170 / (hexRows * 1.8);
                
                for (let row = 0; row < hexRows * 1.5; row++) {
                    for (let col = 0; col < hexRows; col++) {
                        const cx = 15 + col * hexSize * 1.5 + (row % 2) * hexSize * 0.75;
                        const cy = 15 + row * hexSize * 0.866;
                        
                        if (!this.isInSymmetryArea(cx, cy, symmetry)) continue;
                        
                        const color = this.getColor(palette, row + col);
                        
                        svg += this.createHexagon(cx, cy, hexSize - 2, color, fillOpacity, strokeWidth);
                    }
                }
                break;
                
            case 'triangles':
                // Triangle mesh tessellation
                const triCount = Math.max(4, Math.min(8, complexity + 3));
                const triSize = 170 / triCount;
                
                for (let row = 0; row < triCount; row++) {
                    for (let col = 0; col < triCount * 2; col++) {
                        const cx = 15 + col * triSize / 2;
                        const cy = 15 + row * triSize;
                        
                        if (!this.isInSymmetryArea(cx, cy, symmetry)) continue;
                        
                        const color = this.getColor(palette, row + col);
                        const size = triSize / 2 - 1;
                        const pointUp = (row + col) % 2 === 0;
                        
                        if (pointUp) {
                            svg += `<polygon points="${cx},${cy} ${cx + size},${cy + size} ${cx - size},${cy + size}" `;
                        } else {
                            svg += `<polygon points="${cx},${cy + size} ${cx + size},${cy} ${cx - size},${cy}" `;
                        }
                        svg += `fill="${color}" fill-opacity="${fillOpacity / 100}" `;
                        svg += `stroke="${this.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
                    }
                }
                break;
                
            case 'octagons':
                // Octagon pattern with squares
                const octCount = Math.max(2, Math.min(4, Math.floor(complexity / 2) + 2));
                const octSize = 170 / octCount;
                
                for (let row = 0; row < octCount; row++) {
                    for (let col = 0; col < octCount; col++) {
                        const cx = 15 + col * octSize + octSize / 2;
                        const cy = 15 + row * octSize + octSize / 2;
                        
                        if (!this.isInSymmetryArea(cx, cy, symmetry)) continue;
                        
                        const color = this.getColor(palette, row + col);
                        const size = octSize / 2 - 2;
                        
                        // Octagon
                        let points = '';
                        for (let i = 0; i < 8; i++) {
                            const angle = (i / 8) * Math.PI * 2 - Math.PI / 8;
                            const x = cx + Math.cos(angle) * size;
                            const y = cy + Math.sin(angle) * size;
                            points += `${x},${y} `;
                        }
                        svg += `<polygon points="${points}" fill="${color}" fill-opacity="${fillOpacity / 100}" `;
                        svg += `stroke="${this.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
                        
                        // Center square
                        const sqSize = size * 0.4;
                        svg += `<rect x="${cx - sqSize}" y="${cy - sqSize}" width="${sqSize * 2}" height="${sqSize * 2}" `;
                        svg += `fill="${this.getColor(palette, (row + col + 1) % palette.length)}" fill-opacity="${fillOpacity / 100}"/>`;
                    }
                }
                break;
                
            default:
                svg = this.generateTessellation('diamonds', palette, strokeWidth, fillOpacity, complexity, symmetry);
        }
        
        return svg;
    },
    
    // Chisel / Engraved Line Generator
    generateChisel(subType, palette, strokeWidth, fillOpacity, complexity, symmetry = 'none') {
        let svg = '';
        const centerX = 100;
        const centerY = 100;
        
        switch (subType) {
            case 'lines':
                // Chiseled parallel lines
                const lineCount = Math.max(5, complexity * 3 + 5);
                const spacing = 170 / lineCount;
                const start = 15;
                
                for (let i = 0; i < lineCount; i++) {
                    const color = this.getColor(palette, i);
                    const y = start + i * spacing;
                    
                    if (!this.isInSymmetryArea(100, y, symmetry)) continue;
                    
                    // Main line
                    svg += `<line x1="${start}" y1="${y}" x2="${185}" y2="${y}" `;
                    svg += `stroke="${color}" stroke-width="${strokeWidth * 1.5}" stroke-linecap="round"/>`;
                    
                    // Shadow offset
                    svg += `<line x1="${start + 1}" y1="${y + 1}" x2="${186}" y2="${y + 1}" `;
                    svg += `stroke="${this.darkenColor(color, 40)}" stroke-width="${strokeWidth * 0.5}" stroke-linecap="round"/>`;
                }
                break;
                
            case 'hatching':
                // Hatching pattern
                const hatchCount = Math.max(8, complexity * 4 + 6);
                const hatchSpacing = 170 / hatchCount;
                
                for (let i = -hatchCount; i < hatchCount * 2; i++) {
                    const color = this.getColor(palette, Math.abs(i) % palette.length);
                    const offset = i * hatchSpacing;
                    
                    if (!this.isInSymmetryArea(100, 100, symmetry)) continue;
                    
                    // Diagonal hatching
                    svg += `<line x1="${offset}" y1="15" x2="${offset + 170}" y2="185" `;
                    svg += `stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round"/>`;
                }
                break;
                
            case 'crosshatch':
                // Crosshatch pattern
                const crossCount = Math.max(4, complexity * 2 + 3);
                const crossSpacing = 170 / crossCount;
                
                // First direction
                for (let i = 0; i <= crossCount; i++) {
                    const color = this.getColor(palette, 0);
                    const pos = 15 + i * crossSpacing;
                    
                    svg += `<line x1="${pos}" y1="15" x2="${185}" y2="${185 - (pos - 15)}" `;
                    svg += `stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round"/>`;
                }
                
                // Second direction
                for (let i = 0; i <= crossCount; i++) {
                    const color = this.getColor(palette, 1) || palette[0];
                    const pos = 15 + i * crossSpacing;
                    
                    svg += `<line x1="15" y1="${pos}" x2="${185 - (pos - 15)}" y2="185" `;
                    svg += `stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round"/>`;
                }
                break;
                
            case 'carving':
                // Carved effect with concentric details
                const carveRings = Math.max(3, Math.min(6, complexity + 2));
                
                for (let ring = 0; ring < carveRings; ring++) {
                    const r = 15 + ring * 20;
                    const color = this.getColor(palette, ring);
                    
                    // Outer ring
                    svg += `<circle cx="${centerX}" cy="${centerY}" r="${r}" `;
                    svg += `fill="none" stroke="${color}" stroke-width="${strokeWidth * 1.5}"/>`;
                    
                    // Inner highlight
                    svg += `<circle cx="${centerX - 1}" cy="${centerY - 1}" r="${r - 2}" `;
                    svg += `fill="none" stroke="${this.darkenColor(color, 30)}" stroke-width="${strokeWidth * 0.5}"/>`;
                    
                    // Radial lines
                    const spokes = 8 + ring * 4;
                    for (let i = 0; i < spokes; i++) {
                        const angle = (i / spokes) * Math.PI * 2;
                        const x1 = centerX + Math.cos(angle) * (r - 3);
                        const y1 = centerY + Math.sin(angle) * (r - 3);
                        const x2 = centerX + Math.cos(angle) * (r + 3);
                        const y2 = centerY + Math.sin(angle) * (r + 3);
                        
                        svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${strokeWidth}"/>`;
                    }
                }
                
                // Center
                svg += `<circle cx="${centerX}" cy="${centerY}" r="8" fill="${palette[0]}" stroke="${this.darkenColor(palette[0], 40)}" stroke-width="${strokeWidth * 2}"/>`;
                break;
                
            default:
                svg = this.generateChisel('lines', palette, strokeWidth, fillOpacity, complexity, symmetry);
        }
        
        return svg;
    },
    
    // Ribbon Ornament Generator
    generateRibbon(subType, palette, strokeWidth, fillOpacity, complexity, symmetry = 'none') {
        let svg = '';
        const centerX = 100;
        const centerY = 100;
        
        switch (subType) {
            case 'flowing':
                // Flowing ribbon curves
                const ribbonCount = Math.max(3, Math.min(6, complexity + 2));
                
                for (let i = 0; i < ribbonCount; i++) {
                    const color = this.getColor(palette, i);
                    const startAngle = (i / ribbonCount) * Math.PI * 2;
                    let d = '';
                    
                    for (let j = 0; j <= 20; j++) {
                        const t = j / 20;
                        const angle = startAngle + t * Math.PI * 1.5;
                        const r = 20 + t * 50 + Math.sin(t * Math.PI * 3) * 10;
                        const x = centerX + Math.cos(angle) * r;
                        const y = centerY + Math.sin(angle) * r;
                        d += j === 0 ? `M${x},${y} ` : `L${x},${y} `;
                    }
                    
                    svg += `<path d="${d}" fill="none" stroke="${color}" stroke-width="${strokeWidth * 3}" stroke-linecap="round"/>`;
                    svg += `<path d="${d}" fill="none" stroke="${this.darkenColor(color, 30)}" stroke-width="${strokeWidth}" stroke-linecap="round"/>`;
                }
                break;
                
            case 'twist':
                // Twisting ribbon around center
                const twistCount = Math.max(2, Math.min(4, Math.floor(complexity / 2) + 2));
                
                for (let i = 0; i < twistCount; i++) {
                    const color = this.getColor(palette, i);
                    let d = '';
                    
                    for (let j = 0; j <= 40; j++) {
                        const t = j / 40;
                        const angle = t * Math.PI * 4 + (i / twistCount) * Math.PI * 2;
                        const r = 15 + t * 60;
                        const x = centerX + Math.cos(angle) * r;
                        const y = centerY + Math.sin(angle) * r;
                        d += j === 0 ? `M${x},${y} ` : `L${x},${y} `;
                    }
                    
                    svg += `<path d="${d}" fill="none" stroke="${color}" stroke-width="${strokeWidth * 2.5}" stroke-linecap="round"/>`;
                }
                break;
                
            case 'frame':
                // Ribbon frame around tile
                const frameRibbons = 2;
                
                for (let f = 0; f < frameRibbons; f++) {
                    const offset = f * 12;
                    const color = this.getColor(palette, f);
                    
                    // Top
                    svg += `<path d="M${20 + offset},${20 + offset} Q${100},${10 + offset} ${180 - offset},${20 + offset}" `;
                    svg += `fill="none" stroke="${color}" stroke-width="${strokeWidth * 2}" stroke-linecap="round"/>`;
                    
                    // Right
                    svg += `<path d="M${180 - offset},${20 + offset} Q${190 - offset},${100} ${180 - offset},${180 - offset}" `;
                    svg += `fill="none" stroke="${color}" stroke-width="${strokeWidth * 2}" stroke-linecap="round"/>`;
                    
                    // Bottom
                    svg += `<path d="M${180 - offset},${180 - offset} Q${100},${190 - offset} ${20 + offset},${180 - offset}" `;
                    svg += `fill="none" stroke="${color}" stroke-width="${strokeWidth * 2}" stroke-linecap="round"/>`;
                    
                    // Left
                    svg += `<path d="M${20 + offset},${180 - offset} Q${10 + offset},${100} ${20 + offset},${20 + offset}" `;
                    svg += `fill="none" stroke="${color}" stroke-width="${strokeWidth * 2}" stroke-linecap="round"/>`;
                }
                break;
                
            case 'bouquet':
                // Ribbon bouquet from center
                const bouquetRibbons = Math.max(4, complexity + 3);
                
                for (let i = 0; i < bouquetRibbons; i++) {
                    const angle = (i / bouquetRibbons) * Math.PI * 2 - Math.PI / 2;
                    const color = this.getColor(palette, i % palette.length);
                    
                    // Stem
                    svg += `<line x1="${centerX}" y1="${centerY}" x2="${centerX + Math.cos(angle) * 70}" y2="${centerY + Math.sin(angle) * 70}" `;
                    svg += `stroke="${color}" stroke-width="${strokeWidth * 2}" stroke-linecap="round"/>`;
                    
                    // Bow
                    const bowX = centerX + Math.cos(angle) * 30;
                    const bowY = centerY + Math.sin(angle) * 30;
                    svg += `<ellipse cx="${bowX}" cy="${bowY}" rx="10" ry="6" `;
                    svg += `transform="rotate(${angle * 180 / Math.PI}, ${bowX}, ${bowY})" `;
                    svg += `fill="none" stroke="${color}" stroke-width="${strokeWidth * 1.5}"/>`;
                }
                break;
                
            default:
                svg = this.generateRibbon('flowing', palette, strokeWidth, fillOpacity, complexity, symmetry);
        }
        
        return svg;
    },
    
    // Petal Field Generator
    generatePetal(subType, palette, strokeWidth, fillOpacity, complexity, symmetry = 'none') {
        let svg = '';
        const centerX = 100;
        const centerY = 100;
        
        switch (subType) {
            case 'rosette':
                // Petal rosette
                const rosettePetals = Math.max(6, Math.min(12, complexity * 2 + 6));
                
                for (let i = 0; i < rosettePetals; i++) {
                    const angle = (i / rosettePetals) * Math.PI * 2 - Math.PI / 2;
                    const color = this.getColor(palette, i % palette.length);
                    const petalLen = 25 + complexity * 4;
                    
                    const tipX = centerX + Math.cos(angle) * petalLen;
                    const tipY = centerY + Math.sin(angle) * petalLen;
                    const ctrlX1 = centerX + Math.cos(angle - 0.4) * petalLen * 0.6;
                    const ctrlY1 = centerY + Math.sin(angle - 0.4) * petalLen * 0.6;
                    const ctrlX2 = centerX + Math.cos(angle + 0.4) * petalLen * 0.6;
                    const ctrlY2 = centerY + Math.sin(angle + 0.4) * petalLen * 0.6;
                    
                    svg += `<path d="M${centerX},${centerY} Q${ctrlX1},${ctrlY1} ${tipX},${tipY} Q${ctrlX2},${ctrlY2} ${centerX},${centerY}" `;
                    svg += `fill="${color}" fill-opacity="${fillOpacity / 100}" `;
                    svg += `stroke="${this.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
                }
                
                // Center
                svg += `<circle cx="${centerX}" cy="${centerY}" r="10" fill="${palette[0]}" stroke="${this.darkenColor(palette[0], 40)}" stroke-width="${strokeWidth * 2}"/>`;
                break;
                
            case 'overlapping':
                // Overlapping petals in layers
                const overlapLayers = Math.max(2, Math.min(4, Math.floor(complexity / 2) + 2));
                
                for (let layer = overlapLayers - 1; layer >= 0; layer--) {
                    const layerRadius = 15 + layer * 22;
                    const petalsInLayer = Math.max(6, Math.min(12, complexity * 2 + 4));
                    
                    for (let i = 0; i < petalsInLayer; i++) {
                        const angle = (i / petalsInLayer) * Math.PI * 2 - Math.PI / 2;
                        const color = this.getColor(palette, layer + i);
                        const petalSize = 18 + layer * 3;
                        
                        const tipX = centerX + Math.cos(angle) * layerRadius;
                        const tipY = centerY + Math.sin(angle) * layerRadius;
                        const ctrlX1 = centerX + Math.cos(angle - 0.5) * petalSize;
                        const ctrlY1 = centerY + Math.sin(angle - 0.5) * petalSize;
                        const ctrlX2 = centerX + Math.cos(angle + 0.5) * petalSize;
                        const ctrlY2 = centerY + Math.sin(angle + 0.5) * petalSize;
                        
                        svg += `<path d="M${centerX},${centerY} Q${ctrlX1},${ctrlY1} ${tipX},${tipY} Q${ctrlX2},${ctrlY2} ${centerX},${centerY}" `;
                        svg += `fill="${color}" fill-opacity="${fillOpacity / 100 * 0.8}" `;
                        svg += `stroke="${this.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
                    }
                }
                break;
                
            case 'fan':
                // Fan pattern with petals
                const fanPetals = Math.max(8, complexity * 3 + 6);
                
                for (let i = 0; i < fanPetals; i++) {
                    const t = i / fanPetals;
                    const angle = -Math.PI / 2 + t * Math.PI;
                    const color = this.getColor(palette, i % palette.length);
                    
                    const petalLen = 30 + t * 45;
                    const width = 12 + t * 8;
                    
                    const tipX = centerX + Math.cos(angle) * petalLen;
                    const tipY = centerY + Math.sin(angle) * petalLen;
                    const leftX = centerX + Math.cos(angle - 0.15) * width;
                    const leftY = centerY + Math.sin(angle - 0.15) * width;
                    const rightX = centerX + Math.cos(angle + 0.15) * width;
                    const rightY = centerY + Math.sin(angle + 0.15) * width;
                    
                    svg += `<path d="M${leftX},${leftY} Q${centerX},${centerY + 5} ${tipX},${tipY} Q${centerX},${centerY + 5} ${rightX},${rightY} Z" `;
                    svg += `fill="${color}" fill-opacity="${fillOpacity / 100}" `;
                    svg += `stroke="${this.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
                }
                break;
                
            case 'layered':
                // Layered petals with varying sizes
                const layerCount = Math.max(3, Math.min(5, complexity + 1));
                
                for (let layer = layerCount; layer >= 1; layer--) {
                    const layerR = layer * 20;
                    const layerPetals = 6 + layer * 2;
                    
                    for (let i = 0; i < layerPetals; i++) {
                        const angle = (i / layerPetals) * Math.PI * 2;
                        const color = this.getColor(palette, layer + i);
                        
                        const x = centerX + Math.cos(angle) * layerR;
                        const y = centerY + Math.sin(angle) * layerR;
                        const size = 12 + layer * 3;
                        
                        // Petal as ellipse
                        svg += `<ellipse cx="${x}" cy="${y}" rx="${size}" ry="${size * 0.5}" `;
                        svg += `transform="rotate(${angle * 180 / Math.PI}, ${x}, ${y})" `;
                        svg += `fill="${color}" fill-opacity="${fillOpacity / 100}" `;
                        svg += `stroke="${this.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
                    }
                }
                
                // Center
                svg += `<circle cx="${centerX}" cy="${centerY}" r="8" fill="${palette[0]}" stroke="${this.darkenColor(palette[0], 40)}" stroke-width="${strokeWidth * 2}"/>`;
                break;
                
            default:
                svg = this.generatePetal('rosette', palette, strokeWidth, fillOpacity, complexity, symmetry);
        }
        
        return svg;
    },
    
    // Lattice Generator
    generateLattice(subType, palette, strokeWidth, fillOpacity, complexity, symmetry = 'none') {
        let svg = '';
        
        switch (subType) {
            case 'diamond-lattice':
                // Diamond lattice
                const diagCells = Math.max(3, Math.min(6, complexity + 2));
                const diagSpacing = 170 / diagCells;
                
                for (let i = 0; i <= diagCells; i++) {
                    const pos = 15 + i * diagSpacing;
                    const color = this.getColor(palette, i);
                    
                    // Two diagonal directions
                    svg += `<line x1="${pos}" y1="15" x2="${185}" y2="${185 - (pos - 15)}" `;
                    svg += `stroke="${color}" stroke-width="${strokeWidth}"/>`;
                    svg += `<line x1="15" y1="${pos}" x2="${185 - (pos - 15)}" y2="185" `;
                    svg += `stroke="${color}" stroke-width="${strokeWidth}"/>`;
                }
                
                // Nodes at intersections
                for (let i = 1; i < diagCells; i++) {
                    for (let j = 1; j < diagCells; j++) {
                        const x = 15 + i * diagSpacing;
                        const y = 15 + j * diagSpacing;
                        svg += `<circle cx="${x}" cy="${y}" r="2" fill="${palette[0]}"/>`;
                    }
                }
                break;
                
            case 'arc-lattice':
                // Arc lattice
                const arcCells = Math.max(2, Math.min(4, Math.floor(complexity / 2) + 2));
                const arcSpacing = 170 / arcCells;
                
                for (let row = 0; row <= arcCells; row++) {
                    for (let col = 0; col <= arcCells; col++) {
                        const x = 15 + col * arcSpacing;
                        const y = 15 + row * arcSpacing;
                        const color = this.getColor(palette, row + col);
                        
                        // Horizontal arc
                        if (col < arcCells) {
                            svg += `<path d="M${x},${y} A${arcSpacing/2},${arcSpacing/2} 0 0,1 ${x + arcSpacing},${y}" `;
                            svg += `fill="none" stroke="${color}" stroke-width="${strokeWidth}"/>`;
                        }
                        
                        // Vertical arc
                        if (row < arcCells) {
                            svg += `<path d="M${x},${y} A${arcSpacing/2},${arcSpacing/2} 0 0,1 ${x},${y + arcSpacing}" `;
                            svg += `fill="none" stroke="${color}" stroke-width="${strokeWidth}"/>`;
                        }
                    }
                }
                break;
                
            case 'star-lattice':
                // Star lattice
                const starCells = Math.max(2, Math.min(4, Math.floor(complexity / 2) + 2));
                const starSpacing = 170 / starCells;
                
                for (let row = 0; row < starCells; row++) {
                    for (let col = 0; col < starCells; col++) {
                        const cx = 15 + col * starSpacing + starSpacing / 2;
                        const cy = 15 + row * starSpacing + starSpacing / 2;
                        
                        if (!this.isInSymmetryArea(cx, cy, symmetry)) continue;
                        
                        const color = this.getColor(palette, row + col);
                        const size = starSpacing * 0.3;
                        
                        // Star shape
                        svg += this.createStar(cx, cy, size, 4, color, fillOpacity, strokeWidth);
                    }
                }
                
                // Connecting lines
                for (let i = 0; i <= starCells; i++) {
                    const pos = 15 + i * starSpacing;
                    svg += `<line x1="${pos}" y1="15" x2="${pos}" y2="185" stroke="${palette[0]}" stroke-width="${strokeWidth * 0.5}"/>`;
                    svg += `<line x1="15" y1="${pos}" x2="185" y2="${pos}" stroke="${palette[0]}" stroke-width="${strokeWidth * 0.5}"/>`;
                }
                break;
                
            case 'trellis':
                // Garden trellis pattern
                const trellisLines = Math.max(4, complexity + 3);
                const trellisSpacing = 170 / trellisLines;
                
                // Curved lines creating trellis effect
                for (let i = 0; i <= trellisLines; i++) {
                    const pos = 15 + i * trellisSpacing;
                    const color = this.getColor(palette, i % palette.length);
                    
                    // Curved vertical
                    svg += `<path d="M${pos},185 Q${pos - 20},100 ${pos},15" fill="none" stroke="${color}" stroke-width="${strokeWidth}"/>`;
                    
                    // Curved horizontal
                    svg += `<path d="M15,${pos} Q100,${pos - 20} 185,${pos}" fill="none" stroke="${color}" stroke-width="${strokeWidth}"/>`;
                }
                
                // Center decoration
                svg += `<circle cx="100" cy="100" r="8" fill="none" stroke="${palette[0]}" stroke-width="${strokeWidth * 2}"/>`;
                break;
                
            default:
                svg = this.generateLattice('diamond-lattice', palette, strokeWidth, fillOpacity, complexity, symmetry);
        }
        
        return svg;
    },
    
    // Halo / Concentric Ornament Generator
    generateHalo(subType, palette, strokeWidth, fillOpacity, complexity, symmetry = 'none') {
        let svg = '';
        const centerX = 100;
        const centerY = 100;
        
        switch (subType) {
            case 'concentric':
                // Concentric rings
                const concRings = Math.max(3, Math.min(7, complexity + 3));
                
                for (let ring = 1; ring <= concRings; ring++) {
                    const r = ring * 15 + 10;
                    const color = this.getColor(palette, ring - 1);
                    
                    svg += `<circle cx="${centerX}" cy="${centerY}" r="${r}" `;
                    svg += `fill="none" stroke="${color}" stroke-width="${strokeWidth * (1 + (concRings - ring) * 0.2)}"/>`;
                    
                    // Inner detail
                    if (ring < concRings) {
                        svg += `<circle cx="${centerX}" cy="${centerY}" r="${r - 3}" `;
                        svg += `fill="none" stroke="${this.darkenColor(color, 30)}" stroke-width="${strokeWidth * 0.5}"/>`;
                    }
                }
                
                // Center dot
                svg += `<circle cx="${centerX}" cy="${centerY}" r="5" fill="${palette[0]}"/>`;
                break;
                
            case 'scalloped':
                // Scalloped halo
                const scallopCount = Math.max(8, complexity * 3 + 6);
                
                for (let ring = 0; ring < 3; ring++) {
                    const baseR = 25 + ring * 22;
                    const color = this.getColor(palette, ring);
                    
                    for (let i = 0; i < scallopCount; i++) {
                        const angle1 = (i / scallopCount) * Math.PI * 2;
                        const angle2 = ((i + 1) / scallopCount) * Math.PI * 2;
                        const midAngle = (angle1 + angle2) / 2;
                        const scallopR = baseR + 8;
                        
                        const x1 = centerX + Math.cos(angle1) * baseR;
                        const y1 = centerY + Math.sin(angle1) * baseR;
                        const x2 = centerX + Math.cos(angle2) * baseR;
                        const y2 = centerY + Math.sin(angle2) * baseR;
                        const xm = centerX + Math.cos(midAngle) * scallopR;
                        const ym = centerY + Math.sin(midAngle) * scallopR;
                        
                        svg += `<path d="M${x1},${y1} A${baseR},${baseR} 0 0,1 ${x2},${y2}" `;
                        svg += `fill="none" stroke="${color}" stroke-width="${strokeWidth}"/>`;
                    }
                }
                
                // Center
                svg += `<circle cx="${centerX}" cy="${centerY}" r="10" fill="none" stroke="${palette[0]}" stroke-width="${strokeWidth * 2}"/>`;
                break;
                
            case 'echo':
                // Echo lines - repeating concentric with variation
                const echoRings = Math.max(4, complexity + 3);
                
                for (let ring = 1; ring <= echoRings; ring++) {
                    const r = ring * 14 + 8;
                    const color = this.getColor(palette, ring - 1);
                    
                    // Main ring
                    svg += `<circle cx="${centerX}" cy="${centerY}" r="${r}" `;
                    svg += `fill="none" stroke="${color}" stroke-width="${strokeWidth}"/>`;
                    
                    // Echo ring
                    svg += `<circle cx="${centerX}" cy="${centerY}" r="${r + 3}" `;
                    svg += `fill="none" stroke="${this.darkenColor(color, 30)}" stroke-width="${strokeWidth * 0.5}"/>`;
                }
                
                // Radial echo lines
                const echoSpokes = 12;
                for (let i = 0; i < echoSpokes; i++) {
                    const angle = (i / echoSpokes) * Math.PI * 2;
                    const color = this.getColor(palette, i);
                    
                    const x1 = centerX + Math.cos(angle) * 15;
                    const y1 = centerY + Math.sin(angle) * 15;
                    const x2 = centerX + Math.cos(angle) * 75;
                    const y2 = centerY + Math.sin(angle) * 75;
                    
                    svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${strokeWidth * 0.5}"/>`;
                }
                break;
                
            case 'medallion-halo':
                // Medallion halo with mixed ornament
                const medalRings = Math.max(3, Math.min(5, complexity + 2));
                
                for (let ring = 0; ring < medalRings; ring++) {
                    const ringRadius = 20 + ring * 18;
                    const color = this.getColor(palette, ring);
                    
                    // Ring
                    svg += `<circle cx="${centerX}" cy="${centerY}" r="${ringRadius}" `;
                    svg += `fill="none" stroke="${color}" stroke-width="${strokeWidth * 1.5}"/>`;
                    
                    // Decorative dots around ring
                    const dots = 8 + ring * 4;
                    for (let i = 0; i < dots; i++) {
                        const angle = (i / dots) * Math.PI * 2;
                        const x = centerX + Math.cos(angle) * ringRadius;
                        const y = centerY + Math.sin(angle) * ringRadius;
                        svg += `<circle cx="${x}" cy="${y}" r="2" fill="${color}"/>`;
                    }
                }
                
                // Center medallion
                svg += `<circle cx="${centerX}" cy="${centerY}" r="12" fill="${palette[0]}" stroke="${this.darkenColor(palette[0], 40)}" stroke-width="${strokeWidth * 2}"/>`;
                svg += `<circle cx="${centerX}" cy="${centerY}" r="6" fill="${palette[1] || palette[0]}"/>`;
                break;
                
            default:
                svg = this.generateHalo('concentric', palette, strokeWidth, fillOpacity, complexity, symmetry);
        }
        
        return svg;
    },
    
    // ============ Helper Functions ============
    
    // Create hexagon
    createHexagon(cx, cy, size, color, fillOpacity, strokeWidth) {
        let points = '';
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
            const x = cx + Math.cos(angle) * size;
            const y = cy + Math.sin(angle) * size;
            points += `${x},${y} `;
        }
        
        return `<polygon points="${points}" fill="${color}" fill-opacity="${fillOpacity / 100}" stroke="${this.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
    },
    
    // Create star
    createStar(cx, cy, size, points, color, fillOpacity, strokeWidth) {
        let d = '';
        const outerR = size;
        const innerR = size * 0.4;
        
        for (let i = 0; i < points * 2; i++) {
            const angle = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2;
            const r = i % 2 === 0 ? outerR : innerR;
            const x = cx + Math.cos(angle) * r;
            const y = cy + Math.sin(angle) * r;
            d += i === 0 ? `M${x},${y} ` : `L${x},${y} `;
        }
        d += 'Z';
        
        return `<path d="${d}" fill="${color}" fill-opacity="${fillOpacity / 100}" stroke="${this.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
    },
    
    // Create petal
    createPetal(cx, cy, size, angle, color, fillOpacity, strokeWidth) {
        const tipX = cx + Math.cos(angle) * size;
        const tipY = cy + Math.sin(angle) * size;
        const ctrlX1 = cx + Math.cos(angle - 0.5) * size * 0.7;
        const ctrlY1 = cy + Math.sin(angle - 0.5) * size * 0.7;
        const ctrlX2 = cx + Math.cos(angle + 0.5) * size * 0.7;
        const ctrlY2 = cy + Math.sin(angle + 0.5) * size * 0.7;
        
        return `<path d="M${cx},${cy} Q${ctrlX1},${ctrlY1} ${tipX},${tipY} Q${ctrlX2},${ctrlY2} ${cx},${cy}" fill="${color}" fill-opacity="${fillOpacity / 100}" stroke="${this.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
    },
    
    // Create leaf
    createLeaf(x, y, angle, color, strokeWidth) {
        const size = 10 + this.random() * 10;
        
        return `<ellipse cx="${x}" cy="${y}" rx="${size}" ry="${size * 0.4}" transform="rotate(${angle * 180 / Math.PI}, ${x}, ${y})" fill="${color}" stroke="${this.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
    },
    
    // Create paisley
    createPaisley(x, y, size, angle, color, fillOpacity, strokeWidth) {
        let d = '';
        for (let i = 0; i <= 20; i++) {
            const t = i / 20;
            const r = size * (1 - t) * (1 + Math.sin(t * Math.PI * 2) * 0.3);
            const currAngle = angle + t * Math.PI * 1.5;
            const px = x + Math.cos(currAngle) * r;
            const py = y + Math.sin(currAngle) * r;
            d += i === 0 ? `M${px},${py} ` : `L${px},${py} `;
        }
        
        return `<path d="${d}" fill="none" stroke="${color}" stroke-width="${strokeWidth * 2}" stroke-linecap="round"/>`;
    },
    
    // Create branch (recursive)
    createBranch(x, y, length, angle, palette, strokeWidth, depth) {
        if (depth > 4 || length < 10) return '';
        
        let svg = '';
        const endX = x + Math.cos(angle) * length;
        const endY = y + Math.sin(angle) * length;
        const color = this.getColor(palette, depth);
        
        svg += `<line x1="${x}" y1="${y}" x2="${endX}" y2="${endY}" stroke="${color}" stroke-width="${strokeWidth * (4 - depth)}" stroke-linecap="round"/>`;
        
        // Branches
        if (depth < 4) {
            const branchCount = this.randInt(1, 2);
            for (let i = 0; i < branchCount; i++) {
                const branchAngle = angle + (this.random() - 0.5) * Math.PI * 0.6;
                svg += this.createBranch(endX, endY, length * 0.7, branchAngle, palette, strokeWidth, depth + 1);
            }
        }
        
        // Leaf
        svg += this.createLeaf(endX, endY, angle, palette[(depth + 1) % palette.length], strokeWidth);
        
        return svg;
    },
    
    // Generate centerpiece
    generateCenterpiece(type, palette, strokeWidth, fillOpacity, centerSize = 50, centerStrokeWidth = null, centerOpacity = 100) {
        let svg = '';
        const cx = 100;
        const cy = 100;
        const color = palette[0];
        const color2 = palette[1] || palette[0];
        const color3 = palette[2] || palette[0];
        
        // Use dedicated center stroke width or fall back to main stroke width
        const useStrokeWidth = centerStrokeWidth !== null ? centerStrokeWidth : strokeWidth;
        const opacityVal = centerOpacity / 100;
        
        // Calculate size multiplier based on centerSize (10-100 range)
        // Default size is 50, so multiplier = centerSize / 50
        const sizeMultiplier = centerSize / 50;
        
        switch (type) {
            case 'circle':
                svg += `<circle cx="${cx}" cy="${cy}" r="${25 * sizeMultiplier}" fill="${color}" fill-opacity="${fillOpacity / 100 * opacityVal}" stroke="${this.darkenColor(color, 40)}" stroke-width="${useStrokeWidth * 2}"/>`;
                svg += `<circle cx="${cx}" cy="${cy}" r="${12 * sizeMultiplier}" fill="none" stroke="${this.darkenColor(color, 60)}" stroke-width="${useStrokeWidth}"/>`;
                break;
                
            case 'star':
                svg += this.createStar(cx, cy, 30 * sizeMultiplier, 5, color, fillOpacity * opacityVal, useStrokeWidth * 2);
                svg += this.createStar(cx, cy, 15 * sizeMultiplier, 5, color2, fillOpacity * opacityVal, useStrokeWidth);
                break;
                
            case 'flower':
                for (let i = 0; i < 6; i++) {
                    const angle = (i / 6) * Math.PI * 2;
                    const x = cx + Math.cos(angle) * 15 * sizeMultiplier;
                    const y = cy + Math.sin(angle) * 15 * sizeMultiplier;
                    svg += `<circle cx="${x}" cy="${y}" r="${12 * sizeMultiplier}" fill="${palette[i % palette.length]}" fill-opacity="${fillOpacity / 100 * opacityVal}" stroke="${this.darkenColor(palette[i % palette.length], 30)}" stroke-width="${useStrokeWidth}"/>`;
                }
                svg += `<circle cx="${cx}" cy="${cy}" r="${10 * sizeMultiplier}" fill="${color}" stroke="${this.darkenColor(color, 40)}" stroke-width="${useStrokeWidth * 2}"/>`;
                break;
                
            case 'diamond':
                svg += `<polygon points="100,${100 - 30 * sizeMultiplier} ${100 + 30 * sizeMultiplier},100 100,${100 + 30 * sizeMultiplier} ${100 - 30 * sizeMultiplier},100" fill="${color}" fill-opacity="${fillOpacity / 100 * opacityVal}" stroke="${this.darkenColor(color, 40)}" stroke-width="${useStrokeWidth * 2}"/>`;
                svg += `<polygon points="100,${100 - 20 * sizeMultiplier} ${100 + 20 * sizeMultiplier},100 100,${100 + 20 * sizeMultiplier} ${100 - 20 * sizeMultiplier},100" fill="${color2}" fill-opacity="${fillOpacity / 100 * opacityVal}" stroke="${this.darkenColor(color2, 40)}" stroke-width="${useStrokeWidth}"/>`;
                break;
                
            // New creative centerpiece types
            case 'mandala':
                // Multi-layered mandala pattern
                const mandalaLayers = 4;
                for (let l = mandalaLayers; l >= 1; l--) {
                    const radius = l * 8 * sizeMultiplier;
                    const segments = 8 + l * 2;
                    const layerColor = palette[l % palette.length];
                    
                    for (let i = 0; i < segments; i++) {
                        const angle1 = (i / segments) * Math.PI * 2;
                        const angle2 = ((i + 1) / segments) * Math.PI * 2;
                        
                        const x1 = cx + Math.cos(angle1) * radius;
                        const y1 = cy + Math.sin(angle1) * radius;
                        const x2 = cx + Math.cos(angle2) * radius;
                        const y2 = cy + Math.sin(angle2) * radius;
                        
                        svg += `<path d="M${cx},${cy} L${x1},${y1} A${radius},${radius} 0 0,1 ${x2},${y2} Z" `;
                        svg += `fill="${layerColor}" fill-opacity="${fillOpacity / 100 * opacityVal}" `;
                        svg += `stroke="${this.darkenColor(layerColor, 30)}" stroke-width="${useStrokeWidth}"/>`;
                    }
                }
                // Center dot
                svg += `<circle cx="${cx}" cy="${cy}" r="${5 * sizeMultiplier}" fill="${color}" stroke="${this.darkenColor(color, 40)}" stroke-width="${useStrokeWidth}"/>`;
                break;
                
            case 'spiral':
                // Elegant spiral design
                const spiralArms = 3;
                for (let s = 0; s < spiralArms; s++) {
                    const spiralColor = palette[s % palette.length];
                    let d = `M${cx},${cy} `;
                    
                    for (let i = 0; i <= 40; i++) {
                        const angle = i * 0.15 + (s / spiralArms) * Math.PI * 2;
                        const r = (3 + i * 1.8) * sizeMultiplier;
                        const x = cx + Math.cos(angle) * r;
                        const y = cy + Math.sin(angle) * r;
                        d += `L${x},${y} `;
                    }
                    
                    svg += `<path d="${d}" fill="none" stroke="${spiralColor}" stroke-width="${useStrokeWidth * 1.5}" stroke-linecap="round" stroke-opacity="${opacityVal}"/>`;
                }
                // Center accent
                svg += `<circle cx="${cx}" cy="${cy}" r="${6 * sizeMultiplier}" fill="${color}" fill-opacity="${opacityVal}" stroke="${this.darkenColor(color, 40)}" stroke-width="${useStrokeWidth}"/>`;
                break;
                
            case 'heart':
                // Heart shape centerpiece - scaled
                const heartScale = sizeMultiplier;
                const heartPath = `M100,${115 * heartScale} C100,${115 * heartScale} ${75 * heartScale},${95 * heartScale} ${75 * heartScale},${80 * heartScale} C${75 * heartScale},${68 * heartScale} ${85 * heartScale},${60 * heartScale} ${95 * heartScale},${60 * heartScale} C${98 * heartScale},${60 * heartScale} 100,${62 * heartScale} 100,${62 * heartScale} C100,${62 * heartScale} ${102 * heartScale},${60 * heartScale} ${105 * heartScale},${60 * heartScale} C${115 * heartScale},${60 * heartScale} ${125 * heartScale},${68 * heartScale} ${125 * heartScale},${80 * heartScale} C${125 * heartScale},${95 * heartScale} 100,${115 * heartScale} 100,${115 * heartScale} Z`;
                svg += `<path d="${heartPath}" fill="${color}" fill-opacity="${fillOpacity / 100 * opacityVal}" stroke="${this.darkenColor(color, 40)}" stroke-width="${useStrokeWidth * 2}"/>`;
                // Inner highlight
                const heartInnerScale = sizeMultiplier * 0.8;
                svg += `<path d="M100,${108 * heartInnerScale} C100,${108 * heartInnerScale} ${85 * heartInnerScale},${95 * heartInnerScale} ${85 * heartInnerScale},${85 * heartInnerScale} C${85 * heartInnerScale},${78 * heartInnerScale} ${90 * heartInnerScale},${73 * heartInnerScale} ${96 * heartInnerScale},${73 * heartInnerScale} C${99 * heartInnerScale},${73 * heartInnerScale} 100,${75 * heartInnerScale} 100,${75 * heartInnerScale} C100,${75 * heartInnerScale} ${101 * heartInnerScale},${73 * heartInnerScale} ${104 * heartInnerScale},${73 * heartInnerScale} C${110 * heartInnerScale},${73 * heartInnerScale} ${115 * heartInnerScale},${78 * heartInnerScale} ${115 * heartInnerScale},${85 * heartInnerScale} C${115 * heartInnerScale},${95 * heartInnerScale} 100,${108 * heartInnerScale} 100,${108 * heartInnerScale} Z" fill="${color2}" fill-opacity="${fillOpacity / 100 * opacityVal * 0.5}"/>`;
                break;
                
            case 'cross':
                // Cross/Plus design - scaled
                const crossSize = 25 * sizeMultiplier;
                const crossThick = 8 * sizeMultiplier;
                // Vertical bar
                svg += `<rect x="${cx - crossThick/2}" y="${cy - crossSize}" width="${crossThick}" height="${crossSize * 2}" fill="${color}" fill-opacity="${fillOpacity / 100 * opacityVal}" stroke="${this.darkenColor(color, 40)}" stroke-width="${useStrokeWidth}"/>`;
                // Horizontal bar
                svg += `<rect x="${cx - crossSize}" y="${cy - crossThick/2}" width="${crossSize * 2}" height="${crossThick}" fill="${color}" fill-opacity="${fillOpacity / 100 * opacityVal}" stroke="${this.darkenColor(color, 40)}" stroke-width="${useStrokeWidth}"/>`;
                // Center diamond accent
                svg += `<polygon points="100,${90 * sizeMultiplier} ${110 * sizeMultiplier},100 100,${110 * sizeMultiplier} ${90 * sizeMultiplier},100" fill="${color2}" fill-opacity="${fillOpacity / 100 * opacityVal}" stroke="${this.darkenColor(color2, 40)}" stroke-width="${useStrokeWidth}"/>`;
                break;
                
            case 'hexagon':
                // Hexagon pattern - scaled
                const hexSize = 28 * sizeMultiplier;
                // Outer hexagon
                svg += this.createHexagon(cx, cy, hexSize, color, fillOpacity * opacityVal, useStrokeWidth * 2);
                // Inner hexagon
                svg += this.createHexagon(cx, cy, hexSize * 0.6, color2, fillOpacity * opacityVal, useStrokeWidth);
                // Center dot
                svg += `<circle cx="${cx}" cy="${cy}" r="${5 * sizeMultiplier}" fill="${color3}" stroke="${this.darkenColor(color3, 40)}" stroke-width="${useStrokeWidth}"/>`;
                break;
                
            case 'rosette':
                // Rosette flower design - scaled
                const rosettePetals = 8;
                const rosetteOuterR = 28 * sizeMultiplier;
                const rosetteInnerR = 12 * sizeMultiplier;
                
                for (let i = 0; i < rosettePetals; i++) {
                    const angle = (i / rosettePetals) * Math.PI * 2 - Math.PI / 2;
                    const petalColor = palette[i % palette.length];
                    
                    // Petal
                    const tipX = cx + Math.cos(angle) * rosetteOuterR;
                    const tipY = cy + Math.sin(angle) * rosetteOuterR;
                    const ctrlX1 = cx + Math.cos(angle - 0.4) * rosetteInnerR * 1.5;
                    const ctrlY1 = cy + Math.sin(angle - 0.4) * rosetteInnerR * 1.5;
                    const ctrlX2 = cx + Math.cos(angle + 0.4) * rosetteInnerR * 1.5;
                    const ctrlY2 = cy + Math.sin(angle + 0.4) * rosetteInnerR * 1.5;
                    
                    svg += `<path d="M${cx},${cy} Q${ctrlX1},${ctrlY1} ${tipX},${tipY} Q${ctrlX2},${ctrlY2} ${cx},${cy}" fill="${petalColor}" fill-opacity="${fillOpacity / 100 * opacityVal}" stroke="${this.darkenColor(petalColor, 30)}" stroke-width="${useStrokeWidth}"/>`;
                }
                // Center
                svg += `<circle cx="${cx}" cy="${cy}" r="${10 * sizeMultiplier}" fill="${color}" stroke="${this.darkenColor(color, 40)}" stroke-width="${useStrokeWidth * 2}"/>`;
                break;
                
            case 'compass':
                // Compass-like design - scaled
                const compassPoints = 4;
                const compassOuterR = 30 * sizeMultiplier;
                const compassInnerR = 15 * sizeMultiplier;
                
                for (let i = 0; i < compassPoints; i++) {
                    const angle = (i / compassPoints) * Math.PI * 2 - Math.PI / 2;
                    const nextAngle = ((i + 1) / compassPoints) * Math.PI * 2 - Math.PI / 2;
                    const midAngle = (angle + nextAngle) / 2;
                    
                    // Point triangle
                    const x1 = cx + Math.cos(angle) * compassOuterR;
                    const y1 = cy + Math.sin(angle) * compassOuterR;
                    const x2 = cx + Math.cos(nextAngle) * compassOuterR;
                    const y2 = cy + Math.sin(nextAngle) * compassOuterR;
                    const xm = cx + Math.cos(midAngle) * compassInnerR;
                    const ym = cy + Math.sin(midAngle) * compassInnerR;
                    
                    svg += `<polygon points="${x1},${y1} ${x2},${y2} ${xm},${ym}" fill="${palette[i % palette.length]}" fill-opacity="${fillOpacity / 100 * opacityVal}" stroke="${this.darkenColor(palette[i % palette.length], 30)}" stroke-width="${useStrokeWidth}"/>`;
                }
                // Center circle
                svg += `<circle cx="${cx}" cy="${cy}" r="${8 * sizeMultiplier}" fill="${color}" stroke="${this.darkenColor(color, 40)}" stroke-width="${useStrokeWidth * 2}"/>`;
                // Cardinal directions
                svg += `<line x1="${cx}" y1="${cy - 8 * sizeMultiplier}" x2="${cx}" y2="${cy - 20 * sizeMultiplier}" stroke="${this.darkenColor(color, 60)}" stroke-width="${useStrokeWidth}"/>`;
                svg += `<line x1="${cx}" y1="${cy + 8 * sizeMultiplier}" x2="${cx}" y2="${cy + 20 * sizeMultiplier}" stroke="${this.darkenColor(color, 60)}" stroke-width="${useStrokeWidth}"/>`;
                svg += `<line x1="${cx - 8 * sizeMultiplier}" y1="${cy}" x2="${cx - 20 * sizeMultiplier}" y2="${cy}" stroke="${this.darkenColor(color, 60)}" stroke-width="${useStrokeWidth}"/>`;
                svg += `<line x1="${cx + 8 * sizeMultiplier}" y1="${cy}" x2="${cx + 20 * sizeMultiplier}" y2="${cy}" stroke="${this.darkenColor(color, 60)}" stroke-width="${useStrokeWidth}"/>`;
                break;
                
            case 'crown':
                // Crown design - scaled
                const crownPoints = 5;
                const crownWidth = 50 * sizeMultiplier;
                const crownHeight = 20 * sizeMultiplier;
                
                // Crown base
                svg += `<rect x="${cx - crownWidth/2}" y="${cy + 5 * sizeMultiplier}" width="${crownWidth}" height="${10 * sizeMultiplier}" fill="${color}" fill-opacity="${fillOpacity / 100 * opacityVal}" stroke="${this.darkenColor(color, 40)}" stroke-width="${useStrokeWidth}"/>`;
                
                // Crown points
                for (let i = 0; i < crownPoints; i++) {
                    const x = cx - crownWidth/2 + (i + 0.5) * (crownWidth / crownPoints);
                    const pointColor = palette[i % palette.length];
                    svg += `<polygon points="${x - 8 * sizeMultiplier},${cy + 5 * sizeMultiplier} ${x},${cy - crownHeight} ${x + 8 * sizeMultiplier},${cy + 5 * sizeMultiplier}" fill="${pointColor}" fill-opacity="${fillOpacity / 100 * opacityVal}" stroke="${this.darkenColor(pointColor, 40)}" stroke-width="${useStrokeWidth}"/>`;
                }
                // Center gem
                svg += `<circle cx="${cx}" cy="${cy + 10 * sizeMultiplier}" r="${6 * sizeMultiplier}" fill="${color2}" stroke="${this.darkenColor(color2, 40)}" stroke-width="${useStrokeWidth}"/>`;
                break;
                
            case 'sun':
                // Sun burst design - scaled
                const sunRays = 12;
                const sunOuterR = 35 * sizeMultiplier;
                const sunInnerR = 15 * sizeMultiplier;
                
                // Center circle
                svg += `<circle cx="${cx}" cy="${cy}" r="${sunInnerR}" fill="${color}" fill-opacity="${fillOpacity / 100 * opacityVal}" stroke="${this.darkenColor(color, 40)}" stroke-width="${useStrokeWidth * 2}"/>`;
                
                // Rays
                for (let i = 0; i < sunRays; i++) {
                    const angle = (i / sunRays) * Math.PI * 2;
                    const rayColor = palette[i % palette.length];
                    
                    const x1 = cx + Math.cos(angle) * sunInnerR;
                    const y1 = cy + Math.sin(angle) * sunInnerR;
                    const x2 = cx + Math.cos(angle) * sunOuterR;
                    const y2 = cy + Math.sin(angle) * sunOuterR;
                    
                    svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${rayColor}" stroke-width="${useStrokeWidth * 2}" stroke-linecap="round" stroke-opacity="${opacityVal}"/>`;
                }
                // Inner detail
                svg += `<circle cx="${cx}" cy="${cy}" r="${6 * sizeMultiplier}" fill="${color2}" stroke="${this.darkenColor(color2, 40)}" stroke-width="${useStrokeWidth}"/>`;
                break;
                
            case 'target':
                // Target/bullseye design - scaled
                const targetRings = 4;
                const targetRingSize = 7 * sizeMultiplier;
                
                for (let r = targetRings; r >= 1; r--) {
                    const radius = r * targetRingSize;
                    const ringColor = palette[r % palette.length];
                    
                    svg += `<circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="${ringColor}" stroke-width="${useStrokeWidth * 1.5}" stroke-opacity="${opacityVal}"/>`;
                }
                // Center bullseye
                svg += `<circle cx="${cx}" cy="${cy}" r="${4 * sizeMultiplier}" fill="${color}" stroke="${this.darkenColor(color, 40)}" stroke-width="${useStrokeWidth}"/>`;
                break;
                
            // ============ NEW COMPLEX CENTERPIECE TYPES ============
            
            case 'arrow':
                // Arrow pointing up
                const arrowSize = 30 * sizeMultiplier;
                svg += `<polygon points="100,${cy - arrowSize} ${cx - arrowSize * 0.6},${cy + arrowSize * 0.4} ${cx - arrowSize * 0.2},${cy + arrowSize * 0.4} ${cx - arrowSize * 0.2},${cy + arrowSize} ${cx + arrowSize * 0.2},${cy + arrowSize} ${cx + arrowSize * 0.2},${cy + arrowSize * 0.4} ${cx + arrowSize * 0.6},${cy + arrowSize * 0.4}" fill="${color}" fill-opacity="${fillOpacity / 100 * opacityVal}" stroke="${this.darkenColor(color, 40)}" stroke-width="${useStrokeWidth * 2}"/>`;
                // Center line
                svg += `<line x1="${cx}" y1="${cy - arrowSize * 0.5}" x2="${cx}" y2="${cy + arrowSize * 0.8}" stroke="${color2}" stroke-width="${useStrokeWidth}"/>`;
                break;
            
            case 'fleur':
                // Fleur-de-lis style design
                const fleurSize = 28 * sizeMultiplier;
                // Center top
                svg += `<ellipse cx="${cx}" cy="${cy - fleurSize * 0.5}" rx="${fleurSize * 0.3}" ry="${fleurSize * 0.4}" fill="${color}" fill-opacity="${fillOpacity / 100 * opacityVal}" stroke="${this.darkenColor(color, 40)}" stroke-width="${useStrokeWidth}"/>`;
                // Left curving petals
                svg += `<path d="M${cx - fleurSize * 0.3},${cy - fleurSize * 0.2} Q${cx - fleurSize * 0.8},${cy - fleurSize * 0.3} ${cx - fleurSize * 0.6},${cy + fleurSize * 0.3}" fill="none" stroke="${color2}" stroke-width="${useStrokeWidth * 1.5}" stroke-linecap="round"/>`;
                svg += `<path d="M${cx - fleurSize * 0.3},${cy - fleurSize * 0.2} Q${cx - fleurSize * 0.8},${cy + fleurSize * 0.2} ${cx - fleurSize * 0.4},${cy + fleurSize * 0.5}" fill="none" stroke="${color2}" stroke-width="${useStrokeWidth * 1.5}" stroke-linecap="round"/>`;
                // Right curving petals
                svg += `<path d="M${cx + fleurSize * 0.3},${cy - fleurSize * 0.2} Q${cx + fleurSize * 0.8},${cy - fleurSize * 0.3} ${cx + fleurSize * 0.6},${cy + fleurSize * 0.3}" fill="none" stroke="${color2}" stroke-width="${useStrokeWidth * 1.5}" stroke-linecap="round"/>`;
                svg += `<path d="M${cx + fleurSize * 0.3},${cy - fleurSize * 0.2} Q${cx + fleurSize * 0.8},${cy + fleurSize * 0.2} ${cx + fleurSize * 0.4},${cy + fleurSize * 0.5}" fill="none" stroke="${color2}" stroke-width="${useStrokeWidth * 1.5}" stroke-linecap="round"/>`;
                // Bottom
                svg += `<path d="M${cx - fleurSize * 0.15},${cy + fleurSize * 0.3} L${cx},${cy + fleurSize * 0.8} L${cx + fleurSize * 0.15},${cy + fleurSize * 0.3}" fill="${color}" fill-opacity="${fillOpacity / 100 * opacityVal}" stroke="${this.darkenColor(color, 40)}" stroke-width="${useStrokeWidth}"/>`;
                break;
            
            case 'anchor':
                // Anchor design
                const anchorSize = 30 * sizeMultiplier;
                // Ring at top
                svg += `<circle cx="${cx}" cy="${cy - anchorSize * 0.7}" r="${anchorSize * 0.15}" fill="none" stroke="${color}" stroke-width="${useStrokeWidth * 2}"/>`;
                // Vertical shaft
                svg += `<line x1="${cx}" y1="${cy - anchorSize * 0.55}" x2="${cx}" y2="${cy + anchorSize * 0.5}" stroke="${color}" stroke-width="${useStrokeWidth * 2}"/>`;
                // Bottom curve (arms)
                svg += `<path d="M${cx - anchorSize * 0.6},${cy + anchorSize * 0.3} Q${cx - anchorSize * 0.6},${cy + anchorSize * 0.7} ${cx},${cy + anchorSize * 0.6} Q${cx + anchorSize * 0.6},${cy + anchorSize * 0.7} ${cx + anchorSize * 0.6},${cy + anchorSize * 0.3}" fill="none" stroke="${color}" stroke-width="${useStrokeWidth * 2}" stroke-linecap="round"/>`;
                // Arrow tips
                svg += `<polygon points="${cx - anchorSize * 0.6},${cy + anchorSize * 0.3} ${cx - anchorSize * 0.8},${cy + anchorSize * 0.5} ${cx - anchorSize * 0.4},${cy + anchorSize * 0.5}" fill="${color2}" stroke="${this.darkenColor(color2, 40)}" stroke-width="${useStrokeWidth}"/>`;
                svg += `<polygon points="${cx + anchorSize * 0.6},${cy + anchorSize * 0.3} ${cx + anchorSize * 0.8},${cy + anchorSize * 0.5} ${cx + anchorSize * 0.4},${cy + anchorSize * 0.5}" fill="${color2}" stroke="${this.darkenColor(color2, 40)}" stroke-width="${useStrokeWidth}"/>`;
                break;
            
            case 'yinYang':
                // Yin-Yang symbol
                const yySize = 35 * sizeMultiplier;
                // Main circle
                svg += `<circle cx="${cx}" cy="${cy}" r="${yySize}" fill="none" stroke="${color}" stroke-width="${useStrokeWidth * 2}"/>`;
                // Top half (white)
                svg += `<path d="M${cx},${cy - yySize} A${yySize},${yySize} 0 0,1 ${cx},${cy} A${yySize/2},${yySize/2} 0 0,0 ${cx},${cy - yySize}" fill="${color2}" fill-opacity="${opacityVal}" stroke="none"/>`;
                // Bottom half (colored)
                svg += `<path d="M${cx},${cy + yySize} A${yySize},${yySize} 0 0,1 ${cx},${cy} A${yySize/2},${yySize/2} 0 0,0 ${cx},${cy + yySize}" fill="${color}" fill-opacity="${opacityVal}" stroke="none"/>`;
                // Top dot
                svg += `<circle cx="${cx}" cy="${cy - yySize * 0.25}" r="${yySize * 0.12}" fill="${color}" stroke="none"/>`;
                // Bottom dot
                svg += `<circle cx="${cx}" cy="${cy + yySize * 0.25}" r="${yySize * 0.12}" fill="${color2}" stroke="none"/>`;
                break;
            
            case 'infinity':
                // Infinity symbol
                const infSize = 30 * sizeMultiplier;
                let infPath = `M${cx - infSize},${cy} `;
                infPath += `C${cx - infSize},${cy - infSize * 0.8} ${cx},${cy - infSize * 0.8} ${cx},${cy} `;
                infPath += `C${cx},${cy - infSize * 0.8} ${cx + infSize},${cy - infSize * 0.8} ${cx + infSize},${cy} `;
                infPath += `C${cx + infSize},${cy + infSize * 0.8} ${cx},${cy + infSize * 0.8} ${cx},${cy} `;
                infPath += `C${cx},${cy + infSize * 0.8} ${cx - infSize},${cy + infSize * 0.8} ${cx - infSize},${cy}`;
                svg += `<path d="${infPath}" fill="none" stroke="${color}" stroke-width="${useStrokeWidth * 2.5}" stroke-linecap="round"/>`;
                // Center dot
                svg += `<circle cx="${cx}" cy="${cy}" r="${5 * sizeMultiplier}" fill="${color2}" stroke="${this.darkenColor(color2, 40)}" stroke-width="${useStrokeWidth}"/>`;
                break;
            
            case 'trebleClef':
                // Treble clef style design
                const tcSize = 35 * sizeMultiplier;
                // Main curve
                let tcPath = `M${cx + tcSize * 0.1},${cy - tcSize * 0.8} `;
                tcPath += `C${cx + tcSize * 0.4},${cy - tcSize * 0.8} ${cx + tcSize * 0.3},${cy - tcSize * 0.2} ${cx},${cy + tcSize * 0.1} `;
                tcPath += `C${cx - tcSize * 0.2},${cy + tcSize * 0.3} ${cx - tcSize * 0.3},${cy + tcSize * 0.5} ${cx - tcSize * 0.1},${cy + tcSize * 0.7} `;
                tcPath += `C${cx + tcSize * 0.1},${cy + tcSize * 0.6} ${cx + tcSize * 0.2},${cy + tcSize * 0.4} ${cx + tcSize * 0.1},${cy + tcSize * 0.1} `;
                tcPath += `C${cx - tcSize * 0.1},${cy - tcSize * 0.1} ${cx - tcSize * 0.2},${cy - tcSize * 0.4} ${cx - tcSize * 0.1},${cy - tcSize * 0.6}`;
                svg += `<path d="${tcPath}" fill="none" stroke="${color}" stroke-width="${useStrokeWidth * 2}" stroke-linecap="round"/>`;
                // Bottom bulb
                svg += `<ellipse cx="${cx - tcSize * 0.1}" cy="${cy + tcSize * 0.75}" rx="${tcSize * 0.15}" ry="${tcSize * 0.2}" fill="${color2}" fill-opacity="${fillOpacity / 100 * opacityVal}" stroke="${this.darkenColor(color2, 40)}" stroke-width="${useStrokeWidth}"/>`;
                break;
            
            case 'book':
                // Open book design
                const bookSize = 30 * sizeMultiplier;
                // Left page
                svg += `<path d="M${cx},${cy - bookSize * 0.6} Q${cx - bookSize * 0.5},${cy - bookSize * 0.4} ${cx - bookSize * 0.7},${cy + bookSize * 0.6} L${cx},${cy + bookSize * 0.7}" fill="${color}" fill-opacity="${fillOpacity / 100 * opacityVal}" stroke="${this.darkenColor(color, 40)}" stroke-width="${useStrokeWidth}"/>`;
                // Right page
                svg += `<path d="M${cx},${cy - bookSize * 0.6} Q${cx + bookSize * 0.5},${cy - bookSize * 0.4} ${cx + bookSize * 0.7},${cy + bookSize * 0.6} L${cx},${cy + bookSize * 0.7}" fill="${color2}" fill-opacity="${fillOpacity / 100 * opacityVal}" stroke="${this.darkenColor(color2, 40)}" stroke-width="${useStrokeWidth}"/>`;
                // Center spine
                svg += `<line x1="${cx}" y1="${cy - bookSize * 0.6}" x2="${cx}" y2="${cy + bookSize * 0.7}" stroke="${color3}" stroke-width="${useStrokeWidth * 1.5}"/>`;
                // Page lines left
                for (let i = 1; i <= 3; i++) {
                    svg += `<line x1="${cx - bookSize * 0.15 * i}" y1="${cy - bookSize * 0.3}" x2="${cx - bookSize * (0.7 - 0.15 * i)}" y2="${cy + bookSize * 0.5}" stroke="${this.darkenColor(color, 30)}" stroke-width="${useStrokeWidth * 0.5}"/>`;
                }
                // Page lines right
                for (let i = 1; i <= 3; i++) {
                    svg += `<line x1="${cx + bookSize * 0.15 * i}" y1="${cy - bookSize * 0.3}" x2="${cx + bookSize * (0.7 - 0.15 * i)}" y2="${cy + bookSize * 0.5}" stroke="${this.darkenColor(color2, 30)}" stroke-width="${useStrokeWidth * 0.5}"/>`;
                }
                break;
            
            case 'gem':
                // Gem/diamond shape
                const gemSize = 30 * sizeMultiplier;
                // Top triangle
                svg += `<polygon points="100,${cy - gemSize} ${cx - gemSize},${cy} ${cx + gemSize},${cy}" fill="${color}" fill-opacity="${fillOpacity / 100 * opacityVal}" stroke="${this.darkenColor(color, 40)}" stroke-width="${useStrokeWidth * 2}"/>`;
                // Bottom triangle
                svg += `<polygon points="100,${cy + gemSize} ${cx - gemSize},${cy} ${cx + gemSize},${cy}" fill="${color2}" fill-opacity="${fillOpacity / 100 * opacityVal}" stroke="${this.darkenColor(color2, 40)}" stroke-width="${useStrokeWidth * 2}"/>`;
                // Facet lines
                svg += `<line x1="${cx - gemSize * 0.5}" y1="${cy - gemSize * 0.5}" x2="${cx + gemSize * 0.5}" y2="${cy - gemSize * 0.5}" stroke="${this.darkenColor(color, 50)}" stroke-width="${useStrokeWidth}"/>`;
                svg += `<line x1="${cx - gemSize * 0.5}" y1="${cy + gemSize * 0.5}" x2="${cx + gemSize * 0.5}" y2="${cy + gemSize * 0.5}" stroke="${this.darkenColor(color2, 50)}" stroke-width="${useStrokeWidth}"/>`;
                // Center highlight
                svg += `<polygon points="100,${cy - gemSize * 0.3} ${cx - gemSize * 0.3},${cy} ${cx},${cy + gemSize * 0.3} ${cx + gemSize * 0.3},${cy}" fill="${color3}" fill-opacity="${fillOpacity / 100 * opacityVal * 0.5}" stroke="none"/>`;
                break;
            
            case 'key':
                // Key design
                const keySize = 35 * sizeMultiplier;
                // Ring (head)
                svg += `<circle cx="${cx + keySize * 0.4}" cy="${cy - keySize * 0.3}" r="${keySize * 0.25}" fill="none" stroke="${color}" stroke-width="${useStrokeWidth * 2}"/>`;
                // Shaft
                svg += `<line x1="${cx + keySize * 0.15}" y1="${cy - keySize * 0.05}" x2="${cx - keySize * 0.5}" y2="${cy + keySize * 0.5}" stroke="${color}" stroke-width="${useStrokeWidth * 2}" stroke-linecap="round"/>`;
                // Teeth
                svg += `<line x1="${cx - keySize * 0.2}" y1="${cy + keySize * 0.15}" x2="${cx - keySize * 0.2}" y2="${cy + keySize * 0.45}" stroke="${color}" stroke-width="${useStrokeWidth * 1.5}" stroke-linecap="round"/>`;
                svg += `<line x1="${cx - keySize * 0.35}" y1="${cy + keySize * 0.25}" x2="${cx - keySize * 0.35}" y2="${cy + keySize * 0.45}" stroke="${color}" stroke-width="${useStrokeWidth * 1.5}" stroke-linecap="round"/>`;
                // Decorative
                svg += `<circle cx="${cx + keySize * 0.4}" cy="${cy - keySize * 0.3}" r="${keySize * 0.1}" fill="${color2}" stroke="none"/>`;
                break;
            
            case 'butterfly':
                // Butterfly design
                const bfSize = 28 * sizeMultiplier;
                // Left wing upper
                svg += `<ellipse cx="${cx - bfSize * 0.5}" cy="${cy - bfSize * 0.3}" rx="${bfSize * 0.45}" ry="${bfSize * 0.35}" fill="${color}" fill-opacity="${fillOpacity / 100 * opacityVal}" stroke="${this.darkenColor(color, 40)}" stroke-width="${useStrokeWidth}"/>`;
                // Left wing lower
                svg += `<ellipse cx="${cx - bfSize * 0.45}" cy="${cy + bfSize * 0.35}" rx="${bfSize * 0.35}" ry="${bfSize * 0.3}" fill="${color2}" fill-opacity="${fillOpacity / 100 * opacityVal}" stroke="${this.darkenColor(color2, 40)}" stroke-width="${useStrokeWidth}"/>`;
                // Right wing upper
                svg += `<ellipse cx="${cx + bfSize * 0.5}" cy="${cy - bfSize * 0.3}" rx="${bfSize * 0.45}" ry="${bfSize * 0.35}" fill="${color}" fill-opacity="${fillOpacity / 100 * opacityVal}" stroke="${this.darkenColor(color, 40)}" stroke-width="${useStrokeWidth}"/>`;
                // Right wing lower
                svg += `<ellipse cx="${cx + bfSize * 0.45}" cy="${cy + bfSize * 0.35}" rx="${bfSize * 0.35}" ry="${bfSize * 0.3}" fill="${color2}" fill-opacity="${fillOpacity / 100 * opacityVal}" stroke="${this.darkenColor(color2, 40)}" stroke-width="${useStrokeWidth}"/>`;
                // Body
                svg += `<ellipse cx="${cx}" cy="${cy}" rx="${bfSize * 0.1}" ry="${bfSize * 0.5}" fill="${color3}" stroke="${this.darkenColor(color3, 40)}" stroke-width="${useStrokeWidth}"/>`;
                // Antennae
                svg += `<path d="M${cx - bfSize * 0.05},${cy - bfSize * 0.5} Q${cx - bfSize * 0.2},${cy - bfSize * 0.8} ${cx - bfSize * 0.3},${cy - bfSize * 0.7}" fill="none" stroke="${color3}" stroke-width="${useStrokeWidth}" stroke-linecap="round"/>`;
                svg += `<path d="M${cx + bfSize * 0.05},${cy - bfSize * 0.5} Q${cx + bfSize * 0.2},${cy - bfSize * 0.8} ${cx + bfSize * 0.3},${cy - bfSize * 0.7}" fill="none" stroke="${color3}" stroke-width="${useStrokeWidth}" stroke-linecap="round"/>`;
                // Wing patterns
                svg += `<circle cx="${cx - bfSize * 0.5}" cy="${cy - bfSize * 0.3}" r="${bfSize * 0.15}" fill="${color3}" fill-opacity="${opacityVal}"/>`;
                svg += `<circle cx="${cx + bfSize * 0.5}" cy="${cy - bfSize * 0.3}" r="${bfSize * 0.15}" fill="${color3}" fill-opacity="${opacityVal}"/>`;
                break;
        }
        
        return svg;
    },
    
    // Generate corners - Center-symmetric designs
    generateCorners(style, palette, strokeWidth, cornerStrokeWidth = null, cornerOpacity = 100) {
        let svg = '';
        const color = palette[0];
        const color2 = palette[1] || palette[0];
        const useStrokeWidth = cornerStrokeWidth !== null ? cornerStrokeWidth : strokeWidth;
        const opacityVal = cornerOpacity / 100;
        
        // For center-symmetric patterns, we define pairs:
        // Pair 1: Top-left (15,15) and Bottom-right (185,185) - mirror via 180° rotation
        // Pair 2: Top-right (185,15) and Bottom-left (15,185) - mirror via 180° rotation
        
        const tl = { x: 15, y: 15 };   // Top-left
        const br = { x: 185, y: 185 }; // Bottom-right
        const tr = { x: 185, y: 15 };  // Top-right
        const bl = { x: 15, y: 185 };  // Bottom-left
        
        switch (style) {
            case 'simple':
                // Center-symmetric: concentric circles
                // Top-left + Bottom-right pair
                svg += `<circle cx="${tl.x}" cy="${tl.y}" r="8" fill="none" stroke="${color}" stroke-width="${useStrokeWidth}" stroke-opacity="${opacityVal}"/>`;
                svg += `<circle cx="${br.x}" cy="${br.y}" r="8" fill="none" stroke="${color}" stroke-width="${useStrokeWidth}" stroke-opacity="${opacityVal}"/>`;
                // Top-right + Bottom-left pair
                svg += `<circle cx="${tr.x}" cy="${tr.y}" r="6" fill="none" stroke="${color2}" stroke-width="${useStrokeWidth * 0.8}" stroke-opacity="${opacityVal}"/>`;
                svg += `<circle cx="${bl.x}" cy="${bl.y}" r="6" fill="none" stroke="${color2}" stroke-width="${useStrokeWidth * 0.8}" stroke-opacity="${opacityVal}"/>`;
                break;
                
            case 'flourish':
                // Center-symmetric flourish: mirrored curls
                // Top-left: curl going inwards
                svg += `<path d="M${tl.x},${tl.y + 18} Q${tl.x},${tl.x} ${tl.x + 18},${tl.y}" fill="none" stroke="${color}" stroke-width="${useStrokeWidth * 1.5}" stroke-linecap="round" stroke-opacity="${opacityVal}"/>`;
                svg += `<circle cx="${tl.x + 6}" cy="${tl.y + 6}" r="4" fill="${color}" fill-opacity="${opacityVal}"/>`;
                // Bottom-right: mirrored curl
                svg += `<path d="M${br.x},${br.y - 18} Q${br.x},${br.y} ${br.x - 18},${br.y}" fill="none" stroke="${color}" stroke-width="${useStrokeWidth * 1.5}" stroke-linecap="round" stroke-opacity="${opacityVal}"/>`;
                svg += `<circle cx="${br.x - 6}" cy="${br.y - 6}" r="4" fill="${color}" fill-opacity="${opacityVal}"/>`;
                
                // Top-right: different flourish
                svg += `<path d="M${tr.x - 18},${tr.y} Q${tr.x},${tr.y} ${tr.x},${tr.y + 18}" fill="none" stroke="${color2}" stroke-width="${useStrokeWidth * 1.5}" stroke-linecap="round" stroke-opacity="${opacityVal}"/>`;
                svg += `<circle cx="${tr.x - 6}" cy="${tr.y + 6}" r="4" fill="${color2}" fill-opacity="${opacityVal}"/>`;
                // Bottom-left: mirrored
                svg += `<path d="M${bl.x + 18},${bl.y} Q${bl.x},${bl.y} ${bl.x},${bl.y - 18}" fill="none" stroke="${color2}" stroke-width="${useStrokeWidth * 1.5}" stroke-linecap="round" stroke-opacity="${opacityVal}"/>`;
                svg += `<circle cx="${bl.x + 6}" cy="${bl.y - 6}" r="4" fill="${color2}" fill-opacity="${opacityVal}"/>`;
                break;
                
            case 'diamond':
                // Center-symmetric diamonds
                // Top-left + Bottom-right pair (same orientation)
                svg += `<polygon points="${tl.x},${tl.y - 12} ${tl.x + 12},${tl.y} ${tl.x},${tl.y + 12} ${tl.x - 12},${tl.y}" fill="${color}" fill-opacity="${0.4 * opacityVal}" stroke="${color}" stroke-width="${useStrokeWidth}"/>`;
                svg += `<polygon points="${br.x},${br.y - 12} ${br.x + 12},${br.y} ${br.x},${br.y + 12} ${br.x - 12},${br.y}" fill="${color}" fill-opacity="${0.4 * opacityVal}" stroke="${color}" stroke-width="${useStrokeWidth}"/>`;
                // Top-right + Bottom-left pair (rotated 90°)
                svg += `<polygon points="${tr.x},${tr.y - 10} ${tr.x + 10},${tr.y} ${tr.x},${tr.y + 10} ${tr.x - 10},${tr.y}" fill="${color2}" fill-opacity="${0.3 * opacityVal}" stroke="${color2}" stroke-width="${useStrokeWidth * 0.8}"/>`;
                svg += `<polygon points="${bl.x},${bl.y - 10} ${bl.x + 10},${bl.y} ${bl.x},${bl.y + 10} ${bl.x - 10},${bl.y}" fill="${color2}" fill-opacity="${0.3 * opacityVal}" stroke="${color2}" stroke-width="${useStrokeWidth * 0.8}"/>`;
                break;
                
            case 'shell':
                // Shell/Scallop pattern - center symmetric
                const shellR = 12;
                // Top-left shell (curved outward)
                svg += `<path d="M${tl.x - shellR},${tl.y} A${shellR},${shellR} 0 0,1 ${tl.x + shellR},${tl.y}" fill="none" stroke="${color}" stroke-width="${useStrokeWidth * 1.2}" stroke-opacity="${opacityVal}"/>`;
                svg += `<path d="M${tl.x - shellR * 0.7},${tl.y} A${shellR * 0.7},${shellR * 0.7} 0 0,1 ${tl.x + shellR * 0.7},${tl.y}" fill="none" stroke="${color}" stroke-width="${useStrokeWidth * 0.8}" stroke-opacity="${opacityVal}"/>`;
                // Bottom-right shell (mirrored)
                svg += `<path d="M${br.x + shellR},${br.y} A${shellR},${shellR} 0 0,1 ${br.x - shellR},${br.y}" fill="none" stroke="${color}" stroke-width="${useStrokeWidth * 1.2}" stroke-opacity="${opacityVal}"/>`;
                svg += `<path d="M${br.x + shellR * 0.7},${br.y} A${shellR * 0.7},${shellR * 0.7} 0 0,1 ${br.x - shellR * 0.7},${br.y}" fill="none" stroke="${color}" stroke-width="${useStrokeWidth * 0.8}" stroke-opacity="${opacityVal}"/>`;
                // Top-right shell
                svg += `<path d="M${tr.x},${tr.y - shellR} A${shellR},${shellR} 0 0,1 ${tr.x},${tr.y + shellR}" fill="none" stroke="${color2}" stroke-width="${useStrokeWidth * 1.2}" stroke-opacity="${opacityVal}"/>`;
                svg += `<path d="M${tr.x},${tr.y - shellR * 0.7} A${shellR * 0.7},${shellR * 0.7} 0 0,1 ${tr.x},${tr.y + shellR * 0.7}" fill="none" stroke="${color2}" stroke-width="${useStrokeWidth * 0.8}" stroke-opacity="${opacityVal}"/>`;
                // Bottom-left shell
                svg += `<path d="M${bl.x},${bl.y + shellR} A${shellR},${shellR} 0 0,1 ${bl.x},${bl.y - shellR}" fill="none" stroke="${color2}" stroke-width="${useStrokeWidth * 1.2}" stroke-opacity="${opacityVal}"/>`;
                svg += `<path d="M${bl.x},${bl.y + shellR * 0.7} A${shellR * 0.7},${shellR * 0.7} 0 0,1 ${bl.x},${bl.y - shellR * 0.7}" fill="none" stroke="${color2}" stroke-width="${useStrokeWidth * 0.8}" stroke-opacity="${opacityVal}"/>`;
                break;
                
            case 'wave':
                // Wave patterns - center symmetric
                const waveSize = 14;
                // Top-left wave (curved inward)
                svg += `<path d="M${tl.x},${tl.y + waveSize} Q${tl.x + waveSize * 0.5},${tl.y + waveSize * 0.3} ${tl.x + waveSize},${tl.y}" fill="none" stroke="${color}" stroke-width="${useStrokeWidth * 1.3}" stroke-linecap="round" stroke-opacity="${opacityVal}"/>`;
                // Bottom-right wave (mirrored)
                svg += `<path d="M${br.x},${br.y - waveSize} Q${br.x - waveSize * 0.5},${br.y - waveSize * 0.3} ${br.x - waveSize},${br.y}" fill="none" stroke="${color}" stroke-width="${useStrokeWidth * 1.3}" stroke-linecap="round" stroke-opacity="${opacityVal}"/>`;
                // Top-right wave
                svg += `<path d="M${tr.x - waveSize},${tr.y} Q${tr.x - waveSize * 0.3},${tr.y + waveSize * 0.5} ${tr.x},${tr.y + waveSize}" fill="none" stroke="${color2}" stroke-width="${useStrokeWidth * 1.3}" stroke-linecap="round" stroke-opacity="${opacityVal}"/>`;
                // Bottom-left wave (mirrored)
                svg += `<path d="M${bl.x + waveSize},${bl.y} Q${bl.x + waveSize * 0.3},${bl.y - waveSize * 0.5} ${bl.x},${bl.y - waveSize}" fill="none" stroke="${color2}" stroke-width="${useStrokeWidth * 1.3}" stroke-linecap="round" stroke-opacity="${opacityVal}"/>`;
                break;
                
            case 'star':
                // Small stars - center symmetric
                // Top-left + Bottom-right (same orientation)
                svg += this.createMiniStar(tl.x, tl.y, 10, color, useStrokeWidth, opacityVal);
                svg += this.createMiniStar(br.x, br.y, 10, color, useStrokeWidth, opacityVal);
                // Top-right + Bottom-left (rotated)
                svg += this.createMiniStar(tr.x, tr.y, 8, color2, useStrokeWidth * 0.8, opacityVal);
                svg += this.createMiniStar(bl.x, bl.y, 8, color2, useStrokeWidth * 0.8, opacityVal);
                break;
                
            case 'leaf':
                // Leaf scrolls - center symmetric
                // Top-left leaf curving inward
                svg += `<path d="M${tl.x + 5},${tl.y + 15} Q${tl.x + 15},${tl.y + 15} ${tl.x + 15},${tl.y + 5}" fill="none" stroke="${color}" stroke-width="${useStrokeWidth * 1.2}" stroke-linecap="round" stroke-opacity="${opacityVal}"/>`;
                svg += `<ellipse cx="${tl.x + 10}" cy="${tl.y + 10}" rx="5" ry="3" transform="rotate(45, ${tl.x + 10}, ${tl.y + 10})" fill="${color}" fill-opacity="${0.5 * opacityVal}"/>`;
                // Bottom-right mirrored leaf
                svg += `<path d="M${br.x - 5},${br.y - 15} Q${br.x - 15},${br.y - 15} ${br.x - 15},${br.y - 5}" fill="none" stroke="${color}" stroke-width="${useStrokeWidth * 1.2}" stroke-linecap="round" stroke-opacity="${opacityVal}"/>`;
                svg += `<ellipse cx="${br.x - 10}" cy="${br.y - 10}" rx="5" ry="3" transform="rotate(45, ${br.x - 10}, ${br.y - 10})" fill="${color}" fill-opacity="${0.5 * opacityVal}"/>`;
                // Top-right leaf
                svg += `<path d="M${tr.x - 15},${tr.y + 5} Q${tr.x - 15},${tr.y + 15} ${tr.x - 5},${tr.y + 15}" fill="none" stroke="${color2}" stroke-width="${useStrokeWidth * 1.2}" stroke-linecap="round" stroke-opacity="${opacityVal}"/>`;
                svg += `<ellipse cx="${tr.x - 10}" cy="${tr.y + 10}" rx="5" ry="3" transform="rotate(-45, ${tr.x - 10}, ${tr.y + 10})" fill="${color2}" fill-opacity="${0.5 * opacityVal}"/>`;
                // Bottom-left mirrored
                svg += `<path d="M${bl.x + 15},${bl.y - 5} Q${bl.x + 15},${bl.y - 15} ${bl.x + 5},${bl.y - 15}" fill="none" stroke="${color2}" stroke-width="${useStrokeWidth * 1.2}" stroke-linecap="round" stroke-opacity="${opacityVal}"/>`;
                svg += `<ellipse cx="${bl.x + 10}" cy="${bl.y - 10}" rx="5" ry="3" transform="rotate(-45, ${bl.x + 10}, ${bl.y - 10})" fill="${color2}" fill-opacity="${0.5 * opacityVal}"/>`;
                break;
                
            case 'curved':
                // Elegant curved scrolls - center symmetric
                // Top-left: elegant S-curve
                svg += `<path d="M${tl.x},${tl.y + 20} Q${tl.x + 5},${tl.y + 10} ${tl.x + 15},${tl.y + 10} Q${tl.x + 20},${tl.y + 10} ${tl.x + 20},${tl.y}" fill="none" stroke="${color}" stroke-width="${useStrokeWidth * 1.2}" stroke-linecap="round" stroke-opacity="${opacityVal}"/>`;
                // Bottom-right: mirrored S-curve
                svg += `<path d="M${br.x},${br.y - 20} Q${br.x - 5},${br.y - 10} ${br.x - 15},${br.y - 10} Q${br.x - 20},${br.y - 10} ${br.x - 20},${br.y}" fill="none" stroke="${color}" stroke-width="${useStrokeWidth * 1.2}" stroke-linecap="round" stroke-opacity="${opacityVal}"/>`;
                // Top-right: opposite S-curve
                svg += `<path d="M${tr.x - 20},${tr.y} Q${tr.x - 15},${tr.y + 10} ${tr.x - 5},${tr.y + 10} Q${tr.x},${tr.y + 10} ${tr.x},${tr.y + 20}" fill="none" stroke="${color2}" stroke-width="${useStrokeWidth * 1.2}" stroke-linecap="round" stroke-opacity="${opacityVal}"/>`;
                // Bottom-left: mirrored
                svg += `<path d="M${bl.x + 20},${bl.y} Q${bl.x + 15},${bl.y - 10} ${bl.x + 5},${bl.y - 10} Q${bl.x},${bl.y - 10} ${bl.x},${bl.y - 20}" fill="none" stroke="${color2}" stroke-width="${useStrokeWidth * 1.2}" stroke-linecap="round" stroke-opacity="${opacityVal}"/>`;
                break;
                
            case 'arcs':
                // Concentric arcs - center symmetric
                const arcCount = 2;
                // Top-left + Bottom-right
                for (let i = 1; i <= arcCount; i++) {
                    const r = i * 7;
                    svg += `<path d="M${tl.x - r},${tl.y} A${r},${r} 0 0,1 ${tl.x},${tl.y - r}" fill="none" stroke="${color}" stroke-width="${useStrokeWidth}" stroke-linecap="round" stroke-opacity="${opacityVal}"/>`;
                    svg += `<path d="M${br.x + r},${br.y} A${r},${r} 0 0,1 ${br.x},${br.y + r}" fill="none" stroke="${color}" stroke-width="${useStrokeWidth}" stroke-linecap="round" stroke-opacity="${opacityVal}"/>`;
                }
                // Top-right + Bottom-left
                for (let i = 1; i <= arcCount; i++) {
                    const r = i * 6;
                    svg += `<path d="M${tr.x},${tr.y - r} A${r},${r} 0 0,1 ${tr.x + r},${tr.y}" fill="none" stroke="${color2}" stroke-width="${useStrokeWidth * 0.8}" stroke-linecap="round" stroke-opacity="${opacityVal}"/>`;
                    svg += `<path d="M${bl.x},${bl.y + r} A${r},${r} 0 0,1 ${bl.x - r},${bl.y}" fill="none" stroke="${color2}" stroke-width="${useStrokeWidth * 0.8}" stroke-linecap="round" stroke-opacity="${opacityVal}"/>`;
                }
                break;
                
            case 'spiral':
                // Spiral patterns - center symmetric
                // Top-left: small spiral
                let spiralPath = `M${tl.x + 5},${tl.y + 5} `;
                for (let i = 0; i < 20; i++) {
                    const angle = i * 0.4;
                    const radius = 2 + i * 0.6;
                    const x = tl.x + 5 + Math.cos(angle) * radius;
                    const y = tl.y + 5 + Math.sin(angle) * radius;
                    spiralPath += `L${x},${y} `;
                }
                svg += `<path d="${spiralPath}" fill="none" stroke="${color}" stroke-width="${useStrokeWidth * 1.2}" stroke-linecap="round" stroke-opacity="${opacityVal}"/>`;
                
                // Bottom-right: mirrored spiral
                let spiralPath2 = `M${br.x - 5},${br.y - 5} `;
                for (let i = 0; i < 20; i++) {
                    const angle = i * 0.4 + Math.PI;
                    const radius = 2 + i * 0.6;
                    const x = br.x - 5 + Math.cos(angle) * radius;
                    const y = br.y - 5 + Math.sin(angle) * radius;
                    spiralPath2 += `L${x},${y} `;
                }
                svg += `<path d="${spiralPath2}" fill="none" stroke="${color}" stroke-width="${useStrokeWidth * 1.2}" stroke-linecap="round" stroke-opacity="${opacityVal}"/>`;
                
                // Top-right spiral
                let spiralPath3 = `M${tr.x - 5},${tr.y + 5} `;
                for (let i = 0; i < 18; i++) {
                    const angle = i * 0.4 + Math.PI / 2;
                    const radius = 2 + i * 0.5;
                    const x = tr.x - 5 + Math.cos(angle) * radius;
                    const y = tr.y + 5 + Math.sin(angle) * radius;
                    spiralPath3 += `L${x},${y} `;
                }
                svg += `<path d="${spiralPath3}" fill="none" stroke="${color2}" stroke-width="${useStrokeWidth}" stroke-linecap="round" stroke-opacity="${opacityVal}"/>`;
                
                // Bottom-left spiral
                let spiralPath4 = `M${bl.x + 5},${bl.y - 5} `;
                for (let i = 0; i < 18; i++) {
                    const angle = i * 0.4 - Math.PI / 2;
                    const radius = 2 + i * 0.5;
                    const x = bl.x + 5 + Math.cos(angle) * radius;
                    const y = bl.y - 5 + Math.sin(angle) * radius;
                    spiralPath4 += `L${x},${y} `;
                }
                svg += `<path d="${spiralPath4}" fill="none" stroke="${color2}" stroke-width="${useStrokeWidth}" stroke-linecap="round" stroke-opacity="${opacityVal}"/>`;
                break;
        }
        
        return svg;
    },
    
    // Helper for mini star in corners
    createMiniStar(cx, cy, size, color, strokeWidth, opacity = 1) {
        const points = 4;
        const outerR = size;
        const innerR = size * 0.4;
        let d = '';
        
        for (let i = 0; i < points * 2; i++) {
            const angle = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2;
            const r = i % 2 === 0 ? outerR : innerR;
            const x = cx + Math.cos(angle) * r;
            const y = cy + Math.sin(angle) * r;
            d += i === 0 ? `M${x},${y} ` : `L${x},${y} `;
        }
        d += 'Z';
        
        return `<path d="${d}" fill="${color}" fill-opacity="${0.6 * opacity}" stroke="${color}" stroke-width="${strokeWidth}" stroke-opacity="${opacity}"/>`;
    },
    
    // Generate border
    generateBorder(style, color, width, opacity = 100) {
        let svg = '';
        const opacityVal = opacity / 100;
        
        switch (style) {
            case 'simple':
                svg += `<rect x="${5}" y="5" width="190" height="190" fill="none" stroke="${color}" stroke-width="${width}" stroke-opacity="${opacityVal}"/>`;
                break;
                
            case 'double':
                svg += `<rect x="${5}" y="5" width="190" height="190" fill="none" stroke="${color}" stroke-width="${width}" stroke-opacity="${opacityVal}"/>`;
                svg += `<rect x="${5 + width + 3}" y="${5 + width + 3}" width="${190 - (width + 3) * 2}" height="${190 - (width + 3) * 2}" fill="none" stroke="${color}" stroke-width="${width * 0.6}" stroke-opacity="${opacityVal}"/>`;
                break;
                
            case 'ornate':
                svg += `<rect x="${5}" y="5" width="190" height="190" fill="none" stroke="${color}" stroke-width="${width}" stroke-opacity="${opacityVal}"/>`;
                // Corner decorations
                const corners = [
                    { x: 5, y: 5 },
                    { x: 195, y: 5 },
                    { x: 195, y: 195 },
                    { x: 5, y: 195 }
                ];
                corners.forEach(corner => {
                    svg += `<circle cx="${corner.x}" cy="${corner.y}" r="${width * 0.8}" fill="none" stroke="${color}" stroke-width="${width * 0.5}" stroke-opacity="${opacityVal}"/>`;
                });
                break;

            case 'wave':
                // Wavy border
                const wavePoints = 20;
                const waveAmp = width * 0.5;
                let wavePath = `M5,5 `;
                // Top
                for (let i = 1; i <= wavePoints; i++) {
                    const x = 5 + i * (190 / wavePoints);
                    const y = 5 + Math.sin(i * 0.8) * waveAmp;
                    wavePath += `L${x},${y} `;
                }
                // Right
                for (let i = 1; i <= wavePoints; i++) {
                    const x = 195 + Math.sin(i * 0.8) * waveAmp;
                    const y = 5 + i * (190 / wavePoints);
                    wavePath += `L${x},${y} `;
                }
                // Bottom
                for (let i = 1; i <= wavePoints; i++) {
                    const x = 195 - i * (190 / wavePoints);
                    const y = 195 + Math.sin(i * 0.8) * waveAmp;
                    wavePath += `L${x},${y} `;
                }
                // Left
                for (let i = 1; i <= wavePoints; i++) {
                    const x = 5 + Math.sin(i * 0.8) * waveAmp;
                    const y = 195 - i * (190 / wavePoints);
                    wavePath += `L${x},${y} `;
                }
                wavePath += 'Z';
                svg += `<path d="${wavePath}" fill="none" stroke="${color}" stroke-width="${width * 0.6}" stroke-opacity="${opacityVal}" stroke-linejoin="round"/>`;
                break;

            case 'dotted':
                // Dotted/Dashed border
                svg += `<rect x="5" y="5" width="190" height="190" fill="none" stroke="${color}" stroke-width="${width}" stroke-opacity="${opacityVal}" stroke-dasharray="${width},${width}"/>`;
                break;

            case 'zigzag':
                // Zigzag border
                const zigSteps = 15;
                const zigAmp = width * 0.6;
                let zigPath = `M5,5 `;
                // Top
                for (let i = 0; i < zigSteps; i++) {
                    const x1 = 5 + (i + 0.5) * (190 / zigSteps);
                    const x2 = 5 + (i + 1) * (190 / zigSteps);
                    zigPath += `L${x1},${5 - zigAmp} L${x2},5 `;
                }
                // Right
                for (let i = 0; i < zigSteps; i++) {
                    const y1 = 5 + (i + 0.5) * (190 / zigSteps);
                    const y2 = 5 + (i + 1) * (190 / zigSteps);
                    zigPath += `L${195 + zigAmp},${y1} L${195},${y2} `;
                }
                // Bottom
                for (let i = 0; i < zigSteps; i++) {
                    const x1 = 195 - (i + 0.5) * (190 / zigSteps);
                    const x2 = 195 - (i + 1) * (190 / zigSteps);
                    zigPath += `L${x1},${195 + zigAmp} L${x2},195 `;
                }
                // Left
                for (let i = 0; i < zigSteps; i++) {
                    const y1 = 195 - (i + 0.5) * (190 / zigSteps);
                    const y2 = 195 - (i + 1) * (190 / zigSteps);
                    zigPath += `L${5 - zigAmp},${y1} L${5},${y2} `;
                }
                zigPath += 'Z';
                svg += `<path d="${zigPath}" fill="none" stroke="${color}" stroke-width="${width * 0.5}" stroke-opacity="${opacityVal}" stroke-linejoin="miter"/>`;
                break;

            case 'geometric':
                // Geometric pattern border (squares)
                const geoSteps = 10;
                const geoSize = 190 / geoSteps;
                for (let i = 0; i < geoSteps; i++) {
                    // Top
                    svg += `<rect x="${5 + i * geoSize + 2}" y="${5 - width/2}" width="${geoSize - 4}" height="${width}" fill="${color}" fill-opacity="${opacityVal * 0.7}" stroke="none"/>`;
                    // Bottom
                    svg += `<rect x="${5 + i * geoSize + 2}" y="${195 - width/2}" width="${geoSize - 4}" height="${width}" fill="${color}" fill-opacity="${opacityVal * 0.7}" stroke="none"/>`;
                    // Left
                    svg += `<rect x="${5 - width/2}" y="${5 + i * geoSize + 2}" width="${width}" height="${geoSize - 4}" fill="${color}" fill-opacity="${opacityVal * 0.7}" stroke="none"/>`;
                    // Right
                    svg += `<rect x="${195 - width/2}" y="${5 + i * geoSize + 2}" width="${width}" height="${geoSize - 4}" fill="${color}" fill-opacity="${opacityVal * 0.7}" stroke="none"/>`;
                }
                // Main thin line
                svg += `<rect x="5" y="5" width="190" height="190" fill="none" stroke="${color}" stroke-width="1" stroke-opacity="${opacityVal}"/>`;
                break;
        }
        
        return svg;
    },
    
    // Darken color
    darkenColor(hex, amount) {
        const num = parseInt(hex.replace('#', ''), 16);
        const r = Math.max(0, (num >> 16) - amount);
        const g = Math.max(0, ((num >> 8) & 0x00FF) - amount);
        const b = Math.max(0, (num & 0x0000FF) - amount);
        
        return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
    }
};

// Export for use in other modules
window.Generator = Generator;
