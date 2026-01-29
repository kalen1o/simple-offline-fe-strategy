import type { Video } from '@/types/video';

export const sampleVideos: Video[] = [
    {
        id: '1',
        title: 'Introduction to Modern Web Development',
        description: 'Learn the fundamentals of modern web development including HTML5, CSS3, and JavaScript ES6+ features. This comprehensive tutorial covers the essential building blocks of web development.',
        thumbnail: '/thumbnails/intro-webdev.png',
        videoUrl: '/videos/intro-webdev.mp4',
        duration: '12:45',
        views: 1250000,
        uploadDate: '2024-01-15',
        uploader: 'Tech Academy',
        category: 'Education'
    },
    {
        id: '2',
        title: 'Building Progressive Web Apps',
        description: 'Discover how to create Progressive Web Apps that work offline, provide push notifications, and offer a native app-like experience using modern web technologies.',
        thumbnail: '/thumbnails/pwa-tutorial.png',
        videoUrl: '/videos/pwa-tutorial.mp4',
        duration: '18:30',
        views: 890000,
        uploadDate: '2024-01-20',
        uploader: 'Web Dev Mastery',
        category: 'Education'
    },
    {
        id: '3',
        title: 'JavaScript Async/Await Explained',
        description: 'Master asynchronous JavaScript with async/await. Learn how to handle promises, make API calls, and manage concurrent operations effectively.',
        thumbnail: '/thumbnails/js-async.png',
        videoUrl: '/videos/js-async.mp4',
        duration: '15:20',
        views: 2100000,
        uploadDate: '2024-01-25',
        uploader: 'Code Simplified',
        category: 'Education'
    },
    {
        id: '4',
        title: 'CSS Grid Layout Mastery',
        description: 'Complete guide to CSS Grid Layout. Learn to create complex, responsive layouts with ease using grid-template, grid areas, and alignment properties.',
        thumbnail: '/thumbnails/css-grid.png',
        videoUrl: '/videos/css-grid.mp4',
        duration: '22:10',
        views: 750000,
        uploadDate: '2024-02-01',
        uploader: 'Design Academy',
        category: 'Design'
    },
    {
        id: '5',
        title: 'React Hooks Deep Dive',
        description: 'Deep dive into React Hooks. Explore useState, useEffect, useContext, custom hooks, and best practices for building modern React applications.',
        thumbnail: '/thumbnails/react-hooks.png',
        videoUrl: '/videos/react-hooks.mp4',
        duration: '28:45',
        views: 1800000,
        uploadDate: '2024-02-05',
        uploader: 'React Mastery',
        category: 'Education'
    },
    {
        id: '6',
        title: 'Web Performance Optimization',
        description: 'Learn techniques to optimize web performance. Covering lazy loading, code splitting, caching strategies, and performance measurement tools.',
        thumbnail: '/thumbnails/performance.png',
        videoUrl: '/videos/performance.mp4',
        duration: '19:15',
        views: 950000,
        uploadDate: '2024-02-10',
        uploader: 'Speed Matters',
        category: 'Education'
    },
    {
        id: '7',
        title: 'TypeScript for Beginners',
        description: 'Start your TypeScript journey with this beginner-friendly introduction. Learn types, interfaces, generics, and how TypeScript improves JavaScript development.',
        thumbnail: '/thumbnails/typescript.png',
        videoUrl: '/videos/typescript.mp4',
        duration: '25:00',
        views: 1400000,
        uploadDate: '2024-02-15',
        uploader: 'TypeScript Academy',
        category: 'Education'
    },
    {
        id: '8',
        title: 'RESTful API Design Best Practices',
        description: 'Master RESTful API design principles. Learn about resource naming, HTTP methods, status codes, versioning, and documentation.',
        thumbnail: '/thumbnails/api-design.png',
        videoUrl: 'https://www.pexels.com/download/video/2806808/',
        duration: '20:30',
        views: 680000,
        uploadDate: '2024-02-20',
        uploader: 'API Masters',
        category: 'Education'
    }
];

export const categories = [
    'All',
    'Education',
    'Design',
    'Technology',
    'Gaming',
    'Music',
    'Entertainment'
];
