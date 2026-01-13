
import React from "react";
import {
  MdCheckCircle,
  MdStar,
  MdSchool,
  MdEmojiEvents,
  MdAssignment,
  MdTrendingUp,
  MdAccessTime,
  MdDone,
  MdBook,
  MdLeaderboard,
  MdWorkspacePremium,
  MdTaskAlt,
  MdQuiz,
  MdPlayCircleFilled,
  MdOutlineLocalFireDepartment
} from "react-icons/md";


const DailyGoalsCard = ({ title, progress, newItems, completed, icon, color }) => {
  // Map color prop to hex for SVG stroke
  const colorHex = {
    blue: "#3B82F6",
    purple: "#8B5CF6",
    green: "#22C55E",
    red: "#EF4444",
    yellow: "#FACC15",
    gray: "#64748B"
  };

  return (
    <div className={`bg-white dark:bg-[#1A2632] rounded-2xl p-8 border border-slate-100 dark:border-[#2A3B4D] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex items-center gap-8 group hover:-translate-y-1 transition-all duration-300`}>
      <div className="relative w-24 h-24 flex-shrink-0">
        <svg className="w-full h-full transform -rotate-90 drop-shadow-sm" viewBox="0 0 100 100">
          <circle className="dark:stroke-[#2A3B4D]" cx="50" cy="50" fill="none" r="42" stroke="#f1f5f9" strokeWidth="8"></circle>
          <circle
            cx="50"
            cy="50"
            fill="none"
            r="42"
            stroke={colorHex[color] || colorHex.blue}
            strokeDasharray="263.89"
            strokeDashoffset={(1 - progress / 100) * 263.89}
            strokeLinecap="round"
            strokeWidth="8"
          ></circle>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-slate-900 dark:text-white">{progress}%</span>
        </div>
      </div>
      <div className="flex flex-col">
        <div className={`w-10 h-10 rounded-lg bg-${color}-50 dark:bg-${color}-900/20 flex items-center justify-center text-${color}-500 mb-3`}>
          {(() => {
            const iconProps = { className: "text-2xl" };
            switch (icon) {
              case "check_circle":
                return <MdCheckCircle {...iconProps} />;
              case "star":
                return <MdStar {...iconProps} />;
              case "school":
                return <MdSchool {...iconProps} />;
              case "emoji_events":
                return <MdEmojiEvents {...iconProps} />;
              case "assignment":
                return <MdAssignment {...iconProps} />;
              case "trending_up":
                return <MdTrendingUp {...iconProps} />;
              case "access_time":
                return <MdAccessTime {...iconProps} />;
              case "done":
                return <MdDone {...iconProps} />;
              case "book":
                return <MdBook {...iconProps} />;
              case "leaderboard":
                return <MdLeaderboard {...iconProps} />;
              case "workspace_premium":
                return <MdWorkspacePremium {...iconProps} />;
              case "task_alt":
                return <MdTaskAlt {...iconProps} />;
              case "quiz":
                return <MdQuiz {...iconProps} />;
              case "play_circle_filled":
                return <MdPlayCircleFilled {...iconProps} />;
              case "local_fire_department":
                return <MdOutlineLocalFireDepartment {...iconProps} />;
              default:
                return <MdCheckCircle {...iconProps} />;
            }
          })()}
        </div>
        <span className="text-sm text-slate-500 dark:text-[#94a3b8] font-medium mb-1">{title}</span>
        <span className="text-xl font-bold text-slate-900 dark:text-white mb-1">{newItems} New {title}</span>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded w-fit bg-${color}-50 dark:bg-${color}-900/30 text-${color}-600 dark:text-${color}-300`}>
          {completed}/{newItems} Completed
        </span>
      </div>
    </div>
  );
};

export default DailyGoalsCard;
