# Lissabon - Portuguese Azulejo Tile Generator

A web-based decorative tile generator inspired by traditional Portuguese azulejo ceramics. Generate beautiful, authentic-looking tiles with extensive customization options.

![Azulejo Tiles](https://img.shields.io/badge/Azulejo-Tiles-blue?style=for-the-badge)

## Features

### Pattern Generators
- **Geometric** - Grid, diamond, hexagonal, triangle, and wave patterns
- **Floral** - Rosette, vine, branch, and paisley motifs
- **Ornamental** - Traditional Portuguese corda, arabesque, and star patterns
- **Striped** - Horizontal, vertical, diagonal, chevron, and wave lines
- **Checker** - Classic, compound, harlequin, and frame patterns
- **Radial** - Mandala, sunburst, target, and spiral designs
- **Celtic** - Knot, braid, chain, and spiral interlacements
- **Moroccan** - Zellij, gidra, muqarnas, and lattice patterns
- **Baroque** - Royal, floral-baroque, scroll, and architectural designs

### Customization Options
- **Seed-based generation** - Reproducible results from the same seed
- **Color palettes** - Multiple preset palettes (Traditional Portuguese, Blue, Earth Tones, etc.)
- **Custom colors** - Background and foreground color pickers
- **Style controls** - Stroke width, fill opacity, and complexity sliders
- **Symmetry modes** - None, horizontal mirror, vertical mirror, quadruple, 4-fold rotational, 8-fold radial
- **Borders** - Simple, double, and ornate border styles
- **Corners** - Simple, flourish, and diamond corner decorations
- **Centerpiece** - Optional center elements (circle, star, flower, diamond)

### Export & Save
- Export as **SVG** (scalable vector graphics)
- Export as **PNG** (high-resolution raster)
- Save and load configurations locally
- Grid preview (2×2, 3×3, 4×4)

## Screenshots

### Application Interface

![Screen 1](tiles/screen1.png)

![Screen 2](tiles/screen2.png)

### Generated Tile Collections

![Collection 1](tiles/collection1.svg)

![Collection 2](tiles/collection2.svg)

![Collection 3](tiles/collection3.svg)

![Collection 4](tiles/collection4.svg)

## Quick Start

### Option 1: Run Locally (Python)
```bash
# Clone or navigate to the project
cd Lissabon

# Start the development server
python3 -m http.server 8080
# or
./start.sh

# Open in browser
open http://localhost:8080
```

### Option 2: Run with Docker
```bash
# Build the Docker image
docker build -t lissabon-azulejo .

# Run the container
docker run -d -p 8080:8080 --name lissabon lissabon-azulejo

# Open in browser
open http://localhost:8080

# Stop the container when done
docker stop lissabon && docker rm lissabon
```

### Option 3: Use the Test Suite
```bash
# The test-tiles.html provides a comprehensive testing interface
# Open in browser
http://localhost:8080/test-tiles.html
```

## Docker Deployment

### Build the Image
```bash
# Build the Docker image with a tag
docker build -t lissabon-azulejo:latest .

# Or build with no cache to ensure fresh dependencies
docker build --no-cache -t lissabon-azulejo:latest .
```

### Run the Container
```bash
# Basic run (detached mode)
docker run -d -p 8080:8080 --name lissabon lissabon-azulejo:latest

# Run with custom port
docker run -d -p 3000:8080 --name lissabon lissabon-azulejo:latest

# Run with volume mounting for persistence
docker run -d -p 8080:8080 -v $(pwd)/data:/app/data --name lissabon lissabon-azulejo:latest

# View logs
docker logs -f lissabon

# Check health status
docker inspect --format='{{.State.Health.Status}}' lissabon
```

### Docker Compose (Recommended for Easy Management)
Create a `docker-compose.yml` file:

```yaml
version: '3.8'

services:
  lissabon:
    build: .
    container_name: lissabon-azulejo
    ports:
      - "8080:8080"
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 5s
```

Then manage with:
```bash
# Start the container
docker-compose up -d

# View logs
docker-compose logs -f

# Stop and remove
docker-compose down

# Rebuild after changes
docker-compose up -d --build
```

### Deploy to Production
```bash
# Build for production
docker build -t lissabon-azulejo:prod .

# Run with production flags
docker run -d \
  --restart=always \
  --name lissabon-prod \
  -p 8080:8080 \
  lissabon-azulejo:prod

# Or use Docker Compose with production settings
docker-compose -f docker-compose.yml up -d --build
```

### Kubernetes Deployment (Optional)
For Kubernetes deployments, create a `deployment.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: lissabon-azulejo
spec:
  replicas: 2
  selector:
    matchLabels:
      app: lissabon-azulejo
  template:
    metadata:
      labels:
        app: lissabon-azulejo
    spec:
      containers:
      - name: lissabon
        image: lissabon-azulejo:latest
        ports:
        - containerPort: 8080
        resources:
          limits:
            memory: "128Mi"
            cpu: "500m"
          requests:
            memory: "64Mi"
            cpu: "250m"
---
apiVersion: v1
kind: Service
metadata:
  name: lissabon-service
spec:
  selector:
    app: lissabon-azulejo
  ports:
  - port: 80
    targetPort: 8080
  type: LoadBalancer
```

Apply with:
```bash
kubectl apply -f deployment.yaml
```

### Container Management Commands
```bash
# List running containers
docker ps

# Stop container
docker stop lissabon

# Remove container
docker rm lissabon

# Remove image
docker rmi lissabon-azulejo:latest

# View resource usage
docker stats lissabon

# Execute command in container
docker exec -it lissabon sh

# Copy files from container
docker cp lissabon:/app/index.html ./backup/
```

## Project Structure & Architecture

Lissabon is built with a modular architecture, separating UI, state management, and generation logic.

- **[`ARCHITECTURE.md`](ARCHITECTURE.md)** - Detailed technical documentation and dependency graph.
- **[`js/app.js`](js/app.js)** - Main application controller and view switcher.
- **[`js/params.js`](js/params.js)** - Centralized parameter management (Source of Truth).
- **[`js/tileGenerator.js`](js/tileGenerator.js)** - Core engine for single tile generation.
- **[`js/canvas/generator.js`](js/canvas/generator.js)** - Engine for multi-tile canvas layouts.
- **[`js/patterns/`](js/patterns/)** - Specialized pattern generation modules (Geometric, Floral, Celtic, etc.).
- **[`js/ui/`](js/ui/)** - UI-specific logic for the Tile and Canvas views.
- **[`js/storage.js`](js/storage.js)** - Local storage and file export (SVG/PNG) utilities.

## Usage

### Generate a Tile
1. Select a pattern type from the dropdown
2. Choose a sub-pattern (varies by type)
3. Adjust colors, style, symmetry, and border options
4. Click "Generate Tile" or press Enter

### Regenerate with Same Settings
Click "Regenerate" to create a new variation with the same parameters but different random elements.

### Randomize
Click the random seed button to generate a completely new random tile.

### Export
- Click "SVG" to download as vector graphics
- Click "PNG" to download as high-resolution image

### Save Configuration
Click "Save" to store your current settings. Use "Load" to restore saved configurations.

### Grid Preview
Enable "Show Grid Preview" to see how tiles look when repeated in a grid.

## Technical Details

### SVG-Based Generation
All tiles are generated as SVG (Scalable Vector Graphics), ensuring:
- Infinite scalability without quality loss
- Clean, valid XML output
- Easy editing in vector graphics software
- Small file sizes

### Seed-Based Randomization
Uses a seeded PRNG (Pseudo-Random Number Generator) for:
- Reproducible results from the same seed
- Deterministic variation within parameters
- Consistent behavior across browsers

### Color System
- Traditional Portuguese azulejo color palettes
- Custom foreground palette (up to 5 colors)
- Automatic color darkening for strokes

## Browser Support

Tested and working in:
- Chrome/Chromium
- Firefox
- Safari
- Edge

## License

MIT License - Feel free to use and modify for your projects.

## Acknowledgments

Inspired by the beautiful Portuguese ceramic tiles (azulejos) found throughout Lisbon and Portugal. This is a generative art project, not a copy of any specific historic tile design.
