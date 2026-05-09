"use client";
import { useMemo, useState, type ReactNode } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import OverviewCharts from "./overview/overview-charts";
import RSVPReport from "./rsvp/rsvp";
import Budget from "./budget/budget";
import AnalyticsTicketTab from "./ticket/ticket";
import AnalyticsSeating from "./seating/seating";
import AnalyticsMedia from "./media/media";
import ScheduleAnalytics from "./schedule/schedule";
import AnalyticsGamesTab from './games/games';
import AnalyticsAnnouncements from "./announcements/announcements";
import AnalyticsSurvey from "./survey/survey";
import AnalyticsMarketingTab from "./marketing/marketing";

type TabItem = {
  label: string;
  description?: string;
  node?: (helpers?: { onNavigateTab?: (label: string) => void }) => ReactNode;
};

const tabs: TabItem[] = [
  { label: "Overview", node: ({ onNavigateTab } = {}) => <OverviewCharts onNavigateTab={onNavigateTab} /> },
  { label: "Cross-Module", description: "Cross-cutting analytics across modules." },
  { label: "RSVP", description: "RSVP funnel, conversions, and attendance forecasts.", node: () => <RSVPReport /> },
  { label: "Ticketing", node: () => <AnalyticsTicketTab /> },
  { label: "Budget", node: () => <Budget/> },
  { label: "Seating", node: () => <AnalyticsSeating /> },
  { label: "Media", node: () => <AnalyticsMedia /> },
  { label: "Schedule", node: () => <ScheduleAnalytics /> },
  { label: "Announcements",  node: () => <AnalyticsAnnouncements /> },
  { label: "Games", node : () => <AnalyticsGamesTab /> },
  { label: "Survey", node: () => <AnalyticsSurvey /> },
  // { label: "Travel", description: "Arrivals, departures, and itinerary adherence." },
  { label: "Marketing", node: () => <AnalyticsMarketingTab /> },
  // { label: "Website", description: "Traffic, conversion, and interaction heatmaps." },
];

export default function AnalyticsAndReportingTabs() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const labelToIndex = useMemo(() => {
    const map: Record<string, number> = {};
    tabs.forEach((t, idx) => {
      map[t.label] = idx;
    });
    return map;
  }, []);

  const handleNavigateTab = (label: string) => {
    const idx = labelToIndex[label];
    if (typeof idx === "number") {
      setSelectedIndex(idx);
    }
  };

  return (
    <>
      <div className="w-full px-4 sm:px-6 lg:px-8 my-8">
        <Tabs selectedIndex={selectedIndex} onSelect={(index) => setSelectedIndex(index)}>
          <TabList className="tab-scroll py-6 px-8 flex flex-nowrap gap-1 overflow-x-auto rounded-2xl border border-sky-100 bg-linear-to-r from-fuchsia-100 via-sky-100 to-violet-100   shadow-md shadow-sky-100/70 backdrop-blur [scrollbar-width:none] [-ms-overflow-style:none] dark:border-slate-700 dark:bg-linear-to-r dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 dark:shadow-[0_15px_35px_-12px_rgba(59,130,246,0.35)] ">
            {tabs.map((tab) => (
              <Tab
                key={tab.label}
                className="cursor-pointer shrink-0 whitespace-nowrap rounded-md border border-transparent px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white/70 hover:text-slate-900 focus:outline-none    dark:text-slate-200 dark:hover:bg-slate-800/70"
                selectedClassName="border border-sky-500 bg-gray-900 dark:bg-gray-100  text-white dark:text-black shadow-md shadow-sky-200/50 dark:border-sky-400 dark:bg-slate-800/90 dark:text-sky-300"
              >
                {tab.label}
              </Tab>
            ))}
          </TabList>

          {tabs.map((tab) => (
            <TabPanel key={tab.label} className="mt-4 focus:outline-none">
              {tab.node ? tab.node({ onNavigateTab: handleNavigateTab }) : (
                <PanelShell title={tab.label} description={tab.description || ""} />
              )}
            </TabPanel>
          ))}
        </Tabs>
      </div>
      <style jsx>{`
        .tab-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}

function PanelShell({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-xl border bg-white/70 p-4 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/60">
      <h4 className="text-lg font-semibold">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}