'use client';

import { useEffect } from 'react';
import { registerServiceWorker } from '@/lib/service-worker';

export default function ServiceWorkerProvider() {
  useEffect(() => {
    // Register service worker on mount
    registerServiceWorker();
  }, []);

  return null;
}
