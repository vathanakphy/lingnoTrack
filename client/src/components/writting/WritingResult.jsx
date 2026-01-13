import { FiAward, FiCheckCircle } from "react-icons/fi";

const WritingResult = ({ result }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Score Card */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <FiAward size={28} />
          <h2 className="text-xl font-bold">Writing Score</h2>
        </div>
        <p className="mt-3 text-5xl font-black">{result.score}</p>
      </div>

      {/* Feedback Card */}
      <div className="rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-sm">
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <FiCheckCircle className="text-green-500" />
          Feedback
        </h3>

        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          {result.feedback.map((item, i) => (
            <li key={i} className="flex gap-2">
              • {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl bg-slate-100 dark:bg-slate-700 p-4">
          <p className="text-xs text-slate-500">Vocabulary</p>
          <p className="text-lg font-bold">{result.stats.vocabulary}</p>
        </div>
        <div className="rounded-xl bg-slate-100 dark:bg-slate-700 p-4">
          <p className="text-xs text-slate-500">Readability</p>
          <p className="text-lg font-bold">{result.stats.readability}</p>
        </div>
      </div>
    </div>
  );
};

export default WritingResult;
