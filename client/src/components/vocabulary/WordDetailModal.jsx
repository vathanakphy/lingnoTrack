import React, { useState } from "react";

const typeColors = {
  noun: "bg-blue-200 text-blue-800",
  verb: "bg-green-200 text-green-800",
  adjective: "bg-orange-200 text-orange-800",
  adverb: "bg-purple-200 text-purple-800",
  default: "bg-gray-200 text-gray-800",
};

export const WordDetailModal = ({ word, onClose }) => {
  const [imageError, setImageError] = useState(false);

  if (!word) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-[#1A2632] p-6 rounded-xl w-96 max-h-[80vh] overflow-y-auto">
        {/* Word header */}
        <h2 className="text-2xl font-bold mb-1 text-slate-900 dark:text-white flex items-center justify-between">
          {word.word}
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
              typeColors[word.type] || typeColors.default
            }`}
          >
            {word.type}
          </span>
        </h2>

        {/* Definition & Example */}
        <p className="text-slate-700 dark:text-slate-300 mb-2">{word.definition}</p>
        {word.example && (
          <p className="text-slate-500 italic mb-2">"{word.example}"</p>
        )}

        {/* Image or placeholder
        <div className="w-full h-48 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-2">
          {word.image && !imageError ? (
            <img
              src={word.image}
              alt={word.word}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)} // if image fails, set error
            />
          ) : (
            <span className="text-gray-400 dark:text-gray-300">
              No image available
            </span>
          )}
        </div> */}

        {/* Close button */}
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
