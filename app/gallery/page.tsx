'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Gallery sections data
const sections = [
  {
    id: 'weddings',
    title: 'Weddings',
    description: 'Capturing your special moments with elegance and emotion',
    image: '/wedding1.jpg', // You'll need to add these images
    href: '/gallery/weddings',
  },
  {
    id: 'sports',
    title: 'Sports',
    description: 'Freezing the action in its most dramatic moments',
    image: '/sports1.jpg',
    href: '/gallery/sports',
  },
  {
    id: 'portraits',
    title: 'Portraits',
    description: 'Professional portraits that tell your story',
    image: '/portraits1.jpg',
    href: '/gallery/portraits',
  },
  {
    id: 'automotive',
    title: 'Automotive',
    description: 'Showcasing the beauty and power of automobiles',
    image: '/auto1.jpg',
    href: '/gallery/automotive',
  },
  {
    id: 'engagements',
    title: 'Engagements',
    description: 'Engagements are a special moment in your life, and I am here to capture it.',
    image: '/engagements/engagements2.jpg',
    href: '/gallery/engagements',
  },
  {
    id: 'videos',
    title: 'Videos',
    description: 'Videos are a special moment in your life, and I am here to capture it.',
    image: '/v1.jpg',
    href: '/gallery/videos',
  },
];

export default function Gallery() {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center pt-32 pb-16 px-4"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Gallery</h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Explore our diverse collection of photography across different genres
        </p>
      </motion.div>

      {/* Gallery Sections Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group cursor-pointer"
              onMouseEnter={() => setHoveredSection(section.id)}
              onMouseLeave={() => setHoveredSection(null)}
              onClick={() => router.push(section.href)}
            >
              <div className="relative h-[400px] overflow-hidden rounded-2xl">
                {/* Background Image */}
                <Image
                  src={section.image}
                  alt={section.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <motion.h2
                    className="text-3xl font-bold mb-3"
                    animate={{
                      y: hoveredSection === section.id ? 0 : 10,
                      opacity: hoveredSection === section.id ? 1 : 0.9,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {section.title}
                  </motion.h2>
                  
                  <motion.p
                    className="text-gray-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: hoveredSection === section.id ? 1 : 0,
                      y: hoveredSection === section.id ? 0 : 10,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {section.description}
                  </motion.p>

                  {/* View Gallery Button */}
                  <motion.button
                    className="mt-4 px-6 py-2 border-2 border-white rounded-full 
                             hover:bg-white hover:text-black transition-colors duration-300"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: hoveredSection === section.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    View Gallery
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 