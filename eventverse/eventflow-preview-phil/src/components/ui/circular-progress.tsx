import { cn } from "@/lib/utils";

interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  showValue?: boolean;
  color?: string;
}

export const CircularProgress = ({
  value,
  size = 120,
  strokeWidth = 8,
  className,
  showValue = true,
  color
}: CircularProgressProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  // Color based on value
  const getColor = () => {
    if (color) return color;
    if (value < 50) return "hsl(var(--destructive))";
    if (value < 80) return "hsl(var(--warning))";
    return "hsl(var(--success))";
  };

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor()}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      {showValue && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-foreground">{Math.round(value)}%</span>
          <span className="text-xs text-muted-foreground mt-1">Ready</span>
        </div>
      )}
    </div>
  );
};
