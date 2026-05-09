import { Calendar, Trophy, Gamepad2, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedCounter } from './AnimatedCounter';

interface HeroStatsSectionProps {
  totalEvents: number;
  upcomingThisWeek: number;
  totalGames: number;
  pointsEarned: number;
}

export const HeroStatsSection = ({
  totalEvents,
  upcomingThisWeek,
  totalGames,
  pointsEarned
}: HeroStatsSectionProps) => {
  const stats = [
    {
      label: 'Total Events',
      value: totalEvents,
      icon: Calendar,
      gradient: 'from-blue-500 to-indigo-600',
      iconBg: 'bg-blue-100 dark:bg-blue-900/30'
    },
    {
      label: 'This Week',
      value: upcomingThisWeek,
      icon: TrendingUp,
      gradient: 'from-green-500 to-emerald-600',
      iconBg: 'bg-green-100 dark:bg-green-900/30'
    },
    {
      label: 'Games Available',
      value: totalGames,
      icon: Gamepad2,
      gradient: 'from-orange-500 to-red-600',
      iconBg: 'bg-orange-100 dark:bg-orange-900/30'
    },
    {
      label: 'Points Earned',
      value: pointsEarned,
      icon: Trophy,
      gradient: 'from-purple-500 to-pink-600',
      iconBg: 'bg-purple-100 dark:bg-purple-900/30'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card
          key={stat.label}
          className="group hover:shadow-xl transition-all duration-300 border-0 bg-card hover:-translate-y-1 animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.iconBg} p-3 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className={`w-6 h-6 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`} />
              </div>
              <div className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                <AnimatedCounter value={stat.value} duration={1500} />
              </div>
            </div>
            <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
