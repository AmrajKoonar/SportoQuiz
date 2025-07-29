'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface QuizData {
  questions: Question[];
}

interface QuizSettings {
  username: string;
  sport: string;
  difficulty: "Rookie" | "Pro" | "Hall of Fame";
}

export default function SportsQuizPage() {

  const [preselectedLeague, setPreselectedLeague] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const league = params.get("league");
      if (league && ["NFL", "NBA", "MLB", "NHL", "EPL"].includes(league)) {
        setPreselectedLeague(league);
      }
    }
  }, []);

  useEffect(() => {
  if (preselectedLeague && !sport) {
    setSport(preselectedLeague);
  }
  }, [preselectedLeague]);


  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [quizComplete, setQuizComplete] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showStartModal, setShowStartModal] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [answerStartTime, setAnswerStartTime] = useState<number>(0);
  
  // Quiz settings
  const [username, setUsername] = useState("");
  const [sport, setSport] = useState("");
  const [customSport, setCustomSport] = useState("");
  const [difficulty, setDifficulty] = useState<"Rookie" | "Pro" | "Hall of Fame">("Rookie");

  const sportOptions = [
    { value: "NFL", label: "NFL (American Football)" },
    { value: "NBA", label: "NBA (Basketball)" },
    { value: "NHL", label: "NHL (Hockey)" },
    { value: "MLB", label: "MLB (Baseball)" },
    { value: "EPL", label: "EPL (European Soccer)" },
    { value: "Other", label: "Other (Custom Sport)" }
  ];

  useEffect(() => {
    if (showStartModal || quizComplete || isAnswered || showExplanation || !quizData) return;

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
  }, [currentQuestionIndex, showStartModal, quizComplete, isAnswered, showExplanation, quizData]);

  const handleTimeout = () => {
    setIsAnswered(true);
    setShowExplanation(true);
  };

  const handleOptionSelect = (option: string) => {
    if (isAnswered || !quizData) return;
    
    const answerTime = Date.now() - answerStartTime;
    const timeSpent = Math.max(0, 15 - timeLeft);
    
    setSelectedOption(option);
    setIsAnswered(true);
    
    if (option === quizData.questions[currentQuestionIndex].correctAnswer) {
      // Calculate score based on speed, correctness, and difficulty
      const basePoints = 10;
      const speedMultiplier = Math.max(0.1, (15 - timeSpent) / 15); // Faster = higher multiplier
      const difficultyMultiplier = difficulty === "Hall of Fame" ? 2 : difficulty === "Pro" ? 1.5 : 1;
      
      const earnedPoints = Math.round(basePoints * speedMultiplier * difficultyMultiplier);
      setScore(prevScore => prevScore + earnedPoints);
    }
    
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (!quizData) return;
    
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setShowExplanation(false);
      setTimeLeft(15);
      setAnswerStartTime(Date.now());
    } else {
      setQuizComplete(true);
      // Save final score (you can implement this to send to backend)
      saveQuizResult();
    }
  };

  const saveQuizResult = async () => {
    const finalSport = sport === "Other" ? customSport : sport;
    const quizResult = {
      username,
      sport: finalSport,
      difficulty,
      score,
      totalQuestions: quizData?.questions.length || 0
    };
    
    // TODO: Send to backend to save the result
    console.log("Quiz result:", quizResult);
    await fetch('/api/leaderboard', {
      method:   'POST',
      headers:  { 'Content-Type': 'application/json' },
      body:     JSON.stringify(quizResult)
    });
  };

  const fetchQuizData = async (settings: QuizSettings): Promise<boolean> => {
    setIsLoading(true);
    try {
      const finalSport = settings.sport === "Other" ? customSport : settings.sport;
      const response = await fetch('/api/quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        sport:      finalSport,
        difficulty: settings.difficulty,
        username:   settings.username,
        // pull in the same previousQuizzes you just wrote above:
        previousQuizzes: JSON.parse(localStorage.getItem('previousQuizzes') || '[]')
        }),
      });

      const data = await response.json();
      
      

      if (data.errorCode === 1) {
        alert(`"${finalSport}" is not a recognized sport. Please enter a valid sport.`);
        setCustomSport(""); // Clear the field
        return false;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch quiz data');
      }


      if (typeof window !== 'undefined') {
        // 1. load or default
        const stored = localStorage.getItem('previousQuizzes');
        const previousQuizzes: QuizData[] = stored ? JSON.parse(stored) : [];

        // 2. append the new quiz
        previousQuizzes.push(data);

        // 3. persist
        localStorage.setItem('previousQuizzes', JSON.stringify(previousQuizzes));
      }

      setQuizData(data);

      setQuizData(data);
      setAnswerStartTime(Date.now());
      return true;
    } catch (error) {
      console.error('Error fetching quiz data:', error);
      alert('Failed to load quiz. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };


  const startQuiz = async () => {
    if (!username.trim() || !sport || (sport === "Other" && !customSport.trim())) {
      alert('Please fill in all required fields');
      return;
    }

    const settings: QuizSettings = {
      username: username.trim(),
      sport,
      difficulty
    };

    const wasQuizLoaded = await fetchQuizData(settings);
    if (wasQuizLoaded) {
      setShowStartModal(false);
    }
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
    setQuizData(null);
  };

  const currentQuestion = quizData?.questions[currentQuestionIndex];

  const getOptionStyles = (option: string) => {
    if (!isAnswered || !currentQuestion) {
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

  const getQuizTitle = () => {
    if (sport && sport !== "Other") {
      return `${sport} Trivia Challenge`;
    } else if (sport === "Other" && customSport) {
      return `${customSport} Trivia Challenge`;
    }
    return "Sports Trivia Challenge";
  };

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-b from-blue-900 to-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      {/* only show this on the “start quiz” page */}
        {showStartModal && (
          <>
            {/* 🔹 INSERT NEW SECTION HERE */}
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

            <div className="bg-gray-800 rounded-xl p-8 shadow-lg mb-12">
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
            {/* 🔹 INSERT NEW SECTION HERE */}
          </>
        )}

        {showStartModal ? (
          <motion.div 
            className="bg-gray-800 rounded-xl p-8 shadow-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 flex items-center justify-center">
                <span className="text-4xl mr-3">🏆</span> Sports Trivia Challenge
              </h1>
              <p className="text-gray-300">Test your knowledge of sports teams, players, history and more!</p>
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
              <label className="block text-gray-300 mb-2">Select a sport:</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {sportOptions.map((option) => (
                  <button
                    key={option.value}
                    className={`p-3 rounded-lg transition text-left ${
                      sport === option.value
                        ? "bg-blue-600 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                    onClick={() => setSport(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              
              {sport === "Other" && (
                <div className="mt-4">
                  <input
                    type="text"
                    value={customSport}
                    onChange={(e) => setCustomSport(e.target.value)}
                    className="w-full p-3 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter custom sport (e.g., Rugby, Tennis, etc.)"
                  />
                </div>
              )}
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
                <li>Faster answers earn more points</li>
                <li>Higher difficulty levels award more points</li>
                <li>No changing your answer once selected</li>
                <li>Complete all questions to see your final score</li>
              </ul>
            </div>

            <div className="flex justify-center">
              <button
                onClick={startQuiz}
                disabled={!username.trim() || !sport || (sport === "Other" && !customSport.trim()) || isLoading}
                className={`px-8 py-3 rounded-lg text-white font-medium transition ${
                  username.trim() && sport && (sport !== "Other" || customSport.trim()) && !isLoading
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-600 cursor-not-allowed"
                }`}
              >
                {isLoading ? "Loading Quiz..." : "Start Quiz"}
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
                    <p className="text-2xl font-bold text-white">{quizData?.questions.length || 0}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400 text-sm">Sport</p>
                    <p className="text-2xl font-bold text-white">{sport === "Other" ? customSport : sport}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400 text-sm">Difficulty</p>
                    <p className="text-2xl font-bold text-white">{difficulty}</p>
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
                <button
                  onClick={restartQuiz}
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition"
                >
                  Try Another Quiz
                </button>
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
            {quizData && currentQuestion ? (
              <>
                <div className="p-6 bg-gradient-to-r from-blue-800 to-blue-900">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-blue-200">{getQuizTitle()} — {difficulty}</p>
                      <h2 className="text-2xl font-bold text-white">Question {currentQuestionIndex + 1}/{quizData.questions.length}</h2>
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
                        {currentQuestionIndex < quizData.questions.length - 1 ? "Next Question" : "Finish Quiz"}
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="p-6 text-center">
                <div className="text-white">Loading quiz...</div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}