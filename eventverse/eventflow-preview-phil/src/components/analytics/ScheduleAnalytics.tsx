
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, CheckCircle, AlertCircle, Users, TrendingUp } from "lucide-react";

interface ScheduleAnalyticsProps {
  eventId: string;
}

const ScheduleAnalytics = ({ eventId }: ScheduleAnalyticsProps) => {
  const scheduleOverview = {
    totalEvents: 12,
    onTimeEvents: 10,
    delayedEvents: 2,
    avgDelay: 8,
    attendanceRate: 87.5,
    totalDuration: 420
  };

  const eventPerformance = [
    { event: "Welcome Reception", scheduled: "14:00", actual: "14:05", attendance: 95, duration: 30 },
    { event: "Ceremony", scheduled: "15:00", actual: "15:10", attendance: 98, duration: 45 },
    { event: "Cocktail Hour", scheduled: "16:00", actual: "16:15", attendance: 85, duration: 60 },
    { event: "Dinner", scheduled: "18:00", actual: "18:00", attendance: 92, duration: 90 },
    { event: "Speeches", scheduled: "19:30", actual: "19:25", attendance: 88, duration: 30 },
    { event: "Dancing", scheduled: "20:00", actual: "20:00", attendance: 78, duration: 120 }
  ];

  const attendanceByTime = [
    { time: "14:00", attendance: 95 },
    { time: "15:00", attendance: 98 },
    { time: "16:00", attendance: 85 },
    { time: "17:00", attendance: 90 },
    { time: "18:00", attendance: 92 },
    { time: "19:00", attendance: 88 },
    { time: "20:00", attendance: 78 },
    { time: "21:00", attendance: 72 }
  ];

  const chartConfig = {
    attendance: { label: "Attendance %", color: "#3B82F6" }
  };

  return (
    <div className="space-y-6">
      {/* Schedule Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-blue-600" />
              <div>
                <div className="text-xl font-bold">{scheduleOverview.totalEvents}</div>
                <div className="text-xs text-gray-600">Total Events</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <div>
                <div className="text-xl font-bold">{scheduleOverview.onTimeEvents}</div>
                <div className="text-xs text-gray-600">On Time</div>
                <Badge variant="outline" className="mt-1">83.3%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-red-600" />
              <div>
                <div className="text-xl font-bold">{scheduleOverview.delayedEvents}</div>
                <div className="text-xs text-gray-600">Delayed</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-orange-600" />
              <div>
                <div className="text-xl font-bold">{scheduleOverview.avgDelay}min</div>
                <div className="text-xs text-gray-600">Avg Delay</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-purple-600" />
              <div>
                <div className="text-xl font-bold">{scheduleOverview.attendanceRate}%</div>
                <div className="text-xs text-gray-600">Avg Attendance</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-yellow-600" />
              <div>
                <div className="text-xl font-bold">{scheduleOverview.totalDuration}min</div>
                <div className="text-xs text-gray-600">Total Duration</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Event Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Event Timeline Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {eventPerformance.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">{event.event}</div>
                    <div className="text-sm text-gray-600">
                      {event.scheduled} → {event.actual}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="font-medium">{event.attendance}%</div>
                      <div className="text-xs text-gray-600">Attendance</div>
                    </div>
                    <Badge className={
                      event.scheduled === event.actual ? "bg-green-500" : "bg-yellow-500"
                    }>
                      {event.scheduled === event.actual ? "On Time" : "Delayed"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Attendance by Time */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance Throughout Event</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={attendanceByTime}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="attendance" fill="var(--color-attendance)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScheduleAnalytics;
