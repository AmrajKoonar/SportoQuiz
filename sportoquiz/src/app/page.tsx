// src/app/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [hoveredLeague, setHoveredLeague] = useState<string | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const leagueCardsRef = useRef<HTMLDivElement[]>([]);
  const leaderboardRef = useRef<HTMLDivElement>(null);

  const statsRef = useRef<HTMLDivElement>(null);

  const [topWeek, setTopWeek] = useState<{
    username: string;
    league: string;
    score: number;
    created_at: string;
  }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/leaderboard?timeframe=week')
      .then(res => res.json())
      .then((data) => setTopWeek(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(titleRef.current, 
      { opacity: 0, y: -50, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" }
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.3"
    )
    .fromTo(ctaRef.current,
      { opacity: 0, y: 30, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
      "-=0.2"
    );

    gsap.fromTo(leagueCardsRef.current,
      { opacity: 0, y: 50, rotation: -5 },
      {
        opacity: 1,
        y: 0,
        rotation: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#league-selection",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );


    // Stats counter animation
    gsap.from(".stat-number", {
      textContent: 0,
      duration: 2,
      ease: "power2.out",
      snap: { textContent: 1 },
      scrollTrigger: {
        trigger: statsRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });




    gsap.fromTo(leaderboardRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: leaderboardRef.current,
          start: "top 85%"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleLeagueHover = (leagueId: string, isEntering: boolean) => {
    const card = leagueCardsRef.current.find(card => 
      card?.getAttribute('data-league') === leagueId
    );
    
    if (card) {
      if (isEntering) {
        gsap.to(card, {
          scale: 1.08,
          rotationY: 5,
          duration: 0.4,
          ease: "power2.out"
        });
        gsap.to(card.querySelector('.league-overlay'), {
          opacity: 0.9,
          duration: 0.3
        });
      } else {
        gsap.to(card, {
          scale: 1,
          rotationY: 0,
          duration: 0.4,
          ease: "power2.out"
        });
        gsap.to(card.querySelector('.league-overlay'), {
          opacity: 0.7,
          duration: 0.3
        });
      }
    }
    
    setHoveredLeague(isEntering ? leagueId : null);
  };

  const leagues = [
    {
      id: 'nfl',
      name: 'NFL',
      emoji: '🏈',
      description: '32 teams, founded 1920',
      background: '/images/nfl-bg.jpg',
      color: '#013369'
    },
    {
      id: 'nba',
      name: 'NBA',
      emoji: '🏀',
      description: '30 teams, founded 1946',
      background: '/images/nba-bg.jpg',
      color: '#C9082A'
    },
    {
      id: 'nhl',
      name: 'NHL',
      emoji: '🏒',
      description: '32 teams, founded 1917',
      background: '/images/mlb-bg.jpg',
      color: '#041E42'
    },
    {
      id: 'epl',
      name: 'EPL',
      emoji: '⚽',
      description: '20 teams, founded 1992',
      background: '/images/epl-bg.jpg',
      color: '#3D195B'
    },
  ];

  const stats = [
    { number: "738", label: "Questions Asked", suffix: "+" },
    { number: "31", label: "Active Players", suffix: "+" },
    { number: "668", label: "Sports Leagues", suffix: "" },
    { number: "99", label: "Satisfaction Rate", suffix: "%" }
  ];

  return (
    <div className="min-h-screen">
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
            <div className="absolute inset-0 opacity-20 bg-[url('/images/stadium-bg.jpg')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        </div>
        
        <div className="z-10 text-center px-4 md:px-8 max-w-6xl">
          <h1 
            ref={titleRef}
            className="text-5xl md:text-7xl font-bold text-white mb-8 bg-gradient-to-r from-blue-300 via-white to-indigo-300 bg-clip-text text-transparent"
          >
            Welcome to Sporto<span className="text-blue-400 group-hover:text-blue-300">Quiz!</span>
          </h1>
          
          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl text-gray-100 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Are you the smartest sports fan? Challenge yourself with dynamic trivia across NFL, NBA, NHL, MLB, EPL, and many more leagues. 
            Compete with players worldwide and climb the leaderboard! 
          </p>
          
          <div ref={ctaRef}>
            <a 
              href="#league-selection"
              className="group relative inline-flex items-center justify-center px-10 py-4 text-lg font-semibold text-white transition-all duration-300 ease-out bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full hover:from-blue-500 hover:to-indigo-500 hover:shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-300"></span>
              <span className="relative">Start Your Challenge</span>
              <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
       <section   ref={statsRef}   className="py-20 bg-gradient-to-t from-gray-900 via-gray-900 to-transparent" >
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="stat-number text-4xl md:text-6xl font-bold text-white mb-2">
                  {stat.number}{stat.suffix}
                </div>
                <div className="text-gray-400 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="league-selection" className="py-32 px-4 md:px-8 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Choose Your Arena
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Step into your favorite sport and prove your expertise
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leagues.map((league, index) => (
              <Link href={{ pathname: "/quiz", query: { league: league.name } }} key={league.id}>
                <div
                  ref={el => {
                    if (el) leagueCardsRef.current[index] = el;
                  }}
                  data-league={league.id}
                  className="relative h-80 rounded-2xl overflow-hidden cursor-pointer group"
                  onMouseEnter={() => handleLeagueHover(league.id, true)}
                  onMouseLeave={() => handleLeagueHover(league.id, false)}
                >
                  <div className="league-overlay absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/80 opacity-70 transition-opacity duration-300" />
                  
                  <div 
                    className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                    style={{ backgroundImage: `url(${league.background})` }}
                  />
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 z-10">
                    <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                      {league.emoji}
                    </div>
                    <h3 className="text-3xl font-bold mb-4 text-center">{league.name}</h3>
                    
                    <div className={`overflow-hidden transition-all duration-500 ${
                      hoveredLeague === league.id ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <p className="text-gray-200 text-center text-lg font-medium">
                        {league.description}
                      </p>
                    </div>
                  </div>
                  
                  <div 
                    className={`absolute inset-0 border-3 rounded-2xl transition-all duration-300 ${
                      hoveredLeague === league.id 
                        ? 'border-opacity-100 shadow-2xl' 
                        : 'border-opacity-0'
                    }`}
                    style={{ 
                      borderColor: league.color,
                      boxShadow: hoveredLeague === league.id 
                        ? `0 0 30px ${league.color}40` 
                        : 'none'
                    }}
                  />
                  
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section ref={leaderboardRef} className="py-24 px-4 md:px-8 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              🔥 Weekly Champions
            </h2>
            <p className="text-gray-400 text-lg">
              See who's dominating the scoreboards this week
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-700">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="py-4 text-left text-gray-400 font-semibold">Rank</th>
                    <th className="py-4 text-left text-gray-400 font-semibold">Player</th>
                    <th className="py-4 text-left text-gray-400 font-semibold">League</th>
                    <th className="py-4 text-right text-gray-400 font-semibold">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-gray-500">
                        <div className="flex items-center justify-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                          <span>Loading champions...</span>
                        </div>
                      </td>
                    </tr>
                  ) : topWeek.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-gray-500">
                        <div className="flex flex-col items-center space-y-2">
                          <div className="text-4xl">🏆</div>
                          <span>Be the first to claim victory!</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    topWeek.slice(0, 7).map((p, i) => (
                      <tr
                        key={i}
                        className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors duration-200"
                      >
                        <td className="py-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                            i === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900' :
                            i === 1 ? 'bg-gradient-to-r from-gray-300 to-gray-500 text-gray-900' :
                            i === 2 ? 'bg-gradient-to-r from-amber-600 to-amber-800 text-white' :
                            'bg-gray-700 text-gray-300'
                          }`}>
                            {i + 1}
                          </div>
                        </td>
                        <td className="py-4 font-semibold text-white">{p.username}</td>
                        <td className="py-4">
                          <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-600/20 text-blue-300 border border-blue-600/30">
                            {p.league}
                          </span>
                        </td>
                        <td className="py-4 text-right text-green-400 font-bold text-lg">
                          {p.score}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="mt-8 text-center">
              <Link 
                href="/leaderboard" 
                className="inline-flex items-center px-6 py-3 text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-200 bg-blue-400/10 hover:bg-blue-400/20 rounded-xl border border-blue-400/30"
              >
                View Full Leaderboard
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}