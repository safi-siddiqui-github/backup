import { MapPin, Briefcase, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface JobCardProps {
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
}

export const JobCard = ({ title, department, location, type, description }: JobCardProps) => {
  return (
    <Card className="border-border hover:shadow-lg transition-all duration-300 hover:border-primary/50">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
            <Badge variant="secondary" className="mb-2">{department}</Badge>
          </div>
        </div>
        
        <p className="text-muted-foreground mb-4 line-clamp-2">{description}</p>
        
        <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Briefcase className="w-4 h-4" />
            <span>{type}</span>
          </div>
        </div>
        
        <Button className="w-full">Apply Now</Button>
      </CardContent>
    </Card>
  );
};
