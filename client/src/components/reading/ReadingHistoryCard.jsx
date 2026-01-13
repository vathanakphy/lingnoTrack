import { FiChevronRight } from "react-icons/fi";

const ReadingHistoryCard = ({ data, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full text-left p-5 rounded-xl border
        border-slate-200 dark:border-slate-800
        bg-white dark:bg-slate-900
        hover:bg-slate-50 dark:hover:bg-slate-800
        transition flex items-center justify-between"
    >
      <div>
        <h3 className="font-semibold text-slate-900 dark:text-white">
          {data.topic}
        </h3>
        <p className="text-sm text-slate-500">
          {data.correct}/{data.total} correct
        </p>
        {data.feedback?.length > 0 && (
          <p className="text-xs text-slate-400 mt-1">
            {data.feedback.length} feedback item{data.feedback.length > 1 ? "s" : ""}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <span
          className={`px-3 py-1 rounded-full text-sm font-bold
          ${
            data.score >= 80
              ? "bg-green-100 text-green-700"
              : data.score >= 60
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {data.score}%
        </span>
        <FiChevronRight className="text-slate-400" />
      </div>
    </button>
  );
};

export default ReadingHistoryCard;
