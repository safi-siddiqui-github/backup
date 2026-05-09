"use client";


import React from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import TicketOverviewTab from "./TicketOverviewTab";
import TicketSalesTab from "./TicketSalesTab";
import TicketPromosTab from "./PromosTab";
import TicketDemographicsTab from "./DemographicsTab";

type TicketTabsProps<TabKey extends string> = {
  selected: number;
  setSelected: (index: number) => void;
  tabKeys: readonly TabKey[];
  ticketTabs: { key: TabKey; label: string }[];
  tabStyles: Record<TabKey, { text: string; border: string; selectedBg: string }>;
};

export default function TicketTabs<TabKey extends string>({ selected, setSelected, tabKeys, ticketTabs, tabStyles }: TicketTabsProps<TabKey>) {
  return (
    <Tabs selectedIndex={selected} onSelect={setSelected}>
      <TabList className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-2 mb-5">
        {ticketTabs.map((tab, idx) => (
          <Tab
            key={tab.key}
            className={`cursor-pointer rounded-lg border px-3 py-2 text-sm font-medium border-gray-200 dark:border-slate-600 focus:outline-none w-full flex items-center justify-center ${tabStyles[tab.key].text} ${tabStyles[tab.key].border}`}
            selectedClassName={`${tabStyles[tab.key].selectedBg} text-white shadow-md border-2 ${tabStyles[tab.key].selectedBg}`}
          >
            <span>{tab.label}</span>
          </Tab>
        ))}
      </TabList>

      {/* Overview */}
      <TabPanel>
        <Panel title="Overview">
           <TicketOverviewTab />
        </Panel>
      </TabPanel>

      {/* Sales */}
      <TabPanel>
        <Panel title="Sales">
           <TicketSalesTab />
        </Panel>
      </TabPanel>

      {/* Promos */}
      <TabPanel>
        <Panel title="Promos">
                 <TicketPromosTab />

        </Panel>
      </TabPanel>

      {/* Demographics */}
      <TabPanel>
        <Panel title="Demographics">
          <TicketDemographicsTab />
        </Panel>
      </TabPanel>

      {/* Check-in */}
      <TabPanel>
        <Panel title="Check-in">
          <div className="w-full bg-gradient-to-br from-blue-100 via-green-100 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow p-8 mb-8">
            <h3 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-300">Check-in Overview</h3>
            <ul className="list-disc pl-6 text-gray-700 dark:text-slate-300 text-base mb-4">
              <li>Average check-in time: <span className="font-semibold text-blue-700 dark:text-blue-300">3m 12s</span></li>
              <li>Peak check-in hour: <span className="font-semibold text-green-700 dark:text-green-300">9:00 AM - 10:00 AM</span></li>
              <li>On-site check-ins: <span className="font-semibold text-indigo-700 dark:text-indigo-300">82%</span></li>
              <li>Mobile check-ins: <span className="font-semibold text-pink-700 dark:text-pink-300">18%</span></li>
              <li>No-shows: <span className="font-semibold text-red-600 dark:text-red-400">7%</span></li>
            </ul>
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">Tip: Encourage mobile check-in for faster entry and reduced lines.</div>
          </div>
        </Panel>
      </TabPanel>

      {/* Insights */}
      <TabPanel>
        <Panel title="Insights">
          <div className="w-full bg-gradient-to-br from-pink-100 via-blue-100 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow p-8 mb-8">
            <h3 className="text-xl font-bold mb-4 text-pink-700 dark:text-pink-300">AI Insights</h3>
            <ul className="list-disc pl-6 text-gray-700 dark:text-slate-300 text-base mb-4">
              <li>Most popular ticket type: <span className="font-semibold text-blue-700 dark:text-blue-300">VIP</span></li>
              <li>Best performing promo: <span className="font-semibold text-green-700 dark:text-green-300">EARLYBIRD20</span></li>
              <li>Highest conversion age group: <span className="font-semibold text-indigo-700 dark:text-indigo-300">25-34</span></li>
              <li>Suggested improvement: <span className="font-semibold text-pink-700 dark:text-pink-300">Add more payment options</span></li>
              <li>AI tip: <span className="font-semibold text-yellow-600 dark:text-yellow-300">Send reminder emails 24h before event</span></li>
            </ul>
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">Learn from these insights to optimize your next event.</div>
          </div>
        </Panel>
      </TabPanel>
    </Tabs>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-[#020617]  border-gray-200 dark:border-slate-600 space-y-4">
       
      {children}
    </div>
  );
}
