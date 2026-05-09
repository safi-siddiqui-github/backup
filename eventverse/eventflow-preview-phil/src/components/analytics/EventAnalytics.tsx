
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Clock, Camera, Calendar } from "lucide-react";

interface EventAnalyticsProps {
  eventId: string;
}

const EventAnalytics = ({ eventId }: EventAnalyticsProps) => {
  // Mock data
  const attendanceData = [
    { time: "9:00", checkins: 15, expected: 20 },
    { time: "10:00", checkins: 45, expected: 50 },
    { time: "11:00", checkins: 78, expected: 80 },
    { time: "12:00", checkins: 120, expected: 130 },
    { time: "13:00", checkins: 180, expected: 200 },
    { time: "14:00", checkins: 220, expected: 240 },
    { time: "15:00", checkins: 235, expected: 250 },
    { time: "16:00", checkins: 247, expected: 250 }
  ];

  const moduleUsageData = [
    { module: "Media", usage: 85, color: "#0088FE" },
    { module: "Surveys", usage: 63, color: "#00C49F" },
    { module: "Games", usage: 42, color: "#FFBB28" },
    { module: "RSVP", usage: 94, color: "#FF8042" },
    { module: "Seating", usage: 38, color: "#8884D8" }
  ];

  const engagementData = [
    { hour: "9-10", photos: 12, surveys: 5, games: 8 },
    { hour: "10-11", photos: 28, surveys: 15, games: 12 },
    { hour: "11-12", photos: 45, surveys: 22, games: 18 },
    { hour: "12-13", photos: 38, surveys: 18, games: 25 },
    { hour: "13-14", photos: 52, surveys: 28, games: 30 },
    { hour: "14-15", photos: 65, surveys: 35, games: 22 },
    { hour: "15-16", photos: 48, surveys: 25, games: 15 },
    { hour: "16-17", photos: 32, surveys: 12, games: 8 }
  ];

  const chartConfig = {
    checkins: {
      label: "Check-ins",
      color: "hsl(var(--chart-1))"
    },
    expected: {
      label: "Expected",
      color: "hsl(var(--chart-2))"
    },
    photos: {
      label: "Photos",
      color: "hsl(var(--chart-3))"
    },
    surveys: {
      label: "Surveys",
      color: "hsl(var(--chart-4))"
    },
    games: {
      label: "Games",
      color: "hsl(var(--chart-5))"
    }
  };

  return (
    <div className="space-y-6">
      {/* Event Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-blue-600" />
              <div>
                <div className="text-xl font-bold">247</div>
                <div className="text-xs text-gray-600">Total Guests</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-green-600" />
              <div>
                <div className="text-xl font-bold">98.8%</div>
                <div className="text-xs text-gray-600">Attendance Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Camera className="w-6 h-6 text-purple-600" />
              <div>
                <div className="text-xl font-bold">320</div>
                <div className="text-xs text-gray-600">Photos Shared</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-orange-600" />
              <div>
                <div className="text-xl font-bold">85%</div>
                <div className="text-xs text-gray-600">Engagement</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-red-600" />
              <div>
                <div className="text-xl font-bold">3.2h</div>
                <div className="text-xs text-gray-600">Avg. Duration</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Real-time Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="checkins" stroke="var(--color-checkins)" strokeWidth={2} />
                  <Line type="monotone" dataKey="expected" stroke="var(--color-expected)" strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Module Usage */}
        <Card>
          <CardHeader>
            <CardTitle>Module Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {moduleUsageData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.module}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${item.usage}%`,
                          backgroundColor: item.color
                        }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 min-w-12">{item.usage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Engagement by Hour */}
      <Card>
        <CardHeader>
          <CardTitle>Guest Engagement by Hour</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="photos" fill="var(--color-photos)" />
                <Bar dataKey="surveys" fill="var(--color-surveys)" />
                <Bar dataKey="games" fill="var(--color-games)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <h4 className="font-medium text-green-700 mb-2">Top Performing</h4>
            <p className="text-sm">RSVP module has 94% usage rate - highest guest engagement</p>
            <Badge variant="outline" className="mt-2">Excellent</Badge>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-4">
            <h4 className="font-medium text-yellow-700 mb-2">Needs Attention</h4>
            <p className="text-sm">Seating module usage is low at 38% - consider promoting features</p>
            <Badge variant="outline" className="mt-2">Improve</Badge>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <h4 className="font-medium text-blue-700 mb-2">Peak Activity</h4>
            <p className="text-sm">Highest engagement between 2-3 PM - optimal for announcements</p>
            <Badge variant="outline" className="mt-2">Insight</Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventAnalytics;
