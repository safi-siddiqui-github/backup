import { FaEnvelope, FaShareAlt, FaBullhorn, FaCheckCircle, FaDollarSign, FaChartLine, FaUsers, FaMousePointer } from "react-icons/fa";

const campaigns = [
  {
    name: "Early Bird Email", channel: "Email", status: "completed", roi: "4.8x", reach: 12500, clicks: 2340, conversions: 89, spend: 250, cpa: 2.81, icon: <FaEnvelope className="text-indigo-500 text-2xl" />
  },
  {
    name: "Social Media Push", channel: "Social", status: "active", roi: "3.5x", reach: 18900, clicks: 3456, conversions: 112, spend: 1200, cpa: 10.71, icon: <FaShareAlt className="text-blue-500 text-2xl" />
  },
  {
    name: "Retargeting Ads", channel: "Paid Ads", status: "active", roi: "2.9x", reach: 8900, clicks: 1890, conversions: 67, spend: 800, cpa: 11.94, icon: <FaBullhorn className="text-pink-500 text-2xl" />
  },
  {
    name: "Influencer Campaign", channel: "Social", status: "completed", roi: "2.1x", reach: 5370, clicks: 1259, conversions: 44, spend: 2250, cpa: 51.14, icon: <FaShareAlt className="text-green-500 text-2xl" />
  },
];

function CampaignCard({ icon, name, channel, status, roi, reach, clicks, conversions, spend, cpa }: any) {
  const statusColor = status === "active" ? "bg-green-100 text-green-700" : "bg-indigo-100 text-indigo-700";
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 mb-6 flex flex-col md:flex-row gap-6 items-center">
      <div className="flex flex-col items-center md:items-start gap-2 min-w-[120px]">
        {icon}
        <div className="font-bold text-lg text-indigo-700 dark:text-indigo-300">{name}</div>
        <div className="text-xs font-semibold text-gray-500 dark:text-gray-300">{channel}</div>
        <span className={`px-2 py-0.5 rounded-full text-xs font-bold mt-1 ${statusColor}`}>{status}</span>
      </div>
      <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="flex flex-col items-center">
          <FaChartLine className="text-indigo-400 text-lg mb-1" />
          <span className="font-bold text-indigo-700 dark:text-indigo-300">{roi}</span>
          <span className="text-xs text-gray-500 dark:text-gray-300">ROI</span>
        </div>
        <div className="flex flex-col items-center">
          <FaUsers className="text-blue-400 text-lg mb-1" />
          <span className="font-bold text-blue-700 dark:text-blue-300">{reach.toLocaleString()}</span>
          <span className="text-xs text-gray-500 dark:text-gray-300">Reach</span>
        </div>
        <div className="flex flex-col items-center">
          <FaMousePointer className="text-pink-400 text-lg mb-1" />
          <span className="font-bold text-pink-700 dark:text-pink-300">{clicks.toLocaleString()}</span>
          <span className="text-xs text-gray-500 dark:text-gray-300">Clicks</span>
        </div>
        <div className="flex flex-col items-center">
          <FaCheckCircle className="text-green-400 text-lg mb-1" />
          <span className="font-bold text-green-700 dark:text-green-300">{conversions}</span>
          <span className="text-xs text-gray-500 dark:text-gray-300">Conversions</span>
        </div>
        <div className="flex flex-col items-center">
          <FaDollarSign className="text-yellow-400 text-lg mb-1" />
          <span className="font-bold text-yellow-700 dark:text-yellow-300">${spend.toLocaleString()}</span>
          <span className="text-xs text-gray-500 dark:text-gray-300">Spend</span>
        </div>
        <div className="flex flex-col items-center">
          <FaDollarSign className="text-indigo-400 text-lg mb-1" />
          <span className="font-bold text-indigo-700 dark:text-indigo-300">${cpa}</span>
          <span className="text-xs text-gray-500 dark:text-gray-300">CPA</span>
        </div>
      </div>
    </div>
  );
}

export default function MarketingCampaignsTab() {
  return (
    <div className="space-y-8">
      <div className="font-bold text-2xl mb-6 text-indigo-700 dark:text-indigo-300 text-center">Campaign Performance</div>
      {campaigns.map((c, idx) => (
        <CampaignCard key={idx} {...c} />
      ))}
    </div>
  );
}
