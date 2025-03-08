"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  // Fade in after short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  // Close menu if user clicks outside (mobile menu)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.getElementById("mobile-menu");
      const menuButton = document.getElementById("menu-button");
      if (
        menu &&
        !menu.contains(event.target as Node) &&
        menuButton &&
        !menuButton.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Utility to highlight active link
  const isActiveLink = (href: string) => {
    return pathname === href;
  };

  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/gallery", label: "GALLERY" },
    { href: "/book", label: "BOOK" },
  ];

  return (
    <main
      className={`relative w-full min-h-screen transition-opacity duration-1000 ease-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Full-screen background image */}
      <Image
        src="/def.jpg" // Make sure this is in your public/ folder
        alt="Sohaib Photography"
        fill
        className="object-cover object-center z-0"
        priority
      />

      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-black opacity-40 z-10"></div>

      {/* Navigation bar (z-30 to ensure on top) */}
      <header className="relative z-30 w-full px-6 md:px-12 py-6">
        <div className="flex justify-between items-center">
          {/* Logo (clickable) */}
          <div
            className="text-white cursor-pointer"
            onClick={() => router.push("/")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="6" width="20" height="12" rx="2" />
              <circle cx="12" cy="12" r="4" />
              <line x1="11" y1="4" x2="13" y2="4" />
            </svg>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-white font-medium transition relative group cursor-pointer ${
                  isActiveLink(link.href) ? "text-orange-400" : "hover:text-orange-400"
                }`}
              >
                {link.label}
                {/* Underline animation */}
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-orange-400 transform scale-x-0 transition-transform group-hover:scale-x-100 ${
                    isActiveLink(link.href) ? "scale-x-100" : ""
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Toggle */}
            <button
              id="menu-button"
              className="text-white md:hidden hover:text-orange-400 transition cursor-pointer"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {menuOpen ? (
                  <g>
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </g>
                ) : (
                  <g>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </g>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden absolute top-20 left-0 right-0 bg-black bg-opacity-90 p-4 z-50 backdrop-blur-sm"
          >
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-white font-medium py-2 transition-colors cursor-pointer ${
                    isActiveLink(link.href) ? "text-orange-400" : "hover:text-orange-400"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section (z-20) */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 h-screen">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
          Sohaib Photography
        </h1>
        <p className="text-base md:text-xl text-gray-200 mb-10">
          What you have caught on film is captured forever.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
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
      </div>
    </main>
  );
}
