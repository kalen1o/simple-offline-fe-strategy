'use client';

import { useState, useEffect } from 'react';
import { sampleVideos, categories } from '@/data/videos';
import VideoCard from '@/components/VideoCard';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { getCachedVideos } from '@/lib/service-worker';
import { Video } from '@/types/video';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cachedVideoUrls, setCachedVideoUrls] = useState<string[]>([]);

  useEffect(() => {
    // Load cached videos
    getCachedVideos().then(setCachedVideoUrls);
  }, []);

  const filteredVideos = selectedCategory === 'All'
    ? sampleVideos
    : sampleVideos.filter(video => video.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Sidebar />
      <Header />
      
      <main className="md:ml-64 pt-16">
        <div className="p-4 md:p-6 space-y-6">
          {/* Category filters */}
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`
                  px-4 py-2 rounded-lg whitespace-nowrap transition-all
                  ${selectedCategory === category
                    ? 'bg-white text-black font-medium'
                    : 'bg-[#1f1f1f] text-gray-400 hover:bg-[#2a2a2a] hover:text-white'
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Video grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredVideos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                showCacheStatus={true}
                isCached={cachedVideoUrls.includes(video.videoUrl)}
              />
            ))}
          </div>

          {filteredVideos.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No videos found in this category</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
