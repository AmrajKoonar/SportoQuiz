// src/app/quiz/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
  
  const [username, setUsername] = useState("");
  const [sport, setSport] = useState("");
  const [customSport, setCustomSport] = useState("");
  const [difficulty, setDifficulty] = useState<"Rookie" | "Pro" | "Hall of Fame">("Rookie");

  const startModalRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const howToPlayRef = useRef<HTMLDivElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);
  const quizContainerRef = useRef<HTMLDivElement>(null);
  const completeModalRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLButtonElement[]>([]);
  const explanationRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (showStartModal && heroSectionRef.current && howToPlayRef.current && formContainerRef.current) {
      const tl = gsap.timeline();
      
      tl.fromTo(heroSectionRef.current,
        { opacity: 0, y: -50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" }
      )
      .fromTo(howToPlayRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      )
      .fromTo(formContainerRef.current,
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.2)" },
        "-=0.3"
      );

      // gsap.from(".step-card", {
      //   opacity: 0,
      //   x: -30,
      //   duration: 0.6,
      //   stagger: 0.2,
      //   ease: "power2.out",
      //   delay: 0.5
      // });
    }
  }, [showStartModal]);

  useEffect(() => {
    if (quizComplete && completeModalRef.current) {
      gsap.fromTo(completeModalRef.current,
        { opacity: 0, scale: 0.8, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.2)" }
      );
    }
  }, [quizComplete]);

  useEffect(() => {
    if (!showStartModal && !quizComplete && quizData && quizContainerRef.current) {
      gsap.fromTo(quizContainerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [showStartModal, quizComplete, quizData]);

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

  const handleOptionSelect = (option: string, index: number) => {
    if (isAnswered || !quizData) return;
    
    const answerTime = Date.now() - answerStartTime;
    const timeSpent = Math.max(0, 15 - timeLeft);
    
    setSelectedOption(option);
    setIsAnswered(true);
    
    if (optionsRef.current[index]) {
      gsap.to(optionsRef.current[index], {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1
      });
    }
    
    if (option === quizData.questions[currentQuestionIndex].correctAnswer) {
      const basePoints = 10;
      const speedMultiplier = Math.max(0.1, (15 - timeSpent) / 15);
      const difficultyMultiplier = difficulty === "Hall of Fame" ? 2 : difficulty === "Pro" ? 1.5 : 1;
      
      const earnedPoints = Math.round(basePoints * speedMultiplier * difficultyMultiplier);
      setScore(prevScore => prevScore + earnedPoints);
    }
    
    setShowExplanation(true);
    
    if (explanationRef.current) {
      gsap.fromTo(explanationRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power2.out", delay: 0.3 }
      );
    }
  };

  const handleNextQuestion = () => {
    if (!quizData) return;
    
    if (currentQuestionIndex < quizData.questions.length - 1) {
      gsap.to(quizContainerRef.current, {
        opacity: 0,
        x: -30,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setCurrentQuestionIndex(prevIndex => prevIndex + 1);
          setSelectedOption(null);
          setIsAnswered(false);
          setShowExplanation(false);
          setTimeLeft(15);
          setAnswerStartTime(Date.now());
          
          gsap.fromTo(quizContainerRef.current,
            { opacity: 0, x: 30 },
            { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" }
          );
        }
      });
    } else {
      setQuizComplete(true);
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
    
    console.log("Quiz result:", quizResult);
    await fetch('/api/leaderboard', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(quizResult)
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
          sport: finalSport,
          difficulty: settings.difficulty,
          username: settings.username,
          previousQuizzes: JSON.parse(localStorage.getItem('previousQuizzes') || '[]')
        }),
      });

      const data = await response.json();

      if (data.errorCode === 1) {
        alert(`"${finalSport}" is not a recognized sport. Please enter a valid sport.`);
        setCustomSport("");
        return false;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch quiz data');
      }

      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('previousQuizzes');
        const previousQuizzes: QuizData[] = stored ? JSON.parse(stored) : [];
        previousQuizzes.push(data);
        localStorage.setItem('previousQuizzes', JSON.stringify(previousQuizzes));
      }

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
      gsap.to(startModalRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => setShowStartModal(false)
      });
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
      return "bg-gray-800 hover:bg-gray-700 border-gray-600";
    }

    if (option === currentQuestion.correctAnswer) {
      return "bg-green-700 text-white border-green-500";
    }

    if (option === selectedOption && option !== currentQuestion.correctAnswer) {
      return "bg-red-700 text-white border-red-500";
    }

    return "bg-gray-800 opacity-70 border-gray-600";
  };

  const getQuizTitle = () => {
    if (sport && sport !== "Other") {
      return `${sport} Trivia Challenge`;
    } else if (sport === "Other" && customSport) {
      return `${customSport} Trivia Challenge`;
    }
    return "SportoQuiz Challenge";
  };

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-b from-blue-900 via-gray-900 to-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {showStartModal && (
          <div ref={startModalRef}>
            <div ref={heroSectionRef} className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 bg-gradient-to-r from-blue-300 via-white to-indigo-300 bg-clip-text text-transparent">
                Choose Your Quiz Challenge
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Select a sports league below to begin your trivia challenge. Each quiz features questions about teams, players, history, and memorable moments.
              </p>
            </div>

            <div ref={howToPlayRef} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 shadow-2xl mb-12 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="text-3xl mr-3">📋</span>
                How to Play
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="step-card flex flex-col items-center text-center p-6 bg-gray-700 rounded-lg border border-gray-600">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-2xl font-bold mb-4">🏈</div>
                  <h3 className="text-xl font-semibold text-white mb-2">Choose a League</h3>
                  <p className="text-gray-300">Select from NFL, NBA, MLB, or EPL quizzes based on your favorite sport.</p>
                </div>
                <div className="step-card flex flex-col items-center text-center p-6 bg-gray-700/50 rounded-lg border border-gray-600">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white text-2xl font-bold mb-4">⚙️</div>
                  <h3 className="text-xl font-semibold text-white mb-2">Select Difficulty</h3>
                  <p className="text-gray-300">Pick your challenge level from beginner to expert based on your knowledge.</p>
                </div>
                <div className="step-card flex flex-col items-center text-center p-6 bg-gray-700/50 rounded-lg border border-gray-600">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-600 text-white text-2xl font-bold mb-4">⏰</div>
                  <h3 className="text-xl font-semibold text-white mb-2">Beat the Clock</h3>
                  <p className="text-gray-300">Answer questions correctly and quickly to earn a spot on the leaderboard.</p>
                </div>
              </div>
            </div>

            <div ref={formContainerRef} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 shadow-2xl border border-gray-700">
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 flex items-center justify-center">
                  <span className="text-4xl mr-3">🏆</span> SportoQuiz Challenge
                </h1>
                <p className="text-gray-300">Test your knowledge of sports teams, players, history and more!</p>
              </div>

              <div className="mb-8">
                <label className="block text-gray-300 mb-2 font-medium">Enter your username:</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder="Username"
                />
              </div>

              <div className="mb-8">
                <label className="block text-gray-300 mb-2 font-medium">Select a sport:</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {sportOptions.map((option) => (
                    <button
                      key={option.value}
                      className={`p-3 rounded-lg transition text-left border ${
                        sport === option.value
                          ? "bg-blue-600 text-white border-blue-500"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600 border-gray-600"
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
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                      placeholder="Enter custom sport (e.g., Rugby, Tennis, etc.)"
                    />
                  </div>
                )}
              </div>

              <div className="mb-8">
                <label className="block text-gray-300 mb-2 font-medium">Select difficulty:</label>
                <div className="grid grid-cols-3 gap-4">
                  {(["Rookie", "Pro", "Hall of Fame"] as const).map((level) => (
                    <button
                      key={level}
                      className={`p-3 rounded-lg transition border ${
                        difficulty === level
                          ? "bg-blue-600 text-white border-blue-500"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600 border-gray-600"
                      }`}
                      onClick={() => setDifficulty(level)}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <span className="text-2xl mr-2">📜</span>
                  Quiz Rules:
                </h3>
                <ul className="list-disc pl-8 text-gray-300 space-y-2">
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
                  className={`px-8 py-3 rounded-lg text-white font-medium transition transform ${
                    username.trim() && sport && (sport !== "Other" || customSport.trim()) && !isLoading
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 hover:scale-105 shadow-lg hover:shadow-blue-500/25"
                      : "bg-gray-600 cursor-not-allowed"
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Loading Quiz...
                    </div>
                  ) : (
                    "Start Quiz"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {quizComplete && (
          <div ref={completeModalRef} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 shadow-2xl border border-gray-700">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center justify-center">
                <span className="text-4xl mr-3">🎉</span>
                Quiz Complete!
              </h2>
              <div className="mb-8">
                <p className="text-gray-300 text-lg mb-2">
                  Thanks for playing, <span className="font-medium text-white">{username}</span>!
                </p>
                <p className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text">Your Score: {score}</p>
              </div>

              <div className="bg-gray-700/50 rounded-lg p-6 mb-8 border border-gray-600">
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
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium rounded-lg transition transform hover:scale-105"
                >
                  Play Again
                </button>
                <Link
                  href="/leaderboard"
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition transform hover:scale-105 text-center"
                >
                  View Leaderboard
                </Link>
                <button
                  onClick={restartQuiz}
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition transform hover:scale-105"
                >
                  Try Another Quiz
                </button>
              </div>
            </div>
          </div>
        )}

        {!showStartModal && !quizComplete && (
          <div ref={quizContainerRef} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-700">
            {quizData && currentQuestion ? (
              <>
                <div className="p-6 bg-gradient-to-r from-blue-800 via-indigo-800 to-blue-900 border-b border-gray-700">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-blue-200 font-medium">{getQuizTitle()} — {difficulty}</p>
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
                    <div className="flex items-center bg-gray-700/50 px-3 py-1 rounded-full border border-gray-600">
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
                      <button
                        key={index}
                        ref={el => {
                          if (el) optionsRef.current[index] = el;
                        }}
                        className={`w-full p-4 rounded-lg text-left text-white transition border ${getOptionStyles(option)}`}
                        disabled={isAnswered}
                        onClick={() => handleOptionSelect(option, index)}
                      >
                        <div className="flex items-center">
                          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 mr-3 text-sm font-medium">
                            {String.fromCharCode(65 + index)}
                          </span>
                          {option}
                        </div>
                      </button>
                    ))}
                  </div>

                  {showExplanation && (
                    <div
                      ref={explanationRef}
                      className="mb-6 p-4 rounded-lg bg-gray-700/50 border border-gray-600"
                    >
                      <h4 className="font-bold text-white mb-2 flex items-center">
                        <span className="text-lg mr-2">💡</span>
                        Explanation:
                      </h4>
                      <p className="text-gray-300">{currentQuestion.explanation}</p>
                    </div>
                  )}

                  {isAnswered && (
                    <div className="text-center">
                      <button
                        onClick={handleNextQuestion}
                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-lg transition transform hover:scale-105 shadow-lg"
                      >
                        {currentQuestionIndex < quizData.questions.length - 1 ? "Next Question" : "Finish Quiz"}
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="p-6 text-center">
                <div className="text-white flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mr-3"></div>
                  Loading quiz...
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}