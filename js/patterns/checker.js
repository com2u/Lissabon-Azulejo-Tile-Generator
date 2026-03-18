/**
 * Checker Patterns Module
 * Classic, compound, harlequin, frame patterns
 */

const CheckerPatterns = {
    // Generate checker patterns
    generate(subType, palette, strokeWidth, fillOpacity, complexity) {
        let svg = '';
        const gridSize = Math.max(2, Math.min(6, Math.floor(complexity / 2) + 2));
        const cellSize = 170 / gridSize;
        const startX = 15;
        const startY = 15;
        
        switch (subType) {
            case 'classic':
                svg = this.generateClassic(startX, startY, gridSize, cellSize, palette, strokeWidth, fillOpacity);
                break;
                
            case 'compound':
                svg = this.generateCompound(startX, startY, palette, strokeWidth, fillOpacity, gridSize);
                break;
                
            case 'harlequin':
                svg = this.generateHarlequin(startX, startY, gridSize, cellSize, palette, strokeWidth, fillOpacity);
                break;
                
            case 'frame':
                svg = this.generateFrame(startX, startY, gridSize, cellSize, palette, strokeWidth, fillOpacity);
                break;
                
            default:
                svg = this.generateClassic(startX, startY, gridSize, cellSize, palette, strokeWidth, fillOpacity);
        }
        
        return svg;
    },
    
    generateClassic(startX, startY, gridSize, cellSize, palette, strokeWidth, fillOpacity) {
        let svg = '';
        
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                const x = startX + col * cellSize;
                const y = startY + row * cellSize;
                const color = PatternBase.getColor(palette, (row + col) % 2);
                const size = cellSize - 1;
                
                svg += `<rect x="${x + 0.5}" y="${y + 0.5}" width="${size}" height="${size}" `;
                svg += `fill="${color}" fill-opacity="${fillOpacity / 100}" `;
                svg += `stroke="${PatternBase.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
            }
        }
        
        return svg;
    },
    
    generateCompound(startX, startY, palette, strokeWidth, fillOpacity, gridSize) {
        let svg = '';
        const subGrid = Math.min(gridSize * 2, 8);
        const subSize = 170 / subGrid;
        
        for (let row = 0; row < subGrid; row++) {
            for (let col = 0; col < subGrid; col++) {
                const x = startX + col * subSize;
                const y = startY + row * subSize;
                const color = (Math.floor(row / 2) + Math.floor(col / 2)) % 2 === 0 ? palette[0] : palette[1] || palette[0];
                const size = subSize - 1;
                
                if (PatternBase.random() > 0.3) {
                    svg += `<rect x="${x + 0.5}" y="${y + 0.5}" width="${size}" height="${size}" `;
                    svg += `fill="${color}" fill-opacity="${fillOpacity / 100}" `;
                    svg += `stroke="${PatternBase.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
                }
            }
        }
        
        return svg;
    },
    
    generateHarlequin(startX, startY, gridSize, cellSize, palette, strokeWidth, fillOpacity) {
        let svg = '';
        
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                const cx = startX + col * cellSize + cellSize / 2;
                const cy = startY + row * cellSize + cellSize / 2;
                const color = PatternBase.getColor(palette, (row + col) % 2);
                const size = cellSize / 2 - 1;
                
                svg += `<polygon points="${cx},${cy - size} ${cx + size},${cy} ${cx},${cy + size} ${cx - size},${cy}" `;
                svg += `fill="${color}" fill-opacity="${fillOpacity / 100}" `;
                svg += `stroke="${PatternBase.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
            }
        }
        
        return svg;
    },
    
    generateFrame(startX, startY, gridSize, cellSize, palette, strokeWidth, fillOpacity) {
        let svg = '';
        
        // Border
        svg += `<rect x="${startX}" y="${startY}" width="170" height="170" `;
        svg += `fill="${palette[0]}" fill-opacity="${fillOpacity / 100}" `;
        svg += `stroke="${PatternBase.darkenColor(palette[0], 40)}" stroke-width="${strokeWidth * 2}"/>`;
        
        // Inner checkers
        const innerGrid = gridSize - 2;
        const innerSize = 170 / gridSize * (gridSize - 2) / gridSize;
        const innerOffset = 170 / gridSize;
        
        for (let row = 0; row < innerGrid; row++) {
            for (let col = 0; col < innerGrid; col++) {
                const x = startX + innerOffset + col * innerSize / innerGrid;
                const y = startY + innerOffset + row * innerSize / innerGrid;
                const color = PatternBase.getColor(palette, (row + col) % 2 + 1);
                const size = innerSize / innerGrid - 1;
                
                svg += `<rect x="${x + 0.5}" y="${y + 0.5}" width="${size}" height="${size}" `;
                svg += `fill="${color}" fill-opacity="${fillOpacity / 100}" `;
                svg += `stroke="${PatternBase.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
            }
        }
        
        return svg;
    }
};

// Export for use in other modules
window.CheckerPatterns = CheckerPatterns;
