import React from "react";
import ReactMarkdown from "react-markdown";

const ReadingContent = ({ content, wordsMarkdown }) => {
  return (
    <article className="space-y-6">

      {/* Article Content */}
      <ReactMarkdown
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="text-slate-800 dark:text-slate-200 leading-7" {...props} />
          ),
          strong: ({ node, ...props }) => (
            <strong className="font-bold text-slate-900 dark:text-white" {...props} />
          ),
          em: ({ node, ...props }) => (
            <em className="italic text-slate-700 dark:text-slate-300" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="ml-4 list-disc text-slate-700 dark:text-slate-400" {...props} />
          ),
          a: ({ node, ...props }) => (
            <a className="text-blue-600 dark:text-blue-400 underline" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>

      {/* Vocabulary Words */}
      {wordsMarkdown && wordsMarkdown.length > 0 && (
        <section className="bg-blue-50 dark:bg-slate-800 p-4 rounded-xl border border-blue-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            Words to Learn
          </h2>
          <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300">
            {wordsMarkdown.map((word, index) => (
              <li key={index}>{word}</li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
};

export default ReadingContent;
