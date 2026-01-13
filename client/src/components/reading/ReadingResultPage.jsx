const ReadingResultPage = ({ result, onBack }) => {
  return (
    <section className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
        {result.topic}
      </h1>

      <div className="flex items-center gap-6">
        <div className="text-2xl font-extrabold text-blue-600">{result.score}%</div>
        <div className="text-lg text-slate-500 dark:text-slate-400">
          {result.correct} out of {result.total} correct
        </div>
      </div>

      {result.results?.length > 0 && (
        <div className="space-y-4 p-4">
          {result.results.map((r, i) => (
            <div
              key={i}
              className="p-4 rounded-lg bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-700"
            >
              <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
                <strong>Question:</strong> {r.question}
              </p>
              <p
                className={`text-sm font-medium mb-1 ${
                  r.isCorrect
                    ? "text-green-700 dark:text-green-400"
                    : "text-red-700 dark:text-red-400"
                }`}
              >
                {r.isCorrect ? "✅ Correct" : "❌ Incorrect"}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                <strong>Your Answer:</strong> {r.userAnswer || "No answer"}
              </p>
              {!r.isCorrect && (
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  <strong>Correct Answer:</strong> {r.correctAnswer}
                </p>
              )}
              {!r.isCorrect && r.aiFeedback && (
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  <strong>AI Feedback:</strong> {r.aiFeedback}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      <button
        onClick={onBack}
        className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition"
      >
        Back
      </button>
    </section>
  );
};

export default ReadingResultPage;
