'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Download, Loader2 } from 'lucide-react';
import { storage } from '@/lib/storage';
import { cacheVideoForOffline, isVideoCached } from '@/lib/service-worker';

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  videoId: string;
}

export default function VideoPlayer({ videoUrl, title, videoId }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isCaching, setIsCaching] = useState(false);
  const [isCached, setIsCached] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load saved progress
    const savedProgress = storage.getWatchProgress(videoId) as number;
    if (savedProgress > 0 && videoRef.current) {
      videoRef.current.currentTime = savedProgress;
    }

    // Check if video is cached
    isVideoCached(videoUrl).then(setIsCached);
  }, [videoUrl, videoId]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      // Save progress every 5 seconds
      if (Math.floor(videoRef.current.currentTime) % 5 === 0) {
        storage.saveWatchProgress(videoId, videoRef.current.currentTime);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current && videoRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = percent * duration;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (!isFullscreen) {
        containerRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };

  const handleCacheForOffline = async () => {
    setIsCaching(true);
    try {
      const success = await cacheVideoForOffline(videoUrl);
      if (success) {
        setIsCached(true);
      }
    } catch (error) {
      console.error('Failed to cache video:', error);
    } finally {
      setIsCaching(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      <div
        ref={containerRef}
        className="relative bg-black rounded-lg overflow-hidden group"
      >
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full aspect-video"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
        />

        {/* Overlay controls */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
          
          {/* Center play button */}
          <button
            onClick={togglePlay}
            className="self-center mt-auto mb-20"
          >
            <div className={`w-20 h-20 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors ${isPlaying ? 'scale-0' : 'scale-100'}`}>
              <Play className="w-10 h-10 text-white fill-white ml-1" />
            </div>
          </button>

          {/* Bottom controls */}
          <div className="space-y-2">
            {/* Progress bar */}
            <div
              ref={progressBarRef}
              onClick={handleProgressClick}
              className="w-full h-1 bg-white/30 rounded-full cursor-pointer group/bar"
            >
              <div
                className="h-full bg-red-600 rounded-full relative"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-red-600 rounded-full opacity-0 group-hover/bar:opacity-100" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Play/Pause */}
                <button
                  onClick={togglePlay}
                  className="text-white hover:text-red-500 transition-colors"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </button>

                {/* Volume */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleMute}
                    className="text-white hover:text-red-500 transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-1 bg-white/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
                  />
                </div>

                {/* Time */}
                <span className="text-white text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Cache for offline */}
                <button
                  onClick={handleCacheForOffline}
                  disabled={isCaching || isCached}
                  className="text-white hover:text-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                >
                  {isCaching ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      <span className="text-sm">
                        {isCached ? 'Cached' : 'Cache'}
                      </span>
                    </>
                  )}
                </button>

                {/* Fullscreen */}
                <button
                  onClick={toggleFullscreen}
                  className="text-white hover:text-red-500 transition-colors"
                >
                  <Maximize className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video info */}
      <div className="space-y-2">
        <h1 className="text-xl font-semibold text-white">{title}</h1>
        <div className="flex items-center gap-3">
          {isCached && (
            <span className="text-sm bg-green-600 text-white px-2 py-1 rounded">
              Available Offline
            </span>
          )}
          <span className="text-sm text-gray-400">
            {formatViews(0)} views • {formatDate(new Date().toISOString())}
          </span>
        </div>
      </div>
    </div>
  );
}

function formatViews(views: number): string {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`;
  } else if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`;
  }
  return views.toString();
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
