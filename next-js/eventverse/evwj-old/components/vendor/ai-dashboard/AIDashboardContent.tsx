"use client";

import WelcomeCard from "./welcome/WelcomeCard";
import BusinessInsights from "./business-insights/BusinessInsights";
import PerformanceMetrics from "./performace-metrics/PerformanceMetrics";
import RecentActivity from "./recent-activity/RecentActivity";
import UpcomingEvents from "./upcoming-events/UpcomingEvents";

export default function AIDashboardContent() {
  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
      {/* Welcome Card */}
      <WelcomeCard />

      {/* AI Business Insights */}
      <BusinessInsights />

      {/* Performance Metrics */}
      <PerformanceMetrics />

      {/* Recent Activity and Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <RecentActivity />
        <UpcomingEvents />
      </div>
    </div>
  );
}

