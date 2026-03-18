/**
 * Ornamental Patterns Module
 * Corda, enxaixo, arabesque, estrelas patterns
 */

const OrnamentalPatterns = {
    // Generate ornamental patterns
    generate(subType, palette, strokeWidth, fillOpacity, complexity) {
        let svg = '';
        const centerX = 100;
        const centerY = 100;
        
        switch (subType) {
            case 'corda':
                svg = this.generateCorda(centerX, centerY, palette, strokeWidth, complexity);
                break;
                
            case 'enxaixo':
                svg = this.generateEnxaixo(palette, strokeWidth, complexity);
                break;
                
            case 'arabesque':
                svg = this.generateArabesque(centerX, centerY, palette, strokeWidth);
                break;
                
            case 'estrelas':
                svg = this.generateEstrelas(palette, strokeWidth, fillOpacity, complexity);
                break;
                
            default:
                svg = this.generateCorda(centerX, centerY, palette, strokeWidth, complexity);
        }
        
        return svg;
    },
    
    generateCorda(centerX, centerY, palette, strokeWidth, complexity) {
        let svg = '';
        const ropeCount = Math.max(2, Math.min(6, complexity + 1));
        const radius = 30 + complexity * 10;
        
        for (let i = 0; i < ropeCount; i++) {
            const angle = (i / ropeCount) * Math.PI * 2;
            const color = PatternBase.getColor(palette, i);
            
            svg += `<ellipse cx="${centerX}" cy="${centerY}" rx="${radius}" ry="${radius * 0.3}" `;
            svg += `transform="rotate(${angle * 180 / Math.PI}, ${centerX}, ${centerY})" `;
            svg += `fill="none" stroke="${color}" stroke-width="${strokeWidth * 2}" `;
            svg += `stroke-dasharray="${strokeWidth * 2},${strokeWidth}"/>`;
        }
        
        return svg;
    },
    
    generateEnxaixo(palette, strokeWidth, complexity) {
        let svg = '';
        const lineCount = Math.max(3, Math.min(9, complexity + 3));
        const spacing = 170 / lineCount;
        const start = 15;
        
        for (let i = 0; i < lineCount; i++) {
            const color = PatternBase.getColor(palette, i);
            
            // Horizontal
            svg += `<line x1="${start}" y1="${start + i * spacing}" x2="${185}" y2="${start + i * spacing}" `;
            svg += `stroke="${color}" stroke-width="${strokeWidth * 1.5}"/>`;
            
            // Vertical
            svg += `<line x1="${start + i * spacing}" y1="${start}" x2="${start + i * spacing}" y2="${185}" `;
            svg += `stroke="${color}" stroke-width="${strokeWidth * 1.5}"/>`;
        }
        
        return svg;
    },
    
    generateArabesque(centerX, centerY, palette, strokeWidth) {
        let svg = '';
        
        for (let i = 0; i < 4; i++) {
            const angle = (i / 4) * Math.PI * 2;
            const x = centerX + Math.cos(angle) * 45;
            const y = centerY + Math.sin(angle) * 45;
            const color = PatternBase.getColor(palette, i);
            
            svg += `<path d="M${centerX},${centerY} Q${x},${y} ${centerX + Math.cos(angle + 0.5) * 70},${centerY + Math.sin(angle + 0.5) * 70}" `;
            svg += `fill="none" stroke="${color}" stroke-width="${strokeWidth * 2}" stroke-linecap="round"/>`;
        }
        
        // Inner circles
        svg += `<circle cx="${centerX}" cy="${centerY}" r="20" fill="none" stroke="${palette[0]}" stroke-width="${strokeWidth * 2}"/>`;
        svg += `<circle cx="${centerX}" cy="${centerY}" r="35" fill="none" stroke="${palette[1] || palette[0]}" stroke-width="${strokeWidth * 1.5}"/>`;
        
        return svg;
    },
    
    generateEstrelas(palette, strokeWidth, fillOpacity, complexity) {
        let svg = '';
        const starCount = Math.max(2, Math.min(5, Math.floor(complexity / 2) + 2));
        
        for (let i = 0; i < starCount; i++) {
            for (let j = 0; j < starCount; j++) {
                const x = 30 + i * 70;
                const y = 30 + j * 70;
                const color = PatternBase.getColor(palette, i + j);
                const size = 15 + complexity * 2;
                
                svg += PatternBase.createStar(x, y, size, 5, color, fillOpacity, strokeWidth);
            }
        }
        
        return svg;
    }
};

// Export for use in other modules
window.OrnamentalPatterns = OrnamentalPatterns;
