
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Calendar, Users, MapPin, Ticket, DollarSign, Camera, BarChart, Gamepad2, MessageSquare, ArrowLeft, AlertTriangle, Megaphone } from "lucide-react";
import { cn } from "@/lib/utils";
import { ModuleDefinition, EventType, ClickHandler } from "@/types";

// Simplified module definition for this component
interface SimpleModuleDefinition {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  price: number;
  features: string[];
  mutuallyExclusive?: string[];
  eventTypes?: EventType[];
}

const modules: SimpleModuleDefinition[] = [
  {
    id: "schedules",
    name: "Schedules & Timeline",
    description: "Multi-day planning with smart notifications",
    icon: Calendar,
    price: 0,
    features: ["Multi-day event setup", "Custom notifications", "Timeline management"]
  },
  {
    id: "announcements",
    name: "Announcements & Updates",
    description: "Send real-time updates to attendees",
    icon: Megaphone,
    price: 0,
    features: ["Real-time updates", "Priority messaging", "Read receipts"]
  },
  {
    id: "rsvp",
    name: "RSVP Management",
    description: "Complete guest management system",
    icon: Users,
    price: 0,
    features: ["Guest list builder", "RSVP forms", "Group management", "Status tracking"],
    mutuallyExclusive: ["ticketing"],
    eventTypes: ["Wedding", "Cultural", "Business", "Personal", "Wellness", "Holiday", "Educational"]
  },
  {
    id: "seating",
    name: "Seating Arrangements",
    description: "Visual table planning and assignments",
    icon: MapPin,
    price: 5.99,
    features: ["Drag & drop planner", "Auto-assign seating", "Custom layouts"]
  },
  {
    id: "ticketing",
    name: "Ticketing & Check-in",
    description: "QR codes and digital access management",
    icon: Ticket,
    price: 5.99,
    features: ["Tiered ticketing", "QR check-in", "Digital badges"],
    mutuallyExclusive: ["rsvp"],
    eventTypes: ["Corporate", "Charity", "Festival", "Conference"]
  },
  {
    id: "budgeting",
    name: "Budget & Vendors",
    description: "Cost tracking and vendor connections",
    icon: DollarSign,
    price: 5.99,
    features: ["Budget tracking", "Vendor marketplace", "Expense reports"]
  },
  {
    id: "media",
    name: "Media & Albums",
    description: "Photo sharing with QR camera access",
    icon: Camera,
    price: 5.99,
    features: ["Digital albums", "QR photo sharing", "Guest camera access"]
  },
  {
    id: "analytics",
    name: "Analytics & Reporting",
    description: "Insights and performance metrics",
    icon: BarChart,
    price: 5.99,
    features: ["RSVP metrics", "Budget reports", "Engagement tracking"]
  },
  {
    id: "games",
    name: "Games & Activities",
    description: "Interactive entertainment for guests",
    icon: Gamepad2,
    price: 5.99,
    features: ["Digital guestbook", "Live polls", "Icebreaker games"]
  },
  {
    id: "survey",
    name: "Survey & Feedback",
    description: "Pre and post-event feedback collection",
    icon: MessageSquare,
    price: 5.99,
    features: ["Custom surveys", "Feedback collection", "Vendor reviews"]
  }
];

interface ModuleSelectionProps {
  selectedModules: string[];
  onModulesChange: (modules: string[]) => void;
  onBack: ClickHandler;
  onCreateEvent: () => void;
  eventType: EventType;
}

