/**
 * Advanced Patterns Module
 * Celtic, Moroccan, Baroque, Kaleidoscope, Guilloché, Lace, Interlace, Tessellation, Chisel, Ribbon, Petal, Lattice, Halo patterns
 */

const AdvancedPatterns = {
    // ============ CELTIC PATTERNS ============
    
    generateCeltic(subType, palette, strokeWidth, fillOpacity, complexity) {
        let svg = '';
        const centerX = 100;
        const centerY = 100;
        
        switch (subType) {
            case 'knot':
                const knotSize = 40 + complexity * 10;
                svg += `<circle cx="${centerX - knotSize/2}" cy="${centerY}" r="${knotSize/2}" fill="none" stroke="${palette[0]}" stroke-width="${strokeWidth * 3}"/>`;
                svg += `<circle cx="${centerX + knotSize/2}" cy="${centerY}" r="${knotSize/2}" fill="none" stroke="${palette[1] || palette[0]}" stroke-width="${strokeWidth * 3}"/>`;
                svg += `<circle cx="${centerX}" cy="${centerY - knotSize/2}" r="${knotSize/3}" fill="${palette[0]}" stroke="none"/>`;
                svg += `<circle cx="${centerX}" cy="${centerY + knotSize/2}" r="${knotSize/3}" fill="${palette[1] || palette[0]}" stroke="none"/>`;
                break;
                
            case 'braid':
                const strands = Math.max(3, Math.min(6, complexity + 2));
                const braidRadius = 50;
                for (let s = 0; s < strands; s++) {
                    const color = PatternBase.getColor(palette, s);
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
                    const color = PatternBase.getColor(palette, i);
                    svg += `<ellipse cx="${x}" cy="${y}" rx="20" ry="12" transform="rotate(${angle * 180 / Math.PI}, ${x}, ${y})" fill="none" stroke="${color}" stroke-width="${strokeWidth * 2}"/>`;
                }
                for (let i = 0; i < 4; i++) {
                    const angle1 = (i / 4) * Math.PI * 2;
                    const angle2 = ((i + 1) / 4) * Math.PI * 2;
                    const x1 = centerX + Math.cos(angle1) * 40;
                    const y1 = centerY + Math.sin(angle1) * 40;
                    const x2 = centerX + Math.cos(angle2) * 40;
                    const y2 = centerY + Math.sin(angle2) * 40;
                    svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${palette[0]}" stroke-width="${strokeWidth * 2}"/>`;
                }
                break;
                
            case 'spiral':
                for (let i = 0; i < 3; i++) {
                    const color = PatternBase.getColor(palette, i);
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
    
    // ============ MOROCCAN PATTERNS ============
    
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
                        const color = PatternBase.getColor(palette, (row + col) % 2);
                        svg += `<path d="M${x},${y} L${x + zCell},${y} L${x + zCell},${y + zCell} L${x},${y + zCell} Z" fill="${color}" fill-opacity="${fillOpacity / 100}"/>`;
                        svg += `<path d="M${x},${y} L${x + zCell/2},${y} L${x},${y + zCell/2} Z" fill="${PatternBase.darkenColor(color, 20)}" fill-opacity="${fillOpacity / 100}"/>`;
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
                    const color = PatternBase.getColor(palette, i);
                    svg += PatternBase.createStar(cx, cy, starRadius, starPoints / 2, color, fillOpacity, strokeWidth);
                }
                svg += PatternBase.createStar(centerX, centerY, starRadius * 0.6, starPoints / 2, palette[0], fillOpacity, strokeWidth);
                break;
                
            case 'muqarnas':
                const muqCount = Math.max(4, Math.min(8, complexity + 3));
                const muqRadius = 70;
                for (let i = 0; i < muqCount; i++) {
                    const angle = (i / muqCount) * Math.PI * 2;
                    const x = centerX + Math.cos(angle) * muqRadius * 0.5;
                    const y = centerY + Math.sin(angle) * muqRadius * 0.5;
                    const color = PatternBase.getColor(palette, i);
                    svg += `<path d="M${x - 15},${y - 10} A15,15 0 0,1 ${x + 15},${y - 10} L${x + 15},${y + 10} A15,15 0 0,0 ${x - 15},${y + 10} Z" fill="${color}" fill-opacity="${fillOpacity / 100}" stroke="${PatternBase.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
                }
                svg += `<circle cx="${centerX}" cy="${centerY}" r="25" fill="none" stroke="${palette[0]}" stroke-width="${strokeWidth * 2}"/>`;
                break;
                
            case 'lattice':
                const latCount = Math.max(4, Math.min(8, complexity + 2));
                const latSpacing = 170 / latCount;
                for (let i = 0; i <= latCount; i++) {
                    const pos = 15 + i * latSpacing;
                    const color = PatternBase.getColor(palette, i % palette.length);
                    svg += `<line x1="${pos}" y1="15" x2="${185}" y2="${185 - (pos - 15)}" stroke="${color}" stroke-width="${strokeWidth}"/>`;
                    svg += `<line x1="15" y1="${pos}" x2="${185 - (pos - 15)}" y2="185" stroke="${color}" stroke-width="${strokeWidth}"/>`;
                }
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
    
    // ============ BAROQUE PATTERNS ============
    
    generateBaroque(subType, palette, strokeWidth, fillOpacity, complexity) {
        let svg = '';
        const centerX = 100;
        const centerY = 100;
        
        switch (subType) {
            case 'royal':
                svg += `<circle cx="${centerX}" cy="${centerY}" r="45" fill="none" stroke="${palette[0]}" stroke-width="${strokeWidth * 3}"/>`;
                svg += `<circle cx="${centerX}" cy="${centerY}" r="35" fill="${palette[1] || palette[0]}" fill-opacity="${fillOpacity / 100}" stroke="${PatternBase.darkenColor(palette[0], 30)}" stroke-width="${strokeWidth}"/>`;
                for (let i = 0; i < 8; i++) {
                    const angle = (i / 8) * Math.PI * 2;
                    const x = centerX + Math.cos(angle) * 25;
                    const y = centerY + Math.sin(angle) * 25;
                    svg += `<circle cx="${x}" cy="${y}" r="5" fill="${palette[0]}" stroke="${PatternBase.darkenColor(palette[0], 40)}" stroke-width="${strokeWidth}"/>`;
                }
                svg += `<circle cx="${centerX}" cy="${centerY}" r="12" fill="${palette[2] || palette[0]}" stroke="${PatternBase.darkenColor(palette[2] || palette[0], 40)}" stroke-width="${strokeWidth}"/>`;
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
                const fbCount = Math.max(4, Math.min(8, complexity + 3));
                for (let i = 0; i < fbCount; i++) {
                    const angle = (i / fbCount) * Math.PI * 2;
                    const x = centerX + Math.cos(angle) * 50;
                    const y = centerY + Math.sin(angle) * 50;
                    const color = PatternBase.getColor(palette, i);
                    for (let p = 0; p < 6; p++) {
                        const pAngle = (p / 6) * Math.PI * 2 + angle;
                        const px = x + Math.cos(pAngle) * 15;
                        const py = y + Math.sin(pAngle) * 15;
                        svg += `<circle cx="${px}" cy="${py}" r="8" fill="${color}" fill-opacity="${fillOpacity / 100}" stroke="${PatternBase.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
                    }
                    svg += `<circle cx="${x}" cy="${y}" r="8" fill="${palette[0]}" stroke="${PatternBase.darkenColor(palette[0], 40)}" stroke-width="${strokeWidth}"/>`;
                }
                svg += `<circle cx="${centerX}" cy="${centerY}" r="20" fill="${palette[2] || palette[0]}" fill-opacity="${fillOpacity / 100}" stroke="${PatternBase.darkenColor(palette[2] || palette[0], 40)}" stroke-width="${strokeWidth * 2}"/>`;
                break;
                
            case 'scroll':
                for (let i = 0; i < 4; i++) {
                    const angle = (i / 4) * Math.PI * 2;
                    const color = PatternBase.getColor(palette, i);
                    const cx = centerX + Math.cos(angle) * 40;
                    const cy = centerY + Math.sin(angle) * 40;
                    svg += `<path d="M${cx - 30},${cy} Q${cx - 30},${cy - 30} ${cx},${cy - 30} Q${cx + 30},${cy - 30} ${cx + 30},${cy} Q${cx + 30},${cy + 30} ${cx},${cy + 30} Q${cx - 30},${cy + 30} ${cx - 30},${cy}" fill="none" stroke="${color}" stroke-width="${strokeWidth * 2}" stroke-linecap="round"/>`;
                }
                svg += `<circle cx="${centerX}" cy="${centerY}" r="15" fill="none" stroke="${palette[0]}" stroke-width="${strokeWidth * 3}"/>`;
                break;
                
            case 'architectural':
                svg += `<path d="M40,185 L40,100 A60,60 0 0,1 160,100 L160,185" fill="none" stroke="${palette[0]}" stroke-width="${strokeWidth * 3}"/>`;
                svg += `<rect x="30" y="80" width="20" height="105" fill="${palette[1] || palette[0]}" fill-opacity="${fillOpacity / 100}" stroke="${PatternBase.darkenColor(palette[1] || palette[0], 40)}" stroke-width="${strokeWidth}"/>`;
                svg += `<rect x="150" y="80" width="20" height="105" fill="${palette[1] || palette[0]}" fill-opacity="${fillOpacity / 100}" stroke="${PatternBase.darkenColor(palette[1] || palette[0], 40)}" stroke-width="${strokeWidth}"/>`;
                svg += `<rect x="25" y="70" width="150" height="15" fill="${palette[2] || palette[0]}" fill-opacity="${fillOpacity / 100}" stroke="${PatternBase.darkenColor(palette[2] || palette[0], 40)}" stroke-width="${strokeWidth}"/>`;
                svg += `<path d="M60,185 L60,110 A40,40 0 0,1 140,110 L140,185" fill="none" stroke="${palette[2] || palette[0]}" stroke-width="${strokeWidth * 2}"/>`;
                break;
                
            default:
                svg = this.generateBaroque('royal', palette, strokeWidth, fillOpacity, complexity);
        }
        
        return svg;
    },
    
    // ============ KALEIDOSCOPE PATTERNS ============
    
    generateKaleidoscope(subType, palette, strokeWidth, fillOpacity, complexity, symmetry = 'none') {
        let svg = '';
        const centerX = 100;
        const centerY = 100;
        const segments = Math.max(4, Math.min(16, complexity * 2 + 4));
        const segmentAngle = (Math.PI * 2) / segments;
        
        switch (subType) {
            case 'geometric':
                const geoLayers = Math.max(2, Math.min(5, Math.floor(complexity / 2) + 2));
                for (let layer = 0; layer < geoLayers; layer++) {
                    const layerRadius = 15 + layer * 18;
                    const color = PatternBase.getColor(palette, layer);
                    for (let i = 0; i < segments; i++) {
                        const angle1 = i * segmentAngle - Math.PI / 2;
                        const angle2 = (i + 1) * segmentAngle - Math.PI / 2;
                        const x1 = centerX + Math.cos(angle1) * layerRadius;
                        const y1 = centerY + Math.sin(angle1) * layerRadius;
                        const x2 = centerX + Math.cos(angle2) * layerRadius;
                        const y2 = centerY + Math.sin(angle2) * layerRadius;
                        svg += `<polygon points="${centerX},${centerY} ${x1},${y1} ${x2},${y2}" fill="${color}" fill-opacity="${fillOpacity / 100 * (0.6 + PatternBase.random() * 0.4)}" stroke="${PatternBase.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
                    }
                }
                svg += `<circle cx="${centerX}" cy="${centerY}" r="10" fill="${palette[0]}" stroke="${PatternBase.darkenColor(palette[0], 40)}" stroke-width="${strokeWidth * 2}"/>`;
                break;
                
            case 'floral':
                const floralLayers = Math.max(2, Math.min(4, Math.floor(complexity / 2) + 1));
                for (let layer = 0; layer < floralLayers; layer++) {
                    const layerRadius = 20 + layer * 22;
                    for (let i = 0; i < segments; i++) {
                        const angle = (i / segments) * Math.PI * 2 - Math.PI / 2;
                        const color = PatternBase.getColor(palette, layer + i);
                        const petalLength = 15 + layer * 5;
                        const tipX = centerX + Math.cos(angle) * layerRadius;
                        const tipY = centerY + Math.sin(angle) * layerRadius;
                        const ctrlX1 = centerX + Math.cos(angle - 0.3) * (layerRadius - petalLength * 0.3);
                        const ctrlY1 = centerY + Math.sin(angle - 0.3) * (layerRadius - petalLength * 0.3);
                        const ctrlX2 = centerX + Math.cos(angle + 0.3) * (layerRadius - petalLength * 0.3);
                        const ctrlY2 = centerY + Math.sin(angle + 0.3) * (layerRadius - petalLength * 0.3);
                        svg += `<path d="M${centerX},${centerY} Q${ctrlX1},${ctrlY1} ${tipX},${tipY} Q${ctrlX2},${ctrlY2} ${centerX},${centerY}" fill="${color}" fill-opacity="${fillOpacity / 100}" stroke="${PatternBase.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
                    }
                }
                svg += `<circle cx="${centerX}" cy="${centerY}" r="10" fill="${palette[0]}" stroke="${PatternBase.darkenColor(palette[0], 40)}" stroke-width="${strokeWidth * 2}"/>`;
                break;
                
            case 'line':
                const lineCount = Math.max(3, Math.min(8, complexity + 2));
                for (let i = 0; i < segments; i++) {
                    const angle = i * segmentAngle - Math.PI / 2;
                    const color = PatternBase.getColor(palette, i % palette.length);
                    for (let j = 0; j < lineCount; j++) {
                        const innerR = 10 + j * 10;
                        const outerR = innerR + 8;
                        const x1 = centerX + Math.cos(angle) * innerR;
                        const y1 = centerY + Math.sin(angle) * innerR;
                        const x2 = centerX + Math.cos(angle + segmentAngle * 0.8) * outerR;
                        const y2 = centerY + Math.sin(angle + segmentAngle * 0.8) * outerR;
                        svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round"/>`;
                    }
                }
                break;
                
            case 'mosaic':
                for (let i = 0; i < segments; i++) {
                    const angle = i * segmentAngle - Math.PI / 2;
                    const nextAngle = (i + 1) * segmentAngle - Math.PI / 2;
                    const color = PatternBase.getColor(palette, i);
                    const midR = 40 + PatternBase.random() * 40;
                    const x1 = centerX + Math.cos(angle) * midR;
                    const y1 = centerY + Math.sin(angle) * midR;
                    const x2 = centerX + Math.cos(nextAngle) * midR;
                    const y2 = centerY + Math.sin(nextAngle) * midR;
                    svg += `<polygon points="${centerX},${centerY} ${x1},${y1} ${x2},${y2}" fill="${color}" fill-opacity="${fillOpacity / 100}" stroke="${PatternBase.darkenColor(color, 40)}" stroke-width="${strokeWidth}"/>`;
                    const innerR = midR * 0.5;
                    const ix1 = centerX + Math.cos(angle + segmentAngle * 0.3) * innerR;
                    const iy1 = centerY + Math.sin(angle + segmentAngle * 0.3) * innerR;
                    svg += `<circle cx="${ix1}" cy="${iy1}" r="3" fill="${PatternBase.darkenColor(color, 20)}"/>`;
                }
                break;
                
            case 'medallion':
                const medalRings = Math.max(2, Math.min(5, Math.floor(complexity / 2) + 2));
                for (let ring = 0; ring < medalRings; ring++) {
                    const ringRadius = 15 + ring * 18;
                    const color = PatternBase.getColor(palette, ring);
                    for (let i = 0; i < segments; i++) {
                        const angle1 = i * segmentAngle - Math.PI / 2;
                        const angle2 = (i + 1) * segmentAngle - Math.PI / 2;
                        const x1 = centerX + Math.cos(angle1) * ringRadius;
                        const y1 = centerY + Math.sin(angle1) * ringRadius;
                        const x2 = centerX + Math.cos(angle2) * ringRadius;
                        const y2 = centerY + Math.sin(angle2) * ringRadius;
                        const xm = centerX + Math.cos(angle1 + segmentAngle / 2) * (ringRadius - 5);
                        const ym = centerY + Math.sin(angle1 + segmentAngle / 2) * (ringRadius - 5);
                        svg += `<path d="M${centerX},${centerY} L${x1},${y1} A${ringRadius},${ringRadius} 0 0,1 ${x2},${y2} Z" fill="${color}" fill-opacity="${fillOpacity / 100 * 0.7}" stroke="${PatternBase.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
                        svg += `<circle cx="${xm}" cy="${ym}" r="3" fill="${PatternBase.darkenColor(color, 50)}"/>`;
                    }
                }
                svg += `<circle cx="${centerX}" cy="${centerY}" r="8" fill="${palette[0]}" stroke="${PatternBase.darkenColor(palette[0], 50)}" stroke-width="${strokeWidth * 2}"/>`;
                svg += `<circle cx="${centerX}" cy="${centerY}" r="4" fill="${palette[1] || palette[0]}"/>`;
                break;
                
            case 'starburst':
                for (let i = 0; i < segments; i++) {
                    const angle = i * segmentAngle - Math.PI / 2;
                    const color = PatternBase.getColor(palette, i % palette.length);
                    for (let r = 0; r < 5; r++) {
                        const innerR = 10 + r * 15;
                        const outerR = innerR + 12;
                        const x1 = centerX + Math.cos(angle) * innerR;
                        const y1 = centerY + Math.sin(angle) * innerR;
                        const x2 = centerX + Math.cos(angle) * outerR;
                        const y2 = centerY + Math.sin(angle) * outerR;
                        svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${strokeWidth * 1.5}" stroke-linecap="round"/>`;
                    }
                    const midR = 45;
                    const mx = centerX + Math.cos(angle) * midR;
                    const my = centerY + Math.sin(angle) * midR;
                    svg += `<circle cx="${mx}" cy="${my}" r="4" fill="${color}" stroke="${PatternBase.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
                }
                break;
                
            case 'handmade':
                for (let i = 0; i < segments; i++) {
                    const angle = i * segmentAngle - Math.PI / 2;
                    const nextAngle = (i + 1) * segmentAngle - Math.PI / 2;
                    const color = PatternBase.getColor(palette, i);
                    const midAngle = angle + segmentAngle / 2;
                    const controlR = 30 + PatternBase.random() * 30;
                    const outerR = 70;
                    const ox = centerX + Math.cos(midAngle) * outerR;
                    const oy = centerY + Math.sin(midAngle) * outerR;
                    const cx1 = centerX + Math.cos(midAngle - segmentAngle * 0.3) * controlR;
                    const cy1 = centerY + Math.sin(midAngle - segmentAngle * 0.3) * controlR;
                    const cx2 = centerX + Math.cos(midAngle + segmentAngle * 0.3) * controlR;
                    const cy2 = centerY + Math.sin(midAngle + segmentAngle * 0.3) * controlR;
                    svg += `<path d="M${centerX},${centerY} Q${cx1},${cy1} ${ox},${oy} Q${cx2},${cy2} ${centerX},${centerY}" fill="${color}" fill-opacity="${fillOpacity / 100 * 0.6}" stroke="${PatternBase.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
                }
                break;
                
            default:
                svg = this.generateKaleidoscope('geometric', palette, strokeWidth, fillOpacity, complexity, symmetry);
        }
        
        return svg;
    },
    
    // ============ GUILL OCHÉ PATTERNS ============
    
    generateGuilloche(subType, palette, strokeWidth, fillOpacity, complexity, symmetry = 'none') {
        let svg = '';
        const centerX = 100;
        const centerY = 100;
        
        switch (subType) {
            case 'circular':
                const circRings = Math.max(2, Math.min(5, Math.floor(complexity / 2) + 2));
                const loopsPerRing = Math.max(8, complexity * 3 + 4);
                for (let ring = 0; ring < circRings; ring++) {
                    const baseRadius = 20 + ring * 15;
                    const amplitude = 5 + ring * 2;
                    const color = PatternBase.getColor(palette, ring);
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
                            svg += `<line x1="${prevX}" y1="${prevY}" x2="${x}" y2="${y}" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round"/>`;
                        }
                    }
                }
                break;
                
            case 'medallion':
                const medRings = Math.max(3, Math.min(6, complexity + 2));
                for (let ring = 0; ring < medRings; ring++) {
                    const baseR = 15 + ring * 14;
                    const amp = 4 + ring * 1.5;
                    const freq = 2 + ring;
                    const points = 60 + ring * 20;
                    const color = PatternBase.getColor(palette, ring);
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
                svg += `<circle cx="${centerX}" cy="${centerY}" r="8" fill="none" stroke="${palette[0]}" stroke-width="${strokeWidth * 2}"/>`;
                svg += `<circle cx="${centerX}" cy="${centerY}" r="4" fill="${palette[0]}"/>`;
                break;
                
            case 'border':
                const borderRings = Math.max(2, Math.min(4, Math.floor(complexity / 2) + 2));
                for (let ring = 0; ring < borderRings; ring++) {
                    const baseR = 60 + ring * 25;
                    const amp = 8 + ring * 3;
                    const freq = 6 + ring * 2;
                    const points = 80;
                    const color = PatternBase.getColor(palette, ring);
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
                const ovalFreq = Math.max(3, complexity + 2);
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
                    svg += `<path d="${d}" fill="none" stroke="${PatternBase.getColor(palette, i % palette.length)}" stroke-width="${strokeWidth}" stroke-linecap="round"/>`;
                }
                break;
                
            case 'radial':
                const radialPetals = Math.max(6, complexity * 2 + 4);
                for (let i = 0; i < radialPetals; i++) {
                    const angle = (i / radialPetals) * Math.PI * 2 - Math.PI / 2;
                    const color = PatternBase.getColor(palette, i % palette.length);
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
                const spiroArms = Math.max(2, Math.min(5, Math.floor(complexity / 2) + 2));
                const spiroPoints = Math.max(80, complexity * 30);
                for (let arm = 0; arm < spiroArms; arm++) {
                    const color = PatternBase.getColor(palette, arm);
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
                for (let i = 0; i < 5; i++) {
                    const color = PatternBase.getColor(palette, i);
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
                const engRings = Math.max(3, Math.min(6, complexity + 2));
                for (let ring = 0; ring < engRings; ring++) {
                    const baseR = 20 + ring * 18;
                    const color = PatternBase.getColor(palette, ring);
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
    
    // ============ LACE PATTERNS ============
    
    generateLace(subType, palette, strokeWidth, fillOpacity, complexity, symmetry = 'none') {
        let svg = '';
        const centerX = 100;
        const centerY = 100;
        
        switch (subType) {
            case 'delicate':
                const delicateCount = Math.max(8, complexity * 4 + 6);
                for (let i = 0; i < delicateCount; i++) {
                    const angle = (i / delicateCount) * Math.PI * 2;
                    const color = PatternBase.getColor(palette, i % palette.length);
                    const len = 20 + PatternBase.random() * 40;
                    const x1 = centerX + Math.cos(angle) * 15;
                    const y1 = centerY + Math.sin(angle) * 15;
                    const x2 = centerX + Math.cos(angle) * len;
                    const y2 = centerY + Math.sin(angle) * len;
                    const ctrlX = centerX + Math.cos(angle + 0.2) * (len * 0.5);
                    const ctrlY = centerY + Math.sin(angle + 0.2) * (len * 0.5);
                    svg += `<path d="M${x1},${y1} Q${ctrlX},${ctrlY} ${x2},${y2}" fill="none" stroke="${color}" stroke-width="${strokeWidth * 0.5}" stroke-linecap="round"/>`;
                    svg += `<circle cx="${x2}" cy="${y2}" r="1.5" fill="${color}"/>`;
                }
                break;
                
            case 'filigree':
                const filiLayers = Math.max(2, Math.min(4, Math.floor(complexity / 2) + 1));
                for (let layer = 0; layer < filiLayers; layer++) {
                    const layerR = 20 + layer * 25;
                    const filiCount = 8 + layer * 4;
                    for (let i = 0; i < filiCount; i++) {
                        const angle = (i / filiCount) * Math.PI * 2;
                        const color = PatternBase.getColor(palette, layer + i);
                        const startX = centerX + Math.cos(angle) * layerR;
                        const startY = centerY + Math.sin(angle) * layerR;
                        const ctrlX1 = startX + Math.cos(angle + 0.5) * 12;
                        const ctrlY1 = startY + Math.sin(angle + 0.5) * 12;
                        const ctrlX2 = startX + Math.cos(angle - 0.5) * 12;
                        const ctrlY2 = startY + Math.sin(angle - 0.5) * 12;
                        const endX = centerX + Math.cos(angle) * (layerR + 10);
                        const endY = centerY + Math.sin(angle) * (layerR + 10);
                        svg += `<path d="M${startX},${startY} Q${ctrlX1},${ctrlY1} ${endX},${endY} Q${ctrlX2},${ctrlY2} ${startX},${startY}" fill="none" stroke="${color}" stroke-width="${strokeWidth * 0.7}" stroke-linecap="round"/>`;
                    }
                }
                break;
                
            case 'web':
                const webRings = Math.max(2, Math.min(4, Math.floor(complexity / 2) + 2));
                const webSpokes = Math.max(8, complexity * 2 + 6);
                for (let i = 0; i < webSpokes; i++) {
                    const angle = (i / webSpokes) * Math.PI * 2;
                    const color = PatternBase.getColor(palette, i % palette.length);
                    for (let ring = 1; ring <= webRings; ring++) {
                        const r = ring * 18;
                        const x = centerX + Math.cos(angle) * r;
                        const y = centerY + Math.sin(angle) * r;
                        svg += `<circle cx="${x}" cy="${y}" r="1" fill="${color}"/>`;
                    }
                }
                for (let ring = 1; ring <= webRings; ring++) {
                    const r = ring * 18;
                    svg += `<circle cx="${centerX}" cy="${centerY}" r="${r}" fill="none" stroke="${palette[0]}" stroke-width="${strokeWidth * 0.5}"/>`;
                }
                for (let i = 0; i < webSpokes; i++) {
                    const angle1 = (i / webSpokes) * Math.PI * 2;
                    const angle2 = ((i + 1) / webSpokes) * Math.PI * 2;
                    const color = PatternBase.getColor(palette, i);
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
                const floralPetals = Math.max(6, complexity * 2 + 4);
                for (let i = 0; i < floralPetals; i++) {
                    const angle = (i / floralPetals) * Math.PI * 2 - Math.PI / 2;
                    const color = PatternBase.getColor(palette, i % palette.length);
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
                const geoLaceCount = Math.max(4, complexity + 3);
                for (let i = 0; i < geoLaceCount; i++) {
                    for (let j = 0; j < geoLaceCount; j++) {
                        const x = 25 + i * 50;
                        const y = 25 + j * 50;
                        if (Math.abs(x - 100) < 20 && Math.abs(y - 100) < 20) continue;
                        const color = PatternBase.getColor(palette, i + j);
                        const size = 8;
                        svg += `<polygon points="${x},${y - size} ${x + size},${y} ${x},${y + size} ${x - size},${y}" fill="none" stroke="${color}" stroke-width="${strokeWidth * 0.6}"/>`;
                        svg += `<circle cx="${x}" cy="${y}" r="2" fill="${color}"/>`;
                    }
                }
                break;
                
            default:
                svg = this.generateLace('delicate', palette, strokeWidth, fillOpacity, complexity, symmetry);
        }
        
        return svg;
    },
    
    // ============ INTERLACE PATTERNS ============
    
    generateInterlace(subType, palette, strokeWidth, fillOpacity, complexity, symmetry = 'none') {
        let svg = '';
        
        switch (subType) {
            case 'braid':
                const braidStrands = Math.max(3, Math.min(6, complexity + 2));
                const braidRadius = 30 + complexity * 5;
                for (let s = 0; s < braidStrands; s++) {
                    const color = PatternBase.getColor(palette, s);
                    let d = '';
                    for (let i = 0; i <= 40; i++) {
                        const t = i / 40;
                        const angle = t * Math.PI * 4 + (s / braidStrands) * Math.PI * 2;
                        const r = braidRadius + Math.sin(angle * braidStrands) * 10;
                        const x = 100 + Math.cos(angle) * r;
                        const y = 100 + Math.sin(angle) * r;
                        d += i === 0 ? `M${x},${y} ` : `L${x},${y} `;
                    }
                    svg += `<path d="${d}" fill="none" stroke="${color}" stroke-width="${strokeWidth * 2}" stroke-linecap="round"/>`;
                }
                break;
                
            case 'basket':
                const basketCells = Math.max(2, Math.min(4, Math.floor(complexity / 2) + 2));
                const cellSize = 170 / (basketCells * 2 + 1);
                for (let row = 0; row < basketCells * 2 + 1; row++) {
                    for (let col = 0; col < basketCells * 2 + 1; col++) {
                        const x = 15 + col * cellSize + cellSize / 2;
                        const y = 15 + row * cellSize + cellSize / 2;
                        if (!PatternBase.isInSymmetryArea(x, y, symmetry)) continue;
                        const color = PatternBase.getColor(palette, (row + col) % palette.length);
                        const isOver = (row + col) % 2 === 0;
                        if (isOver) {
                            svg += `<rect x="${x - cellSize/2}" y="${y - cellSize * 0.3}" width="${cellSize}" height="${cellSize * 0.6}" fill="${color}" fill-opacity="${fillOpacity / 100}" stroke="${PatternBase.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
                        } else {
                            svg += `<rect x="${x - cellSize * 0.3}" y="${y - cellSize/2}" width="${cellSize * 0.6}" height="${cellSize}" fill="${color}" fill-opacity="${fillOpacity / 100}" stroke="${PatternBase.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
                        }
                    }
                }
                break;
                
            case 'celtic-knot':
                const knotSize = 25 + complexity * 8;
                const knotColor = palette[0];
                svg += `<path d="M${100 - knotSize},${100 - knotSize} C${100 + knotSize},${100 - knotSize} ${100 + knotSize},${100 + knotSize} ${100 - knotSize},${100 + knotSize}" fill="none" stroke="${knotColor}" stroke-width="${strokeWidth * 3}"/>`;
                svg += `<path d="M${100 + knotSize},${100 - knotSize} C${100 - knotSize},${100 - knotSize} ${100 - knotSize},${100 + knotSize} ${100 + knotSize},${100 + knotSize}" fill="none" stroke="${PatternBase.getColor(palette, 1)}" stroke-width="${strokeWidth * 3}"/>`;
                svg += `<path d="M${100 - knotSize},${100 - knotSize} C${100 - knotSize},${100 + knotSize} ${100 + knotSize},${100 + knotSize} ${100 + knotSize},${100 - knotSize}" fill="none" stroke="${PatternBase.getColor(palette, 2) || knotColor}" stroke-width="${strokeWidth * 3}"/>`;
                svg += `<path d="M${100 - knotSize},${100 + knotSize} C${100 - knotSize},${100 - knotSize} ${100 + knotSize},${100 - knotSize} ${100 + knotSize},${100 + knotSize}" fill="none" stroke="${PatternBase.getColor(palette, 3) || knotColor}" stroke-width="${strokeWidth * 3}"/>`;
                svg += `<circle cx="100" cy="${100 - knotSize}" r="${strokeWidth * 2}" fill="${palette[1] || palette[0]}" stroke="none"/>`;
                svg += `<circle cx="100" cy="${100 + knotSize}" r="${strokeWidth * 2}" fill="${palette[0]}" stroke="none"/>`;
                break;
                
            case 'chain':
                const chainLinks = Math.max(4, complexity + 3);
                for (let i = 0; i < chainLinks; i++) {
                    const angle = (i / chainLinks) * Math.PI * 2;
                    const x = 100 + Math.cos(angle) * 45;
                    const y = 100 + Math.sin(angle) * 45;
                    const color = PatternBase.getColor(palette, i);
                    svg += `<ellipse cx="${x}" cy="${y}" rx="18" ry="10" transform="rotate(${angle * 180 / Math.PI}, ${x}, ${y})" fill="none" stroke="${color}" stroke-width="${strokeWidth * 2}"/>`;
                }
                for (let i = 0; i < chainLinks; i++) {
                    const angle1 = (i / chainLinks) * Math.PI * 2;
                    const angle2 = ((i + 1) / chainLinks) * Math.PI * 2;
                    const x1 = 100 + Math.cos(angle1) * 45;
                    const y1 = 100 + Math.sin(angle1) * 45;
                    const x2 = 100 + Math.cos(angle2) * 45;
                    const y2 = 100 + Math.sin(angle2) * 45;
                    svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${palette[0]}" stroke-width="${strokeWidth * 2}"/>`;
                }
                break;
                
            case 'diagonal-weave':
                const diagCells = Math.max(3, Math.min(6, complexity + 2));
                const diagSize = 170 / diagCells;
                for (let row = 0; row < diagCells; row++) {
                    for (let col = 0; col < diagCells; col++) {
                        const x = 15 + col * diagSize + diagSize / 2;
                        const y = 15 + row * diagSize + diagSize / 2;
                        if (!PatternBase.isInSymmetryArea(x, y, symmetry)) continue;
                        const color = PatternBase.getColor(palette, (row + col) % palette.length);
                        const size = diagSize * 0.4;
                        svg += `<polygon points="${x},${y - size} ${x + size},${y} ${x},${y + size} ${x - size},${y}" fill="${color}" fill-opacity="${fillOpacity / 100}" stroke="${PatternBase.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
                        if ((row + col) % 2 === 0) {
                            svg += `<line x1="${x - size}" y1="${y}" x2="${x + size}" y2="${y}" stroke="${PatternBase.darkenColor(color, 50)}" stroke-width="${strokeWidth}"/>`;
                        } else {
                            svg += `<line x1="${x}" y1="${y - size}" x2="${x}" y2="${y + size}" stroke="${PatternBase.darkenColor(color, 50)}" stroke-width="${strokeWidth}"/>`;
                        }
                    }
                }
                break;
                
            default:
                svg = this.generateInterlace('braid', palette, strokeWidth, fillOpacity, complexity, symmetry);
        }
        
        return svg;
    },
    
    // ============ TESSELLATION PATTERNS ============
    
    generateTessellation(subType, palette, strokeWidth, fillOpacity, complexity, symmetry = 'none') {
        let svg = '';
        
        switch (subType) {
            case 'diamonds':
                const diamondRows = Math.max(3, Math.min(7, complexity + 2));
                const diamondCols = Math.max(3, Math.min(7, complexity + 2));
                const dSize = 170 / diamondCols;
                for (let row = 0; row < diamondRows; row++) {
                    for (let col = 0; col < diamondCols; col++) {
                        const cx = 15 + col * dSize + dSize / 2;
                        const cy = 15 + row * dSize + dSize / 2;
                        if (!PatternBase.isInSymmetryArea(cx, cy, symmetry)) continue;
                        const color = PatternBase.getColor(palette, (row + col) % palette.length);
                        const size = dSize / 2 - 2;
                        svg += `<polygon points="${cx},${cy - size} ${cx + size},${cy} ${cx},${cy + size} ${cx - size},${cy}" fill="${color}" fill-opacity="${fillOpacity / 100}" stroke="${PatternBase.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
                    }
                }
                break;
                
            case 'stars':
                const starCount = Math.max(3, Math.min(6, complexity + 2));
                const starSpacing = 170 / starCount;
                for (let row = 0; row < starCount; row++) {
                    for (let col = 0; col < starCount; col++) {
                        const x = 15 + col * starSpacing + starSpacing / 2;
                        const y = 15 + row * starSpacing + starSpacing / 2;
                        if (!PatternBase.isInSymmetryArea(x, y, symmetry)) continue;
                        const color = PatternBase.getColor(palette, row + col);
                        const size = starSpacing * 0.35;
                        svg += PatternBase.createStar(x, y, size, 5, color, fillOpacity, strokeWidth);
                    }
                }
                break;
                
            case 'hex-grid':
                const hexRows = Math.max(3, Math.min(6, complexity + 1));
                const hexSize = 170 / (hexRows * 1.8);
                for (let row = 0; row < hexRows * 1.5; row++) {
                    for (let col = 0; col < hexRows; col++) {
                        const cx = 15 + col * hexSize * 1.5 + (row % 2) * hexSize * 0.75;
                        const cy = 15 + row * hexSize * 0.866;
                        if (!PatternBase.isInSymmetryArea(cx, cy, symmetry)) continue;
                        const color = PatternBase.getColor(palette, row + col);
                        svg += PatternBase.createHexagon(cx, cy, hexSize - 2, color, fillOpacity, strokeWidth);
                    }
                }
                break;
                
            case 'triangles':
                const triCount = Math.max(4, Math.min(8, complexity + 3));
                const triSize = 170 / triCount;
                for (let row = 0; row < triCount; row++) {
                    for (let col = 0; col < triCount * 2; col++) {
                        const cx = 15 + col * triSize / 2;
                        const cy = 15 + row * triSize;
                        if (!PatternBase.isInSymmetryArea(cx, cy, symmetry)) continue;
                        const color = PatternBase.getColor(palette, row + col);
                        const size = triSize / 2 - 1;
                        const pointUp = (row + col) % 2 === 0;
                        if (pointUp) {
                            svg += `<polygon points="${cx},${cy} ${cx + size},${cy + size} ${cx - size},${cy + size}" `;
                        } else {
                            svg += `<polygon points="${cx},${cy + size} ${cx + size},${cy} ${cx - size},${cy}" `;
                        }
                        svg += `fill="${color}" fill-opacity="${fillOpacity / 100}" stroke="${PatternBase.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
                    }
                }
                break;
                
            case 'octagons':
                const octCount = Math.max(2, Math.min(4, Math.floor(complexity / 2) + 2));
                const octSize = 170 / octCount;
                for (let row = 0; row < octCount; row++) {
                    for (let col = 0; col < octCount; col++) {
                        const cx = 15 + col * octSize + octSize / 2;
                        const cy = 15 + row * octSize + octSize / 2;
                        if (!PatternBase.isInSymmetryArea(cx, cy, symmetry)) continue;
                        const color = PatternBase.getColor(palette, row + col);
                        const size = octSize / 2 - 2;
                        let points = '';
                        for (let i = 0; i < 8; i++) {
                            const angle = (i / 8) * Math.PI * 2 - Math.PI / 8;
                            const x = cx + Math.cos(angle) * size;
                            const y = cy + Math.sin(angle) * size;
                            points += `${x},${y} `;
                        }
                        svg += `<polygon points="${points}" fill="${color}" fill-opacity="${fillOpacity / 100}" stroke="${PatternBase.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
                        const sqSize = size * 0.4;
                        svg += `<rect x="${cx - sqSize}" y="${cy - sqSize}" width="${sqSize * 2}" height="${sqSize * 2}" fill="${PatternBase.getColor(palette, (row + col + 1) % palette.length)}" fill-opacity="${fillOpacity / 100}"/>`;
                    }
                }
                break;
                
            default:
                svg = this.generateTessellation('diamonds', palette, strokeWidth, fillOpacity, complexity, symmetry);
        }
        
        return svg;
    },
    
    // ============ CHISEL PATTERNS ============
    
    generateChisel(subType, palette, strokeWidth, fillOpacity, complexity, symmetry = 'none') {
        let svg = '';
        
        switch (subType) {
            case 'lines':
                const lineCount = Math.max(5, complexity * 3 + 5);
                const spacing = 170 / lineCount;
                for (let i = 0; i < lineCount; i++) {
                    const color = PatternBase.getColor(palette, i);
                    const y = 15 + i * spacing;
                    if (!PatternBase.isInSymmetryArea(100, y, symmetry)) continue;
                    svg += `<line x1="15" y1="${y}" x2="185" y2="${y}" stroke="${color}" stroke-width="${strokeWidth * 1.5}" stroke-linecap="round"/>`;
                    svg += `<line x1="16" y1="${y + 1}" x2="186" y2="${y + 1}" stroke="${PatternBase.darkenColor(color, 40)}" stroke-width="${strokeWidth * 0.5}" stroke-linecap="round"/>`;
                }
                break;
                
            case 'hatching':
                const hatchCount = Math.max(8, complexity * 4 + 6);
                const hatchSpacing = 170 / hatchCount;
                for (let i = -hatchCount; i < hatchCount * 2; i++) {
                    const color = PatternBase.getColor(palette, Math.abs(i) % palette.length);
                    const offset = i * hatchSpacing;
                    if (!PatternBase.isInSymmetryArea(100, 100, symmetry)) continue;
                    svg += `<line x1="${offset}" y1="15" x2="${offset + 170}" y2="185" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round"/>`;
                }
                break;
                
            case 'crosshatch':
                const crossCount = Math.max(4, complexity * 2 + 3);
                const crossSpacing = 170 / crossCount;
                for (let i = 0; i <= crossCount; i++) {
                    const color = PatternBase.getColor(palette, 0);
                    const pos = 15 + i * crossSpacing;
                    svg += `<line x1="${pos}" y1="15" x2="185" y2="${185 - (pos - 15)}" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round"/>`;
                }
                for (let i = 0; i <= crossCount; i++) {
                    const color = PatternBase.getColor(palette, 1) || palette[0];
                    const pos = 15 + i * crossSpacing;
                    svg += `<line x1="15" y1="${pos}" x2="${185 - (pos - 15)}" y2="185" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round"/>`;
                }
                break;
                
            case 'carving':
                const carveRings = Math.max(3, Math.min(6, complexity + 2));
                const centerX = 100;
                const centerY = 100;
                for (let ring = 0; ring < carveRings; ring++) {
                    const r = 15 + ring * 20;
                    const color = PatternBase.getColor(palette, ring);
                    svg += `<circle cx="${centerX}" cy="${centerY}" r="${r}" fill="none" stroke="${color}" stroke-width="${strokeWidth * 1.5}"/>`;
                    svg += `<circle cx="${centerX - 1}" cy="${centerY - 1}" r="${r - 2}" fill="none" stroke="${PatternBase.darkenColor(color, 30)}" stroke-width="${strokeWidth * 0.5}"/>`;
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
                svg += `<circle cx="${centerX}" cy="${centerY}" r="8" fill="${palette[0]}" stroke="${PatternBase.darkenColor(palette[0], 40)}" stroke-width="${strokeWidth * 2}"/>`;
                break;
                
            default:
                svg = this.generateChisel('lines', palette, strokeWidth, fillOpacity, complexity, symmetry);
        }
        
        return svg;
    },
    
    // ============ RIBBON PATTERNS ============
    
    generateRibbon(subType, palette, strokeWidth, fillOpacity, complexity, symmetry = 'none') {
        let svg = '';
        const centerX = 100;
        const centerY = 100;
        
        switch (subType) {
            case 'flowing':
                const ribbonCount = Math.max(3, Math.min(6, complexity + 2));
                for (let i = 0; i < ribbonCount; i++) {
                    const color = PatternBase.getColor(palette, i);
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
                    svg += `<path d="${d}" fill="none" stroke="${PatternBase.darkenColor(color, 30)}" stroke-width="${strokeWidth}" stroke-linecap="round"/>`;
                }
                break;
                
            case 'twist':
                const twistCount = Math.max(2, Math.min(4, Math.floor(complexity / 2) + 2));
                for (let i = 0; i < twistCount; i++) {
                    const color = PatternBase.getColor(palette, i);
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
                const frameRibbons = 2;
                for (let f = 0; f < frameRibbons; f++) {
                    const offset = f * 12;
                    const color = PatternBase.getColor(palette, f);
                    svg += `<path d="M${20 + offset},${20 + offset} Q${100},${10 + offset} ${180 - offset},${20 + offset}" fill="none" stroke="${color}" stroke-width="${strokeWidth * 2}" stroke-linecap="round"/>`;
                    svg += `<path d="M${180 - offset},${20 + offset} Q${190 - offset},${100} ${180 - offset},${180 - offset}" fill="none" stroke="${color}" stroke-width="${strokeWidth * 2}" stroke-linecap="round"/>`;
                    svg += `<path d="M${180 - offset},${180 - offset} Q${100},${190 - offset} ${20 + offset},${180 - offset}" fill="none" stroke="${color}" stroke-width="${strokeWidth * 2}" stroke-linecap="round"/>`;
                    svg += `<path d="M${20 + offset},${180 - offset} Q${10 + offset},${100} ${20 + offset},${20 + offset}" fill="none" stroke="${color}" stroke-width="${strokeWidth * 2}" stroke-linecap="round"/>`;
                }
                break;
                
            case 'bouquet':
                const bouquetRibbons = Math.max(4, complexity + 3);
                for (let i = 0; i < bouquetRibbons; i++) {
                    const angle = (i / bouquetRibbons) * Math.PI * 2 - Math.PI / 2;
                    const color = PatternBase.getColor(palette, i % palette.length);
                    svg += `<line x1="${centerX}" y1="${centerY}" x2="${centerX + Math.cos(angle) * 70}" y2="${centerY + Math.sin(angle) * 70}" stroke="${color}" stroke-width="${strokeWidth * 2}" stroke-linecap="round"/>`;
                    const bowX = centerX + Math.cos(angle) * 30;
                    const bowY = centerY + Math.sin(angle) * 30;
                    svg += `<ellipse cx="${bowX}" cy="${bowY}" rx="10" ry="6" transform="rotate(${angle * 180 / Math.PI}, ${bowX}, ${bowY})" fill="none" stroke="${color}" stroke-width="${strokeWidth * 1.5}"/>`;
                }
                break;
                
            default:
                svg = this.generateRibbon('flowing', palette, strokeWidth, fillOpacity, complexity, symmetry);
        }
        
        return svg;
    },
    
    // ============ PETAL PATTERNS ============
    
    generatePetal(subType, palette, strokeWidth, fillOpacity, complexity, symmetry = 'none') {
        let svg = '';
        const centerX = 100;
        const centerY = 100;
        
        switch (subType) {
            case 'rosette':
                const rosettePetals = Math.max(6, Math.min(12, complexity * 2 + 6));
                for (let i = 0; i < rosettePetals; i++) {
                    const angle = (i / rosettePetals) * Math.PI * 2 - Math.PI / 2;
                    const color = PatternBase.getColor(palette, i % palette.length);
                    const petalLen = 25 + complexity * 4;
                    const tipX = centerX + Math.cos(angle) * petalLen;
                    const tipY = centerY + Math.sin(angle) * petalLen;
                    const ctrlX1 = centerX + Math.cos(angle - 0.4) * petalLen * 0.6;
                    const ctrlY1 = centerY + Math.sin(angle - 0.4) * petalLen * 0.6;
                    const ctrlX2 = centerX + Math.cos(angle + 0.4) * petalLen * 0.6;
                    const ctrlY2 = centerY + Math.sin(angle + 0.4) * petalLen * 0.6;
                    svg += `<path d="M${centerX},${centerY} Q${ctrlX1},${ctrlY1} ${tipX},${tipY} Q${ctrlX2},${ctrlY2} ${centerX},${centerY}" fill="${color}" fill-opacity="${fillOpacity / 100}" stroke="${PatternBase.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
                }
                svg += `<circle cx="${centerX}" cy="${centerY}" r="10" fill="${palette[0]}" stroke="${PatternBase.darkenColor(palette[0], 40)}" stroke-width="${strokeWidth * 2}"/>`;
                break;
                
            case 'overlapping':
                const overlapLayers = Math.max(2, Math.min(4, Math.floor(complexity / 2) + 2));
                for (let layer = overlapLayers - 1; layer >= 0; layer--) {
                    const layerRadius = 15 + layer * 22;
                    const petalsInLayer = Math.max(6, Math.min(12, complexity * 2 + 4));
                    for (let i = 0; i < petalsInLayer; i++) {
                        const angle = (i / petalsInLayer) * Math.PI * 2 - Math.PI / 2;
                        const color = PatternBase.getColor(palette, layer + i);
                        const petalSize = 18 + layer * 3;
                        const tipX = centerX + Math.cos(angle) * layerRadius;
                        const tipY = centerY + Math.sin(angle) * layerRadius;
                        const ctrlX1 = centerX + Math.cos(angle - 0.5) * petalSize;
                        const ctrlY1 = centerY + Math.sin(angle - 0.5) * petalSize;
                        const ctrlX2 = centerX + Math.cos(angle + 0.5) * petalSize;
                        const ctrlY2 = centerY + Math.sin(angle + 0.5) * petalSize;
                        svg += `<path d="M${centerX},${centerY} Q${ctrlX1},${ctrlY1} ${tipX},${tipY} Q${ctrlX2},${ctrlY2} ${centerX},${centerY}" fill="${color}" fill-opacity="${fillOpacity / 100 * 0.8}" stroke="${PatternBase.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
                    }
                }
                break;
                
            case 'fan':
                const fanPetals = Math.max(8, complexity * 3 + 6);
                for (let i = 0; i < fanPetals; i++) {
                    const t = i / fanPetals;
                    const angle = -Math.PI / 2 + t * Math.PI;
                    const color = PatternBase.getColor(palette, i % palette.length);
                    const petalLen = 30 + t * 45;
                    const width = 12 + t * 8;
                    const tipX = centerX + Math.cos(angle) * petalLen;
                    const tipY = centerY + Math.sin(angle) * petalLen;
                    const leftX = centerX + Math.cos(angle - 0.15) * width;
                    const leftY = centerY + Math.sin(angle - 0.15) * width;
                    const rightX = centerX + Math.cos(angle + 0.15) * width;
                    const rightY = centerY + Math.sin(angle + 0.15) * width;
                    svg += `<path d="M${leftX},${leftY} Q${centerX},${centerY + 5} ${tipX},${tipY} Q${centerX},${centerY + 5} ${rightX},${rightY} Z" fill="${color}" fill-opacity="${fillOpacity / 100}" stroke="${PatternBase.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
                }
                break;
                
            case 'layered':
                const layerCount = Math.max(3, Math.min(5, complexity + 1));
                for (let layer = layerCount; layer >= 1; layer--) {
                    const layerR = layer * 20;
                    const layerPetals = 6 + layer * 2;
                    for (let i = 0; i < layerPetals; i++) {
                        const angle = (i / layerPetals) * Math.PI * 2;
                        const color = PatternBase.getColor(palette, layer + i);
                        const x = centerX + Math.cos(angle) * layerR;
                        const y = centerY + Math.sin(angle) * layerR;
                        const size = 12 + layer * 3;
                        svg += `<ellipse cx="${x}" cy="${y}" rx="${size}" ry="${size * 0.5}" transform="rotate(${angle * 180 / Math.PI}, ${x}, ${y})" fill="${color}" fill-opacity="${fillOpacity / 100}" stroke="${PatternBase.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
                    }
                }
                svg += `<circle cx="${centerX}" cy="${centerY}" r="8" fill="${palette[0]}" stroke="${PatternBase.darkenColor(palette[0], 40)}" stroke-width="${strokeWidth * 2}"/>`;
                break;
                
            default:
                svg = this.generatePetal('rosette', palette, strokeWidth, fillOpacity, complexity, symmetry);
        }
        
        return svg;
    },
    
    // ============ LATTICE PATTERNS ============
    
    generateLattice(subType, palette, strokeWidth, fillOpacity, complexity, symmetry = 'none') {
        let svg = '';
        
        switch (subType) {
            case 'diamond-lattice':
                const diagCells = Math.max(3, Math.min(6, complexity + 2));
                const diagSpacing = 170 / diagCells;
                for (let i = 0; i <= diagCells; i++) {
                    const pos = 15 + i * diagSpacing;
                    const color = PatternBase.getColor(palette, i);
                    svg += `<line x1="${pos}" y1="15" x2="185" y2="${185 - (pos - 15)}" stroke="${color}" stroke-width="${strokeWidth}"/>`;
                    svg += `<line x1="15" y1="${pos}" x2="${185 - (pos - 15)}" y2="185" stroke="${color}" stroke-width="${strokeWidth}"/>`;
                }
                for (let i = 1; i < diagCells; i++) {
                    for (let j = 1; j < diagCells; j++) {
                        const x = 15 + i * diagSpacing;
                        const y = 15 + j * diagSpacing;
                        svg += `<circle cx="${x}" cy="${y}" r="2" fill="${palette[0]}"/>`;
                    }
                }
                break;
                
            case 'arc-lattice':
                const arcCells = Math.max(2, Math.min(4, Math.floor(complexity / 2) + 2));
                const arcSpacing = 170 / arcCells;
                for (let row = 0; row <= arcCells; row++) {
                    for (let col = 0; col <= arcCells; col++) {
                        const x = 15 + col * arcSpacing;
                        const y = 15 + row * arcSpacing;
                        const color = PatternBase.getColor(palette, row + col);
                        if (col < arcCells) {
                            svg += `<path d="M${x},${y} A${arcSpacing/2},${arcSpacing/2} 0 0,1 ${x + arcSpacing},${y}" fill="none" stroke="${color}" stroke-width="${strokeWidth}"/>`;
                        }
                        if (row < arcCells) {
                            svg += `<path d="M${x},${y} A${arcSpacing/2},${arcSpacing/2} 0 0,1 ${x},${y + arcSpacing}" fill="none" stroke="${color}" stroke-width="${strokeWidth}"/>`;
                        }
                    }
                }
                break;
                
            case 'star-lattice':
                const starCells = Math.max(2, Math.min(4, Math.floor(complexity / 2) + 2));
                const starSpacing = 170 / starCells;
                for (let row = 0; row < starCells; row++) {
                    for (let col = 0; col < starCells; col++) {
                        const cx = 15 + col * starSpacing + starSpacing / 2;
                        const cy = 15 + row * starSpacing + starSpacing / 2;
                        if (!PatternBase.isInSymmetryArea(cx, cy, symmetry)) continue;
                        const color = PatternBase.getColor(palette, row + col);
                        const size = starSpacing * 0.3;
                        svg += PatternBase.createStar(cx, cy, size, 4, color, fillOpacity, strokeWidth);
                    }
                }
                for (let i = 0; i <= starCells; i++) {
                    const pos = 15 + i * starSpacing;
                    svg += `<line x1="${pos}" y1="15" x2="${pos}" y2="185" stroke="${palette[0]}" stroke-width="${strokeWidth * 0.5}"/>`;
                    svg += `<line x1="15" y1="${pos}" x2="185" y2="${pos}" stroke="${palette[0]}" stroke-width="${strokeWidth * 0.5}"/>`;
                }
                break;
                
            case 'trellis':
                const trellisLines = Math.max(4, complexity + 3);
                const trellisSpacing = 170 / trellisLines;
                for (let i = 0; i <= trellisLines; i++) {
                    const pos = 15 + i * trellisSpacing;
                    const color = PatternBase.getColor(palette, i % palette.length);
                    svg += `<path d="M${pos},185 Q${pos - 20},100 ${pos},15" fill="none" stroke="${color}" stroke-width="${strokeWidth}"/>`;
                    svg += `<path d="M15,${pos} Q100,${pos - 20} 185,${pos}" fill="none" stroke="${color}" stroke-width="${strokeWidth}"/>`;
                }
                svg += `<circle cx="100" cy="100" r="8" fill="none" stroke="${palette[0]}" stroke-width="${strokeWidth * 2}"/>`;
                break;
                
            default:
                svg = this.generateLattice('diamond-lattice', palette, strokeWidth, fillOpacity, complexity, symmetry);
        }
        
        return svg;
    },
    
    // ============ HALO PATTERNS ============
    
    generateHalo(subType, palette, strokeWidth, fillOpacity, complexity, symmetry = 'none') {
        let svg = '';
        const centerX = 100;
        const centerY = 100;
        
        switch (subType) {
            case 'concentric':
                const concRings = Math.max(3, Math.min(7, complexity + 3));
                for (let ring = 1; ring <= concRings; ring++) {
                    const r = ring * 15 + 10;
                    const color = PatternBase.getColor(palette, ring - 1);
                    svg += `<circle cx="${centerX}" cy="${centerY}" r="${r}" fill="none" stroke="${color}" stroke-width="${strokeWidth * (1 + (concRings - ring) * 0.2)}"/>`;
                    if (ring < concRings) {
                        svg += `<circle cx="${centerX}" cy="${centerY}" r="${r - 3}" fill="none" stroke="${PatternBase.darkenColor(color, 30)}" stroke-width="${strokeWidth * 0.5}"/>`;
                    }
                }
                svg += `<circle cx="${centerX}" cy="${centerY}" r="5" fill="${palette[0]}"/>`;
                break;
                
            case 'scalloped':
                const scallopCount = Math.max(8, complexity * 3 + 6);
                for (let ring = 0; ring < 3; ring++) {
                    const baseR = 25 + ring * 22;
                    const color = PatternBase.getColor(palette, ring);
                    for (let i = 0; i < scallopCount; i++) {
                        const angle1 = (i / scallopCount) * Math.PI * 2;
                        const angle2 = ((i + 1) / scallopCount) * Math.PI * 2;
                        const midAngle = (angle1 + angle2) / 2;
                        const scallopR = baseR + 8;
                        const x1 = centerX + Math.cos(angle1) * baseR;
                        const y1 = centerY + Math.sin(angle1) * baseR;
                        const x2 = centerX + Math.cos(angle2) * baseR;
                        const y2 = centerY + Math.sin(angle2) * baseR;
                        svg += `<path d="M${x1},${y1} A${baseR},${baseR} 0 0,1 ${x2},${y2}" fill="none" stroke="${color}" stroke-width="${strokeWidth}"/>`;
                    }
                }
                svg += `<circle cx="${centerX}" cy="${centerY}" r="10" fill="none" stroke="${palette[0]}" stroke-width="${strokeWidth * 2}"/>`;
                break;
                
            case 'echo':
                const echoRings = Math.max(4, complexity + 3);
                for (let ring = 1; ring <= echoRings; ring++) {
                    const r = ring * 14 + 8;
                    const color = PatternBase.getColor(palette, ring - 1);
                    svg += `<circle cx="${centerX}" cy="${centerY}" r="${r}" fill="none" stroke="${color}" stroke-width="${strokeWidth}"/>`;
                    svg += `<circle cx="${centerX}" cy="${centerY}" r="${r + 3}" fill="none" stroke="${PatternBase.darkenColor(color, 30)}" stroke-width="${strokeWidth * 0.5}"/>`;
                }
                const echoSpokes = 12;
                for (let i = 0; i < echoSpokes; i++) {
                    const angle = (i / echoSpokes) * Math.PI * 2;
                    const color = PatternBase.getColor(palette, i);
                    const x1 = centerX + Math.cos(angle) * 15;
                    const y1 = centerY + Math.sin(angle) * 15;
                    const x2 = centerX + Math.cos(angle) * 75;
                    const y2 = centerY + Math.sin(angle) * 75;
                    svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${strokeWidth * 0.5}"/>`;
                }
                break;
                
            case 'medallion-halo':
                const medalRings = Math.max(3, Math.min(5, complexity + 2));
                for (let ring = 0; ring < medalRings; ring++) {
                    const ringRadius = 20 + ring * 18;
                    const color = PatternBase.getColor(palette, ring);
                    svg += `<circle cx="${centerX}" cy="${centerY}" r="${ringRadius}" fill="none" stroke="${color}" stroke-width="${strokeWidth * 1.5}"/>`;
                    const dots = 8 + ring * 4;
                    for (let i = 0; i < dots; i++) {
                        const angle = (i / dots) * Math.PI * 2;
                        const x = centerX + Math.cos(angle) * ringRadius;
                        const y = centerY + Math.sin(angle) * ringRadius;
                        svg += `<circle cx="${x}" cy="${y}" r="2" fill="${color}"/>`;
                    }
                }
                svg += `<circle cx="${centerX}" cy="${centerY}" r="12" fill="${palette[0]}" stroke="${PatternBase.darkenColor(palette[0], 40)}" stroke-width="${strokeWidth * 2}"/>`;
                svg += `<circle cx="${centerX}" cy="${centerY}" r="6" fill="${palette[1] || palette[0]}"/>`;
                break;
                
            default:
                svg = this.generateHalo('concentric', palette, strokeWidth, fillOpacity, complexity, symmetry);
        }
        
        return svg;
    }
};

// Export for use in other modules
window.AdvancedPatterns = AdvancedPatterns;
