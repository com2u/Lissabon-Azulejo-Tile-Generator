/**
 * Params.js - Parameter Management
 * Handles all configuration parameters for tile generation.
 * 
 * ARCHITECTURE ROLE:
 * - Centralized state management (Source of Truth).
 * - Synchronizes DOM elements with internal state.
 * - Provides JSON serialization for saving/loading.
 * 
 * DEPENDENCIES:
 * - None (Core state module).
 * 
 * DATA FLOW:
 * - UI modules call updateFromDOM() to sync user input.
 * - Generation engines call get() to retrieve current parameters.
 * - Storage module calls toJSON() and fromJSON() for persistence.
 */

const Params = {
    // Current parameters
    data: {
        // Generator
        patternType: 'geometric',
        subPattern: 'grid',
        
        // Seed
        seed: 12345,
        
        // Colors
        bgColor: '#ffffff',
        palette: ['#1e3c72', '#2a5298', '#d4af37'],
        
        // Style
        strokeWidth: 2,
        fillOpacity: 80,
        complexity: 5,
        
        // Symmetry
        symmetry: 'none',
        
        // Borders
        enableBorder: true,
        borderStyle: 'simple',
        borderColor: '#1e3c72',
        borderWidth: 8,
        borderOpacity: 100,
        
        // Corners
        enableCorners: true,
        cornerStyle: 'simple',
        cornerStrokeWidth: 2,
        cornerOpacity: 100,
        
        // Centerpiece
        enableCenter: false,
        centerType: 'circle',
        centerSize: 50,
        centerStrokeWidth: 2,
        centerOpacity: 100,
        
        // Preview
        showGrid: false,
        gridSize: 3,
        
        // Canvas
        overlap: 0,
        enableCanvasBorder: false,
        canvasBorderColor: '#1e3c72',
        canvasTileBorderColor: '#ffffff',
        canvasBorderWidth: 10
    },
    
    // Get current parameters
    get() {
        return { ...this.data };
    },
    
    // Set parameters (merge with existing)
    set(newParams) {
        Object.assign(this.data, newParams);
    },
    
    // Reset to defaults
    reset() {
        this.data = {
            patternType: 'geometric',
            subPattern: 'grid',
            seed: Math.floor(Math.random() * 100000),
            bgColor: '#ffffff',
            palette: ['#1e3c72', '#2a5298', '#d4af37'],
            strokeWidth: 2,
            fillOpacity: 80,
            complexity: 5,
            symmetry: 'none',
            enableBorder: true,
            borderStyle: 'simple',
            borderColor: '#1e3c72',
            borderWidth: 8,
            borderOpacity: 100,
            enableCorners: true,
            cornerStyle: 'simple',
            cornerStrokeWidth: 2,
            cornerOpacity: 100,
            enableCenter: false,
            centerType: 'circle',
            centerSize: 50,
            centerStrokeWidth: 2,
            centerOpacity: 100,
            showGrid: false,
            gridSize: 3,
            overlap: 0,
            enableCanvasBorder: false,
            canvasBorderColor: '#1e3c72',
            canvasTileBorderColor: '#ffffff',
            canvasBorderWidth: 10
        };
    },
    
    // Generate random seed
    randomSeed() {
        this.data.seed = Math.floor(Math.random() * 999999);
        return this.data.seed;
    },
    
    // Get parameter as JSON string
    toJSON() {
        return JSON.stringify(this.data, null, 2);
    },
    
    // Load from JSON string
    fromJSON(jsonString) {
        try {
            const parsed = JSON.parse(jsonString);
            this.set(parsed);
            return true;
        } catch (e) {
            console.error('Failed to parse params JSON:', e);
            return false;
        }
    },
    
    // Update from DOM elements
    updateFromDOM() {
        // Generator
        this.data.patternType = document.getElementById('patternType')?.value || this.data.patternType;
        this.data.subPattern = document.getElementById('subPattern')?.value || this.data.subPattern;
        
        // Seed
        const seedInput = document.getElementById('seedInput');
        if (seedInput) {
            this.data.seed = parseInt(seedInput.value) || 0;
        }
        
        // Colors
        const bgColor = document.getElementById('bgColor');
        if (bgColor) {
            this.data.bgColor = bgColor.value;
        }
        
        // Get palette colors
        const paletteColors = document.querySelectorAll('.palette-color');
        if (paletteColors.length > 0) {
            this.data.palette = Array.from(paletteColors).map(input => input.value);
        }
        
        // Style
        const strokeWidth = document.getElementById('strokeWidth');
        if (strokeWidth) {
            this.data.strokeWidth = parseFloat(strokeWidth.value);
        }
        
        const fillOpacity = document.getElementById('fillOpacity');
        if (fillOpacity) {
            this.data.fillOpacity = parseInt(fillOpacity.value);
        }
        
        const complexity = document.getElementById('complexity');
        if (complexity) {
            this.data.complexity = parseInt(complexity.value);
        }
        
        // Symmetry
        const symmetryRadio = document.querySelector('input[name="symmetry"]:checked');
        if (symmetryRadio) {
            this.data.symmetry = symmetryRadio.value;
        }
        
        // Borders
        const enableBorder = document.getElementById('enableBorder');
        if (enableBorder) {
            this.data.enableBorder = enableBorder.checked;
        }
        
        const borderStyle = document.getElementById('borderStyle');
        if (borderStyle) {
            this.data.borderStyle = borderStyle.value;
        }
        
        const borderColor = document.getElementById('borderColor');
        if (borderColor) {
            this.data.borderColor = borderColor.value;
        }
        
        const borderWidth = document.getElementById('borderWidth');
        if (borderWidth) {
            this.data.borderWidth = parseInt(borderWidth.value);
        }
        
        const borderOpacity = document.getElementById('borderOpacity');
        if (borderOpacity) {
            this.data.borderOpacity = parseInt(borderOpacity.value);
        }
        
        // Corners
        const enableCorners = document.getElementById('enableCorners');
        if (enableCorners) {
            this.data.enableCorners = enableCorners.checked;
        }
        
        const cornerStyle = document.getElementById('cornerStyle');
        if (cornerStyle) {
            this.data.cornerStyle = cornerStyle.value;
        }
        
        const cornerStrokeWidth = document.getElementById('cornerStrokeWidth');
        if (cornerStrokeWidth) {
            this.data.cornerStrokeWidth = parseFloat(cornerStrokeWidth.value);
        }
        
        const cornerOpacity = document.getElementById('cornerOpacity');
        if (cornerOpacity) {
            this.data.cornerOpacity = parseInt(cornerOpacity.value);
        }
        
        // Centerpiece
        const enableCenter = document.getElementById('enableCenter');
        if (enableCenter) {
            this.data.enableCenter = enableCenter.checked;
        }
        
        const centerType = document.getElementById('centerType');
        if (centerType) {
            this.data.centerType = centerType.value;
        }
        
        const centerSize = document.getElementById('centerSize');
        if (centerSize) {
            this.data.centerSize = parseInt(centerSize.value);
        }
        
        const centerStrokeWidth = document.getElementById('centerStrokeWidth');
        if (centerStrokeWidth) {
            this.data.centerStrokeWidth = parseFloat(centerStrokeWidth.value);
        }
        
        const centerOpacity = document.getElementById('centerOpacity');
        if (centerOpacity) {
            this.data.centerOpacity = parseInt(centerOpacity.value);
        }
        
        // Preview
        const showGrid = document.getElementById('showGrid');
        if (showGrid) {
            this.data.showGrid = showGrid.checked;
        }
        
        const gridSize = document.getElementById('gridSize');
        if (gridSize) {
            this.data.gridSize = parseInt(gridSize.value);
        }

        const overlap = document.getElementById('overlap');
        if (overlap) {
            this.data.overlap = parseInt(overlap.value);
        }

        const enableCanvasBorder = document.getElementById('enableCanvasBorder');
        if (enableCanvasBorder) {
            this.data.enableCanvasBorder = enableCanvasBorder.checked;
        }

        const canvasBorderColor = document.getElementById('canvasBorderColor');
        if (canvasBorderColor) {
            this.data.canvasBorderColor = canvasBorderColor.value;
        }

        const canvasTileBorderColor = document.getElementById('canvasTileBorderColor');
        if (canvasTileBorderColor) {
            this.data.canvasTileBorderColor = canvasTileBorderColor.value;
        }

        const canvasBorderWidth = document.getElementById('canvasBorderWidth');
        if (canvasBorderWidth) {
            this.data.canvasBorderWidth = parseInt(canvasBorderWidth.value);
        }
        
        // Update sub-pattern options based on pattern type
        this.updateSubPatternOptions();
    },
    
    // Update DOM elements from params
    updateDOM() {
        // Generator
        const patternType = document.getElementById('patternType');
        if (patternType) {
            patternType.value = this.data.patternType;
            this.updateSubPatternOptions();
        }
        
        const subPattern = document.getElementById('subPattern');
        if (subPattern) {
            subPattern.value = this.data.subPattern;
        }
        
        // Seed
        const seedInput = document.getElementById('seedInput');
        if (seedInput) {
            seedInput.value = this.data.seed;
        }
        
        // Colors
        const bgColor = document.getElementById('bgColor');
        const bgColorText = document.getElementById('bgColorText');
        if (bgColor) bgColor.value = this.data.bgColor;
        if (bgColorText) bgColorText.value = this.data.bgColor;
        
        // Update palette colors
        const paletteContainer = document.getElementById('paletteColors');
        if (paletteContainer) {
            paletteContainer.innerHTML = '';
            this.data.palette.forEach((color, index) => {
                const row = document.createElement('div');
                row.className = 'palette-color-row';
                row.innerHTML = `
                    <input type="color" class="color-input palette-color" value="${color}">
                    <button class="btn-eyedropper palette-eyedropper" title="Pick color from screen">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
                        </svg>
                    </button>
                    ${this.data.palette.length > 1 ? '<button class="btn-icon remove-color" title="Remove color">×</button>' : ''}
                `;
                paletteContainer.appendChild(row);
            });
            this.bindPaletteEvents();
        }
        
        // Style
        const strokeWidth = document.getElementById('strokeWidth');
        const strokeWidthValue = document.getElementById('strokeWidthValue');
        if (strokeWidth) strokeWidth.value = this.data.strokeWidth;
        if (strokeWidthValue) strokeWidthValue.textContent = this.data.strokeWidth;
        
        const fillOpacity = document.getElementById('fillOpacity');
        const fillOpacityValue = document.getElementById('fillOpacityValue');
        if (fillOpacity) fillOpacity.value = this.data.fillOpacity;
        if (fillOpacityValue) fillOpacityValue.textContent = this.data.fillOpacity;
        
        const complexity = document.getElementById('complexity');
        const complexityValue = document.getElementById('complexityValue');
        if (complexity) complexity.value = this.data.complexity;
        if (complexityValue) complexityValue.textContent = this.data.complexity;
        
        // Symmetry
        const symmetryRadios = document.querySelectorAll('input[name="symmetry"]');
        symmetryRadios.forEach(radio => {
            radio.checked = radio.value === this.data.symmetry;
        });
        
        // Borders
        const enableBorder = document.getElementById('enableBorder');
        if (enableBorder) enableBorder.checked = this.data.enableBorder;
        
        const borderStyle = document.getElementById('borderStyle');
        if (borderStyle) borderStyle.value = this.data.borderStyle;
        
        const borderColor = document.getElementById('borderColor');
        const borderColorText = document.getElementById('borderColorText');
        if (borderColor) borderColor.value = this.data.borderColor;
        if (borderColorText) borderColorText.value = this.data.borderColor;
        
        const borderWidth = document.getElementById('borderWidth');
        const borderWidthValue = document.getElementById('borderWidthValue');
        if (borderWidth) borderWidth.value = this.data.borderWidth;
        if (borderWidthValue) borderWidthValue.textContent = this.data.borderWidth;
        
        const borderOpacity = document.getElementById('borderOpacity');
        const borderOpacityValue = document.getElementById('borderOpacityValue');
        if (borderOpacity) borderOpacity.value = this.data.borderOpacity;
        if (borderOpacityValue) borderOpacityValue.textContent = this.data.borderOpacity;
        
        // Corners
        const enableCorners = document.getElementById('enableCorners');
        if (enableCorners) enableCorners.checked = this.data.enableCorners;
        
        const cornerStyle = document.getElementById('cornerStyle');
        if (cornerStyle) cornerStyle.value = this.data.cornerStyle;
        
        const cornerStrokeWidth = document.getElementById('cornerStrokeWidth');
        const cornerStrokeWidthValue = document.getElementById('cornerStrokeWidthValue');
        if (cornerStrokeWidth) cornerStrokeWidth.value = this.data.cornerStrokeWidth;
        if (cornerStrokeWidthValue) cornerStrokeWidthValue.textContent = this.data.cornerStrokeWidth;
        
        const cornerOpacity = document.getElementById('cornerOpacity');
        const cornerOpacityValue = document.getElementById('cornerOpacityValue');
        if (cornerOpacity) cornerOpacity.value = this.data.cornerOpacity;
        if (cornerOpacityValue) cornerOpacityValue.textContent = this.data.cornerOpacity;
        
        // Centerpiece
        const enableCenter = document.getElementById('enableCenter');
        if (enableCenter) enableCenter.checked = this.data.enableCenter;
        
        const centerType = document.getElementById('centerType');
        if (centerType) centerType.value = this.data.centerType;
        
        const centerSize = document.getElementById('centerSize');
        const centerSizeValue = document.getElementById('centerSizeValue');
        if (centerSize) centerSize.value = this.data.centerSize;
        if (centerSizeValue) centerSizeValue.textContent = this.data.centerSize;
        
        const centerStrokeWidth = document.getElementById('centerStrokeWidth');
        const centerStrokeWidthValue = document.getElementById('centerStrokeWidthValue');
        if (centerStrokeWidth) centerStrokeWidth.value = this.data.centerStrokeWidth;
        if (centerStrokeWidthValue) centerStrokeWidthValue.textContent = this.data.centerStrokeWidth;
        
        const centerOpacity = document.getElementById('centerOpacity');
        const centerOpacityValue = document.getElementById('centerOpacityValue');
        if (centerOpacity) centerOpacity.value = this.data.centerOpacity;
        if (centerOpacityValue) centerOpacityValue.textContent = this.data.centerOpacity;
        
        // Preview
        const showGrid = document.getElementById('showGrid');
        if (showGrid) showGrid.checked = this.data.showGrid;
        
        const gridSize = document.getElementById('gridSize');
        if (gridSize) gridSize.value = this.data.gridSize;

        const overlap = document.getElementById('overlap');
        const overlapValue = document.getElementById('overlapValue');
        if (overlap) overlap.value = this.data.overlap;
        if (overlapValue) overlapValue.textContent = this.data.overlap;

        const enableCanvasBorder = document.getElementById('enableCanvasBorder');
        if (enableCanvasBorder) enableCanvasBorder.checked = this.data.enableCanvasBorder;

        const canvasBorderColor = document.getElementById('canvasBorderColor');
        const canvasBorderColorText = document.getElementById('canvasBorderColorText');
        if (canvasBorderColor) canvasBorderColor.value = this.data.canvasBorderColor;
        if (canvasBorderColorText) canvasBorderColorText.value = this.data.canvasBorderColor;

        const canvasTileBorderColor = document.getElementById('canvasTileBorderColor');
        const canvasTileBorderColorText = document.getElementById('canvasTileBorderColorText');
        if (canvasTileBorderColor) canvasTileBorderColor.value = this.data.canvasTileBorderColor;
        if (canvasTileBorderColorText) canvasTileBorderColorText.value = this.data.canvasTileBorderColor;

        const canvasBorderWidth = document.getElementById('canvasBorderWidth');
        const canvasBorderWidthValue = document.getElementById('canvasBorderWidthValue');
        if (canvasBorderWidth) canvasBorderWidth.value = this.data.canvasBorderWidth;
        if (canvasBorderWidthValue) canvasBorderWidthValue.textContent = this.data.canvasBorderWidth;
    },
    
    // Update sub-pattern dropdown based on pattern type
    updateSubPatternOptions() {
        const patternType = document.getElementById('patternType');
        const subPattern = document.getElementById('subPattern');
        
        if (!patternType || !subPattern) return;
        
        const options = {
            geometric: [
                { value: 'grid', label: 'Grid' },
                { value: 'diamond', label: 'Diamond' },
                { value: 'hex', label: 'Hexagonal' },
                { value: 'triangle', label: 'Triangle' },
                { value: 'wave', label: 'Wave' }
            ],
            floral: [
                { value: 'rosette', label: 'Rosette' },
                { value: 'vine', label: 'Vine' },
                { value: 'branch', label: 'Branch' },
                { value: 'paisley', label: 'Paisley' }
            ],
            ornamental: [
                { value: 'corda', label: 'Rope Pattern' },
                { value: 'enxaixo', label: 'Crossed Lines' },
                { value: 'arabesque', label: 'Arabesque' },
                { value: 'estrelas', label: 'Stars' }
            ],
            striped: [
                { value: 'horizontal', label: 'Horizontal' },
                { value: 'vertical', label: 'Vertical' },
                { value: 'diagonal', label: 'Diagonal' },
                { value: 'chevron', label: 'Chevron' },
                { value: 'wave', label: 'Wavy' }
            ],
            checker: [
                { value: 'classic', label: 'Classic' },
                { value: 'compound', label: 'Compound' },
                { value: 'harlequin', label: 'Harlequin' },
                { value: 'frame', label: 'Frame' }
            ],
            radial: [
                { value: 'mandala', label: 'Mandala' },
                { value: 'sunburst', label: 'Sunburst' },
                { value: 'target', label: 'Target' },
                { value: 'spiral', label: 'Spiral' }
            ],
            celtic: [
                { value: 'knot', label: 'Knot' },
                { value: 'braid', label: 'Braid' },
                { value: 'chain', label: 'Chain' },
                { value: 'spiral', label: 'Spiral' }
            ],
            moroccan: [
                { value: 'zellij', label: 'Zellij' },
                { value: 'gidra', label: 'Gidra' },
                { value: 'muqarnas', label: 'Muqarnas' },
                { value: 'lattice', label: 'Lattice' }
            ],
            baroque: [
                { value: 'royal', label: 'Royal' },
                { value: 'floral-baroque', label: 'Floral Baroque' },
                { value: 'scroll', label: 'Scroll' },
                { value: 'architectural', label: 'Architectural' }
            ],
            // NEW ADVANCED GENERATOR FAMILIES
            kaleidoscope: [
                { value: 'geometric', label: 'Geometric Kaleidoscope' },
                { value: 'floral', label: 'Floral Kaleidoscope' },
                { value: 'line', label: 'Line-Based Kaleidoscope' },
                { value: 'mosaic', label: 'Mosaic Kaleidoscope' },
                { value: 'medallion', label: 'Ceremonial Medallion' },
                { value: 'starburst', label: 'Starburst Kaleidoscope' },
                { value: 'handmade', label: 'Soft Handmade' }
            ],
            guilloché: [
                { value: 'circular', label: 'Circular Guilloché' },
                { value: 'medallion', label: 'Medallion Guilloché' },
                { value: 'border', label: 'Border Guilloché' },
                { value: 'oval', label: 'Oval Guilloché' },
                { value: 'radial', label: 'Radial Guilloché' },
                { value: 'spirograph', label: 'Spirograph Pattern' },
                { value: 'ribbon', label: 'Ribbon Guilloché' },
                { value: 'engraved', label: 'Engraved Style' }
            ],
            lace: [
                { value: 'delicate', label: 'Delicate Lace' },
                { value: 'filigree', label: 'Filigree' },
                { value: 'web', label: 'Lace Web' },
                { value: 'floral-lace', label: 'Floral Lace' },
                { value: 'geometric-lace', label: 'Geometric Lace' }
            ],
            interlace: [
                { value: 'braid', label: 'Braided Weave' },
                { value: 'celtic-knot', label: 'Celtic Knot' },
                { value: 'chain', label: 'Chain Link' },
                { value: 'basket', label: 'Basket Weave' },
                { value: 'diagonal-weave', label: 'Diagonal Weave' }
            ],
            tessellation: [
                { value: 'diamonds', label: 'Diamond Field' },
                { value: 'stars', label: 'Star Field' },
                { value: 'hex-grid', label: 'Hexagonal Grid' },
                { value: 'triangles', label: 'Triangle Mesh' },
                { value: 'octagons', label: 'Octagon Pattern' }
            ],
            chisel: [
                { value: 'lines', label: 'Chiseled Lines' },
                { value: 'hatching', label: 'Hatching Engraving' },
                { value: 'crosshatch', label: 'Crosshatch' },
                { value: 'carving', label: 'Carved Effect' }
            ],
            ribbon: [
                { value: 'flowing', label: 'Flowing Ribbon' },
                { value: 'twist', label: 'Twisting Ribbon' },
                { value: 'frame', label: 'Ribbon Frame' },
                { value: 'bouquet', label: 'Ribbon Bouquet' }
            ],
            petal: [
                { value: 'rosette', label: 'Petal Rosette' },
                { value: 'overlapping', label: 'Overlapping Petals' },
                { value: 'fan', label: 'Fan Pattern' },
                { value: 'layered', label: 'Layered Petals' }
            ],
            lattice: [
                { value: 'diamond-lattice', label: 'Diamond Lattice' },
                { value: 'arc-lattice', label: 'Arc Lattice' },
                { value: 'star-lattice', label: 'Star Lattice' },
                { value: 'trellis', label: 'Garden Trellis' }
            ],
            halo: [
                { value: 'concentric', label: 'Concentric Rings' },
                { value: 'scalloped', label: 'Scalloped Halo' },
                { value: 'echo', label: 'Echo Lines' },
                { value: 'medallion-halo', label: 'Medallion Halo' }
            ]
        };
        
        const currentValue = subPattern.value;
        const type = patternType.value;
        const opts = options[type] || options.geometric;
        
        subPattern.innerHTML = opts.map(opt => 
            `<option value="${opt.value}" ${opt.value === currentValue ? 'selected' : ''}>${opt.label}</option>`
        ).join('');
        
        // Update data
        this.data.subPattern = subPattern.value;
    },
    
    // Bind palette color events
    bindPaletteEvents() {
        const paletteContainer = document.getElementById('paletteColors');
        if (!paletteContainer) return;
        
        // Color input changes
        paletteContainer.querySelectorAll('.palette-color').forEach(input => {
            input.addEventListener('input', (e) => {
                const textInput = e.target.closest('.palette-color-row').querySelector('.color-text');
                if (textInput) {
                    textInput.value = e.target.value;
                }
            });
        });
        
        // Remove color buttons
        paletteContainer.querySelectorAll('.remove-color').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const row = e.target.closest('.palette-color-row');
                const paletteContainer = row.parentElement;
                if (paletteContainer.children.length > 1) {
                    row.remove();
                }
            });
        });

        // Eye dropper for palette colors
        paletteContainer.querySelectorAll('.palette-eyedropper').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const row = e.target.closest('.palette-color-row');
                const colorInput = row.querySelector('.palette-color');
                
                if (window.App && window.App.activateEyeDropper) {
                    window.App.activateEyeDropper((color) => {
                        colorInput.value = color;
                        // Trigger input event to update params
                        colorInput.dispatchEvent(new Event('input', { bubbles: true }));
                    }, btn);
                }
            });
        });
    }
};

// Export for use in other modules
window.Params = Params;
