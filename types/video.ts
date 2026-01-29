export interface Video {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    videoUrl: string;
    duration: string;
    views: number;
    uploadDate: string;
    uploader: string;
    uploaderAvatar?: string;
    category: string;
    isCached?: boolean;
}

export interface Playlist {
    id: string;
    name: string;
    videos: string[];
}

export interface UserHistory {
    videoId: string;
    watchedAt: number;
    progress: number;
}

export interface Favorites {
    videoId: string;
    addedAt: number;
}
