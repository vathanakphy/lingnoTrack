import { useState, useEffect } from "react";
import { FiHelpCircle, FiEye, FiEyeOff } from "react-icons/fi";
import { fetchHintWord } from "../../services/vocabularyService";

const VocabularyHint = () => {
  const [word, setWord] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHintWord().then((data) => {
      setWord(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="text-slate-600 dark:text-slate-400 mb-4">Loading hint...</div>;
  }

  return (
    <div className="mb-8 rounded-xl border border-slate-200 dark:border-slate-800
      bg-white dark:bg-slate-900 overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4
        border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
          <FiHelpCircle />
          Word Hint
        </div>

        <button
          onClick={() => setShowHint(!showHint)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
            bg-slate-100 dark:bg-slate-800
            hover:bg-slate-200 dark:hover:bg-slate-700 transition"
        >
          {showHint ? <FiEyeOff /> : <FiEye />}
          {showHint ? "Hide Hint" : "Show Hint"}
        </button>
      </div>

      {/* Hint Content */}
      {showHint && (
        <div className="px-6 py-5 space-y-3 text-sm">
          <div>
            <span className="font-semibold text-slate-600 dark:text-slate-400">Part of Speech:</span>{" "}
            <span className="font-bold text-blue-600">{word.partOfSpeech}</span>
          </div>

          <div>
            <span className="font-semibold text-slate-600 dark:text-slate-400">Usage Hint:</span>
            <p className="mt-1 text-slate-700 dark:text-slate-300">{word.usageHint}</p>
          </div>

          <div>
            <span className="font-semibold text-slate-600 dark:text-slate-400">Example Clue:</span>
            <p className="italic text-slate-600 dark:text-slate-400">{word.exampleHint}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VocabularyHint;
