const WritingHistoryDetail = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-auto p-6 relative animate-fade-in">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 text-lg font-bold"
        >
          ✕
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
            {item.topic}
          </h2>
          <p className="text-sm text-slate-500">
            Score: <span className="font-semibold">{item.result.score}</span> / 100
          </p>
        </div>

        {/* Writing Section */}
        <div className="mb-6 bg-slate-50 dark:bg-slate-800 rounded-xl p-4 shadow-inner">
          <h4 className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">
            ✍️ Your Writing
          </h4>
          <div className="whitespace-pre-wrap text-sm leading-7 text-slate-800 dark:text-slate-100">
            {item.text}
          </div>
        </div>

        {/* Feedback Section */}
        <div className="mb-2 bg-green-50 dark:bg-green-900/40 rounded-xl p-4 shadow-inner">
          <h4 className="text-sm font-semibold text-green-800 dark:text-green-300 mb-3">
            📝 Feedback
          </h4>
          <ul className="space-y-3">
            {item.result.feedback.map((f, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-slate-700 dark:text-slate-200"
              >
                <span className="mt-1 flex-shrink-0 h-3 w-3 rounded-full bg-green-500 dark:bg-green-400" />
                <p className="text-sm">{f}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WritingHistoryDetail;
