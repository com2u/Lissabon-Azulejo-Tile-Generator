/**
 * Borders Module
 * Generates border decorations for tiles
 */

const Borders = {
    // Generate border
    generate(style, color, width, opacity = 100) {
        let svg = '';
        const opacityVal = opacity / 100;
        
        if (style === 'none') return '';
        
        switch (style) {
            case 'simple':
                svg += `<rect x="5" y="5" width="190" height="190" fill="none" stroke="${color}" stroke-width="${width}" stroke-opacity="${opacityVal}"/>`;
                break;
                
            case 'double':
                svg += `<rect x="5" y="5" width="190" height="190" fill="none" stroke="${color}" stroke-width="${width}" stroke-opacity="${opacityVal}"/>`;
                svg += `<rect x="${5 + width + 3}" y="${5 + width + 3}" width="${190 - (width + 3) * 2}" height="${190 - (width + 3) * 2}" fill="none" stroke="${color}" stroke-width="${width * 0.6}" stroke-opacity="${opacityVal}"/>`;
                break;
                
            case 'ornate':
                svg += `<rect x="5" y="5" width="190" height="190" fill="none" stroke="${color}" stroke-width="${width}" stroke-opacity="${opacityVal}"/>`;
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
                svg += `<rect x="5" y="5" width="190" height="190" fill="none" stroke="${color}" stroke-width="${width}" stroke-opacity="${opacityVal}" stroke-dasharray="${width},${width}"/>`;
                break;

            case 'zigzag':
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
                
            default:
                svg += `<rect x="5" y="5" width="190" height="190" fill="none" stroke="${color}" stroke-width="${width}" stroke-opacity="${opacityVal}"/>`;
        }
        
        return svg;
    }
};

// Export for use in other modules
window.Borders = Borders;
