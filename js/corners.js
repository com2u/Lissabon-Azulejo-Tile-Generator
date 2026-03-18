/**
 * Corners Module
 * Generates corner decorations for tiles
 */

const Corners = {
    // Generate corners
    generate(style, palette, strokeWidth, cornerStrokeWidth = null, cornerOpacity = 100) {
        let svg = '';
        const color = palette[0];
        const color2 = palette[1] || palette[0];
        const useStrokeWidth = cornerStrokeWidth !== null ? cornerStrokeWidth : strokeWidth;
        const opacityVal = cornerOpacity / 100;
        
        // Corner positions
        const tl = { x: 15, y: 15 };   // Top-left
        const br = { x: 185, y: 185 }; // Bottom-right
        const tr = { x: 185, y: 15 };  // Top-right
        const bl = { x: 15, y: 185 };  // Bottom-left
        
        switch (style) {
            case 'simple':
                svg += `<circle cx="${tl.x}" cy="${tl.y}" r="8" fill="none" stroke="${color}" stroke-width="${useStrokeWidth}" stroke-opacity="${opacityVal}"/>`;
                svg += `<circle cx="${br.x}" cy="${br.y}" r="8" fill="none" stroke="${color}" stroke-width="${useStrokeWidth}" stroke-opacity="${opacityVal}"/>`;
                svg += `<circle cx="${tr.x}" cy="${tr.y}" r="6" fill="none" stroke="${color2}" stroke-width="${useStrokeWidth * 0.8}" stroke-opacity="${opacityVal}"/>`;
                svg += `<circle cx="${bl.x}" cy="${bl.y}" r="6" fill="none" stroke="${color2}" stroke-width="${useStrokeWidth * 0.8}" stroke-opacity="${opacityVal}"/>`;
                break;
                
            case 'flourish':
                svg += `<path d="M${tl.x},${tl.y + 18} Q${tl.x},${tl.x} ${tl.x + 18},${tl.y}" fill="none" stroke="${color}" stroke-width="${useStrokeWidth * 1.5}" stroke-linecap="round" stroke-opacity="${opacityVal}"/>`;
                svg += `<circle cx="${tl.x + 6}" cy="${tl.y + 6}" r="4" fill="${color}" fill-opacity="${opacityVal}"/>`;
                svg += `<path d="M${br.x},${br.y - 18} Q${br.x},${br.y} ${br.x - 18},${br.y}" fill="none" stroke="${color}" stroke-width="${useStrokeWidth * 1.5}" stroke-linecap="round" stroke-opacity="${opacityVal}"/>`;
                svg += `<circle cx="${br.x - 6}" cy="${br.y - 6}" r="4" fill="${color}" fill-opacity="${opacityVal}"/>`;
                svg += `<path d="M${tr.x - 18},${tr.y} Q${tr.x},${tr.y} ${tr.x},${tr.y + 18}" fill="none" stroke="${color2}" stroke-width="${useStrokeWidth * 1.5}" stroke-linecap="round" stroke-opacity="${opacityVal}"/>`;
                svg += `<circle cx="${tr.x - 6}" cy="${tr.y + 6}" r="4" fill="${color2}" fill-opacity="${opacityVal}"/>`;
                svg += `<path d="M${bl.x + 18},${bl.y} Q${bl.x},${bl.y} ${bl.x},${bl.y - 18}" fill="none" stroke="${color2}" stroke-width="${useStrokeWidth * 1.5}" stroke-linecap="round" stroke-opacity="${opacityVal}"/>`;
                svg += `<circle cx="${bl.x + 6}" cy="${bl.y - 6}" r="4" fill="${color2}" fill-opacity="${opacityVal}"/>`;
                break;
                
            case 'diamond':
                svg += `<polygon points="${tl.x},${tl.y - 12} ${tl.x + 12},${tl.y} ${tl.x},${tl.y + 12} ${tl.x - 12},${tl.y}" fill="${color}" fill-opacity="${0.4 * opacityVal}" stroke="${color}" stroke-width="${useStrokeWidth}"/>`;
                svg += `<polygon points="${br.x},${br.y - 12} ${br.x + 12},${br.y} ${br.x},${br.y + 12} ${br.x - 12},${br.y}" fill="${color}" fill-opacity="${0.4 * opacityVal}" stroke="${color}" stroke-width="${useStrokeWidth}"/>`;
                svg += `<polygon points="${tr.x},${tr.y - 10} ${tr.x + 10},${tr.y} ${tr.x},${tr.y + 10} ${tr.x - 10},${tr.y}" fill="${color2}" fill-opacity="${0.3 * opacityVal}" stroke="${color2}" stroke-width="${useStrokeWidth * 0.8}"/>`;
                svg += `<polygon points="${bl.x},${bl.y - 10} ${bl.x + 10},${bl.y} ${bl.x},${bl.y + 10} ${bl.x - 10},${bl.y}" fill="${color2}" fill-opacity="${0.3 * opacityVal}" stroke="${color2}" stroke-width="${useStrokeWidth * 0.8}"/>`;
                break;
                
            case 'shell':
                const shellR = 12;
                svg += `<path d="M${tl.x - shellR},${tl.y} A${shellR},${shellR} 0 0,1 ${tl.x + shellR},${tl.y}" fill="none" stroke="${color}" stroke-width="${useStrokeWidth * 1.2}" stroke-opacity="${opacityVal}"/>`;
                svg += `<path d="M${tl.x - shellR * 0.7},${tl.y} A${shellR * 0.7},${shellR * 0.7} 0 0,1 ${tl.x + shellR * 0.7},${tl.y}" fill="none" stroke="${color}" stroke-width="${useStrokeWidth * 0.8}" stroke-opacity="${opacityVal}"/>`;
                svg += `<path d="M${br.x + shellR},${br.y} A${shellR},${shellR} 0 0,1 ${br.x - shellR},${br.y}" fill="none" stroke="${color}" stroke-width="${useStrokeWidth * 1.2}" stroke-opacity="${opacityVal}"/>`;
                svg += `<path d="M${br.x + shellR * 0.7},${br.y} A${shellR * 0.7},${shellR * 0.7} 0 0,1 ${br.x - shellR * 0.7},${br.y}" fill="none" stroke="${color}" stroke-width="${useStrokeWidth * 0.8}" stroke-opacity="${opacityVal}"/>`;
                svg += `<path d="M${tr.x},${tr.y - shellR} A${shellR},${shellR} 0 0,1 ${tr.x},${tr.y + shellR}" fill="none" stroke="${color2}" stroke-width="${useStrokeWidth * 1.2}" stroke-opacity="${opacityVal}"/>`;
                svg += `<path d="M${tr.x},${tr.y - shellR * 0.7} A${shellR * 0.7},${shellR * 0.7} 0 0,1 ${tr.x},${tr.y + shellR * 0.7}" fill="none" stroke="${color2}" stroke-width="${useStrokeWidth * 0.8}" stroke-opacity="${opacityVal}"/>`;
                svg += `<path d="M${bl.x},${bl.y + shellR} A${shellR},${shellR} 0 0,1 ${bl.x},${bl.y - shellR}" fill="none" stroke="${color2}" stroke-width="${useStrokeWidth * 1.2}" stroke-opacity="${opacityVal}"/>`;
                svg += `<path d="M${bl.x},${bl.y + shellR * 0.7} A${shellR * 0.7},${shellR * 0.7} 0 0,1 ${bl.x},${bl.y - shellR * 0.7}" fill="none" stroke="${color2}" stroke-width="${useStrokeWidth * 0.8}" stroke-opacity="${opacityVal}"/>`;
                break;
                
            case 'wave':
                const waveSize = 14;
                svg += `<path d="M${tl.x},${tl.y + waveSize} Q${tl.x + waveSize * 0.5},${tl.y + waveSize * 0.3} ${tl.x + waveSize},${tl.y}" fill="none" stroke="${color}" stroke-width="${useStrokeWidth * 1.3}" stroke-linecap="round" stroke-opacity="${opacityVal}"/>`;
                svg += `<path d="M${br.x},${br.y - waveSize} Q${br.x - waveSize * 0.5},${br.y - waveSize * 0.3} ${br.x - waveSize},${br.y}" fill="none" stroke="${color}" stroke-width="${useStrokeWidth * 1.3}" stroke-linecap="round" stroke-opacity="${opacityVal}"/>`;
                svg += `<path d="M${tr.x - waveSize},${tr.y} Q${tr.x - waveSize * 0.3},${tr.y + waveSize * 0.5} ${tr.x},${tr.y + waveSize}" fill="none" stroke="${color2}" stroke-width="${useStrokeWidth * 1.3}" stroke-linecap="round" stroke-opacity="${opacityVal}"/>`;
                svg += `<path d="M${bl.x + waveSize},${bl.y} Q${bl.x + waveSize * 0.3},${bl.y - waveSize * 0.5} ${bl.x},${bl.y - waveSize}" fill="none" stroke="${color2}" stroke-width="${useStrokeWidth * 1.3}" stroke-linecap="round" stroke-opacity="${opacityVal}"/>`;
                break;
                
            case 'star':
                svg += PatternBase.createMiniStar(tl.x, tl.y, 10, color, useStrokeWidth, opacityVal);
                svg += PatternBase.createMiniStar(br.x, br.y, 10, color, useStrokeWidth, opacityVal);
                svg += PatternBase.createMiniStar(tr.x, tr.y, 8, color2, useStrokeWidth * 0.8, opacityVal);
                svg += PatternBase.createMiniStar(bl.x, bl.y, 8, color2, useStrokeWidth * 0.8, opacityVal);
                break;
                
            case 'leaf':
                svg += `<path d="M${tl.x + 5},${tl.y + 15} Q${tl.x + 15},${tl.y + 15} ${tl.x + 15},${tl.y + 5}" fill="none" stroke="${color}" stroke-width="${useStrokeWidth * 1.2}" stroke-linecap="round" stroke-opacity="${opacityVal}"/>`;
                svg += `<ellipse cx="${tl.x + 10}" cy="${tl.y + 10}" rx="5" ry="3" transform="rotate(45, ${tl.x + 10}, ${tl.y + 10})" fill="${color}" fill-opacity="${0.5 * opacityVal}"/>`;
                svg += `<path d="M${br.x - 5},${br.y - 15} Q${br.x - 15},${br.y - 15} ${br.x - 15},${br.y - 5}" fill="none" stroke="${color}" stroke-width="${useStrokeWidth * 1.2}" stroke-linecap="round" stroke-opacity="${opacityVal}"/>`;
                svg += `<ellipse cx="${br.x - 10}" cy="${br.y - 10}" rx="5" ry="3" transform="rotate(45, ${br.x - 10}, ${br.y - 10})" fill="${color}" fill-opacity="${0.5 * opacityVal}"/>`;
                svg += `<path d="M${tr.x - 15},${tr.y + 5} Q${tr.x - 15},${tr.y + 15} ${tr.x - 5},${tr.y + 15}" fill="none" stroke="${color2}" stroke-width="${useStrokeWidth * 1.2}" stroke-linecap="round" stroke-opacity="${opacityVal}"/>`;
                svg += `<ellipse cx="${tr.x - 10}" cy="${tr.y + 10}" rx="5" ry="3" transform="rotate(-45, ${tr.x - 10}, ${tr.y + 10})" fill="${color2}" fill-opacity="${0.5 * opacityVal}"/>`;
                svg += `<path d="M${bl.x + 15},${bl.y - 5} Q${bl.x + 15},${bl.y - 15} ${bl.x + 5},${bl.y - 15}" fill="none" stroke="${color2}" stroke-width="${useStrokeWidth * 1.2}" stroke-linecap="round" stroke-opacity="${opacityVal}"/>`;
                svg += `<ellipse cx="${bl.x + 10}" cy="${bl.y - 10}" rx="5" ry="3" transform="rotate(-45, ${bl.x + 10}, ${bl.y - 10})" fill="${color2}" fill-opacity="${0.5 * opacityVal}"/>`;
                break;
                
            case 'curved':
                svg += `<path d="M${tl.x},${tl.y + 20} Q${tl.x + 5},${tl.y + 10} ${tl.x + 15},${tl.y + 10} Q${tl.x + 20},${tl.y + 10} ${tl.x + 20},${tl.y}" fill="none" stroke="${color}" stroke-width="${useStrokeWidth * 1.2}" stroke-linecap="round" stroke-opacity="${opacityVal}"/>`;
                svg += `<path d="M${br.x},${br.y - 20} Q${br.x - 5},${br.y - 10} ${br.x - 15},${br.y - 10} Q${br.x - 20},${br.y - 10} ${br.x - 20},${br.y}" fill="none" stroke="${color}" stroke-width="${useStrokeWidth * 1.2}" stroke-linecap="round" stroke-opacity="${opacityVal}"/>`;
                svg += `<path d="M${tr.x - 20},${tr.y} Q${tr.x - 15},${tr.y + 10} ${tr.x - 5},${tr.y + 10} Q${tr.x},${tr.y + 10} ${tr.x},${tr.y + 20}" fill="none" stroke="${color2}" stroke-width="${useStrokeWidth * 1.2}" stroke-linecap="round" stroke-opacity="${opacityVal}"/>`;
                svg += `<path d="M${bl.x + 20},${bl.y} Q${bl.x + 15},${bl.y - 10} ${bl.x + 5},${bl.y - 10} Q${bl.x},${bl.y - 10} ${bl.x},${bl.y - 20}" fill="none" stroke="${color2}" stroke-width="${useStrokeWidth * 1.2}" stroke-linecap="round" stroke-opacity="${opacityVal}"/>`;
                break;
                
            case 'arcs':
                const arcCount = 2;
                for (let i = 1; i <= arcCount; i++) {
                    const r = i * 7;
                    svg += `<path d="M${tl.x - r},${tl.y} A${r},${r} 0 0,1 ${tl.x},${tl.y - r}" fill="none" stroke="${color}" stroke-width="${useStrokeWidth}" stroke-linecap="round" stroke-opacity="${opacityVal}"/>`;
                    svg += `<path d="M${br.x + r},${br.y} A${r},${r} 0 0,1 ${br.x},${br.y + r}" fill="none" stroke="${color}" stroke-width="${useStrokeWidth}" stroke-linecap="round" stroke-opacity="${opacityVal}"/>`;
                }
                for (let i = 1; i <= arcCount; i++) {
                    const r = i * 6;
                    svg += `<path d="M${tr.x},${tr.y - r} A${r},${r} 0 0,1 ${tr.x + r},${tr.y}" fill="none" stroke="${color2}" stroke-width="${useStrokeWidth * 0.8}" stroke-linecap="round" stroke-opacity="${opacityVal}"/>`;
                    svg += `<path d="M${bl.x},${bl.y + r} A${r},${r} 0 0,1 ${bl.x - r},${bl.y}" fill="none" stroke="${color2}" stroke-width="${useStrokeWidth * 0.8}" stroke-linecap="round" stroke-opacity="${opacityVal}"/>`;
                }
                break;
                
            case 'spiral':
                let spiralPath = `M${tl.x + 5},${tl.y + 5} `;
                for (let i = 0; i < 20; i++) {
                    const angle = i * 0.4;
                    const radius = 2 + i * 0.6;
                    const x = tl.x + 5 + Math.cos(angle) * radius;
                    const y = tl.y + 5 + Math.sin(angle) * radius;
                    spiralPath += `L${x},${y} `;
                }
                svg += `<path d="${spiralPath}" fill="none" stroke="${color}" stroke-width="${useStrokeWidth * 1.2}" stroke-linecap="round" stroke-opacity="${opacityVal}"/>`;
                
                let spiralPath2 = `M${br.x - 5},${br.y - 5} `;
                for (let i = 0; i < 20; i++) {
                    const angle = i * 0.4 + Math.PI;
                    const radius = 2 + i * 0.6;
                    const x = br.x - 5 + Math.cos(angle) * radius;
                    const y = br.y - 5 + Math.sin(angle) * radius;
                    spiralPath2 += `L${x},${y} `;
                }
                svg += `<path d="${spiralPath2}" fill="none" stroke="${color}" stroke-width="${useStrokeWidth * 1.2}" stroke-linecap="round" stroke-opacity="${opacityVal}"/>`;
                
                let spiralPath3 = `M${tr.x - 5},${tr.y + 5} `;
                for (let i = 0; i < 18; i++) {
                    const angle = i * 0.4 + Math.PI / 2;
                    const radius = 2 + i * 0.5;
                    const x = tr.x - 5 + Math.cos(angle) * radius;
                    const y = tr.y + 5 + Math.sin(angle) * radius;
                    spiralPath3 += `L${x},${y} `;
                }
                svg += `<path d="${spiralPath3}" fill="none" stroke="${color2}" stroke-width="${useStrokeWidth}" stroke-linecap="round" stroke-opacity="${opacityVal}"/>`;
                
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
                
            default:
                // Simple circles as fallback
                svg += `<circle cx="${tl.x}" cy="${tl.y}" r="8" fill="none" stroke="${color}" stroke-width="${useStrokeWidth}"/>`;
                svg += `<circle cx="${br.x}" cy="${br.y}" r="8" fill="none" stroke="${color}" stroke-width="${useStrokeWidth}"/>`;
                svg += `<circle cx="${tr.x}" cy="${tr.y}" r="6" fill="none" stroke="${color2}" stroke-width="${useStrokeWidth * 0.8}"/>`;
                svg += `<circle cx="${bl.x}" cy="${bl.y}" r="6" fill="none" stroke="${color2}" stroke-width="${useStrokeWidth * 0.8}"/>`;
        }
        
        return svg;
    }
};

// Export for use in other modules
window.Corners = Corners;
