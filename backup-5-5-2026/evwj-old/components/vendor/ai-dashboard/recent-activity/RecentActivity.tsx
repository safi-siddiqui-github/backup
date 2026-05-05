"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MessageSquare, DollarSign, Bell, CheckCircle, Calendar, ArrowRight, Clock } from "lucide-react";
import { useActivityNavigationStore, ActivityType } from "@/lib/activity-navigation-store";

interface ActivityItemData {
  type: ActivityType;
  icon: React.ReactNode;
  text: string;
  time: string;
  metadata?: Record<string, any>;
}

interface ActivityItemProps {
  type: ActivityType;
  icon: React.ReactNode;
  text: string;
  time: string;
  metadata?: Record<string, any>;
}

function ActivityItem({ type, icon, text, time, metadata }: ActivityItemProps) {
  const { navigateToActivity } = useActivityNavigationStore();

  const handleClick = () => {
    navigateToActivity(type, metadata);
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer group"
    >
      <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-900/30 text-blue-600 dark:text-blue-400">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white truncate">{text}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{time}</p>
      </div>
      <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors shrink-0" />
    </div>
  );
}

export default function RecentActivity() {
  const activities: ActivityItemData[] = [
    {
      type: "message",
      icon: <MessageSquare className="h-4 w-4" />,
      text: "New message from Sarah & Michael",
      time: "5 min ago",
      metadata: { leadId: "1" }, // Optional: can be used to open specific lead's communications
    },
    {
      type: "payment",
      icon: <DollarSign className="h-4 w-4" />,
      text: "Payment received - $2,500",
      time: "2 hours ago",
    },
    {
      type: "new-lead",
      icon: <Bell className="h-4 w-4" />,
      text: "New lead: Corporate Event",
      time: "3 hours ago",
    },
    {
      type: "contract",
      icon: <CheckCircle className="h-4 w-4" />,
      text: "Contract signed by Elite Events",
      time: "Yesterday",
      metadata: { leadId: "1" }, // Lead ID for the contract
    },
    {
      type: "upcoming-event",
      icon: <Calendar className="h-4 w-4" />,
      text: "Upcoming: Johnson Wedding Setup",
      time: "Tomorrow",
      metadata: { clientId: "1" }, // Client ID for the upcoming event
    },
  ];

  return (
    <Card className="py-4 sm:py-5">
      <CardHeader className="pb-3 sm:pb-4">
        <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400 shrink-0" />
          <CardTitle className="text-lg sm:text-xl font-bold">Recent Activity</CardTitle>
        </div>
        <CardDescription className="text-xs sm:text-sm">Latest updates and actions</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-1">
          {activities.map((activity, index) => (
            <ActivityItem
              key={index}
              type={activity.type}
              icon={activity.icon}
              text={activity.text}
              time={activity.time}
              metadata={activity.metadata}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