const ModuleSelection = ({ selectedModules, onModulesChange, onBack, onCreateEvent, eventType }: ModuleSelectionProps) => {
  const [currentSelection, setCurrentSelection] = useState(selectedModules);

  const toggleModule = (moduleId: string) => {
    if (moduleId === "schedules" || moduleId === "announcements") return; // Schedules and announcements always included
    
    const moduleItem = modules.find(m => m.id === moduleId);
    
    if (currentSelection.includes(moduleId)) {
      // Remove module
      setCurrentSelection(prev => prev.filter(id => id !== moduleId));
    } else {
      // Add module and handle mutual exclusivity
      let newSelection = [...currentSelection, moduleId];
      
      if (moduleItem?.mutuallyExclusive) {
        // Remove mutually exclusive modules
        newSelection = newSelection.filter(id => !moduleItem.mutuallyExclusive?.includes(id));
      }
      
      setCurrentSelection(newSelection);
    }
  };

  const getModuleRecommendation = (moduleItem: SimpleModuleDefinition): 'recommended' | 'alternative' | null => {
    if (!moduleItem.eventTypes || !eventType) return null;
    
    if (moduleItem.eventTypes.includes(eventType)) {
      return "recommended";
    }
    
    if (moduleItem.mutuallyExclusive?.some(excludedId => {
      const excludedModule = modules.find(m => m.id === excludedId);
      return excludedModule?.eventTypes?.includes(eventType);
    })) {
      return "alternative";
    }
    
    return null;
  };

  const totalCost = currentSelection.reduce((sum, moduleId) => {
    const moduleItem = modules.find(m => m.id === moduleId);
    return sum + (moduleItem?.price || 0);
  }, 0);

  const handleContinue = () => {
    onModulesChange(currentSelection);
    onCreateEvent();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 pb-4 border-b">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h3 className="font-semibold">Choose Your Modules</h3>
          <p className="text-sm text-gray-600">Schedules and Announcements are included free. Choose either RSVP or Ticketing, not both.</p>
        </div>
      </div>

      {/* RSVP vs Ticketing Notice */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
        <div className="flex items-center gap-2 text-orange-800">
          <AlertTriangle className="w-4 h-4" />
          <span className="text-sm font-medium">RSVP and Ticketing are mutually exclusive</span>
        </div>
        <p className="text-xs text-orange-600 mt-1">
          Use RSVP for invitation-based events or Ticketing for public/paid events
        </p>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {modules.map((moduleItem) => {
          const isSelected = currentSelection.includes(moduleItem.id);
          const isFree = moduleItem.price === 0;
          const isIncluded = moduleItem.id === "schedules" || moduleItem.id === "announcements";
          const Icon = moduleItem.icon;
          const recommendation = getModuleRecommendation(moduleItem);
          
          // Check if module is disabled due to mutual exclusivity
          const isDisabled = moduleItem.mutuallyExclusive?.some(excludedId => 
            currentSelection.includes(excludedId)
          );

          return (
            <div
              key={moduleItem.id}
              className={cn(
                "border rounded-lg p-4 transition-all",
                isSelected ? "border-purple-500 bg-purple-50" : "border-gray-200",
                isFree && "bg-green-50 border-green-200",
                isIncluded && "bg-blue-50 border-blue-200",
                isDisabled && !isSelected ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-gray-300",
                recommendation === "recommended" && !isSelected && "border-blue-300 bg-blue-25"
              )}
              onClick={() => !isDisabled && toggleModule(moduleItem.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className={cn(
                    "p-2 rounded-lg",
                    isSelected ? "bg-purple-500 text-white" : "bg-gray-100 text-gray-600",
                    isFree && isSelected && "bg-green-500 text-white",
                    isIncluded && "bg-blue-500 text-white"
                  )}>
                    <Icon className="w-4 h-4" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-900">{moduleItem.name}</h4>
                      {isFree && (
                        <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                          Free
                        </span>
                      )}
                      {isIncluded && (
                        <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                          Included
                        </span>
                      )}
                      {recommendation === "recommended" && (
                        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">
                          Recommended
                        </span>
                      )}
                      {isDisabled && (
                        <span className="bg-gray-400 text-white text-xs px-2 py-0.5 rounded-full">
                          Unavailable
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{moduleItem.description}</p>
                    <div className="text-xs text-gray-500">
                      {moduleItem.features.slice(0, 2).join(" • ")}
                    </div>
                    {isDisabled && !isSelected && (
                      <p className="text-xs text-red-500 mt-1">
                        Cannot select with {moduleItem.mutuallyExclusive?.map(id => 
                          modules.find(m => m.id === id)?.name
                        ).filter(Boolean).join(" or ")}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {!isFree && !isIncluded && (
                    <span className="font-semibold text-purple-600">
                      ${moduleItem.price}
                    </span>
                  )}
                  <div className={cn(
                    "w-5 h-5 rounded border-2 flex items-center justify-center",
                    isSelected ? "bg-purple-500 border-purple-500" : "border-gray-300",
                    isFree && isSelected && "bg-green-500 border-green-500",
                    isIncluded && "bg-blue-500 border-blue-500",
                    isDisabled && !isSelected && "border-gray-200"
                  )}>
                    {(isSelected || isIncluded) && <Check className="w-3 h-3 text-white" />}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
        <div className="flex justify-between items-center">
          <span className="font-medium">Selected Modules: {currentSelection.length}</span>
          <span className="font-bold text-lg">
            {totalCost > 0 ? `$${totalCost.toFixed(2)}` : 'Free'}
          </span>
        </div>
        
        <Button 
          onClick={handleContinue}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg py-3"
        >
          Create Event {totalCost > 0 && `($${totalCost.toFixed(2)})`}
        </Button>
      </div>
    </div>
  );
};

export default ModuleSelection;
