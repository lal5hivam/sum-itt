import Hero from "./components/Hero";
import FeatureCard from "./components/FeatureCard";
import Summarizer from "./pages/Summarizer";
import ExpenseTracker from "./pages/ExpenseTracker";
import Sumscriptor from "./pages/Sumscriptor";
import TopicSplitter from "./pages/TopicSplitter";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatBotWidget from "./components/ChatBotWidget";
import TalkWithNotes from './pages/TalkWithNotes';
import FlashcardGenerator from './pages/FlashcardGenerator';


import { motion } from "framer-motion";

const App = () => {
  const cards = [
    {
      icon: "📄",
      title: "PDF/Text Summarizer",
      content: <Summarizer />,
    },
    {
      icon: "📊",
      title: "Bank Statement Expense Tracker",
      content: <ExpenseTracker />,
    },
    {
      icon: "🎙️",
      title: "Sumscriptor – Voice & Video to Notes",
      content: <Sumscriptor />,
    },
    {
      icon: "📚",
      title: "Topic-wise Notes Splitter",
      content: <TopicSplitter />,
    },
    {
      icon: "📄",
      title: "Talk-with-Notes",
      content: <TalkWithNotes />,
    },
    {
      icon: "🧠",
      title: "Flashcard Generator",
      content: <FlashcardGenerator />,
    },    
  ];
<main className="min-h-screen py-16 px-4 bg-gray-950 flex justify-center">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-5xl justify-items-center">
    {cards.map((card, idx) => (
      <FeatureCard
        key={idx}
        icon={card.icon}
        title={card.title}
      >
        {card.content}
      </FeatureCard>
    ))}
  </div>
</main>



  return (
    <div className="bg-gray-900 text-white">
      <Navbar />
      <Hero />
      <ChatBotWidget />

      <main className="max-w-7xl mx-auto px-4 py-16 space-y-16">
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <FeatureCard icon={card.icon} title={card.title}>
              {card.content}
            </FeatureCard>
          </motion.div>
        ))}
      </main>

      <Footer />
    </div>
  );
};

export default App;
