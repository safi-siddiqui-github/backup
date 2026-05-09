
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Zap, 
  Target, 
  TrendingUp, 
  Bot, 
  Activity,
  AlertTriangle,
  CheckCircle,
  Settings,
  Play,
  Pause
} from "lucide-react";

const NextGenAI = () => {
  const [aiStatus, setAiStatus] = useState({
    autonomousPlanning: true,
    predictiveModeling: true,
    realTimeSentiment: true,
    crisisManagement: false,
    learningAlgorithms: true
  });

  const [aiMetrics, setAiMetrics] = useState({
    predictionAccuracy: 94,
    automationLevel: 87,
    learningProgress: 76,
    processingSpeed: 99,
    decisionConfidence: 91
  });

  const [aiRecommendations, setAiRecommendations] = useState([
    {
      id: 1,
      type: "optimization",
      priority: "high",
      title: "Event Timing Optimization",
      description: "AI suggests moving your networking event 2 hours earlier for 23% better attendance",
      confidence: 89,
      impact: "High",
      action: "Apply Suggestion"
    },
    {
      id: 2,
      type: "cost",
      priority: "medium",
      title: "Vendor Cost Reduction",
      description: "Alternative vendor selection could reduce catering costs by 15% without quality impact",
      confidence: 76,
      impact: "Medium",
      action: "Review Options"
    },
    {
      id: 3,
      type: "experience",
      priority: "high",
      title: "Guest Experience Enhancement",
      description: "Adding interactive stations during hour 2-3 predicted to increase satisfaction by 18%",
      confidence: 92,
      impact: "High",
      action: "Implement"
    }
  ]);

  const [learningInsights, setLearningInsights] = useState([
    {
      category: "Attendance Patterns",
      insight: "Corporate events on Thursdays show 34% higher attendance rates",
      confidence: 96,
      dataPoints: 1247
    },
    {
      category: "Venue Preferences",
      insight: "Hybrid venues increase guest engagement by 28% for tech audiences",
      confidence: 88,
      dataPoints: 892
    },
    {
      category: "Pricing Optimization",
      insight: "Early bird pricing increases conversion rates by 42% when announced 6 weeks prior",
      confidence: 91,
      dataPoints: 1563
    }
  ]);

  const [sentimentData, setSentimentData] = useState([
    { time: "Event Start", sentiment: 75, confidence: 85 },
    { time: "30 min", sentiment: 82, confidence: 89 },
    { time: "1 hour", sentiment: 88, confidence: 92 },
    { time: "1.5 hours", sentiment: 85, confidence: 87 },
    { time: "2 hours", sentiment: 91, confidence: 94 },
    { time: "2.5 hours", sentiment: 89, confidence: 90 }
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'optimization': return Target;
      case 'cost': return TrendingUp;
      case 'experience': return Activity;
      default: return Brain;
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Next-Generation AI Systems</h1>
          <p className="text-gray-600 mt-2">Advanced AI and machine learning for autonomous event management</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            AI Settings
          </Button>
          <Button>
            <Brain className="w-4 h-4 mr-2" />
            Train Models
          </Button>
        </div>
      </div>

      {/* AI System Status */}
      <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-purple-600" />
            AI System Status
            <Badge variant="outline" className="ml-auto bg-green-100 text-green-700">
              All Systems Active
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {Object.entries(aiStatus).map(([key, status]) => (
              <div key={key} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                <div>
                  <div className="font-medium text-sm capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    {status ? (
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    ) : (
                      <AlertTriangle className="w-3 h-3 text-yellow-600" />
                    )}
                    <span className="text-xs text-gray-600">
                      {status ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="p-1 h-8 w-8"
                >
                  {status ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {Object.entries(aiMetrics).map(([key, value]) => (
          <Card key={key}>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{value}%</div>
                <div className="text-xs text-gray-600 capitalize mt-1">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
                <Progress value={value} className="mt-3 h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="recommendations" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
          <TabsTrigger value="learning">Learning Insights</TabsTrigger>
          <TabsTrigger value="sentiment">Real-time Sentiment</TabsTrigger>
          <TabsTrigger value="autonomous">Autonomous Systems</TabsTrigger>
        </TabsList>

        <TabsContent value="recommendations" className="space-y-6">
          <div className="space-y-4">
            {aiRecommendations.map((rec) => {
              const Icon = getTypeIcon(rec.type);
              
              return (
                <Card key={rec.id} className="border-l-4 border-l-purple-400">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5 text-purple-600" />
                        <div>
                          <h3 className="font-semibold text-gray-900">{rec.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant="outline" 
                          className={getPriorityColor(rec.priority)}
                        >
                          {rec.priority} priority
                        </Badge>
                        <Badge variant="outline">
                          {rec.impact} Impact
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-sm">
                          <span className="text-gray-500">AI Confidence:</span>
                          <span className="font-medium ml-1">{rec.confidence}%</span>
                        </div>
                        <Progress value={rec.confidence} className="w-24 h-2" />
                      </div>
                      
                      <Button
                        size="sm"
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        {rec.action}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="learning" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-blue-600" />
                Machine Learning Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {learningInsights.map((insight, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{insight.category}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          {insight.confidence}% confident
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {insight.dataPoints} data points
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{insight.insight}</p>
                    <Progress value={insight.confidence} className="mt-3 h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sentiment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-600" />
                Real-time Sentiment Analysis
                <Badge className="bg-green-100 text-green-700 ml-auto">Live</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sentimentData.map((data, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="font-medium">{data.time}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Progress value={data.sentiment} className="w-24 h-2" />
                      <span className="text-sm font-medium">{data.sentiment}%</span>
                      <Badge variant="outline" className="text-xs">
                        {data.confidence}% confidence
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Brain className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-800">AI Sentiment Alert</h4>
                    <p className="text-blue-700 text-sm">
                      Positive sentiment trend detected. Guest engagement is 12% above expected levels. 
                      Consider extending networking session by 15 minutes.
                    </p>
                    <Button size="sm" className="mt-2 bg-blue-600 hover:bg-blue-700 text-white">
                      Apply AI Suggestion
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="autonomous" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-600" />
                Autonomous Event Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Bot className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Fully Autonomous Mode</h3>
                <p className="text-gray-600 mb-4">
                  Enable AI to make autonomous decisions and optimizations without human intervention
                </p>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline">Configure Autonomous Rules</Button>
                  <Button>Enable Autonomous Mode</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NextGenAI;
