import { FaUserFriends, FaSmile, FaUsers, FaUser, FaHeart, FaStar, FaCamera, FaClock, FaCheckCircle, FaImage, FaBolt, FaSun, FaLaugh, FaCopy, FaEyeSlash } from "react-icons/fa";

const statCards = [
  { label: "Faces Detected", value: "4,567", icon: <FaSmile className="text-white text-2xl" />, gradient: "from-blue-400 via-blue-500 to-indigo-500" },
  { label: "Unique People", value: "248", icon: <FaUserFriends className="text-white text-2xl" />, gradient: "from-green-400 via-green-500 to-emerald-500" },
  { label: "Avg Faces/Photo", value: "3.7", icon: <FaUsers className="text-white text-2xl" />, gradient: "from-indigo-400 via-blue-400 to-blue-600" },
  { label: "Group Photos", value: "234", icon: <FaUsers className="text-white text-2xl" />, gradient: "from-pink-400 via-pink-500 to-rose-500" },
  { label: "Solo Portraits", value: "189", icon: <FaUser className="text-white text-2xl" />, gradient: "from-yellow-300 via-yellow-400 to-yellow-500" },
  { label: "Couple Photos", value: "156", icon: <FaHeart className="text-white text-2xl" />, gradient: "from-green-400 via-green-500 to-emerald-500" },
];

const aiMoments = [
  { rank: 1, title: "First Dance", time: "8:45 PM", uploads: 67, engagement: 95, color: "#6366f1" },
  { rank: 2, title: "Cake Cutting", time: "9:15 PM", uploads: 54, engagement: 88, color: "#f59e42" },
  { rank: 3, title: "Bouquet Toss", time: "9:45 PM", uploads: 48, engagement: 82, color: "#22c55e" },
  { rank: 4, title: "Speeches", time: "7:30 PM", uploads: 42, engagement: 76, color: "#3b82f6" },
  { rank: 5, title: "Grand Exit", time: "11:00 PM", uploads: 38, engagement: 71, color: "#ef4444" },
];

const aiHighlights = [
  { confidence: 94, label: "Best Emotional Moment", value: "Vows Exchange", icon: <FaHeart className="text-pink-400 text-lg" /> },
  { confidence: 91, label: "Best Group Energy", value: "Dance Floor Peak", icon: <FaBolt className="text-yellow-400 text-lg" /> },
  { confidence: 89, label: "Best Composition", value: "Sunset Portrait", icon: <FaCamera className="text-indigo-400 text-lg" /> },
  { confidence: 87, label: "Most Candid", value: "Laugh During Speech", icon: <FaLaugh className="text-green-400 text-lg" /> },
  { confidence: 92, label: "Best Lighting", value: "Golden Hour Couple", icon: <FaSun className="text-yellow-400 text-lg" /> },
];

const qualityStats = [
  { label: "High Quality", value: 678, color: "#22c55e", icon: <FaStar className="text-yellow-400 text-lg" /> },
  { label: "Medium Quality", value: 423, color: "#3b82f6", icon: <FaStar className="text-blue-400 text-lg" /> },
  { label: "Low Quality", value: 146, color: "#ef4444", icon: <FaStar className="text-red-400 text-lg" /> },
  { label: "Blurry Photos", value: 45, color: "#f59e42", icon: <FaEyeSlash className="text-yellow-400 text-lg" /> },
  { label: "Duplicates", value: 23, color: "#6366f1", icon: <FaCopy className="text-indigo-400 text-lg" /> },
];

export default function MediaAIAnalysisTab() {
  return (
    <div className="space-y-10">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat, idx) => (
          <div key={idx} className={`flex flex-col items-center justify-center rounded-xl shadow-lg px-6 py-6 bg-gradient-to-br ${stat.gradient} min-h-[120px]`}>
            <div className="mb-2">{stat.icon}</div>
            <div className="text-2xl font-extrabold text-white drop-shadow mb-1">{stat.value}</div>
            <div className="text-xs font-semibold text-white/80 tracking-wide text-center">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* AI-Identified Popular Moments */}
      <div className="bg-gradient-to-br from-indigo-100 via-blue-100 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 mb-8">
        <h3 className="text-xl font-bold mb-6 text-indigo-700 dark:text-indigo-300">AI-Identified Popular Moments</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiMoments.map((m) => (
            <div key={m.rank} className="rounded-xl shadow p-6 border-t-4 flex flex-col gap-2" style={{ borderColor: m.color }}>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-bold text-lg" style={{ color: m.color }}>{m.rank}</span>
                <span className="font-bold text-lg" style={{ color: m.color }}>{m.title}</span>
                <span className="ml-auto text-sm font-semibold text-gray-500 dark:text-gray-300">{m.time}</span>
              </div>
              <div className="flex flex-wrap gap-4 text-sm mb-1">
                <span>Uploads: <span className="font-semibold">{m.uploads}</span></span>
                <span>Engagement: <span className="font-semibold" style={{ color: m.color }}>{m.engagement}%</span></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI-Identified Highlights */}
      <div className="bg-gradient-to-br from-pink-100 via-blue-100 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 mb-8">
        <h3 className="text-xl font-bold mb-6 text-pink-700 dark:text-pink-300">AI-Identified Highlights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiHighlights.map((h, idx) => (
            <div key={idx} className="rounded-xl shadow p-6 border-t-4 flex flex-col gap-2" style={{ borderColor: '#f472b6' }}>
              <div className="flex items-center gap-3 mb-2">
                {h.icon}
                <span className="font-bold text-lg text-pink-700 dark:text-pink-300">{h.label}</span>
              </div>
              <div className="flex flex-wrap gap-4 text-sm mb-1">
                <span>Value: <span className="font-semibold">{h.value}</span></span>
                <span>Confidence: <span className="font-semibold text-pink-700 dark:text-pink-300">{h.confidence}%</span></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content Quality Analysis */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
        <h3 className="text-xl font-bold mb-6 text-green-700 dark:text-green-300">Content Quality Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {qualityStats.map((q, idx) => (
            <div key={idx} className="rounded-xl shadow p-6 border-t-4 flex flex-col gap-2" style={{ borderColor: q.color }}>
              <div className="flex items-center gap-3 mb-2">
                {q.icon}
                <span className="font-bold text-lg" style={{ color: q.color }}>{q.label}</span>
              </div>
              <div className="flex flex-wrap gap-4 text-sm mb-1">
                <span>Count: <span className="font-semibold">{q.value}</span></span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-lg font-bold text-indigo-700 dark:text-indigo-300">Avg Score: 8.4/10</div>
      </div>
    </div>
  );
}