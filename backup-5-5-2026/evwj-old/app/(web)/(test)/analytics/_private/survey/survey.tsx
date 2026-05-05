import { useState } from "react";
import { FaChartPie, FaStar, FaSmile, FaLightbulb } from "react-icons/fa";
import OverviewTab from "./OverviewTab";
import NPSTab from "./NPSTab";
import SentimentTab from "./SentimentTab";
import InsightsTab from "./InsightsTab";

const surveys = [
    "All Surveys Combined",
    "Post-Event Feedback",
    "Session Evaluation",
    "Vendor Satisfaction",
    "Custom Survey 1",
];

const tabs = [
    { label: "Overview", icon: <FaChartPie className="text-xl" />, component: <OverviewTab /> },
    { label: "NPS", icon: <FaStar className="text-xl" />, component: <NPSTab /> },
    { label: "Sentiment", icon: <FaSmile className="text-xl" />, component: <SentimentTab /> },
    { label: "Insights", icon: <FaLightbulb className="text-xl" />, component: <InsightsTab /> },
];

export default function AnalyticsSurvey() {
    const [selectedSurvey, setSelectedSurvey] = useState(surveys[0]);
    const [activeTab, setActiveTab] = useState(0);
    return (
        <div className="space-y-10">
            {/* Header Banner */}
            <div className="w-full flex flex-col lg:flex-row justify-between items-center bg-gradient-to-br from-indigo-100 via-blue-100 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 flex flex-col gap-4 mb-8">
             <div>
                   <h2 className="text-3xl font-extrabold text-center text-indigo-700 dark:text-indigo-300 tracking-wide mb-2">
                    Survey Analytics Dashboard
                </h2>
                <div className="text-center text-gray-600 dark:text-gray-300 mb-4">
                    Comprehensive feedback analysis with AI-powered insights
                </div>
             </div>
                <div className="flex justify-center">
                    <select
                        className="rounded-lg px-4 py-2 border border-indigo-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-indigo-700 dark:text-indigo-200 font-semibold shadow focus:outline-none"
                        value={selectedSurvey}
                        onChange={e => setSelectedSurvey(e.target.value)}
                    >
                        {surveys.map((survey, idx) => (
                            <option key={idx} value={survey}>{survey}</option>
                        ))}
                    </select>
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