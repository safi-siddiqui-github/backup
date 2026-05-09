"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

interface NegotiationTrackerProps {
  leadId: string;
}

const NegotiationTracker = ({ leadId }: NegotiationTrackerProps) => {
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null);

  const negotiationHistory = [
    {
      id: "1",
      type: "initial_proposal",
      amount: 8500,
      description: "Wedding Photography Package - Full Service",
      status: "sent",
      date: "2024-01-20",
      response: null,
      items: [
        "8 hours photography coverage",
        "Engagement session",
        "500+ edited photos",
        "Online gallery",
        "Print release",
      ],
    },
    {
      id: "2",
      type: "counter_offer",
      amount: 7000,
      description: "Client counter-offer with reduced scope",
      status: "received",
      date: "2024-01-22",
      response:
        "Client requested to reduce coverage to 6 hours and remove engagement session",
      items: [
        "6 hours photography coverage",
        "400+ edited photos",
        "Online gallery",
        "Print release",
      ],
    },
    {
      id: "3",
      type: "vendor_counter",
      amount: 7500,
      description: "Compromise proposal with adjusted timeline",
      status: "pending",
      date: "2024-01-23",
      response: null,
      items: [
        "7 hours photography coverage",
        "450+ edited photos",
        "Online gallery",
        "Print release",
        "Complimentary engagement mini-session",
      ],
    },
  ];

  const negotiationMetrics = {
    totalOffers: negotiationHistory.length,
    averageAmount:
      negotiationHistory.reduce((sum, offer) => sum + offer.amount, 0) /
      negotiationHistory.length,
    priceRange: {
      min: Math.min(...negotiationHistory.map((h) => h.amount)),
      max: Math.max(...negotiationHistory.map((h) => h.amount)),
    },
    timeInNegotiation: 3, // days
    closeRate: 75, // percentage based on AI analysis
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent":
        return "bg-blue-100 text-blue-800";
      case "received":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "accepted":
        return "bg-emerald-100 text-emerald-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "initial_proposal":
        return <FileText className="h-4 w-4" />;
      case "counter_offer":
        return <TrendingDown className="h-4 w-4" />;
      case "vendor_counter":
        return <TrendingUp className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Negotiation Metrics */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Offers
                </p>
                <p className="text-2xl font-bold">
                  {negotiationMetrics.totalOffers}
                </p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Amount</p>
                <p className="text-2xl font-bold">
                  $
                  {Math.round(
                    negotiationMetrics.averageAmount,
                  ).toLocaleString()}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Days Active</p>
                <p className="text-2xl font-bold">
                  {negotiationMetrics.timeInNegotiation}
                </p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Close Rate</p>
                <p className="text-2xl font-bold">
                  {negotiationMetrics.closeRate}%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Negotiation Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">AI Negotiation Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-2 rounded-lg bg-green-50 p-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">Strong Position</p>
                <p className="text-sm text-gray-700">
                  Client shows high engagement - 75% probability of closing at
                  $7,500
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-blue-50 p-3">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Recommended Counter</p>
                <p className="text-sm text-gray-700">
                  Suggest offering bonus mini-session to justify $7,500 price
                  point
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-yellow-50 p-3">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm font-medium">Timing Alert</p>
                <p className="text-sm text-gray-700">
                  Client typically responds within 24 hours - follow up if no
                  response by tomorrow
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Negotiation Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Negotiation Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {negotiationHistory.map((item, index) => (
              <div
                key={item.id}
                className={`cursor-pointer rounded-lg border p-4 transition-all ${
                  selectedOffer === item.id
                    ? "bg-blue-50 ring-2 ring-blue-500"
                    : "hover:bg-gray-50"
                }`}
                onClick={() =>
                  setSelectedOffer(selectedOffer === item.id ? null : item.id)
                }
              >
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-blue-600">
                      {getTypeIcon(item.type)}
                    </div>
                    <div>
                      <h4 className="font-medium">{item.description}</h4>
                      <p className="text-sm text-gray-600">
                        {new Date(item.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">
                      ${item.amount.toLocaleString()}
                    </p>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status.replace("_", " ")}
                    </Badge>
                  </div>
                </div>

                {item.response && (
                  <div className="mt-3 rounded bg-gray-50 p-3 text-sm">
                    <strong>Client Response:</strong> {item.response}
                  </div>
                )}

                {selectedOffer === item.id && (
                  <div className="mt-4 border-t pt-4">
                    <h5 className="mb-2 font-medium">Package Details:</h5>
                    <ul className="space-y-1">
                      {item.items.map((detail, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-sm text-gray-700"
                        >
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {index < negotiationHistory.length - 1 && (
                  <div className="mt-4 flex justify-center">
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="flex gap-3">
        <Button>Send Counter Offer</Button>
        <Button variant="outline">Accept Current Offer</Button>
        <Button variant="outline">Schedule Call</Button>
      </div>
    </div>
  );
};

export default NegotiationTracker;
