"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Layout,
  MapPin,
  Users,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

interface SeatingAnalyticsProps {
  eventId: string;
}

const SeatingAnalytics = ({ eventId }: SeatingAnalyticsProps) => {
  const seatingOverview = {
    totalTables: 25,
    assignedSeats: 189,
    unassignedSeats: 59,
    totalCapacity: 248,
    utilizationRate: 76.2,
  };

  const tableUtilization = [
    { tableNumber: 1, capacity: 8, assigned: 8, utilization: 100 },
    { tableNumber: 2, capacity: 10, assigned: 9, utilization: 90 },
    { tableNumber: 3, capacity: 8, assigned: 6, utilization: 75 },
    { tableNumber: 4, capacity: 10, assigned: 10, utilization: 100 },
    { tableNumber: 5, capacity: 8, assigned: 4, utilization: 50 },
  ];

  const guestPreferences = [
    {
      preference: "Near Dance Floor",
      count: 45,
      satisfied: 38,
      color: "#3B82F6",
    },
    { preference: "Quiet Area", count: 32, satisfied: 29, color: "#10B981" },
    { preference: "With Family", count: 28, satisfied: 28, color: "#F59E0B" },
    { preference: "With Friends", count: 22, satisfied: 19, color: "#EF4444" },
    { preference: "Accessible", count: 8, satisfied: 8, color: "#8B5CF6" },
  ];

  const seatingZones = [
    {
      zone: "VIP Section",
      tables: 3,
      capacity: 24,
      assigned: 24,
      status: "Full",
    },
    {
      zone: "Family Area",
      tables: 8,
      capacity: 80,
      assigned: 67,
      status: "Available",
    },
    {
      zone: "Friends Zone",
      tables: 10,
      capacity: 100,
      assigned: 78,
      status: "Available",
    },
    {
      zone: "General Seating",
      tables: 4,
      capacity: 44,
      assigned: 20,
      status: "Available",
    },
  ];

  const chartConfig = {
    assigned: { label: "Assigned", color: "#3B82F6" },
    unassigned: { label: "Unassigned", color: "#E5E7EB" },
  };

  return (
    <div className="space-y-6">
      {/* Seating Overview Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Layout className="h-6 w-6 text-blue-600" />
              <div>
                <div className="text-xl font-bold">
                  {seatingOverview.totalTables}
                </div>
                <div className="text-xs text-gray-600">Total Tables</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6 text-green-600" />
              <div>
                <div className="text-xl font-bold">
                  {seatingOverview.totalCapacity}
                </div>
                <div className="text-xs text-gray-600">Total Capacity</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-6 w-6 text-purple-600" />
              <div>
                <div className="text-xl font-bold">
                  {seatingOverview.assignedSeats}
                </div>
                <div className="text-xs text-gray-600">Assigned Seats</div>
                <Badge
                  variant="outline"
                  className="mt-1"
                >
                  {seatingOverview.utilizationRate}%
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-6 w-6 text-orange-600" />
              <div>
                <div className="text-xl font-bold">
                  {seatingOverview.unassignedSeats}
                </div>
                <div className="text-xs text-gray-600">Unassigned</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <MapPin className="h-6 w-6 text-red-600" />
              <div>
                <div className="text-xl font-bold">4</div>
                <div className="text-xs text-gray-600">Seating Zones</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-6 w-6 text-yellow-600" />
              <div>
                <div className="text-xl font-bold">92%</div>
                <div className="text-xs text-gray-600">Preference Match</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Table Utilization */}
        <Card>
          <CardHeader>
            <CardTitle>Table Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer
                width="100%"
                height={300}
              >
                <BarChart data={tableUtilization.slice(0, 10)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="tableNumber" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="assigned"
                    fill="var(--color-assigned)"
                  />
                  <Bar
                    dataKey="capacity"
                    fill="var(--color-unassigned)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Guest Preferences Satisfaction */}
        <Card>
          <CardHeader>
            <CardTitle>Guest Preferences Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {guestPreferences.map((pref, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="h-4 w-4 rounded-full"
                      style={{ backgroundColor: pref.color }}
                    />
                    <span className="font-medium">{pref.preference}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-sm text-gray-600">
                      {pref.satisfied}/{pref.count}
                    </div>
                    <Badge variant="outline">
                      {Math.round((pref.satisfied / pref.count) * 100)}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Seating Zones */}
      <Card>
        <CardHeader>
          <CardTitle>Seating Zones Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {seatingZones.map((zone, index) => (
              <div
                key={index}
                className="rounded-lg border p-4"
              >
                <div className="mb-3 flex items-center justify-between">
                  <h4 className="font-medium">{zone.zone}</h4>
                  <Badge
                    className={
                      zone.status === "Full" ? "bg-red-500" : "bg-green-500"
                    }
                  >
                    {zone.status}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Tables:</span>
                    <span>{zone.tables}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Capacity:</span>
                    <span>{zone.capacity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Assigned:</span>
                    <span>{zone.assigned}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Utilization:</span>
                    <span>
                      {Math.round((zone.assigned / zone.capacity) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SeatingAnalytics;
