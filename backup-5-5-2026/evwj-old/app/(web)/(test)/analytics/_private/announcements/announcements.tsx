import { FaClock, FaCalendarDay, FaEnvelopeOpenText, FaChartLine, FaExclamationTriangle, FaSmile } from "react-icons/fa";
import { useState } from "react";
import OverviewTab from "./OverviewTab";
import ChannelsTab from "./ChannelsTab";
import EngagementTab from "./EngagementTab";
import ABTestingTab from "./ABTestingTab";
import InsightsTab from "./InsightsTab";
import AnnouncementTabs from "./AnnouncementTabs";

const stats = [
    { label: "Best Send Time", value: "7:00 PM", icon: <FaClock className="text-white text-2xl" />, gradient: "from-blue-400 via-blue-500 to-indigo-500" },
    { label: "Best Day", value: "Tuesday", icon: <FaCalendarDay className="text-white text-2xl" />, gradient: "from-green-400 via-green-500 to-emerald-500" },
    { label: "Predicted Open Rate", value: "74.5%", icon: <FaEnvelopeOpenText className="text-white text-2xl" />, gradient: "from-pink-400 via-pink-500 to-rose-500" },
    { label: "Optimal Frequency", value: "2-3 per week", icon: <FaChartLine className="text-white text-2xl" />, gradient: "from-yellow-300 via-yellow-400 to-yellow-500" },
    { label: "Fatigue Risk", value: "18%", icon: <FaExclamationTriangle className="text-white text-2xl" />, gradient: "from-indigo-400 via-blue-400 to-blue-600" },
    { label: "Status", value: "Low", icon: <FaSmile className="text-white text-2xl" />, gradient: "from-green-400 via-green-500 to-emerald-500" },
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

export default function AnalyticsAnnouncements() {
    return (
        <div className="space-y-10">
            {/* Header Banner with Stats */}
            <div className="w-full bg-gradient-to-br from-indigo-100 via-blue-100 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 flex flex-col gap-8 mb-8">
                <h2 className="text-3xl font-extrabold mb-6 text-center text-indigo-700 dark:text-indigo-300 tracking-wide">
                    AI-Powered Announcement Insights
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {stats.map((stat, idx) => (
                        <StatCard key={idx} icon={stat.icon} value={stat.value} label={stat.label} gradient={stat.gradient} />
                    ))}
                </div>
            </div>


            {/* Tabbed Section */}
            <AnnouncementTabs />
        </div>
    );
}