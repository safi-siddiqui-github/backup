"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  DollarSign,
  TrendingUp,
  Calendar,
  MessageSquare,
  PhoneCall,
  FileText,
  Clock,
  Settings,
} from "lucide-react";
import { Client } from "./mockClients";
import { cn } from "@/lib/utils";
import { formatCurrency } from "./utils/formatCurrency";
import { renderStars } from "./utils/renderStars";
import StatusBadge from "./components/StatusBadge";

interface ClientDetailPanelProps {
  client: Client | null;
  onManageClient?: () => void;
}

export default function ClientDetailPanel({ client, onManageClient }: ClientDetailPanelProps) {
  if (!client) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">
            Select a client to view details
          </p>
        </CardContent>
      </Card>
    );
  }

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card>
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 flex items-center justify-center font-semibold text-lg">
              {getInitials(client.name)}
            </div>
            <div>
              <h2 className="text-xl font-bold">{client.name}</h2>
            </div>
          </div>
          <Button 
            variant="default" 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={onManageClient}
            disabled={!client || !onManageClient}
          >
            <Settings className="h-4 w-4 mr-2" />
            Manage Client
          </Button>
        </div>

        {/* Current Stage */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Current Stage</span>
            <StatusBadge status={client.stage} type="stage" />
          </div>
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500 ease-out"
              style={{ width: `${client.progress}%` }}
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Contact Information</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <Mail className="h-4 w-4 text-gray-500" />
              <span>{client.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <Phone className="h-4 w-4 text-gray-500" />
              <span>{client.phone}</span>
            </div>
          </div>
        </div>

        {/* Data Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-green-50 dark:bg-green-900/10 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
              <span className="text-xs text-green-600 dark:text-green-400 font-medium">Total Spent</span>
            </div>
            <p className="text-xl font-bold text-green-700 dark:text-green-300">
              {formatCurrency(client.totalSpent)}
            </p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/10 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">Active Events</span>
            </div>
            <p className="text-xl font-bold text-blue-700 dark:text-blue-300">
              {client.activeEvents}
            </p>
          </div>
        </div>

        {/* Upcoming Event */}
        {client.events && client.events.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-3 text-purple-800 dark:text-purple-400">Upcoming Event</h3>
            {client.events.map((event) => (
              <div
                key={event.id}
                className="bg-purple-50 dark:bg-purple-900/10 rounded-lg p-4"
              >
                <p className="font-semibold text-gray-900 dark:text-white mb-2">
                  {event.name}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400">
                    <Calendar className="h-4 w-4" />
                    <span>{event.date}</span>
                  </div>
                  <p className="text-sm font-semibold text-purple-800 dark:text-purple-400">
                    {formatCurrency(event.totalBudget)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Client Rating */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Client Rating</p>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {renderStars(client.rating, "md")}
            </div>
            {client.reviewCount !== undefined && (
              <span className="text-sm text-gray-600 dark:text-gray-400">
                ({client.rating})
              </span>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Quick Actions</p>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" className="w-full">
              <MessageSquare className="h-4 w-4 mr-2" />
              Message
            </Button>
            <Button variant="outline" size="sm" className="w-full">
              <PhoneCall className="h-4 w-4 mr-2" />
              Call
            </Button>
            <Button variant="outline" size="sm" className="w-full">
              <FileText className="h-4 w-4 mr-2" />
              Invoice
            </Button>
            <Button variant="outline" size="sm" className="w-full">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule
            </Button>
          </div>
        </div>

        {/* Last Contact */}
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400 pt-4 border-t">
          <Clock className="h-4 w-4" />
          <span>Last contact: {client.lastContact}</span>
        </div>
      </CardContent>
    </Card>
  );
}

