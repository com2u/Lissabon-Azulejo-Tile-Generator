/**
 * Pattern Base Module
 * Core RNG, color helpers, and utility functions for pattern generation
 */

const PatternBase = {
    // Tile dimensions
    TILE_SIZE: 200,
    SAFE_AREA: 10,
    PATTERN_AREA: 15,
    
    // Current PRNG
    rng: null,
    
    // Initialize with seed
    init(seed) {
        const seedStr = (seed !== undefined && seed !== null) ? seed.toString() : Date.now().toString();
        
        if (typeof Math.seedrandom === 'function') {
            Math.seedrandom(seedStr);
            this.rng = null; // Use patched Math.random()
        } else if (typeof window.seedrandom === 'function') {
            this.rng = new window.seedrandom(seedStr);
        } else {
            let s = parseInt(seedStr) || Date.now();
            this.rng = {
                random: () => {
                    s = (s * 9301 + 49297) % 233280;
                    return s / 233280;
                }
            };
        }
    },
    
    // Random number helper
    random() {
        return this.rng ? this.rng.random() : Math.random();
    },
    
    // Random integer in range
    randInt(min, max) {
        return Math.floor(this.random() * (max - min + 1)) + min;
    },
    
    // Random item from array
    randItem(arr) {
        return arr[Math.floor(this.random() * arr.length)];
    },
    
    // Get color from palette
    getColor(palette, index = null) {
        if (index !== null) {
            return palette[index % palette.length];
        }
        return this.randItem(palette);
    },
    
    // Darken color
    darkenColor(hex, amount) {
        const num = parseInt(hex.replace('#', ''), 16);
        const r = Math.max(0, (num >> 16) - amount);
        const g = Math.max(0, ((num >> 8) & 0x00FF) - amount);
        const b = Math.max(0, (num & 0x0000FF) - amount);
        
        return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
    },
    
    // Check if point is in the symmetry-limited generation area
    isInSymmetryArea(x, y, symmetry) {
        if (!symmetry || symmetry === 'none') return true;
        
        const cx = 100;
        const cy = 100;
        
        switch (symmetry) {
            case 'horizontal':
                return x <= cx;
            case 'vertical':
                return y <= cy;
            case 'both':
            case 'rotational':
                return x <= cx && y <= cy;
            case 'radial':
                const dx = x - cx;
                const dy = y - cy;
                return dx >= 0 && dy >= 0 && dy <= dx;
            case 'diagonal-falling':
                const dx1 = x - cx;
                const dy1 = y - cy;
                return dy1 <= dx1;
            case 'diagonal-rising':
                const dx2 = x - cx;
                const dy2 = y - cy;
                return dy2 >= -dx2;
            case 'diagonal-both':
                const dx3 = x - cx;
                const dy3 = y - cy;
                return dy3 <= dx3 && dy3 >= -dx3;
            default:
                return true;
        }
    },
    
    // Create hexagon
    createHexagon(cx, cy, size, color, fillOpacity, strokeWidth) {
        let points = '';
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
            const x = cx + Math.cos(angle) * size;
            const y = cy + Math.sin(angle) * size;
            points += `${x},${y} `;
        }
        
        return `<polygon points="${points}" fill="${color}" fill-opacity="${fillOpacity / 100}" stroke="${this.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
    },
    
    // Create star
    createStar(cx, cy, size, points, color, fillOpacity, strokeWidth) {
        let d = '';
        const outerR = size;
        const innerR = size * 0.4;
        
        for (let i = 0; i < points * 2; i++) {
            const angle = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2;
            const r = i % 2 === 0 ? outerR : innerR;
            const x = cx + Math.cos(angle) * r;
            const y = cy + Math.sin(angle) * r;
            d += i === 0 ? `M${x},${y} ` : `L${x},${y} `;
        }
        d += 'Z';
        
        return `<path d="${d}" fill="${color}" fill-opacity="${fillOpacity / 100}" stroke="${this.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
    },
    
    // Create petal
    createPetal(cx, cy, size, angle, color, fillOpacity, strokeWidth) {
        const tipX = cx + Math.cos(angle) * size;
        const tipY = cy + Math.sin(angle) * size;
        const ctrlX1 = cx + Math.cos(angle - 0.5) * size * 0.7;
        const ctrlY1 = cy + Math.sin(angle - 0.5) * size * 0.7;
        const ctrlX2 = cx + Math.cos(angle + 0.5) * size * 0.7;
        const ctrlY2 = cy + Math.sin(angle + 0.5) * size * 0.7;
        
        return `<path d="M${cx},${cy} Q${ctrlX1},${ctrlY1} ${tipX},${tipY} Q${ctrlX2},${ctrlY2} ${cx},${cy}" fill="${color}" fill-opacity="${fillOpacity / 100}" stroke="${this.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
    },
    
    // Create leaf
    createLeaf(x, y, angle, color, strokeWidth) {
        const size = 10 + this.random() * 10;
        
        return `<ellipse cx="${x}" cy="${y}" rx="${size}" ry="${size * 0.4}" transform="rotate(${angle * 180 / Math.PI}, ${x}, ${y})" fill="${color}" stroke="${this.darkenColor(color, 30)}" stroke-width="${strokeWidth}"/>`;
    },
    
    // Create paisley
    createPaisley(x, y, size, angle, color, fillOpacity, strokeWidth) {
        let d = '';
        for (let i = 0; i <= 20; i++) {
            const t = i / 20;
            const r = size * (1 - t) * (1 + Math.sin(t * Math.PI * 2) * 0.3);
            const currAngle = angle + t * Math.PI * 1.5;
            const px = x + Math.cos(currAngle) * r;
            const py = y + Math.sin(currAngle) * r;
            d += i === 0 ? `M${px},${py} ` : `L${px},${py} `;
        }
        
        return `<path d="${d}" fill="none" stroke="${color}" stroke-width="${strokeWidth * 2}" stroke-linecap="round"/>`;
    },
    
    // Create branch (recursive)
    createBranch(x, y, length, angle, palette, strokeWidth, depth) {
        if (depth > 4 || length < 10) return '';
        
        let svg = '';
        const endX = x + Math.cos(angle) * length;
        const endY = y + Math.sin(angle) * length;
        const color = this.getColor(palette, depth);
        
        svg += `<line x1="${x}" y1="${y}" x2="${endX}" y2="${endY}" stroke="${color}" stroke-width="${strokeWidth * (4 - depth)}" stroke-linecap="round"/>`;
        
        if (depth < 4) {
            const branchCount = this.randInt(1, 2);
            for (let i = 0; i < branchCount; i++) {
                const branchAngle = angle + (this.random() - 0.5) * Math.PI * 0.6;
                svg += this.createBranch(endX, endY, length * 0.7, branchAngle, palette, strokeWidth, depth + 1);
            }
        }
        
        svg += this.createLeaf(endX, endY, angle, palette[(depth + 1) % palette.length], strokeWidth);
        
        return svg;
    },
    
    // Create mini star for corners
    createMiniStar(cx, cy, size, color, strokeWidth, opacity = 1) {
        const points = 4;
        const outerR = size;
        const innerR = size * 0.4;
        let d = '';
        
        for (let i = 0; i < points * 2; i++) {
            const angle = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2;
            const r = i % 2 === 0 ? outerR : innerR;
            const x = cx + Math.cos(angle) * r;
            const y = cy + Math.sin(angle) * r;
            d += i === 0 ? `M${x},${y} ` : `L${x},${y} `;
        }
        d += 'Z';
        
        return `<path d="${d}" fill="${color}" fill-opacity="${0.6 * opacity}" stroke="${color}" stroke-width="${strokeWidth}" stroke-opacity="${opacity}"/>`;
    }
};

// Export for use in other modules
window.PatternBase = PatternBase;
