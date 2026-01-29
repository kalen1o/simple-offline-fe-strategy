const CACHE_NAME = 'offline-video-v1';
const STATIC_CACHE_NAME = 'static-v1';
const VIDEO_CACHE_NAME = 'videos-v1';

self.addEventListener('install', (event) => {
  // No pre-caching - routes are cached on-demand when accessed
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE_NAME && 
              cacheName !== VIDEO_CACHE_NAME &&
              cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip Chrome extensions and non-http requests
  if (!url.protocol.startsWith('http')) return;

  // Video files - handle range requests
  if (url.pathname.match(/\.(mp4|webm|ogg)$/i)) {
    // For range requests (206), bypass cache
    if (request.headers.get('range')) {
      event.respondWith(fetch(request));
      return;
    }
    // For full video requests, use network first
    event.respondWith(networkFirst(request, VIDEO_CACHE_NAME));
    return;
  }

  // Static assets - network first
  if (url.pathname.match(/\.(css|js|png|jpg|jpeg|gif|svg|ico)$/i)) {
    event.respondWith(networkFirst(request, STATIC_CACHE_NAME));
    return;
  }

  // HTML pages - cache first, then network (for offline client-side navigation)
  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(cacheFirstHtml(request, STATIC_CACHE_NAME));
    return;
  }

  // Default - network first
  event.respondWith(networkFirst(request, CACHE_NAME));
});

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    // Only cache complete responses (status 200), not partial (206)
    if (networkResponse && networkResponse.ok && networkResponse.status === 200) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    // Return a simple offline message
    return new Response('Offline - Asset not available', { status: 503 });
  }
}

async function cacheFirstHtml(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);

  // Return cached version immediately if available (fastest for offline navigation)
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    // No cache available, fetch from network
    const networkResponse = await fetch(request);

    // Cache successful responses for future offline use
    if (networkResponse && networkResponse.ok && networkResponse.status === 200) {
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    // Network failed - return offline fallback HTML
    return new Response(
      `<!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Offline</title>
        <style>
          body { font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #0f0f0f; color: #fff; }
          .container { text-align: center; padding: 2rem; }
          .icon { font-size: 4rem; margin-bottom: 1rem; }
          h1 { margin: 0 0 1rem; }
          p { color: #888; }
          a { color: #ff0000; text-decoration: none; }
          a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="icon">📶</div>
          <h1>You're offline</h1>
          <p>This page isn't available offline yet.</p>
          <p>Visit this page while online to cache it.</p>
          <p><a href="/">Go to Home</a></p>
        </div>
      </body>
      </html>`,
      {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
        status: 200
      }
    );
  }
}

async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  try {
    const networkResponse = await fetch(request);
    // Cache successful responses for future offline use
    if (networkResponse && networkResponse.ok && networkResponse.status === 200) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    // Network failed (offline) - return cached version if available
    if (cachedResponse) {
      return cachedResponse;
    }
    // Return a simple offline fallback HTML
    return new Response(
      `<!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Offline</title>
        <style>
          body { font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #0f0f0f; color: #fff; }
          .container { text-align: center; padding: 2rem; }
          .icon { font-size: 4rem; margin-bottom: 1rem; }
          h1 { margin: 0 0 1rem; }
          p { color: #888; }
          a { color: #ff0000; text-decoration: none; }
          a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="icon">📶</div>
          <h1>You're offline</h1>
          <p>This page isn't available offline yet.</p>
          <p>Visit this page while online to cache it.</p>
          <p><a href="/">Go to Home</a></p>
        </div>
      </body>
      </html>`,
      { 
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
        status: 200 
      }
    );
  }
}

// Handle video caching for offline viewing
self.addEventListener('message', (event) => {
  if (event.data.type === 'CACHE_VIDEO') {
    cacheVideoForOffline(event.data.url);
  } else if (event.data.type === 'REMOVE_VIDEO_CACHE') {
    removeVideoFromCache(event.data.url);
  } else if (event.data.type === 'GET_CACHED_VIDEOS') {
    getCachedVideos().then(videos => {
      event.ports[0].postMessage({ videos });
    });
  }
});

async function cacheVideoForOffline(url) {
  try {
    const cache = await caches.open(VIDEO_CACHE_NAME);
    // Fetch the video without range headers to get the complete file
    const response = await fetch(url, { cache: 'no-cache' });
    if (response && response.ok && response.status === 200) {
      await cache.put(url, response.clone());
      return true;
    }
    return false;
  } catch (error) {
    console.error('Failed to cache video:', error);
    return false;
  }
}

async function removeVideoFromCache(url) {
  try {
    const cache = await caches.open(VIDEO_CACHE_NAME);
    const deleted = await cache.delete(url);
    return deleted;
  } catch (error) {
    console.error('Failed to remove video from cache:', error);
    return false;
  }
}

async function getCachedVideos() {
  try {
    const cache = await caches.open(VIDEO_CACHE_NAME);
    const keys = await cache.keys();
    return keys.map(request => request.url);
  } catch (error) {
    console.error('Failed to get cached videos:', error);
    return [];
  }
}
