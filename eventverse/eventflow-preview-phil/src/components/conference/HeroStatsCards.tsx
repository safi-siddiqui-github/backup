import { Calendar, Clock, Users } from "lucide-react";

interface HeroStatsCardsProps {
  conferenceDays: number;
  totalSessions: number;
  totalRegistrations: number;
}

const HeroStatsCards = ({ conferenceDays, totalSessions, totalRegistrations }: HeroStatsCardsProps) => {
  const stats = [
    {
      icon: Calendar,
      label: "Conference Days",
      value: conferenceDays,
      bgClass: "bg-purple-500/10 dark:bg-purple-500/20",
      borderClass: "border-purple-500/20",
      iconClass: "text-purple-600 dark:text-purple-400"
    },
    {
      icon: Clock,
      label: "Total Sessions",
      value: totalSessions,
      bgClass: "bg-blue-500/10 dark:bg-blue-500/20",
      borderClass: "border-blue-500/20",
      iconClass: "text-blue-600 dark:text-blue-400"
    },
    {
      icon: Users,
      label: "Total Registrations",
      value: totalRegistrations,
      bgClass: "bg-green-500/10 dark:bg-green-500/20",
      borderClass: "border-green-500/20",
      iconClass: "text-green-600 dark:text-green-400"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className={`${stat.bgClass} ${stat.borderClass} border rounded-xl p-6 animate-fade-in transition-all hover:scale-105`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg ${stat.bgClass}`}>
              <stat.icon className={`w-6 h-6 ${stat.iconClass}`} />
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroStatsCards;
