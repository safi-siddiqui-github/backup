"use client";

import { Card, CardContent } from "@/components/ui/card";
import RevenueTrendCard from "./RevenueTrendCard";
import PaymentMethodsCard from "./PaymentMethodsCard";

export default function AnalyticsTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <RevenueTrendCard />
      <PaymentMethodsCard />
    </div>
  );
}

