# Quick Start Guide

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

## Setup Steps

### 1. Install Dependencies

If you have internet access:
```bash
npm install
```

### 2. Generate App Icons

1. Open `public/icons.html` in your browser
2. Click on each icon preview to download it
3. Save all downloaded icons to the `public/` directory

### 3. Add Sample Videos (Optional)

The app will work without videos, but you'll need actual video files for full functionality:

**Option A - Use Placeholder Files:**
```bash
chmod +x setup.sh
./setup.sh
```

**Option B - Add Real Videos:**
- Place MP4 videos in `public/videos/` directory
- Use these filenames:
  - intro-webdev.mp4
  - pwa-tutorial.mp4
  - js-async.mp4
  - css-grid.mp4
  - react-hooks.mp4
  - performance.mp4
  - typescript.mp4
  - api-design.mp4

**Option C - Use Public Domain Videos:**
Download from:
- https://www.pexels.com/videos/
- https://pixabay.com/videos/

Rename them to match expected filenames above.

### 4. Add Thumbnails (Optional)

Place 16:9 thumbnail images in `public/thumbnails/` directory with these names:
- intro-webdev.png
- pwa-tutorial.png
- js-async.png
- css-grid.png
- react-hooks.png
- performance.png
- typescript.png
- api-design.png

### 5. Run the App

Development mode:
```bash
npm run dev
```

Production build:
```bash
npm run build
npm start
```

### 6. Open in Browser

Navigate to: http://localhost:3000

## Testing Offline Functionality

1. Open the app in Chrome or Firefox
2. Go to a video page
3. Click "Cache" button to download the video
4. Turn off your internet connection
5. Navigate to the "Offline" page
6. Click on a cached video to play it offline

## Install as PWA

1. Open the app in Chrome, Edge, or Safari
2. Look for the install icon in the address bar
3. Click "Install" to add it to your home screen

## Features to Try

- Browse videos by category
- Add videos to favorites
- Watch videos with custom controls
- Check your watch history
- Cache videos for offline viewing
- View storage usage in settings

## Troubleshooting

**Service Worker Not Registering:**
- Clear browser cache and reload
- Ensure you're running on localhost or HTTPS

**Videos Not Playing:**
- Check if video files exist in `public/videos/`
- Ensure videos are in MP4 format with H.264 codec

**Icons Not Showing:**
- Generate icons using `public/icons.html`
- Ensure all icon files are in the `public/` directory

**Offline Mode Not Working:**
- Cache at least one video first
- Check browser's offline status
- Verify service worker is registered in DevTools

## Development Tips

- Use Chrome DevTools > Application tab to inspect service worker
- Network tab shows caching behavior
- Application > Cache Storage shows cached videos
- Application > Local Storage shows favorites and history

## Next Steps

- Replace sample videos with your own content
- Add more categories
- Implement search functionality
- Add user authentication
- Integrate with a video hosting service
