import { useState } from "react";
import { FiRefreshCcw, FiHelpCircle, FiEye, FiEyeOff } from "react-icons/fi";

const TopicHeader = ({ topic, hint, generateTopic }) => {
  const [showHint, setShowHint] = useState(false);
  const [loadingTopic, setLoadingTopic] = useState(false);

  const handleGenerate = async () => {
    setLoadingTopic(true);
    try {
      await generateTopic(); // parent function generates and sets topic/hint
    } finally {
      setLoadingTopic(false);
    }
  };

  return (
    <div className="mb-8 rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-sm">
      {/* Topic Label */}
      <p className="text-sm text-slate-500 mb-1">Writing Topic</p>

      {/* Topic and New Topic Button */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          {loadingTopic ? "Generating topic..." : topic || "No Topic Yet"}
        </h1>

        <button
          onClick={handleGenerate}
          disabled={loadingTopic}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg
            bg-blue-500 text-white font-semibold hover:bg-blue-600
            ${loadingTopic ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          <FiRefreshCcw
            className={loadingTopic ? "animate-spin" : ""}
            size={18}
          />
          {loadingTopic ? "Loading..." : "New Topic"}
        </button>
      </div>

      {/* Writing Hint Section */}
      {hint && (
        <div className="mt-4 rounded-xl border border-slate-200 dark:border-slate-800
          bg-white dark:bg-slate-900 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-3
            border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
              <FiHelpCircle /> Writing Hint
            </div>

            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium
                bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            >
              {showHint ? <FiEyeOff /> : <FiEye />}
              {showHint ? "Hide Hint" : "Show Hint"}
            </button>
          </div>

          {showHint && (
            <div className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">
              💡 {hint}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TopicHeader;
