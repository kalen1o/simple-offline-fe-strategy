'use client';

import { useEffect, useState } from 'react';
import { sampleVideos } from '@/data/videos';
import { storage } from '@/lib/storage';
import { UserHistory } from '@/types/video';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Clock, Trash2 } from 'lucide-react';
import VideoCard from '@/components/VideoCard';

export default function HistoryPage() {
  const [history, setHistory] = useState<UserHistory[]>([]);
  const [cachedVideoUrls, setCachedVideoUrls] = useState<string[]>([]);
  
  const historyVideos = history
    .map(entry => sampleVideos.find(v => v.id === entry.videoId))
    .filter((video): video is Exclude<typeof video, undefined> => video !== undefined);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const historyData = storage.getHistory();
    setHistory(historyData);
  };

  const clearHistory = () => {
    if (confirm('Are you sure you want to clear your watch history?')) {
      storage.clearHistory();
      setHistory([]);
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Sidebar />
      <Header />
      
      <main className="md:ml-64 pt-16">
        <div className="p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Watch History</h1>
                  <p className="text-gray-400">{historyVideos.length} videos</p>
                </div>
              </div>
              
              {history.length > 0 && (
                <button
                  onClick={clearHistory}
                  className="flex items-center gap-2 px-4 py-2 bg-[#1f1f1f] text-white rounded-lg hover:bg-[#2a2a2a] transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="text-sm">Clear History</span>
                </button>
              )}
            </div>

            {/* Video grid */}
            {historyVideos.length > 0 ? (
              <div className="space-y-8">
                {Object.entries(
                  historyVideos.reduce((acc, video) => {
                    const historyEntry = history.find(h => h.videoId === video.id);
                    if (historyEntry) {
                      const dateKey = formatDate(historyEntry.watchedAt);
                      if (!acc[dateKey]) {
                        acc[dateKey] = [];
                      }
                      acc[dateKey].push(video);
                    }
                    return acc;
                  }, {} as Record<string, typeof historyVideos>)
                ).map(([date, videos]) => (
                  <div key={date}>
                    <h2 className="text-lg font-semibold text-white mb-4">{date}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {videos.map((video) => (
                        <VideoCard
                          key={video.id}
                          video={video}
                          showCacheStatus={true}
                          isCached={cachedVideoUrls.includes(video.videoUrl)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Clock className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-white mb-2">No watch history</h2>
                <p className="text-gray-400">
                  Videos you watch will appear here
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
