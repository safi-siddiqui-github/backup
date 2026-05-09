import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, CheckCircle, Circle, Zap, Star, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import { EventFormData } from "../EnhancedEventCreationDialog";
import SmartModuleRecommendations from "../ai/SmartModuleRecommendations";
import DynamicPricingDisplay from "../ai/DynamicPricingDisplay";
import ModuleCard from "./ModuleCard";

interface Module {
  id: string;
  name: string;
  description: string;
  icon: string;
  features: string[];
  price: number;
  recommended?: boolean;
  popular?: boolean;
  premium?: boolean;
}

interface ModuleCategory {
  title: string;
  description: string;
  icon: typeof CheckCircle;
  modules: Module[];
}

const moduleCategories: Record<string, ModuleCategory> = {
  essential: {
    title: "Essential Modules",
    description: "Core functionality every event needs",
    icon: CheckCircle,
    modules: [
      {
        id: "schedules",
        name: "Event Schedule",
        description: "Timeline and agenda management",
        icon: "📅",
        features: ["Custom timeline", "Session management", "Speaker profiles"],
        price: 0,
        recommended: true
      },
      {
        id: "announcements",
        name: "Announcements",
        description: "Keep guests informed with updates",
        icon: "📢",
        features: ["Real-time updates", "Push notifications", "Priority messaging"],
        price: 0,
        recommended: true
      },
      {
        id: "rsvp",
        name: "RSVP Management",
        description: "Guest responses and attendance tracking",
        icon: "✅",
        features: ["Response tracking", "Dietary preferences", "Plus-one management"],
        price: 0,
        recommended: true
      }
    ]
  },
  engagement: {
    title: "Guest Engagement",
    description: "Interactive features to enhance experience",
    icon: Zap,
    modules: [
      {
        id: "games",
        name: "Interactive Games",
        description: "Fun activities and competitions",
        icon: "🎮",
        features: ["Trivia games", "Photo contests", "Leaderboards"],
        price: 15,
        popular: true
      },
      {
        id: "survey",
        name: "Surveys & Feedback",
        description: "Collect guest opinions and feedback",
        icon: "📝",
        features: ["Custom surveys", "Real-time results", "Analytics"],
        price: 10
      },
      {
        id: "media",
        name: "Photo & Media Sharing",
        description: "Collaborative photo galleries",
        icon: "📸",
        features: ["Shared albums", "Live photo feed", "QR code sharing"],
        price: 20
      }
    ]
  },
  business: {
    title: "Business Features",
    description: "Professional event management tools",
    icon: Star,
    modules: [
      {
        id: "ticketing",
        name: "Ticketing System",
        description: "Sell tickets and manage registrations",
        icon: "🎫",
        features: ["Multiple ticket types", "Payment processing", "Promo codes"],
        price: 25,
        premium: true
      },
      {
        id: "seating",
        name: "Seating Management",
        description: "Table assignments and floor plans",
        icon: "🪑",
        features: ["Visual seating charts", "Auto-assignment", "Guest preferences"],
        price: 30
      },
      {
        id: "budgeting",
        name: "Budget Planner",
        description: "Track expenses and manage costs",
        icon: "💰",
        features: ["Expense tracking", "Vendor management", "Budget analytics"],
        price: 20
      }
    ]
  },
  analytics: {
    title: "Analytics & Insights",
    description: "Data-driven event optimization",
    icon: Crown,
    modules: [
      {
        id: "analytics",
        name: "Event Analytics",
        description: "Detailed insights and reporting",
        icon: "📊",
        features: ["Attendance tracking", "Engagement metrics", "Custom reports"],
        price: 35,
        premium: true
      }
    ]
  }
};

interface Props {
  formData: EventFormData;
  onUpdate: (updates: Partial<EventFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const ModuleSelectionStep = ({ formData, onUpdate, onNext, onBack }: Props) => {
  const toggleModule = (moduleId: string) => {
    const isSelected = formData.selectedModules.includes(moduleId);
    const newModules = isSelected
      ? formData.selectedModules.filter(id => id !== moduleId)
      : [...formData.selectedModules, moduleId];
    
    onUpdate({ selectedModules: newModules });
  };

  const getRecommendedModules = () => {
    const eventTypeModules: Record<string, string[]> = {
      Wedding: ["schedules", "rsvp", "media", "seating"],
      Corporate: ["schedules", "announcements", "analytics", "survey"],
      Birthday: ["rsvp", "media", "games"],
      Cultural: ["schedules", "media", "survey"],
      Charity: ["ticketing", "analytics", "budgeting"],
      Festival: ["ticketing", "schedules", "media", "analytics"],
      Business: ["rsvp", "survey", "analytics"],
      Personal: ["rsvp", "media", "games"],
      Workshop: ["schedules", "survey", "analytics"],
      Conference: ["schedules", "ticketing", "analytics", "survey"]
    };
    
    return eventTypeModules[formData.eventType] || ["schedules", "rsvp", "announcements"];
  };

  const applyRecommendations = () => {
    const recommended = getRecommendedModules();
    onUpdate({ selectedModules: recommended });
  };

  const calculateTotalCost = () => {
    let total = 0;
    Object.values(moduleCategories).forEach(category => {
      category.modules.forEach(module => {
        if (formData.selectedModules.includes(module.id)) {
          total += module.price;
        }
      });
    });
    return total;
  };

  const getSelectedCount = () => formData.selectedModules.length;

  const getAllModules = (): Module[] => {
    return Object.values(moduleCategories).flatMap(cat => cat.modules);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Choose Your Event Features</h2>
          <p className="text-gray-600 mt-1">Select modules to customize your event experience</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-purple-600">${calculateTotalCost()}/month</div>
          <div className="text-sm text-gray-500">{getSelectedCount()} modules selected</div>
        </div>
      </div>


      {/* Dynamic Pricing Display */}
      <DynamicPricingDisplay
        selectedModules={formData.selectedModules}
        eventType={formData.eventType}
        expectedAttendees={formData.expectedAttendees}
      />

      {/* Module Categories */}
      <div className="space-y-8">
        {Object.entries(moduleCategories).map(([categoryKey, category]) => {
          const CategoryIcon = category.icon;
          return (
            <div key={categoryKey} className="space-y-4">
              <div className="flex items-center gap-3">
                <CategoryIcon className="w-6 h-6 text-purple-600" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{category.title}</h3>
                  <p className="text-gray-600">{category.description}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.modules.map(module => {
                  const isSelected = formData.selectedModules.includes(module.id);
                  const isRecommended = getRecommendedModules().includes(module.id);
                  
                  return (
                    <ModuleCard
                      key={module.id}
                      module={module}
                      isSelected={isSelected}
                      isRecommended={isRecommended}
                      onToggle={() => toggleModule(module.id)}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6 border-t">
        <Button variant="outline" onClick={onBack} className="px-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Basics
        </Button>
        
        <Button 
          onClick={onNext}
          disabled={formData.selectedModules.length === 0}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8"
        >
          Next: Configuration
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default ModuleSelectionStep;
