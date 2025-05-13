'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function About() {
  const [activeTab, setActiveTab] = useState<string>('about');
  
  const tabItems = [
    { id: 'about', label: 'About Us' },
    { id: 'features', label: 'Features' },
    { id: 'how', label: 'How It Works' },
    { id: 'faq', label: 'FAQ' }
  ];
  
  const teamMembers = [
    {
      name: 'Alex Johnson',
      role: 'Founder & Lead Developer',
      bio: 'Sports enthusiast with 10+ years of experience in web development and a passion for creating interactive sports experiences.',
      avatar: '/images/team/alex.jpg'
    },
    {
      name: 'Sarah Thompson',
      role: 'Sports Data Specialist',
      bio: 'Former sports analyst with deep knowledge across multiple leagues. Ensures our quizzes are accurate and challenging.',
      avatar: '/images/team/sarah.jpg'
    },
    {
      name: 'Michael Rodriguez',
      role: 'UX/UI Designer',
      bio: 'Creates the seamless and engaging visual experience that makes our trivia challenges so addictive.',
      avatar: '/images/team/michael.jpg'
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
      answer: 'Our team of sports experts carefully crafts each question, ensuring accuracy and varying levels of difficulty. We update our question database regularly to include recent sports events and statistics.'
    },
    {
      question: 'Is the app free to use?',
      answer: 'Yes! The basic version of our sports trivia app is completely free. We offer premium features for dedicated users who want an enhanced experience with additional question sets and no advertisements.'
    },
    {
      question: 'How often are new questions added?',
      answer: 'We add new questions weekly, with major updates after significant sporting events like championships, drafts, or transfer windows.'
    },
    {
      question: 'Can I suggest new features or leagues?',
      answer: 'Absolutely! We welcome user feedback and suggestions. Please use our contact form to share your ideas for new leagues, features, or question categories.'
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
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'about':
        return (
          <div>
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
              <p className="text-gray-300 text-lg mb-6">
                Sports Trivia Challenge was born out of our passion for sports and competitive trivia. We wanted to create a platform where fans could test their knowledge, learn interesting facts, and compete with other enthusiasts around the world.
              </p>
              <p className="text-gray-300 text-lg mb-6">
                Launched in 2023, our platform has grown to include thousands of questions across multiple professional leagues. Whether you're a casual fan or a sports statistics expert, we've designed our quizzes to be both challenging and enjoyable.
              </p>
              <p className="text-gray-300 text-lg">
                Our mission is to celebrate sports knowledge and create a community where fans can engage with their favorite leagues in a fun, interactive way.
              </p>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Our Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="bg-gray-800 rounded-xl overflow-hidden shadow-lg"
                  >
                    <div className="h-48 bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-gray-800 text-2xl font-bold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                      <p className="text-blue-400 mb-4">{member.role}</p>
                      <p className="text-gray-300">{member.bio}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'features':
        return (
          <div>
            <h2 className="text-3xl font-bold text-white mb-8">Platform Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-gray-300 text-lg mb-6">Ready to put your sports knowledge to the test?</p>
              <Link 
                href="/#league-selection" 
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-lg font-semibold py-3 px-8 rounded-full transition duration-300 inline-block"
              >
                Start a Quiz Now
              </Link>
            </div>
          </div>
        );
      
      case 'how':
        return (
          <div>
            <h2 className="text-3xl font-bold text-white mb-10">How It Works</h2>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-700 hidden md:block"></div>
              
              {howItWorks.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  className="mb-12 md:flex items-center"
                >
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:order-2'}`}>
                    <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
                      <h3 className="text-xl font-bold text-white mb-2">
                        <span className="text-blue-400">Step {item.step}:</span> {item.title}
                      </h3>
                      <p className="text-gray-300">{item.description}</p>
                    </div>
                  </div>
                  
                  <div className={`hidden md:flex items-center justify-center z-10 ${index % 2 === 0 ? 'md:order-2' : ''}`}>
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl">
                      {item.icon}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <Link 
                href="/quiz" 
                className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white text-lg font-semibold py-3 px-8 rounded-full transition duration-300 inline-block"
              >
                Try It Now
              </Link>
            </div>
          </div>
        );
      
      case 'faq':
        return (
          <div>
            <h2 className="text-3xl font-bold text-white mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="bg-gray-800 rounded-xl overflow-hidden shadow-lg"
                >
                  <div className="px-6 py-5 bg-gray-750">
                    <h3 className="text-lg font-medium text-white flex items-center">
                      <span className="text-blue-400 mr-3">Q:</span>
                      {item.question}
                    </h3>
                  </div>
                  <div className="px-6 py-5">
                    <p className="text-gray-300">
                      <span className="text-green-400 font-bold mr-3">A:</span>
                      {item.answer}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-gray-300 mb-4">Still have questions?</p>
              <Link 
                href="/contact" 
                className="text-blue-400 hover:text-blue-300 font-medium transition duration-150"
              >
                Contact our support team →
              </Link>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Sports Trivia Challenge</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Where sports fans prove their knowledge and compete for trivia supremacy across NFL, NBA, MLB, and EPL leagues.
          </p>
        </motion.div>
        
        <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden mb-10">
          <div className="flex flex-wrap border-b border-gray-700">
            {tabItems.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-6 text-center font-medium transition-all focus:outline-none ${
                  activeTab === tab.id
                    ? 'text-white border-b-2 border-blue-500'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          <div className="p-8">
            {renderTabContent()}
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-xl p-8 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Ready to test your sports knowledge?</h2>
              <p className="text-lg text-blue-200">Join thousands of sports fans in our trivia challenges!</p>
            </div>
            <Link 
              href="/#league-selection" 
              className="bg-white hover:bg-gray-100 text-gray-900 font-semibold py-3 px-8 rounded-full transition duration-300 inline-block"
            >
              Start a Quiz
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}