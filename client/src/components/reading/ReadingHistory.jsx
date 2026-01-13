import { useState } from "react";
import { FiX } from "react-icons/fi";

const ReadingHistory = ({ history }) => {
  const [selected, setSelected] = useState(null);

  return (
    <section className="pt-12">
      <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
        Reading History
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {history.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelected(item)}
            className="cursor-pointer p-6 rounded-3xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800
                       shadow-lg hover:shadow-2xl hover:-translate-y-1 transform transition-all"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-lg text-slate-900 dark:text-white">
                {item.topic}
              </span>
              <span className="text-blue-600 dark:text-blue-400 font-bold">
                {item.score}%
              </span>
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Correct: {item.correct}/{item.total}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-6 w-full max-w-md relative">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-slate-500 dark:text-slate-400 hover:text-red-500 transition"
            >
              <FiX size={24} />
            </button>

            <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">
              {selected.topic}
            </h3>

            <div className="flex justify-between mb-3">
              <span className="font-medium text-slate-700 dark:text-slate-300">
                Score:
              </span>
              <span className="font-bold text-blue-600 dark:text-blue-400">
                {selected.score}%
              </span>
            </div>

            <div className="flex justify-between mb-3">
              <span className="font-medium text-slate-700 dark:text-slate-300">
                Correct:
              </span>
              <span className="font-bold text-slate-900 dark:text-white">
                {selected.correct}/{selected.total}
              </span>
            </div>

            {selected.feedback?.length > 0 && (
              <ul className="mt-2 list-disc list-inside text-slate-600 dark:text-slate-400 space-y-1">
                {selected.feedback.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            )}

            <button
              onClick={() => setSelected(null)}
              className="mt-6 w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ReadingHistory;
