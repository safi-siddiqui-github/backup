"use client";

import { Button } from "@/components/ui/button";
import {
  getModuleById,
  ModuleDefinition,
  ModuleDefinitionId,
  MutuallyExclusiveType,
} from "@/config/moduleRegistry";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  ArrowLeft,
  BarChart,
  Calendar,
  Camera,
  Check,
  DollarSign,
  Gamepad2,
  MapPin,
  Megaphone,
  MessageSquare,
  Ticket,
  Users,
} from "lucide-react";
import { ElementType, useState } from "react";

// Local registry used for this component
const modules: ModuleDefinition[] = [
  {
    id: "schedule",
    name: "Schedules & Timeline",
    description: "Multi-day planning with smart notifications",
    icon: Calendar,
    price: 0,
    features: [
      "Multi-day event setup",
      "Custom notifications",
      "Timeline management",
    ],
  },
  {
    id: "announcements",
    name: "Announcements & Updates",
    description: "Send real-time updates to attendees",
    icon: Megaphone,
    price: 0,
    features: ["Real-time updates", "Priority messaging", "Read receipts"],
  },
  {
    id: "rsvp",
    name: "RSVP Management",
    description: "Complete guest management system",
    icon: Users,
    price: 0,
    features: [
      "Guest list builder",
      "RSVP forms",
      "Group management",
      "Status tracking",
    ],
    mutuallyExclusive: ["ticketing"],
    eventTypes: [
      "Wedding",
      "Cultural",
      "Business",
      "Personal",
      "Wellness",
      "Holiday",
      "Educational",
    ],
  },
  {
    id: "seating",
    name: "Seating Arrangements",
    description: "Visual table planning and assignments",
    icon: MapPin,
    price: 5.99,
    features: ["Drag & drop planner", "Auto-assign seating", "Custom layouts"],
  },
  {
    id: "ticketing",
    name: "Ticketing & Check-in",
    description: "QR codes and digital access management",
    icon: Ticket,
    price: 5.99,
    features: ["Tiered ticketing", "QR check-in", "Digital badges"],
    mutuallyExclusive: ["rsvp"],
    eventTypes: ["Corporate", "Charity", "Festival", "Conference"],
  },
  {
    id: "budget",
    name: "Budget & Vendors",
    description: "Cost tracking and vendor connections",
    icon: DollarSign,
    price: 5.99,
    features: ["Budget tracking", "Vendor marketplace", "Expense reports"],
  },
  {
    id: "media",
    name: "Media & Albums",
    description: "Photo sharing with QR camera access",
    icon: Camera,
    price: 5.99,
    features: ["Digital albums", "QR photo sharing", "Guest camera access"],
  },
  {
    id: "analytics",
    name: "Analytics & Reporting",
    description: "Insights and performance metrics",
    icon: BarChart,
    price: 5.99,
    features: ["RSVP metrics", "Budget reports", "Engagement tracking"],
  },
  {
    id: "games",
    name: "Games & Activities",
    description: "Interactive entertainment for guests",
    icon: Gamepad2,
    price: 5.99,
    features: ["Digital guestbook", "Live polls", "Icebreaker games"],
  },
  {
    id: "survey",
    name: "Survey & Feedback",
    description: "Pre and post-event feedback collection",
    icon: MessageSquare,
    price: 5.99,
    features: ["Custom surveys", "Feedback collection", "Vendor reviews"],
  },
];

