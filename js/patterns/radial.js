/**
 * Radial Patterns Module
 * Mandala, sunburst, target, spiral patterns
 */

const RadialPatterns = {
    // Generate radial patterns
    generate(subType, palette, strokeWidth, fillOpacity, complexity, symmetry = 'none') {
        let svg = '';
        const centerX = 100;
        const centerY = 100;
        
        // Calculate angular limits based on symmetry
        let angularMultiplier = 1;
        if (symmetry === 'radial') angularMultiplier = 8;
        else if (symmetry === 'rotational') angularMultiplier = 4;
        
        switch (subType) {
            case 'mandala':
                svg = this.generateMandala(centerX, centerY, palette, strokeWidth, fillOpacity, complexity, angularMultiplier);
                break;
                
            case 'sunburst':
                svg = this.generateSunburst(centerX, centerY, palette, strokeWidth, fillOpacity, complexity, angularMultiplier);
                break;
                
            case 'target':
                svg = this.generateTarget(centerX, centerY, palette, strokeWidth, fillOpacity, complexity);
                break;
                
            case 'spiral':
                svg = this.generateSpiral(centerX, centerY, palette, strokeWidth, fillOpacity, complexity, symmetry, angularMultiplier);
                break;
                
            default:
                svg = this.generateMandala(centerX, centerY, palette, strokeWidth, fillOpacity, complexity, angularMultiplier);
        }
        
        return svg;
    },
    
    generateMandala(centerX, centerY, palette, strokeWidth, fillOpacity, complexity, angularMultiplier) {
        let svg = '';
        const layers = Math.max(2, Math.min(5, complexity));
        const layerSize = 70 / layers;
        
        for (let l = layers; l >= 1; l--) {
            const radius = l * layerSize;
            const color = PatternBase.getColor(palette, layers - l);
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
                svg += `stroke="${PatternBase.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
            }
        }
        
        // Center circle
        svg += `<circle cx="${centerX}" cy="${centerY}" r="8" fill="${palette[0]}" stroke="${PatternBase.darkenColor(palette[0], 40)}" stroke-width="${strokeWidth}"/>`;
        
        return svg;
    },
    
    generateSunburst(centerX, centerY, palette, strokeWidth, fillOpacity, complexity, angularMultiplier) {
        let svg = '';
        const rays = Math.max(8, Math.min(24, complexity * 4)) * angularMultiplier;
        const rayLength = 70;
        
        for (let i = 0; i < rays; i++) {
            const angle = (i / rays) * Math.PI * 2;
            const color = PatternBase.getColor(palette, i % palette.length);
            
            const x1 = centerX + Math.cos(angle) * 15;
            const y1 = centerY + Math.sin(angle) * 15;
            const x2 = centerX + Math.cos(angle) * rayLength;
            const y2 = centerY + Math.sin(angle) * rayLength;
            
            svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" `;
            svg += `stroke="${color}" stroke-width="${strokeWidth * 2}" stroke-linecap="round"/>`;
        }
        
        // Center
        svg += `<circle cx="${centerX}" cy="${centerY}" r="12" fill="${palette[0]}" stroke="${PatternBase.darkenColor(palette[0], 40)}" stroke-width="${strokeWidth}"/>`;
        
        return svg;
    },
    
    generateTarget(centerX, centerY, palette, strokeWidth, fillOpacity, complexity) {
        let svg = '';
        const rings = Math.max(3, Math.min(8, complexity + 2));
        const ringSize = 75 / rings;
        
        for (let r = rings; r >= 1; r--) {
            const radius = r * ringSize;
            const color = PatternBase.getColor(palette, r % palette.length);
            
            svg += `<circle cx="${centerX}" cy="${centerY}" r="${radius}" `;
            svg += `fill="none" stroke="${color}" stroke-width="${ringSize - 2}" `;
            svg += `fill-opacity="${fillOpacity / 100}"/>`;
        }
        
        // Center dot
        svg += `<circle cx="${centerX}" cy="${centerY}" r="5" fill="${palette[0]}"/>`;
        
        return svg;
    },
    
    generateSpiral(centerX, centerY, palette, strokeWidth, fillOpacity, complexity, symmetry, angularMultiplier) {
        let svg = '';
        const spirals = Math.max(3, Math.min(8, complexity + 2));
        
        for (let s = 0; s < spirals; s++) {
            const color = PatternBase.getColor(palette, s);
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
        
        return svg;
    }
};

// Export for use in other modules
window.RadialPatterns = RadialPatterns;
