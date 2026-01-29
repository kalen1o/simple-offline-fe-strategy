'use client';

import { useEffect, useState } from 'react';
import { sampleVideos } from '@/data/videos';
import { storage } from '@/lib/storage';
import { Favorites } from '@/types/video';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Heart } from 'lucide-react';
import VideoCard from '@/components/VideoCard';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cachedVideoUrls, setCachedVideoUrls] = useState<string[]>([]);
  const favoriteVideos = sampleVideos.filter(video => favorites.includes(video.id));

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    const favs = storage.getFavorites();
    setFavorites(favs.map(f => f.videoId));
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Sidebar />
      <Header />
      
      <main className="md:ml-64 pt-16">
        <div className="p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white fill-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Favorites</h1>
                <p className="text-gray-400">{favoriteVideos.length} videos</p>
              </div>
            </div>

            {/* Video grid */}
            {favoriteVideos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {favoriteVideos.map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    showCacheStatus={true}
                    isCached={cachedVideoUrls.includes(video.videoUrl)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-white mb-2">No favorites yet</h2>
                <p className="text-gray-400">
                  Videos you save will appear here
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
