
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, Area, AreaChart, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Clock, Brain, Zap, Target, Users, FileText, Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BudgetAnalyticsProps {
  eventId: string;
}

const BudgetAnalytics = ({ eventId }: BudgetAnalyticsProps) => {
  const budgetOverview = {
    totalBudget: 50000,
    spent: 38750,
    committed: 6500,
    remaining: 4750,
    percentageSpent: 77.5,
    burnRate: 1612.5, // per week
    projectedOverrun: 0
  };

  const categorySpending = [
    { 
      category: "Venue", 
      budgeted: 15000, 
      spent: 15000, 
      committed: 0,
      remaining: 0, 
      color: "#3B82F6",
      roi: 4.2,
      vendors: 1,
      status: "on-budget"
    },
    { 
      category: "Catering", 
      budgeted: 12000, 
      spent: 9800, 
      committed: 1500,
      remaining: 700, 
      color: "#10B981",
      roi: 3.8,
      vendors: 2,
      status: "under-budget"
    },
    { 
      category: "Photography", 
      budgeted: 8000, 
      spent: 7500, 
      committed: 0,
      remaining: 500, 
      color: "#F59E0B",
      roi: 5.1,
      vendors: 1,
      status: "on-budget"
    },
    { 
      category: "Flowers", 
      budgeted: 5000, 
      spent: 3200, 
      committed: 800,
      remaining: 1000, 
      color: "#EF4444",
      roi: 2.9,
      vendors: 1,
      status: "under-budget"
    },
    { 
      category: "Music/DJ", 
      budgeted: 4000, 
      spent: 3250, 
      committed: 0,
      remaining: 750, 
      color: "#8B5CF6",
      roi: 4.7,
      vendors: 1,
      status: "on-budget"
    },
    { 
      category: "Other", 
      budgeted: 6000, 
      spent: 0, 
      committed: 4200,
      remaining: 1800, 
      color: "#6B7280",
      roi: 0,
      vendors: 3,
      status: "pending"
    }
  ];

  const monthlySpending = [
    { month: "Jan", planned: 5000, actual: 4200, forecast: 4200 },
    { month: "Feb", planned: 8000, actual: 9100, forecast: 9100 },
    { month: "Mar", planned: 12000, actual: 11800, forecast: 11800 },
    { month: "Apr", planned: 15000, actual: 13650, forecast: 13650 },
    { month: "May", planned: 10000, actual: 0, forecast: 9500 }
  ];

  // Vendor Performance & Management
  const vendorPerformance = [
    { 
      vendor: "Grand Venue Hall", 
      amount: 15000, 
      status: "Paid", 
      dueDate: "Mar 1",
      quality: 9.5,
      reliability: 9.8,
      responseTime: "< 2 hours",
      onTimePayment: true
    },
    { 
      vendor: "Elite Catering Co.", 
      amount: 9800, 
      status: "Paid", 
      dueDate: "Apr 15",
      quality: 8.9,
      reliability: 9.2,
      responseTime: "< 4 hours",
      onTimePayment: true
    },
    { 
      vendor: "Picture Perfect", 
      amount: 7500, 
      status: "Paid", 
      dueDate: "May 1",
      quality: 9.7,
      reliability: 9.5,
      responseTime: "< 3 hours",
      onTimePayment: true
    },
    { 
      vendor: "Bloom & Blossom", 
      amount: 3200, 
      status: "Pending", 
      dueDate: "May 10",
      quality: 8.5,
      reliability: 8.7,
      responseTime: "< 6 hours",
      onTimePayment: false
    },
    { 
      vendor: "Sound Waves DJ", 
      amount: 3250, 
      status: "Overdue", 
      dueDate: "Apr 20",
      quality: 9.1,
      reliability: 7.8,
      responseTime: "< 12 hours",
      onTimePayment: false
    }
  ];

  // Proposal Analytics
  const proposalMetrics = {
    totalProposals: 34,
    accepted: 18,
    declined: 9,
    pending: 7,
    avgResponseTime: "2.8 days",
    avgNegotiationRounds: 1.6,
    avgDiscount: 12.3
  };

  // Cash Flow Projections
  const cashFlowData = [
    { week: "Week 1", inflow: 0, outflow: 4200, balance: 45800 },
    { week: "Week 2", inflow: 0, outflow: 3800, balance: 42000 },
    { week: "Week 3", inflow: 0, outflow: 5200, balance: 36800 },
    { week: "Week 4", inflow: 0, outflow: 4100, balance: 32700 },
    { week: "Week 5", inflow: 0, outflow: 3900, balance: 28800 },
    { week: "Week 6", inflow: 0, outflow: 4500, balance: 24300 },
    { week: "Week 7", inflow: 0, outflow: 3200, balance: 21100 },
    { week: "Week 8", inflow: 0, outflow: 2800, balance: 18300 }
  ];

  // Cost per Attendee Breakdown
  const costPerAttendee = {
    total: 38750,
    expectedAttendees: 1247,
    costPerPerson: 31.07,
    industryAverage: 42.50,
    savingsVsIndustry: 11.43
  };

  // Budget Health Score Components
  const healthScoreComponents = [
    { metric: "Spending Pace", score: 85, maxScore: 100 },
    { metric: "Vendor Reliability", score: 92, maxScore: 100 },
    { metric: "Payment Timeliness", score: 78, maxScore: 100 },
    { metric: "ROI Potential", score: 88, maxScore: 100 },
    { metric: "Risk Management", score: 81, maxScore: 100 }
  ];

  // Predictive Analytics
  const predictions = {
    finalBudgetUsage: 48750,
    confidence: 85,
    projectedSavings: 1250,
    riskOfOverrun: 15,
    recommendedContingency: 2500
  };

  // Payment Schedule
  const upcomingPayments = [
    { vendor: "Bloom & Blossom", amount: 3200, due: "May 10", priority: "high" },
    { vendor: "Final Catering Payment", amount: 1500, due: "May 15", priority: "high" },
    { vendor: "Lighting & AV", amount: 2800, due: "May 18", priority: "medium" },
    { vendor: "Transportation", amount: 1400, due: "May 20", priority: "low" }
  ];

  const budgetHealthScore = 85;

  const chartConfig = {
    spent: { label: "Spent", color: "#3B82F6" },
    committed: { label: "Committed", color: "#F59E0B" },
    remaining: { label: "Remaining", color: "#10B981" },
    planned: { label: "Planned", color: "#8B5CF6" },
    actual: { label: "Actual", color: "#F59E0B" },
    forecast: { label: "Forecast", color: "#10B981" },
    balance: { label: "Balance", color: "#3B82F6" },
    outflow: { label: "Outflow", color: "#EF4444" }
  };

  return (
    <div className="space-y-6">
      {/* AI-Powered Budget Intelligence */}
      <Card className="bg-gradient-to-r from-green-500 to-emerald-600 border-0 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Budget Intelligence & Forecasting
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <div className="text-2xl font-bold">${(predictions.finalBudgetUsage/1000).toFixed(1)}K</div>
              <div className="text-sm opacity-90">Projected Final Spend</div>
              <Badge className="mt-1 bg-white/20">{predictions.confidence}% confidence</Badge>
            </div>
            <div>
              <div className="text-2xl font-bold">${(predictions.projectedSavings/1000).toFixed(1)}K</div>
              <div className="text-sm opacity-90">Projected Savings</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{predictions.riskOfOverrun}%</div>
              <div className="text-sm opacity-90">Overrun Risk</div>
            </div>
            <div>
              <div className="text-2xl font-bold">${(budgetOverview.burnRate/1000).toFixed(1)}K</div>
              <div className="text-sm opacity-90">Weekly Burn Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold">${costPerAttendee.costPerPerson.toFixed(0)}</div>
              <div className="text-sm opacity-90">Cost Per Attendee</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="vendors">Vendors</TabsTrigger>
          <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
          <TabsTrigger value="roi">ROI Analysis</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* Budget Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-6 h-6 text-green-600" />
                  <div>
                    <div className="text-xl font-bold">${(budgetOverview.totalBudget/1000).toFixed(0)}K</div>
                    <div className="text-xs text-gray-600">Total Budget</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <TrendingDown className="w-6 h-6 text-red-600" />
                  <div>
                    <div className="text-xl font-bold">${(budgetOverview.spent/1000).toFixed(1)}K</div>
                    <div className="text-xs text-gray-600">Spent</div>
                    <Badge variant="outline" className="mt-1">{budgetOverview.percentageSpent}%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-yellow-600" />
                  <div>
                    <div className="text-xl font-bold">${(budgetOverview.committed/1000).toFixed(1)}K</div>
                    <div className="text-xs text-gray-600">Committed</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                  <div>
                    <div className="text-xl font-bold">${(budgetOverview.remaining/1000).toFixed(1)}K</div>
                    <div className="text-xs text-gray-600">Remaining</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-purple-600" />
                  <div>
                    <div className="text-xl font-bold">{budgetHealthScore}</div>
                    <div className="text-xs text-gray-600">Health Score</div>
                    <Badge variant="outline" className="mt-1">Excellent</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-orange-600" />
                  <div>
                    <div className="text-xl font-bold">{proposalMetrics.pending}</div>
                    <div className="text-xs text-gray-600">Pending Proposals</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Spending Trend with Forecast */}
          <Card>
            <CardHeader>
              <CardTitle>Budget Timeline & Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={monthlySpending}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="planned" stroke="var(--color-planned)" strokeWidth={2} strokeDasharray="5 5" />
                    <Line type="monotone" dataKey="actual" stroke="var(--color-actual)" strokeWidth={3} />
                    <Line type="monotone" dataKey="forecast" stroke="var(--color-forecast)" strokeWidth={2} strokeDasharray="3 3" />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Budget Health Score Radar */}
          <Card>
            <CardHeader>
              <CardTitle>Budget Health Score Components</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height={350}>
                  <RadarChart data={healthScoreComponents}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="metric" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="Score" dataKey="score" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                    <ChartTooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6 mt-6">
          {/* Category Performance Detailed */}
          <Card>
            <CardHeader>
              <CardTitle>Category Budget Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categorySpending.map((category, index) => (
                  <div key={index} className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }} />
                        <div>
                          <div className="font-medium text-lg">{category.category}</div>
                          <div className="text-sm text-gray-600">{category.vendors} vendor{category.vendors > 1 ? 's' : ''}</div>
                        </div>
                      </div>
                      <Badge className={
                        category.status === 'on-budget' ? 'bg-green-500' :
                        category.status === 'under-budget' ? 'bg-blue-500' :
                        category.status === 'over-budget' ? 'bg-red-500' : 'bg-yellow-500'
                      }>
                        {category.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-4 gap-3 mb-3">
                      <div>
                        <div className="text-xs text-gray-600">Budgeted</div>
                        <div className="font-medium">${category.budgeted.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600">Spent</div>
                        <div className="font-medium text-red-600">${category.spent.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600">Committed</div>
                        <div className="font-medium text-yellow-600">${category.committed.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600">Remaining</div>
                        <div className="font-medium text-green-600">${category.remaining.toLocaleString()}</div>
                      </div>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                      <div
                        className="h-3 rounded-full"
                        style={{ 
                          width: `${((category.spent + category.committed) / category.budgeted) * 100}%`,
                          backgroundColor: category.color
                        }}
                      />
                    </div>

                    {category.roi > 0 && (
                      <div className="text-xs text-gray-600">
                        Estimated ROI: <span className="font-medium text-green-600">{category.roi}x</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Category Distribution Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Budget Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categorySpending}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ category, budgeted }) => `${category}: $${(budgeted/1000).toFixed(0)}K`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="budgeted"
                      >
                        {categorySpending.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Actual Spending by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={categorySpending}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" angle={-20} textAnchor="end" height={80} />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="spent" fill="var(--color-spent)" />
                      <Bar dataKey="committed" fill="var(--color-committed)" />
                      <Bar dataKey="remaining" fill="var(--color-remaining)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="vendors" className="space-y-6 mt-6">
          {/* Vendor Performance Matrix */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Vendor Performance & Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vendorPerformance.map((vendor, index) => (
                  <div key={index} className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-medium text-lg">{vendor.vendor}</div>
                        <div className="text-sm text-gray-600">Due: {vendor.dueDate}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right mr-2">
                          <div className="font-bold text-lg">${vendor.amount.toLocaleString()}</div>
                        </div>
                        <Badge className={
                          vendor.status === "Paid" ? "bg-green-500" :
                          vendor.status === "Pending" ? "bg-yellow-500" :
                          "bg-red-500"
                        }>
                          {vendor.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-3 text-sm">
                      <div>
                        <div className="text-gray-600">Quality Score</div>
                        <div className="font-medium flex items-center gap-1">
                          <span className="text-blue-600">{vendor.quality}</span>/10
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-600">Reliability</div>
                        <div className="font-medium flex items-center gap-1">
                          <span className="text-green-600">{vendor.reliability}</span>/10
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-600">Response Time</div>
                        <div className="font-medium">{vendor.responseTime}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Payment</div>
                        <div className="font-medium">
                          {vendor.onTimePayment ? 
                            <span className="text-green-600">On-time</span> : 
                            <span className="text-red-600">Late</span>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Proposal Analytics */}
          <Card>
            <CardHeader>
              <CardTitle>Proposal & Negotiation Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">{proposalMetrics.totalProposals}</div>
                  <div className="text-sm text-gray-600">Total Proposals</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">{proposalMetrics.accepted}</div>
                  <div className="text-sm text-gray-600">Accepted</div>
                  <Badge className="mt-1">{((proposalMetrics.accepted/proposalMetrics.totalProposals)*100).toFixed(0)}%</Badge>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-3xl font-bold text-yellow-600">{proposalMetrics.pending}</div>
                  <div className="text-sm text-gray-600">Pending</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-3xl font-bold text-red-600">{proposalMetrics.declined}</div>
                  <div className="text-sm text-gray-600">Declined</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Avg Response Time</div>
                  <div className="text-2xl font-bold">{proposalMetrics.avgResponseTime}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Avg Negotiation Rounds</div>
                  <div className="text-2xl font-bold">{proposalMetrics.avgNegotiationRounds}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Avg Discount Achieved</div>
                  <div className="text-2xl font-bold text-green-600">{proposalMetrics.avgDiscount}%</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Payments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Upcoming Payment Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingPayments.map((payment, index) => (
                  <div key={index} className={`p-4 rounded-lg border-l-4 ${
                    payment.priority === 'high' ? 'border-red-500 bg-red-50' :
                    payment.priority === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                    'border-blue-500 bg-blue-50'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{payment.vendor}</div>
                        <div className="text-sm text-gray-600">Due: {payment.due}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">${payment.amount.toLocaleString()}</div>
                        <Badge variant="outline" className="mt-1">{payment.priority} priority</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cashflow" className="space-y-6 mt-6">
          {/* Cash Flow Projection */}
          <Card>
            <CardHeader>
              <CardTitle>Cash Flow Projection</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={cashFlowData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area type="monotone" dataKey="balance" stroke="var(--color-balance)" fill="var(--color-balance)" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="outflow" stroke="var(--color-outflow)" fill="var(--color-outflow)" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Burn Rate Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="text-sm text-gray-600 mb-2">Weekly Burn Rate</div>
                <div className="text-3xl font-bold text-red-600">${(budgetOverview.burnRate/1000).toFixed(1)}K</div>
                <div className="text-xs text-gray-500 mt-2">Average per week</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-sm text-gray-600 mb-2">Budget Runway</div>
                <div className="text-3xl font-bold text-blue-600">3 weeks</div>
                <div className="text-xs text-gray-500 mt-2">Until event date</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-sm text-gray-600 mb-2">Recommended Contingency</div>
                <div className="text-3xl font-bold text-green-600">${(predictions.recommendedContingency/1000).toFixed(1)}K</div>
                <div className="text-xs text-gray-500 mt-2">5% buffer</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="roi" className="space-y-6 mt-6">
          {/* ROI Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Return on Investment Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categorySpending.filter(c => c.roi > 0).map((category, index) => (
                  <div key={index} className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }} />
                        <span className="font-medium">{category.category}</span>
                      </div>
                      <Badge className="bg-green-600">{category.roi}x ROI</Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      Investment: ${category.spent.toLocaleString()} • 
                      Expected Return: ${(category.spent * category.roi).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Cost Per Attendee Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Cost Efficiency Benchmarking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <div className="text-4xl font-bold text-green-600">${costPerAttendee.costPerPerson.toFixed(2)}</div>
                    <div className="text-sm text-gray-600 mt-2">Your Cost Per Attendee</div>
                  </div>
                </div>
                <div>
                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <div className="text-4xl font-bold text-gray-600">${costPerAttendee.industryAverage.toFixed(2)}</div>
                    <div className="text-sm text-gray-600 mt-2">Industry Average</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <div className="font-medium text-green-900">Excellent Cost Efficiency!</div>
                    <div className="text-sm text-green-700 mt-1">
                      You're saving ${costPerAttendee.savingsVsIndustry.toFixed(2)} per attendee compared to industry average.
                      Total savings: ${(costPerAttendee.savingsVsIndustry * costPerAttendee.expectedAttendees).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6 mt-6">
          {/* AI-Powered Budget Recommendations */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-600" />
                AI-Powered Budget Optimization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-4 bg-white rounded-lg border border-green-200">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-800">Excellent Budget Management</div>
                      <div className="text-sm text-gray-600 mt-1">
                        You're 22.5% under budget with high vendor satisfaction scores. Current trajectory suggests $1,250 in savings.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-lg border border-yellow-200">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-800">Payment Attention Needed</div>
                      <div className="text-sm text-gray-600 mt-1">
                        Sound Waves DJ payment is 5 days overdue. Immediate payment recommended to maintain vendor relationship and avoid late fees.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-lg border border-blue-200">
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-800">Reallocation Opportunity</div>
                      <div className="text-sm text-gray-600 mt-1">
                        Flowers category is $1,800 under budget. Consider upgrading floral arrangements or reallocating to photography for additional coverage.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-lg border border-purple-200">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-800">Strong ROI Performance</div>
                      <div className="text-sm text-gray-600 mt-1">
                        Photography showing 5.1x ROI - highest among all categories. This investment is delivering exceptional value.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-lg border border-orange-200">
                  <div className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-orange-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-800">Negotiation Success</div>
                      <div className="text-sm text-gray-600 mt-1">
                        Average discount of 12.3% achieved through negotiations, resulting in $4,890 in total savings across all vendors.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BudgetAnalytics;
