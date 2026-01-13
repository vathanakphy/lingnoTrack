import { FiAlertCircle, FiEdit3, FiCheckCircle } from "react-icons/fi";

export default function AISuggestion({ type, line, issue, fix, index }) {
    const config = TYPE_MAP[type];
    const Icon = config.icon;

    return (
        <div
            className="rounded-xl border-2 bg-white dark:bg-slate-800 p-5 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-gray-100 dark:border-slate-700"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${config.className} shadow-sm`}>
                        <Icon size={18} />
                    </div>

                    <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                            {issue}
                        </p>
                        <span className="text-xs font-medium text-gray-400 dark:text-gray-500">
                            Line {line}
                        </span>
                    </div>
                </div>

                <span className={`text-xs font-bold px-3 py-1 rounded-full ${config.badgeClass}`}>
                    {config.label}
                </span>
            </div>

            <div className={`ml-13 p-3 rounded-lg ${config.bgClass} border-l-4 ${config.borderClass}`}>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                    💡 {fix}
                </p>
            </div>
        </div>
    );
};

const TYPE_MAP = {
    G: {
        icon: FiCheckCircle,
        label: "Grammar",
        className: "bg-gradient-to-br from-green-100 to-emerald-100 text-green-600 dark:from-green-900/30 dark:to-emerald-900/30 dark:text-green-400",
        badgeClass: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        bgClass: "bg-green-50 dark:bg-green-900/10",
        borderClass: "border-green-400 dark:border-green-500",
    },
    S: {
        icon: FiEdit3,
        label: "Style",
        className: "bg-gradient-to-br from-amber-100 to-orange-100 text-amber-600 dark:from-amber-900/30 dark:to-orange-900/30 dark:text-amber-400",
        badgeClass: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
        bgClass: "bg-amber-50 dark:bg-amber-900/10",
        borderClass: "border-amber-400 dark:border-amber-500",
    },
    C: {
        icon: FiAlertCircle,
        label: "Clarity",
        className: "bg-gradient-to-br from-red-100 to-rose-100 text-red-600 dark:from-red-900/30 dark:to-rose-900/30 dark:text-red-400",
        badgeClass: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
        bgClass: "bg-red-50 dark:bg-red-900/10",
        borderClass: "border-red-400 dark:border-red-500",
    },
};
