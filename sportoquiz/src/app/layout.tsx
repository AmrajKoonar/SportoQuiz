// src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import Navbar from './components/navbar';
import Footer from './components/footer';
import SmoothScrollWrapper from './components/SmoothScrollWrapper';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sports Trivia Challenge',
  description: 'Test your sports knowledge with quizzes on NFL, NBA, MLB, and EPL',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} min-h-screen flex flex-col`}>
        <Navbar />

        {/* Wrap everything scroll‑able in your smooth scroll container */}
        <SmoothScrollWrapper>
          <main className="flex-grow">
            {children}
          </main>
        </SmoothScrollWrapper>

        <Footer />
      </body>
    </html>
  );
}
