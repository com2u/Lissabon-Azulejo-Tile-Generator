/**
 * Presets.js - Color Palettes and Presets
 * Contains predefined color palettes inspired by Portuguese azulejos
 */

const Presets = {
    // Traditional Portuguese Azulejo color palettes
    palettes: {
        traditional: {
            name: 'Traditional Portuguese',
            colors: ['#1e3c72', '#2a5298', '#ffffff', '#228b22', '#d4af37']
        },
        azul: {
            name: 'Blue Variations',
            colors: ['#1e3c72', '#2a5298', '#3b82f6', '#60a5fa', '#93c5fd']
        },
        earth: {
            name: 'Earth Tones',
            colors: ['#8b4513', '#d2691e', '#deb887', '#cd853f', '#f5deb3']
        },
        vibrant: {
            name: 'Vibrant',
            colors: ['#dc143c', '#ffd700', '#228b22', '#1e3c72', '#4a0080']
        },
        monochrome: {
            name: 'Monochrome',
            colors: ['#1a1a1a', '#4d4d4d', '#808080', '#b3b3b3', '#e6e6e6']
        },
        gold: {
            name: 'Gold Accent',
            colors: ['#1e3c72', '#d4af37', '#ffd700', '#b8860b', '#fff8dc']
        },
        terracotta: {
            name: 'Terracotta',
            colors: ['#cd853f', '#bc8f8f', '#8b4513', '#d2691e', '#f5deb3']
        },
        greenyellow: {
            name: 'Green & Yellow',
            colors: ['#228b22', '#2e8b57', '#9acd32', '#ffd700', '#f0e68c']
        },
        rainbow: {
            name: 'Rainbow',
            colors: ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3']
        },
        pop: {
            name: 'Pop Art',
            colors: ['#ff006e', '#fb5607', '#ffbe0b', '#8338ec', '#3a86ff']
        },
        pastel: {
            name: 'Pastel',
            colors: ['#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff', '#a0c4ff', '#bdb2ff', '#ffc6ff']
        },
        retro: {
            name: 'Retro',
            colors: ['#e76f51', '#f4a261', '#e9c46a', '#264653', '#2a9d8f']
        },
        indian: {
            name: 'Indian',
            colors: ['#ff9933', '#ffffff', '#138808', '#000080', '#ffd700', '#800080']
        },
        neon: {
            name: 'Neon',
            colors: ['#ff00ff', '#00ffff', '#ff0080', '#00ff00', '#ffff00', '#ff0000']
        },
        summer: {
            name: 'Summer',
            colors: ['#ff6b6b', '#ffa726', '#ffcc02', '#66bb6a', '#42a5f5', '#26c6da']
        },
        winter: {
            name: 'Winter',
            colors: ['#e3f2fd', '#bbdefb', '#90caf9', '#64b5f6', '#42a5f5', '#2196f3']
        },
        // New palettes for advanced generators
        royalBlue: {
            name: 'Royal Blue',
            colors: ['#002366', '#1c3a6e', '#2e5a9c', '#4a7ac9', '#6b9ff5', '#ffffff']
        },
        cobalt: {
            name: 'Cobalt & Gold',
            colors: ['#0047AB', '#1E90FF', '#FFD700', '#DAA520', '#B8860B', '#FFF8DC']
        },
        antique: {
            name: 'Antique Engraving',
            colors: ['#2C3E50', '#34495E', '#5D6D7E', '#85929E', '#AEB6BF', '#D5DBDB']
        },
        luxury: {
            name: 'Luxury Medallion',
            colors: ['#8B0000', '#CD5C5C', '#DAA520', '#FFD700', '#2F4F4F', '#F5F5DC']
        },
        celestial: {
            name: 'Celestial',
            colors: ['#191970', '#000080', '#4169E1', '#6495ED', '#87CEEB', '#F0F8FF']
        }
    },
    
    // Get palette by name
    getPalette(name) {
        return this.palettes[name] || this.palettes.traditional;
    },
    
    // Get all palette names
    getPaletteNames() {
        return Object.keys(this.palettes);
    },
    
    // Apply palette to UI
    applyPalette(paletteName) {
        const palette = this.getPalette(paletteName);
        const container = document.getElementById('paletteColors');
        if (!container || !palette) return;
        
        container.innerHTML = '';
        palette.colors.forEach((color, index) => {
            const row = document.createElement('div');
            row.className = 'palette-color-row';
            row.innerHTML = `
                <input type="color" class="color-input palette-color" value="${color}">
                ${palette.colors.length > 1 ? '<button class="btn-icon remove-color" title="Remove color">×</button>' : ''}
            `;
            container.appendChild(row);
        });
        
        // Rebind events
        this.bindPaletteEvents();
        
        // Update params
        Params.data.palette = [...palette.colors];
    },
    
    // Bind palette events
    bindPaletteEvents() {
        const paletteContainer = document.getElementById('paletteColors');
        if (!paletteContainer) return;
        
        // Color input changes
        paletteContainer.querySelectorAll('.palette-color').forEach(input => {
            input.addEventListener('input', (e) => {
                // Update params palette
                const colors = [];
                paletteContainer.querySelectorAll('.palette-color').forEach(c => {
                    colors.push(c.value);
                });
                Params.data.palette = colors;
            });
        });
        
        // Remove color buttons
        paletteContainer.querySelectorAll('.remove-color').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const row = e.target.closest('.palette-color-row');
                const paletteContainer = row.parentElement;
                if (paletteContainer.children.length > 1) {
                    row.remove();
                    // Update params palette
                    const colors = [];
                    paletteContainer.querySelectorAll('.palette-color').forEach(c => {
                        colors.push(c.value);
                    });
                    Params.data.palette = colors;
                }
            });
        });
    },
    
    // Add color to palette
    addColor() {
        const container = document.getElementById('paletteColors');
        if (!container) return;
        
        // Get a default new color
        const newColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
        
        const row = document.createElement('div');
        row.className = 'palette-color-row';
        row.innerHTML = `
            <input type="color" class="color-input palette-color" value="${newColor}">
            <button class="btn-icon remove-color" title="Remove color">×</button>
        `;
        container.appendChild(row);
        
        // Update params
        const colors = [];
        container.querySelectorAll('.palette-color').forEach(c => {
            colors.push(c.value);
        });
        Params.data.palette = colors;
        
        // Rebind events
        this.bindPaletteEvents();
    }
};

// Export for use in other modules
window.Presets = Presets;
