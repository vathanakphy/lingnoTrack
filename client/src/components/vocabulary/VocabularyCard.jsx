import React from "react";

// Type colors for badges
const typeColors = {
  noun: "bg-blue-200 text-blue-800",
  verb: "bg-green-200 text-green-800",
  adjective: "bg-orange-200 text-orange-800",
  adverb: "bg-purple-200 text-purple-800",
  default: "bg-gray-200 text-gray-800",
};

export const VocabularyCard = ({ word, onClick }) => {
  return (
    <div
      onClick={() => onClick(word)}
      className="cursor-pointer bg-white dark:bg-[#1A2632] rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm hover:shadow-md transition-all flex flex-col gap-2"
    >
      <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center justify-between">
        {word.word}
        <span
          className={`px-2 py-0.5 rounded-full text-xs font-medium ${
            typeColors[word.type] || typeColors.default
          }`}
        >
          {word.type}
        </span>
      </h3>
      <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2">{word.definition}</p>
    </div>
  );
};
