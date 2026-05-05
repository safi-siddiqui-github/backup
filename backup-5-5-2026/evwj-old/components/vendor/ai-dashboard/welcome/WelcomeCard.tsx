"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Brain, ArrowUp } from "lucide-react";
import MetricCard from "../common/MetricCard";

export default function WelcomeCard() {
  const [isRevenueVisible, setIsRevenueVisible] = useState(true);

  return (
    <div className="rounded-lg bg-black p-6 text-white shadow-lg">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-1">
            Welcome back, Demo Vendor Business!
          </h2>
          <p className="text-sm text-white/90">
            Here&apos;s your business snapshot for today
          </p>
        </div>
        <Badge
          variant="secondary"
          className="bg-white/20 text-white border-white/30 text-xs px-2 py-0.5"
        >
          <Brain className="h-3 w-3 mr-1" />
          AI Powered
        </Badge>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Revenue this Month */}
        <MetricCard
          label="Revenue this Month"
          value="$12,500"
          detail={
            <>
              <ArrowUp className="h-3 w-3" />
              <span>+12%</span>
            </>
          }
          detailClassName="text-sm text-green-200"
          showEyeButton={true}
          isVisible={isRevenueVisible}
          onToggleVisibility={() => setIsRevenueVisible(!isRevenueVisible)}
        />

        {/* Active Clients */}
        <MetricCard
          label="Active Clients"
          value="8"
          detail={<span>+3 new</span>}
          detailClassName="text-sm text-green-200"
        />

        {/* Pending Tasks */}
        <MetricCard
          label="Pending Tasks"
          value="7"
          detail={<span>Need attention</span>}
          detailClassName="text-sm text-yellow-200"
        />
      </div>
    </div>
  );
}

