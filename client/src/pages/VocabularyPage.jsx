// pages/VocabularyPage.jsx
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import VocabularyHint from "../components/vocabulary/VocabularyHint";
import { VocabularyList } from "../components/vocabulary/VocabularyList";
import { fetchCurrentWord, fetchWords } from "../services/vocabularyService";

const DAILY_GOAL = 20;

const VocabularyPage = () => {
  // --- State ---
  const [currentWord, setCurrentWord] = useState(null);
  const [dailyWords, setDailyWords] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- Fetch all data when component mounts ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch today's current word
        const current = await fetchCurrentWord();
        // Fetch today's full vocabulary list (limit to DAILY_GOAL)
        const list = await fetchWords({ date: new Date().toISOString().split("T")[0], limit: DAILY_GOAL });

        setCurrentWord(current); // array or object depending on your API
        setDailyWords(list?.data || []);
      } catch (error) {
        console.error("Failed to load vocabulary data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // --- Show loading skeleton while fetching ---
  if (loading || !currentWord || !dailyWords) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="w-full max-w-2xl p-8 space-y-4">
          <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3 animate-pulse"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded w-full animate-pulse"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded w-5/6 animate-pulse"></div>
          <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  // --- Render UI only after all data is ready ---
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-8 md:p-10">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Vocabulary Learning
          </h1>
          <p className="text-slate-500 dark:text-[#94a3b8] text-lg mb-6">
            Learn and track {DAILY_GOAL} words per day
          </p>

          {/* --- Hint Section --- */}
          <VocabularyHint currentWord={currentWord} />

          {/* --- Vocabulary List --- */}
          <VocabularyList dailyGoal={DAILY_GOAL}  words={dailyWords} />
        </div>
      </main>
    </div>
  );
};

export default VocabularyPage;
