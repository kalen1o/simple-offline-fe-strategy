'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { sampleVideos } from '@/data/videos';
import VideoPlayer from '@/components/VideoPlayer';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { storage } from '@/lib/storage';
import { Heart, Share2, Clock } from 'lucide-react';
import type { Video } from '@/types/video';

export default function WatchPage() {
  const searchParams = useSearchParams();
  const videoId = searchParams.get('v');
  const [video, setVideo] = useState<Video | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (videoId) {
      const foundVideo = sampleVideos.find(v => v.id === videoId);
      if (foundVideo) {
        setVideo(foundVideo);
        setIsFavorite(storage.isFavorite(foundVideo.id));
        storage.addToHistory(foundVideo.id);
      }
    }
  }, [videoId]);

  const toggleFavorite = () => {
    if (video) {
      if (isFavorite) {
        storage.removeFromFavorites(video.id);
      } else {
        storage.addToFavorites(video.id);
      }
      setIsFavorite(!isFavorite);
    }
  };

  if (!video) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
        <p className="text-gray-400">Video not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Sidebar />
      <Header />
      
      <main className="md:ml-64 pt-16">
        <div className="p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Video player and info */}
              <div className="lg:col-span-2 space-y-4">
                <VideoPlayer
                  videoUrl={video.videoUrl}
                  title={video.title}
                  videoId={video.id}
                />

                {/* Action buttons */}
                <div className="flex items-center gap-3 py-3 border-b border-[#303030]">
                  <button
                    type="button"
                    onClick={toggleFavorite}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-full transition-all
                      ${isFavorite
                        ? 'bg-gray-700 text-white'
                        : 'bg-[#1f1f1f] text-white hover:bg-[#2a2a2a]'
                      }
                    `}
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-600 text-red-600' : ''}`} />
                    <span>{isFavorite ? 'Saved' : 'Save'}</span>
                  </button>

                  <button type="button" className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1f1f1f] text-white hover:bg-[#2a2a2a] transition-all">
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                </div>

                {/* Video description */}
                <div className="bg-[#1f1f1f] rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-sm font-bold text-white">
                      {video.uploader.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{video.uploader}</h3>
                      <p className="text-sm text-gray-400">{video.views.toLocaleString()} subscribers</p>
                    </div>
                  </div>
                  
                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-200 text-sm leading-relaxed">
                      {video.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-3 border-t border-[#303030] flex items-center gap-2 text-sm text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>Uploaded {new Date(video.uploadDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>
                </div>
              </div>

              {/* Recommended videos sidebar */}
              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-white mb-4">Recommended</h2>
                {sampleVideos
                  .filter(v => v.id !== video.id)
                  .slice(0, 10)
                  .map((relatedVideo) => (
                    <a
                      key={relatedVideo.id}
                      href={`/watch?v=${relatedVideo.id}`}
                      className="flex gap-3 group cursor-pointer"
                    >
                      <div className="relative flex-shrink-0 w-40 aspect-video bg-[#1f1f1f] rounded-lg overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-8 h-8 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <svg className="w-4 h-4 text-white fill-white ml-0.5" viewBox="0 0 24 24" role="img">
                              <title>Play icon</title>
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                        <div className="absolute bottom-1 right-1 bg-black/80 px-1.5 py-0.5 rounded text-xs font-medium">
                          {relatedVideo.duration}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white text-sm font-medium line-clamp-2 mb-1 group-hover:text-blue-400 transition-colors">
                          {relatedVideo.title}
                        </h3>
                        <p className="text-gray-400 text-xs">
                          {relatedVideo.uploader}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {formatViews(relatedVideo.views)} • {relatedVideo.duration}
                        </p>
                      </div>
                    </a>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function formatViews(views: number): string {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M views`;
  } else if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K views`;
  }
  return `${views} views`;
}
