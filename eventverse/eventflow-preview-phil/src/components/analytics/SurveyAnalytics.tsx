
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from "recharts";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Clock, Star } from "lucide-react";
import { useState } from "react";

interface SurveyAnalyticsProps {
  eventId: string;
}

const SurveyAnalytics = ({ eventId }: SurveyAnalyticsProps) => {
  const [selectedSurvey, setSelectedSurvey] = useState("all");

  // Mock data
  const surveys = [
    { id: "1", title: "Event Feedback Survey" },
    { id: "2", title: "Food & Catering Feedback" },
    { id: "3", title: "Venue Experience Survey" }
  ];

  const responseData = [
    { name: "Event Feedback", responses: 85, completion: 78 },
    { name: "Food & Catering", responses: 42, completion: 85 },
    { name: "Venue Experience", responses: 29, completion: 92 }
  ];

  const ratingData = [
    { rating: "5 Stars", count: 65, percentage: 42 },
    { rating: "4 Stars", count: 48, percentage: 31 },
    { rating: "3 Stars", count: 28, percentage: 18 },
    { rating: "2 Stars", count: 10, percentage: 6 },
    { rating: "1 Star", count: 5, percentage: 3 }
  ];

  const timelineData = [
    { time: "9:00", responses: 5 },
    { time: "10:00", responses: 12 },
    { time: "11:00", responses: 18 },
    { time: "12:00", responses: 25 },
    { time: "13:00", responses: 35 },
    { time: "14:00", responses: 42 },
    { time: "15:00", responses: 38 },
    { time: "16:00", responses: 28 },
    { time: "17:00", responses: 15 }
  ];

  const chartConfig = {
    responses: {
      label: "Responses",
      color: "hsl(var(--chart-1))"
    },
    completion: {
      label: "Completion %",
      color: "hsl(var(--chart-2))"
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="space-y-6">
      {/* Survey Selector */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Survey Performance</CardTitle>
            <Select value={selectedSurvey} onValueChange={setSelectedSurvey}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select survey" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Surveys</SelectItem>
                {surveys.map(survey => (
                  <SelectItem key={survey.id} value={survey.id}>
                    {survey.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Response Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Response Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={responseData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="responses" fill="var(--color-responses)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Rating Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Rating Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={ratingData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ percentage }) => `${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {ratingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Response Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Response Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="responses" stroke="var(--color-responses)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">156</div>
                <div className="text-sm text-gray-600">Total Responses</div>
                <Badge variant="outline" className="mt-1">63% rate</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold">85%</div>
                <div className="text-sm text-gray-600">Completion Rate</div>
                <Badge variant="outline" className="mt-1">+8% vs avg</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-orange-600" />
              <div>
                <div className="text-2xl font-bold">2.5</div>
                <div className="text-sm text-gray-600">Avg. Time (min)</div>
                <Badge variant="outline" className="mt-1">Optimal</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Star className="w-8 h-8 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold">4.2</div>
                <div className="text-sm text-gray-600">Avg. Rating</div>
                <Badge variant="outline" className="mt-1">Excellent</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SurveyAnalytics;
