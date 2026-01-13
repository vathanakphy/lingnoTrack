const TrueFalse = ({ statement, correct, selected, onSelect, showResult }) => {
  return (
    <div className="space-y-4">
      <p className="text-lg text-slate-800 dark:text-slate-100 font-semibold">{statement}</p>
      <div className="flex gap-4">
        {["True", "False"].map((opt) => {
          const isSelected = selected === opt;
          const isCorrect = opt === correct;
          const showCorrect = showResult && isCorrect;
          const showIncorrect = showResult && isSelected && !isCorrect;
          
          return (
            <button
              key={opt}
              onClick={() => !showResult && onSelect(opt)}
              disabled={showResult}
              className={`px-8 py-4 rounded-xl border-2 font-semibold text-lg flex-1 transition-all duration-300 transform hover:scale-105
                ${showCorrect ? "bg-green-50 dark:bg-green-900/30 border-green-500 text-green-700 dark:text-green-300 shadow-lg shadow-green-500/20" : ""}
                ${showIncorrect ? "bg-red-50 dark:bg-red-900/30 border-red-500 text-red-700 dark:text-red-300" : ""}
                ${isSelected && !showResult ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-700 dark:text-blue-300 shadow-md" : ""}
                ${!isSelected && !showCorrect && !showIncorrect ? "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50" : ""}
                ${showResult ? "cursor-not-allowed" : "cursor-pointer"}
              `}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default TrueFalse;
