import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useState } from "react";

const QuizCard = ({ title, typeDescription, children, questionNumber }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-bold">
                Q{questionNumber}
              </span>
              <h3 className="text-xl font-bold text-white">{title}</h3>
            </div>
            <p className="text-blue-100 text-sm mt-1">{typeDescription}</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};
export default QuizCard;
