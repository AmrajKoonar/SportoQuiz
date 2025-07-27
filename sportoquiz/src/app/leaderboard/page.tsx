'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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

  const leagues = [
    { id: 'all', name: 'All Leagues', emoji: '' },
    { id: 'NFL', name: 'NFL', emoji: '🏈' },
    { id: 'NBA', name: 'NBA', emoji: '🏀' },
    { id: 'NHL', name: 'NHL', emoji: '🏒' },
    { id: 'MLB', name: 'MLB', emoji: '⚾' },
    { id: 'EPL', name: 'EPL', emoji: '⚽' },
    { id: 'other',       name: 'Other Sports', emoji: '🏓' },
  ];

  const timeframes = [
    { id: 'week', name: 'This Week' },
    { id: 'month', name: 'This Month' },
    { id: 'alltime', name: 'All Time' },
  ];

  // Fetch whenever league or timeframe changes
  // src/app/leaderboard/page.tsx
  useEffect(() => {
    // build query params from your two state vars
    const params = new URLSearchParams();
    if (activeLeague !== 'all' && activeLeague !== 'other') {
      params.set('league', activeLeague);
    }
    if (activeTimeframe !== 'alltime') {
      params.set('timeframe', activeTimeframe);
    }

    // fetch with ?league=...&timeframe=...
  fetch(`/api/leaderboard?${params.toString()}`)
    .then(res => res.json())
    .then((allEntries: Entry[]) => {
      if (activeLeague === 'other') {
        // filter out the 5 main leagues, leaving only custom ones
        const main = ['NFL','NBA','NHL','MLB','EPL'];
        return allEntries.filter(e => !main.includes(e.league));
      }
      return allEntries;
    })
    .then(setEntries)
    .catch(console.error);
  }, [activeLeague, activeTimeframe]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">🏆 Leaderboard</h1>
          <p className="text-xl text-gray-300">See who's dominating the trivia challenges!</p>
        </motion.div>

        {/* Filters */}
        <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden mb-12">
          <div className="p-6 bg-gray-900 flex flex-wrap justify-between gap-4">
            {/* Leagues */}
            <div className="flex flex-wrap gap-2">
              {leagues.map(l => (
                <button
                  key={l.id}
                  onClick={() => setActiveLeague(l.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    activeLeague === l.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {l.emoji && <span className="mr-2">{l.emoji}</span>}
                  {l.name}
                </button>
              ))}
            </div>
            {/* Timeframes */}
            <div className="flex gap-2">
              {timeframes.map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveTimeframe(t.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    activeTimeframe === t.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          {/* Leaderboard Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-800 border-b border-gray-700">
                  <th className="py-4 px-6 text-left text-gray-400 font-medium">Rank</th>
                  <th className="py-4 px-6 text-left text-gray-400 font-medium">Player</th>
                  <th className="py-4 px-6 text-left text-gray-400 font-medium">League</th>
                  <th className="py-4 px-6 text-left text-gray-400 font-medium">Score</th>
                  <th className="py-4 px-6 text-right text-gray-400 font-medium">When</th>
                </tr>
              </thead>
                <tbody>
                  {
                    // 1) If entries isn’t an array at all (e.g. the fetch failed),
                    //    show an error row instead of crashing.
                    !Array.isArray(entries) ? (
                      <tr>
                        <td colSpan={5} className="py-4 px-6 text-center text-gray-400">
                          Failed to load scores.
                        </td>
                      </tr>
                    )
                    // 2) If it _is_ an array but empty, show “no data yet”
                    : entries.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-4 px-6 text-center text-gray-400">
                          No scores yet.
                        </td>
                      </tr>
                    )
                    // 3) Otherwise map over your entries as before
                    : (
                      entries.map((e, i) => (
                        <motion.tr
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.03, duration: 0.3 }}
                          className="border-b border-gray-700 hover:bg-gray-750 transition-colors"
                        >
                          <td className="py-4 px-6">
                            <div
                              className={`flex items-center justify-center w-8 h-8 rounded-full font-bold ${
                                i === 0
                                  ? 'bg-yellow-500 text-gray-900'
                                  : i === 1
                                  ? 'bg-gray-300 text-gray-900'
                                  : i === 2
                                  ? 'bg-amber-700 text-white'
                                  : 'bg-gray-700 text-gray-300'
                              }`}
                            >
                              {i + 1}
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="font-medium text-white">{e.username}</span>
                          </td>
                          <td className="py-4 px-6">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                e.league === 'NFL'
                                  ? 'bg-blue-900 text-blue-200'
                                  : e.league === 'NBA'
                                  ? 'bg-red-900 text-red-200'
                                  : e.league === 'MLB'
                                  ? 'bg-blue-950 text-blue-200'
                                  : 'bg-purple-900 text-purple-200'
                              }`}
                            >
                              {e.league}
                            </span>
                          </td>
                          <td className="py-4 px-6 font-semibold text-green-400">{e.score}</td>
                          <td className="py-4 px-6 text-right text-gray-300">
                            {new Date(e.created_at).toLocaleDateString()}
                          </td>
                        </motion.tr>
                      ))
                    )
                  }
                </tbody>

            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
