import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import ArrangementCard from "./ArrangementCard";
import type { VenueLocation } from "@/types/venue";

interface LocationCardProps {
  location: VenueLocation;
  onNavigateToArrangement: (arrangementId: string) => void;
}

const LocationCard = ({ location, onNavigateToArrangement }: LocationCardProps) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(location.sections.map((s) => s.id))
  );

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const totalArrangements = location.sections.reduce(
    (sum, section) => sum + section.arrangements.length,
    0
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-primary" />
            <div>
              <CardTitle className="text-lg">{location.name}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {location.sections.length} section{location.sections.length !== 1 ? "s" : ""} •{" "}
                {totalArrangements} arrangement{totalArrangements !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {location.sections.map((section) => {
          const isExpanded = expandedSections.has(section.id);
          return (
            <div key={section.id} className="border border-border rounded-lg overflow-hidden">
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-4 py-3 bg-muted/30 hover:bg-muted/50 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  )}
                  <span className="font-medium text-foreground">{section.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {section.arrangements.length}
                  </Badge>
                </div>
              </button>

              {/* Arrangements */}
              {isExpanded && section.arrangements.length > 0 && (
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {section.arrangements.map((arrangement) => (
                    <ArrangementCard
                      key={arrangement.id}
                      arrangement={arrangement}
                      onEdit={() => onNavigateToArrangement(arrangement.id)}
                    />
                  ))}
                </div>
              )}

              {/* Empty State */}
              {isExpanded && section.arrangements.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  <p className="text-sm">No arrangements in this section yet</p>
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default LocationCard;
