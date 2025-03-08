'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// Add your wedding photos here
const weddingPhotos = [
  { 
    id: 1, 
    src: '/wedding-photos/wedding1.jpg', 
    alt: 'Elegant wedding ceremony setup' 
  },
  { 
    id: 2, 
    src: '/wedding-photos/wedding2.jpg', 
    alt: 'Bride and groom first dance' 
  },
  { 
    id: 3, 
    src: '/wedding-photos/wedding3.jpg', 
    alt: 'Bridal portrait in natural light' 
  },
  { 
    id: 4, 
    src: '/wedding-photos/wedding4.jpg', 
    alt: 'Wedding reception details' 
  },
  { 
    id: 5, 
    src: '/wedding-photos/wedding5.jpg', 
    alt: 'Couple portrait at golden hour' 
  },
  { 
    id: 6, 
    src: '/wedding-photos/wedding6.jpg', 
    alt: 'Wedding party celebration' 
  },
  { 
    id: 7, 
    src: '/wedding-photos/wedding7.jpg', 
    alt: 'Intimate moment between newlyweds' 
  },
  { 
    id: 8, 
    src: '/wedding-photos/wedding8.jpg', 
    alt: 'Wedding venue decoration' 
  },
  { 
    id: 9, 
    src: '/wedding-photos/wedding9.jpg', 
    alt: 'Bride walking down the aisle' 
  },
  { 
    id: 10, 
    src: '/wedding-photos/wedding10.jpg', 
    alt: 'Ring exchange ceremony' 
  },
  { 
    id: 11, 
    src: '/wedding-photos/wedding11.jpg', 
    alt: 'Wedding cake cutting moment' 
  },
  { 
    id: 12, 
    src: '/wedding-photos/wedding12.jpg', 
    alt: 'Bridesmaids group photo' 
  },
  { 
    id: 13, 
    src: '/wedding-photos/wedding13.jpg', 
    alt: 'Groomsmen celebration' 
  },
  { 
    id: 14, 
    src: '/wedding-photos/wedding14.jpg', 
    alt: 'Wedding bouquet toss' 
  },
  { 
    id: 15, 
    src: '/wedding-photos/wedding15.jpg', 
    alt: 'Couple exit with sparklers' 
  },
  { 
    id: 16, 
    src: '/wedding-photos/wedding16.jpg', 
    alt: 'Wedding rings close-up' 
  },
  { 
    id: 17, 
    src: '/wedding-photos/wedding17.jpg', 
    alt: 'Father daughter dance' 
  },
  { 
    id: 18, 
    src: '/wedding-photos/wedding18.jpg', 
    alt: 'Mother son dance moment' 
  },
  { 
    id: 19, 
    src: '/wedding-photos/wedding19.jpg', 
    alt: 'Wedding dress details' 
  },
  { 
    id: 20, 
    src: '/wedding-photos/wedding20.jpg', 
    alt: 'Couple portrait in garden' 
  },
  { 
    id: 21, 
    src: '/wedding-photos/wedding21.jpg', 
    alt: 'First look reaction' 
  },
  { 
    id: 22, 
    src: '/wedding-photos/wedding22.jpg', 
    alt: 'Wedding vows exchange' 
  },
  { 
    id: 23, 
    src: '/wedding-photos/wedding23.jpg', 
    alt: 'Reception table settings' 
  },
  { 
    id: 24, 
    src: '/wedding-photos/wedding24.jpg', 
    alt: 'Dance floor moments' 
  },
  { 
    id: 25, 
    src: '/wedding-photos/wedding25.jpg', 
    alt: 'Sunset couple portrait' 
  },
  { 
    id: 26, 
    src: '/wedding-photos/wedding26.jpg', 
    alt: 'Final send-off celebration' 
  }
];

export default function Weddings() {
  const [selectedPhoto, setSelectedPhoto] = useState<typeof weddingPhotos[0] | null>(null);
  const [direction, setDirection] = useState(0);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentIndex = weddingPhotos.findIndex(p => p.id === selectedPhoto?.id);
    const nextIndex = currentIndex < weddingPhotos.length - 1 ? currentIndex + 1 : 0;
    setDirection(1);
    setSelectedPhoto(weddingPhotos[nextIndex]);
  };

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentIndex = weddingPhotos.findIndex(p => p.id === selectedPhoto?.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : weddingPhotos.length - 1;
    setDirection(-1);
    setSelectedPhoto(weddingPhotos[prevIndex]);
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
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Wedding Photography</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Capturing the magic and emotion of your special day, one frame at a time.
          </p>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {weddingPhotos.map((photo, index) => (
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
                {weddingPhotos.findIndex(p => p.id === selectedPhoto.id) + 1} / {weddingPhotos.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 