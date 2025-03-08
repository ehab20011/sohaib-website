"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  const router = useRouter();

  // Fade in after short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <main
      className={`relative w-full min-h-screen transition-opacity duration-1000 ease-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Full-screen background image */}
      <Image
        src="/def1.jpg"
        alt="Sohaib Photography"
        fill
        className="object-cover object-center z-0"
        priority
      />

      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-black opacity-40 z-10"></div>


      {/* Hero Section (z-20) */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 h-screen">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
          Sohaib Photography
        </h1>
        <p className="text-base md:text-xl text-gray-200 mb-10">
          What you have caught on film is captured forever.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-8">
          <button
            onClick={() => router.push("/gallery")}
            className="relative group px-8 py-3 text-white font-medium transition-all duration-300 ease-in-out"
          >
            <span className="relative z-10">See My Work</span>
            {/* Background with gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
            {/* Border */}
            <div className="absolute inset-0 border-2 border-orange-400 rounded-full"></div>
            {/* Animated underline */}
            <span className="absolute bottom-2 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-70 transition-transform duration-300 ease-out"></span>
          </button>

          <button
            onClick={() => router.push("/book")}
            className="relative group px-8 py-3 text-white font-medium transition-all duration-300 ease-in-out"
          >
            <span className="relative z-10">Book Me</span>
            {/* Background with gradient - reversed colors */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
            {/* Border with different initial color */}
            <div className="absolute inset-0 border-2 border-orange-500 rounded-full"></div>
            {/* Animated underline */}
            <span className="absolute bottom-2 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-70 transition-transform duration-300 ease-out"></span>
          </button>
        </div>

        {/* Instagram Button */}
        <a
          href="https://www.instagram.com/sohaib.gallery/"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-center p-2 rounded-full border-2 border-white/30 hover:border-orange-400 transition-all duration-300"
          aria-label="Follow me on Instagram"
        >
          <svg
            className="w-6 h-6 text-white group-hover:text-orange-400 transition-colors duration-300"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </a>
      </div>
    </main>
  );
}
