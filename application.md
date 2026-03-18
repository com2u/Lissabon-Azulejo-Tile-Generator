# Azulejo Tile Generator - Application Specification

## Project Overview
- **Project Name**: Lissabon - Portuguese Azulejo Tile Generator
- **Type**: Web Application (Single Page Application)
- **Core Functionality**: Generate decorative SVG tiles inspired by Portuguese azulejo ceramics with extensive customization options
- **Target Users**: Designers, artists, hobbyists, and anyone interested in decorative tile patterns

## UI/UX Specification

### Layout Structure
```
┌─────────────────────────────────────────────────────────────┐
│  HEADER: Logo + Title + Export Buttons                      │
├─────────────────────────────────────────────────────────────┤
│                    │                                         │
│   CONTROL PANEL    │         MAIN CANVAS AREA              │
│   (Left Sidebar)   │    (Tile Preview + Grid Preview)      │
│                    │                                         │
│   - Generator      │                                         │
│   - Colors         │                                         │
│   - Style          │                                         │
│   - Symmetry       │                                         │
│   - Borders        │                                         │
│   - Save/Load      │                                         │
│                    │                                         │
├─────────────────────────────────────────────────────────────┤
│  FOOTER: Status + Version                                    │
└─────────────────────────────────────────────────────────────┘
```

### Responsive Breakpoints
- **Desktop**: > 1024px - Full side-by-side layout
- **Tablet**: 768px - 1024px - Collapsible sidebar
- **Mobile**: < 768px - Stacked layout with tabs

### Visual Design

#### Color Palette
- **Primary**: `#1e3c72` (Deep blue - traditional azulejo)
- **Secondary**: `#2a5298` (Medium blue)
- **Accent**: `#d4af37` (Gold - traditional Portuguese)
- **Background**: `#f5f5f0` (Warm off-white)
- **Surface**: `#ffffff` (White panels)
- **Text Primary**: `#2c3e50`
- **Text Secondary**: `#5c6b7a`
- **Border**: `#d1d5db`
- **Success**: `#10b981`
- **Error**: `#ef4444`

#### Portuguese Azulejo Traditional Colors
- **Azulejo Blue**: `#1e3c72`, `#2a5298`, `#3b82f6`
- **Earth Tones**: `#8b4513`, `#d2691e`, `#deb887`
- **White**: `#ffffff`, `#f8f8f8`
- **Green**: `#228b22`, `#2e8b57`
- **Yellow/Gold**: `#ffd700`, `#d4af37`
- **Black**: `#1a1a1a`, `#2d2d2d`
- **Terracotta**: `#cd853f`, `#bc8f8f`

#### Typography
- **Font Family**: 'Playfair Display' for headings, 'Source Sans Pro' for body
- **Heading 1**: 28px, bold
- **Heading 2**: 20px, semibold
- **Body**: 14px, regular
- **Small/Labels**: 12px, medium

#### Spacing System
- **Base unit**: 8px
- **Margins**: 16px, 24px, 32px
- **Padding**: 8px, 12px, 16px, 24px
- **Border radius**: 4px (small), 8px (medium), 12px (large)

#### Visual Effects
- **Box shadows**: `0 2px 8px rgba(0,0,0,0.1)` (cards), `0 4px 16px rgba(0,0,0,0.15)` (modals)
- **Transitions**: 200ms ease-out for all interactive elements
- **Hover states**: Slight scale (1.02) and shadow increase

### Components

#### Header
- Logo (favicon SVG)
- Title: "Lissabon - Azulejo Generator"
- Action buttons: Export SVG, Export PNG, Save Config, Load Config

#### Control Panel Sections

1. **Generator Selection**
   - Dropdown: Pattern Type
   - Options: Geometric, Floral, Ornamental, Striped, Checker, Radial, Celtic, Moroccan, Baroque

2. **Seed Control**
   - Input: Seed number
   - Button: Random Seed
   - Display: Current seed value

3. **Color Palette**
   - Background color picker
   - Foreground colors (up to 5): Add/Remove color buttons
   - Preset palette dropdowns

4. **Style Controls**
   - Stroke width slider (0-10px)
   - Fill opacity slider (0-100%)
   - Complexity slider (1-10)

5. **Symmetry Options**
   - Radio buttons: None, Horizontal, Vertical, Both (Mirror), Rotational (4-fold), Radial (8-fold)

6. **Border Options**
   - Toggle: Enable border
   - Border style: Simple, Double, Ornate
   - Border color picker
   - Border width slider

7. **Corner Options**
   - Toggle: Enable corners
   - Corner style: None, Simple, Flourish

8. **Centerpiece Options**
   - Toggle: Enable centerpiece
   - Centerpiece type: Circle, Star, Flower, Diamond

9. **Grid Preview Toggle**
   - Show/hide grid preview
   - Grid size: 2x2, 3x3, 4x4

#### Canvas Area
- Main tile preview (centered, max 400x400)
- Tile info overlay (seed, dimensions)
- Grid preview mode (toggleable)

#### Saved Patterns Panel
- List of saved configurations
- Thumbnail preview
- Load/Delete actions

### Component States
- **Default**: Normal appearance
- **Hover**: Slightly elevated, lighter background
- **Active/Selected**: Blue border, filled background
- **Disabled**: Grayed out, 50% opacity
- **Loading**: Spinner animation

## Functionality Specification

### Core Features

1. **Pattern Generation**
   - Generate SVG tiles using seed-based randomization
   - Support multiple pattern types with distinct visual characteristics
   - Each pattern type has adjustable parameters

2. **Color System**
   - Background color selection
   - Multiple foreground colors (palette)
   - Predefined Portuguese color palettes
   - Color harmony rules

3. **Symmetry Modes**
   - None: Free-form patterns
   - Horizontal mirror
   - Vertical mirror
   - Both (quadruple mirror)
   - 4-fold rotational
   - 8-fold radial

4. **Border System**
   - Inner/outer borders
   - Double-line borders
   - Ornate corner decorations
   - Edge continuity for tiling

5. **Centerpiece Options**
   - Central geometric shapes
   - Floral motifs
   - Star patterns

6. **Seed System**
   - Numeric seed input
   - Random seed generation
   - Reproducible pattern generation

### User Interactions

1. **Generate Tile**: Click button or press Enter
2. **Regenerate**: Click regenerate to get new variation with same seed
3. **Randomize**: Get completely new seed and parameters
4. **Export SVG**: Download as SVG file
5. **Export PNG**: Download as PNG (via canvas)
6. **Save Config**: Store current parameters
7. **Load Config**: Restore saved parameters
8. **Toggle Grid**: Show/hide tiled preview

### Data Handling

1. **Local Storage**: Save/load configurations
2. **File Export**: SVG and PNG formats
3. **URL Parameters**: Share configurations via URL

### Edge Cases
- Invalid seed input: Default to random
- Color contrast issues: Auto-adjust
- Empty palette: Use defaults
- Browser storage full: Show error message

## Acceptance Criteria

1. ✅ Application loads without errors
2. ✅ All pattern generators produce valid SVG output
3. ✅ Color picker and palette system works correctly
4. ✅ Symmetry modes correctly transform patterns
5. ✅ Border and corner options render properly
6. ✅ Seed system produces reproducible results
7. ✅ Export to SVG produces valid, viewable files
8. ✅ Export to PNG produces high-quality images
9. ✅ Save/Load configuration works via localStorage
10. ✅ Grid preview shows tiles correctly tiled
11. ✅ UI is responsive and functional on all breakpoints
12. ✅ All controls have appropriate error handling
