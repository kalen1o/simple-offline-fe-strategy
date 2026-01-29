'use client';

import { useState, useEffect, useCallback } from 'react';
import { Settings, Palette, HardDrive, Bell, Shield } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { getCachedVideos } from '@/lib/service-worker';

export default function SettingsPage() {
  const [cachedVideoCount, setCachedVideoCount] = useState(0);
  const [isClearingCache, setIsClearingCache] = useState(false);

  const loadCacheInfo = useCallback(async () => {
    const cachedVideos = await getCachedVideos();
    setCachedVideoCount(cachedVideos.length);
  }, []);

  useEffect(() => {
    loadCacheInfo();
  }, [loadCacheInfo]);

  const clearAllCache = async () => {
    if (!confirm('Are you sure you want to clear all cached videos? This will make them unavailable offline.')) {
      return;
    }

    setIsClearingCache(true);
    try {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map(name => caches.delete(name)));
      setCachedVideoCount(0);
    } catch (error) {
      console.error('Failed to clear cache:', error);
    } finally {
      setIsClearingCache(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Sidebar />
      <Header />
      
      <main className="md:ml-64 pt-16">
        <div className="p-4 md:p-6">
          <div className="max-w-3xl mx-auto">
            {/* Page header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Settings</h1>
                <p className="text-gray-400">Manage your app preferences</p>
              </div>
            </div>

            {/* Settings sections */}
            <div className="space-y-6">
              {/* Cache management */}
              <div className="bg-[#1f1f1f] rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <HardDrive className="w-5 h-5 text-gray-400" />
                  <h2 className="text-lg font-semibold text-white">Storage</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white">Cached Videos</p>
                      <p className="text-sm text-gray-400">
                        {cachedVideoCount} videos • Approx. {cachedVideoCount * 50}MB
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={clearAllCache}
                      disabled={cachedVideoCount === 0 || isClearingCache}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isClearingCache ? 'Clearing...' : 'Clear All Cache'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Appearance */}
              <div className="bg-[#1f1f1f] rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Palette className="w-5 h-5 text-gray-400" />
                  <h2 className="text-lg font-semibold text-white">Appearance</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white">Theme</p>
                      <p className="text-sm text-gray-400">Dark mode is enabled</p>
                    </div>
                    <span className="px-3 py-1 bg-gray-700 text-white rounded text-sm">
                      Dark
                    </span>
                  </div>
                </div>
              </div>

              {/* Notifications */}
              <div className="bg-[#1f1f1f] rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Bell className="w-5 h-5 text-gray-400" />
                  <h2 className="text-lg font-semibold text-white">Notifications</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white">Push Notifications</p>
                      <p className="text-sm text-gray-400">Receive updates about new videos</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if ('Notification' in window && Notification.permission === 'default') {
                          Notification.requestPermission();
                        }
                      }}
                      className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      {'Notification' in window && Notification.permission === 'granted'
                        ? 'Enabled'
                        : 'Enable'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Privacy */}
              <div className="bg-[#1f1f1f] rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-5 h-5 text-gray-400" />
                  <h2 className="text-lg font-semibold text-white">Privacy</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white">Offline Access</p>
                      <p className="text-sm text-gray-400">Videos are cached on your device</p>
                    </div>
                    <span className="px-3 py-1 bg-green-700 text-white rounded text-sm">
                      Enabled
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* App info */}
            <div className="mt-8 text-center text-sm text-gray-400">
              <p>Offline Video App v1.0.0</p>
              <p className="mt-1">Built with Next.js, React, and TypeScript</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
