# Offline Video App

A YouTube-like video player application built with Next.js that works offline using Progressive Web App (PWA) technology.

## Features

- **Offline Playback**: Cache videos for offline viewing
- **PWA Support**: Install as a native app on supported devices
- **Watch History**: Track recently watched videos
- **Favorites**: Save videos for later
- **Responsive Design**: Beautiful dark mode UI that works on all devices
- **Category Filtering**: Browse videos by category
- **Service Worker**: Smart caching strategies for optimal performance

## Technology Stack

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Biome**: Fast linting and formatting (replaces ESLint & Prettier)
- **Service Worker API**: Offline caching and PWA features
- **LocalStorage**: Client-side data persistence
- **Lucide React**: Modern icon library

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd offline-app
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Caching Videos for Offline Use

1. Navigate to any video page
2. Click the "Cache" button in the video player controls
3. The video will be downloaded and stored locally
4. Visit the "Offline" page to see all cached videos
5. Videos can be watched without an internet connection

### Managing Favorites

1. While watching a video, click the "Save" button
2. Access all saved videos from the "Favorites" page in the sidebar

### View Watch History

1. All watched videos are automatically tracked
2. Access history from the "History" page in the sidebar
3. Clear history if needed using the "Clear History" button

### Install as PWA

1. Open the app in a supported browser (Chrome, Edge, Safari)
2. Look for the install icon in the address bar
3. Click "Install" to add the app to your home screen
4. The app can now be launched like a native application

## Project Structure

```
offline-app/
├── app/
│   ├── components/
│   │   ├── Header.tsx          # Top navigation with search
│   │   ├── Sidebar.tsx         # Left navigation menu
│   │   ├── VideoCard.tsx       # Video thumbnail card
│   │   ├── VideoPlayer.tsx     # Main video player component
│   │   └── ServiceWorkerProvider.tsx  # SW registration
│   ├── favorites/              # Favorites page
│   ├── history/                # Watch history page
│   ├── offline/                # Offline videos page
│   ├── settings/               # Settings page
│   ├── watch/                  # Video player page
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   └── globals.css             # Global styles
├── components/                 # Reusable components
├── data/
│   └── videos.ts               # Sample video data
├── lib/
│   ├── service-worker.ts       # Service worker communication
│   └── storage.ts              # LocalStorage utilities
├── public/
│   ├── sw.js                   # Service worker
│   └── manifest.json           # PWA manifest
├── types/
│   └── video.ts                # TypeScript interfaces
└── [config files]
```

## Key Components

### Service Worker (`public/sw.js`)

The service worker implements multiple caching strategies:

- **Cache First**: For videos and static assets
- **Network First**: For HTML pages and API requests
- **Stale While Revalidate**: Dynamic content

### Video Player (`components/VideoPlayer.tsx`)

Features:
- Custom controls (play/pause, volume, fullscreen)
- Progress tracking with resume capability
- Offline caching button
- Watch progress saving
- Responsive design

### Storage Management (`lib/storage.ts`)

LocalStorage utilities for:
- Watch history (last 50 videos)
- Favorites management
- Watch progress per video

## Caching Strategy

1. **Static Assets**: Cached immediately on first load
2. **Videos**: Cached on-demand when user clicks "Cache"
3. **HTML Pages**: Network first, fallback to cache
4. **API Requests**: Network first with cache fallback

## Offline Mode Indicators

- Green badge on video thumbnails when cached
- "Available Offline" indicator on video player
- Offline status indicator in settings
- Network status monitoring

## Performance Optimizations

- Lazy loading of images
- Code splitting with Next.js
- Efficient caching strategies
- Minimal bundle size
- Optimized re-renders

## Browser Support

- Chrome 90+
- Edge 90+
- Safari 14+
- Firefox 88+

For PWA installation:
- Chrome (Desktop & Android)
- Edge (Desktop & Android)
- Safari (iOS 16.4+)

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Lint and auto-fix code
npm run lint:fix

# Format code
npm run format

# Check formatting without modifying
npm run format:check

# Run both linting and formatting with auto-fix
npm run check

# Run CI checks (no modifications)
npm run check:ci
```

### Code Quality with Biome

This project uses Biome for linting and formatting. Biome is a fast, unified toolchain that replaces ESLint and Prettier.

#### Configuration

Biome is configured in `biome.json` with:
- Tab indentation (2 spaces width)
- 100 character line width
- Double quotes for JavaScript/TypeScript
- All recommended rules enabled
- Import organization enabled

#### Key Features

- Fast performance (~35x faster than Prettier)
- Unified linting and formatting
- Import organization
- 97% Prettier compatibility
- Extensive rule coverage (400+ rules)

#### VS Code Setup

Install the official Biome extension for VS Code:
1. Install "Biome" extension from the VS Code Marketplace
2. The extension will automatically use your `biome.json` configuration
3. Format on save can be enabled in VS Code settings

## Limitations

- Videos must be served from the same origin or have proper CORS headers
- Storage is limited by browser quota (typically ~5-10% of disk space)
- Service workers require HTTPS (except localhost)
- Video caching is currently synchronous and large videos may timeout

## Future Enhancements

- [ ] Background sync
- [ ] Playlist support
- [ ] Video quality selection
- [ ] Subtitle support
- [ ] Download queue management
- [ ] IndexedDB for better storage management
- [ ] Push notifications
- [ ] Video search functionality

## License

MIT License - feel free to use this project for learning and development.
