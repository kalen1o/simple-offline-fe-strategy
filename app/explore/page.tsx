'use client';

import { useState, useEffect } from 'react';
import { sampleVideos } from '@/data/videos';
import VideoCard from '@/components/VideoCard';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { getCachedVideos } from '@/lib/service-worker';
import { Compass } from 'lucide-react';

export default function ExplorePage() {
  const [cachedVideoUrls, setCachedVideoUrls] = useState<string[]>([]);

  useEffect(() => {
    // Load cached videos
    getCachedVideos().then(setCachedVideoUrls);
  }, []);

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
                <Compass className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Explore</h1>
                <p className="text-gray-400">{sampleVideos.length} videos available</p>
              </div>
            </div>

            {/* Featured section */}
            {sampleVideos.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-white mb-4">Featured</h2>
                <div className="bg-[#1f1f1f] rounded-lg overflow-hidden">
                  <VideoCard
                    video={sampleVideos[0]}
                    showCacheStatus={true}
                    isCached={cachedVideoUrls.includes(sampleVideos[0].videoUrl)}
                  />
                </div>
              </div>
            )}

            {/* All videos grid */}
            <div>
              <h2 className="text-lg font-semibold text-white mb-4">All Videos</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {sampleVideos.map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    showCacheStatus={true}
                    isCached={cachedVideoUrls.includes(video.videoUrl)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
