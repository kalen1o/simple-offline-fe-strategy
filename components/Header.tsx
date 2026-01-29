'use client';

import { useState } from 'react';
import { Search, Menu, Bell, User } from 'lucide-react';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="fixed top-0 right-0 left-0 md:left-64 bg-[#0f0f0f] border-b border-[#303030] z-50">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Mobile menu button */}
        <button className="md:hidden text-white">
          <Menu className="w-6 h-6" />
        </button>

        {/* Search bar */}
        <div className="flex-1 max-w-2xl mx-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search videos..."
              className="w-full bg-[#1f1f1f] text-white placeholder-gray-400 rounded-full py-2 px-12 border border-transparent focus:border-blue-500 focus:outline-none transition-colors"
            />
            <button
              type="submit"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          <button className="text-gray-400 hover:text-white transition-colors hidden sm:block">
            <Bell className="w-6 h-6" />
          </button>
          <button className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
            U
          </button>
        </div>
      </div>
    </header>
  );
}
