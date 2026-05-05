import { BarChart3, AlertCircle, Lightbulb, TrendingUp, MessageSquare, Users } from "lucide-react";

export default function RSVPInsights() {
  const declineReasons = [
    {
      reason: "Schedule Conflict",
      count: 8,
      percentage: 44.4,
      icon: AlertCircle,
      color: "text-red-500",
      bgColor: "bg-red-50 dark:bg-red-950",
      borderColor: "border-red-200 dark:border-red-800",
    },
    {
      reason: "Location Too Far",
      count: 4,
      percentage: 22.2,
      icon: Users,
      color: "text-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-950",
      borderColor: "border-orange-200 dark:border-orange-800",
    },
    {
      reason: "Cost/Budget",
      count: 3,
      percentage: 16.7,
      icon: AlertCircle,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50 dark:bg-yellow-950",
      borderColor: "border-yellow-200 dark:border-yellow-800",
    },
    {
      reason: "Health/Personal",
      count: 2,
      percentage: 11.1,
      icon: AlertCircle,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-950",
      borderColor: "border-blue-200 dark:border-blue-800",
    },
    {
      reason: "Other",
      count: 1,
      percentage: 5.6,
      icon: AlertCircle,
      color: "text-gray-500",
      bgColor: "bg-gray-50 dark:bg-gray-950",
      borderColor: "border-gray-200 dark:border-gray-800",
    },
  ];

  const actionableInsights = [
    {
      title: "Consider offering virtual attendance for long-distance guests",
      type: "Location",
      icon: Users,
      priority: "medium",
    },
    {
      title: "Schedule conflicts are primary concern - validate date choice",
      type: "Timing",
      icon: AlertCircle,
      priority: "high",
    },
    {
      title: "Location accessibility matters - provide transportation options",
      type: "Accessibility",
      icon: Users,
      priority: "medium",
    },
  ];

  const aiRecommendations = [
    {
      title: "Strong Email Performance",
      description:
        "Email channel showing 61.7% response rate. Continue with email-first strategy.",
      icon: MessageSquare,
      color: "text-indigo-600 dark:text-indigo-400",
      bgColor: "bg-indigo-50 dark:bg-indigo-950",
      borderColor: "border-indigo-200 dark:border-indigo-800",
    },
    {
      title: "SMS Outperforming",
      description:
        "SMS showing 72.9% response rate. Consider expanding SMS reminders for pending guests.",
      icon: MessageSquare,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-950",
      borderColor: "border-purple-200 dark:border-purple-800",
    },
    {
      title: "Follow-up Opportunity",
      description:
        "34 guests still pending. Send personalized reminder on Monday at 7 PM for optimal engagement.",
      icon: Lightbulb,
      color: "text-yellow-600 dark:text-yellow-400",
      bgColor: "bg-yellow-50 dark:bg-yellow-950",
      borderColor: "border-yellow-200 dark:border-yellow-800",
    },
    {
      title: "Demographic Insights",
      description:
        "Younger guests (18-25) showing slower response times. Consider social media engagement tactics.",
      icon: TrendingUp,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-950",
      borderColor: "border-green-200 dark:border-green-800",
    },
  ];

  return (
    <div className="w-full space-y-8 p-6 bg-white dark:bg-gray-900">
      {/* Decline Reason Analysis */}
      <section>
        <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
          <BarChart3 className="h-6 w-6" />
          Decline Reason Analysis
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {declineReasons.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`rounded-lg border ${item.bgColor} ${item.borderColor} p-5 shadow-sm hover:shadow-md transition-shadow`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      {item.reason}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {item.count}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      people declined
                    </p>
                  </div>
                  <Icon className={`h-6 w-6 ${item.color}`} />
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-linear-to-r from-indigo-500 to-purple-500`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mt-2">
                  {item.percentage}% of declines
                </p>
              </div>
            );
          })}
        </div>

        {/* Actionable Insights */}
        <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            Actionable Insights
          </h4>
          <ul className="space-y-3">
            {actionableInsights.map((insight, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300"
              >
                <span className="text-amber-600 dark:text-amber-400 font-bold mt-0.5">
                  •
                </span>
                <span>{insight.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* AI-Powered Recommendations */}
      <section>
        <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
          <Lightbulb className="h-6 w-6" />
          AI-Powered Recommendations
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {aiRecommendations.map((rec, index) => {
            const Icon = rec.icon;
            return (
              <div
                key={index}
                className={`rounded-lg border ${rec.bgColor} ${rec.borderColor} p-6 shadow-sm hover:shadow-md transition-shadow`}
              >
                <div className="flex items-start gap-4">
                  <Icon className={`h-6 w-6 ${rec.color} shrink-0 mt-0.5`} />
                  <div className="flex-1">
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                      {rec.title}
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      {rec.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}