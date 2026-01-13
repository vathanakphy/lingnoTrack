import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import DailyGoalsCard from "../components/DailyGoalsCard";
import { fetchDashboard } from "../services/dashboardService";
const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchDashboard(); // Your API endpoint
        setData(res);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      }
    };
    fetchData();
  }, []);

  if (!data) return <div className="flex-1 flex items-center justify-center">Loading...</div>;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-8 md:p-10">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Today's Dashboard
          </h1>
          <p className="text-slate-500 dark:text-[#94a3b8] text-lg mb-6">
            Here's your progress summary for today.
          </p>

          {/* Daily Goals Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {data.dailyGoals.map((goal) => (
              <DailyGoalsCard key={goal.title} {...goal} />
            ))}
          </div>

          {/* Category Progress */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
              Category Progress
            </h2>
            <div className="space-y-4">
              {data.categoryProgress.map((cat) => (
                <div key={cat.category}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{cat.category}</span>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{cat.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full">
                    <div
                      className="h-2 rounded-full bg-blue-500"
                      style={{ width: `${cat.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
