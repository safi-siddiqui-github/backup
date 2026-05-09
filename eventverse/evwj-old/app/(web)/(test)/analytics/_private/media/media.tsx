import React from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import { FaUserFriends, FaStar, FaCamera, FaDatabase, FaDownload, FaSmile } from "react-icons/fa";
import MediaOverviewTab from "./MediaOverviewTab";
import MediaEngagementTab from "./MediaEngagementTab";
import MediaAIAnalysisTab from "./MediaAIAnalysisTab";
import MediaStorageTab from "./MediaStorageTab";
import MediaSocialTab from "./MediaSocialTab";
import MediaInsightsTab from "./MediaInsightsTab";

const stats = [
    { label: "People Detected", value: "248", icon: <FaUserFriends className="text-white text-2xl" /> },
    { label: "Avg Quality Score", value: "8.4/10", icon: <FaStar className="text-white text-2xl" /> },
    { label: "Top Moment", value: "First Dance", icon: <FaCamera className="text-white text-2xl" /> },
    { label: "Storage Used", value: "12.4GB", icon: <FaDatabase className="text-white text-2xl" /> },
    { label: "Download Rate", value: "7%", icon: <FaDownload className="text-white text-2xl" /> },
    { label: "Status", value: "Good", icon: <FaSmile className="text-white text-2xl" /> },
];

const tabLabels = ["Overview", "Engagement", "AI Analysis", "Storage", "Social", "Insights"];

function getGradient(idx: number) {
    const gradients = [
        "from-blue-400 via-blue-500 to-indigo-500",
        "from-green-400 via-green-500 to-emerald-500",
        "from-indigo-400 via-blue-400 to-blue-600",
        "from-pink-400 via-pink-500 to-rose-500",
        "from-yellow-300 via-yellow-400 to-yellow-500",
        "from-green-400 via-green-500 to-emerald-500",
    ];
    return gradients[idx] || "from-gray-400 to-gray-500";
}

function StatCard({ icon, value, label, gradient }: { icon: React.ReactNode; value: string; label: string; gradient: string }) {
    return (
        <div className={`flex flex-col items-center justify-center rounded-xl shadow-lg px-6 py-6 bg-gradient-to-br ${gradient} min-h-[120px]`}>
            <div className="mb-2">{icon}</div>
            <div className="text-2xl font-extrabold text-white drop-shadow mb-1">{value}</div>
            <div className="text-xs font-semibold text-white/80 tracking-wide text-center">{label}</div>
        </div>
    );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="bg-white dark:bg-[#020617] border border-gray-200 dark:border-slate-600 space-y-4 p-6 rounded-xl shadow">
            {children}
        </div>
    );
}

export default function AnalyticsMedia() {
    const [selected, setSelected] = React.useState(0);

    return (
        <div className="space-y-10">
            {/* Header Banner with Stats */}
            <div className="w-full bg-gradient-to-br from-indigo-100 via-blue-100 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 flex flex-col gap-8 mb-8">
                <h2 className="text-3xl font-extrabold mb-6 text-center text-indigo-700 dark:text-indigo-300 tracking-wide">
                    AI Media Intelligence
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {stats.map((stat, idx) => (
                        <StatCard key={idx} icon={stat.icon} value={stat.value} label={stat.label} gradient={getGradient(idx)} />
                    ))}
                </div>
            </div>

            {/* Tabs Section */}
            <Tabs selectedIndex={selected} onSelect={setSelected}>
                <TabList className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-2 mb-5">
                    {tabLabels.map((label, idx) => (
                        <Tab
                            key={idx}
                            className="cursor-pointer rounded-lg border px-3 py-2 text-sm font-medium border-gray-200 dark:border-slate-600 focus:outline-none w-full flex items-center justify-center text-indigo-700 dark:text-indigo-300"
                            selectedClassName="bg-indigo-500 dark:bg-indigo-700 text-white shadow-md border-2 border-indigo-500 dark:border-indigo-700"
                        >
                            {label}
                        </Tab>
                    ))}
                </TabList>

                <TabPanel>
                    <Section title="Overview">
                        <MediaOverviewTab />
                    </Section>
                </TabPanel>

                <TabPanel>
                    <Section title="Engagement">
                        <MediaEngagementTab />
                    </Section>
                </TabPanel>

                <TabPanel>
                    <Section title="AI Analysis">
                        <MediaAIAnalysisTab />
                    </Section>
                </TabPanel>

                <TabPanel>
                    <Section title="Storage">
                        <MediaStorageTab />
                    </Section>
                </TabPanel>

                <TabPanel>
                    <Section title="Social">
                        <MediaSocialTab />
                    </Section>
                </TabPanel>

                <TabPanel>
                    <Section title="Insights">
                        <MediaInsightsTab />
                    </Section>
                </TabPanel>
            </Tabs>
        </div>
    );
}