"use client";

import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "../../../client-hub/utils/formatCurrency";
import AnalyticsCardHeader from "../../components/AnalyticsCardHeader";

interface RevenueData {
  month: string;
  amount: number;
}

const revenueData: RevenueData[] = [
  { month: "January 2024", amount: 8500 },
  { month: "December 2023", amount: 12300 },
  { month: "November 2023", amount: 6700 },
];

export default function RevenueTrendCard() {
  return (
    <Card className="!bg-white dark:!bg-slate-800/95 backdrop-blur-sm [background-color:white] dark:[background-color:rgb(30_41_59/0.95)]">
      <CardContent className="p-6">
        <AnalyticsCardHeader
          title="Revenue Trend"
          subtitle="Monthly revenue over time"
        />

        <div className="space-y-4">
          {revenueData.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-slate-700 last:border-0"
            >
              <span className="text-gray-900 dark:text-slate-200">
                {item.month}
              </span>
              <span className="font-bold text-gray-900 dark:text-slate-200">
                {formatCurrency(item.amount)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

