'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  const [hoveredLeague, setHoveredLeague] = useState<string | null>(null);


  // ─── New: top‑week leaderboard state ─────────────
  const [topWeek, setTopWeek] = useState<{
    username: string;
    league:   string;
    score:    number;
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
  // ─────────────────────────────────────────────────

  const leagues = [
    {
      id: 'nfl',
      name: 'NFL',
      emoji: '🏈',
      description: '32 teams, founded 1920',
      background: '/images/nfl-bg.jpg',
    },
    {
      id: 'nba',
      name: 'NBA',
      emoji: '🏀',
      description: '30 teams, founded 1946',
      background: '/images/nba-bg.jpg',
    },
    {
      id: 'nhl',
      name: 'NHL',
      emoji: '🏒',
      description: '32 teams, founded 1917',
      background: '/images/mlb-bg.jpg',
    },
    {
      id: 'epl',
      name: 'EPL',
      emoji: '⚽',
      description: '20 teams, founded 1992',
      background: '/images/epl-bg.jpg',
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-blue-900 to-indigo-900 overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('/images/stadium-bg.jpg')] bg-cover bg-center" />
        </div>
        
        <div className="z-10 text-center px-4 md:px-8 max-w-5xl">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Test Your Sports Knowledge! 🏆
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-100 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Pick your favorite league and start a trivia challenge on NFL, NBA, MLB, or EPL.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <a 
              href="#league-selection"
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-lg font-semibold py-3 px-8 rounded-full transition duration-300 inline-block"
            >
              Start Quiz
            </a>
          </motion.div>
        </div>
      </section>

      <section id="league-selection" className="py-24 px-4 md:px-8 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">Choose Your League</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leagues.map((league) => (
              <Link href={{ pathname: "/quiz", query: { league: league.name } }} key={league.id}>
                <motion.div
                  className="relative h-72 rounded-xl overflow-hidden cursor-pointer"
                  onMouseEnter={() => setHoveredLeague(league.id)}
                  onMouseLeave={() => setHoveredLeague(null)}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70" />
                  
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${league.background})` }}
                  />
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                    <span className="text-5xl mb-4">{league.emoji}</span>
                    <h3 className="text-2xl font-bold mb-2">{league.name}</h3>
                    
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ 
                        opacity: hoveredLeague === league.id ? 1 : 0,
                        height: hoveredLeague === league.id ? 'auto' : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-200 text-center">{league.description}</p>
                    </motion.div>
                  </div>
                  
                  <motion.div
                    className="absolute inset-0 border-2 rounded-xl"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: hoveredLeague === league.id ? 1 : 0,
                      borderColor: 
                        league.id === 'nfl' ? '#013369' :
                        league.id === 'nba' ? '#C9082A' :
                        league.id === 'mlb' ? '#041E42' :
                        '#3D195B'
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-8">
            🔥 Top Scorers This Week
          </h2>
          
          <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
            <table className="w-full">
              {/* … table head … */}
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="py-4 text-center text-gray-500">
                      Loading…
                    </td>
                  </tr>
                ) : topWeek.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-4 text-center text-gray-500">
                      No scores yet.
                    </td>
                  </tr>
                ) : (
                  topWeek.slice(0, 7).map((p, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-800 hover:bg-gray-800 transition duration-150"
                    >
                      <td className="py-4 text-gray-300">{i + 1}</td>
                      <td className="py-4 font-medium text-white">{p.username}</td>
                      <td className="py-4 text-gray-300">{p.league}</td>
                      <td className="py-4 text-right text-green-400 font-semibold">
                        {p.score}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            
            <div className="mt-6 text-center">
              <Link 
                href="/leaderboard" 
                className="text-blue-400 hover:text-blue-300 font-medium transition duration-150"
              >
                View Full Leaderboard →
              </Link>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}