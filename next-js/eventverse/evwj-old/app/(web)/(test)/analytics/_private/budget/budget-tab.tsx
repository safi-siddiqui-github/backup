"use client";

import React from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import BudgetOverview from "./budget-overviewTab";
import { BudgetTabsProps } from "./types";
import BudgetCategoryTab from "./budget-categoryTab";
import BudgetVendorsTab from "./budget-vendorsTab";
import BudgetCashflowTab from "./budget-cashflowTab";
import BudgetROIAnalysisTab from "./budget-ROIanalysisTab";
import BudgetInsightsTab from "./budget-insightsTab";


export function BudgetTabs({ tabs, selected, setSelected }: BudgetTabsProps) {
  return (
    <Tabs selectedIndex={selected} onSelect={setSelected}>
      <TabList className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-2 mb-5">
        {tabs.map((tab) => (
          <Tab
            key={tab.key}
            className="cursor-pointer rounded-lg border px-3 py-2 text-sm font-medium text-gray-700 dark:text-slate-300 border-gray-200 dark:border-slate-600 focus:outline-none"
            selectedClassName="bg-indigo-600 text-white border-indigo-600"
          >
            <div className="flex items-center justify-between gap-2">
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className="text-xs bg-black/10 dark:bg-white/20 px-2 py-0.5 rounded-full">
                  {tab.count}
                </span>
              )}
            </div>
          </Tab>
        ))}
      </TabList>

      {/* Overview */}
      <TabPanel>
        <Panel>
          <BudgetOverview />
        </Panel>
      </TabPanel>

      {/* Categories */}
      <TabPanel>
        <Panel  >
          <BudgetCategoryTab />
        </Panel>
      </TabPanel>

      {/* Vendors */}
      <TabPanel>
        <Panel>
        <BudgetVendorsTab />
        </Panel>
      </TabPanel>

      {/* Cash Flow */}
      <TabPanel>
        <Panel>
         <BudgetCashflowTab/>
        </Panel>
      </TabPanel>

      {/* ROI */}
      <TabPanel>
        <Panel>
         <BudgetROIAnalysisTab/>
        </Panel>
      </TabPanel>

      {/* Insights */}
      <TabPanel>
        <Panel >
          <BudgetInsightsTab />
        </Panel>
      </TabPanel>
    </Tabs>
  );
}


function Panel({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-[#020617] p-6 rounded-xl border border-gray-200 dark:border-slate-600 space-y-4">
      {title && <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-200">{title}</h2>}
      {children}
    </div>
  );
}

function CategoryItem({ name, details }: { name: string; details: string }) {
  return (
    <div className="p-4 rounded-lg border border-gray-200 dark:border-slate-600">
      <div className="font-semibold">{name}</div>
      <div className="text-sm text-gray-600 dark:text-slate-400">{details}</div>
    </div>
  );
}

function ListItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-slate-700 last:border-0">
      <span>{label}</span>
      <span className="text-sm text-gray-600 dark:text-slate-400">{value}</span>
    </div>
  );
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="p-4 rounded-lg border border-gray-200 dark:border-slate-600">
      <div className="font-semibold">{title}</div>
      <div className="text-sm text-gray-600 dark:text-slate-400">{value}</div>
    </div>
  );
}
