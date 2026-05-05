"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Routes } from "@/lib/lib-routes";
import { Calendar, Plus, Search, Settings, Sparkles } from "lucide-react";
import Link from "next/link";

export default function DashboardQuickActionsComponent() {
  return (
    <Card className="mb-8 border-white/20 bg-white/60 shadow-xl backdrop-blur-xl dark:border-gray-800/20 dark:bg-gray-900/60">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-600" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Button
            variant="outline"
            asChild
            className="h-24 flex-col gap-2 transition-all hover:scale-105 hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/20"
          >
            <Link href={`${Routes.web.auth.dashboardEventCreate}/new`}>
              <Plus className="h-6 w-6 text-blue-600" />
              <span className="text-sm font-medium">Create Event</span>
            </Link>
          </Button>

          <Button
            variant="outline"
            asChild
            className="h-24 flex-col gap-2 transition-all hover:scale-105 hover:border-green-300 hover:bg-green-50 dark:hover:bg-green-950/20"
          >
            <Link href={Routes.web.general.events}>
              <Search className="h-6 w-6 text-green-600" />
              <span className="text-sm font-medium">Find Events</span>
            </Link>
          </Button>

          <Button
            variant="outline"
            className="h-24 flex-col gap-2 transition-all hover:scale-105 hover:border-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/20"
          >
            <Calendar className="h-6 w-6 text-purple-600" />
            <span className="text-sm font-medium">View Calendar</span>
          </Button>

          <Button
            variant="outline"
            className="h-24 flex-col gap-2 transition-all hover:scale-105 hover:border-orange-300 hover:bg-orange-50 dark:hover:bg-orange-950/20"
          >
            <Settings className="h-6 w-6 text-orange-600" />
            <span className="text-sm font-medium">Settings</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
