const FillBlank = ({ sentence = "Sustainable living requires a shift in ___", answer = "mindset", userAnswer, onChange, showResult }) => {
  const parts = sentence.split("___");
  const isCorrect = userAnswer.toLowerCase().trim() === answer.toLowerCase().trim();
  
  return (
    <div className="space-y-4">
      <div className="text-lg text-slate-800 dark:text-slate-100 flex flex-wrap items-center gap-2">
        <span>{parts[0]}</span>
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => onChange(e.target.value)}
          disabled={showResult}
          className={`border-b-2 px-3 py-2 w-48 bg-slate-50 dark:bg-slate-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all
            ${showResult ? (isCorrect ? "border-green-500 bg-green-50 dark:bg-green-900/20" : "border-red-500 bg-red-50 dark:bg-red-900/20") : "border-slate-300 dark:border-slate-600"}
          `}
          placeholder="Your answer..."
        />
        <span>{parts[1]}</span>
      </div>
      {showResult && !isCorrect && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4 rounded-lg">
          <p className="text-sm text-amber-800 dark:text-amber-300">
            <strong>Correct answer:</strong> {answer}
          </p>
        </div>
      )}
    </div>
  );
};

export default FillBlank;
