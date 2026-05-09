import { Calendar, Clock } from "lucide-react";
import { format } from "date-fns";

interface TimelineDaySelectorProps {
  eventDates: Date[];
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  getItemsForDate: (date: Date) => any[];
  getDayStats: (date: Date) => { totalItems: number; totalDuration: number };
}

const TimelineDaySelector = ({
  eventDates,
  selectedDate,
  onSelectDate,
  getItemsForDate,
  getDayStats,
}: TimelineDaySelectorProps) => {
  const colorSchemes = [
    {
      gradient: "from-purple-500 to-blue-500",
      bgClass: "bg-purple-500/10 dark:bg-purple-500/20",
      borderClass: "border-purple-500/30",
    },
    {
      gradient: "from-orange-500 to-red-500",
      bgClass: "bg-orange-500/10 dark:bg-orange-500/20",
      borderClass: "border-orange-500/30",
    },
    {
      gradient: "from-green-500 to-teal-500",
      bgClass: "bg-green-500/10 dark:bg-green-500/20",
      borderClass: "border-green-500/30",
    },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Calendar className="w-5 h-5" />
        Event Timeline
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {eventDates.map((date, index) => {
          const stats = getDayStats(date);
          const isSelected = format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");
          const progress = stats.totalItems > 0 ? Math.min((stats.totalDuration / 480) * 100, 100) : 0;
          const colorScheme = colorSchemes[index % colorSchemes.length];

          return (
            <button
              key={index}
              onClick={() => onSelectDate(date)}
              className={`group relative p-2.5 rounded-xl border-2 transition-all duration-300 text-left hover:scale-105 animate-fade-in ${
                isSelected
                  ? `${colorScheme.borderClass} shadow-lg ${colorScheme.bgClass}`
                  : `${colorScheme.borderClass} hover:shadow-md ${colorScheme.bgClass}`
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Day Number Circle */}
              <div className="flex items-start justify-between mb-1.5">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                    isSelected
                      ? `bg-gradient-to-br ${colorScheme.gradient} text-white shadow-md`
                      : "bg-muted text-muted-foreground group-hover:bg-primary/10"
                  }`}
                >
                  {index + 1}
                </div>
                {stats.totalItems > 0 && (
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {stats.totalItems}
                  </span>
                )}
              </div>

              {/* Date Info */}
              <div className="mb-1.5">
                <p className="font-semibold text-sm mb-0.5">{format(date, "EEEE")}</p>
                <p className="text-xs text-muted-foreground">{format(date, "MMM dd, yyyy")}</p>
              </div>

              {/* Progress Bar */}
              <div className="mb-1">
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      isSelected
                        ? `bg-gradient-to-r ${colorScheme.gradient}`
                        : "bg-gradient-to-r from-muted-foreground/50 to-muted-foreground/30"
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {stats.totalItems} items
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {Math.floor(stats.totalDuration / 60)}h {stats.totalDuration % 60}m
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TimelineDaySelector;
