import React from "react";

const RecentTopics = ({ data }) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-bold dark:text-white">Recent Topics</h3>
      <div className="overflow-hidden rounded-xl border bg-white shadow-sm dark:bg-[#101922] dark:border-[#2a3b4d]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-[#f8f9fa] dark:bg-[#1e293b]">
              <tr>
                {["Date", "Topic", "Word Count", "Score", "Action"].map((col) => (
                  <th key={col} className="px-6 py-4 font-bold text-[#617589] dark:text-[#94a3b8]">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-[#2a3b4d]">
              {data.map((row, i) => (
                <tr key={i} className="group hover:bg-[#f8f9fa] dark:hover:bg-[#1e293b]">
                  <td className="px-6 py-4 text-[#111418] dark:text-white">{row.date}</td>
                  <td className="px-6 py-4 font-medium text-[#111418] dark:text-white">{row.topic}</td>
                  <td className="px-6 py-4 text-[#617589] dark:text-[#94a3b8]">{row.wordCount}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${row.color}`}>{row.score}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[#2b8dee] hover:text-[#1a7cd8] font-medium">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecentTopics;
