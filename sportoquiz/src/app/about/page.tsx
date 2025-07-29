// src/app/about/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const [activeTab, setActiveTab] = useState<string>('about');
  
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  const tabItems = [
    { id: 'about', label: 'About Us' },
    { id: 'features', label: 'Features' },
    { id: 'how', label: 'How It Works' },
    { id: 'faq', label: 'FAQ' }
  ];
  
  const teamMembers = [
    {
      name: 'Amraj Koonar',
      role: 'Founder & Lead Developer',
      bio: 'Sports enthusiast with 2+ years of experience in web development and a passion for creating interactive sports experiences.',
      avatar: '/images/team/amraj_pfp.JPG'
    }
  ];
  
  const features = [
    {
      icon: '🏈',
      title: 'Multiple Leagues',
      description: 'Test your knowledge across NFL, NBA, MLB, and EPL with specialized quizzes for each league.'
    },
    {
      icon: '🎮',
      title: 'Interactive Experience',
      description: 'Engaging animations and visual feedback make taking quizzes fun and immersive.'
    },
    {
      icon: '🏆',
      title: 'Leaderboards',
      description: 'Compete with friends and other sports fans to climb the global and league-specific rankings.'
    },
    {
      icon: '🎓',
      title: 'Difficulty Levels',
      description: 'Choose your challenge with questions ranging from rookie to expert difficulty.'
    },
    {
      icon: '📊',
      title: 'Performance Stats',
      description: 'Track your progress and see detailed analytics on your trivia strengths and weaknesses.'
    },
    {
      icon: '🔄',
      title: 'Regular Updates',
      description: 'Fresh questions and timely updates based on recent sports events and seasons.'
    }
  ];
  
  const faqItems = [
    {
      question: 'How are the quiz questions created?',
      answer: 'Every time you start a quiz, we fire up OpenAIs GPT‑4o mini API on the backend. It dynamically generates 10 multiple‑choice questions tailored to your chosen sport and difficulty, no hand‑crawled question banks, its all AI‑powered in real time.'
    },
    {
      question: 'Is the app free to use?',
      answer: 'Absolutely. SportoQuiz is 100 % free, no paywalls, no premium tiers, no ads. You get unrestricted access to all leagues, difficulty levels, custom sports and leaderboards at no cost.'
    },
    {
      question: 'Which sports can I quiz on?',
      answer: 'Out of the box we cover the major five; NFL, NBA, MLB, NHL and EPL, but if you want something else, just pick "Other" and type in your favorite sport. Our GPT‑4o mini model will handle the rest and spin up a custom quiz on the fly.'
    },
    {
      question: 'Where does my data and my quiz history get stored?',
      answer: 'All of your scores and leaderboard entries are saved in our backend database (hosted on Supabase). We only store your username, chosen league, difficulty, score and timestamp, no personal info beyond that.'
    },
    {
      question: 'How is the leaderboard calculated?',
      answer: 'Scores are calculated based on correct answers, speed of response, and question difficulty. Weekly leaderboards reset every Monday at midnight UTC.'
    }
  ];
  
  const howItWorks = [
    {
      step: 1,
      title: 'Choose Your League',
      description: 'Start by selecting your favorite sports league (NFL, NBA, MLB, or EPL).',
      icon: '🎯'
    },
    {
      step: 2,
      title: 'Select Difficulty',
      description: 'Pick your challenge level from Rookie, Pro, or All-Star difficulty.',
      icon: '⚙️'
    },
    {
      step: 3,
      title: 'Answer Questions',
      description: 'Test your knowledge with our carefully crafted trivia questions.',
      icon: '❓'
    },
    {
      step: 4,
      title: 'Track Your Score',
      description: 'See how you rank compared to other sports fans on our leaderboards.',
      icon: '📊'
    },
    {
      step: 5,
      title: 'Earn Achievements',
      description: 'Unlock special badges and achievements as you improve your knowledge.',
      icon: '🏅'
    }
  ];

  useEffect(() => {
    const heroTl = gsap.timeline();
    
    heroTl.fromTo(titleRef.current, 
      { opacity: 0, y: -50, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" }
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.3"
    )
    .fromTo(tabsRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.2"
    );

    gsap.fromTo(ctaRef.current,
      { opacity: 0, y: 30, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  useEffect(() => {
    gsap.fromTo(contentRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );
  }, [activeTab]);

  const handleTabClick = (tabId: string) => {
    if (tabId === activeTab) return;
    
    gsap.to(contentRef.current, {
      opacity: 0,
      y: -10,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        setActiveTab(tabId);
      }
    });
  };

  const handleFeatureHover = (element: EventTarget | null, isEntering: boolean) => {
    if (element) {
      gsap.to(element, {
        scale: isEntering ? 1.05 : 1,
        y: isEntering ? -5 : 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleFaqHover = (element: EventTarget | null, isEntering: boolean) => {
    if (element) {
      gsap.to(element, {
        scale: isEntering ? 1.02 : 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'about':
        return (
          <div>
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Our Story</h2>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                SportoQuiz was born out of my passion for sports and competitive trivia. I wanted to create a platform where fans could test their knowledge, learn interesting facts, and compete with other enthusiasts around the world.
              </p>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                Launched in 2025, our platform has grown to include thousands of questions across multiple professional leagues. Whether you're a casual fan or a sports statistics expert, we've designed our quizzes to be both challenging and enjoyable.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                My mission is to celebrate sports knowledge and create a community where fans can engage with their favorite leagues in a fun, interactive way.
              </p>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-white mb-8 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Our Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
                    onMouseEnter={(e) => handleFeatureHover(e.currentTarget, true)}
                    onMouseLeave={(e) => handleFeatureHover(e.currentTarget, false)}
                  >
                   <div className="h-48 flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
                     <Image
                       src={member.avatar}
                       alt={member.name}
                       width={96}
                       height={96}
                       className="rounded-full border-4 border-blue-500 shadow-lg"
                     />
                   </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                      <p className="text-blue-400 mb-4 font-medium">{member.role}</p>
                      <p className="text-gray-300 leading-relaxed">{member.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'features':
        return (
          <div>
            <h2 className="text-3xl font-bold text-white mb-8 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Platform Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-2xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 group cursor-pointer"
                  onMouseEnter={(e) => handleFeatureHover(e.currentTarget, true)}
                  onMouseLeave={(e) => handleFeatureHover(e.currentTarget, false)}
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-gray-300 text-lg mb-6">Ready to put your sports knowledge to the test?</p>
              <Link 
                href="/#league-selection" 
                className="group relative inline-flex items-center justify-center px-10 py-4 text-lg font-semibold text-white transition-all duration-300 ease-out bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full hover:from-blue-500 hover:to-indigo-500 hover:shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1"
                onMouseEnter={(e) => handleFeatureHover(e.currentTarget, true)}
                onMouseLeave={(e) => handleFeatureHover(e.currentTarget, false)}
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-300"></span>
                <span className="relative">Start a Quiz Now</span>
                <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        );
      
      case 'how':
        return (
          <div>
            <h2 className="text-3xl font-bold text-white mb-10 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">How It Works</h2>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-600 to-indigo-600 hidden md:block opacity-50"></div>
              
              {howItWorks.map((item, index) => (
                <div
                  key={index}
                  className="mb-12 md:flex items-center group"
                >
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:order-2'}`}>
                    <div 
                      className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-2xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
                      onMouseEnter={(e) => handleFeatureHover(e.currentTarget, true)}
                      onMouseLeave={(e) => handleFeatureHover(e.currentTarget, false)}
                    >
                      <h3 className="text-xl font-bold text-white mb-2">
                        <span className="text-blue-400">Step {item.step}:</span> {item.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                  
                  <div className={`hidden md:flex items-center justify-center z-10 ${index % 2 === 0 ? 'md:order-2' : ''}`}>
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Link 
                href="/quiz" 
                className="group relative inline-flex items-center justify-center px-10 py-4 text-lg font-semibold text-white transition-all duration-300 ease-out bg-gradient-to-r from-green-600 to-teal-600 rounded-full hover:from-green-500 hover:to-teal-500 hover:shadow-2xl hover:shadow-green-500/25 transform hover:-translate-y-1"
                onMouseEnter={(e) => handleFeatureHover(e.currentTarget, true)}
                onMouseLeave={(e) => handleFeatureHover(e.currentTarget, false)}
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-green-400 to-teal-400 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-300"></span>
                <span className="relative">Try It Now</span>
                <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        );
      
      case 'faq':
        return (
          <div>
            <h2 className="text-3xl font-bold text-white mb-8 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
                  onMouseEnter={(e) => handleFaqHover(e.currentTarget, true)}
                  onMouseLeave={(e) => handleFaqHover(e.currentTarget, false)}
                >
                  <div className="px-6 py-5 bg-gradient-to-r from-gray-800 to-gray-750">
                    <h3 className="text-lg font-medium text-white flex items-center">
                      <span className="text-blue-400 mr-3 text-xl">Q:</span>
                      {item.question}
                    </h3>
                  </div>
                  <div className="px-6 py-5">
                    <p className="text-gray-300 leading-relaxed">
                      <span className="text-green-400 font-bold mr-3 text-xl">A:</span>
                      {item.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-gray-300 mb-4 text-lg">Still have questions?</p>
              <Link 
                href="/contact" 
                className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium transition-all duration-300 text-lg group"
              >
                Contact our support team
                <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <section ref={heroRef} className="relative pt-32 pb-20 px-4 md:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-indigo-900/20 to-purple-900/20">
            <div className="absolute inset-0 opacity-10 bg-[url('/images/stadium-bg.jpg')] bg-cover bg-center" />
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <h1 
            ref={titleRef}
            className="text-4xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-blue-300 via-white to-indigo-300 bg-clip-text text-transparent"
          >
            About SportoQuiz
          </h1>
          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            Where sports fans prove their knowledge and compete for trivia supremacy across NFL, NBA, MLB, and EPL leagues.
          </p>
        </div>
      </section>
      
      <div className="max-w-6xl mx-auto px-4 md:px-8 pb-20">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl overflow-hidden mb-16 border border-gray-700/50">
          <div ref={tabsRef} className="flex flex-wrap border-b border-gray-700/50 bg-gradient-to-r from-gray-800 to-gray-750">
            {tabItems.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`py-4 px-6 text-center font-medium transition-all duration-300 focus:outline-none relative ${
                  activeTab === tab.id
                    ? 'text-white bg-gradient-to-r from-blue-600/20 to-indigo-600/20'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                )}
              </button>
            ))}
          </div>
          
          <div ref={contentRef} className="p-8">
            {renderTabContent()}
          </div>
        </div>
        
        <div ref={ctaRef} className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900 rounded-2xl p-8 shadow-2xl border border-blue-500/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Ready to test your sports knowledge?</h2>
              <p className="text-lg md:text-xl text-blue-200">Join thousands of sports fans in our trivia challenges!</p>
            </div>
            <Link 
              href="/#league-selection" 
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-900 transition-all duration-300 ease-out bg-white rounded-full hover:bg-gray-100 hover:shadow-2xl hover:shadow-white/25 transform hover:-translate-y-1"
              onMouseEnter={(e) => handleFeatureHover(e.currentTarget, true)}
              onMouseLeave={(e) => handleFeatureHover(e.currentTarget, false)}
            >
              <span className="relative">Start a Quiz</span>
              <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}