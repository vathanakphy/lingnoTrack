import { API_BASE } from "./api";

export const getDashboardData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: {
          name: "Alex Morgan",
          role: "Premium Student",
          streak: 5,
          avatar:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDz62VYXQGCalgejPpFG3pJQPMva-SxSl94oNk19mntq9fo3zPWgN_GIWuUde3oQp9dMmgGH6wZZYZg55T-3xoLpRz5mfDqGgRax9MV_pjG0qNZ1w8DIjxsoDVvQ0apL6pfe7gHtnnzkBtxmDmsSO62XxuRrJDg7CI0KEgKOyGw69m7G_lhJBmlCe_2XDKWI_HQBfCcqTwJg5wWwI_aTdpPeYgzKHtfneewCmr_qnFHcXPRlncaNryjajurGci_kN_H24N1MaqPE50",
        },
        dailyGoals: [
          {
            title: "Vocabulary",
            progress: 75,
            newItems: 20,
            completed: 15,
            icon: "style",
            color: "blue",
          },
          {
            title: "Reading",
            progress: 0,
            newItems: 1,
            completed: 0,
            icon: "menu_book",
            color: "purple",
          },
          {
            title: "Writing",
            progress: 100,
            newItems: 1,
            completed: 1,
            icon: "edit_note",
            color: "green",
          },
        ],
        categoryProgress: [
          { category: "Vocabulary", progress: 75 },
          { category: "Reading", progress: 10 },
          { category: "Writing", progress: 100 },
        ],
        recentActivity: [
          {
            type: "Writing",
            desc: 'Completed Writing Topic: "My Hometown"',
            xp: 50,
            time: "2 hours ago",
            color: "green",
            icon: "check_circle",
          },
          {
            type: "Vocabulary",
            desc: "Learned 15 New Words",
            xp: 15,
            time: "4 hours ago",
            color: "blue",
            icon: "style",
          },
        ],
      });
    }, 0);
  });
};
export const fetchDashboard = async () => {
  try {
    const res = await fetch(`${API_BASE}/dashboard`);
    if (!res.ok) throw new Error('Failed to fetch dashboard');
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
};
