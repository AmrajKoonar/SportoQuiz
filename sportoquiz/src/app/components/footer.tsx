// src/components/Footer.tsx
'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 80%",
        // end: "bottom bottom",
        // toggleActions: "play none none reverse"
        toggleActions: "play none none none",
      }
    });

    // use .from() instead of .fromTo() so initial CSS is untouched
    tl.from(contentRef.current!, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power3.out",
      immediateRender: false                      // don't apply "from" on init
    })
    .from(logoRef.current!, {
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      ease: "back.out(1.7)",
      immediateRender: false
    }, "-=0.4")
    .from(socialRef.current!.children, {
      opacity: 0,
      scale: 0,
      rotation: 180,
      duration: 0.5,
      stagger: 0.1,
      ease: "back.out(1.7)",
      immediateRender: false
    }, "-=0.3");

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  const handleSocialHover = (element: EventTarget | null, isEntering: boolean) => {
    if (element) {
      gsap.to(element, {
        scale: isEntering ? 1.2 : 1,
        rotation: isEntering ? 360 : 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const quickLinks = [
    { href: "/quiz?league=NFL", label: "NFL Quizzes", icon: "🏈" },
    { href: "/quiz?league=NBA", label: "NBA Quizzes", icon: "🏀" },
    { href: "/quiz?league=NHL", label: "NHL Quizzes", icon: "🏒" },
    { href: "/quiz?league=MLB", label: "MLB Quizzes", icon: "⚾" },
    { href: "/quiz?league=EPL", label: "EPL Quizzes", icon: "⚽" }
  ];

  const resourceLinks = [
    { href: "/about", label: "About Us", icon: "ℹ️" },
    { href: "/leaderboard", label: "Leaderboard", icon: "🏆" },
    { href: "/contact", label: "Contact Us", icon: "📧" },
    { href: "#", label: "Terms of Service", icon: "📜" },
    { href: "#", label: "Privacy Policy", icon: "🔒" }
  ];

  return (
    <footer ref={footerRef} className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-gray-300 border-t border-gray-700/50">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="col-span-1 md:col-span-2">
            <div ref={logoRef} className="flex items-center space-x-3 mb-6">
              <div className="text-3xl animate-pulse">🏆</div>
              <h2 className="text-2xl font-bold text-white">
                Sporto<span className="text-blue-400">Quiz</span>
              </h2>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed text-lg">
              Challenge your sports knowledge with our comprehensive trivia platform. 
              Compete across NFL, NBA, MLB, and EPL leagues, climb the leaderboards, 
              and prove you're the ultimate sports fan!
            </p>
            <div ref={socialRef} className="flex space-x-4">
              <a 
                href="https://www.linkedin.com/in/amraj-koonar/" 
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300 p-3 bg-gray-800/50 rounded-full hover:bg-blue-500/20"
                onMouseEnter={(e) => handleSocialHover(e.currentTarget, true)}
                onMouseLeave={(e) => handleSocialHover(e.currentTarget, false)}
              >
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 
                           5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 
                           19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.785-1.75-1.75s.784-1.75 
                           1.75-1.75 1.75.785 1.75 1.75-.784 1.75-1.75 
                           1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.059-1.865-3.059-1.868 
                           0-2.154 1.459-2.154 2.969v5.694h-3v-10h2.881v1.367h.041c.401-.762 
                           1.379-1.567 2.839-1.567 3.036 0 3.6 2 3.6 4.59v5.61z" />
                </svg>
              </a>
              <a 
                href="https://github.com/AmrajKoonar/SportoQuiz" 
                className="text-gray-400 hover:text-green-400 transition-colors duration-300 p-3 bg-gray-800/50 rounded-full hover:bg-green-500/20"
                onMouseEnter={(e) => handleSocialHover(e.currentTarget, true)}
                onMouseLeave={(e) => handleSocialHover(e.currentTarget, false)}
              >
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-6 flex items-center">
              <span className="text-lg mr-2">🎯</span>
              Quick Start
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-all duration-300 flex items-center space-x-2 group"
                  >
                    <span className="group-hover:scale-110 transition-transform duration-200">
                      {link.icon}
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-6 flex items-center">
              <span className="text-lg mr-2">📚</span>
              Resources
            </h3>
            <ul className="space-y-4">
              {resourceLinks.map((link) => (
                <li key={`${link.href}-${link.label}`}>
                  <Link 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-all duration-300 flex items-center space-x-2 group"
                  >
                    <span className="group-hover:scale-110 transition-transform duration-200">
                      {link.icon}
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-700/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} SportoQuiz. All rights reserved. 
              <span className="ml-2">Made with ❤️ for sports fans worldwide.</span>
            </p>
            <div className="flex items-center space-x-2 text-gray-500 text-xs">
              <span>Powered by</span>
              <a 
                href="https://github.com/marketplace/models/azure-openai/gpt-4o-mini/playground" 
                className="hover:text-gray-400 transition-colors duration-300 font-medium"
              >
                OpenAI GPT-4o mini
              </a>
              <span className="text-lg">🤖</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}