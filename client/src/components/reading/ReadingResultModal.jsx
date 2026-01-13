import { FiX, FiCheckCircle, FiXCircle } from "react-icons/fi";

const ReadingResultModal = ({ result, onClose }) => {
  const incorrect = result.feedback || [];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-2xl p-6 max-h-[90vh] overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            {result.topic}
          </h3>
          <button onClick={onClose}>
            <FiX className="text-slate-500" />
          </button>
        </div>

        {/* Score Summary */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="col-span-1 text-center">
            <div className="text-4xl font-extrabold text-blue-600">
              {result.score}%
            </div>
            <div className="text-xs text-slate-500">Your Score</div>
          </div>

          <div className="col-span-2 flex flex-col justify-center">
            <div className="text-sm text-slate-700 dark:text-slate-300">
              <strong>{result.correct}</strong> out of{" "}
              <strong>{result.total}</strong> correct
            </div>

            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full mt-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${result.score}%` }}
              />
            </div>
          </div>
        </div>

        {/* Feedback Section */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {incorrect.length === 0 ? (
            <div className="flex items-center gap-2 text-green-600">
              <FiCheckCircle />
              <span>Excellent! All answers are correct 🎉</span>
            </div>
          ) : (
            incorrect.map((item, i) => (
              <div
                key={i}
                className="border border-red-200 dark:border-red-800 rounded-xl p-4 bg-red-50 dark:bg-red-950"
              >
                <div className="flex items-center gap-2 mb-2">
                  <FiXCircle className="text-red-600" />
                  <span className="font-semibold text-slate-900 dark:text-white">
                    Question {i + 1}
                  </span>
                </div>

                <p className="text-sm text-slate-800 dark:text-slate-300 mb-2">
                  {item.question}
                </p>

                <div className="text-sm">
                  <div className="text-red-700 dark:text-red-400">
                    <strong>Your answer:</strong>{" "}
                    {item.userAnswer || "No answer"}
                  </div>

                  <div className="text-green-700 dark:text-green-400 mt-1">
                    <strong>Correct answer:</strong> {item.correctAnswer}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg font-medium
              bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReadingResultModal;
