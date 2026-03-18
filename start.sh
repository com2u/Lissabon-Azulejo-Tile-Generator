#!/bin/bash

# Lissabon - Azulejo Tile Generator
# Setup and Startup Script

echo "========================================="
echo "  Lissabon - Azulejo Tile Generator"
echo "========================================="
echo ""

# Stop any existing backend services
echo "[1/5] Checking for existing services..."
pkill -f "python.*http.server" 2>/dev/null || true
pkill -f "node.*http" 2>/dev/null || true
pkill -f "php.*-S" 2>/dev/null || true
echo "      Services stopped."

# Create directory structure
echo "[2/5] Creating directory structure..."
mkdir -p js
mkdir -p tiles
mkdir -p css
echo "      Directories created."

# Check for seedrandom library
echo "[3/5] Checking dependencies..."
if [ ! -f "js/seedrandom.js" ]; then
    echo "      Downloading seedrandom.js..."
    curl -sL "https://cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js" -o js/seedrandom.js
    echo "      seedrandom.js downloaded."
else
    echo "      seedrandom.js already exists."
fi

# Make tiles directory writable
chmod 755 tiles
echo "      Permissions set."

# Check if index.html exists
echo "[4/5] Verifying application files..."
if [ -f "index.html" ]; then
    echo "      index.html found."
else
    echo "      ERROR: index.html not found!"
    exit 1
fi

if [ -f "styles.css" ]; then
    echo "      styles.css found."
else
    echo "      ERROR: styles.css not found!"
    exit 1
fi

if [ -f "js/app.js" ]; then
    echo "      js/app.js found."
else
    echo "      ERROR: js/app.js not found!"
    exit 1
fi

if [ -f "js/tileGenerator.js" ]; then
    echo "      js/tileGenerator.js found."
else
    echo "      ERROR: js/tileGenerator.js not found!"
    exit 1
fi

# Start local server
echo "[5/5] Starting local server..."
echo ""
echo "========================================="
echo "  Server running at http://localhost:8080"
echo "  Press Ctrl+C to stop"
echo "========================================="
echo ""

# Get the directory where the script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"
python3 -m http.server 8080
