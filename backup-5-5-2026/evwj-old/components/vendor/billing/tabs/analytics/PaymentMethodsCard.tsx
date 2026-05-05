"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import AnalyticsCardHeader from "../../components/AnalyticsCardHeader";

interface PaymentMethodData {
  method: string;
  percentage: number;
  color: string;
}

const paymentMethodsData: PaymentMethodData[] = [
  { method: "Bank Transfer", percentage: 45, color: "bg-blue-600" },
  { method: "Credit Card", percentage: 35, color: "bg-green-600" },
  { method: "Check", percentage: 20, color: "bg-purple-600" },
];

export default function PaymentMethodsCard() {
  return (
    <Card className="!bg-white dark:!bg-slate-800/95 backdrop-blur-sm [background-color:white] dark:[background-color:rgb(30_41_59/0.95)]">
      <CardContent className="p-6">
        <AnalyticsCardHeader
          title="Payment Methods"
          subtitle="Distribution of payment methods"
        />

        <div className="space-y-4">
          {paymentMethodsData.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-900 dark:text-slate-200">
                  {item.method}
                </span>
                <span className="text-gray-900 dark:text-slate-200 font-medium">
                  {item.percentage}%
                </span>
              </div>
              <div className="relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-500",
                    item.color
                  )}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

