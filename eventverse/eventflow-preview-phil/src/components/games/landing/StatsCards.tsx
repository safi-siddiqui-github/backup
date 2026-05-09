import { Gamepad2, Play, Users, Trophy } from "lucide-react";
import { Game } from "@/types/game";

interface StatsCardsProps {
  games: Game[];
}

const StatsCards = ({ games }: StatsCardsProps) => {
  const totalGames = games.length;
  const activeGames = games.filter(g => g.status === 'active').length;
  const totalPlayers = games.reduce((sum, game) => sum + (game.maxParticipants || 0), 0);
  const completedGames = games.filter(g => g.status === 'completed').length;
  const completionRate = totalGames > 0 ? Math.round((completedGames / totalGames) * 100) : 0;

  const stats = [
    {
      title: "Total Games",
      value: totalGames,
      subtitle: "Games in library",
      icon: Gamepad2,
      gradient: "from-purple-500 to-purple-700",
      iconBg: "bg-purple-100 dark:bg-purple-900/30"
    },
    {
      title: "Active Games",
      value: activeGames,
      subtitle: "Playing now",
      icon: Play,
      gradient: "from-green-500 to-green-700",
      iconBg: "bg-green-100 dark:bg-green-900/30",
      showPulse: activeGames > 0
    },
    {
      title: "Total Players",
      value: totalPlayers,
      subtitle: "Max capacity",
      icon: Users,
      gradient: "from-blue-500 to-blue-700",
      iconBg: "bg-blue-100 dark:bg-blue-900/30"
    },
    {
      title: "Completion Rate",
      value: `${completionRate}%`,
      subtitle: "Success rate",
      icon: Trophy,
      gradient: "from-orange-500 to-orange-700",
      iconBg: "bg-orange-100 dark:bg-orange-900/30"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.title}
            className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all hover:scale-105 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.iconBg}`}>
                <Icon className={`w-6 h-6 text-transparent bg-gradient-to-br ${stat.gradient} bg-clip-text`} />
              </div>
              {stat.showPulse && (
                <div className="flex items-center gap-1">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                </div>
              )}
            </div>
            
            <div>
              <p className="text-3xl font-bold text-card-foreground mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.subtitle}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
