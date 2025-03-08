'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function AboutMePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Page Heading */}
          <motion.div 
            className="text-center mb-16"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
              About Me
            </h1>
            <p className="text-xl text-gray-400">
              Discover my journey, passion, and creative spirit
            </p>
          </motion.div>

          {/* Video Showcase Section */}
          <motion.div 
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-2xl mb-12"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="max-w-[400px] mx-auto">
              <div className="relative aspect-[9/16] rounded-xl overflow-hidden">
                <video 
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src="/aboutme.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </motion.div>

          {/* About Me Content */}
          <motion.div 
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-2xl"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="space-y-6">
              <motion.p 
                className="text-lg leading-relaxed text-gray-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Welcome! I'm Sohaib, a passionate Muslim photographer dedicated to capturing the most beautiful moments of your life.
              </motion.p>
              <motion.p 
                className="text-lg leading-relaxed text-gray-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Whether it's a wedding, sports event, birthday celebration, or any special occasion, my goal is to preserve your memories so that they last a lifetime. Through my lens, I strive to tell the unique story of your day, allowing you to relive those precious moments every time you look back.
              </motion.p>
              <motion.p 
                className="text-lg leading-relaxed text-gray-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                I believe that every memory is worth cherishing, and I'm here to ensure yours are captured with care, creativity, and heart.
              </motion.p>
              <motion.p 
                className="text-lg leading-relaxed text-gray-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                Let's connect, collaborate, and create something amazing together.
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
