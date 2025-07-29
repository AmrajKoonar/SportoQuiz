# 🏆 SportoQuiz

An interactive sports trivia web app that generates AI-powered questions based on real-world player data and lets users compete through a live leaderboard. Built with Next.js, TypeScript, Tailwind CSS, and powered by OpenAI + balldontlie APIs.

---

## 🎯 Features

- 🧠 **AI-Generated Trivia**: Questions created by OpenAI using real player stats from the balldontlie API.
- 🏆 **Real-Time Leaderboard**: Compete with others and track your ranking live.
- 🏈 **Multi-League Support**: Choose from 4 leagues — **NFL**, **NBA**, **MLB**, and **EPL**.
- 🎯 **3 Difficulty Modes**: Select from Rookie, Pro, and Hall of Fame.
- 📇 **Contact Page**: Submit feedback or suggestions using the built-in contact form.
- ⚡ **Fast & Responsive UI**: Built with Tailwind CSS for smooth performance and styling.
- 🔁 **CI/CD Integration**: Auto-deploys using GitHub and Vercel for seamless updates.

---

## 🛠️ Setup & Installation

This is a Next.js 14 project using Tailwind CSS, TypeScript, and 2 external APIs.

### 1. **Clone the Repository**
```bash
git clone https://github.com/your-username/sportoquiz.git
cd sportoquiz
```

### 2. **Install Dependencies**
```bash
npm install
# or
yarn install
```

### 3. **Add Environment Variables**

Create a `.env.local` file in the root directory and add:

```env
OPENAI_API_KEY=your_openai_api_key
```

### 4. **Run the Development Server**
```bash
npm run dev
# or
yarn dev
```

Then open your browser and go to:
```
http://localhost:3000
```

---

## 📌 Links

- 🌐 **Live Website**: [sporto-quiz.vercel.app](https://sporto-quiz.vercel.app)

---

## 🧠 Tech Stack

- **Frontend**: Next.js 14, React 19, TypeScript, TailwindCSS
- **APIs**: OpenAI API, [balldontlie API](https://www.balldontlie.io/)
- **Deployment**: Vercel (CI/CD auto-deploy from GitHub)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
