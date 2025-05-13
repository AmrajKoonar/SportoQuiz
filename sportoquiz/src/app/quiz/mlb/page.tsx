'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const MLB_QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Which MLB team has won the most World Series championships?",
    options: ["New York Yankees", "St. Louis Cardinals", "Boston Red Sox", "Los Angeles Dodgers"],
    correctAnswer: "New York Yankees",
    explanation: "The New York Yankees have won 27 World Series championships."
  },
  {
    id: 2,
    question: "Who holds the MLB record for most career home runs?",
    options: ["Babe Ruth", "Hank Aaron", "Barry Bonds", "Alex Rodriguez"],
    correctAnswer: "Barry Bonds",
    explanation: "Barry Bonds holds the MLB record with 762 career home runs."
  },
  {
    id: 3,
    question: "Which player has the highest career batting average in MLB history?",
    options: ["Ty Cobb", "Rogers Hornsby", "Ted Williams", "Babe Ruth"],
    correctAnswer: "Ty Cobb",
    explanation: "Ty Cobb holds the highest career batting average at .366."
  },
  {
    id: 4,
    question: "What year was MLB's first World Series played?",
    options: ["1901", "1903", "1905", "1910"],
    correctAnswer: "1903",
    explanation: "The first World Series was played in 1903 between Boston and Pittsburgh."
  },
  {
    id: 5,
    question: "Which pitcher holds the record for most career strikeouts?",
    options: ["Randy Johnson", "Roger Clemens", "Nolan Ryan", "Walter Johnson"],
    correctAnswer: "Nolan Ryan",
    explanation: "Nolan Ryan holds the MLB record with 5,714 career strikeouts."
  }
];

