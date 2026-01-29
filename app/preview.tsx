import { sampleVideos } from '@/data/videos';
import { categories } from '@/data/videos';

export default function Preview() {
  return (
    <div className="p-8 bg-[#0f0f0f] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Video Library</h1>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Categories</h2>
          <div className="flex gap-3 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 bg-[#1f1f1f] text-white rounded-lg hover:bg-[#2a2a2a] transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-4">All Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {sampleVideos.map((video) => (
              <div key={video.id} className="bg-[#1f1f1f] rounded-lg overflow-hidden">
                <div className="relative aspect-video bg-[#2a2a2a] flex items-center justify-center">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white fill-white ml-1" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs text-white">
                    {video.duration}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold mb-2">{video.title}</h3>
                  <p className="text-gray-400 text-sm mb-2">{video.uploader}</p>
                  <p className="text-gray-500 text-sm">
                    {video.views.toLocaleString()} views • {video.duration}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
