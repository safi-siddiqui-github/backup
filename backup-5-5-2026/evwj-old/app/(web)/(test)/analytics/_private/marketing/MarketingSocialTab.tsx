import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

const socialChannels = [
  { name: "Instagram", icon: <FaInstagram className="text-pink-500 text-2xl" />, followers: 2340, engagement: "5.8%", posts: 24, reach: 18500 },
  { name: "Facebook", icon: <FaFacebook className="text-blue-600 text-2xl" />, followers: 4560, engagement: "3.2%", posts: 18, reach: 12300 },
  { name: "Twitter", icon: <FaTwitter className="text-blue-400 text-2xl" />, followers: 1890, engagement: "2.8%", posts: 32, reach: 8900 },
  { name: "LinkedIn", icon: <FaLinkedin className="text-blue-700 text-2xl" />, followers: 890, engagement: "4.5%", posts: 12, reach: 5670 },
];
const barData = [
  { channel: "Instagram", reach: 18500 },
  { channel: "Facebook", reach: 12300 },
  { channel: "Twitter", reach: 8900 },
  { channel: "LinkedIn", reach: 5670 },
];
const barColors = ["#f472b6", "#3b82f6", "#60a5fa", "#6366f1"];

function SocialCard({ icon, name, followers, engagement, posts, reach }: any) {
  return (
    <div className="flex items-center gap-4 bg-white dark:bg-gray-900 rounded-xl shadow p-4 mb-4">
      <div>{icon}</div>
      <div className="flex-1">
        <div className="font-bold text-lg text-gray-800 dark:text-gray-100">{name}</div>
        <div className="flex flex-wrap gap-4 mt-1 text-sm">
          <span className="text-indigo-600 dark:text-indigo-300 font-semibold">Followers: {followers.toLocaleString()}</span>
          <span className="text-pink-600 dark:text-pink-300 font-semibold">Engagement: {engagement}</span>
          <span className="text-blue-600 dark:text-blue-300 font-semibold">Posts: {posts}</span>
          <span className="text-green-600 dark:text-green-300 font-semibold">Reach: {reach.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

export default function MarketingSocialTab() {
  return (
    <div className="space-y-10">
      {/* Social Channel Cards */}
      <div>
        {socialChannels.map((ch, idx) => (
          <SocialCard key={idx} {...ch} />
        ))}
      </div>

      {/* Bar Chart: Social Media Reach Comparison */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
        <div className="font-bold text-lg mb-2 text-indigo-700 dark:text-indigo-300">Social Media Reach Comparison</div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={barData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="channel" className="text-xs"/>
            <YAxis className="text-xs"/>
            <Tooltip />
            <Bar dataKey="reach">
              {barData.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={barColors[idx % barColors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-right">Reach</div>
      </div>
    </div>
  );
}
