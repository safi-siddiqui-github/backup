
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Gamepad2, Trophy, Users, Clock, Zap, Target } from "lucide-react";

interface GamesAnalyticsProps {
  eventId: string;
}

const GamesAnalytics = ({ eventId }: GamesAnalyticsProps) => {
  const gamesOverview = {
    totalGames: 8,
    activeGames: 6,
    totalPlayers: 156,
    avgPlayTime: 8.5,
    completionRate: 89,
    totalSessions: 234
  };

  const gamePerformance = [
    { name: "Love Story Trivia", players: 45, completions: 42, avgScore: 847, rating: 4.8 },
    { name: "Photo Scavenger Hunt", players: 38, completions: 33, avgScore: 723, rating: 4.6 },
    { name: "Memory Match", players: 29, completions: 22, avgScore: 625, rating: 4.3 },
    { name: "Wedding Facts Quiz", players: 25, completions: 21, avgScore: 534, rating: 4.5 },
    { name: "Couple's Journey", players: 19, completions: 17, avgScore: 678, rating: 4.7 }
  ];

  const playTimeDistribution = [
    { duration: "0-2 min", players: 12 },
    { duration: "2-5 min", players: 34 },
    { duration: "5-10 min", players: 67 },
    { duration: "10-15 min", players: 28 },
    { duration: "15+ min", players: 15 }
  ];

  const hourlyActivity = [
    { hour: "14:00", players: 15, sessions: 18 },
    { hour: "15:00", players: 28, sessions: 34 },
    { hour: "16:00", players: 45, sessions: 56 },
    { hour: "17:00", players: 38, sessions: 47 },
    { hour: "18:00", players: 32, sessions: 39 },
    { hour: "19:00", players: 41, sessions: 52 },
    { hour: "20:00", players: 35, sessions: 43 },
    { hour: "21:00", players: 22, sessions: 28 }
  ];

  const chartConfig = {
    players: { label: "Players", color: "#3B82F6" },
    sessions: { label: "Sessions", color: "#10B981" }
  };

  return (
    <div className="space-y-6">
      {/* Games Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Gamepad2 className="w-6 h-6 text-blue-600" />
              <div>
                <div className="text-xl font-bold">{gamesOverview.totalGames}</div>
                <div className="text-xs text-gray-600">Total Games</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-green-600" />
              <div>
                <div className="text-xl font-bold">{gamesOverview.totalPlayers}</div>
                <div className="text-xs text-gray-600">Total Players</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-yellow-600" />
              <div>
                <div className="text-xl font-bold">{gamesOverview.activeGames}</div>
                <div className="text-xs text-gray-600">Active Games</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-orange-600" />
              <div>
                <div className="text-xl font-bold">{gamesOverview.avgPlayTime}min</div>
                <div className="text-xs text-gray-600">Avg Play Time</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Target className="w-6 h-6 text-purple-600" />
              <div>
                <div className="text-xl font-bold">{gamesOverview.completionRate}%</div>
                <div className="text-xs text-gray-600">Completion Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Trophy className="w-6 h-6 text-red-600" />
              <div>
                <div className="text-xl font-bold">{gamesOverview.totalSessions}</div>
                <div className="text-xs text-gray-600">Total Sessions</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Game Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Game Popularity</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={gamePerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="players" fill="var(--color-players)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Hourly Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Gaming Activity Throughout Event</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={hourlyActivity}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="players" stroke="var(--color-players)" strokeWidth={2} />
                  <Line type="monotone" dataKey="sessions" stroke="var(--color-sessions)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Game Details */}
      <Card>
        <CardHeader>
          <CardTitle>Game Performance Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {gamePerformance.map((game, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">{game.name}</div>
                  <div className="text-sm text-gray-600">
                    {game.players} players • {game.completions} completions
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="font-medium">{game.avgScore}</div>
                    <div className="text-xs text-gray-600">Avg Score</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">{game.rating}/5</div>
                    <div className="text-xs text-gray-600">Rating</div>
                  </div>
                  <Badge className="bg-purple-500 text-white">
                    {Math.round((game.completions / game.players) * 100)}% completion
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Play Time Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Play Time Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={playTimeDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="duration" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="players" fill="var(--color-players)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default GamesAnalytics;
