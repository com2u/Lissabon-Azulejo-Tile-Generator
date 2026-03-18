/**
 * Symmetry Module
 * Handles symmetry transformations for patterns
 */

const Symmetry = {
    // Apply symmetry transformation
    applySymmetry(pattern, symmetry) {
        if (!pattern || symmetry === 'none' || symmetry === undefined) {
            return pattern;
        }
        
        let transformedPattern = '';
        
        switch (symmetry) {
            case 'horizontal':
                // Mirror left to right
                transformedPattern = `<g class="symmetry-horizontal">`;
                transformedPattern += pattern; // Original (left half)
                // Mirror horizontally across center (100, 100)
                transformedPattern += `<g transform="translate(200, 0) scale(-1, 1)">${pattern}</g>`;
                transformedPattern += `</g>`;
                break;
                
            case 'vertical':
                // Mirror top to bottom
                transformedPattern = `<g class="symmetry-vertical">`;
                transformedPattern += pattern; // Original (top half)
                // Mirror vertically across center (100, 100)
                transformedPattern += `<g transform="translate(0, 200) scale(1, -1)">${pattern}</g>`;
                transformedPattern += `</g>`;
                break;
                
            case 'both':
                // Quadruple: mirror both horizontally and vertically
                transformedPattern = `<g class="symmetry-both">`;
                transformedPattern += pattern; // Top-left (original)
                // Mirror horizontally (top-right)
                transformedPattern += `<g transform="translate(200, 0) scale(-1, 1)">${pattern}</g>`;
                // Mirror vertically (bottom-left)
                transformedPattern += `<g transform="translate(0, 200) scale(1, -1)">${pattern}</g>`;
                // Mirror both (bottom-right)
                transformedPattern += `<g transform="translate(200, 200) scale(-1, -1)">${pattern}</g>`;
                transformedPattern += `</g>`;
                break;
                
            case 'rotational':
                // 4-fold rotational symmetry (90 degree rotations)
                transformedPattern = `<g class="symmetry-rotational">`;
                transformedPattern += pattern; // 0 degrees
                // 90 degrees
                transformedPattern += `<g transform="rotate(90, 100, 100)">${pattern}</g>`;
                // 180 degrees
                transformedPattern += `<g transform="rotate(180, 100, 100)">${pattern}</g>`;
                // 270 degrees
                transformedPattern += `<g transform="rotate(270, 100, 100)">${pattern}</g>`;
                transformedPattern += `</g>`;
                break;
                
            case 'radial':
                // 8-fold radial symmetry (45 degree rotations)
                transformedPattern = `<g class="symmetry-radial">`;
                transformedPattern += pattern; // 0 degrees
                // 45, 90, 135, 180, 225, 270, 315 degrees
                for (let angle = 45; angle < 360; angle += 45) {
                    transformedPattern += `<g transform="rotate(${angle}, 100, 100)">${pattern}</g>`;
                }
                transformedPattern += `</g>`;
                break;
            
            case 'diagonal-falling':
                // Mirror along the falling diagonal (top-left to bottom-right)
                transformedPattern = `<g class="symmetry-diagonal-falling">`;
                transformedPattern += pattern; // Original (top-left half)
                transformedPattern += `<g transform="translate(0, 0)">${pattern}</g>`;
                // For falling diagonal, we reflect across y = x - 100 (shifted for center at 100,100)
                // Using transform matrix for diagonal reflection
                transformedPattern += `<g transform="matrix(0, 1, 1, 0, 0, 0)">${pattern}</g>`;
                transformedPattern += `</g>`;
                break;
            
            case 'diagonal-rising':
                // Mirror along the rising diagonal (top-right to bottom-left)
                transformedPattern = `<g class="symmetry-diagonal-rising">`;
                transformedPattern += pattern; // Original
                // For rising diagonal, we reflect across y = -x + 200 (shifted for center at 100,100)
                // Using transform matrix for diagonal reflection
                transformedPattern += `<g transform="matrix(0, 1, -1, 0, 200, 0)">${pattern}</g>`;
                transformedPattern += `</g>`;
                break;
            
            case 'diagonal-both':
                // Mirror along both diagonals (quadruple symmetry)
                transformedPattern = `<g class="symmetry-diagonal-both">`;
                transformedPattern += pattern; // Original (top-left)
                // Mirror across falling diagonal (y = x)
                transformedPattern += `<g transform="matrix(0, 1, 1, 0, 0, 0)">${pattern}</g>`;
                // Mirror across rising diagonal (y = -x + 200)
                transformedPattern += `<g transform="matrix(0, 1, -1, 0, 200, 0)">${pattern}</g>`;
                // Mirror across both (rotate 180)
                transformedPattern += `<g transform="rotate(180, 100, 100)">${pattern}</g>`;
                transformedPattern += `</g>`;
                break;
                
            default:
                transformedPattern = pattern;
        }
        
        return transformedPattern;
    },
    
    // Get angular multiplier based on symmetry type
    getAngularMultiplier(symmetry) {
        if (symmetry === 'radial') return 8;
        if (symmetry === 'rotational') return 4;
        return 1;
    }
};

// Export for use in other modules
window.Symmetry = Symmetry;
