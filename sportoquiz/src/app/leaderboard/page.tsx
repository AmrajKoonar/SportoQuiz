'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Leaderboard() {
  const [activeLeague, setActiveLeague] = useState<string>('all');
  
  const leagues = [
    { id: 'all', name: 'All Leagues' },
    { id: 'nfl', name: 'NFL', emoji: '🏈' },
    { id: 'nba', name: 'NBA', emoji: '🏀' },
    { id: 'mlb', name: 'MLB', emoji: '⚾' },
    { id: 'epl', name: 'EPL', emoji: '⚽' },
  ];
  
  const leaderboardData = {
    all: [
      { rank: 1, name: "SportsGuru92", league: "NFL", score: 985, avatar: "/images/avatars/avatar1.jpg" },
      { rank: 2, name: "HoopDreams", league: "NBA", score: 940, avatar: "/images/avatars/avatar2.jpg" },
      { rank: 3, name: "BaseballFan44", league: "MLB", score: 915, avatar: "/images/avatars/avatar3.jpg" },
      { rank: 4, name: "FootballLegend", league: "EPL", score: 890, avatar: "/images/avatars/avatar4.jpg" },
      { rank: 5, name: "MVPHunter", league: "NBA", score: 865, avatar: "/images/avatars/avatar5.jpg" },
      { rank: 6, name: "GoalMachine", league: "EPL", score: 850, avatar: "/images/avatars/avatar6.jpg" },
      { rank: 7, name: "TouchdownKing", league: "NFL", score: 835, avatar: "/images/avatars/avatar7.jpg" },
      { rank: 8, name: "SlamDunk23", league: "NBA", score: 820, avatar: "/images/avatars/avatar8.jpg" },
      { rank: 9, name: "PitchPerfect", league: "MLB", score: 805, avatar: "/images/avatars/avatar9.jpg" },
      { rank: 10, name: "SoccerStar", league: "EPL", score: 790, avatar: "/images/avatars/avatar10.jpg" }
    ],
    nfl: [
      { rank: 1, name: "SportsGuru92", league: "NFL", score: 985, avatar: "/images/avatars/avatar1.jpg" },
      { rank: 2, name: "TouchdownKing", league: "NFL", score: 835, avatar: "/images/avatars/avatar7.jpg" },
      { rank: 3, name: "GridironHero", league: "NFL", score: 780, avatar: "/images/avatars/avatar11.jpg" },
      { rank: 4, name: "BlitzMaster", league: "NFL", score: 760, avatar: "/images/avatars/avatar12.jpg" },
      { rank: 5, name: "QuarterbackFan", league: "NFL", score: 740, avatar: "/images/avatars/avatar13.jpg" }
    ],
    nba: [
      { rank: 1, name: "HoopDreams", league: "NBA", score: 940, avatar: "/images/avatars/avatar2.jpg" },
      { rank: 2, name: "MVPHunter", league: "NBA", score: 865, avatar: "/images/avatars/avatar5.jpg" },
      { rank: 3, name: "SlamDunk23", league: "NBA", score: 820, avatar: "/images/avatars/avatar8.jpg" },
      { rank: 4, name: "ThreePointKing", league: "NBA", score: 775, avatar: "/images/avatars/avatar14.jpg" },
      { rank: 5, name: "CourtVision", league: "NBA", score: 750, avatar: "/images/avatars/avatar15.jpg" }
    ],
    mlb: [
      { rank: 1, name: "BaseballFan44", league: "MLB", score: 915, avatar: "/images/avatars/avatar3.jpg" },
      { rank: 2, name: "PitchPerfect", league: "MLB", score: 805, avatar: "/images/avatars/avatar9.jpg" },
      { rank: 3, name: "HomeRunHero", league: "MLB", score: 770, avatar: "/images/avatars/avatar16.jpg" },
      { rank: 4, name: "DiamondKing", league: "MLB", score: 745, avatar: "/images/avatars/avatar17.jpg" },
      { rank: 5, name: "BullpenMaster", league: "MLB", score: 720, avatar: "/images/avatars/avatar18.jpg" }
    ],
    epl: [
      { rank: 1, name: "FootballLegend", league: "EPL", score: 890, avatar: "/images/avatars/avatar4.jpg" },
      { rank: 2, name: "GoalMachine", league: "EPL", score: 850, avatar: "/images/avatars/avatar6.jpg" },
      { rank: 3, name: "SoccerStar", league: "EPL", score: 790, avatar: "/images/avatars/avatar10.jpg" },
      { rank: 4, name: "PremierPro", league: "EPL", score: 765, avatar: "/images/avatars/avatar19.jpg" },
      { rank: 5, name: "TopScorer", league: "EPL", score: 730, avatar: "/images/avatars/avatar20.jpg" }
    ]
  };
  
  const currentLeaderboard = leaderboardData[activeLeague as keyof typeof leaderboardData];
  
  const timeframes = [
    { id: 'week', name: 'This Week' },
    { id: 'month', name: 'This Month' },
    { id: 'alltime', name: 'All Time' }
  ];
  
  const [activeTimeframe, setActiveTimeframe] = useState<string>('week');
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">🏆 Leaderboard</h1>
          <p className="text-xl text-gray-300">See who's dominating the trivia challenges!</p>
        </motion.div>
        
        <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden mb-12">
          <div className="p-6 bg-gray-900">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex flex-wrap gap-2 justify-center">
                {leagues.map((league) => (
                  <button
                    key={league.id}
                    onClick={() => setActiveLeague(league.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeLeague === league.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {league.emoji && <span className="mr-2">{league.emoji}</span>}
                    {league.name}
                  </button>
                ))}
              </div>
              
              <div className="flex gap-2">
                {timeframes.map((timeframe) => (
                  <button
                    key={timeframe.id}
                    onClick={() => setActiveTimeframe(timeframe.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeTimeframe === timeframe.id
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {timeframe.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-800 border-b border-gray-700">
                  <th className="py-4 px-6 text-left text-gray-400 font-medium">Rank</th>
                  <th className="py-4 px-6 text-left text-gray-400 font-medium">Player</th>
                  <th className="py-4 px-6 text-left text-gray-400 font-medium">League</th>
                  <th className="py-4 px-6 text-left text-gray-400 font-medium">Score</th>
                  <th className="py-4 px-6 text-right text-gray-400 font-medium">Achievement</th>
                </tr>
              </thead>
              <tbody>
                {currentLeaderboard.map((player, index) => (
                  <motion.tr 
                    key={player.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className="border-b border-gray-700 hover:bg-gray-750 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold ${
                        player.rank === 1 ? 'bg-yellow-500 text-gray-900' :
                        player.rank === 2 ? 'bg-gray-300 text-gray-900' :
                        player.rank === 3 ? 'bg-amber-700 text-white' :
                        'bg-gray-700 text-gray-300'
                      }`}>
                        {player.rank}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-600 mr-3 overflow-hidden flex-shrink-0">
                          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600" />
                        </div>
                        <span className="font-medium text-white">{player.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        player.league === 'NFL' ? 'bg-blue-900 text-blue-200' :
                        player.league === 'NBA' ? 'bg-red-900 text-red-200' :
                        player.league === 'MLB' ? 'bg-blue-950 text-blue-200' :
                        'bg-purple-900 text-purple-200'
                      }`}>
                        {player.league}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-semibold text-green-400">{player.score}</td>
                    <td className="py-4 px-6 text-right">
                      {player.rank <= 3 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-900 text-indigo-200">
                          {player.rank === 1 ? '🥇 Champion' : player.rank === 2 ? '🥈 Expert' : '🥉 Master'}
                        </span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-4">⭐ Hall of Fame</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['NFL', 'NBA', 'MLB'].map((league) => (
              <div key={league} className="bg-gray-900 rounded-lg p-5 border-t-4 border-blue-500">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">{league} Legends</h3>
                  <span className="text-2xl">
                    {league === 'NFL' ? '🏈' : league === 'NBA' ? '🏀' : '⚾'}
                  </span>
                </div>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 mr-3" />
                        <span className="text-gray-300">Player {i}</span>
                      </div>
                      <span className="font-semibold text-blue-400">999{i} pts</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}