const ModuleSelection = ({
  selectedModules,
  onModulesChange,
  onBack,
  onCreateEvent,
  eventType,
}: {
  selectedModules: ModuleDefinition[];
  onBack: () => void;
  onCreateEvent: () => void;
  onModulesChange: (modules: ModuleDefinition[]) => void;
  eventType?: string;
}) => {
  // full objects, not just ids
  const [currentSelection, setCurrentSelection] = useState<ModuleDefinition[]>(
    selectedModules ?? [],
  );

  // Toggle logic
  const toggleModule = (moduleId: ModuleDefinitionId) => {
    if (moduleId === "schedule" || moduleId === "announcements") return;

    const moduleData =
      getModuleById(moduleId) ?? modules.find((m) => m.id === moduleId);
    if (!moduleData) return;

    const exists = currentSelection.some((m) => m.id === moduleId);

    if (exists) {
      setCurrentSelection((prev) => prev.filter((m) => m.id !== moduleId));
    } else {
      let newSelection = [...currentSelection, moduleData];

      // if (moduleData.mutuallyExclusive) {
      //   newSelection = newSelection.filter(
      //     (m) => !moduleData.mutuallyExclusive?.includes(m.id!),
      //   );
      // }

      if (moduleData.mutuallyExclusive) {
        newSelection = newSelection.filter(
          (m) =>
            !moduleData.mutuallyExclusive?.includes(
              m.id as MutuallyExclusiveType,
            ),
        );
      }

      setCurrentSelection(newSelection);
    }
  };

  const getModuleRecommendation = (module: ModuleDefinition) => {
    if (!module.eventTypes || !eventType) return null;

    if (module.eventTypes.includes(eventType)) {
      return "recommended";
    }

    if (
      module.mutuallyExclusive?.some((excludedId) => {
        const excludedModule = modules.find((m) => m.id === excludedId);
        return excludedModule?.eventTypes?.includes(eventType);
      })
    ) {
      return "alternative";
    }

    return null;
  };

  const totalCost = currentSelection.reduce(
    (sum, module) => sum + (module.price || 0),
    0,
  );

  const handleContinue = () => {
    onModulesChange(currentSelection);
    onCreateEvent();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 border-b pb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="p-2"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h3 className="font-semibold">Choose Your Modules</h3>
          <p className="text-sm text-gray-600">
            Schedules and Announcements are included free. Choose either RSVP or
            Ticketing, not both.
          </p>
        </div>
      </div>

      {/* RSVP vs Ticketing Notice */}
      <div className="rounded-lg border border-orange-200 bg-orange-50 p-3">
        <div className="flex items-center gap-2 text-orange-800">
          <AlertTriangle className="h-4 w-4" />
          <span className="text-sm font-medium">
            RSVP and Ticketing are mutually exclusive
          </span>
        </div>
        <p className="mt-1 text-xs text-orange-600">
          Use RSVP for invitation-based events or Ticketing for public/paid
          events
        </p>
      </div>

      <div className="max-h-96 space-y-3 overflow-y-auto">
        {modules.map((module) => {
          const isSelected = currentSelection.some((m) => m.id === module.id);
          const isFree = module.price === 0;
          const isIncluded =
            module.id === "schedule" || module.id === "announcements";
          const Icon = module.icon as ElementType;
          const recommendation = getModuleRecommendation(module);

          const isDisabled = module.mutuallyExclusive?.some((excludedId) =>
            currentSelection.some((m) => m.id === excludedId),
          );

          return (
            <div
              key={module.id}
              className={cn(
                "rounded-lg border p-4 transition-all",
                isSelected
                  ? "border-purple-500 bg-purple-50"
                  : "border-gray-200",
                isFree && "border-green-200 bg-green-50",
                isIncluded && "border-blue-200 bg-blue-50",
                isDisabled && !isSelected
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer hover:border-gray-300",
                recommendation === "recommended" &&
                  !isSelected &&
                  "bg-blue-25 border-blue-300",
              )}
              onClick={() => !isDisabled && toggleModule(module.id!)}
            >
              <div className="flex items-start justify-between">
                <div className="flex flex-1 items-start gap-3">
                  <div
                    className={cn(
                      "rounded-lg p-2",
                      isSelected
                        ? "bg-purple-500 text-white"
                        : "bg-gray-100 text-gray-600",
                      isFree && isSelected && "bg-green-500 text-white",
                      isIncluded && "bg-blue-500 text-white",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>

                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <h4 className="font-medium text-gray-900">
                        {module.name}
                      </h4>
                      {isFree && (
                        <span className="rounded-full bg-green-500 px-2 py-0.5 text-xs text-white">
                          Free
                        </span>
                      )}
                      {isIncluded && (
                        <span className="rounded-full bg-blue-500 px-2 py-0.5 text-xs text-white">
                          Included
                        </span>
                      )}
                      {recommendation === "recommended" && (
                        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
                          Recommended
                        </span>
                      )}
                      {isDisabled && (
                        <span className="rounded-full bg-gray-400 px-2 py-0.5 text-xs text-white">
                          Unavailable
                        </span>
                      )}
                    </div>
                    <p className="mb-2 text-sm text-gray-600">
                      {module.description}
                    </p>
                    <div className="text-xs text-gray-500">
                      {module?.features?.slice(0, 2).join(" • ")}
                    </div>
                    {isDisabled && !isSelected && (
                      <p className="mt-1 text-xs text-red-500">
                        Cannot select with{" "}
                        {module?.mutuallyExclusive
                          ?.map((id) => modules.find((m) => m.id === id)?.name)
                          ?.join(" or ")}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {!isFree && !isIncluded && (
                    <span className="font-semibold text-purple-600">
                      ${module.price}
                    </span>
                  )}
                  <div
                    className={cn(
                      "flex h-5 w-5 items-center justify-center rounded border-2",
                      isSelected
                        ? "border-purple-500 bg-purple-500"
                        : "border-gray-300",
                      isFree && isSelected && "border-green-500 bg-green-500",
                      isIncluded && "border-blue-500 bg-blue-500",
                      isDisabled && !isSelected && "border-gray-200",
                    )}
                  >
                    {(isSelected || isIncluded) && (
                      <Check className="h-3 w-3 text-white" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="space-y-3 rounded-lg bg-gray-50 p-4">
        <div className="flex items-center justify-between">
          <span className="font-medium">
            Selected Modules: {currentSelection.length}
          </span>
          <span className="text-lg font-bold">
            {totalCost > 0 ? `$${totalCost.toFixed(2)}` : "Free"}
          </span>
        </div>

        <Button
          onClick={handleContinue}
          className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 py-3 text-white hover:from-purple-700 hover:to-blue-700"
        >
          Create Event {totalCost > 0 && `($${totalCost.toFixed(2)})`}
        </Button>
      </div>
    </div>
  );
};

export default ModuleSelection;
