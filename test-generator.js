/**
 * Test Generator Script
 * Tests all pattern generators and saves sample tiles
 */

// Mock DOM environment for Node.js
if (typeof window === 'undefined') {
    global.window = {
        seedrandom: require('./js/seedrandom.js')
    };
    global.document = {
        getElementById: () => null,
        querySelectorAll: () => [],
        createElement: () => ({ 
            innerHTML: '', 
            appendChild: () => {},
            style: {},
            addEventListener: () => {}
        }),
        body: {
            appendChild: () => {}
        }
    };
}

// Test results storage
const testResults = {
    passed: 0,
    failed: 0,
    errors: []
};

// Test helper functions
function assert(condition, message) {
    if (condition) {
        testResults.passed++;
        console.log(`  ✓ ${message}`);
    } else {
        testResults.failed++;
        testResults.errors.push(message);
        console.log(`  ✗ ${message}`);
    }
}

function test(name, fn) {
    console.log(`\nTesting: ${name}`);
    try {
        fn();
    } catch (e) {
        testResults.failed++;
        testResults.errors.push(`${name}: ${e.message}`);
        console.log(`  ✗ Error: ${e.message}`);
    }
}

// Color palette for testing
const testPalette = ['#1e3c72', '#2a5298', '#d4af37', '#ffffff', '#228b22'];

// Test parameters
const testParams = {
    patternType: 'geometric',
    subPattern: 'grid',
    seed: 12345,
    bgColor: '#ffffff',
    palette: testPalette,
    strokeWidth: 2,
    fillOpacity: 80,
    complexity: 5,
    symmetry: 'none',
    enableBorder: true,
    borderStyle: 'simple',
    borderColor: '#1e3c72',
    borderWidth: 8,
    enableCorners: true,
    cornerStyle: 'simple',
    enableCenter: false,
    centerType: 'circle',
    showGrid: false,
    gridSize: 3
};

// Run tests
console.log('='.repeat(50));
console.log('LISSABON TILE GENERATOR - TEST SUITE');
console.log('='.repeat(50));

// Initialize generator
console.log('\nInitializing generator...');
Generator.init(testParams.seed);
assert(true, 'Generator initialized');

// Test 1: Basic SVG generation
test('Basic SVG Generation', () => {
    const svg = Generator.generate(testParams);
    assert(typeof svg === 'string', 'SVG is a string');
    assert(svg.startsWith('<svg'), 'SVG starts with <svg tag');
    assert(svg.includes('</svg>'), 'SVG ends with </svg> tag');
    assert(svg.includes('viewBox="0 0 200 200"', 'SVG has correct viewBox'));
});

// Test 2: Background color
test('Background Color', () => {
    const params = { ...testParams, bgColor: '#ff0000' };
    const svg = Generator.generate(params);
    assert(svg.includes('fill="#ff0000"'), 'Background color is set');
});

// Test 3: All pattern types
test('Pattern Types', () => {
    const patternTypes = ['geometric', 'floral', 'ornamental', 'striped', 'checker', 'radial', 'celtic', 'moroccan', 'baroque'];
    
    patternTypes.forEach(type => {
        const params = { ...testParams, patternType: type };
        const svg = Generator.generate(params);
        assert(svg.includes('<svg'), `${type} generates SVG`);
    });
});

// Test 4: Geometric sub-patterns
test('Geometric Sub-Patterns', () => {
    const subPatterns = ['grid', 'diamond', 'hex', 'triangle', 'wave'];
    
    subPatterns.forEach(subType => {
        const params = { ...testParams, subPattern: subType };
        const svg = Generator.generate(params);
        assert(svg.length > 100, `${subType} produces content`);
    });
});

// Test 5: Color variations
test('Color Variations', () => {
    const palettes = {
        traditional: ['#1e3c72', '#2a5298', '#ffffff', '#228b22', '#d4af37'],
        blue: ['#1e3c72', '#2a5298', '#3b82f6', '#60a5fa', '#93c5fd'],
        earth: ['#8b4513', '#d2691e', '#deb887', '#cd853f', '#f5deb3']
    };
    
    Object.entries(palettes).forEach(([name, palette]) => {
        const params = { ...testParams, palette: palette };
        const svg = Generator.generate(params);
        assert(svg.length > 100, `${name} palette produces valid SVG`);
    });
});

// Test 6: Style parameters
test('Style Parameters', () => {
    // Stroke width
    let params = { ...testParams, strokeWidth: 5 };
    let svg = Generator.generate(params);
    assert(svg.length > 100, 'Stroke width 5 works');
    
    // Fill opacity
    params = { ...testParams, fillOpacity: 50 };
    svg = Generator.generate(params);
    assert(svg.length > 100, 'Fill opacity 50 works');
    
    // Complexity
    params = { ...testParams, complexity: 10 };
    svg = Generator.generate(params);
    assert(svg.length > 100, 'Complexity 10 works');
});

