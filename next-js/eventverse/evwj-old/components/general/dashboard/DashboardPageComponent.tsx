"use client";

import DashboardShowcaseComponent from "@/components/general/dashboard/DashboardShowcaseComponent";
import DashboardTabComponent from "@/components/general/dashboard/DashboardTabComponent";
import LayoutOneComponent from "@/components/general/layout/LayoutOneComponent";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Routes } from "@/lib/lib-routes";
import { format } from "date-fns";
import { Plus, Settings, Trophy } from "lucide-react";
import Link from "next/link";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

export default function DashboardPageComponent() {
  const userName = "John";
  //   const userName = useMemo(() => {
  //     if (userStore?.user?.firstname && userStore?.user?.lastname) {
  //       return `${userStore.user.firstname} ${userStore.user.lastname}`;
  //     }
  //     return (
  //       userStore?.user?.username ||
  //       userStore?.user?.email?.split("@")[0] ||
  //       "Guest"
  //     );
  //   }, [userStore?.user]);

  return (
    <div className="flex min-h-screen flex-col bg-linear-to-b from-blue-700 to-black">
      <LayoutOneComponent>
        <div className="mx-auto w-full max-w-7xl">
          <div className="flex flex-col gap-6 pt-28 md:pt-32">
            {/* Enhanced Header */}
            <div className="relative mb-4 overflow-hidden rounded-2xl">
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-linear-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-purple-950/20 dark:via-blue-950/20 dark:to-pink-950/20" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,hsl(var(--border))_1px,transparent_0)] bg-size-[40px_40px] opacity-20" />

              {/* Glass-morphism container */}
              <div className="relative border border-white/20 bg-white/60 p-6 shadow-2xl backdrop-blur-xl md:p-8 dark:border-gray-800/20 dark:bg-gray-900/60">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  {/* Left: User greeting */}
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-4">
                      <h1 className="bg-linear-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
                        {getGreeting()}, {userName}!
                      </h1>
                      <Badge className="border-0 bg-linear-to-r from-purple-500 to-blue-500 px-4 py-2 text-base text-white shadow-lg transition-all duration-300 hover:shadow-xl">
                        <Trophy className="mr-2 h-4 w-4" />
                        Level 3
                      </Badge>
                    </div>
                    <p className="text-muted-foreground flex items-center gap-2 text-base md:text-lg">
                      <span className="font-medium">
                        {format(new Date(), "EEEE, MMMM d")}
                      </span>
                      <span className="text-border">•</span>
                      <span>Continue your amazing journey</span>
                    </p>
                  </div>

                  {/* Right: Action buttons */}
                  <div className="flex gap-3">
                    <Button
                      asChild
                      className="bg-linear-to-r from-purple-600 to-blue-600 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-purple-700 hover:to-blue-700 hover:shadow-xl"
                      size="lg"
                    >
                      <Link
                        href={`${Routes.web.auth.dashboardEventCreate}/new`}
                      >
                        <Plus className="mr-2 h-5 w-5" />
                        Create Event
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-border/50 hover:bg-accent/50 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                      asChild
                    >
                      <Link href={Routes.web.auth.dashboardSettings}>
                        <Settings className="mr-2 h-5 w-5" />
                        Settings
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <DashboardShowcaseComponent />

            <DashboardTabComponent />
          </div>
        </div>
      </LayoutOneComponent>
    </div>
  );
}
