import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import RSVPOverview from "./rsvp-overview";
import RSVPEngagement from "./rsvp-engagement";
import RSVPDelivery from './rsvp-delivery';
import RSVPInsights from './rsvp-insights';
import RSVPDemographics from './rsvp-demographics';

export default function RSVPTabs() {
  return (
    <div className="mt-8 w-full">
      <Tabs className="w-full">
        <TabList className="tab-scroll w-full py-4 px-8 flex flex-wrap gap-2 rounded-2xl border border-indigo-200 bg-linear-to-r from-indigo-50 via-purple-50 to-pink-50 shadow-md shadow-indigo-100/70 backdrop-blur text-center dark:border-indigo-800 dark:bg-linear-to-r dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950 dark:shadow-[0_15px_35px_-12px_rgba(79,70,229,0.35)]">
          <Tab className="flex-1 cursor-pointer rounded-xl border border-transparent px-3 py-1.5 text-sm font-semibold text-indigo-700 transition hover:bg-white/70 hover:text-indigo-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-indigo-200 dark:hover:bg-indigo-900/70" selectedClassName="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md ring-2 ring-indigo-300 dark:from-indigo-500 dark:via-purple-500 dark:to-pink-500 dark:ring-indigo-500/40">
            Overview
          </Tab>
          <Tab className="flex-1 cursor-pointer rounded-xl border border-transparent px-3 py-1.5 text-sm font-semibold text-indigo-700 transition hover:bg-white/70 hover:text-indigo-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-indigo-200 dark:hover:bg-indigo-900/70" selectedClassName="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md ring-2 ring-indigo-300 dark:from-indigo-500 dark:via-purple-500 dark:to-pink-500 dark:ring-indigo-500/40">
            Engagement
          </Tab>
          <Tab className="flex-1 cursor-pointer rounded-xl border border-transparent px-3 py-1.5 text-sm font-semibold text-indigo-700 transition hover:bg-white/70 hover:text-indigo-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-indigo-200 dark:hover:bg-indigo-900/70" selectedClassName="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md ring-2 ring-indigo-300 dark:from-indigo-500 dark:via-purple-500 dark:to-pink-500 dark:ring-indigo-500/40">
            Delivery
          </Tab>
          <Tab className="flex-1 cursor-pointer rounded-xl border border-transparent px-3 py-1.5 text-sm font-semibold text-indigo-700 transition hover:bg-white/70 hover:text-indigo-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-indigo-200 dark:hover:bg-indigo-900/70" selectedClassName="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md ring-2 ring-indigo-300 dark:from-indigo-500 dark:via-purple-500 dark:to-pink-500 dark:ring-indigo-500/40">
            Demographics
          </Tab>
          <Tab className="flex-1 cursor-pointer rounded-xl border border-transparent px-3 py-1.5 text-sm font-semibold text-indigo-700 transition hover:bg-white/70 hover:text-indigo-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-indigo-200 dark:hover:bg-indigo-900/70" selectedClassName="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md ring-2 ring-indigo-300 dark:from-indigo-500 dark:via-purple-500 dark:to-pink-500 dark:ring-indigo-500/40">
            Insights
          </Tab>
        </TabList>

        <TabPanel className="mt-4 focus:outline-none">
         <RSVPOverview />
        </TabPanel>

        <TabPanel className="mt-4 focus:outline-none">
         <RSVPEngagement />
        </TabPanel>

        <TabPanel className="mt-4 focus:outline-none">
        <RSVPDelivery />
        </TabPanel>

        <TabPanel className="mt-4 focus:outline-none">
         <RSVPDemographics />
        </TabPanel>

        <TabPanel className="mt-4 focus:outline-none">
         <RSVPInsights />
        </TabPanel>
      </Tabs>

      <style jsx>{`
        .tab-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
