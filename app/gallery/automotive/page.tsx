'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// Automotive photos array
const automotivePhotos = Array.from({ length: 13 }, (_, i) => ({
  id: i + 1,
  src: `/automotive-photos/auto${i + 1}.jpg`,
  alt: `Automotive photography ${i + 1}`
}));

export default function Automotive() {
  const [selectedPhoto, setSelectedPhoto] = useState<typeof automotivePhotos[0] | null>(null);
  const [direction, setDirection] = useState(0);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentIndex = automotivePhotos.findIndex(p => p.id === selectedPhoto?.id);
    const nextIndex = currentIndex < automotivePhotos.length - 1 ? currentIndex + 1 : 0;
    setDirection(1);
    setSelectedPhoto(automotivePhotos[nextIndex]);
  };

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentIndex = automotivePhotos.findIndex(p => p.id === selectedPhoto?.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : automotivePhotos.length - 1;
    setDirection(-1);
    setSelectedPhoto(automotivePhotos[prevIndex]);
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
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Automotive Photography</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Showcasing the beauty and power of exceptional automobiles.
          </p>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {automotivePhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
              onClick={() => setSelectedPhoto(photo)}
            >
              <div className="relative h-[400px] w-full rounded-lg overflow-hidden cursor-pointer">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index < 4}
                />
                
                {/* Hover Effects */}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence mode="wait">
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
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
                key={selectedPhoto.id}
              >
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.alt}
                  className="object-contain"
                  fill
                  sizes="90vw"
                  priority
                  quality={100}
                />
              </motion.div>
              
              {/* Close button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute -top-12 right-0 text-white hover:text-orange-400 transition-colors"
                aria-label="Close lightbox"
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
                  aria-label="Previous image"
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
                  aria-label="Next image"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Photo counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm">
                {automotivePhotos.findIndex(p => p.id === selectedPhoto.id) + 1} / {automotivePhotos.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 