"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { Client } from "../../../mockClients";
import BusinessStatCard from "./BusinessStatCard";
import { formatCurrency } from "../../../utils/formatCurrency";

interface BusinessSummaryCardProps {
  client: Client;
}

export default function BusinessSummaryCard({ client }: BusinessSummaryCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className="h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Business Summary
        </h2>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <BusinessStatCard
            value={formatCurrency(client.totalSpent)}
            label="Total Spent"
            bgColor="bg-green-50 dark:bg-green-900/10"
            textColor="text-green-600 dark:text-green-400"
            valueColor="text-green-700 dark:text-green-300"
          />
          <BusinessStatCard
            value={client.activeEvents}
            label="Active Events"
            bgColor="bg-blue-50 dark:bg-blue-900/10"
            textColor="text-blue-600 dark:text-blue-400"
            valueColor="text-blue-700 dark:text-blue-300"
          />
          <BusinessStatCard
            value={client.completed}
            label="Completed"
            bgColor="bg-purple-50 dark:bg-purple-900/10"
            textColor="text-purple-600 dark:text-purple-400"
            valueColor="text-purple-700 dark:text-purple-300"
          />
          <BusinessStatCard
            value={client.pendingInvoices}
            label="Pending Invoices"
            bgColor="bg-orange-50 dark:bg-orange-900/10"
            textColor="text-orange-600 dark:text-orange-400"
            valueColor="text-orange-700 dark:text-orange-300"
          />
        </div>

        {/* Upcoming Events */}
        {client.events && client.events.length > 0 && (
          <div className="mt-auto">
            <h3 className="text-sm font-semibold mb-3 text-purple-800 dark:text-purple-400">
              Upcoming Events
            </h3>
            <div className="space-y-3">
              {client.events.slice(0, 2).map((event) => (
              <div
                  key={event.id}
                className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/10 dark:to-blue-900/10 rounded-lg p-4"
              >
                <p className="font-semibold text-gray-900 dark:text-white mb-2">
                    {event.name}
                </p>
                  <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-sm text-purple-800 dark:text-purple-400">
                    <Calendar className="h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                    <p className="text-sm font-semibold text-purple-800 dark:text-purple-400">
                      Budget: {formatCurrency(event.totalBudget)}
                    </p>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {event.projects.length} project{event.projects.length !== 1 ? 's' : ''}
                  </p>
                </div>
              ))}
              </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

