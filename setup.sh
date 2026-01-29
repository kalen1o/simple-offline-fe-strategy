#!/bin/bash

# Setup script for Offline Video App

echo "Setting up Offline Video App..."

# Install dependencies (skip if offline)
if command -v npm &> /dev/null; then
    if ping -c 1 registry.npmjs.org &> /dev/null 2>&1; then
        echo "Installing dependencies..."
        npm install
    else
        echo "Skipping npm install - offline or no network access"
    fi
else
    echo "npm not found. Please install Node.js and npm first."
    exit 1
fi

# Create required directories
echo "Creating required directories..."
mkdir -p public/videos
mkdir -p public/thumbnails

# Create placeholder files
echo "Creating placeholder video files..."
touch public/videos/intro-webdev.mp4
touch public/videos/pwa-tutorial.mp4
touch public/videos/js-async.mp4
touch public/videos/css-grid.mp4
touch public/videos/react-hooks.mp4
touch public/videos/performance.mp4
touch public/videos/typescript.mp4
touch public/videos/api-design.mp4

echo "Creating placeholder thumbnails..."
touch public/thumbnails/intro-webdev.png
touch public/thumbnails/pwa-tutorial.png
touch public/thumbnails/js-async.png
touch public/thumbnails/css-grid.png
touch public/thumbnails/react-hooks.png
touch public/thumbnails/performance.png
touch public/thumbnails/typescript.png
touch public/thumbnails/api-design.png

echo "Setup complete!"
echo ""
echo "To generate app icons:"
echo "1. Open public/icons.html in your browser"
echo "2. Click each icon to download it"
echo "3. Save them to the public/ directory"
echo ""
echo "To run the development server:"
echo "npm run dev"
