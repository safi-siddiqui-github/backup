import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Users, AlertTriangle, CheckCircle, PieChart } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import type { Table, Guest } from "@/types/venue";

interface SeatingAnalyticsProps {
  tables: Table[];
  unassignedGuests: Guest[];
  onClose: () => void;
}

const SeatingAnalytics = ({ tables, unassignedGuests, onClose }: SeatingAnalyticsProps) => {
  // Calculate analytics
  const totalCapacity = tables.reduce((sum, table) => sum + table.seats, 0);
  const totalAssigned = tables.reduce((sum, table) => sum + table.guests.length, 0);
  const utilizationRate = totalCapacity > 0 ? (totalAssigned / totalCapacity) * 100 : 0;

  // Group distribution
  const groupDistribution: Record<string, number> = {};
  tables.forEach(table => {
    table.guests.forEach(guest => {
      groupDistribution[guest.group] = (groupDistribution[guest.group] || 0) + 1;
    });
  });

  // Dietary requirements
  const dietaryRequirements: Record<string, number> = {};
  tables.forEach(table => {
    table.guests.forEach(guest => {
      if (guest.dietary !== "None") {
        dietaryRequirements[guest.dietary] = (dietaryRequirements[guest.dietary] || 0) + 1;
      }
    });
  });

  // Table status
  const fullTables = tables.filter(table => table.guests.length === table.seats);
  const overCapacityTables = tables.filter(table => table.guests.length > table.seats);
  const emptyTables = tables.filter(table => table.guests.length === 0);

  // Validation issues
  const issues: string[] = [];
  if (unassignedGuests.length > 0) {
    issues.push(`${unassignedGuests.length} unassigned guests`);
  }
  if (overCapacityTables.length > 0) {
    issues.push(`${overCapacityTables.length} tables over capacity`);
  }
  if (emptyTables.length > 0) {
    issues.push(`${emptyTables.length} empty tables`);
  }

  const getGroupColor = (group: string): string => {
    const colors: Record<string, string> = {
      "Family": "bg-pink-500",
      "Friends": "bg-blue-500",
      "Colleagues": "bg-purple-500",
      "Plus Ones": "bg-orange-500",
    };
    return colors[group] || "bg-gray-500";
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <div className="flex items-center gap-3">
            <PieChart className="w-6 h-6 text-purple-600" />
            <div>
              <h2 className="text-xl font-semibold">Seating Analytics</h2>
              <p className="text-sm text-gray-600">Overview and insights</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {/* Capacity Overview */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Capacity Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Utilization</span>
                      <span>{utilizationRate.toFixed(1)}%</span>
                    </div>
                    <Progress value={utilizationRate} className="h-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <div className="text-2xl font-bold text-green-600">{totalAssigned}</div>
                      <div className="text-gray-600">Assigned</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-400">{totalCapacity - totalAssigned}</div>
                      <div className="text-gray-600">Available</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Table Status */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Table Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Full Tables</span>
                    <Badge variant="default" className="bg-green-500">
                      {fullTables.length}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Over Capacity</span>
                    <Badge variant="destructive">
                      {overCapacityTables.length}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Empty Tables</span>
                    <Badge variant="outline">
                      {emptyTables.length}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Unassigned Guests</span>
                    <Badge variant="secondary">
                      {unassignedGuests.length}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Validation Issues */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  {issues.length > 0 ? (
                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                  ) : (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                  Validation
                </CardTitle>
              </CardHeader>
              <CardContent>
                {issues.length > 0 ? (
                  <div className="space-y-2">
                    {issues.map((issue, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-orange-600">
                        <AlertTriangle className="w-3 h-3" />
                        {issue}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    All validations passed
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Group Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Group Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(groupDistribution).map(([group, count]) => (
                    <div key={group} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${getGroupColor(group)}`}></div>
                        <span className="text-sm font-medium">{group}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">{count} guests</span>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${getGroupColor(group)}`}
                            style={{ width: `${totalAssigned > 0 ? (count / totalAssigned) * 100 : 0}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Dietary Requirements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Dietary Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                {Object.keys(dietaryRequirements).length > 0 ? (
                  <div className="space-y-2">
                    {Object.entries(dietaryRequirements).map(([dietary, count]) => (
                      <div key={dietary} className="flex justify-between items-center">
                        <span className="text-sm font-medium">{dietary}</span>
                        <Badge variant="outline">{count}</Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500 text-sm">
                    No special dietary requirements
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Table Details */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Table Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tables.map((table) => (
                  <div key={table.id} className="border rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{table.name}</span>
                      <Badge 
                        variant={table.guests.length === table.seats ? "default" : "outline"}
                        className={
                          table.guests.length > table.seats ? "bg-red-500" :
                          table.guests.length === table.seats ? "bg-green-500" : ""
                        }
                      >
                        {table.guests.length}/{table.seats}
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div>Shape: {table.shape}</div>
                      {table.guests.length > 0 && (
                        <div>
                          Groups: {[...new Set(table.guests.map(g => g.group))].join(", ")}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SeatingAnalytics;
