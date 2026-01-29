import type { UserHistory, Favorites } from '@/types/video';

const STORAGE_KEYS = {
    HISTORY: 'video-history',
    FAVORITES: 'video-favorites',
    WATCH_PROGRESS: 'video-progress'
};

export const storage = {
    // History management
    addToHistory: (videoId: string) => {
        const history = storage.getHistory();
        const newEntry: UserHistory = {
            videoId,
            watchedAt: Date.now(),
            progress: 0
        };

        // Remove if exists and add to beginning
        const filtered = history.filter(h => h.videoId !== videoId);
        filtered.unshift(newEntry);

        localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(filtered.slice(0, 50)));
    },

    getHistory: (): UserHistory[] => {
        if (typeof window === 'undefined') return [];
        const stored = localStorage.getItem(STORAGE_KEYS.HISTORY);
        return stored ? JSON.parse(stored) : [];
    },

    clearHistory: () => {
        localStorage.removeItem(STORAGE_KEYS.HISTORY);
    },

    // Favorites management
    addToFavorites: (videoId: string) => {
        const favorites = storage.getFavorites();
        if (!favorites.find(f => f.videoId === videoId)) {
            favorites.push({
                videoId,
                addedAt: Date.now()
            });
            localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
        }
    },

    removeFromFavorites: (videoId: string) => {
        const favorites = storage.getFavorites().filter(f => f.videoId !== videoId);
        localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    },

    getFavorites: (): Favorites[] => {
        if (typeof window === 'undefined') return [];
        const stored = localStorage.getItem(STORAGE_KEYS.FAVORITES);
        return stored ? JSON.parse(stored) : [];
    },

    isFavorite: (videoId: string): boolean => {
        return storage.getFavorites().some(f => f.videoId === videoId);
    },

    // Watch progress
    saveWatchProgress: (videoId: string, progress: number) => {
        const progressMap = storage.getWatchProgress();
        progressMap[videoId] = progress;
        localStorage.setItem(STORAGE_KEYS.WATCH_PROGRESS, JSON.stringify(progressMap));
    },

    getWatchProgress: (videoId?: string): number | Record<string, number> => {
        if (typeof window === 'undefined') return videoId ? 0 : {};
        const stored = localStorage.getItem(STORAGE_KEYS.WATCH_PROGRESS);
        const progressMap: Record<string, number> = stored ? JSON.parse(stored) : {};

        if (videoId) {
            return progressMap[videoId] || 0;
        }
        return progressMap;
    }
};
