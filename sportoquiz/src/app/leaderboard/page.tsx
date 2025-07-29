// src/app/leaderboard/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Entry {
  username: string;
  league: string;
  difficulty: string;
  score: number;
  created_at: string;
}

export default function LeaderboardPage() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [activeLeague, setActiveLeague] = useState<string>('all');
  const [activeTimeframe, setActiveTimeframe] = useState<string>('week');
  const [isLoading, setIsLoading] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const leaderboardRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  const leagueButtonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const timeframeButtonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const leagues = [
    { id: 'all', name: 'All Leagues', emoji: '🌟' },
    { id: 'NFL', name: 'NFL', emoji: '🏈' },
    { id: 'NBA', name: 'NBA', emoji: '🏀' },
    { id: 'NHL', name: 'NHL', emoji: '🏒' },
    { id: 'MLB', name: 'MLB', emoji: '⚾' },
    { id: 'EPL', name: 'EPL', emoji: '⚽' },
    { id: 'other', name: 'Other Sports', emoji: '🏓' },
  ];

  const timeframes = [
    { id: 'week', name: 'This Week' },
    { id: 'month', name: 'This Month' },
    { id: 'alltime', name: 'All Time' },
  ];

  useEffect(() => {
    const tl = gsap.timeline();
    
    if (headerRef.current) {
      tl.fromTo(headerRef.current,
        { opacity: 0, y: -50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" }
      );
    }

    if (filtersRef.current) {
      tl.fromTo(filtersRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.3"
      );
    }

    if (leaderboardRef.current) {
      tl.fromTo(leaderboardRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.2"
      );
    }
  }, []);

  useEffect(() => {
    if (!isLoading && entries.length > 0 && tableRef.current) {
      const rows = tableRef.current.querySelectorAll('tbody tr');
      gsap.fromTo(rows,
        { opacity: 0, y: 20, x: -10 },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out"
        }
      );
    }
  }, [entries, isLoading]);

  useEffect(() => {
    setIsLoading(true);
    const params = new URLSearchParams();
    if (activeLeague !== 'all' && activeLeague !== 'other') {
      params.set('league', activeLeague);
    }
    if (activeTimeframe !== 'alltime') {
      params.set('timeframe', activeTimeframe);
    }

    fetch(`/api/leaderboard?${params.toString()}`)
      .then(res => res.json())
      .then((allEntries: Entry[]) => {
        if (activeLeague === 'other') {
          const main = ['NFL','NBA','NHL','MLB','EPL'];
          return allEntries.filter(e => !main.includes(e.league));
        }
        return allEntries;
      })
      .then(setEntries)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [activeLeague, activeTimeframe]);

  const handleLeagueClick = (leagueId: string, buttonIndex: number) => {
    setActiveLeague(leagueId);
    
    const button = leagueButtonsRef.current[buttonIndex];
    if (button) {
      gsap.to(button, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
    }
  };

  const handleTimeframeClick = (timeframeId: string, buttonIndex: number) => {
    setActiveTimeframe(timeframeId);
    
    const button = timeframeButtonsRef.current[buttonIndex];
    if (button) {
      gsap.to(button, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return '🏅';
  };

  const getLeagueColor = (league: string) => {
    const colors = {
      'NFL': 'from-blue-900 to-blue-700 text-blue-200 border-blue-600',
      'NBA': 'from-red-900 to-red-700 text-red-200 border-red-600',
      'MLB': 'from-green-900 to-green-700 text-green-200 border-green-600',
      'NHL': 'from-purple-900 to-purple-700 text-purple-200 border-purple-600',
      'EPL': 'from-indigo-900 to-indigo-700 text-indigo-200 border-indigo-600',
    };
    return colors[league as keyof typeof colors] || 'from-gray-900 to-gray-700 text-gray-200 border-gray-600';
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900 py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div ref={headerRef} className="text-center mb-16">
          <div className="text-6xl mb-6 animate-pulse">🏆</div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-blue-300 via-white to-indigo-300 bg-clip-text text-transparent">
            Champions Leaderboard
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            See who's dominating the trivia challenges across all sports leagues!
          </p>
        </div>

        <div ref={filtersRef} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl overflow-hidden mb-12 border border-gray-700/50">
          <div className="p-8 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 border-b border-gray-700">
            <div className="flex flex-col lg:flex-row justify-between gap-6">
              
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <span className="text-xl mr-2">🎯</span>
                  Sports Leagues
                </h3>
                <div className="flex flex-wrap gap-3">
                  {leagues.map((league, index) => (
                    <button
                      key={league.id}
                      ref={el => {leagueButtonsRef.current[index] = el}}

                      onClick={() => handleLeagueClick(league.id, index)}
                      className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 border ${
                        activeLeague === league.id
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-500 shadow-lg shadow-blue-500/25'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600 border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        {league.emoji && <span>{league.emoji}</span>}
                        <span>{league.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex-1 lg:flex-none">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <span className="text-xl mr-2">⏰</span>
                  Time Period
                </h3>
                <div className="flex gap-3">
                  {timeframes.map((timeframe, index) => (
                    <button
                      key={timeframe.id}
                      ref={el => {timeframeButtonsRef.current[index] = el}}
                      onClick={() => handleTimeframeClick(timeframe.id, index)}
                      className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 border ${
                        activeTimeframe === timeframe.id
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-500 shadow-lg shadow-indigo-500/25'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600 border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      {timeframe.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div ref={leaderboardRef} className="p-0">
            <div className="overflow-x-auto">
              <table ref={tableRef} className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700">
                    <th className="py-6 px-6 text-left text-gray-400 font-semibold text-sm uppercase tracking-wide">Rank</th>
                    <th className="py-6 px-6 text-left text-gray-400 font-semibold text-sm uppercase tracking-wide">Player</th>
                    <th className="py-6 px-6 text-left text-gray-400 font-semibold text-sm uppercase tracking-wide">League</th>
                    <th className="py-6 px-6 text-left text-gray-400 font-semibold text-sm uppercase tracking-wide">Difficulty</th>
                    <th className="py-6 px-6 text-right text-gray-400 font-semibold text-sm uppercase tracking-wide">Score</th>
                    <th className="py-6 px-6 text-right text-gray-400 font-semibold text-sm uppercase tracking-wide">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={6} className="py-16 text-center">
                        <div className="flex flex-col items-center space-y-4">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                          <span className="text-gray-400 text-lg">Loading champions...</span>
                        </div>
                      </td>
                    </tr>
                  ) : !Array.isArray(entries) ? (
                    <tr>
                      <td colSpan={6} className="py-16 text-center">
                        <div className="flex flex-col items-center space-y-4">
                          <div className="text-4xl">❌</div>
                          <span className="text-gray-400 text-lg">Failed to load scores.</span>
                        </div>
                      </td>
                    </tr>
                  ) : entries.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-16 text-center">
                        <div className="flex flex-col items-center space-y-4">
                          <div className="text-6xl animate-bounce">🏆</div>
                          <span className="text-gray-400 text-lg">No scores yet. Be the first to claim victory!</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    entries.map((entry, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-700/50 hover:bg-gradient-to-r hover:from-gray-800/50 hover:to-gray-700/50 transition-all duration-300 group"
                      >
                        <td className="py-6 px-6">
                          <div className="flex items-center space-x-3">
                            <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm ${
                              index === 0
                                ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 shadow-lg shadow-yellow-500/25'
                                : index === 1
                                ? 'bg-gradient-to-r from-gray-300 to-gray-500 text-gray-900 shadow-lg shadow-gray-400/25'
                                : index === 2
                                ? 'bg-gradient-to-r from-amber-600 to-amber-800 text-white shadow-lg shadow-amber-600/25'
                                : 'bg-gradient-to-r from-gray-700 to-gray-800 text-gray-300 border border-gray-600'
                            }`}>
                              <span className="text-lg">{getRankIcon(index + 1)}</span>
                            </div>
                            <span className="font-bold text-lg text-gray-300">#{index + 1}</span>
                          </div>
                        </td>
                        <td className="py-6 px-6">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">
                              {entry.username.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-semibold text-white text-lg group-hover:text-blue-300 transition-colors duration-200">
                              {entry.username}
                            </span>
                          </div>
                        </td>
                        <td className="py-6 px-6">
                          <span className={`px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r border ${getLeagueColor(entry.league)}`}>
                            {entry.league}
                          </span>
                        </td>
                        <td className="py-6 px-6">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            entry.difficulty === 'Hall of Fame' 
                              ? 'bg-gradient-to-r from-red-600 to-red-700 text-red-100 border border-red-500'
                              : entry.difficulty === 'Pro'
                              ? 'bg-gradient-to-r from-orange-600 to-orange-700 text-orange-100 border border-orange-500'
                              : 'bg-gradient-to-r from-green-600 to-green-700 text-green-100 border border-green-500'
                          }`}>
                            {entry.difficulty}
                          </span>
                        </td>
                        <td className="py-6 px-6 text-right">
                          <span className="font-bold text-2xl text-green-400 group-hover:text-green-300 transition-colors duration-200">
                            {entry.score}
                          </span>
                        </td>
                        <td className="py-6 px-6 text-right text-gray-400 text-sm">
                          {new Date(entry.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700/50 inline-block">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center justify-center">
              <span className="text-2xl mr-2">🚀</span>
              Ready to Compete?
            </h3>
            <p className="text-gray-300 mb-6">Think you can make it to the top? Start your quiz challenge now!</p>
            <a
              href="/quiz"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/25"
            >
              <span className="mr-2">🎯</span>
              Start Quiz Challenge
              <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}