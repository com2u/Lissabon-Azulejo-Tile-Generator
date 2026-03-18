/**
 * Centerpiece Module
 * Generates center decorations for tiles
 */

const Centerpiece = {
    // Generate centerpiece
    generate(type, palette, strokeWidth, fillOpacity, centerSize = 50, centerStrokeWidth = null, centerOpacity = 100) {
        let svg = '';
        const cx = 100;
        const cy = 100;
        const color = palette[0];
        const color2 = palette[1] || palette[0];
        const color3 = palette[2] || palette[0];
        
        const useStrokeWidth = centerStrokeWidth !== null ? centerStrokeWidth : strokeWidth;
        const opacityVal = centerOpacity / 100;
        const sizeMultiplier = centerSize / 50;
        
        switch (type) {
            case 'circle':
                svg += `<circle cx="${cx}" cy="${cy}" r="${25 * sizeMultiplier}" fill="${color}" fill-opacity="${fillOpacity / 100 * opacityVal}" stroke="${PatternBase.darkenColor(color, 40)}" stroke-width="${useStrokeWidth * 2}"/>`;
                svg += `<circle cx="${cx}" cy="${cy}" r="${12 * sizeMultiplier}" fill="none" stroke="${PatternBase.darkenColor(color, 60)}" stroke-width="${useStrokeWidth}"/>`;
                break;
                
            case 'star':
                svg += PatternBase.createStar(cx, cy, 30 * sizeMultiplier, 5, color, fillOpacity * opacityVal, useStrokeWidth * 2);
                svg += PatternBase.createStar(cx, cy, 15 * sizeMultiplier, 5, color2, fillOpacity * opacityVal, useStrokeWidth);
                break;
                
            case 'flower':
                for (let i = 0; i < 6; i++) {
                    const angle = (i / 6) * Math.PI * 2;
                    const x = cx + Math.cos(angle) * 15 * sizeMultiplier;
                    const y = cy + Math.sin(angle) * 15 * sizeMultiplier;
                    svg += `<circle cx="${x}" cy="${y}" r="${12 * sizeMultiplier}" fill="${palette[i % palette.length]}" fill-opacity="${fillOpacity / 100 * opacityVal}" stroke="${PatternBase.darkenColor(palette[i % palette.length], 30)}" stroke-width="${useStrokeWidth}"/>`;
                }
                svg += `<circle cx="${cx}" cy="${cy}" r="${10 * sizeMultiplier}" fill="${color}" stroke="${PatternBase.darkenColor(color, 40)}" stroke-width="${useStrokeWidth * 2}"/>`;
                break;
                
            case 'diamond':
                svg += `<polygon points="100,${100 - 30 * sizeMultiplier} ${100 + 30 * sizeMultiplier},100 100,${100 + 30 * sizeMultiplier} ${100 - 30 * sizeMultiplier},100" fill="${color}" fill-opacity="${fillOpacity / 100 * opacityVal}" stroke="${PatternBase.darkenColor(color, 40)}" stroke-width="${useStrokeWidth * 2}"/>`;
                svg += `<polygon points="100,${100 - 20 * sizeMultiplier} ${100 + 20 * sizeMultiplier},100 100,${100 + 20 * sizeMultiplier} ${100 - 20 * sizeMultiplier},100" fill="${color2}" fill-opacity="${fillOpacity / 100 * opacityVal}" stroke="${PatternBase.darkenColor(color2, 40)}" stroke-width="${useStrokeWidth}"/>`;
                break;
                
            case 'mandala':
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
                        svg += `<path d="M${cx},${cy} L${x1},${y1} A${radius},${radius} 0 0,1 ${x2},${y2} Z" fill="${layerColor}" fill-opacity="${fillOpacity / 100 * opacityVal}" stroke="${PatternBase.darkenColor(layerColor, 30)}" stroke-width="${useStrokeWidth}"/>`;
                    }
                }
                svg += `<circle cx="${cx}" cy="${cy}" r="${5 * sizeMultiplier}" fill="${color}" stroke="${PatternBase.darkenColor(color, 40)}" stroke-width="${useStrokeWidth}"/>`;
                break;
                
            case 'spiral':
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
                svg += `<circle cx="${cx}" cy="${cy}" r="${6 * sizeMultiplier}" fill="${color}" fill-opacity="${opacityVal}" stroke="${PatternBase.darkenColor(color, 40)}" stroke-width="${useStrokeWidth}"/>`;
                break;
                
            case 'heart':
                const heartScale = sizeMultiplier;
                svg += `<path d="M100,${115 * heartScale} C100,${115 * heartScale} ${75 * heartScale},${95 * heartScale} ${75 * heartScale},${80 * heartScale} C${75 * heartScale},${68 * heartScale} ${85 * heartScale},${60 * heartScale} ${95 * heartScale},${60 * heartScale} C98,60 100,62 100,62 C100,62 102,60 105,60 C115,60 125,68 125,80 C125,95 100,115 100,115 Z" fill="${color}" fill-opacity="${fillOpacity / 100 * opacityVal}" stroke="${PatternBase.darkenColor(color, 40)}" stroke-width="${useStrokeWidth * 2}"/>`;
                break;
                
            case 'cross':
                const crossSize = 25 * sizeMultiplier;
                const crossThick = 8 * sizeMultiplier;
                svg += `<rect x="${cx - crossThick/2}" y="${cy - crossSize}" width="${crossThick}" height="${crossSize * 2}" fill="${color}" fill-opacity="${fillOpacity / 100 * opacityVal}" stroke="${PatternBase.darkenColor(color, 40)}" stroke-width="${useStrokeWidth}"/>`;
                svg += `<rect x="${cx - crossSize}" y="${cy - crossThick/2}" width="${crossSize * 2}" height="${crossThick}" fill="${color}" fill-opacity="${fillOpacity / 100 * opacityVal}" stroke="${PatternBase.darkenColor(color, 40)}" stroke-width="${useStrokeWidth}"/>`;
                svg += `<polygon points="100,${90 * sizeMultiplier} ${110 * sizeMultiplier},100 100,${110 * sizeMultiplier} ${90 * sizeMultiplier},100" fill="${color2}" fill-opacity="${fillOpacity / 100 * opacityVal}" stroke="${PatternBase.darkenColor(color2, 40)}" stroke-width="${useStrokeWidth}"/>`;
                break;
                
            case 'hexagon':
                const hexSize = 28 * sizeMultiplier;
                svg += PatternBase.createHexagon(cx, cy, hexSize, color, fillOpacity * opacityVal, useStrokeWidth * 2);
                svg += PatternBase.createHexagon(cx, cy, hexSize * 0.6, color2, fillOpacity * opacityVal, useStrokeWidth);
                svg += `<circle cx="${cx}" cy="${cy}" r="${5 * sizeMultiplier}" fill="${color3}" stroke="${PatternBase.darkenColor(color3, 40)}" stroke-width="${useStrokeWidth}"/>`;
                break;
                
            case 'rosette':
                const rosettePetals = 8;
                const rosetteOuterR = 28 * sizeMultiplier;
                for (let i = 0; i < rosettePetals; i++) {
                    const angle = (i / rosettePetals) * Math.PI * 2 - Math.PI / 2;
                    const petalColor = palette[i % palette.length];
                    const tipX = cx + Math.cos(angle) * rosetteOuterR;
                    const tipY = cy + Math.sin(angle) * rosetteOuterR;
                    svg += PatternBase.createPetal(cx, cy, rosetteOuterR * 0.6, angle, petalColor, fillOpacity * opacityVal, useStrokeWidth);
                }
                svg += `<circle cx="${cx}" cy="${cy}" r="${10 * sizeMultiplier}" fill="${color}" stroke="${PatternBase.darkenColor(color, 40)}" stroke-width="${useStrokeWidth * 2}"/>`;
                break;
                
            case 'target':
                const targetRings = 4;
                const targetRingSize = 7 * sizeMultiplier;
                for (let r = targetRings; r >= 1; r--) {
                    const radius = r * targetRingSize;
                    const ringColor = palette[r % palette.length];
                    svg += `<circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="${ringColor}" stroke-width="${useStrokeWidth * 1.5}" stroke-opacity="${opacityVal}"/>`;
                }
                svg += `<circle cx="${cx}" cy="${cy}" r="${4 * sizeMultiplier}" fill="${color}" stroke="${PatternBase.darkenColor(color, 40)}" stroke-width="${useStrokeWidth}"/>`;
                break;
                
            // Additional types with simplified implementations
            case 'sun':
                const sunRays = 12;
                const sunOuterR = 35 * sizeMultiplier;
                const sunInnerR = 15 * sizeMultiplier;
                svg += `<circle cx="${cx}" cy="${cy}" r="${sunInnerR}" fill="${color}" fill-opacity="${fillOpacity / 100 * opacityVal}" stroke="${PatternBase.darkenColor(color, 40)}" stroke-width="${useStrokeWidth * 2}"/>`;
                for (let i = 0; i < sunRays; i++) {
                    const angle = (i / sunRays) * Math.PI * 2;
                    const x1 = cx + Math.cos(angle) * sunInnerR;
                    const y1 = cy + Math.sin(angle) * sunInnerR;
                    const x2 = cx + Math.cos(angle) * sunOuterR;
                    const y2 = cy + Math.sin(angle) * sunOuterR;
                    svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${palette[i % palette.length]}" stroke-width="${useStrokeWidth * 2}" stroke-linecap="round" stroke-opacity="${opacityVal}"/>`;
                }
                svg += `<circle cx="${cx}" cy="${cy}" r="${6 * sizeMultiplier}" fill="${color2}" stroke="${PatternBase.darkenColor(color2, 40)}" stroke-width="${useStrokeWidth}"/>`;
                break;
                
            case 'compass':
                const compassPoints = 4;
                const compassOuterR = 30 * sizeMultiplier;
                const compassInnerR = 15 * sizeMultiplier;
                for (let i = 0; i < compassPoints; i++) {
                    const angle = (i / compassPoints) * Math.PI * 2 - Math.PI / 2;
                    const nextAngle = ((i + 1) / compassPoints) * Math.PI * 2 - Math.PI / 2;
                    const midAngle = (angle + nextAngle) / 2;
                    const x1 = cx + Math.cos(angle) * compassOuterR;
                    const y1 = cy + Math.sin(angle) * compassOuterR;
                    const x2 = cx + Math.cos(nextAngle) * compassOuterR;
                    const y2 = cy + Math.sin(nextAngle) * compassOuterR;
                    const xm = cx + Math.cos(midAngle) * compassInnerR;
                    const ym = cy + Math.sin(midAngle) * compassInnerR;
                    svg += `<polygon points="${x1},${y1} ${x2},${y2} ${xm},${ym}" fill="${palette[i % palette.length]}" fill-opacity="${fillOpacity / 100 * opacityVal}" stroke="${PatternBase.darkenColor(palette[i % palette.length], 30)}" stroke-width="${useStrokeWidth}"/>`;
                }
                svg += `<circle cx="${cx}" cy="${cy}" r="${8 * sizeMultiplier}" fill="${color}" stroke="${PatternBase.darkenColor(color, 40)}" stroke-width="${useStrokeWidth * 2}"/>`;
                break;
                
            case 'crown':
            case 'arrow':
            case 'fleur':
            case 'anchor':
            case 'yinYang':
            case 'infinity':
            case 'trebleClef':
            case 'book':
            case 'gem':
            case 'key':
            case 'butterfly':
            default:
                // Simple circle fallback for additional types
                svg += `<circle cx="${cx}" cy="${cy}" r="${20 * sizeMultiplier}" fill="${color}" fill-opacity="${fillOpacity / 100 * opacityVal}" stroke="${PatternBase.darkenColor(color, 40)}" stroke-width="${useStrokeWidth * 2}"/>`;
                svg += `<circle cx="${cx}" cy="${cy}" r="${8 * sizeMultiplier}" fill="${color2}"/>`;
        }
        
        return svg;
    }
};

// Export for use in other modules
window.Centerpiece = Centerpiece;
