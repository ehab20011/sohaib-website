"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "HOME" },
    { path: "/gallery", label: "GALLERY" },
    { path: "/book", label: "BOOK" },
    { path: "/aboutme", label: "ABOUT" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-0 w-full z-50"
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-xl"></div>
      <div className="relative max-w-7xl mx-auto px-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center h-20">
          <div className="flex items-center space-x-12">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="relative py-2 px-1"
                onMouseEnter={() => setHoveredPath(item.path)}
                onMouseLeave={() => setHoveredPath(null)}
              >
                <span
                  className={`relative z-10 text-sm tracking-widest transition-colors duration-300
                    ${pathname === item.path ? 'text-white' : 'text-gray-300 hover:text-white'}
                  `}
                >
                  {item.label}
                </span>
                
                {/* Hover effect */}
                {hoveredPath === item.path && (
                  <motion.span
                    layoutId="hoverEffect"
                    className="absolute inset-0 -z-10 bg-white/10 rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}

                {/* Active page indicator */}
                {pathname === item.path && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-px left-0 right-0 h-[2px] bg-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-between h-16">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white p-2"
          >
            <div className="space-y-2">
              <span className={`block w-8 h-0.5 bg-white transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
              <span className={`block w-8 h-0.5 bg-white transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-8 h-0.5 bg-white transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
            </div>
          </button>
          
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden absolute left-0 right-0 bg-black/95 backdrop-blur-xl"
            >
              <div className="px-4 py-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-4 text-center"
                  >
                    <span
                      className={`text-sm tracking-widest transition-colors duration-300
                        ${pathname === item.path ? 'text-white' : 'text-gray-300'}
                      `}
                    >
                      {item.label}
                    </span>
                    {pathname === item.path && (
                      <motion.div
                        layoutId="mobileActiveIndicator"
                        className="mt-1 mx-auto w-8 h-[2px] bg-white"
                      />
                    )}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
