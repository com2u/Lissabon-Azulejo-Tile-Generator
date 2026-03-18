/**
 * Tile Generator UI Module
 * Handles UI interactions for the tile generator view.
 * 
 * ARCHITECTURE ROLE:
 * - Manages the sidebar controls for single tile generation.
 * - Handles keyboard shortcuts and real-time preview updates.
 * - Synchronizes UI state with the Params module.
 * 
 * DEPENDENCIES:
 * - js/tileGenerator.js (TileGenerator) - Core generation engine.
 * - js/params.js (Params) - State management.
 * - js/presets.js (Presets) - Color palette management.
 * - js/storage.js (Storage) - Export and save functionality.
 */

const TileGeneratorUI = {
    // Initialize tile generator UI
    init() {
        this.bindPatternControls();
        this.bindColorControls();
        this.bindSymmetryControls();
        this.bindCenterpieceControls();
        this.bindCornerControls();
        this.bindBorderControls();
        this.bindGenerateButton();
        this.bindRegenerateButton();
        this.bindDownloadButtons();
        this.bindSeedControls();
        this.bindGridControls();
        this.bindKeyboardShortcuts();
    },
    
    // Bind pattern selection controls
    bindPatternControls() {
        const patternType = document.getElementById('patternType');
        const subPattern = document.getElementById('subPattern');
        
        if (patternType) {
            patternType.addEventListener('change', () => {
                Params.updateSubPatternOptions();
                if (typeof TileGenerator !== 'undefined') {
                    TileGenerator.generate();
                }
            });
        }
        
        if (subPattern) {
            subPattern.addEventListener('change', () => {
                if (typeof TileGenerator !== 'undefined') {
                    TileGenerator.generate();
                }
            });
        }

        // Style sliders
        ['strokeWidth', 'fillOpacity', 'complexity'].forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('input', (e) => {
                    const valEl = document.getElementById(id + 'Value');
                    if (valEl) valEl.textContent = e.target.value;
                    if (typeof TileGenerator !== 'undefined') {
                        TileGenerator.generate();
                    }
                });
            }
        });
    },
    
    // Bind color controls
    bindColorControls() {
        const bgColor = document.getElementById('bgColor');
        const bgColorText = document.getElementById('bgColorText');
        
        if (bgColor && bgColorText) {
            bgColor.addEventListener('input', (e) => {
                bgColorText.value = e.target.value;
                if (typeof TileGenerator !== 'undefined') TileGenerator.generate();
            });
            bgColorText.addEventListener('input', (e) => {
                if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
                    bgColor.value = e.target.value;
                    if (typeof TileGenerator !== 'undefined') TileGenerator.generate();
                }
            });
        }

        const palettePreset = document.getElementById('palettePreset');
        if (palettePreset) {
            palettePreset.addEventListener('change', (e) => {
                Presets.applyPalette(e.target.value);
                if (typeof TileGenerator !== 'undefined') TileGenerator.generate();
            });
        }

        const addColorBtn = document.getElementById('addColorBtn');
        if (addColorBtn) {
            addColorBtn.addEventListener('click', () => {
                Presets.addColor();
            });
        }
    },
    
    // Bind symmetry controls
    bindSymmetryControls() {
        const symmetryRadios = document.querySelectorAll('input[name="symmetry"]');
        symmetryRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                if (typeof TileGenerator !== 'undefined') {
                    TileGenerator.generate();
                }
            });
        });
    },
    
    // Bind centerpiece controls
    bindCenterpieceControls() {
        const enableCenter = document.getElementById('enableCenter');
        const centerType = document.getElementById('centerType');
        const centerSize = document.getElementById('centerSize');
        const centerStrokeWidth = document.getElementById('centerStrokeWidth');
        const centerOpacity = document.getElementById('centerOpacity');
        
        if (enableCenter) {
            enableCenter.addEventListener('change', (e) => {
                const show = e.target.checked ? 'block' : 'none';
                ['centerTypeGroup', 'centerSizeGroup', 'centerStrokeGroup', 'centerOpacityGroup'].forEach(id => {
                    const el = document.getElementById(id);
                    if (el) el.style.display = show;
                });
                if (typeof TileGenerator !== 'undefined') TileGenerator.generate();
            });
        }
        
        [centerType, centerSize, centerStrokeWidth, centerOpacity].forEach(el => {
            if (el) {
                const eventType = el.tagName === 'SELECT' ? 'change' : 'input';
                el.addEventListener(eventType, (e) => {
                    const valEl = document.getElementById(el.id + 'Value');
                    if (valEl) valEl.textContent = e.target.value;
                    if (typeof TileGenerator !== 'undefined') {
                        TileGenerator.generate();
                    }
                });
            }
        });
    },
    
    // Bind corner controls
    bindCornerControls() {
        const enableCorners = document.getElementById('enableCorners');
        const cornerStyle = document.getElementById('cornerStyle');
        const cornerStrokeWidth = document.getElementById('cornerStrokeWidth');
        const cornerOpacity = document.getElementById('cornerOpacity');
        
        if (enableCorners) {
            enableCorners.addEventListener('change', (e) => {
                const group = document.getElementById('cornerStyleGroup');
                if (group) group.classList.toggle('disabled', !e.target.checked);
                if (typeof TileGenerator !== 'undefined') TileGenerator.generate();
            });
        }
        
        [cornerStyle, cornerStrokeWidth, cornerOpacity].forEach(el => {
            if (el) {
                const eventType = el.tagName === 'SELECT' ? 'change' : 'input';
                el.addEventListener(eventType, (e) => {
                    const valEl = document.getElementById(el.id + 'Value');
                    if (valEl) valEl.textContent = e.target.value;
                    if (typeof TileGenerator !== 'undefined') {
                        TileGenerator.generate();
                    }
                });
            }
        });
    },
    
    // Bind border controls
    bindBorderControls() {
        const enableBorder = document.getElementById('enableBorder');
        const borderStyle = document.getElementById('borderStyle');
        const borderWidth = document.getElementById('borderWidth');
        const borderColor = document.getElementById('borderColor');
        const borderOpacity = document.getElementById('borderOpacity');
        
        if (enableBorder) {
            enableBorder.addEventListener('change', (e) => {
                const group = document.getElementById('borderStyleGroup');
                if (group) group.classList.toggle('disabled', !e.target.checked);
                if (typeof TileGenerator !== 'undefined') TileGenerator.generate();
            });
        }
        
        [borderStyle, borderWidth, borderColor, borderOpacity].forEach(el => {
            if (el) {
                const eventType = el.tagName === 'SELECT' ? 'change' : 'input';
                el.addEventListener(eventType, (e) => {
                    const valEl = document.getElementById(el.id + 'Value');
                    if (valEl) valEl.textContent = e.target.value;
                    if (typeof TileGenerator !== 'undefined') {
                        TileGenerator.generate();
                    }
                });
            }
        });
    },
    
    // Bind generate button
    bindGenerateButton() {
        const generateBtn = document.getElementById('generateBtn');
        if (generateBtn) {
            generateBtn.addEventListener('click', () => {
                if (typeof TileGenerator !== 'undefined') {
                    TileGenerator.generate();
                }
            });
        }
    },

    // Bind regenerate button
    bindRegenerateButton() {
        const regenerateBtn = document.getElementById('regenerateBtn');
        if (regenerateBtn) {
            regenerateBtn.addEventListener('click', () => {
                if (typeof TileGenerator !== 'undefined') {
                    TileGenerator.generate();
                }
            });
        }
    },
    
    // Bind download buttons
    bindDownloadButtons() {
        const exportSvgBtn = document.getElementById('exportSvgBtn');
        if (exportSvgBtn) {
            exportSvgBtn.addEventListener('click', () => {
                const svgElement = document.querySelector('#tilePreview svg');
                if (svgElement) {
                    const svgData = new XMLSerializer().serializeToString(svgElement);
                    Storage.exportSVG(svgData, `Tile_${App.getDateString()}_${Params.data.seed}.svg`);
                }
            });
        }

        const exportPngBtn = document.getElementById('exportPngBtn');
        if (exportPngBtn) {
            exportPngBtn.addEventListener('click', () => {
                const svgElement = document.querySelector('#tilePreview svg');
                if (svgElement) {
                    Storage.exportPNG(svgElement, `Tile_${App.getDateString()}_${Params.data.seed}.png`);
                }
            });
        }
    },

    // Bind seed controls
    bindSeedControls() {
        const seedInput = document.getElementById('seedInput');
        const randomSeedBtn = document.getElementById('randomSeedBtn');

        if (seedInput) {
            seedInput.addEventListener('change', () => {
                if (typeof TileGenerator !== 'undefined') TileGenerator.generate();
            });
        }

        if (randomSeedBtn) {
            randomSeedBtn.addEventListener('click', () => {
                const newSeed = Math.floor(Math.random() * 999999);
                if (seedInput) seedInput.value = newSeed;
                if (typeof TileGenerator !== 'undefined') TileGenerator.generate();
            });
        }
    },

    // Bind grid controls
    bindGridControls() {
        const showGrid = document.getElementById('showGrid');
        const gridSize = document.getElementById('gridSize');

        if (showGrid) {
            showGrid.addEventListener('change', (e) => {
                const group = document.getElementById('gridSizeGroup');
                if (group) group.style.display = e.target.checked ? 'block' : 'none';
                if (typeof TileGenerator !== 'undefined') TileGenerator.generate();
            });
        }

        if (gridSize) {
            gridSize.addEventListener('change', () => {
                if (typeof TileGenerator !== 'undefined') TileGenerator.generate();
            });
        }
    },

    // Bind keyboard shortcuts
    bindKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            const isInput = e.target.matches('input, textarea, select');
            if (isInput && e.key !== 'Enter' && e.key !== '+' && e.key !== '-' && e.key !== 'b' && e.key !== 'B') return;
            
            if (e.key === 'Enter') {
                if (App.currentView === 'canvas') {
                    if (typeof CanvasGeneratorUI !== 'undefined') CanvasGeneratorUI.generateCanvas();
                } else {
                    if (typeof TileGenerator !== 'undefined') TileGenerator.generate();
                }
            }
            
            if (e.key === 'r' || e.key === 'R') {
                if (App.currentView === 'canvas') {
                    if (typeof CanvasGeneratorUI !== 'undefined') CanvasGeneratorUI.generateCanvas(true);
                } else {
                    if (typeof TileGenerator !== 'undefined') TileGenerator.generate();
                }
            }
            
            // Space for random seed (when not in input)
            if (e.key === ' ' && !isInput) {
                e.preventDefault();
                const newSeed = Math.floor(Math.random() * 999999);
                const seedInput = document.getElementById('seedInput');
                if (seedInput) seedInput.value = newSeed;
                if (typeof TileGenerator !== 'undefined') TileGenerator.generate();
                if (typeof App !== 'undefined') App.showToast(`New seed: ${newSeed}`);
            }
            
            if (App.currentView !== 'canvas') {
                if (e.key === 'p' || e.key === 'P') {
                    e.preventDefault();
                    this.stepToNext('patternType');
                } else if (e.key === 's' || e.key === 'S') {
                    e.preventDefault();
                    this.stepToNext('subPattern');
                } else if (e.key === 'c' || e.key === 'C') {
                    e.preventDefault();
                    this.stepToNextPalette();
                } else if (e.key === 'x' || e.key === 'X') {
                    e.preventDefault();
                    this.stepToNext('cornerStyle');
                } else if (e.key === 'y' || e.key === 'Y') {
                    e.preventDefault();
                    this.stepToNextSymmetry();
                } else if (e.key === 'z' || e.key === 'Z') {
                    e.preventDefault();
                    this.stepToNext('centerType');
                } else if (e.key === '+' || e.key === '=') {
                    e.preventDefault();
                    this.adjustValue('strokeWidth', 0.5);
                } else if (e.key === '-' || e.key === '_') {
                    e.preventDefault();
                    this.adjustValue('strokeWidth', -0.5);
                } else if (e.key === 'b' || e.key === 'B') {
                    e.preventDefault();
                    this.stepToNext('borderStyle');
                } else if (e.key === 'g' || e.key === 'G') {
                    e.preventDefault();
                    this.toggleGridPreview();
                }
            }
        });
    },

    // Helper to step to next option in a select
    stepToNext(id) {
        const el = document.getElementById(id);
        if (el) {
            const nextIndex = (el.selectedIndex + 1) % el.options.length;
            el.selectedIndex = nextIndex;
            el.dispatchEvent(new Event('change', { bubbles: true }));
            if (typeof App !== 'undefined') App.showToast(`${el.previousElementSibling?.textContent || id}: ${el.options[nextIndex].text}`);
        }
    },

    // Step to next palette
    stepToNextPalette() {
        const palettes = Presets.getPaletteNames();
        const current = document.getElementById('palettePreset')?.value || palettes[0];
        const nextIndex = (palettes.indexOf(current) + 1) % palettes.length;
        const next = palettes[nextIndex];
        
        const el = document.getElementById('palettePreset');
        if (el) {
            el.value = next;
            el.dispatchEvent(new Event('change', { bubbles: true }));
        }
    },

    // Step to next symmetry
    stepToNextSymmetry() {
        const radios = Array.from(document.querySelectorAll('input[name="symmetry"]'));
        const current = radios.find(r => r.checked);
        const nextIndex = (radios.indexOf(current) + 1) % radios.length;
        radios[nextIndex].checked = true;
        radios[nextIndex].dispatchEvent(new Event('change', { bubbles: true }));
        if (typeof App !== 'undefined') App.showToast(`Symmetry: ${radios[nextIndex].value}`);
    },

    // Adjust numeric value
    adjustValue(id, delta) {
        const el = document.getElementById(id);
        if (el) {
            let val = parseFloat(el.value) + delta;
            val = Math.max(parseFloat(el.min), Math.min(parseFloat(el.max), val));
            el.value = val;
            el.dispatchEvent(new Event('input', { bubbles: true }));
        }
    },
    
    // Toggle grid preview
    toggleGridPreview() {
        const showGrid = document.getElementById('showGrid');
        const gridSizeGroup = document.getElementById('gridSizeGroup');
        if (showGrid) {
            showGrid.checked = !showGrid.checked;
            showGrid.dispatchEvent(new Event('change', { bubbles: true }));
            if (typeof App !== 'undefined') {
                App.showToast(`Grid preview: ${showGrid.checked ? 'On' : 'Off'}`);
            }
        }
    }
};

// Export for use in other modules
window.TileGeneratorUI = TileGeneratorUI;
