'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useRef } from 'react';

// Videos array
const videos = [
  {
    id: 1,
    src: '/videos/video1.mp4',
    alt: 'Video 1',
    thumbnail: '/videos/video1.mp4'
  },
  {
    id: 2,
    src: '/videos/video2.mp4',
    alt: 'Video 2',
    thumbnail: '/videos/video2.mp4'
  },
  {
    id: 3,
    src: '/videos/video3.mp4',
    alt: 'Video 3',
    thumbnail: '/videos/video3.mp4'
  },
  {
    id: 4,
    src: '/videos/video4.mp4',
    alt: 'Video 4',
    thumbnail: '/videos/video4.mp4'
  }
];

export default function Videos() {
  const [selectedVideo, setSelectedVideo] = useState<typeof videos[0] | null>(null);
  const [direction, setDirection] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentIndex = videos.findIndex(v => v.id === selectedVideo?.id);
    const nextIndex = currentIndex < videos.length - 1 ? currentIndex + 1 : 0;
    setDirection(1);
    setSelectedVideo(videos[nextIndex]);
  };

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentIndex = videos.findIndex(v => v.id === selectedVideo?.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : videos.length - 1;
    setDirection(-1);
    setSelectedVideo(videos[prevIndex]);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <Link 
            href="/gallery"
            className="inline-block mb-8 text-orange-400 hover:text-orange-500 transition-colors"
          >
            ← Back to Gallery
          </Link>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Video Gallery</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Capturing moments in motion, telling stories through video.
          </p>
        </div>
      </div>

      {/* Video Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
              onClick={() => setSelectedVideo(video)}
            >
              <div className="relative aspect-video w-full rounded-lg overflow-hidden cursor-pointer">
                <video
                  src={video.src}
                  className="w-full h-full object-cover"
                  preload="metadata"
                  muted
                  playsInline
                  onMouseOver={e => e.currentTarget.play()}
                  onMouseOut={e => {
                    e.currentTarget.pause();
                    e.currentTarget.currentTime = 0;
                  }}
                />
                
                {/* Hover Effects */}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence mode="wait">
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.pause();
              }
              setSelectedVideo(null);
            }}
            className="fixed inset-0 bg-black/95 z-50 cursor-pointer flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-[90vw] h-[80vh]"
              onClick={e => e.stopPropagation()}
            >
              <motion.div 
                className="relative w-full h-full"
                initial={{ x: direction * 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -direction * 50, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                key={selectedVideo.id}
              >
                <video
                  ref={videoRef}
                  src={selectedVideo.src}
                  className="w-full h-full object-contain"
                  controls
                  autoPlay
                  playsInline
                />
              </motion.div>
              
              {/* Close button */}
              <button
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.pause();
                  }
                  setSelectedVideo(null);
                }}
                className="absolute -top-12 right-0 text-white hover:text-orange-400 transition-colors"
                aria-label="Close video"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Navigation arrows */}
              <div className="absolute top-1/2 -translate-y-1/2 left-4">
                <button
                  onClick={handlePrevious}
                  className="p-2 text-white hover:text-orange-400 transition-colors bg-black/20 rounded-full backdrop-blur-sm"
                  aria-label="Previous video"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              </div>

              <div className="absolute top-1/2 -translate-y-1/2 right-4">
                <button
                  onClick={handleNext}
                  className="p-2 text-white hover:text-orange-400 transition-colors bg-black/20 rounded-full backdrop-blur-sm"
                  aria-label="Next video"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Video counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm">
                {videos.findIndex(v => v.id === selectedVideo.id) + 1} / {videos.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 