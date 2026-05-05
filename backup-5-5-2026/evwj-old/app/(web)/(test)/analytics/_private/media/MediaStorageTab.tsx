import { ReusablePieChart } from "../lib/lib-piechart";
import { FaDatabase, FaCamera, FaVideo, FaImage, FaEllipsisH, FaUserTie, FaUserFriends } from "react-icons/fa";

const statCards = [
  { label: "Storage Used", value: "12.4GB", icon: <FaDatabase className="text-white text-2xl" />, gradient: "from-blue-400 via-blue-500 to-indigo-500" },
  { label: "Total Storage", value: "50GB", icon: <FaDatabase className="text-white text-2xl" />, gradient: "from-green-400 via-green-500 to-emerald-500" },
  { label: "% Used", value: "25%", icon: <FaDatabase className="text-white text-2xl" />, gradient: "from-pink-400 via-pink-500 to-rose-500" },
];

const pieData = [
  { name: "Photos", value: 66.1 },
  { name: "Videos", value: 27.4 },
  { name: "Thumbnails", value: 4 },
  { name: "Other", value: 2.4 },
];
const pieColors = ["#6366f1", "#f59e42", "#22c55e", "#ef4444"];

const uploadSources = [
  {
    label: "Professional Photographer",
    percent: 45.5,
    items: 567,
    quality: "High Quality",
    icon: <FaUserTie className="text-indigo-500 text-2xl" />,
    color: "#6366f1",
  },
  {
    label: "Professional Videographer",
    percent: 7.1,
    items: 89,
    quality: "High Quality",
    icon: <FaVideo className="text-pink-500 text-2xl" />,
    color: "#f59e42",
  },
  {
    label: "Guest Uploads",
    percent: 47.4,
    items: 591,
    quality: "Mixed Quality",
    icon: <FaUserFriends className="text-green-500 text-2xl" />,
    color: "#22c55e",
  },
];

function StatCard({ icon, value, label, gradient }: { icon: React.ReactNode; value: string; label: string; gradient: string }) {
  return (
    <div className={`flex flex-col items-center justify-center rounded-xl shadow-lg px-6 py-6 bg-gradient-to-br ${gradient} min-h-[120px]`}>
      <div className="mb-2">{icon}</div>
      <div className="text-2xl font-extrabold text-white drop-shadow mb-1">{value}</div>
      <div className="text-xs font-semibold text-white/80 tracking-wide text-center">{label}</div>
    </div>
  );
}

export default function MediaStorageTab() {
  return (
    <div className="space-y-10">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat, idx) => (
          <StatCard key={idx} icon={stat.icon} value={stat.value} label={stat.label} gradient={stat.gradient} />
        ))}
      </div>

      {/* Pie Chart: Storage Breakdown */}
      <div className="bg-gradient-to-br from-indigo-100 via-blue-100 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 mb-8">
        <ReusablePieChart
          data={pieData}
          title="Storage Breakdown"
          colors={pieColors}
          isAnimationActive={true}
          dimensions={{ width: "100%", height: 320 }}
        />
        <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm">
          {pieData.map((item, idx) => (
            <div key={item.name} className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full" style={{ background: pieColors[idx] }}></span>
              <span className="font-semibold text-gray-700 dark:text-gray-200">{item.name}:</span>
              <span className="font-bold text-indigo-700 dark:text-indigo-300">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Sources */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
        <h3 className="text-xl font-bold mb-6 text-green-700 dark:text-green-300">Upload Sources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {uploadSources.map((src) => (
            <div key={src.label} className="rounded-xl shadow p-6 border-t-4 flex flex-col gap-2" style={{ borderColor: src.color }}>
              <div className="flex items-center gap-3 mb-2">
                {src.icon}
                <span className="font-bold text-lg" style={{ color: src.color }}>{src.label}</span>
              </div>
              <div className="flex flex-wrap gap-4 text-sm mb-1">
                <span>{src.percent}% of uploads</span>
                <span>{src.items} Items</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-300">{src.quality}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}