export default function MLBQuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [quizComplete, setQuizComplete] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [username, setUsername] = useState("");
  const [showStartModal, setShowStartModal] = useState(true);
  const [difficulty, setDifficulty] = useState<"Rookie" | "Pro" | "Hall of Fame">("Rookie");

  useEffect(() => {
    if (showStartModal || quizComplete || isAnswered || showExplanation) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, showStartModal, quizComplete, isAnswered, showExplanation]);

  const handleTimeout = () => {
    setIsAnswered(true);
    setShowExplanation(true);
  };

  const handleOptionSelect = (option: string) => {
    if (isAnswered) return;
    
    setSelectedOption(option);
    setIsAnswered(true);
    
    if (option === MLB_QUIZ_QUESTIONS[currentQuestionIndex].correctAnswer) {
      const timeBonus = Math.ceil(timeLeft / 3);
      setScore(prevScore => prevScore + 10 + timeBonus);
    }
    
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < MLB_QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setShowExplanation(false);
      setTimeLeft(15);
    } else {
      setQuizComplete(true);
    }
  };

  const startQuiz = () => {
    setShowStartModal(false);
    setTimeLeft(15);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setTimeLeft(15);
    setQuizComplete(false);
    setShowExplanation(false);
    setShowStartModal(true);
  };

  const currentQuestion = MLB_QUIZ_QUESTIONS[currentQuestionIndex];

  const getOptionStyles = (option: string) => {
    if (!isAnswered) {
      return "bg-gray-800 hover:bg-gray-700";
    }

    if (option === currentQuestion.correctAnswer) {
      return "bg-green-700 text-white";
    }

    if (option === selectedOption && option !== currentQuestion.correctAnswer) {
      return "bg-red-700 text-white";
    }

    return "bg-gray-800 opacity-70";
  };

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-b from-blue-900 to-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {showStartModal ? (
          <motion.div 
            className="bg-gray-800 rounded-xl p-8 shadow-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 flex items-center justify-center">
                <span className="text-4xl mr-3">⚾</span> MLB Trivia Challenge
              </h1>
              <p className="text-gray-300">Test your knowledge of baseball teams, players, history and more!</p>
            </div>

            <div className="mb-8">
              <label className="block text-gray-300 mb-2">Enter your username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Username"
              />
            </div>

            <div className="mb-8">
              <label className="block text-gray-300 mb-2">Select difficulty:</label>
              <div className="grid grid-cols-3 gap-4">
                {(["Rookie", "Pro", "Hall of Fame"] as const).map((level) => (
                  <button
                    key={level}
                    className={`p-3 rounded-lg transition ${
                      difficulty === level
                        ? "bg-blue-600 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                    onClick={() => setDifficulty(level)}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">Quiz Rules:</h3>
              <ul className="list-disc pl-5 text-gray-300 space-y-2">
                <li>You have 15 seconds to answer each question</li>
                <li>Answer correctly to earn points</li>
                <li>Faster answers earn bonus points</li>
                <li>No changing your answer once selected</li>
                <li>Complete all questions to see your final score</li>
              </ul>
            </div>

            <div className="flex justify-center">
              <button
                onClick={startQuiz}
                disabled={!username.trim()}
                className={`px-8 py-3 rounded-lg text-white font-medium transition ${
                  username.trim()
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-600 cursor-not-allowed"
                }`}
              >
                Start Quiz
              </button>
            </div>
          </motion.div>
        ) : quizComplete ? (
          <motion.div 
            className="bg-gray-800 rounded-xl p-8 shadow-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-6">Quiz Complete!</h2>
              <div className="mb-8">
                <p className="text-gray-300 text-lg mb-2">
                  Thanks for playing, <span className="font-medium text-white">{username}</span>!
                </p>
                <p className="text-2xl font-bold text-blue-400">Your Score: {score}</p>
              </div>

              <div className="bg-gray-700 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Performance Summary</h3>
                <div className="flex justify-around">
                  <div className="text-center">
                    <p className="text-gray-400 text-sm">Questions</p>
                    <p className="text-2xl font-bold text-white">{MLB_QUIZ_QUESTIONS.length}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400 text-sm">Difficulty</p>
                    <p className="text-2xl font-bold text-white">{difficulty}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400 text-sm">Avg Speed</p>
                    <p className="text-2xl font-bold text-white">8.5s</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={restartQuiz}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
                >
                  Play Again
                </button>
                <Link
                  href="/leaderboard"
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition"
                >
                  View Leaderboard
                </Link>
                <Link
                  href="/quiz"
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition"
                >
                  Try Another Sport
                </Link>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            className="bg-gray-800 rounded-xl overflow-hidden shadow-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="p-6 bg-gradient-to-r from-blue-800 to-blue-900">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-blue-200">MLB Quiz — {difficulty}</p>
                  <h2 className="text-2xl font-bold text-white">Question {currentQuestionIndex + 1}/{MLB_QUIZ_QUESTIONS.length}</h2>
                </div>
                <div className="text-right">
                  <p className="text-blue-200">Score</p>
                  <p className="text-2xl font-bold text-white">{score}</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-6 flex justify-between items-center">
                <span className="text-sm text-gray-400">User: {username}</span>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className={`font-mono text-lg font-bold ${timeLeft <= 5 ? 'text-red-500' : 'text-white'}`}>
                    {timeLeft}s
                  </span>
                </div>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-white mb-6">
                {currentQuestion.question}
              </h3>

              <div className="space-y-3 mb-6">
                {currentQuestion.options.map((option, index) => (
                  <motion.button
                    key={index}
                    className={`w-full p-4 rounded-lg text-left text-white transition ${getOptionStyles(option)}`}
                    disabled={isAnswered}
                    onClick={() => handleOptionSelect(option)}
                    whileHover={!isAnswered ? { scale: 1.01 } : {}}
                    whileTap={!isAnswered ? { scale: 0.99 } : {}}
                  >
                    <div className="flex items-center">
                      <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 mr-3 text-sm">
                        {String.fromCharCode(65 + index)}
                      </span>
                      {option}
                    </div>
                  </motion.button>
                ))}
              </div>

              {showExplanation && (
                <motion.div
                  className="mb-6 p-4 rounded-lg bg-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="font-bold text-white mb-2">Explanation:</h4>
                  <p className="text-gray-300">{currentQuestion.explanation}</p>
                </motion.div>
              )}

              {isAnswered && (
                <div className="text-center">
                  <button
                    onClick={handleNextQuestion}
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition"
                  >
                    {currentQuestionIndex < MLB_QUIZ_QUESTIONS.length - 1 ? "Next Question" : "Finish Quiz"}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}