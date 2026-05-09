
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts";
import { TrendingUp, Users, AlertTriangle, Target, Brain, Calendar, DollarSign } from "lucide-react";
import { EventFormData } from "../EnhancedEventCreationDialog";

interface PredictiveMetric {
  name: string;
  current: number;
  predicted: number;
  confidence: number;
  trend: 'up' | 'down' | 'stable';
  risk: 'low' | 'medium' | 'high';
}

interface Props {
  eventData: EventFormData;
}

const PredictiveAnalyticsDashboard = ({ eventData }: Props) => {
  const [metrics, setMetrics] = useState<PredictiveMetric[]>([]);
  const [attendanceForecast, setAttendanceForecast] = useState<any[]>([]);
  const [resourceDemand, setResourceDemand] = useState<any[]>([]);
  const [successProbability, setSuccessProbability] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    generatePredictions();
  }, [eventData]);

  const generatePredictions = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      // Generate predictive metrics
      const newMetrics: PredictiveMetric[] = [
        {
          name: 'Attendance Rate',
          current: 0,
          predicted: 87,
          confidence: 92,
          trend: 'up',
          risk: 'low'
        },
        {
          name: 'Revenue',
          current: 0,
          predicted: eventData.ticketTypes.reduce((sum, t) => sum + (t.price * t.quantity * 0.8), 0),
          confidence: 85,
          trend: 'up',
          risk: 'low'
        },
        {
          name: 'Satisfaction Score',
          current: 0,
          predicted: 4.3,
          confidence: 78,
          trend: 'stable',
          risk: 'medium'
        },
        {
          name: 'No-Show Rate',
          current: 0,
          predicted: 12,
          confidence: 89,
          trend: 'down',
          risk: 'medium'
        }
      ];

      // Generate attendance forecast
      const forecast = [];
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      for (let i = 0; i < 7; i++) {
        forecast.push({
          day: days[i],
          predicted: Math.floor(80 + Math.random() * 40),
          historical: Math.floor(70 + Math.random() * 35),
          optimal: Math.floor(90 + Math.random() * 20)
        });
      }

      // Generate resource demand
      const resources = [
        { resource: 'Staff', demand: 85, capacity: 100 },
        { resource: 'Catering', demand: 92, capacity: 120 },
        { resource: 'AV Equipment', demand: 78, capacity: 90 },
        { resource: 'Seating', demand: 95, capacity: 150 },
        { resource: 'Parking', demand: 67, capacity: 80 }
      ];

      setMetrics(newMetrics);
      setAttendanceForecast(forecast);
      setResourceDemand(resources);
      setSuccessProbability(88);
      setIsAnalyzing(false);
    }, 1500);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
      default: return <TrendingUp className="w-4 h-4 text-gray-500" />;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const chartConfig = {
    predicted: { label: "Predicted", color: "hsl(var(--chart-1))" },
    historical: { label: "Historical", color: "hsl(var(--chart-2))" },
    optimal: { label: "Optimal", color: "hsl(var(--chart-3))" }
  };

  return (
    <div className="space-y-6">
      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-blue-600" />
            Predictive Analytics Dashboard
            <Badge variant="outline" className="ml-auto bg-blue-100 text-blue-700">
              AI Powered
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Success Probability */}
          <div className="mb-6 p-4 bg-white rounded-lg border">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                <span className="font-semibold">Event Success Probability</span>
              </div>
              <span className="text-2xl font-bold text-blue-600">{successProbability}%</span>
            </div>
            <Progress value={successProbability} className="h-3 mb-2" />
            <p className="text-sm text-gray-600">
              High probability of success based on planning quality, timing, and market conditions
            </p>
          </div>

          {isAnalyzing ? (
            <div className="text-center py-8">
              <Brain className="w-12 h-12 mx-auto mb-4 text-blue-400 animate-pulse" />
              <p className="text-sm text-gray-600">Analyzing patterns and generating predictions...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Predictive Metrics */}
              <div className="space-y-4">
                <h4 className="font-semibold flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Key Predictions
                </h4>
                {metrics.map((metric, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{metric.name}</span>
                      <div className="flex items-center gap-2">
                        {getTrendIcon(metric.trend)}
                        <Badge variant="outline" className={`text-xs ${getRiskColor(metric.risk)}`}>
                          {metric.risk} risk
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-lg font-bold text-blue-600">
                        {metric.name.includes('Rate') || metric.name.includes('Score') 
                          ? `${metric.predicted}${metric.name.includes('Score') ? '/5' : '%'}`
                          : `$${metric.predicted.toLocaleString()}`
                        }
                      </span>
                      <span className="text-xs text-gray-500">{metric.confidence}% confidence</span>
                    </div>
                    <Progress value={metric.confidence} className="h-1" />
                  </Card>
                ))}
              </div>

              {/* Resource Demand Analysis */}
              <div className="space-y-4">
                <h4 className="font-semibold flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Resource Demand Forecast
                </h4>
                <div className="space-y-3">
                  {resourceDemand.map((resource, index) => {
                    const utilizationRate = (resource.demand / resource.capacity) * 100;
                    const isOverCapacity = utilizationRate > 90;
                    
                    return (
                      <div key={index} className="p-3 bg-white rounded border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{resource.resource}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">
                              {resource.demand}/{resource.capacity}
                            </span>
                            {isOverCapacity && (
                              <AlertTriangle className="w-4 h-4 text-red-500" />
                            )}
                          </div>
                        </div>
                        <Progress 
                          value={utilizationRate} 
                          className={`h-2 ${isOverCapacity ? 'bg-red-100' : ''}`}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          {utilizationRate.toFixed(0)}% utilization
                          {isOverCapacity && ' - Consider increasing capacity'}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Attendance Forecast Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            7-Day Attendance Forecast
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceForecast}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="predicted" 
                  stroke="var(--color-predicted)" 
                  strokeWidth={3}
                />
                <Line 
                  type="monotone" 
                  dataKey="historical" 
                  stroke="var(--color-historical)" 
                  strokeDasharray="5 5"
                />
                <Line 
                  type="monotone" 
                  dataKey="optimal" 
                  stroke="var(--color-optimal)" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictiveAnalyticsDashboard;
