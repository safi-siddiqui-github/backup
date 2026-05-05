import { useState } from "react";
import OverviewTab from "./OverviewTab";
import ChannelsTab from "./ChannelsTab";
import EngagementTab from "./EngagementTab";
import ABTestingTab from "./ABTestingTab";
import InsightsTab from "./InsightsTab";

const tabs = [
  { label: "Overview", component: <OverviewTab /> },
  { label: "Channels", component: <ChannelsTab /> },
  { label: "Engagement", component: <EngagementTab /> },
  { label: "A/B Testing", component: <ABTestingTab /> },
  { label: "Insights", component: <InsightsTab /> },
];

export default function AnnouncementTabs() {
  const [active, setActive] = useState(0);
  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {tabs.map((tab, idx) => (
          <button
            key={tab.label}
            className={`px-4 py-2 rounded-full font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm
              ${active === idx
                ? "bg-indigo-600 text-white shadow"
                : "bg-indigo-100 dark:bg-gray-800 text-indigo-700 dark:text-indigo-200 hover:bg-indigo-200 dark:hover:bg-gray-700"}
            `}
            onClick={() => setActive(idx)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="rounded-xl bg-white dark:bg-gray-900 shadow p-4 min-h-[120px]">
        {tabs[active].component}
      </div>
    </div>
  );
}
