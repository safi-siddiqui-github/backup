import { FaExclamationCircle, FaExclamationTriangle, FaLightbulb, FaCheckCircle, FaArrowUp, FaClock, FaParking, FaUsers } from "react-icons/fa";

const insightStats = [
  { label: "Critical Issues", value: 1, icon: <FaExclamationCircle className="text-red-500 text-2xl" /> },
  { label: "Warnings", value: 2, icon: <FaExclamationTriangle className="text-yellow-500 text-2xl" /> },
  { label: "Opportunities", value: 2, icon: <FaLightbulb className="text-indigo-500 text-2xl" /> },
  { label: "Successes", value: 1, icon: <FaCheckCircle className="text-green-500 text-2xl" /> },
];

const insights = [
  {
    icon: <FaExclamationCircle className="text-red-500 text-xl" />, title: "High Drop-off at Open-ended Questions", priority: "High Priority", desc: "36% of respondents abandon the survey at text questions. Consider making them optional or reducing their number.", impact: "Could increase completion rate by 15-20%", action: "Make Q3 and Q5 optional"
  },
  {
    icon: <FaUsers className="text-indigo-500 text-xl" />, title: "Networking is Top Value Driver", priority: "High Priority", desc: "58 respondents cited networking as their favorite aspect. Expand networking sessions in future events.", impact: "Could increase NPS by 5-8 points", action: "Add structured networking session"
  },
  {
    icon: <FaParking className="text-yellow-500 text-xl" />, title: "Parking Complaints Recurring", priority: "Medium Priority", desc: "Parking issues mentioned in 10 negative responses and consistently in improvement suggestions.", impact: "Addressing could reduce detractors by 25%", action: "Partner with nearby parking facilities"
  },
  {
    icon: <FaArrowUp className="text-green-500 text-xl" />, title: "NPS Significantly Above Benchmark", priority: "Info Priority", desc: "Your NPS of 72 is 27 points above industry benchmark of 45. Venue and organization are key drivers.", impact: "Strong foundation for word-of-mouth growth", action: "Document and replicate successful elements"
  },
  {
    icon: <FaLightbulb className="text-indigo-500 text-xl" />, title: "AI Recommendation: Optimal Survey Length", priority: "Medium Priority", desc: "Based on drop-off analysis, surveys with 4-5 questions have 28% higher completion rates.", impact: "Could improve data quality significantly", action: "Limit future surveys to 5 questions max"
  },
  {
    icon: <FaClock className="text-blue-500 text-xl" />, title: "Peak Response Time Identified", priority: "Low Priority", desc: "Highest response quality occurs between 2-3 PM. Schedule survey reminders accordingly.", impact: "15% better sentiment in afternoon responses", action: "Send survey reminders at 2 PM"
  },
];

const nextSteps = [
  { step: 1, action: "Make Q3 and Q5 optional", impact: "Could increase completion rate by 15-20%" },
  { step: 2, action: "Add structured networking session", impact: "Could increase NPS by 5-8 points" },
  { step: 3, action: "Partner with nearby parking facilities", impact: "Addressing could reduce detractors by 25%" },
  { step: 4, action: "Limit future surveys to 5 questions max", impact: "Could improve data quality significantly" },
];

function StatCard({ icon, value, label }: any) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl shadow-lg px-6 py-6 bg-gradient-to-br from-indigo-100 via-blue-100 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-[100px]">
      <div className="mb-2">{icon}</div>
      <div className="text-2xl font-extrabold text-indigo-700 dark:text-indigo-300 drop-shadow mb-1">{value}</div>
      <div className="text-xs font-semibold text-gray-600 dark:text-gray-300 tracking-wide text-center">{label}</div>
    </div>
  );
}

function InsightCard({ icon, title, priority, desc, impact, action }: any) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-4 mb-4">
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <span className="font-bold text-indigo-700 dark:text-indigo-300">{title}</span>
        <span className="ml-auto text-xs font-bold px-2 py-1 rounded-full bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200">{priority}</span>
      </div>
      <div className="text-gray-600 dark:text-gray-300 text-sm mb-1">{desc}</div>
      <div className="flex flex-wrap gap-4 text-xs mb-1">
        <span className="text-green-600 dark:text-green-300 font-semibold">Impact: {impact}</span>
        <span className="text-blue-600 dark:text-blue-300 font-semibold">Action: {action}</span>
      </div>
    </div>
  );
}

function NextStepCard({ step, action, impact }: any) {
  return (
    <div className="flex items-center gap-3 bg-white dark:bg-gray-900 rounded-xl shadow p-3 mb-2">
      <span className="font-bold text-indigo-700 dark:text-indigo-300 text-lg">{step}</span>
      <span className="font-semibold text-gray-700 dark:text-gray-200">{action}</span>
      <span className="ml-auto text-gray-500 dark:text-gray-400 text-xs">{impact}</span>
    </div>
  );
}

export default function InsightsTab() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="font-bold text-2xl mb-2 text-indigo-700 dark:text-indigo-300">AI-Powered Actionable Insights</div>
      <div className="text-gray-600 dark:text-gray-300 mb-4">Based on analysis of 428 responses and 5 questions</div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {insightStats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      {/* Insights */}
      <div>
        {insights.map((ins, idx) => (
          <InsightCard key={idx} {...ins} />
        ))}
      </div>

      {/* Recommended Next Steps */}
      <div>
        <div className="font-bold text-lg mb-4 text-indigo-700 dark:text-indigo-300">Recommended Next Steps</div>
        {nextSteps.map((step, idx) => (
          <NextStepCard key={idx} {...step} />
        ))}
      </div>
    </div>
  );
}
