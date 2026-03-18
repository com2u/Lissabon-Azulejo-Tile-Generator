/**
 * Geometric Patterns Module
 * Grid, diamond, hex, triangle, and wave patterns
 */

const GeometricPatterns = {
    // Generate geometric patterns
    generate(subType, palette, strokeWidth, fillOpacity, complexity, symmetry = 'none') {
        let svg = '';
        const cells = Math.max(2, Math.min(8, complexity + 2));
        const cellSize = 170 / cells;
        const startX = 15;
        const startY = 15;
        
        switch (subType) {
            case 'grid':
                svg = this.generateGrid(startX, startY, cells, cellSize, palette, strokeWidth, fillOpacity, complexity, symmetry);
                break;
                
            case 'diamond':
                svg = this.generateDiamond(startX, startY, cells, cellSize, palette, strokeWidth, fillOpacity, complexity, symmetry);
                break;
                
            case 'hex':
                svg = this.generateHex(startX, startY, cells, palette, strokeWidth, fillOpacity, complexity, symmetry);
                break;
                
            case 'triangle':
                svg = this.generateTriangle(startX, startY, cells, cellSize, palette, strokeWidth, fillOpacity, complexity, symmetry);
                break;
                
            case 'wave':
                svg = this.generateWave(startX, startY, palette, strokeWidth, fillOpacity, complexity, symmetry);
                break;
                
            default:
                svg = this.generateGrid(startX, startY, cells, cellSize, palette, strokeWidth, fillOpacity, complexity, symmetry);
        }
        
        return svg;
    },
    
    generateGrid(startX, startY, cells, cellSize, palette, strokeWidth, fillOpacity, complexity, symmetry) {
        let svg = '';
        
        for (let row = 0; row < cells; row++) {
            for (let col = 0; col < cells; col++) {
                const x = startX + col * cellSize;
                const y = startY + row * cellSize;
                
                // Check if element is in symmetry area
                if (!PatternBase.isInSymmetryArea(x + cellSize/2, y + cellSize/2, symmetry)) continue;
                
                const color = PatternBase.getColor(palette, row + col);
                const size = cellSize - 2;
                
                if (PatternBase.random() > 0.3) {
                    svg += `<rect x="${x + 1}" y="${y + 1}" width="${size}" height="${size}" `;
                    svg += `fill="${color}" fill-opacity="${fillOpacity / 100}" `;
                    svg += `stroke="${PatternBase.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
                }
            }
        }
        
        return svg;
    },
    
    generateDiamond(startX, startY, cells, cellSize, palette, strokeWidth, fillOpacity, complexity, symmetry) {
        let svg = '';
        
        for (let row = 0; row < cells; row++) {
            for (let col = 0; col < cells; col++) {
                const cx = startX + col * cellSize + cellSize / 2;
                const cy = startY + row * cellSize + cellSize / 2;
                
                if (!PatternBase.isInSymmetryArea(cx, cy, symmetry)) continue;
                
                const color = PatternBase.getColor(palette, row * cells + col);
                const size = cellSize / 2 - 1;
                
                svg += `<polygon points="${cx},${cy - size} ${cx + size},${cy} ${cx},${cy + size} ${cx - size},${cy}" `;
                svg += `fill="${color}" fill-opacity="${fillOpacity / 100}" `;
                svg += `stroke="${PatternBase.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
            }
        }
        
        return svg;
    },
    
    generateHex(startX, startY, cells, palette, strokeWidth, fillOpacity, complexity, symmetry) {
        let svg = '';
        const hexSize = 170 / (cells * 1.5);
        
        for (let row = 0; row < cells * 1.5; row++) {
            for (let col = 0; col < cells; col++) {
                const cx = startX + col * hexSize * 1.5 + (row % 2) * hexSize * 0.75;
                const cy = startY + row * hexSize * 0.866;
                
                if (!PatternBase.isInSymmetryArea(cx, cy, symmetry)) continue;
                
                const color = PatternBase.getColor(palette, row + col);
                
                svg += PatternBase.createHexagon(cx, cy, hexSize - 1, color, fillOpacity, strokeWidth);
            }
        }
        
        return svg;
    },
    
    generateTriangle(startX, startY, cells, cellSize, palette, strokeWidth, fillOpacity, complexity, symmetry) {
        let svg = '';
        
        for (let row = 0; row < cells; row++) {
            for (let col = 0; col < cells * 2; col++) {
                const cx = startX + col * cellSize / 2;
                const cy = startY + row * cellSize;
                
                if (!PatternBase.isInSymmetryArea(cx, cy, symmetry)) continue;
                
                const color = PatternBase.getColor(palette, row + col);
                const size = cellSize / 2 - 1;
                const pointUp = (row + col) % 2 === 0;
                
                if (pointUp) {
                    svg += `<polygon points="${cx},${cy} ${cx + size},${cy + size} ${cx - size},${cy + size}" `;
                } else {
                    svg += `<polygon points="${cx},${cy + size} ${cx + size},${cy} ${cx - size},${cy}" `;
                }
                svg += `fill="${color}" fill-opacity="${fillOpacity / 100}" `;
                svg += `stroke="${PatternBase.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
            }
        }
        
        return svg;
    },
    
    generateWave(startX, startY, palette, strokeWidth, fillOpacity, complexity, symmetry) {
        let svg = '';
        const waveCount = Math.max(3, complexity + 2);
        const waveHeight = 170 / waveCount;
        
        for (let i = 0; i < waveCount; i++) {
            const y = startY + i * waveHeight;
            
            // For vertical symmetry, only generate in top half
            if (!PatternBase.isInSymmetryArea(100, y + waveHeight/2, symmetry)) continue;
            
            const color = PatternBase.getColor(palette, i);
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
        
        return svg;
    }
};

// Export for use in other modules
window.GeometricPatterns = GeometricPatterns;
