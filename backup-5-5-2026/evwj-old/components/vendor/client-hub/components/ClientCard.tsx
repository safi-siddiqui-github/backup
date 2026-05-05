"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Client } from "../mockClients";
import { formatCurrency } from "../utils/formatCurrency";
import StatusBadge from "./StatusBadge";

interface ClientCardProps {
  client: Client;
  onClick?: (client: Client) => void;
}

export default function ClientCard({ client, onClick }: ClientCardProps) {

  return (
    <Card
      className="group hover:border-primary/50 hover:shadow-md transition-all cursor-pointer"
      onClick={() => onClick?.(client)}
    >
      <CardContent className="p-3 sm:p-4">
        {/* Header with Name and Status Badge */}
        <div className="mb-2.5 flex items-start justify-between gap-2">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1 flex-1">
            {client.name}
          </h3>
          <StatusBadge status={client.status} type="client" />
        </div>

        {/* Progress Bar */}
        <div className="mb-2.5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-muted-foreground">Progress</span>
            <span className="text-[10px] font-semibold text-gray-700 dark:text-gray-300">
              {client.progress}%
            </span>
          </div>
          <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-full bg-linear-to-r from-blue-500 to-green-500 transition-all duration-500 ease-out"
              style={{ width: `${client.progress}%` }}
            />
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mb-2.5 grid grid-cols-2 gap-2 rounded-md bg-gray-50/50 p-2 dark:bg-gray-900/30">
          <div className="flex flex-col items-center gap-0.5">
            <p className="text-xs font-bold text-green-600 dark:text-green-400">
              {formatCurrency(client.totalSpent)}
            </p>
            <p className="text-[10px] text-muted-foreground">Total Spent</p>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <p className="text-xs font-bold text-blue-600 dark:text-blue-400">
              {client.activeEvents}
            </p>
            <p className="text-[10px] text-muted-foreground">Active Events</p>
          </div>
        </div>

        {/* Event Details */}
        {client.events && client.events.length > 0 && (
          <div className="mb-2.5 space-y-1.5">
            {client.events.slice(0, 1).map((event) => (
              <div
                key={event.id}
                className="rounded-md bg-purple-50/50 dark:bg-purple-900/20 p-2"
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 line-clamp-1">
                    {event.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground shrink-0 ml-2">
                    {event.date}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[10px] text-muted-foreground">
                    {event.projects.length} project{event.projects.length !== 1 ? 's' : ''}
                  </p>
                  <p className="text-xs font-semibold text-purple-600 dark:text-purple-400">
                    {formatCurrency(event.totalBudget)}
                  </p>
                </div>
              </div>
            ))}
            {client.events.length > 1 && (
              <p className="text-[10px] text-center text-muted-foreground">
                +{client.events.length - 1} more event{client.events.length - 1 !== 1 ? 's' : ''}
              </p>
            )}
          </div>
        )}

        {/* Last Contact and Action Button */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t">
          <span className="text-[10px] text-muted-foreground">
            Last: {client.lastContact}
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-xs shrink-0"
            onClick={(e) => {
              e.stopPropagation();
              onClick?.(client);
            }}
          >
            Manage
            <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

