import { useState, useEffect } from "react";

interface CountdownTimerProps {
  title?: string;
  description?: string;
  targetDate?: string;
  style?: React.CSSProperties;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer = ({ 
  title = "Event Countdown", 
  description = "Don't miss out on this amazing event",
  targetDate,
  style 
}: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      let currentTargetDate = targetDate;
      if (!currentTargetDate) {
        // Default to 30 days from now if no target date
        const defaultTarget = new Date();
        defaultTarget.setDate(defaultTarget.getDate() + 30);
        currentTargetDate = defaultTarget.toISOString();
      }

      const difference = +new Date(currentTargetDate) - +new Date();
      
      if (difference > 0) {
        const timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
        setTimeLeft(timeLeft);
        setIsExpired(false);
      } else {
        setIsExpired(true);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  if (isExpired) {
    return (
      <section style={style} className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-lg text-muted-foreground mb-8">{description}</p>
          <div className="text-2xl font-bold text-primary">
            The event has started! 🎉
          </div>
        </div>
      </section>
    );
  }

  return (
    <section style={style} className="py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        {description && (
          <p className="text-lg text-muted-foreground mb-8">{description}</p>
        )}
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds }
          ].map((unit) => (
            <div key={unit.label} className="bg-card border rounded-lg p-6 shadow-sm">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-primary">
                {formatNumber(unit.value)}
              </div>
              <div className="text-sm uppercase tracking-wider text-muted-foreground font-medium">
                {unit.label}
              </div>
            </div>
          ))}
        </div>
        
        {targetDate && (
          <p className="text-sm text-muted-foreground mt-6">
            Event starts on {new Date(targetDate).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        )}
      </div>
    </section>
  );
};