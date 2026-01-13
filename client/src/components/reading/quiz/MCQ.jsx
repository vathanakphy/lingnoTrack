const MCQ = ({ question, options, correctIndex, selected, onSelect, showResult }) => {
  return (
    <div className="space-y-4">
      <p className="text-lg text-slate-800 dark:text-slate-100 font-semibold">{question}</p>
      <div className="grid gap-3">
        {options.map((opt, i) => {
          const isSelected = selected === i;
          const isCorrect = i === correctIndex;
          const showCorrect = showResult && isCorrect;
          const showIncorrect = showResult && isSelected && !isCorrect;
          
          return (
            <button
              key={i}
              onClick={() => !showResult && onSelect(i)}
              disabled={showResult}
              className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-[1.02]
                ${showCorrect ? "bg-green-50 dark:bg-green-900/30 border-green-500 shadow-lg shadow-green-500/20" : ""}
                ${showIncorrect ? "bg-red-50 dark:bg-red-900/30 border-red-500" : ""}
                ${isSelected && !showResult ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 shadow-md" : ""}
                ${!isSelected && !showCorrect && !showIncorrect ? "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50" : ""}
                ${showResult ? "cursor-not-allowed" : "cursor-pointer"}
              `}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{opt}</span>
                {showCorrect && <span className="text-green-600 dark:text-green-400 text-xl">✓</span>}
                {showIncorrect && <span className="text-red-600 dark:text-red-400 text-xl">✗</span>}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};


export default MCQ;
