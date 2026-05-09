
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Users, Star, Clock, Activity, Gamepad2, Trophy, Zap, Target } from "lucide-react";

interface GuestAnalyticsProps {
  eventId: string;
}

const GuestAnalytics = ({ eventId }: GuestAnalyticsProps) => {
  // Enhanced mock data with gaming metrics
  const guestSegmentData = [
    { segment: "First-time", count: 98, percentage: 40 },
    { segment: "Returning", count: 89, percentage: 36 },
    { segment: "VIP", count: 35, percentage: 14 },
    { segment: "Staff", count: 25, percentage: 10 }
  ];

  const activityLevelData = [
    { level: "Gaming Champions", count: 45, color: "#22C55E" },
    { level: "Active Players", count: 85, color: "#3B82F6" },
    { level: "Casual Participants", count: 78, color: "#F59E0B" },
    { level: "Photo Sharers", count: 62, color: "#8B5CF6" },
    { level: "Spectators", count: 17, color: "#EF4444" }
  ];

  const gameParticipationData = [
    { game: "Love Story Trivia", participants: 156, avgScore: 847, completion: 94 },
    { game: "Photo Scavenger Hunt", participants: 134, avgScore: 723, completion: 87 },
    { game: "Memory Match", participants: 98, avgScore: 625, completion: 76 },
    { game: "Wedding Facts Quiz", participants: 87, avgScore: 534, completion: 82 },
    { game: "Couple's Journey", participants: 76, avgScore: 678, completion: 90 }
  ];

  const hourlyEngagementData = [
    { hour: "2:00 PM", participants: 45, gamesStarted: 3, photosUploaded: 12 },
    { hour: "3:00 PM", participants: 89, gamesStarted: 8, photosUploaded: 28 },
    { hour: "4:00 PM", participants: 134, gamesStarted: 12, photosUploaded: 45 },
    { hour: "5:00 PM", participants: 187, gamesStarted: 15, photosUploaded: 67 },
    { hour: "6:00 PM", participants: 223, gamesStarted: 18, photosUploaded: 89 },
    { hour: "7:00 PM", participants: 247, gamesStarted: 22, photosUploaded: 134 },
    { hour: "8:00 PM", participants: 231, gamesStarted: 19, photosUploaded: 156 },
    { hour: "9:00 PM", participants: 198, gamesStarted: 14, photosUploaded: 187 }
  ];

  const satisfactionData = [
    { rating: "5", count: 145, label: "Excellent" },
    { rating: "4", count: 78, label: "Very Good" },
    { rating: "3", count: 18, label: "Good" },
    { rating: "2", count: 4, label: "Fair" },
    { rating: "1", count: 2, label: "Poor" }
  ];

  const topGamers = [
    { name: "Sarah Johnson", activity: 98, photos: 28, surveys: 5, games: 15, totalScore: 2847, achievements: 8 },
    { name: "Mike Chen", activity: 94, photos: 22, surveys: 4, games: 12, totalScore: 2534, achievements: 6 },
    { name: "Emily Davis", activity: 91, photos: 19, surveys: 6, games: 14, totalScore: 2398, achievements: 7 },
    { name: "Alex Rodriguez", activity: 87, photos: 15, surveys: 3, games: 18, totalScore: 2267, achievements: 5 },
    { name: "Lisa Thompson", activity: 85, photos: 18, surveys: 4, games: 11, totalScore: 2156, achievements: 4 }
  ];

  const liveGameStats = {
    activeGames: 6,
    totalSessions: 34,
    avgPlayTime: "8.5 min",
    peakConcurrent: 67,
    completionRate: 89
  };

  const chartConfig = {
    count: {
      label: "Count",
      color: "hsl(var(--chart-1))"
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="space-y-6">
      {/* Enhanced Guest Overview with Gaming */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-blue-600" />
              <div>
                <div className="text-xl font-bold">247</div>
                <div className="text-xs text-gray-600">Total Guests</div>
                <Badge variant="outline" className="mt-1">98.8% attended</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Gamepad2 className="w-6 h-6 text-purple-600" />
              <div>
                <div className="text-xl font-bold">{liveGameStats.activeGames}</div>
                <div className="text-xs text-gray-600">Live Games</div>
                <Badge variant="outline" className="mt-1">{liveGameStats.peakConcurrent} peak players</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Trophy className="w-6 h-6 text-yellow-600" />
              <div>
                <div className="text-xl font-bold">{liveGameStats.totalSessions}</div>
                <div className="text-xs text-gray-600">Game Sessions</div>
                <Badge variant="outline" className="mt-1">{liveGameStats.completionRate}% completion</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Star className="w-6 h-6 text-green-600" />
              <div>
                <div className="text-xl font-bold">4.8</div>
                <div className="text-xs text-gray-600">Gaming Rating</div>
                <Badge variant="outline" className="mt-1">Excellent</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-orange-600" />
              <div>
                <div className="text-xl font-bold">{liveGameStats.avgPlayTime}</div>
                <div className="text-xs text-gray-600">Avg. Play Time</div>
                <Badge variant="outline" className="mt-1">Per session</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Game Participation by Type */}
        <Card>
          <CardHeader>
            <CardTitle>Game Participation by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={gameParticipationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="game" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="participants" fill="var(--color-count)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Hourly Engagement */}
        <Card>
          <CardHeader>
            <CardTitle>Real-time Engagement Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={hourlyEngagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="participants" stroke="#8884d8" strokeWidth={2} />
                  <Line type="monotone" dataKey="gamesStarted" stroke="#82ca9d" strokeWidth={2} />
                  <Line type="monotone" dataKey="photosUploaded" stroke="#ffc658" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Activity Levels */}
      <Card>
        <CardHeader>
          <CardTitle>Guest Engagement Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activityLevelData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-medium">{item.level}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-48 bg-gray-200 rounded-full h-3">
                    <div
                      className="h-3 rounded-full"
                      style={{
                        width: `${(item.count / 287) * 100}%`,
                        backgroundColor: item.color
                      }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 min-w-16">{item.count} guests</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Gaming Champions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            Top Gaming Champions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topGamers.map((gamer, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                    index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-500' : 'bg-purple-500'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{gamer.name}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>Score: {gamer.totalScore}</span>
                      <span>Games: {gamer.games}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500" />
                        <span>{gamer.achievements}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-6 text-sm">
                  <div className="text-center">
                    <div className="font-medium text-purple-600">{gamer.photos}</div>
                    <div className="text-gray-600">Photos</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-green-600">{gamer.surveys}</div>
                    <div className="text-gray-600">Surveys</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-blue-600">{gamer.activity}</div>
                    <div className="text-gray-600">Activity</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Guest Satisfaction */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Guest Satisfaction</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={satisfactionData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="rating" type="category" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="var(--color-count)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default GuestAnalytics;
