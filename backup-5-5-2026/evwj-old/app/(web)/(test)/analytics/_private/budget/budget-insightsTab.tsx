import { Sparkles, ThumbsUp, AlertTriangle, Repeat, TrendingUp, Handshake } from "lucide-react";

const insights = [
    {
        icon: <ThumbsUp className="h-6 w-6 text-emerald-500 dark:text-emerald-400" />, 
        title: "Excellent Budget Management",
        desc: "You're 22.5% under budget with high vendor satisfaction scores. Current trajectory suggests $1,250 in savings."
    },
    {
        icon: <AlertTriangle className="h-6 w-6 text-rose-500 dark:text-rose-400" />,
        title: "Payment Attention Needed",
        desc: "Sound Waves DJ payment is 5 days overdue. Immediate payment recommended to maintain vendor relationship and avoid late fees."
    },
    {
        icon: <Repeat className="h-6 w-6 text-indigo-500 dark:text-indigo-400" />,
        title: "Reallocation Opportunity",
        desc: "Flowers category is $1,800 under budget. Consider upgrading floral arrangements or reallocating to photography for additional coverage."
    },
    {
        icon: <TrendingUp className="h-6 w-6 text-fuchsia-500 dark:text-fuchsia-400" />,
        title: "Strong ROI Performance",
        desc: "Photography showing 5.1x ROI - highest among all categories. This investment is delivering exceptional value."
    },
    {
        icon: <Handshake className="h-6 w-6 text-amber-500 dark:text-amber-400" />,
        title: "Negotiation Success",
        desc: "Average discount of 12.3% achieved through negotiations, resulting in $4,890 in total savings across all vendors."
    },
];

export default function BudgetInsightsTab() {
    return (
        <div className="space-y-8">
            <div className="flex items-center gap-3 mb-4">
                <span className="rounded-full bg-gradient-to-tr from-indigo-400 via-fuchsia-500 to-emerald-400 p-1 shadow-lg">
                  <Sparkles className="h-7 w-7 text-white drop-shadow" />
                </span>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-100">AI-Powered Budget Optimization</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {insights.map((insight, idx) => (
                    <div
                        key={insight.title}
                        className="flex items-start gap-4 bg-gradient-to-br from-white via-slate-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950 rounded-xl border border-gray-200 dark:border-slate-700 p-5 shadow-lg hover:scale-[1.025] transition-transform"
                    >
                        <span
                          className={
                            `rounded-lg p-2 shadow ` +
                            [
                              "bg-gradient-to-tr from-emerald-400 to-emerald-600",
                              "bg-gradient-to-tr from-rose-400 to-rose-600",
                              "bg-gradient-to-tr from-indigo-400 to-indigo-600",
                              "bg-gradient-to-tr from-fuchsia-400 to-fuchsia-600",
                              "bg-gradient-to-tr from-amber-400 to-amber-600"
                            ][idx % 5]
                          }
                        >
                          {insight.icon}
                        </span>
                        <div>
                            <div className="font-semibold text-gray-900 dark:text-slate-100 mb-1">{insight.title}</div>
                            <div className="text-sm text-gray-600 dark:text-slate-400">{insight.desc}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}