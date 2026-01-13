const ShortAnswer = ({ question, answer, userAnswer, onChange, showResult }) => {
  const isCorrect = userAnswer.toLowerCase().trim() === answer.toLowerCase().trim();
  
  return (
    <div className="space-y-4">
      <p className="text-lg text-slate-800 dark:text-slate-100 font-semibold">{question}</p>
      <textarea
        value={userAnswer}
        onChange={(e) => onChange(e.target.value)}
        disabled={showResult}
        placeholder="Type your answer here..."
        className={`w-full px-5 py-4 rounded-xl border-2 bg-slate-50 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none
          ${showResult ? (isCorrect ? "border-green-500 bg-green-50 dark:bg-green-900/20" : "border-red-500 bg-red-50 dark:bg-red-900/20") : "border-slate-200 dark:border-slate-700"}
        `}
        rows={3}
      />
      {showResult && !isCorrect && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4 rounded-lg">
          <p className="text-sm text-amber-800 dark:text-amber-300">
            <strong>Suggested answer:</strong> {answer}
          </p>
        </div>
      )}
    </div>
  );
}

export default ShortAnswer;
