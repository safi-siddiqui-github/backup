import { useState } from "react";
import { FaChartPie, FaBullhorn, FaShareAlt, FaEnvelope, FaUsers, FaLightbulb, FaDollarSign, FaArrowUp, FaCalendarDay } from "react-icons/fa";
import MarketingOverviewTab from "./MarketingOverviewTab";
import MarketingCampaignsTab from "./MarketingCampaignsTab";
import MarketingChannelsTab from "./MarketingChannelsTab";
import MarketingEmailTab from "./MarketingEmailTab";
import MarketingSocialTab from "./MarketingSocialTab";
import MarketingInsightsTab from "./MarketingInsightsTab";

const summaryStats = [
    { label: "Projected Conversions", value: "420", icon: <FaUsers className="text-indigo-500 text-2xl" /> },
    { label: "Projected ROI", value: "3.8x", icon: <FaDollarSign className="text-green-500 text-2xl" /> },
    { label: "Peak Day", value: "Thursday", icon: <FaCalendarDay className="text-blue-500 text-2xl" /> },
    { label: "Total Spend", value: "$4500", icon: <FaDollarSign className="text-yellow-500 text-2xl" /> },
    { label: "Current ROI", value: "3.2x", icon: <FaArrowUp className="text-green-500 text-2xl" /> },
    { label: "+15% vs goal", value: "", icon: <FaBullhorn className="text-pink-500 text-2xl" /> },
];

const tabs = [
    { label: "Overview", icon: <FaChartPie className="text-xl" />, component: <MarketingOverviewTab /> },
    { label: "Campaigns", icon: <FaBullhorn className="text-xl" />, component: <MarketingCampaignsTab /> },
    { label: "Channels", icon: <FaShareAlt className="text-xl" />, component: <MarketingChannelsTab /> },
    { label: "Email", icon: <FaEnvelope className="text-xl" />, component: <MarketingEmailTab /> },
    { label: "Social", icon: <FaUsers className="text-xl" />, component: <MarketingSocialTab /> },
    { label: "Insights", icon: <FaLightbulb className="text-xl" />, component: <MarketingInsightsTab /> },
];

export default function AnalyticsMarketingTab() {
    const [activeTab, setActiveTab] = useState(0);
    return (
        <div className="space-y-10">
            {/* Header Banner */}
            <div className="w-full bg-gradient-to-br from-indigo-100 via-blue-100 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 flex flex-col gap-4 mb-8">
                <h2 className="text-3xl font-extrabold text-center text-indigo-700 dark:text-indigo-300 tracking-wide mb-2">
                    Marketing Intelligence Hub
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {summaryStats.map((stat, idx) => (
                        <div key={idx} className="flex flex-col items-center justify-center rounded-xl shadow px-4 py-4 bg-gradient-to-br from-white/80 via-blue-50 to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-[100px]">
                            <div className="mb-2">{stat.icon}</div>
                            {stat.value && <div className="text-2xl font-extrabold text-indigo-700 dark:text-indigo-300 drop-shadow mb-1">{stat.value}</div>}
                            <div className="text-xs font-semibold text-gray-600 dark:text-gray-300 tracking-wide text-center">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tabbed Section */}
            <div className="w-full">
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {tabs.map((tab, idx) => (
                        <button
                            key={tab.label}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm
                                ${activeTab === idx
                                    ? "bg-indigo-600 text-white shadow"
                                    : "bg-indigo-100 dark:bg-gray-800 text-indigo-700 dark:text-indigo-200 hover:bg-indigo-200 dark:hover:bg-gray-700"}
                            `}
                            onClick={() => setActiveTab(idx)}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>
                <div className="rounded-xl bg-white dark:bg-gray-900 shadow p-4 min-h-[120px]">
                    {tabs[activeTab].component}
                </div>
            </div>
        </div>
    );
}