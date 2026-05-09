"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Progress } from "@/components/ui/progress";
import { BarChart3, Brain, Globe, Target, TrendingUp, Zap } from "lucide-react";
import { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const GlobalAnalyticsModule = () => {
  const [globalMetrics] = useState({
    totalEvents: 2847593,
    globalRevenue: 847.2,
    marketGrowth: 23.4,
    predictiveAccuracy: 94.7,
  });

  const [marketTrends] = useState([
    { month: "Jan", events: 234000, revenue: 67.2, growth: 12.3 },
    { month: "Feb", events: 245000, revenue: 71.8, growth: 14.1 },
    { month: "Mar", events: 267000, revenue: 78.4, growth: 16.8 },
    { month: "Apr", events: 278000, revenue: 82.1, growth: 18.2 },
    { month: "May", events: 291000, revenue: 86.7, growth: 19.9 },
    { month: "Jun", events: 304000, revenue: 91.3, growth: 21.5 },
  ]);

  const [industryInsights] = useState([
    { industry: "Technology", share: 28.4, growth: "+15.2%" },
    { industry: "Healthcare", share: 18.7, growth: "+22.1%" },
    { industry: "Education", share: 16.3, growth: "+8.7%" },
    { industry: "Finance", share: 14.2, growth: "+11.4%" },
    { industry: "Entertainment", share: 12.1, growth: "+25.8%" },
    { industry: "Retail", share: 10.3, growth: "+9.3%" },
  ]);

  const chartConfig = {
    events: { label: "Events", color: "hsl(var(--chart-1))" },
    revenue: { label: "Revenue", color: "hsl(var(--chart-2))" },
    growth: { label: "Growth", color: "hsl(var(--chart-3))" },
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Global Analytics</h1>
          <p className="mt-2 text-gray-600">
            Worldwide market intelligence and business insights
          </p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
          <BarChart3 className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </div>

      {/* Global Metrics */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Globe className="h-6 w-6 text-blue-600" />
              <div>
                <div className="text-xl font-bold">
                  {(globalMetrics.totalEvents / 1000000).toFixed(1)}M
                </div>
                <div className="text-xs text-gray-600">Global Events</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-green-600" />
              <div>
                <div className="text-xl font-bold">
                  ${globalMetrics.globalRevenue}B
                </div>
                <div className="text-xs text-gray-600">Global Revenue</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Zap className="h-6 w-6 text-yellow-600" />
              <div>
                <div className="text-xl font-bold">
                  {globalMetrics.marketGrowth}%
                </div>
                <div className="text-xs text-gray-600">Market Growth</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Brain className="h-6 w-6 text-purple-600" />
              <div>
                <div className="text-xl font-bold">
                  {globalMetrics.predictiveAccuracy}%
                </div>
                <div className="text-xs text-gray-600">AI Accuracy</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Market Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Global Market Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer
              width="100%"
              height={350}
            >
              <LineChart data={marketTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="events"
                  stroke="var(--color-events)"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--color-revenue)"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="growth"
                  stroke="var(--color-growth)"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Industry Analysis */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-indigo-600" />
              Industry Market Share
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {industryInsights.map((industry, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between"
                >
                  <div className="flex-1">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-medium">{industry.industry}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">
                          {industry.share}%
                        </span>
                        <Badge
                          variant="outline"
                          className="border-green-600 text-green-600"
                        >
                          {industry.growth}
                        </Badge>
                      </div>
                    </div>
                    <Progress
                      value={industry.share}
                      className="h-2"
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              Predictive Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg bg-blue-50 p-4">
                <h4 className="font-medium text-blue-900">
                  Market Opportunity
                </h4>
                <p className="mt-1 text-sm text-blue-700">
                  Healthcare events show 35% growth potential in Q3
                </p>
              </div>
              <div className="rounded-lg bg-green-50 p-4">
                <h4 className="font-medium text-green-900">Seasonal Trends</h4>
                <p className="mt-1 text-sm text-green-700">
                  Technology conferences peak in September-November
                </p>
              </div>
              <div className="rounded-lg bg-purple-50 p-4">
                <h4 className="font-medium text-purple-900">
                  Emerging Markets
                </h4>
                <p className="mt-1 text-sm text-purple-700">
                  Southeast Asia shows highest adoption rate (+45%)
                </p>
              </div>
              <div className="rounded-lg bg-yellow-50 p-4">
                <h4 className="font-medium text-yellow-900">
                  Technology Impact
                </h4>
                <p className="mt-1 text-sm text-yellow-700">
                  AR/VR integration increases engagement by 67%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GlobalAnalyticsModule;
