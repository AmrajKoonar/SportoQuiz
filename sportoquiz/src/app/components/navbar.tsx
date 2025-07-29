// src/components/Navbar.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    )
    .fromTo(logoRef.current,
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 0.6, ease: "back.out(1.7)" },
      "-=0.4"
    )
    .fromTo(menuRef.current?.children || [],
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" },
      "-=0.3"
    );
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    
    if (!isMenuOpen) {
      gsap.fromTo(mobileMenuRef.current,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.4, ease: "power2.out" }
      );
      
      gsap.fromTo(mobileMenuRef.current?.children || [],
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.05, delay: 0.1, ease: "power2.out" }
      );
    } else {
      gsap.to(mobileMenuRef.current,
        { height: 0, opacity: 0, duration: 0.3, ease: "power2.in" }
      );
    }
  };

  const navLinks = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/quiz', label: 'Quizzes', icon: '🎯' },
    { href: '/leaderboard', label: 'Leaderboard', icon: '🏆' },
    { href: '/about', label: 'About', icon: 'ℹ️' },
    { href: '/contact', label: 'Contact', icon: '📧' },
  ];

  const handleLinkHover = (element: EventTarget | null, isEntering: boolean) => {
    if (element) {
      gsap.to(element, {
        scale: isEntering ? 1.05 : 1,
        duration: 0.2,
        ease: "power2.out"
      });
    }
  };

  const handleStartQuizClick = (element: EventTarget | null) => {
    if (element) {
      gsap.to(element, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
    }
  };

  return (
    <nav ref={navRef} className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 shadow-2xl fixed w-full z-50 backdrop-blur-sm border-b border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center group">
              <div ref={logoRef} className="flex items-center space-x-2">
                <div className="text-2xl group-hover:animate-bounce">🏆</div>
                <span className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                  Sporto<span className="text-blue-400 group-hover:text-blue-300">Quiz</span>
                </span>
              </div>
            </Link>
          </div>

          <div ref={menuRef} className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative px-4 py-2 text-gray-300 hover:text-white text-sm font-medium transition-all duration-300 rounded-lg hover:bg-white/10"
                onMouseEnter={(e) => handleLinkHover(e.currentTarget, true)}
                onMouseLeave={(e) => handleLinkHover(e.currentTarget, false)}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-base group-hover:scale-110 transition-transform duration-200">
                    {link.icon}
                  </span>
                  <span>{link.label}</span>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </Link>
            ))}
            <Link
              href="/quiz"
              className="ml-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
              onClick={(e) => handleStartQuizClick(e.currentTarget)}
              onMouseEnter={(e) => handleLinkHover(e.currentTarget, true)}
              onMouseLeave={(e) => handleLinkHover(e.currentTarget, false)}
            >
              <div className="flex items-center space-x-2">
                <span>🚀</span>
                <span>Start Quiz</span>
              </div>
            </Link>
          </div>

          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none transition-all duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <div className="relative w-6 h-6">
                <div className={`absolute w-6 h-0.5 bg-current transform transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 top-3' : 'top-1'
                }`}></div>
                <div className={`absolute w-6 h-0.5 bg-current top-3 transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}></div>
                <div className={`absolute w-6 h-0.5 bg-current transform transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 top-3' : 'top-5'
                }`}></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div
        ref={mobileMenuRef}
        className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden overflow-hidden`}
        style={{ height: 0 }}
      >
        <div className="px-4 pt-2 pb-6 space-y-2 bg-gradient-to-b from-gray-800 to-gray-900 border-t border-gray-700/50">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-white/10 px-3 py-3 rounded-lg text-base font-medium transition-all duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="text-lg">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
          <Link
            href="/quiz"
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-4 py-3 rounded-lg text-base font-semibold mt-4 transition-all duration-200 transform hover:scale-105"
            onClick={() => setIsMenuOpen(false)}
          >
            <span>🚀</span>
            <span>Start Quiz</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}