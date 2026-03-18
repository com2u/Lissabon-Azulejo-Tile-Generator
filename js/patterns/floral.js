/**
 * Floral Patterns Module
 * Rosette, vine, branch, and paisley patterns
 */

const FloralPatterns = {
    // Generate floral patterns
    generate(subType, palette, strokeWidth, fillOpacity, complexity) {
        let svg = '';
        const centerX = 100;
        const centerY = 100;
        
        switch (subType) {
            case 'rosette':
                svg = this.generateRosette(centerX, centerY, palette, strokeWidth, fillOpacity, complexity);
                break;
                
            case 'vine':
                svg = this.generateVine(centerX, centerY, palette, strokeWidth, fillOpacity, complexity);
                break;
                
            case 'branch':
                svg = this.generateBranch(centerX, centerY, palette, strokeWidth, complexity);
                break;
                
            case 'paisley':
                svg = this.generatePaisley(centerX, centerY, palette, strokeWidth, fillOpacity, complexity);
                break;
                
            default:
                svg = this.generateRosette(centerX, centerY, palette, strokeWidth, fillOpacity, complexity);
        }
        
        return svg;
    },
    
    generateRosette(centerX, centerY, palette, strokeWidth, fillOpacity, complexity) {
        let svg = '';
        const petalCount = Math.max(4, Math.min(12, complexity + 4));
        const petalSize = 30 + complexity * 5;
        
        // Draw petals
        for (let i = 0; i < petalCount; i++) {
            const angle = (i / petalCount) * Math.PI * 2 - Math.PI / 2;
            const x = centerX + Math.cos(angle) * 20;
            const y = centerY + Math.sin(angle) * 20;
            const color = PatternBase.getColor(palette, i);
            
            svg += PatternBase.createPetal(x, y, petalSize, angle, color, fillOpacity, strokeWidth);
        }
        
        // Center
        svg += `<circle cx="${centerX}" cy="${centerY}" r="${10 + complexity}" `;
        svg += `fill="${PatternBase.getColor(palette, 0)}" stroke="${PatternBase.darkenColor(PatternBase.getColor(palette, 0), 30)}" stroke-width="${strokeWidth}"/>`;
        
        return svg;
    },
    
    generateVine(centerX, centerY, palette, strokeWidth, fillOpacity, complexity) {
        let svg = '';
        const vineCount = Math.max(2, Math.min(6, complexity));
        
        for (let v = 0; v < vineCount; v++) {
            const startAngle = (v / vineCount) * Math.PI * 2;
            let x = centerX;
            let y = centerY;
            
            svg += `<path d="M${x},${y} `;
            
            for (let i = 0; i < 8; i++) {
                const angle = startAngle + PatternBase.random() * 0.5 - 0.25;
                const len = 15 + PatternBase.random() * 15;
                x += Math.cos(angle) * len;
                y += Math.sin(angle) * len;
                svg += `Q${x},${y} ${x + 5},${y + 5} `;
            }
            
            svg += `" fill="none" stroke="${PatternBase.getColor(palette, v)}" stroke-width="${strokeWidth * 2}" stroke-linecap="round"/>`;
            
            // Add leaves
            x = centerX;
            y = centerY;
            for (let i = 0; i < 8; i++) {
                const angle = startAngle + PatternBase.random() * 0.5 - 0.25;
                const len = 15 + PatternBase.random() * 15;
                x += Math.cos(angle) * len;
                y += Math.sin(angle) * len;
                
                if (PatternBase.random() > 0.5) {
                    svg += PatternBase.createLeaf(x, y, angle, PatternBase.getColor(palette, (v + 1) % palette.length), strokeWidth);
                }
            }
        }
        
        return svg;
    },
    
    generateBranch(centerX, centerY, palette, strokeWidth, complexity) {
        return PatternBase.createBranch(centerX, centerY, 60, Math.PI / 2, palette, strokeWidth, 0);
    },
    
    generatePaisley(centerX, centerY, palette, strokeWidth, fillOpacity, complexity) {
        let svg = '';
        
        for (let i = 0; i < 4; i++) {
            const angle = (i / 4) * Math.PI * 2;
            const x = centerX + Math.cos(angle) * 40;
            const y = centerY + Math.sin(angle) * 40;
            const color = PatternBase.getColor(palette, i);
            
            svg += PatternBase.createPaisley(x, y, 25 + complexity * 3, angle, color, fillOpacity, strokeWidth);
        }
        
        // Center
        svg += `<circle cx="${centerX}" cy="${centerY}" r="15" fill="${palette[0]}" fill-opacity="${fillOpacity / 100}" stroke="${PatternBase.darkenColor(palette[0], 30)}" stroke-width="${strokeWidth}"/>`;
        
        return svg;
    }
};

// Export for use in other modules
window.FloralPatterns = FloralPatterns;
