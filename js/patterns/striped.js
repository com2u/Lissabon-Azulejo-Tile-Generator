/**
 * Striped Patterns Module
 * Horizontal, vertical, diagonal, chevron, wave patterns
 */

const StripedPatterns = {
    // Generate striped patterns
    generate(subType, palette, strokeWidth, fillOpacity, complexity) {
        let svg = '';
        
        switch (subType) {
            case 'horizontal':
                svg = this.generateHorizontal(palette, strokeWidth, fillOpacity, complexity);
                break;
                
            case 'vertical':
                svg = this.generateVertical(palette, strokeWidth, fillOpacity, complexity);
                break;
                
            case 'diagonal':
                svg = this.generateDiagonal(palette, strokeWidth, fillOpacity, complexity);
                break;
                
            case 'chevron':
                svg = this.generateChevron(palette, strokeWidth, fillOpacity, complexity);
                break;
                
            case 'wave':
                svg = this.generateWaveStriped(palette, strokeWidth, fillOpacity, complexity);
                break;
                
            default:
                svg = this.generateHorizontal(palette, strokeWidth, fillOpacity, complexity);
        }
        
        return svg;
    },
    
    generateHorizontal(palette, strokeWidth, fillOpacity, complexity) {
        let svg = '';
        const stripeCount = Math.max(3, Math.min(12, complexity + 3));
        const h = 170 / stripeCount;
        
        for (let i = 0; i < stripeCount; i++) {
            const color = PatternBase.getColor(palette, i);
            const y = 15 + i * h;
            svg += `<rect x="15" y="${y}" width="170" height="${h}" `;
            svg += `fill="${color}" fill-opacity="${i % 2 === 0 ? fillOpacity / 100 : 0}" `;
            svg += `stroke="${color}" stroke-width="${strokeWidth}"/>`;
        }
        
        return svg;
    },
    
    generateVertical(palette, strokeWidth, fillOpacity, complexity) {
        let svg = '';
        const stripeCount = Math.max(3, Math.min(12, complexity + 3));
        const w = 170 / stripeCount;
        
        for (let i = 0; i < stripeCount; i++) {
            const color = PatternBase.getColor(palette, i);
            const x = 15 + i * w;
            svg += `<rect x="${x}" y="15" width="${w}" height="170" `;
            svg += `fill="${color}" fill-opacity="${i % 2 === 0 ? fillOpacity / 100 : 0}" `;
            svg += `stroke="${color}" stroke-width="${strokeWidth}"/>`;
        }
        
        return svg;
    },
    
    generateDiagonal(palette, strokeWidth, fillOpacity, complexity) {
        let svg = '';
        const stripeCount = Math.max(3, Math.min(12, complexity + 3));
        
        for (let i = -8; i < 16; i++) {
            const color = PatternBase.getColor(palette, Math.abs(i));
            svg += `<line x1="${i * 25}" y1="15" x2="${i * 25 + 200}" y2="185" `;
            svg += `stroke="${color}" stroke-width="${170 / stripeCount}" stroke-linecap="square"/>`;
        }
        
        return svg;
    },
    
    generateChevron(palette, strokeWidth, fillOpacity, complexity) {
        let svg = '';
        const chevronCount = Math.max(3, Math.min(8, complexity + 2));
        const ch = 170 / chevronCount;
        
        for (let i = 0; i < chevronCount; i++) {
            const color = PatternBase.getColor(palette, i);
            const y = 15 + i * ch;
            
            svg += `<polygon points="15,${y} 185,${y} 185,${y + ch} 15,${y + ch}" `;
            svg += `fill="${color}" fill-opacity="${fillOpacity / 100}"/>`;
            svg += `<line x1="15" y1="${y + ch}" x2="185" y2="${y}" `;
            svg += `stroke="${PatternBase.darkenColor(color, 40)}" stroke-width="${strokeWidth * 2}"/>`;
        }
        
        return svg;
    },
    
    generateWaveStriped(palette, strokeWidth, fillOpacity, complexity) {
        let svg = '';
        const waveCount = Math.max(3, Math.min(8, complexity + 2));
        const waveH = 170 / waveCount;
        
        for (let i = 0; i < waveCount; i++) {
            const color = PatternBase.getColor(palette, i);
            const baseY = 15 + i * waveH + waveH / 2;
            
            svg += `<path d="M15,${baseY} `;
            for (let x = 15; x <= 185; x += 5) {
                const wy = baseY + Math.sin((x - 15) / 20 * Math.PI) * waveH * 0.35;
                svg += `L${x},${wy} `;
            }
            svg += `" fill="none" stroke="${color}" stroke-width="${waveH * 0.5}" stroke-linecap="round"/>`;
        }
        
        return svg;
    }
};

// Export for use in other modules
window.StripedPatterns = StripedPatterns;
