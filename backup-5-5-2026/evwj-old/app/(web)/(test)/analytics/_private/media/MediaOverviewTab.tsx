import { FaImages, FaVideo, FaEye, FaDownload, FaShareAlt, FaBook } from "react-icons/fa";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend,
} from "recharts";

const statCards = [
  { label: "Total Photos", value: "1,247", icon: <FaImages className="text-white text-2xl" />, gradient: "from-blue-400 via-blue-500 to-indigo-500" },
  { label: "Total Videos", value: "89", icon: <FaVideo className="text-white text-2xl" />, gradient: "from-pink-400 via-pink-500 to-rose-500" },
  { label: "Total Views", value: "34.6K", icon: <FaEye className="text-white text-2xl" />, gradient: "from-green-400 via-green-500 to-emerald-500" },
  { label: "Downloads", value: "2.6K", icon: <FaDownload className="text-white text-2xl" />, gradient: "from-yellow-300 via-yellow-400 to-yellow-500" },
  { label: "Shares", value: "1.2K", icon: <FaShareAlt className="text-white text-2xl" />, gradient: "from-indigo-400 via-blue-400 to-blue-600" },
  { label: "Albums", value: "12", icon: <FaBook className="text-white text-2xl" />, gradient: "from-green-400 via-green-500 to-emerald-500" },
];

const uploadActivityData = [
  { hour: "14:00", uploads: 40 },
  { hour: "15:00", uploads: 85 },
  { hour: "16:00", uploads: 120 },
  { hour: "17:00", uploads: 170 },
  { hour: "18:00", uploads: 255 },
  { hour: "19:00", uploads: 340 },
  { hour: "20:00", uploads: 210 },
  { hour: "21:00", uploads: 90 },
];

const albumPerformanceData = [
  { album: "Ceremony", views: 8900 },
  { album: "Reception", views: 5670 },
  { album: "Dancing", views: 4450 },
  { album: "Group Photos", views: 2340 },
  { album: "Candid Moments", views: 1890 },
];

const albumStats = [
  {
    name: "Ceremony",
    photos: 234,
    views: 8900,
    downloads: 1560,
    likes: 890,
    engagement: "12.3%",
    color: "#6366f1",
  },
  {
    name: "Reception",
    photos: 189,
    views: 5670,
    downloads: 980,
    likes: 567,
    engagement: "10.8%",
    color: "#f59e42",
  },
  {
    name: "Dancing",
    photos: 156,
    views: 4450,
    downloads: 870,
    likes: 445,
    engagement: "9.5%",
    color: "#22c55e",
  },
  {
    name: "Group Photos",
    photos: 134,
    views: 2340,
    downloads: 670,
    likes: 234,
    engagement: "8.2%",
    color: "#3b82f6",
  },
  {
    name: "Candid Moments",
    photos: 98,
    views: 1890,
    downloads: 450,
    likes: 189,
    engagement: "7.8%",
    color: "#ef4444",
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

export default function MediaOverviewTab() {
  return (
    <div className="space-y-10">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat, idx) => (
          <StatCard key={idx} icon={stat.icon} value={stat.value} label={stat.label} gradient={stat.gradient} />
        ))}
      </div>

      {/* Area Chart: Hourly Upload Activity */}
      <div className="bg-gradient-to-br from-indigo-100 via-blue-100 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 mb-8">
        <h3 className="text-xl font-bold mb-6 text-indigo-700 dark:text-indigo-300">Hourly Upload Activity</h3>
        <div className="w-full max-w-2xl mx-auto">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={uploadActivityData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorUploads" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="hour" stroke="#8884d8"/>
              <YAxis stroke="#8884d8"/>
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area type="monotone" dataKey="uploads" stroke="#6366f1" fillOpacity={1} fill="url(#colorUploads)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart: Album Performance */}
      <div className="bg-gradient-to-br from-pink-100 via-blue-100 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 mb-8">
        <h3 className="text-xl font-bold mb-6 text-pink-700 dark:text-pink-300">Album Performance</h3>
        <div className="w-full max-w-2xl mx-auto">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={albumPerformanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="album" stroke="#f472b6"/>
              <YAxis stroke="#f472b6"/>
              <Tooltip />
              <Legend />
              <Bar dataKey="views" fill="#f472b6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Album Statistics */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
        <h3 className="text-xl font-bold mb-6 text-green-700 dark:text-green-300">Album Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {albumStats.map((album) => (
            <div key={album.name} className="rounded-xl shadow p-6 border-t-4 flex flex-col gap-2" style={{ borderColor: album.color }}>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-bold text-lg" style={{ color: album.color }}>{album.name}</span>
              </div>
              <div className="flex flex-wrap gap-4 text-sm mb-1">
                <span>Photos: <span className="font-semibold">{album.photos}</span></span>
                <span>Views: <span className="font-semibold">{album.views.toLocaleString()}</span></span>
              </div>
              <div className="flex flex-wrap gap-4 text-sm mb-1">
                <span>Downloads: <span className="font-semibold">{album.downloads}</span></span>
                <span>Likes: <span className="font-semibold">{album.likes}</span></span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-300">Engagement</span>
                <span className="font-bold text-base" style={{ color: album.color }}>{album.engagement}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}