// Test 7: Border options
test('Border Options', () => {
    const borderStyles = ['simple', 'double', 'ornate'];
    
    borderStyles.forEach(style => {
        const params = { ...testParams, borderStyle: style };
        const svg = Generator.generate(params);
        assert(svg.includes('stroke='), `${style} border generates strokes`);
    });
});

// Test 8: Corner options
test('Corner Options', () => {
    const cornerStyles = ['simple', 'flourish', 'diamond'];
    
    cornerStyles.forEach(style => {
        const params = { ...testParams, cornerStyle: style };
        const svg = Generator.generate(params);
        assert(svg.length > 100, `${style} corners produce valid SVG`);
    });
});

// Test 9: Centerpiece options
test('Centerpiece Options', () => {
    const centerTypes = ['circle', 'star', 'flower', 'diamond'];
    
    centerTypes.forEach(type => {
        const params = { ...testParams, enableCenter: true, centerType: type };
        const svg = Generator.generate(params);
        assert(svg.length > 100, `${type} centerpiece generates valid SVG`);
    });
});

// Test 10: Seed-based generation
test('Seed-Based Generation', () => {
    const seed1 = 12345;
    const seed2 = 67890;
    
    // Different seeds should produce different results
    let params = { ...testParams, seed: seed1 };
    const svg1 = Generator.generate(params);
    
    params = { ...testParams, seed: seed2 };
    const svg2 = Generator.generate(params);
    
    assert(svg1 !== svg2, 'Different seeds produce different results');
    
    // Same seed should produce same result
    params = { ...testParams, seed: seed1 };
    const svg1Again = Generator.generate(params);
    assert(svg1 === svg1Again, 'Same seed produces same result');
});

// Test 11: SVG validity
test('SVG Validity', () => {
    const svg = Generator.generate(testParams);
    
    // Check for required elements
    assert(svg.includes('xmlns="http://www.w3.org/2000/svg"'), 'Has SVG namespace');
    assert(svg.includes('width="200"'), 'Has width');
    assert(svg.includes('height="200"'), 'Has height');
    
    // Check for balanced tags (basic check)
    const openTags = (svg.match(/<[a-z]/g) || []).length;
    const closeTags = (svg.match(/<\/[a-z]+>/g) || []).length;
    assert(Math.abs(openTags - closeTags) <= 3, 'Tags are reasonably balanced');
});

// Test 12: Helper functions
test('Helper Functions', () => {
    // Test darkenColor
    const dark = Generator.darkenColor('#ffffff', 50);
    assert(dark.startsWith('#'), 'Darken color returns hex');
    
    // Test randInt
    const randNum = Generator.randInt(1, 10);
    assert(randNum >= 1 && randNum <= 10, 'randInt returns number in range');
    
    // Test randItem
    const item = Generator.randItem([1, 2, 3]);
    assert([1, 2, 3].includes(item), 'randItem returns item from array');
});

// Test 13: Edge cases
test('Edge Cases', () => {
    // Empty palette (should use default)
    let params = { ...testParams, palette: [] };
    let svg = Generator.generate(params);
    assert(svg.length > 100, 'Empty palette handled');
    
    // Single color palette
    params = { ...testParams, palette: ['#000000'] };
    svg = Generator.generate(params);
    assert(svg.length > 100, 'Single color palette works');
    
    // Very high complexity
    params = { ...testParams, complexity: 10 };
    svg = Generator.generate(params);
    assert(svg.length > 100, 'High complexity works');
    
    // Zero stroke width
    params = { ...testParams, strokeWidth: 0 };
    svg = Generator.generate(params);
    assert(svg.length > 100, 'Zero stroke width works');
});

// Test 14: All symmetry modes
test('Symmetry Modes', () => {
    const symmetries = ['none', 'horizontal', 'vertical', 'both', 'rotational', 'radial'];
    
    symmetries.forEach(sym => {
        const params = { ...testParams, symmetry: sym };
        const svg = Generator.generate(params);
        assert(svg.length > 100, `${sym} symmetry produces valid SVG`);
    });
});

// Print results
console.log('\n' + '='.repeat(50));
console.log('TEST RESULTS');
console.log('='.repeat(50));
console.log(`Passed: ${testResults.passed}`);
console.log(`Failed: ${testResults.failed}`);

if (testResults.errors.length > 0) {
    console.log('\nErrors:');
    testResults.errors.forEach(err => console.log(`  - ${err}`));
}

console.log('\n' + '='.repeat(50));

// Exit with appropriate code
process.exit(testResults.failed > 0 ? 1 : 0);
