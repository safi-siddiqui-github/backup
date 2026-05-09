"use client";

import React from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import {
  FaCheckCircle,
  FaUsers,
  FaClock,
  FaWheelchair,
  FaExchangeAlt,
  FaLightbulb,
} from "react-icons/fa";
import SeatingOverviewTab from "./SeatingOverview";
import SeatingOptimization from "./SeatingOptimization";
import SeatingGroupTab from './SeatingGroupTab';

// Stats data
const stats = [
  { label: "Utilization Rate", value: "76.2%", icon: <FaUsers className="text-white text-2xl" /> },
  { label: "Preference Match", value: "92%", icon: <FaCheckCircle className="text-white text-2xl" /> },
  { label: "Avg Assignment Time", value: "2.3 min", icon: <FaClock className="text-white text-2xl" /> },
  { label: "Conflicts Resolved", value: "21/23", icon: <FaExchangeAlt className="text-white text-2xl" /> },
  { label: "Accessibility Score", value: "94%", icon: <FaWheelchair className="text-white text-2xl" /> },
  { label: "Status", value: "Excellent", icon: <FaLightbulb className="text-white text-2xl" /> },
];

// Tab labels
const tabLabels = ["Overview", "Optimization", "Groups", "Accessibility", "Changes", "Insights"];

// Helper for gradients
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

// StatCard component
function StatCard({
  icon,
  value,
  label,
  gradient,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  gradient: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-xl shadow-lg px-6 py-6 bg-gradient-to-br ${gradient} min-h-[120px]`}
    >
      <div className="mb-2">{icon}</div>
      <div className="text-2xl font-extrabold text-white drop-shadow mb-1">{value}</div>
      <div className="text-xs font-semibold text-white/80 tracking-wide text-center">{label}</div>
    </div>
  );
}

// Section wrapper for TabPanel content
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-[#020617] border border-gray-200 dark:border-slate-600 space-y-4 p-6 rounded-xl shadow">
      {children}
    </div>
  );
}

// Main component
export default function AnalyticsSeating() {
  const [selected, setSelected] = React.useState(0);

  return (
    <div className="space-y-10">
      {/* Header Banner with Stats */}
      <div className="w-full bg-gradient-to-br from-indigo-100 via-blue-100 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 flex flex-col gap-8 mb-8">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-indigo-700 dark:text-indigo-300 tracking-wide">
          AI Seating Optimization Intelligence
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

        {/* Tab Panels */}
        <TabPanel>
          <Section title="Overview">
           <SeatingOverviewTab />
          </Section>
        </TabPanel>

        <TabPanel>
          <Section title="Optimization">
           <SeatingOptimization />
          </Section>
        </TabPanel>

        <TabPanel>
          <Section title="Groups">
           <SeatingGroupTab />
          </Section>
        </TabPanel>

        <TabPanel>
          <Section title="Accessibility">
            <div className="space-y-4">
              <div className="rounded-xl bg-gradient-to-br from-indigo-100 via-blue-100 to-green-100 dark:from-indigo-900 dark:via-blue-900 dark:to-green-900 p-5 shadow">
                <h3 className="font-bold text-indigo-800 dark:text-indigo-200 mb-1">Wheelchair Accessible Tables</h3>
                <p className="text-gray-800 dark:text-gray-100">Tables <span className="font-bold text-green-700 dark:text-green-300">2, 6, 9</span> are fully accessible. <span className="font-bold text-indigo-700 dark:text-indigo-300">3 guests</span> with accessibility needs have been assigned accordingly.</p>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-blue-100 via-pink-100 to-purple-100 dark:from-blue-900 dark:via-pink-900 dark:to-purple-900 p-5 shadow">
                <h3 className="font-bold text-blue-800 dark:text-blue-200 mb-1">Hearing Assistance</h3>
                <p className="text-gray-800 dark:text-gray-100">Hearing aid compatible seating is available at Tables <span className="font-bold text-pink-700 dark:text-pink-300">4, 8</span>. <span className="font-bold text-blue-700 dark:text-blue-300">2 guests</span> have requested this feature.</p>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-green-100 via-yellow-100 to-pink-100 dark:from-green-900 dark:via-yellow-900 dark:to-pink-900 p-5 shadow">
                <h3 className="font-bold text-green-800 dark:text-green-200 mb-1">Recommendations</h3>
                <ul className="list-disc ml-6 text-gray-800 dark:text-gray-100">
                  <li><span className="font-semibold text-yellow-700 dark:text-yellow-300">Consider adding ramps</span> near Table 5 for improved access.</li>
                  <li><span className="font-semibold text-pink-700 dark:text-pink-300">Provide large-print menus</span> for visually impaired guests at Table 7.</li>
                </ul>
              </div>
            </div>
          </Section>
        </TabPanel>

        <TabPanel>
          <Section title="Changes">
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-pink-700 dark:text-pink-300 mb-1">Recent Seating Changes</h3>
                <ul className="list-disc ml-6 text-gray-700 dark:text-slate-300">
                  <li>12/24/2025: Moved John Doe from Table 3 to Table 5 (dietary preference).</li>
                  <li>12/23/2025: Swapped guests between Table 2 and Table 6 for group cohesion.</li>
                  <li>12/22/2025: Added accessibility flag for Table 9.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-pink-700 dark:text-pink-300 mb-1">Audit Log</h3>
                <ul className="list-disc ml-6 text-gray-700 dark:text-slate-300">
                  <li>12/21/2025: Created new group for VIP guests.</li>
                  <li>12/20/2025: Updated seating plan for dietary clustering.</li>
                </ul>
              </div>
            </div>
          </Section>
        </TabPanel>

        <TabPanel>
          <Section title="Insights">
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-green-700 dark:text-green-300 mb-1">AI Insights</h3>
                <ul className="list-disc ml-6 text-gray-700 dark:text-slate-300">
                  <li>Groups seated together have a 15% higher satisfaction rate.</li>
                  <li>Dietary clustering reduced meal errors by 30% this event.</li>
                  <li>Accessibility improvements led to positive feedback from 4 guests.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-green-700 dark:text-green-300 mb-1">Learnings</h3>
                <ul className="list-disc ml-6 text-gray-700 dark:text-slate-300">
                  <li>Early assignment of large groups increases placement success.</li>
                  <li>Real-time feedback during check-in helps optimize last-minute changes.</li>
                </ul>
              </div>
            </div>
          </Section>
        </TabPanel>
      </Tabs>
    </div>
  );
}
