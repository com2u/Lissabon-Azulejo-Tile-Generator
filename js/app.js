/**
 * App.js - Main Application Controller (Modular Version)
 * Orchestrates all components and handles user interactions.
 * 
 * ARCHITECTURE ROLE:
 * - Entry point for the application.
 * - Manages view switching between 'Generator' and 'Canvas'.
 * - Initializes UI modules (TileGeneratorUI, CanvasGeneratorUI).
 * 
 * DEPENDENCIES:
 * - js/ui/tileGenerator.js (TileGeneratorUI)
 * - js/ui/canvasGenerator.js (CanvasGeneratorUI)
 * - js/params.js (Params)
 * - js/storage.js (Storage)
 */

const App = {
    // Current view: 'generator' or 'canvas'
    currentView: 'generator',
    
    // Tile list for gallery (numbered 1-52)
    tileList: [
        '1.svg', '2.svg', '3.svg', '4.svg', '5.svg', '6.svg', '7.svg', '8.svg', '9.svg', '10.svg',
        '11.svg', '12.svg', '13.svg', '14.svg', '15.svg', '16.svg', '17.svg', '18.svg', '19.svg', '20.svg',
        '21.svg', '22.svg', '23.svg', '24.svg', '25.svg', '26.svg', '27.svg', '28.svg', '29.svg', '30.svg',
        '31.svg', '32.svg', '33.svg', '34.svg', '35.svg', '36.svg', '37.svg', '38.svg', '39.svg', '40.svg',
        '41.svg', '42.svg', '43.svg', '44.svg', '45.svg', '46.svg', '47.svg', '48.svg', '49.svg', '50.svg',
        '51.svg', '52.svg'
    ],
    
    galleryLoaded: false,

    // Initialize application
    init() {
        console.log('Initializing Lissabon - Azulejo Generator');
        
        // Initialize UI modules
        if (typeof TileGeneratorUI !== 'undefined') TileGeneratorUI.init();
        if (typeof CanvasGeneratorUI !== 'undefined') CanvasGeneratorUI.init();
        
        // Setup main event listeners
        this.bindEvents();
        
        // Initialize params and update DOM
        Params.updateDOM();
        
        // Generate initial tile
        if (typeof TileGenerator !== 'undefined') {
            TileGenerator.generate();
        }
        
        console.log('Application initialized');
    },
    
    // Bind main event listeners
    bindEvents() {
        // Keyboard shortcut help modal
        document.addEventListener('keydown', (e) => {
            // Show shortcuts help with ? key
            if (e.key === '?' || (e.shiftKey && e.key === '/')) {
                e.preventDefault();
                this.showShortcutsModal();
            }
        });
        
        const closeShortcutsModal = document.getElementById('closeShortcutsModal');
        if (closeShortcutsModal) {
            closeShortcutsModal.addEventListener('click', () => this.closeShortcutsModal());
        }
        
        const shortcutsModal = document.getElementById('shortcutsModal');
        if (shortcutsModal) {
            shortcutsModal.addEventListener('click', (e) => {
                if (e.target === shortcutsModal) {
                    this.closeShortcutsModal();
                }
            });
        }
        
        // View switching
        const canvasBtn = document.getElementById('canvasBtn');
        if (canvasBtn) {
            canvasBtn.addEventListener('click', () => this.showCanvasView());
        }
        
        const tileGeneratorBtn = document.getElementById('tileGeneratorBtn');
        if (tileGeneratorBtn) {
            tileGeneratorBtn.addEventListener('click', () => this.showGeneratorView());
        }
        
        // Save/Load buttons
        const saveConfigBtn = document.getElementById('saveConfigBtn');
        if (saveConfigBtn) {
            saveConfigBtn.addEventListener('click', () => this.saveConfig());
        }
        
        const loadConfigBtn = document.getElementById('loadConfigBtn');
        if (loadConfigBtn) {
            loadConfigBtn.addEventListener('click', () => Storage.showSavedConfigs());
        }
        
        // Modal close
        const closeModal = document.getElementById('closeModal');
        if (closeModal) {
            closeModal.addEventListener('click', () => Storage.closeModal());
        }
        
        // Click outside modal to close
        const modal = document.getElementById('savedConfigsModal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    Storage.closeModal();
                }
            });
        }
    },
    
    // Show Canvas View
    showCanvasView() {
        this.currentView = 'canvas';
        
        // Toggle panels
        document.querySelector('.control-panel').style.display = 'none';
        document.getElementById('canvasControlPanel').style.display = 'flex';
        
        // Toggle main areas
        document.getElementById('mainCanvasArea').style.display = 'none';
        document.getElementById('canvasView').style.display = 'flex';
        
        // Update header buttons visibility
        document.getElementById('canvasBtn').style.display = 'none';
        document.getElementById('tileGeneratorBtn').style.display = 'inline-flex';
        document.getElementById('generateBtn').style.display = 'none';
        document.getElementById('regenerateBtn').style.display = 'none';
        document.getElementById('canvasRegenerateBtn').style.display = 'inline-flex';
        document.getElementById('canvasExportSvgBtn').style.display = 'inline-flex';
        document.getElementById('canvasExportPngBtn').style.display = 'inline-flex';
        document.getElementById('exportSvgBtn').style.display = 'none';
        document.getElementById('exportPngBtn').style.display = 'none';
        document.getElementById('saveConfigBtn').style.display = 'none';
        document.getElementById('loadConfigBtn').style.display = 'none';
        
        // Load gallery if not loaded
        if (!this.galleryLoaded) {
            this.loadTileGallery();
        }
        
        // Update canvas controls visibility
        if (typeof CanvasGeneratorUI !== 'undefined') {
            CanvasGeneratorUI.updateControlVisibility();
        }

        this.showToast('Switched to Canvas View', 'info');
    },
    
    // Show Generator View
    showGeneratorView() {
        this.currentView = 'generator';
        
        // Toggle panels
        document.querySelector('.control-panel').style.display = 'flex';
        document.getElementById('canvasControlPanel').style.display = 'none';
        
        // Toggle main areas
        document.getElementById('mainCanvasArea').style.display = 'flex';
        document.getElementById('canvasView').style.display = 'none';
        
        // Update header buttons visibility
        document.getElementById('canvasBtn').style.display = 'inline-flex';
        document.getElementById('tileGeneratorBtn').style.display = 'none';
        document.getElementById('generateBtn').style.display = 'inline-flex';
        document.getElementById('regenerateBtn').style.display = 'inline-flex';
        document.getElementById('canvasRegenerateBtn').style.display = 'none';
        document.getElementById('canvasExportSvgBtn').style.display = 'none';
        document.getElementById('canvasExportPngBtn').style.display = 'none';
        document.getElementById('exportSvgBtn').style.display = 'inline-flex';
        document.getElementById('exportPngBtn').style.display = 'inline-flex';
        document.getElementById('saveConfigBtn').style.display = 'inline-flex';
        document.getElementById('loadConfigBtn').style.display = 'inline-flex';
        
        this.showToast('Switched to Generator View', 'info');
    },

    // Load Tile Gallery
    async loadTileGallery() {
        const grid = document.getElementById('tileGalleryGrid');
        if (!grid) return;
        
        grid.innerHTML = '<div class="loading">Loading tiles...</div>';
        
        for (const tileName of this.tileList) {
            try {
                const response = await fetch(`tiles/${tileName}`);
                if (!response.ok) continue;
                const svgText = await response.text();
                
                if (typeof CanvasGeneratorUI !== 'undefined') {
                    CanvasGeneratorUI.addTileToGallery(tileName, svgText);
                }
            } catch (error) {
                console.error(`Failed to load tile ${tileName}:`, error);
            }
        }
        
        const loading = grid.querySelector('.loading');
        if (loading) loading.remove();
        this.galleryLoaded = true;
    },
    
    // Save configuration
    saveConfig() {
        const name = prompt('Enter a name for this configuration:', `Config ${new Date().toLocaleString()}`);
        if (name) {
            Storage.saveConfig(name);
            this.showToast('Configuration saved', 'success');
        }
    },
    
    // Show toast notification
    showToast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        if (!container) return;
        
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        container.appendChild(toast);
        
        // Remove after delay
        setTimeout(() => {
            toast.style.animation = 'slideIn 0.3s ease-out reverse';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },
    
    // Get date string for filenames
    getDateString() {
        const now = new Date();
        return now.toISOString().slice(0, 10).replace(/-/g, '');
    },
    
    // Show shortcuts modal
    showShortcutsModal() {
        const modal = document.getElementById('shortcutsModal');
        if (modal) {
            modal.style.display = 'flex';
        }
    },
    
    // Close shortcuts modal
    closeShortcutsModal() {
        const modal = document.getElementById('shortcutsModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// Export for use in other modules
window.App = App;
