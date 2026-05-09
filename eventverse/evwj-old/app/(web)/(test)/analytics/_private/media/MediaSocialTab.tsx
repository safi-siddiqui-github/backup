import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { FaInstagram, FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { JSX } from "react";

const socialData = [
  { platform: "Instagram", shares: 456, clicks: 234, ctr: 51 },
  { platform: "Facebook", shares: 345, clicks: 189, ctr: 55 },
  { platform: "Twitter", shares: 189, clicks: 98, ctr: 52 },
  { platform: "WhatsApp", shares: 244, clicks: 0, ctr: 0 },
];

const platformIcons: Record<string, JSX.Element> = {
  Instagram: <FaInstagram className="text-pink-500 text-2xl" />,
  Facebook: <FaFacebook className="text-blue-600 text-2xl" />,
  Twitter: <FaTwitter className="text-blue-400 text-2xl" />,
  WhatsApp: <FaWhatsapp className="text-green-500 text-2xl" />,
};

export default function MediaSocialTab() {
  return (
    <div className="space-y-10">
      {/* Bar Chart: Social Sharing Analytics */}
      <div className="bg-gradient-to-br from-indigo-100 via-blue-100 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 mb-8">
        <h3 className="text-xl font-bold mb-6 text-indigo-700 dark:text-indigo-300">Social Sharing Analytics</h3>
        <div className="w-full max-w-2xl mx-auto">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={socialData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="platform" stroke="#6366f1"/>
              <YAxis stroke="#6366f1"/>
              <Tooltip />
              <Legend />
              <Bar dataKey="shares" fill="#f472b6" name="Shares" radius={[8, 8, 0, 0]} />
              <Bar dataKey="clicks" fill="#6366f1" name="Clicks" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Platform Details */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
        <h3 className="text-xl font-bold mb-6 text-green-700 dark:text-green-300">Platform Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {socialData.map((platform) => (
            <div key={platform.platform} className="rounded-xl shadow p-6 border-t-4 flex flex-col gap-2" style={{ borderColor: platform.platform === 'Instagram' ? '#f472b6' : platform.platform === 'Facebook' ? '#2563eb' : platform.platform === 'Twitter' ? '#60a5fa' : '#22c55e' }}>
              <div className="flex items-center gap-3 mb-2">
                {platformIcons[platform.platform]}
                <span className="font-bold text-lg">{platform.platform}</span>
              </div>
              <div className="flex flex-wrap gap-4 text-sm mb-1">
                <span>Shares: <span className="font-semibold">{platform.shares}</span></span>
                <span>Clicks: <span className="font-semibold">{platform.clicks}</span></span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-300">CTR</span>
                <span className="font-bold text-base text-indigo-700 dark:text-indigo-300">{platform.ctr ? `${platform.ctr}%` : '—'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}