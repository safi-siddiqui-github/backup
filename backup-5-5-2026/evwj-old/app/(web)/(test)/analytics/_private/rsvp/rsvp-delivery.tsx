import { Mail, MessageSquare, TrendingUp, Clock, AlertCircle } from "lucide-react";
import { ReusableBarChart } from "../lib/lib-barchart";

  type FunnelStepProps = {
    step: { label: string; value: number; percentage: number };
    index: number;
    total: number;
    responseRate: number;
    prevValue: number;
  };
  
export default function RSVPDelivery() {
  const emailFunnelSteps = [
    { label: "Sent", value: 200, percentage: 100 },
    { label: "Delivered", value: 196, percentage: 98.0 },
    { label: "Opened", value: 178, percentage: 90.8 },
    { label: "Clicked", value: 142, percentage: 79.8 },
    { label: "Responded", value: 121, percentage: 85.2 },
  ];

  const smsFunnelSteps = [
    { label: "Sent", value: 48, percentage: 100 },
    { label: "Delivered", value: 48, percentage: 100.0 },
    { label: "Opened", value: 46, percentage: 95.8 },
    { label: "Clicked", value: 38, percentage: 82.6 },
    { label: "Responded", value: 35, percentage: 92.1 },
  ];

  const reminderCampaignData = [
    { name: "Initial Invite", sent: 200, delivered: 196, responded: 121 },
    { name: "First Reminder", sent: 79, delivered: 78, responded: 58 },
    { name: "Second Reminder", sent: 21, delivered: 20, responded: 15 },
    { name: "Final Reminder", sent: 6, delivered: 5, responded: 4 },
  ];

  const reminderBars = [
    { dataKey: "sent", name: "Sent", fill: "#6366f1" },
    { dataKey: "delivered", name: "Delivered", fill: "#8b5cf6" },
    { dataKey: "responded", name: "Responded", fill: "#ec4899" },
  ];

  const timingInsights = [
    {
      label: "Early Responders",
      value: 89,
      description: "Within 24 hours",
      icon: TrendingUp,
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-950",
      borderColor: "border-green-200 dark:border-green-800",
    },
    {
      label: "Late Responders",
      value: 67,
      description: "After 7 days",
      icon: Clock,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-950",
      borderColor: "border-blue-200 dark:border-blue-800",
    },
    {
      label: "Last Minute",
      value: 33,
      description: "Within 48h of deadline",
      icon: AlertCircle,
      color: "text-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-950",
      borderColor: "border-orange-200 dark:border-orange-800",
    },
  ];

  const peakPatterns = [
    { label: "Best day", value: "Monday" },
    { label: "Best hour", value: "7 PM" },
    { label: "Average response time", value: "3.2 days" },
  ];




  const FunnelStep = ({ step, index, total, responseRate, prevValue }: FunnelStepProps) => {
    const conversionFromPrev =
      prevValue > 0 ? ((step.value / prevValue) * 100).toFixed(1) : 100;

    return (
      <div className="w-full">
        <div className="flex items-center justify-between mb-2">
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {step.label}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {index > 0 && (
                <>
                  Conversion: <span className="font-semibold">{conversionFromPrev}%</span> |{" "}
                </>
              )}
              {step.percentage.toFixed(1)}% of total
            </p>
          </div>
          <div className="text-right ml-4">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {step.value}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {step.percentage.toFixed(1)}%
            </p>
          </div>
        </div>
        <div className="w-full h-10 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
          <div
            className="h-full bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center px-4 transition-all duration-500"
            style={{
              width: `${step.percentage}%`,
            }}
          >
            {step.percentage > 20 && (
              <span className="text-white text-xs font-bold truncate">
                {step.value} ({step.percentage.toFixed(1)}%)
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full space-y-8 p-6 bg-white dark:bg-gray-900">
      {/* Invitation Delivery & Engagement Funnel */}
      <section>
        <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
          Invitation Delivery & Engagement Funnel
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Email Funnel */}
          <div className="bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 rounded-xl p-8">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <Mail className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                  Email
                </h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Overall response rate:{" "}
                <span className="font-bold text-green-600 dark:text-green-400 text-lg">
                  61.7%
                </span>
              </p>
            </div>
            <div className="space-y-6">
              {emailFunnelSteps.map((step, index) => (
                <FunnelStep
                  key={index}
                  step={step}
                  index={index}
                  total={emailFunnelSteps.length}
                  responseRate={61.7}
                  prevValue={index > 0 ? emailFunnelSteps[index - 1].value : 200}
                />
              ))}
            </div>
          </div>

          {/* SMS Funnel */}
          <div className="bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-xl p-8">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                  SMS
                </h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Overall response rate:{" "}
                <span className="font-bold text-green-600 dark:text-green-400 text-lg">
                  72.9%
                </span>
              </p>
            </div>
            <div className="space-y-6">
              {smsFunnelSteps.map((step, index) => (
                <FunnelStep
                  key={index}
                  step={step}
                  index={index}
                  total={smsFunnelSteps.length}
                  responseRate={72.9}
                  prevValue={index > 0 ? smsFunnelSteps[index - 1].value : 48}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reminder Campaign Effectiveness */}
      <section>
        <ReusableBarChart
          data={reminderCampaignData}
          title="Campaign Performance by Reminder Stage"
          bars={reminderBars}
          yAxisLabel="Count"
          isAnimationActive={true}
          dimensions={{ width: "100%", height: 400 }}
          barSize={50}
        />
      </section>

      {/* Response Timing Insights */}
      <section>
        <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Response Timing Insights
        </h3>

        {/* Timing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {timingInsights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <div
                key={index}
                className={`rounded-lg border ${insight.bgColor} ${insight.borderColor} p-6 shadow-sm`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
                      {insight.label}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {insight.value}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                      {insight.description}
                    </p>
                  </div>
                  <Icon className={`h-8 w-8 ${insight.color}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Peak Response Patterns */}
        <div className="bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Peak Response Patterns
          </h4>
          <div className="space-y-3">
            {peakPatterns.map((pattern, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-indigo-200 dark:border-indigo-700 last:border-b-0"
              >
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  • {pattern.label}
                </span>
                <span className="text-gray-900 dark:text-white font-bold">
                  {pattern.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}