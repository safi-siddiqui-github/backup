import { FaEnvelope, FaCheckCircle, FaChartLine, FaArrowRight, FaExclamationCircle, FaUserSlash, FaMousePointer } from "react-icons/fa";

const summaryStats = [
  { label: "Sent", value: "12,500", icon: <FaEnvelope className="text-indigo-500 text-2xl" /> },
  { label: "Deliverability", value: "97.2%", icon: <FaCheckCircle className="text-green-500 text-2xl" /> },
  { label: "Open Rate", value: "40%", icon: <FaChartLine className="text-blue-500 text-2xl" /> },
  { label: "Click Rate", value: "16%", icon: <FaMousePointer className="text-pink-500 text-2xl" /> },
  { label: "Bounced", value: "350", icon: <FaExclamationCircle className="text-red-500 text-2xl" /> },
  { label: "Unsubscribed", value: "45", icon: <FaUserSlash className="text-yellow-500 text-2xl" /> },
];

const funnelSteps = [
  { label: "Sent", value: 12500 },
  { label: "Delivered", value: 12150 },
  { label: "Opened", value: 4860 },
  { label: "Clicked", value: 1944 },
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

function FunnelStep({ label, value, max }: any) {
  const ratio = Math.round((value / max) * 100);
  return (
    <div className="mb-4">
      <div className="flex items-center gap-4 mb-1">
        <span className="font-semibold text-gray-700 dark:text-gray-200 w-32">{label}</span>
        <span className="font-bold text-indigo-700 dark:text-indigo-300">{value.toLocaleString()}</span>
      </div>
      <div className="w-full h-3 bg-gray-200 dark:bg-gray-800 rounded-full">
        <div className="h-3 rounded-full bg-gradient-to-r from-indigo-400 via-blue-400 to-green-400" style={{ width: `${ratio}%` }}></div>
      </div>
    </div>
  );
}

export default function MarketingEmailTab() {
  const max = funnelSteps[0].value;
  return (
    <div className="space-y-10">
      {/* Header Summary */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {summaryStats.map((stat, idx) => (
          <StatCard key={idx} icon={stat.icon} value={stat.value} label={stat.label} />
        ))}
      </div>

      {/* Email Performance Funnel */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
        <div className="font-bold text-lg mb-2 text-indigo-700 dark:text-indigo-300">Email Performance Funnel</div>
        <div className="space-y-2">
          {funnelSteps.map((step, idx) => (
            <FunnelStep key={idx} {...step} max={max} />
          ))}
        </div>
      </div>
    </div>
  );
}
