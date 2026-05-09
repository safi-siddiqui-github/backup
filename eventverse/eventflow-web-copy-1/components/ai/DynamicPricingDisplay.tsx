"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Info, TrendingDown, Zap } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  selectedModules: string[];
  eventType: string;
  expectedAttendees: number;
}

const DynamicPricingDisplay = ({
  selectedModules,
  eventType,
  expectedAttendees,
}: Props) => {
  const [pricing, setPricing] = useState({
    basePrice: 0,
    discount: 0,
    finalPrice: 0,
    savings: 0,
    bundleDiscount: 0,
  });

  useEffect(() => {
    calculateDynamicPricing();
  }, [selectedModules, eventType, expectedAttendees]);

  const calculateDynamicPricing = () => {
    const modulePrices: Record<string, number> = {
      schedules: 0,
      announcements: 0,
      rsvp: 0,
      seating: 30,
      ticketing: 25,
      budgeting: 20,
      media: 20,
      analytics: 35,
      games: 15,
      survey: 10,
    };

    const basePrice = selectedModules.reduce((sum, moduleId) => {
      return sum + (modulePrices[moduleId] || 0);
    }, 0);

    let discount = 0;
    let bundleDiscount = 0;

    // Bundle discounts
    const paidModules = selectedModules.filter((id) => modulePrices[id] > 0);

    if (paidModules.length >= 3) {
      bundleDiscount = 15; // 15% off for 3+ modules
    } else if (paidModules.length >= 2) {
      bundleDiscount = 10; // 10% off for 2+ modules
    }

    // Event type discounts
    if (eventType === "Charity") {
      discount += 20; // 20% discount for charity events
    }

    // Volume discounts
    if (expectedAttendees > 200) {
      discount += 15;
    } else if (expectedAttendees > 100) {
      discount += 10;
    } else if (expectedAttendees > 50) {
      discount += 5;
    }

    const totalDiscount = Math.min(discount + bundleDiscount, 50); // Max 50% discount
    const finalPrice = basePrice * (1 - totalDiscount / 100);
    const savings = basePrice - finalPrice;

    setPricing({
      basePrice,
      discount: totalDiscount,
      finalPrice,
      savings,
      bundleDiscount,
    });
  };

  if (pricing.basePrice === 0) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-green-600" />
            <span className="font-semibold text-green-800">
              100% Free Setup!
            </span>
          </div>
          <p className="mt-1 text-sm text-green-700">
            Your selected modules are completely free. Upgrade anytime for
            advanced features.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
      <CardContent className="space-y-3 p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-800">Smart Pricing</h3>
          <Badge className="bg-purple-100 text-purple-700">
            <Zap className="mr-1 h-3 w-3" />
            AI Optimized
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Base Price</span>
            <span
              className={cn(
                pricing.discount > 0
                  ? "text-gray-500 line-through"
                  : "font-semibold",
              )}
            >
              ${pricing.basePrice}/month
            </span>
          </div>

          {pricing.bundleDiscount > 0 && (
            <div className="flex justify-between text-sm text-blue-600">
              <span>Bundle Discount</span>
              <span>-{pricing.bundleDiscount}%</span>
            </div>
          )}

          {pricing.discount - pricing.bundleDiscount > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>Smart Discounts</span>
              <span>-{pricing.discount - pricing.bundleDiscount}%</span>
            </div>
          )}

          {pricing.savings > 0 && (
            <div className="border-t pt-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-800">Final Price</span>
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-600">
                    ${pricing.finalPrice.toFixed(2)}/month
                  </div>
                  <div className="flex items-center gap-1 text-sm text-green-600">
                    <TrendingDown className="h-3 w-3" />
                    Save ${pricing.savings.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-blue-25 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <Info className="mt-0.5 h-4 w-4 text-blue-600" />
            <div className="text-sm text-blue-800">
              <p className="font-medium">Why this price?</p>
              <ul className="mt-1 space-y-1 text-xs text-blue-700">
                {pricing.bundleDiscount > 0 && (
                  <li>• {pricing.bundleDiscount}% bundle discount applied</li>
                )}
                {eventType === "Charity" && (
                  <li>• 20% charity event discount</li>
                )}
                {expectedAttendees > 50 && (
                  <li>• Volume discount for {expectedAttendees}+ attendees</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DynamicPricingDisplay;
