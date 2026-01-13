
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

const RecentActivity = ({ activities }) => {
  return (
    <div className="bg-white dark:bg-[#1A2632] rounded-2xl border border-slate-100 dark:border-[#2A3B4D] overflow-hidden mt-8">
      <div className="p-6 border-b border-slate-100 dark:border-[#2A3B4D] flex justify-between items-center">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Activity</h3>
        <a className="text-sm font-medium text-blue-500 hover:underline" href="#">View All</a>
      </div>
      <div className="divide-y divide-slate-100 dark:divide-[#2A3B4D]">
        {activities.map((act, idx) => (
          <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-[#2A3B4D]/50 transition-colors">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full bg-${act.color}-100 dark:bg-${act.color}-900/30 flex items-center justify-center text-${act.color}-600`}>
                {(() => {
                  const iconProps = { className: "text-[20px]" };
                  switch (act.icon) {
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
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{act.desc}</p>
                <p className="text-xs text-slate-500 dark:text-[#94a3b8]">{act.type} • {act.time}</p>
              </div>
            </div>
            <span className={`text-sm font-bold text-${act.color}-600 dark:text-${act.color}-400`}>+{act.xp} XP</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
