'use client';

import { useEffect, useState } from 'react';
import { sampleVideos } from '@/data/videos';
import { getCachedVideos } from '@/lib/service-worker';
import { Download, WifiOff, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import VideoCard from '@/components/VideoCard';

export default function OfflinePage() {
  const [cachedVideoUrls, setCachedVideoUrls] = useState<string[]>([]);
  const [isOnline, setIsOnline] = useState(true);
  const [isCheckingCache, setIsCheckingCache] = useState(true);

  const cachedVideos = sampleVideos.filter(video => cachedVideoUrls.includes(video.videoUrl));

  useEffect(() => {
    // Check online status
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load cached videos
    loadCachedVideos();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const loadCachedVideos = async () => {
    setIsCheckingCache(true);
    const urls = await getCachedVideos();
    setCachedVideoUrls(urls);
    setIsCheckingCache(false);
  };

  const storageSize = cachedVideoUrls.length * 50; // Approximate 50MB per video

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
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  isOnline ? 'bg-green-600' : 'bg-yellow-600'
                }`}>
                  {isOnline ? <WifiOff className="w-6 h-6 text-white" /> : <Download className="w-6 h-6 text-white" />}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Offline Videos</h1>
                  <p className="text-gray-400">
                    {isOnline ? (
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        Connected to internet
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-yellow-500" />
                        Offline mode
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {cachedVideos.length > 0 && (
                <div className="text-sm text-gray-400">
                  <span className="font-semibold text-white">{cachedVideos.length}</span> videos •{' '}
                  <span className="font-semibold text-white">{storageSize}MB</span> used
                </div>
              )}
            </div>

            {/* Status message */}
            <div className={`mb-6 p-4 rounded-lg ${
              isOnline 
                ? 'bg-green-900/20 border border-green-800' 
                : 'bg-yellow-900/20 border border-yellow-800'
            }`}>
              <p className={`text-sm ${
                isOnline ? 'text-green-400' : 'text-yellow-400'
              }`}>
                {isOnline
                  ? 'You are online. Videos you cache will be available offline.'
                  : 'You are offline. Only cached videos are available.'}
              </p>
            </div>

            {/* Loading state */}
            {isCheckingCache && (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
              </div>
            )}

            {/* Video grid */}
            {!isCheckingCache && cachedVideos.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {cachedVideos.map((video) => (
                    <VideoCard
                      key={video.id}
                      video={video}
                      showCacheStatus={true}
                      isCached={true}
                    />
                  ))}
                </div>
              </>
            ) : !isCheckingCache && cachedVideos.length === 0 ? (
              <div className="text-center py-20">
                <Download className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-white mb-2">No offline videos</h2>
                <p className="text-gray-400 mb-4">
                  Cache videos from the player to watch them offline
                </p>
                <a
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Browse Videos
                </a>
              </div>
            ) : null}
          </div>
        </div>
      </main>
    </div>
  );
}
