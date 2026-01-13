const WritingHistoryCards = ({ history, onSelect }) => {
  return (
    <div className="mt-10">
      <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-4">
        Previous Attempts
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {history.map((item, index) => (
          <button
            key={index}
            onClick={() => onSelect(item)}
            className="text-left bg-white dark:bg-slate-900
              border border-slate-200 dark:border-slate-800
              rounded-xl p-4 hover:border-slate-400
              dark:hover:border-slate-600 transition"
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium text-slate-800 dark:text-slate-100 line-clamp-2">
                {item.topic}
              </h4>
              <span className="ml-3 text-lg font-bold text-slate-900 dark:text-white">
                {item.result.score}
              </span>
            </div>

            <p className="text-xs text-slate-500 line-clamp-2">
              {item.text}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default WritingHistoryCards;
