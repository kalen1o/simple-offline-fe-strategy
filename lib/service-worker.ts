let swRegistration: ServiceWorkerRegistration | null = null;

export const registerServiceWorker = async () => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
        return false;
    }

    try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/'
        });
        swRegistration = registration;
        return true;
    } catch (error) {
        console.error('Service Worker registration failed:', error);
        return false;
    }
};

export const cacheVideoForOffline = async (videoUrl: string): Promise<boolean> => {
    if (!swRegistration) return false;

    return new Promise((resolve) => {
        const messageChannel = new MessageChannel();

        messageChannel.port1.onmessage = (event) => {
            resolve(event.data.success || true);
        };

        swRegistration.active?.postMessage({
            type: 'CACHE_VIDEO',
            url: videoUrl
        }, [messageChannel.port2]);

        setTimeout(() => resolve(false), 30000); // 30 second timeout
    });
};

export const removeVideoFromCache = async (videoUrl: string): Promise<boolean> => {
    if (!swRegistration) return false;

    return new Promise((resolve) => {
        const messageChannel = new MessageChannel();

        messageChannel.port1.onmessage = (event) => {
            resolve(event.data.success || false);
        };

        swRegistration.active?.postMessage({
            type: 'REMOVE_VIDEO_CACHE',
            url: videoUrl
        }, [messageChannel.port2]);

        setTimeout(() => resolve(false), 5000);
    });
};

export const getCachedVideos = async (): Promise<string[]> => {
    if (!swRegistration) return [];

    return new Promise((resolve) => {
        const messageChannel = new MessageChannel();

        messageChannel.port1.onmessage = (event) => {
            resolve(event.data.videos || []);
        };

        swRegistration.active?.postMessage({
            type: 'GET_CACHED_VIDEOS'
        }, [messageChannel.port2]);

        setTimeout(() => resolve([]), 5000);
    });
};

export const isVideoCached = async (videoUrl: string): Promise<boolean> => {
    const cachedVideos = await getCachedVideos();
    return cachedVideos.includes(videoUrl);
};
