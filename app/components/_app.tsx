'use client';

import { useEffect } from 'react';
import { registerServiceWorker } from '@/lib/service-worker';

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Register service worker on client-side
    if (typeof window !== 'undefined') {
      registerServiceWorker();
    }
  }, []);

  return <>{children}</>;
}
