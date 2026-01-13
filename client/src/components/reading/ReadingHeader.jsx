import React from "react";
import { FiExternalLink } from "react-icons/fi";

const ReadingHeader = ({ topic, type, readTime, sourceUrl }) => {
  return (
    <div className="border-b border-slate-200 dark:border-slate-800 pb-6 mb-6">
      {/* Reference / Source URL */}
      {sourceUrl && (
        <div className="text-sm text-slate-500 dark:text-slate-400 mb-2 px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg inline-block">
          Read the original article:{" "}
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-blue-600 dark:hover:text-blue-400"
          >
            {sourceUrl} <FiExternalLink className="inline mb-0.5" />
          </a>
        </div>
      )}

      {/* Type and read time */}
      <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
        {type && <span>{type}</span>}
        {readTime && <span>{readTime}</span>}
      </div>
    </div>
  );
};

export default ReadingHeader;
