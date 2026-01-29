'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Compass, 
  Heart, 
  History, 
  Download,
  Settings
} from 'lucide-react';

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  badge?: string | number;
}

export default function Sidebar() {
  const pathname = usePathname();

  const sidebarItems: SidebarItem[] = [
    {
      icon: <Home className="w-6 h-6" />,
      label: 'Home',
      href: '/'
    },
    {
      icon: <Compass className="w-6 h-6" />,
      label: 'Explore',
      href: '/explore'
    },
    {
      icon: <Heart className="w-6 h-6" />,
      label: 'Favorites',
      href: '/favorites'
    },
    {
      icon: <History className="w-6 h-6" />,
      label: 'History',
      href: '/history'
    },
    {
      icon: <Download className="w-6 h-6" />,
      label: 'Offline',
      href: '/offline'
    }
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-[#0f0f0f] border-r border-[#303030] overflow-y-auto hidden md:block">
      <div className="p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white fill-white" viewBox="0 0 24 24" role="img">
              <title>Logo</title>
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span className="text-xl font-bold text-white">OfflineVideo</span>
        </Link>

        {/* Navigation */}
        <nav className="space-y-1">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-4 px-4 py-3 rounded-lg transition-all
                  ${isActive 
                    ? 'bg-[#2a2a2a] text-white' 
                    : 'text-gray-400 hover:bg-[#2a2a2a] hover:text-white'
                  }
                `}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Settings */}
        <div className="mt-8 pt-8 border-t border-[#303030]">
          <Link
            href="/settings"
            className={`
              flex items-center gap-4 px-4 py-3 rounded-lg transition-all
              ${pathname === '/settings' 
                ? 'bg-[#2a2a2a] text-white' 
                : 'text-gray-400 hover:bg-[#2a2a2a] hover:text-white'
              }
            `}
          >
            <Settings className="w-6 h-6" />
            <span className="font-medium">Settings</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
