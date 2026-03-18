/**
 * Storage.js - Local Storage Management
 * Handles saving, loading, and exporting tile configurations.
 * 
 * ARCHITECTURE ROLE:
 * - Persistence layer using localStorage.
 * - Export utility for SVG and PNG files.
 * - Import/Export of JSON configuration files.
 * 
 * DEPENDENCIES:
 * - js/params.js (Params) - State management.
 * - js/app.js (App) - Toast notifications.
 */

const Storage = {
    STORAGE_KEY: 'lissabon_configs',
    
    // Save current configuration
    saveConfig(name) {
        const params = Params.get();
        const configs = this.getConfigs();
        
        const config = {
            id: Date.now(),
            name: name || `Config ${configs.length + 1}`,
            params: params,
            created: new Date().toISOString(),
            updated: new Date().toISOString()
        };
        
        configs.push(config);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(configs));
        
        return config;
    },
    
    // Get all saved configurations
    getConfigs() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error('Failed to load configs:', e);
            return [];
        }
    },
    
    // Load configuration by ID
    loadConfig(id) {
        const configs = this.getConfigs();
        const config = configs.find(c => c.id === id);
        
        if (config) {
            Params.set(config.params);
            Params.updateDOM();
            return true;
        }
        
        return false;
    },
    
    // Delete configuration by ID
    deleteConfig(id) {
        const configs = this.getConfigs();
        const filtered = configs.filter(c => c.id !== id);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
        return filtered.length < configs.length;
    },
    
    // Export configuration to file
    exportConfig() {
        const params = Params.get();
        const json = JSON.stringify(params, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `lissabon_config_${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        return true;
    },
    
    // Import configuration from file
    importConfig(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                try {
                    const params = JSON.parse(e.target.result);
                    Params.set(params);
                    Params.updateDOM();
                    resolve(true);
                } catch (err) {
                    reject(new Error('Invalid configuration file'));
                }
            };
            
            reader.onerror = () => {
                reject(new Error('Failed to read file'));
            };
            
            reader.readAsText(file);
        });
    },
    
    // Export tile as SVG file
    exportSVG(svgContent, filename) {
        const blob = new Blob([svgContent], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename || `Tile_${Date.now()}.svg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        return true;
    },
    
    // Export tile as PNG file
    exportPNG(svgElement, filename) {
        return new Promise((resolve, reject) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const size = 800; // High resolution export
            
            canvas.width = size;
            canvas.height = size;
            
            // Create image from SVG
            const svgData = new XMLSerializer().serializeToString(svgElement);
            const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
            const url = URL.createObjectURL(svgBlob);
            
            const img = new Image();
            img.onload = () => {
                // Fill background
                const params = Params.get();
                ctx.fillStyle = params.bgColor;
                ctx.fillRect(0, 0, size, size);
                
                // Draw SVG
                ctx.drawImage(img, 0, 0, size, size);
                URL.revokeObjectURL(url);
                
                // Download
                canvas.toBlob((blob) => {
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = filename || `Tile_${Date.now()}.png`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                    
                    resolve(true);
                }, 'image/png');
            };
            
            img.onerror = () => {
                URL.revokeObjectURL(url);
                reject(new Error('Failed to generate image'));
            };
            
            img.src = url;
        });
    },
    
    // Show saved configs modal
    showSavedConfigs() {
        const modal = document.getElementById('savedConfigsModal');
        const list = document.getElementById('savedConfigsList');
        
        if (!modal || !list) return;
        
        const configs = this.getConfigs();
        
        if (configs.length === 0) {
            list.innerHTML = '<div class="empty-state">No saved configurations yet</div>';
        } else {
            list.innerHTML = configs.map(config => `
                <div class="saved-config-item" data-id="${config.id}">
                    <div class="saved-config-info">
                        <div class="saved-config-name">${config.name}</div>
                        <div class="saved-config-date">${new Date(config.created).toLocaleDateString()}</div>
                    </div>
                    <div class="saved-config-actions">
                        <button class="btn btn-small btn-outline load-config" data-id="${config.id}">Load</button>
                        <button class="btn btn-small btn-outline delete-config" data-id="${config.id}">Delete</button>
                    </div>
                </div>
            `).join('');
            
            // Bind events
            list.querySelectorAll('.load-config').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const id = parseInt(e.target.dataset.id);
                    if (this.loadConfig(id)) {
                        App.showToast('Configuration loaded', 'success');
                        this.closeModal();
                    }
                });
            });
            
            list.querySelectorAll('.delete-config').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const id = parseInt(e.target.dataset.id);
                    if (this.deleteConfig(id)) {
                        App.showToast('Configuration deleted', 'success');
                        this.showSavedConfigs(); // Refresh list
                    }
                });
            });
        }
        
        modal.style.display = 'flex';
    },
    
    // Close modal
    closeModal() {
        const modal = document.getElementById('savedConfigsModal');
        if (modal) {
            modal.style.display = 'none';
        }
    },
    
    // Save tile to tiles folder (requires server-side, we'll use download instead)
    saveTileToFolder(svgContent, filename) {
        // This would require server-side support
        // For now, we'll use the download approach
        return this.exportSVG(svgContent, filename);
    }
};

// Export for use in other modules
window.Storage = Storage;
