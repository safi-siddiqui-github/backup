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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Calendar,
  CheckCircle,
  DollarSign,
  Download,
  Filter,
  PieChart,
  Target,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const EnterpriseAnalyticsDashboard = () => {
  const [kpiData, setKpiData] = useState({
    totalROI: 247,
    customerAcquisition: 1250,
    revenueGrowth: 23.5,
    marketShare: 12.8,
    brandAwareness: 78,
    customerSatisfaction: 4.7,
  });

  const [performanceData, setPerformanceData] = useState([
    { quarter: "Q1 2023", revenue: 125000, events: 15, roi: 220 },
    { quarter: "Q2 2023", revenue: 142000, events: 18, roi: 235 },
    { quarter: "Q3 2023", revenue: 168000, events: 22, roi: 245 },
    { quarter: "Q4 2023", revenue: 189000, events: 25, roi: 267 },
    { quarter: "Q1 2024", revenue: 198000, events: 24, roi: 278 },
  ]);

  const [marketAnalysis, setMarketAnalysis] = useState([
    { segment: "Corporate", value: 45, color: "#0088FE" },
    { segment: "Healthcare", value: 25, color: "#00C49F" },
    { segment: "Education", value: 18, color: "#FFBB28" },
    { segment: "Non-profit", value: 12, color: "#FF8042" },
  ]);

  const [complianceStatus, setComplianceStatus] = useState([
    { category: "Data Privacy (GDPR)", status: "compliant", score: 98 },
    { category: "Accessibility (ADA)", status: "compliant", score: 95 },
    { category: "Financial Reporting", status: "compliant", score: 100 },
    { category: "Industry Standards", status: "warning", score: 87 },
    { category: "Security Protocols", status: "compliant", score: 96 },
  ]);

  const chartConfig = {
    revenue: { label: "Revenue", color: "hsl(var(--chart-1))" },
    events: { label: "Events", color: "hsl(var(--chart-2))" },
    roi: { label: "ROI", color: "hsl(var(--chart-3))" },
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "compliant":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "compliant":
        return "text-green-600 bg-green-50 border-green-200";
      case "warning":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      default:
        return "text-red-600 bg-red-50 border-red-200";
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Enterprise Analytics
          </h1>
          <p className="mt-2 text-gray-600">
            Advanced business intelligence and performance insights
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Advanced Filters
          </Button>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Date Range
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Executive KPIs */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-blue-600" />
              <div>
                <div className="text-xl font-bold text-blue-900">
                  {kpiData.totalROI}%
                </div>
                <div className="text-xs text-blue-700">Total ROI</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Target className="h-6 w-6 text-green-600" />
              <div>
                <div className="text-xl font-bold text-green-900">
                  {kpiData.customerAcquisition}
                </div>
                <div className="text-xs text-green-700">New Customers</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <DollarSign className="h-6 w-6 text-purple-600" />
              <div>
                <div className="text-xl font-bold text-purple-900">
                  {kpiData.revenueGrowth}%
                </div>
                <div className="text-xs text-purple-700">Revenue Growth</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <PieChart className="h-6 w-6 text-orange-600" />
              <div>
                <div className="text-xl font-bold text-orange-900">
                  {kpiData.marketShare}%
                </div>
                <div className="text-xs text-orange-700">Market Share</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-indigo-200 bg-indigo-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Activity className="h-6 w-6 text-indigo-600" />
              <div>
                <div className="text-xl font-bold text-indigo-900">
                  {kpiData.brandAwareness}%
                </div>
                <div className="text-xs text-indigo-700">Brand Awareness</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-pink-200 bg-pink-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-6 w-6 text-pink-600" />
              <div>
                <div className="text-xl font-bold text-pink-900">
                  {kpiData.customerSatisfaction}
                </div>
                <div className="text-xs text-pink-700">CSAT Score</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs
        defaultValue="performance"
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="market">Market Analysis</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
        </TabsList>

        <TabsContent
          value="performance"
          className="space-y-6"
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Quarterly Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer
                    width="100%"
                    height={300}
                  >
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="quarter" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="var(--color-revenue)"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="roi"
                        stroke="var(--color-roi)"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Event Volume Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer
                    width="100%"
                    height={300}
                  >
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="quarter" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar
                        dataKey="events"
                        fill="var(--color-events)"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent
          value="market"
          className="space-y-6"
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Market Segment Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer
                    width="100%"
                    height={300}
                  >
                    <RechartsPieChart>
                      <Pie
                        data={marketAnalysis}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {marketAnalysis.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.color}
                          />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Competitive Intelligence</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg bg-blue-50 p-4">
                    <h4 className="font-medium text-blue-900">
                      Market Position
                    </h4>
                    <p className="mt-1 text-sm text-blue-700">
                      #3 in enterprise event management solutions
                    </p>
                    <Progress
                      value={75}
                      className="mt-2"
                    />
                  </div>
                  <div className="rounded-lg bg-green-50 p-4">
                    <h4 className="font-medium text-green-900">
                      Competitive Advantage
                    </h4>
                    <p className="mt-1 text-sm text-green-700">
                      Superior AI automation capabilities
                    </p>
                    <Progress
                      value={88}
                      className="mt-2"
                    />
                  </div>
                  <div className="rounded-lg bg-purple-50 p-4">
                    <h4 className="font-medium text-purple-900">
                      Customer Retention
                    </h4>
                    <p className="mt-1 text-sm text-purple-700">
                      12% above industry average
                    </p>
                    <Progress
                      value={94}
                      className="mt-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent
          value="financial"
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>Financial Performance Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="py-8 text-center">
                <DollarSign className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                <h3 className="mb-2 text-lg font-medium text-gray-900">
                  Comprehensive Financial Analytics
                </h3>
                <p className="mb-4 text-gray-600">
                  Revenue tracking, cost analysis, and profitability insights
                </p>
                <Button>Access Financial Reports</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent
          value="compliance"
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>Compliance & Regulatory Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceStatus.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="flex items-center gap-3">
                      {getStatusIcon(item.status)}
                      <div>
                        <h4 className="font-medium">{item.category}</h4>
                        <p className="text-sm text-gray-600">
                          Compliance Score: {item.score}%
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Progress
                        value={item.score}
                        className="h-2 w-24"
                      />
                      <Badge
                        variant="outline"
                        className={getStatusColor(item.status)}
                      >
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent
          value="predictions"
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>Predictive Analytics & Forecasting</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="py-8 text-center">
                <TrendingUp className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                <h3 className="mb-2 text-lg font-medium text-gray-900">
                  AI-Powered Predictions
                </h3>
                <p className="mb-4 text-gray-600">
                  Advanced forecasting models for business planning and strategy
                </p>
                <Button>Configure Prediction Models</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnterpriseAnalyticsDashboard;
