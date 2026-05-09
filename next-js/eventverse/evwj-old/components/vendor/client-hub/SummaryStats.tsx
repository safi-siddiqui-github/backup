"use client";

import { useState } from "react";
import { Users, Star, DollarSign, TrendingUp } from "lucide-react";
import StatCard from "./components/StatCard";
import { formatCurrency } from "./utils/formatCurrency";

interface SummaryStatsProps {
  totalClients: number;
  activeClients: number;
  totalRevenue: number;
  inPipeline: number;
}

export default function SummaryStats({
  totalClients,
  activeClients,
  totalRevenue,
  inPipeline,
}: SummaryStatsProps) {
  const [isRevenueVisible, setIsRevenueVisible] = useState(true);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Clients"
        value={totalClients}
        icon={Users}
        iconColor="text-blue-600 dark:text-blue-400"
      />
      <StatCard
        title="Active Clients"
        value={activeClients}
        icon={Star}
        iconColor="text-green-600 dark:text-green-400"
      />
      <StatCard
        title="Total Revenue"
        value={formatCurrency(totalRevenue)}
        icon={DollarSign}
        iconColor="text-purple-600 dark:text-purple-400"
        showEyeButton={true}
        isVisible={isRevenueVisible}
        onToggleVisibility={() => setIsRevenueVisible(!isRevenueVisible)}
      />
      <StatCard
        title="In Pipeline"
        value={inPipeline}
        icon={TrendingUp}
        iconColor="text-orange-600 dark:text-orange-400"
      />
    </div>
  );
}

