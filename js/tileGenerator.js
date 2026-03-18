/**
 * Tile Generator Module
 * Orchestrates modular pattern components to generate complete tiles.
 * 
 * ARCHITECTURE ROLE:
 * - Core engine for single tile generation.
 * - Combines patterns, borders, corners, and centerpieces into a single SVG.
 * - Handles real-time preview updates and grid rendering.
 * 
 * DEPENDENCIES:
 * - js/params.js (Params) - Source of truth for generation parameters.
 * - js/patterns/base.js (PatternBase) - Shared utilities and RNG.
 * - js/patterns/symmetry.js (Symmetry) - Symmetry transformations.
 * - js/centerpiece.js (Centerpiece) - Center decoration generation.
 * - js/corners.js (Corners) - Corner decoration generation.
 * - js/borders.js (Borders) - Border generation.
 * - js/patterns/*.js (GeometricPatterns, FloralPatterns, etc.) - Specific pattern logic.
 */

const TileGenerator = {
    // Generate the complete tile SVG
    generate(params = null) {
        // If no params provided, get from Params module
        if (!params) {
            Params.updateFromDOM();
            params = Params.get();
        }

        // Initialize RNG with seed
        PatternBase.init(params.seed);
        
        const {
            patternType,
            subPattern,
            bgColor,
            palette,
            strokeWidth,
            fillOpacity,
            complexity,
            symmetry,
            enableBorder,
            borderStyle,
            borderColor,
            borderWidth,
            borderOpacity,
            enableCorners,
            cornerStyle,
            cornerStrokeWidth,
            cornerOpacity,
            enableCenter,
            centerType,
            centerSize,
            centerStrokeWidth,
            centerOpacity
        } = params;
        
        // Create SVG
        let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">`;
        
        // Background
        svg += `<rect width="200" height="200" fill="${bgColor}"/>`;
        
        // Pattern group
        svg += `<g class="pattern">`;
        
        // Generate base pattern
        let patternSvg = '';
        switch (patternType) {
            case 'geometric':
                patternSvg = GeometricPatterns.generate(subPattern, palette, strokeWidth, fillOpacity, complexity, symmetry);
                break;
            case 'floral':
                patternSvg = FloralPatterns.generate(subPattern, palette, strokeWidth, fillOpacity, complexity);
                break;
            case 'ornamental':
                patternSvg = OrnamentalPatterns.generate(subPattern, palette, strokeWidth, fillOpacity, complexity);
                break;
            case 'striped':
                patternSvg = StripedPatterns.generate(subPattern, palette, strokeWidth, fillOpacity, complexity);
                break;
            case 'checker':
                patternSvg = CheckerPatterns.generate(subPattern, palette, strokeWidth, fillOpacity, complexity);
                break;
            case 'radial':
                patternSvg = RadialPatterns.generate(subPattern, palette, strokeWidth, fillOpacity, complexity, symmetry);
                break;
            case 'celtic':
                patternSvg = AdvancedPatterns.generateCeltic(subPattern, palette, strokeWidth, fillOpacity, complexity);
                break;
            case 'moroccan':
                patternSvg = AdvancedPatterns.generateMoroccan(subPattern, palette, strokeWidth, fillOpacity, complexity);
                break;
            case 'baroque':
                patternSvg = AdvancedPatterns.generateBaroque(subPattern, palette, strokeWidth, fillOpacity, complexity);
                break;
            case 'kaleidoscope':
                patternSvg = AdvancedPatterns.generateKaleidoscope(subPattern, palette, strokeWidth, fillOpacity, complexity, symmetry);
                break;
            case 'guilloché':
                patternSvg = AdvancedPatterns.generateGuilloche(subPattern, palette, strokeWidth, fillOpacity, complexity, symmetry);
                break;
            case 'lace':
                patternSvg = AdvancedPatterns.generateLace(subPattern, palette, strokeWidth, fillOpacity, complexity, symmetry);
                break;
            case 'interlace':
                patternSvg = AdvancedPatterns.generateInterlace(subPattern, palette, strokeWidth, fillOpacity, complexity, symmetry);
                break;
            case 'tessellation':
                patternSvg = AdvancedPatterns.generateTessellation(subPattern, palette, strokeWidth, fillOpacity, complexity, symmetry);
                break;
            case 'chisel':
                patternSvg = AdvancedPatterns.generateChisel(subPattern, palette, strokeWidth, fillOpacity, complexity, symmetry);
                break;
            case 'ribbon':
                patternSvg = AdvancedPatterns.generateRibbon(subPattern, palette, strokeWidth, fillOpacity, complexity, symmetry);
                break;
            case 'petal':
                patternSvg = AdvancedPatterns.generatePetal(subPattern, palette, strokeWidth, fillOpacity, complexity, symmetry);
                break;
            case 'lattice':
                patternSvg = AdvancedPatterns.generateLattice(subPattern, palette, strokeWidth, fillOpacity, complexity, symmetry);
                break;
            case 'halo':
                patternSvg = AdvancedPatterns.generateHalo(subPattern, palette, strokeWidth, fillOpacity, complexity, symmetry);
                break;
            default:
                patternSvg = GeometricPatterns.generate('grid', palette, strokeWidth, fillOpacity, complexity, 'none');
        }
        
        // Apply symmetry transformations if needed
        if (symmetry && symmetry !== 'none') {
            svg += Symmetry.applySymmetry(patternSvg, symmetry);
        } else {
            svg += patternSvg;
        }
        
        svg += `</g>`;
        
        // Centerpiece
        if (enableCenter && centerType !== 'none') {
            svg += Centerpiece.generate(centerType, palette, strokeWidth, fillOpacity, centerSize, centerStrokeWidth, centerOpacity);
        }
        
        // Corners
        if (enableCorners && cornerStyle !== 'none') {
            svg += Corners.generate(cornerStyle, palette, strokeWidth, cornerStrokeWidth, cornerOpacity);
        }
        
        // Border
        if (enableBorder) {
            svg += Borders.generate(borderStyle, borderColor, borderWidth, borderOpacity);
        }
        
        svg += `</svg>`;
        
        // Update preview in DOM if we're in a browser context
        if (typeof document !== 'undefined') {
            const preview = document.getElementById('tilePreview');
            if (preview) {
                preview.innerHTML = svg;
            }
            
            // Update grid preview if enabled
            if (params.showGrid) {
                this.renderGrid(params);
            }
            
            // Update info text
            const info = document.getElementById('tileInfo');
            if (info) {
                const patternTypeSelect = document.getElementById('patternType');
                const patternName = patternTypeSelect ? patternTypeSelect.options[patternTypeSelect.selectedIndex].text : patternType;
                info.textContent = `Seed: ${params.seed} | Pattern: ${patternName}`;
            }
        }
        
        return svg;
    },
    
    // Render grid of tiles
    renderGrid(params) {
        const gridPreview = document.getElementById('gridPreview');
        const tilePreview = document.getElementById('tilePreview');
        
        if (!gridPreview) return;
        
        const size = params.gridSize || 3;
        gridPreview.style.display = 'grid';
        gridPreview.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        
        if (tilePreview) {
            tilePreview.style.display = 'none';
        }
        
        gridPreview.innerHTML = '';
        for (let i = 0; i < size * size; i++) {
            const tileDiv = document.createElement('div');
            // Vary seed for each tile in grid
            const tileParams = { ...params, seed: params.seed + i };
            
            // Temporarily disable grid for recursive call
            const originalShowGrid = tileParams.showGrid;
            tileParams.showGrid = false;
            
            const tileSvg = this.generate(tileParams);
            tileDiv.innerHTML = tileSvg;
            gridPreview.appendChild(tileDiv);
            
            // Restore
            tileParams.showGrid = originalShowGrid;
        }
    }
};

// Export for use in other modules
window.TileGenerator = TileGenerator;
