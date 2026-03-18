/**
 * Canvas Generator UI Module
 * Handles UI interactions for the canvas generator view.
 * 
 * ARCHITECTURE ROLE:
 * - Manages the tile gallery and selection logic.
 * - Controls canvas-specific settings (clustering, rotation, etc.).
 * - Orchestrates the CanvasGenerator engine.
 * 
 * DEPENDENCIES:
 * - js/canvas/generator.js (CanvasGenerator) - Core generation engine.
 * - js/storage.js (Storage) - Export and save functionality.
 * - js/app.js (App) - View switching and toast notifications.
 */

const CanvasGeneratorUI = {
    // Initialize canvas generator UI
    init() {
        this.bindCanvasControls();
        this.bindGenerateButton();
        this.bindRegenerateButton();
        this.bindExportButtons();
        this.bindTileGalleryEvents();
        this.bindAlgorithmSwitch();
    },
    
    // Bind algorithm switch
    bindAlgorithmSwitch() {
        const algoSelect = document.getElementById('canvasAlgorithm');
        if (algoSelect) {
            algoSelect.addEventListener('change', () => {
                this.updateControlVisibility();
            });
        }
        this.updateControlVisibility();
    },
    
    // Update control visibility based on selected algorithm
    updateControlVisibility() {
        const algoSelect = document.getElementById('canvasAlgorithm');
        if (!algoSelect) return;
        
        const isProcedural = algoSelect.value === 'procedural';
        const clusteredControls = [
            'clusterSize', 'clusterProb', 'overlap', 
            'allowRotation', 'allowFlip'
        ];
        
        clusteredControls.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                const group = el.closest('.control-group');
                if (group) group.style.display = isProcedural ? 'none' : 'block';
            }
        });
        
        const tileSelectionSection = document.querySelector('.selected-count')?.closest('.panel-section');
        if (tileSelectionSection) {
            tileSelectionSection.style.display = isProcedural ? 'none' : 'block';
        }
        
        const tileGallery = document.getElementById('tileGallery');
        const canvasView = document.getElementById('canvasView');
        if (tileGallery && canvasView && canvasView.style.display !== 'none') {
            tileGallery.style.display = isProcedural ? 'none' : 'block';
        }
    },
    
    // Bind canvas generation controls
    bindCanvasControls() {
        const sliders = [
            { id: 'clusterSize', valId: 'clusterSizeValue' },
            { id: 'clusterProb', valId: 'clusterProbValue' },
            { id: 'overlap', valId: 'overlapValue' },
            { id: 'canvasBorderWidth', valId: 'canvasBorderWidthValue' }
        ];
        
        sliders.forEach(s => {
            const el = document.getElementById(s.id);
            if (el) {
                el.addEventListener('input', (e) => {
                    const valEl = document.getElementById(s.valId);
                    if (valEl) valEl.textContent = e.target.value;
                });
            }
        });

        // Color sync
        ['canvasBorderColor', 'canvasTileBorderColor'].forEach(id => {
            const el = document.getElementById(id);
            const textEl = document.getElementById(id + 'Text');
            if (el && textEl) {
                el.addEventListener('input', (e) => {
                    textEl.value = e.target.value;
                });
                textEl.addEventListener('input', (e) => {
                    if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
                        el.value = e.target.value;
                    }
                });
            }
        });
    },
    
    // Bind generate canvas button
    bindGenerateButton() {
        const generateCanvasBtn = document.getElementById('generateCanvasBtn');
        if (generateCanvasBtn) {
            generateCanvasBtn.addEventListener('click', () => {
                this.generateCanvas();
            });
        }
    },

    // Bind regenerate button
    bindRegenerateButton() {
        const regenerateCanvasBtn = document.getElementById('regenerateCanvasBtn');
        if (regenerateCanvasBtn) {
            regenerateCanvasBtn.addEventListener('click', () => {
                this.generateCanvas(true);
            });
        }
        
        const canvasRegenerateBtn = document.getElementById('canvasRegenerateBtn');
        if (canvasRegenerateBtn) {
            canvasRegenerateBtn.addEventListener('click', () => {
                this.generateCanvas(true);
            });
        }
    },
    
    // Generate canvas
    generateCanvas(newSeed = false) {
        const algorithm = document.getElementById('canvasAlgorithm')?.value || 'clustered';
        const selectedTiles = this.getSelectedTiles();
        
        if (algorithm === 'clustered' && selectedTiles.length === 0) {
            if (typeof App !== 'undefined') App.showToast('Please select at least one tile from the gallery', 'warning');
            else alert('Please select at least one tile from the gallery.');
            return;
        }
        
        const width = parseInt(document.getElementById('canvasWidth')?.value || 16);
        const height = parseInt(document.getElementById('canvasHeight')?.value || 9);
        const clusterSize = parseInt(document.getElementById('clusterSize')?.value || 4);
        const clusterProb = (parseInt(document.getElementById('clusterProb')?.value || 60)) / 100;
        const allowRotation = document.getElementById('allowRotation')?.checked || false;
        const allowFlip = document.getElementById('allowFlip')?.checked || false;
        const overlapProb = (parseInt(document.getElementById('overlap')?.value || 0)) / 100;
        
        if (newSeed) {
            this.currentSeed = Date.now();
        } else if (!this.currentSeed) {
            this.currentSeed = Date.now();
        }
        
        const bgColor = document.getElementById('bgColor')?.value || '#ffffff';
        const enableCanvasBorder = document.getElementById('enableCanvasBorder')?.checked || false;
        const canvasBorderColor = document.getElementById('canvasBorderColor')?.value || '#1e3c72';
        const canvasBorderWidth = parseInt(document.getElementById('canvasBorderWidth')?.value || 10);
        const canvasTileBorderColor = document.getElementById('canvasTileBorderColor')?.value || '#ffffff';
        
        // Show preview container
        const previewContainer = document.getElementById('canvasPreviewContainer');
        const tileGallery = document.getElementById('tileGallery');
        const backToGalleryBtn = document.getElementById('backToGalleryBtn');
        
        if (previewContainer) previewContainer.style.display = 'block';
        
        // Only hide gallery if in clustered mode
        if (tileGallery) {
            tileGallery.style.display = (algorithm === 'clustered') ? 'none' : 'none'; // Actually always hide gallery when preview is shown
        }
        
        if (backToGalleryBtn) {
            backToGalleryBtn.style.display = (algorithm === 'clustered') ? 'block' : 'none';
        }
        
        const canvasPreview = document.getElementById('canvasPreview');
        if (canvasPreview) canvasPreview.innerHTML = '<div class="loading">Generating canvas...</div>';
        
        // Generate grid based on selected algorithm
        let grid;
        if (algorithm === 'procedural') {
            grid = CanvasGenerator.generateProcedural(width, height, this.currentSeed);
        } else if (algorithm === 'pattern') {
            grid = CanvasGenerator.generatePattern(
                selectedTiles, width, height, clusterSize, clusterProb,
                allowRotation, allowFlip, overlapProb, this.currentSeed
            );
        } else {
            grid = CanvasGenerator.generate(
                selectedTiles, width, height, clusterSize, clusterProb,
                allowRotation, allowFlip, overlapProb, this.currentSeed
            );
        }
        
        // Render to SVG
        const svgContent = CanvasGenerator.render(
            grid, width, height, bgColor, enableCanvasBorder,
            canvasBorderColor, canvasBorderWidth, canvasTileBorderColor,
            algorithm === 'pattern'
        );
        
        // Display the canvas
        if (canvasPreview) {
            canvasPreview.innerHTML = svgContent;
            this.currentCanvasSVG = svgContent;
        }

        if (typeof App !== 'undefined') App.showToast('Canvas generated', 'success');
    },
    
    // Get selected tiles from gallery
    getSelectedTiles() {
        const selected = [];
        const selectedElements = document.querySelectorAll('.gallery-tile.selected');
        
        selectedElements.forEach(el => {
            const svgContent = el.querySelector('svg')?.outerHTML;
            if (svgContent) {
                selected.push({ content: svgContent });
            }
        });
        
        return selected;
    },
    
    // Bind export buttons
    bindExportButtons() {
        const exportSvgBtn = document.getElementById('exportCanvasSvgBtn');
        if (exportSvgBtn) {
            exportSvgBtn.addEventListener('click', () => {
                if (!this.currentCanvasSVG) return;
                Storage.exportSVG(this.currentCanvasSVG, `Canvas_${App.getDateString()}_${this.currentSeed}.svg`);
            });
        }

        const exportPngBtn = document.getElementById('exportCanvasPngBtn');
        if (exportPngBtn) {
            exportPngBtn.addEventListener('click', () => {
                const svgElement = document.querySelector('#canvasPreview svg');
                if (svgElement) {
                    Storage.exportPNG(svgElement, `Canvas_${App.getDateString()}_${this.currentSeed}.png`);
                }
            });
        }

        // Header export buttons
        const headerSvgBtn = document.getElementById('canvasExportSvgBtn');
        if (headerSvgBtn) {
            headerSvgBtn.addEventListener('click', () => {
                if (!this.currentCanvasSVG) return;
                Storage.exportSVG(this.currentCanvasSVG, `Canvas_${App.getDateString()}_${this.currentSeed}.svg`);
            });
        }

        const headerPngBtn = document.getElementById('canvasExportPngBtn');
        if (headerPngBtn) {
            headerPngBtn.addEventListener('click', () => {
                const svgElement = document.querySelector('#canvasPreview svg');
                if (svgElement) {
                    Storage.exportPNG(svgElement, `Canvas_${App.getDateString()}_${this.currentSeed}.png`);
                }
            });
        }
    },

    // Bind tile gallery events
    bindTileGalleryEvents() {
        const backToGalleryBtn = document.getElementById('backToGalleryBtn');
        if (backToGalleryBtn) {
            backToGalleryBtn.addEventListener('click', () => {
                const previewContainer = document.getElementById('canvasPreviewContainer');
                const tileGallery = document.getElementById('tileGallery');
                if (previewContainer) previewContainer.style.display = 'none';
                if (tileGallery) tileGallery.style.display = 'block';
                backToGalleryBtn.style.display = 'none';
            });
        }

        const uploadTileBtn = document.getElementById('uploadTileBtn');
        const tileFileInput = document.getElementById('tileFileInput');
        if (uploadTileBtn && tileFileInput) {
            uploadTileBtn.addEventListener('click', () => tileFileInput.click());
            tileFileInput.addEventListener('change', (e) => this.handleTileUpload(e));
        }
    },

    // Handle tile upload
    async handleTileUpload(event) {
        const files = event.target.files;
        if (!files || files.length === 0) return;
        
        for (const file of files) {
            if (!file.name.endsWith('.svg')) continue;
            
            try {
                const content = await file.text();
                this.addTileToGallery(file.name, content);
            } catch (error) {
                console.error(`Error reading file ${file.name}:`, error);
            }
        }
        event.target.value = '';
    },

    // Add tile to gallery
    addTileToGallery(name, content) {
        const grid = document.getElementById('tileGalleryGrid');
        if (!grid) return;

        const tileItem = document.createElement('div');
        tileItem.className = 'gallery-tile';
        tileItem.innerHTML = `
            ${content}
            <div class="gallery-tile-check">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            </div>
        `;
        
        tileItem.addEventListener('click', () => {
            tileItem.classList.toggle('selected');
            const count = document.querySelectorAll('.gallery-tile.selected').length;
            const countEl = document.getElementById('selectedCount');
            if (countEl) countEl.textContent = count;
        });

        grid.appendChild(tileItem);
    }
};

// Export for use in other modules
window.CanvasGeneratorUI = CanvasGeneratorUI;
