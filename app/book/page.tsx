'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function BookPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    const formValues = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      date: formData.get('date'),
      time: formData.get('time'),
      theme: formData.get('theme'),
      additionalDetails: formData.get('additionalDetails')
    };

    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send booking request');
      }

      setSubmitStatus({
        type: 'success',
        message: 'Booking request sent successfully! We\'ll get back to you soon.'
      });

      formElement.reset();

    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to send booking request. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Page Heading */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Book Your Shoot</h1>
            <p className="text-xl text-gray-400">Let's create something amazing together</p>
          </div>

          {/* Booking Form */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-2xl">
            {/* Status Message */}
            {submitStatus.type && (
              <div className={`mb-6 p-4 rounded-md ${
                submitStatus.type === 'success' ? 'bg-green-500/20 text-green-200' : 'bg-red-500/20 text-red-200'
              }`}>
                {submitStatus.message}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Name */}
              <div>
                <label htmlFor="name" className="block font-medium mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="block w-full bg-black/20 border border-white/10 rounded-md p-3 focus:border-white/30 focus:outline-none text-white"
                  placeholder="Your full name"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block font-medium mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="block w-full bg-black/20 border border-white/10 rounded-md p-3 focus:border-white/30 focus:outline-none text-white"
                  placeholder="your@email.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="block w-full bg-black/20 border border-white/10 rounded-md p-3 focus:border-white/30 focus:outline-none text-white"
                  placeholder="Your phone number"
                />
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="date" className="block font-medium mb-2">
                    Preferred Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    required
                    className="block w-full bg-black/20 border border-white/10 rounded-md p-3 focus:border-white/30 focus:outline-none text-white"
                  />
                </div>
                <div>
                  <label htmlFor="time" className="block font-medium mb-2">
                    Preferred Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    required
                    className="block w-full bg-black/20 border border-white/10 rounded-md p-3 focus:border-white/30 focus:outline-none text-white"
                  />
                </div>
              </div>

              {/* Theme */}
              <div>
                <label htmlFor="theme" className="block font-medium mb-2">
                  Shoot Theme <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="theme"
                  name="theme"
                  required
                  className="block w-full bg-black/20 border border-white/10 rounded-md p-3 focus:border-white/30 focus:outline-none text-white"
                  placeholder="e.g., Urban, Nature, Studio, Fashion"
                />
              </div>

              {/* Additional Details */}
              <div>
                <label htmlFor="additionalDetails" className="block font-medium mb-2">
                  Additional Details
                </label>
                <textarea
                  id="additionalDetails"
                  name="additionalDetails"
                  rows={5}
                  className="block w-full bg-black/20 border border-white/10 rounded-md p-3 focus:border-white/30 focus:outline-none text-white"
                  placeholder="Tell us more about your vision for the shoot..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`relative w-full group bg-transparent border border-white/20 backdrop-blur-sm px-8 py-4 rounded-lg overflow-hidden ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:border-white/40'
                }`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-teal-500/20 group-hover:opacity-100 opacity-0 transition-opacity duration-500" />
                
                {/* Animated shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </div>

                {/* Button content */}
                <div className="relative flex items-center justify-center gap-2">
                  <span className="text-lg font-medium tracking-wider text-white">
                    {isSubmitting ? 'SENDING...' : 'BOOK NOW'}
                  </span>
                  {!isSubmitting && (
                    <svg 
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M13 7l5 5m0 0l-5 5m5-5H6" 
                      />
                    </svg>
                  )}
                </div>

                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/40 group-hover:border-white/80 transition-colors" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/40 group-hover:border-white/80 transition-colors" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/40 group-hover:border-white/80 transition-colors" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/40 group-hover:border-white/80 transition-colors" />
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 