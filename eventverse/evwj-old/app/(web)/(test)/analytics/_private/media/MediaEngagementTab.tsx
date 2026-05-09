import { FaCrown, FaHeart, FaDownload, FaShareAlt, FaImage, FaEye } from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const topPhotos = [
  {
    rank: 1,
    title: "First Dance",
    engagement: 33.2,
    views: 2345,
    likes: 456,
    downloads: 234,
    shares: 89,
    color: "#6366f1",
  },
  {
    rank: 2,
    title: "Vows Exchange",
    engagement: 32.8,
    views: 2100,
    likes: 412,
    downloads: 198,
    shares: 78,
    color: "#f59e42",
  },
  {
    rank: 3,
    title: "Cake Cutting",
    engagement: 29.5,
    views: 1890,
    likes: 378,
    downloads: 189,
    shares: 67,
    color: "#22c55e",
  },
  {
    rank: 4,
    title: "Bouquet Toss",
    engagement: 27.3,
    views: 1670,
    likes: 345,
    downloads: 156,
    shares: 56,
    color: "#3b82f6",
  },
  {
    rank: 5,
    title: "Sunset Photo",
    engagement: 25.6,
    views: 1450,
    likes: 312,
    downloads: 145,
    shares: 48,
    color: "#ef4444",
  },
];

const downloadTrends = [
  { day: "Day 1", downloads: 120 },
  { day: "Day 2", downloads: 340 },
  { day: "Day 3", downloads: 540 },
  { day: "Day 4", downloads: 780 },
  { day: "Day 5", downloads: 950 },
  { day: "Day 6", downloads: 870 },
  { day: "Day 7", downloads: 1000 },
];

const likeDistribution = [
  { range: "0-10 likes", count: 456, percent: 36.6, color: "#6366f1" },
  { range: "11-50 likes", count: 389, percent: 31.2, color: "#f59e42" },
  { range: "51-100 likes", count: 234, percent: 18.8, color: "#22c55e" },
  { range: "100+ likes", count: 168, percent: 13.5, color: "#ef4444" },
];

export default function MediaEngagementTab() {
  return (
    <div className="space-y-10">
      {/* Top Engaging Photos */}
      <div className="bg-gradient-to-br from-indigo-100 via-blue-100 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 mb-8">
        <h3 className="text-xl font-bold mb-6 text-indigo-700 dark:text-indigo-300">Top Engaging Photos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topPhotos.map((photo) => (
            <div key={photo.rank} className="rounded-xl shadow p-6 border-t-4 flex flex-col gap-2" style={{ borderColor: photo.color }}>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-bold text-lg" style={{ color: photo.color }}>{photo.rank === 1 ? <FaCrown className="inline mr-1 text-yellow-400" /> : photo.rank}</span>
                <span className="font-bold text-lg" style={{ color: photo.color }}>{photo.title}</span>
                <span className="ml-auto text-sm font-semibold text-gray-500 dark:text-gray-300">{photo.engagement}% engagement</span>
              </div>
              <div className="flex flex-wrap gap-4 text-sm mb-1">
                <span><FaEye className="inline mr-1 text-indigo-400" />Views: <span className="font-semibold">{photo.views.toLocaleString()}</span></span>
                <span><FaHeart className="inline mr-1 text-pink-400" />Likes: <span className="font-semibold">{photo.likes}</span></span>
              </div>
              <div className="flex flex-wrap gap-4 text-sm mb-1">
                <span><FaDownload className="inline mr-1 text-green-400" />Downloads: <span className="font-semibold">{photo.downloads}</span></span>
                <span><FaShareAlt className="inline mr-1 text-blue-400" />Shares: <span className="font-semibold">{photo.shares}</span></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Line Chart: Download Trends Over Time */}
      <div className="bg-gradient-to-br from-pink-100 via-blue-100 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 mb-8">
        <h3 className="text-xl font-bold mb-6 text-pink-700 dark:text-pink-300">Download Trends Over Time</h3>
        <div className="w-full max-w-2xl mx-auto">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={downloadTrends} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" stroke="#f472b6"/>
              <YAxis stroke="#f472b6"/>
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="downloads" stroke="#f472b6" strokeWidth={3} dot={true} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Like Distribution */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
        <h3 className="text-xl font-bold mb-6 text-green-700 dark:text-green-300">Like Distribution</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {likeDistribution.map((like) => (
            <div key={like.range} className="rounded-xl shadow p-6 border-t-4 flex flex-col gap-2" style={{ borderColor: like.color }}>
              <div className="flex items-center gap-3 mb-2">
                <FaHeart className="text-pink-400 text-lg" />
                <span className="font-bold text-lg" style={{ color: like.color }}>{like.range}</span>
              </div>
              <div className="flex flex-wrap gap-4 text-sm mb-1">
                <span>Photos: <span className="font-semibold">{like.count}</span></span>
                <span>({like.percent}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}