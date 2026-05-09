import { Calendar, MapPin } from "lucide-react";
import { format } from "date-fns";

interface ConferenceHeroProps {
  eventName: string;
  startDate: Date;
  endDate: Date;
  location: string;
  eventDays: number;
}

const ConferenceHero = ({ eventName, startDate, endDate, location, eventDays }: ConferenceHeroProps) => {
  return (
    <div className="relative bg-card border-border border rounded-xl p-8 overflow-hidden">
      {/* Gradient background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />
      
      <div className="relative z-10">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          {eventName}
        </h2>
        
        <div className="flex flex-col md:flex-row md:items-center gap-4 text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            <span className="font-medium">
              {format(startDate, 'MMMM d')}
              {eventDays > 1 && ` - ${format(endDate, 'MMMM d, yyyy')}`}
              {eventDays === 1 && `, ${format(startDate, 'yyyy')}`}
            </span>
          </div>
          
          <div className="hidden md:block w-1 h-1 rounded-full bg-muted-foreground/30" />
          
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            <span className="font-medium">{location}</span>
          </div>
          
          <div className="hidden md:block w-1 h-1 rounded-full bg-muted-foreground/30" />
          
          <span className="font-medium">
            {eventDays === 1 ? 'Single Day Event' : `${eventDays}-Day Conference`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ConferenceHero;
