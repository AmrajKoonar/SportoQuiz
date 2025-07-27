import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-xl font-bold text-white mb-4">Sporto<span className="text-blue-400">Quiz</span></h2>
            <p className="text-gray-400 mb-4">
              Test your knowledge with our challenging sports quizzes across NFL, NBA, MLB, and EPL leagues.
            </p>
            <div className="flex space-x-4">
             <a href="https://www.linkedin.com/in/amraj-koonar/" className="text-gray-400 hover:text-white">
               <span className="sr-only">LinkedIn</span>
               <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                 <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 
                          5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 
                          19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.785-1.75-1.75s.784-1.75 
                          1.75-1.75 1.75.785 1.75 1.75-.784 1.75-1.75 
                          1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.059-1.865-3.059-1.868 
                          0-2.154 1.459-2.154 2.969v5.694h-3v-10h2.881v1.367h.041c.401-.762 
                          1.379-1.567 2.839-1.567 3.036 0 3.6 2 3.6 4.59v5.61z" />
               </svg>
             </a>
              <a href="https://github.com/AmrajKoonar/SportoQuiz" className="text-gray-400 hover:text-white">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase mb-4">Quizzes</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/quiz?league=NFL" className="text-gray-400 hover:text-white transition duration-150">
                  NFL Quizzes
                </Link>
              </li>
              <li>
                <Link href="/quiz?league=NBA" className="text-gray-400 hover:text-white transition duration-150">
                  NBA Quizzes
                </Link>
              </li>
              <li>
                <Link href="/quiz?league=NHL" className="text-gray-400 hover:text-white transition duration-150">
                  NHL Quizzes
                </Link>
              </li>
              <li>
                <Link href="/quiz?league=MLB" className="text-gray-400 hover:text-white transition duration-150">
                  MLB Quizzes
                </Link>
              </li>
              <li>
                <Link href="/quiz?league=EPL" className="text-gray-400 hover:text-white transition duration-150">
                  EPL Quizzes
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition duration-150">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="text-gray-400 hover:text-white transition duration-150">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition duration-150">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition duration-150">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition duration-150">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-gray-400 text-sm text-center">
            &copy; {new Date().getFullYear()} SportoQuiz. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs text-center mt-2">
            Powered by <a href="https://github.com/marketplace/models/azure-openai/gpt-4o-mini/playground" className="hover:text-gray-400 transition duration-150">OpenAI GPT-4o mini</a>
          </p>
        </div>
      </div>
    </footer>
  );
}