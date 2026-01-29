'use client';

import { Video } from '@/types/video';
import Link from 'next/link';
import { Clock, Eye, Play } from 'lucide-react';

interface VideoCardProps {
  video: Video;
  onFavorite?: (videoId: string) => void;
  isFavorite?: boolean;
  showCacheStatus?: boolean;
  isCached?: boolean;
}

export default function VideoCard({
  video,
  onFavorite,
  isFavorite: isFav,
  showCacheStatus = false,
  isCached = false
}: VideoCardProps) {
  return (
    <Link href={`/watch?v=${video.id}`} className="group block">
      <div className="relative bg-[#1f1f1f] rounded-lg overflow-hidden hover:bg-[#2a2a2a] transition-colors">
        {/* Thumbnail */}
        <div className="relative aspect-video bg-[#1f1f1f]">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-black/60 rounded-full flex items-center justify-center group-hover:bg-black/80 transition-colors">
              <Play className="w-8 h-8 text-white fill-white ml-1" />
            </div>
          </div>
          
          {/* Duration badge */}
          <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs font-medium">
            {video.duration}
          </div>

          {/* Cached indicator */}
          {showCacheStatus && isCached && (
            <div className="absolute top-2 right-2 bg-green-600 px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Offline
            </div>
          )}
        </div>

        {/* Video info */}
        <div className="p-3">
          <h3 className="text-white font-medium line-clamp-2 mb-2 group-hover:text-blue-400 transition-colors">
            {video.title}
          </h3>
          
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-xs font-bold">
              {video.uploader.slice(0, 2).toUpperCase()}
            </div>
            <span className="truncate">{video.uploader}</span>
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{formatViews(video.views)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{formatDate(video.uploadDate)}</span>
            </div>
          </div>

          <div className="mt-2">
            <span className="text-xs bg-[#2a2a2a] px-2 py-1 rounded text-gray-400">
              {video.category}
            </span>
          </div>
        </div>
      </div>
    </Link>
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

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return '1 day ago';
  if (diffDays < 30) return `${diffDays} days ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}
