# Sample Assets Needed

This application requires some placeholder assets to function properly. Below are the assets you need to add to the `public/` directory:

## Icons

Use the provided `public/icons.html` file to generate and download the required icons:

1. Open `public/icons.html` in your browser
2. Click on each icon to download it
3. Save all icons to the `public/` directory

Required icon sizes:
- icon-72x72.png
- icon-96x96.png
- icon-128x128.png
- icon-144x144.png
- icon-152x152.png
- icon-192x192.png
- icon-384x384.png
- icon-512x512.png

## Video Files

Add sample video files to the `public/videos/` directory:

- intro-webdev.mp4
- pwa-tutorial.mp4
- js-async.mp4
- css-grid.mp4
- react-hooks.mp4
- performance.mp4
- typescript.mp4
- api-design.mp4

You can use any MP4 videos for testing. Each video should be placed at:
`/videos/[filename]` which maps to `public/videos/[filename]`

## Thumbnails

Add thumbnail images to the `public/thumbnails/` directory:

- intro-webdev.png
- pwa-tutorial.png
- js-async.png
- css-grid.png
- react-hooks.png
- performance.png
- typescript.png
- api-design.png

Each thumbnail should be 16:9 aspect ratio (e.g., 640x360 pixels).

## Quick Start Without Assets

For testing without actual video files, you can:

1. The app will still work and show the UI
2. Video player will show a broken video icon
3. All other features (favorites, history, navigation) will work

## Production Deployment

For production deployment:

1. Add real video content
2. Create high-quality thumbnails
3. Use proper icon generation tools like:
   - https://realfavicongenerator.net/
   - https://www.pwabuilder.com/imageGenerator
4. Consider using a CDN for video hosting
5. Implement video compression for better performance

## Alternative: Use Public Domain Videos

For testing with real videos, you can use public domain videos from:
- https://www.pexels.com/videos/
- https://pixabay.com/videos/
- https://archive.org/details/opensource_movies

Download and rename them to match the expected filenames in `data/videos.ts`.
