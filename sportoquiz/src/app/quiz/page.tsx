'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function QuizPage() {
  const leagues = [
    {
      id: 'nfl',
      name: 'NFL',
      emoji: '🏈',
      color: 'from-blue-800 to-blue-900',
      hoverColor: 'from-blue-700 to-blue-800',
      description: 'Test your knowledge of American football teams, players, and history.',
      difficulty: ['Rookie', 'Pro', 'Hall of Fame'],
      image: '/images/nfl-bg.jpg',
    },
    {
      id: 'nba',
      name: 'NBA',
      emoji: '🏀',
      color: 'from-red-800 to-red-900',
      hoverColor: 'from-red-700 to-red-800',
      description: 'Challenge yourself with basketball trivia from the NBA.',
      difficulty: ['Benchwarmer', 'Starter', 'All-Star'],
      image: '/images/nba-bg.jpg',
    },
    {
      id: 'mlb',
      name: 'MLB',
      emoji: '⚾',
      color: 'from-blue-900 to-indigo-900',
      hoverColor: 'from-blue-800 to-indigo-800',
      description: 'Show off your baseball knowledge with MLB trivia questions.',
      difficulty: ['Minor League', 'Major League', 'World Series'],
      image: '/images/mlb-bg.jpg',
    },
    {
      id: 'epl',
      name: 'EPL',
      emoji: '⚽',
      color: 'from-purple-800 to-purple-900',
      hoverColor: 'from-purple-700 to-purple-800',
      description: 'Prove your English Premier League football expertise.',
      difficulty: ['Amateur', 'Professional', 'Champion'],
      image: '/images/epl-bg.jpg',
    },
  ];

  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Choose Your Quiz Challenge
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Select a sports league below to begin your trivia challenge. Each quiz features questions about teams, players, history, and memorable moments.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {leagues.map((league) => (
            <motion.div
              key={league.id}
              className="relative overflow-hidden rounded-xl shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: leagues.findIndex(l => l.id === league.id) * 0.1 + 0.5, duration: 0.6 }}
              onMouseEnter={() => setHoveredCard(league.id)}
              onMouseLeave={() => setHoveredCard(null)}
              whileHover={{ scale: 1.02 }}
            >
              <Link href={`/quiz/${league.id}`}>
                <div className="h-64 relative">
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${league.image})` }} />
                  <div className={`absolute inset-0 bg-gradient-to-br ${league.color} opacity-80`} />
                  
                  <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
                    <div className="flex items-center">
                      <span className="text-3xl mr-3">{league.emoji}</span>
                      <h2 className="text-2xl font-bold">{league.name}</h2>
                    </div>
                    
                    <div>
                      <p className="mb-4">{league.description}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {league.difficulty.map((level) => (
                          <span 
                            key={level} 
                            className="inline-block px-3 py-1 text-sm bg-white bg-opacity-20 rounded-full"
                          >
                            {level}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div 
                  className={`py-4 px-6 bg-gradient-to-r ${
                    hoveredCard === league.id ? league.hoverColor : league.color
                  } transition-all duration-300`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">Start Quiz</span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-white" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-4">How to Play</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-600 text-white text-2xl mb-4">1</div>
              <h3 className="text-xl font-semibold text-white mb-2">Choose a League</h3>
              <p className="text-gray-300">Select from NFL, NBA, MLB, or EPL quizzes based on your favorite sport.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-600 text-white text-2xl mb-4">2</div>
              <h3 className="text-xl font-semibold text-white mb-2">Select Difficulty</h3>
              <p className="text-gray-300">Pick your challenge level from beginner to expert based on your knowledge.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-600 text-white text-2xl mb-4">3</div>
              <h3 className="text-xl font-semibold text-white mb-2">Beat the Clock</h3>
              <p className="text-gray-300">Answer questions correctly and quickly to earn a spot on the leaderboard.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}