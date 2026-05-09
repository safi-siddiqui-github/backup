import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, ArrowLeft, ArrowRight, Save, Sparkles, Zap, Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";
import EventBasicsStep from "./event-creation/EventBasicsStep";
import ModuleSelectionStep from "./event-creation/ModuleSelectionStep";
import EventPhotosStep from "./event-creation/EventPhotosStep";
import EventConfigurationStep from "./event-creation/EventConfigurationStep";
import LaunchMonitoringStep from "./event-creation/LaunchMonitoringStep";
import QuickCreateStep from "./event-creation/QuickCreateStep";
import EventCreationModeSelector from "./event-creation/EventCreationModeSelector";

export interface EventSession {
  id: string;
  date: Date;
  title?: string;
  startTime: string;
  endTime: string;
  locationId?: string;
  description?: string;
}

export interface EventLocationSection {
  id: string;
  name: string;
  description?: string;
  capacity?: number;
}

export interface EventLocation {
  id: string;
  name: string;
  address: string;
  type: 'physical' | 'virtual' | 'hybrid';
  capacity?: number;
  features?: string[];
  virtualLink?: string;
  source?: 'marketplace' | 'manual';
  vendorName?: string;
  sections?: EventLocationSection[];
}

export interface EventRecurrence {
  isRecurring: boolean;
  pattern: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom';
  frequency: number;
  endType: 'never' | 'after' | 'until';
  endValue?: number | Date;
  exceptions?: Date[];
  customDays?: number[]; // For weekly: 0=Sunday, 1=Monday, etc.
}

export interface EventFormData {
  // Basic Details
  isPublic: boolean;
  eventName: string;
  eventType: string;
  description: string;
  
  // Vendor booth settings
  vendorBoothSettings?: import('@/types/venue').VendorBoothSettings;
  descriptionBlocks?: Array<{
    id: string;
    type: "text" | "image" | "video";
    content: string;
    order: number;
  }>;
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor?: string;
    logo?: string;
    template?: string;
    effects?: string[];
    mood?: string;
    generatedName?: string;
  };
  
  // Enhanced Date & Time Management
  eventDates: {
    isMultiDay: boolean;
    startDate: Date | null;
    endDate: Date | null;
    startTime?: string;
    endTime?: string;
    timezone: string;
    sessions: EventSession[];
  };
  
  // Backward compatibility properties
  startDate?: Date | null;
  endDate?: Date | null;
  time?: string;
  timezone?: string;
  isRecurring?: boolean;
  
  // Multi-location Support
  locations: EventLocation[];
  
  // Recurring Events
  recurrence: EventRecurrence;
  
  // Modules & Features
  selectedModules: string[];
  moduleConfigurations: Record<string, any>;
  
  // Guest Management (moved to RSVP module)
  expectedAttendees: number;
  maxAttendees?: number;
  guestGroups: Array<{ name: string; members: string[] }>;
  vipGuests: string[];
  
  // Tickets & Pricing
  ticketTypes: Array<{
    name: string;
    price: number;
    quantity: number;
    description?: string;
  }>;
  
  // Additional Features
  mealOptions: string[];
  additionalFeatures: string[];
  dressCode: string;
  giftRegistryUrl: string;
  transportationDetails: string;
  accommodationDetails: string;
  specialRequirements: string;
  
  // Invitation Settings
  invitationSettings: {
    method: string[];
    template: string;
    customMessage: string;
    sendTime: 'now' | 'scheduled';
    scheduledTime?: Date;
  };
  
  // Event Photos
  eventPhotos: {
    mainPhoto: string | null;
    additionalPhotos: Array<{
      id: string;
      url: string;
      file?: File;
      title?: string;
      description?: string;
      isUploaded: boolean;
    }>;
    maxPhotos: number;
  };

  // Launch Settings
  status: 'draft' | 'published';
  softLaunch: boolean;
  analytics: boolean;

  // Additional Details (Optional expandable fields)
  additionalDetails: {
    ageRestrictions: {
      hasRestrictions: boolean;
      minAge?: number;
      maxAge?: number;
      requiresGuardian?: boolean;
      customMessage?: string;
      restrictionType?: 'minimum' | 'maximum' | 'range' | 'exact';
    };
    checkIn: {
      hasCustomCheckIn: boolean;
      checkInTime?: string;
      bufferTime?: number;
      checkInInstructions?: string;
      earlyCheckIn?: boolean;
      lateCheckIn?: boolean;
    };
    parking: {
      hasParkingInfo: boolean;
      parkingType?: 'free' | 'paid' | 'valet' | 'street' | 'garage' | 'lot';
      parkingCost?: number;
      parkingDetails?: string;
      parkingMapUrl?: string;
      validationAvailable?: boolean;
      reservationRequired?: boolean;
      alternativeOptions?: string;
    };
    faqs: Array<{
      id: string;
      question: string;
      answer: string;
      category?: string;
    }>;
    specialGuests: Array<{
      id: string;
      name: string;
      title: string;
      bio: string;
      photo?: string;
      credentials: string[];
      socialLinks: {
        linkedin?: string;
        twitter?: string;
        website?: string;
      };
      isImported: boolean;
      importSource?: 'linkedin' | 'twitter' | 'manual';
    }>;
  };
}

const steps = [
  { 
    id: 1, 
    title: "Event Basics", 
    icon: Circle,
    description: "What, when, and where"
  },
  { 
    id: 2, 
    title: "Features", 
    icon: Circle,
    description: "Choose functionality"
  },
  { 
    id: 3, 
    title: "Event Photos", 
    icon: Circle,
    description: "Add photos to your event"
  },
  { 
    id: 4, 
    title: "Configuration", 
    icon: Circle,
    description: "Fine-tune settings"
  },
  { 
    id: 5, 
    title: "Launch", 
    icon: Circle,
    description: "Review and publish"
  }
];

interface Props {
  open: boolean;
  onClose: () => void;
  onEventCreated: (eventData: any) => void;
  editingEvent?: any;
}

const EnhancedEventCreationDialog = ({ open, onClose, onEventCreated, editingEvent }: Props) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isQuickCreate, setIsQuickCreate] = useState(false);
  const [showModeSelector, setShowModeSelector] = useState(!editingEvent);
  const [formData, setFormData] = useState<EventFormData>(() => {
    if (editingEvent) {
      return {
        isPublic: editingEvent.isPublic ?? true,
        eventName: editingEvent.eventName || editingEvent.name || "",
        eventType: editingEvent.eventType || "",
        description: editingEvent.description || "",
        theme: {
          primaryColor: editingEvent.theme?.primaryColor || "#8B5CF6",
          secondaryColor: editingEvent.theme?.secondaryColor || "#3B82F6",
          accentColor: editingEvent.theme?.accentColor || "#FF6347",
          logo: editingEvent.theme?.logo || "",
          template: editingEvent.theme?.template || "",
          effects: editingEvent.theme?.effects || [],
          mood: editingEvent.theme?.mood || "",
          generatedName: editingEvent.theme?.generatedName || ""
        },
        eventDates: {
          isMultiDay: editingEvent.eventDates?.isMultiDay || false,
          startDate: editingEvent.startDate || editingEvent.eventDates?.startDate || null,
          endDate: editingEvent.endDate || editingEvent.eventDates?.endDate || null,
          startTime: editingEvent.time || editingEvent.eventDates?.startTime || "",
          endTime: editingEvent.eventDates?.endTime || "",
          timezone: editingEvent.timezone || editingEvent.eventDates?.timezone || "UTC",
          sessions: editingEvent.eventDates?.sessions || []
        },
        // Backward compatibility
        startDate: editingEvent.startDate || null,
        endDate: editingEvent.endDate || null,
        time: editingEvent.time || "",
        timezone: editingEvent.timezone || "UTC",
        isRecurring: editingEvent.isRecurring || false,
        locations: editingEvent.locations || [{
          id: "1",
          name: editingEvent.location || "",
          address: editingEvent.location || "",
          type: "physical",
          source: "manual",
          sections: []
        }],
        recurrence: editingEvent.recurrence || {
          isRecurring: false,
          pattern: "weekly",
          frequency: 1,
          endType: "never"
        },
        selectedModules: editingEvent.selectedModules || ["schedules", "announcements", "rsvp"],
        moduleConfigurations: editingEvent.moduleConfigurations || {},
        expectedAttendees: editingEvent.attendees || editingEvent.expectedAttendees || 50,
        guestGroups: editingEvent.guestGroups || [],
        vipGuests: editingEvent.vipGuests || [],
        ticketTypes: editingEvent.ticketTypes || [],
        mealOptions: editingEvent.mealOptions || [],
        additionalFeatures: editingEvent.additionalFeatures || [],
        dressCode: editingEvent.dressCode || "",
        giftRegistryUrl: editingEvent.giftRegistryUrl || "",
        transportationDetails: editingEvent.transportationDetails || "",
        accommodationDetails: editingEvent.accommodationDetails || "",
        specialRequirements: editingEvent.specialRequirements || "",
        invitationSettings: editingEvent.invitationSettings || {
          method: ["email"],
          template: "elegant",
          customMessage: "",
          sendTime: "now"
        },
        eventPhotos: editingEvent.eventPhotos || {
          mainPhoto: null,
          additionalPhotos: [],
          maxPhotos: 10
        },
        status: editingEvent.status || "draft",
        softLaunch: editingEvent.softLaunch || false,
        analytics: editingEvent.analytics !== false,
        additionalDetails: editingEvent.additionalDetails || {
          ageRestrictions: { hasRestrictions: false },
          checkIn: { hasCustomCheckIn: false },
          parking: { hasParkingInfo: false },
          faqs: [],
          specialGuests: []
        }
      };
    }
    
    return {
      isPublic: true,
      eventName: "",
      eventType: "",
      description: "",
      theme: {
        primaryColor: "#8B5CF6",
        secondaryColor: "#3B82F6",
        accentColor: "#FF6347",
        logo: "",
        template: "",
        effects: [],
        mood: "",
        generatedName: ""
      },
      eventDates: {
        isMultiDay: false,
        startDate: null,
        endDate: null,
        startTime: "",
        endTime: "",
        timezone: "UTC",
        sessions: []
      },
      // Backward compatibility
      startDate: null,
      endDate: null,
      time: "",
      timezone: "UTC",
      isRecurring: false,
      locations: [{
        id: "1",
        name: "",
        address: "",
        type: "physical",
        source: "manual",
        sections: []
      }],
      recurrence: {
        isRecurring: false,
        pattern: "weekly",
        frequency: 1,
        endType: "never"
      },
      selectedModules: ["schedules", "announcements", "rsvp"],
      moduleConfigurations: {},
      expectedAttendees: 50,
      guestGroups: [],
      vipGuests: [],
      ticketTypes: [],
      mealOptions: [],
      additionalFeatures: [],
      dressCode: "",
      giftRegistryUrl: "",
      transportationDetails: "",
      accommodationDetails: "",
      specialRequirements: "",
      invitationSettings: {
        method: ["email"],
        template: "elegant",
        customMessage: "",
        sendTime: "now"
      },
      eventPhotos: {
        mainPhoto: null,
        additionalPhotos: [],
        maxPhotos: 10
      },
      status: "draft",
      softLaunch: false,
      analytics: true,
      additionalDetails: {
        ageRestrictions: { hasRestrictions: false },
        checkIn: { hasCustomCheckIn: false },
        parking: { hasParkingInfo: false },
        faqs: [],
        specialGuests: []
      }
    };
  });

  const handleStepComplete = (stepNumber: number) => {
    if (!completedSteps.includes(stepNumber)) {
      setCompletedSteps([...completedSteps, stepNumber]);
    }
  };

  const handleStepNavigation = (stepNumber: number) => {
    if (stepNumber <= Math.max(...completedSteps, currentStep)) {
      setCurrentStep(stepNumber);
    }
  };

  const handleNext = () => {
    handleStepComplete(currentStep);
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleUpdateFormData = (updates: Partial<EventFormData>) => {
    setFormData(prev => {
      const newData = { ...prev, ...updates };
      
      // Sync backward compatibility fields
      if (updates.eventDates) {
        newData.startDate = updates.eventDates.startDate;
        newData.endDate = updates.eventDates.endDate;
        newData.timezone = updates.eventDates.timezone;
        // Combine date and time for backward compatibility
        if (updates.eventDates.startTime) {
          newData.time = updates.eventDates.startTime;
        }
      }
      if (updates.recurrence) {
        newData.isRecurring = updates.recurrence.isRecurring;
      }
      
      return newData;
    });
  };

  const handleSaveAsDraft = () => {
    const draftData = {
      ...formData,
      status: 'draft' as const,
      id: Date.now(),
      createdAt: new Date()
    };
    onEventCreated(draftData);
    onClose();
  };

  const handlePublish = () => {
    const publishedData = {
      ...formData,
      status: 'published' as const,
      id: Date.now(),
      createdAt: new Date()
    };
    onEventCreated(publishedData);
    onClose();
  };

  const getProgressPercentage = () => {
    return (currentStep / steps.length) * 100;
  };

  const canProceedFromCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return formData.eventName && formData.eventType && formData.eventDates.startDate && formData.locations[0].name;
      case 2:
        return formData.selectedModules.length > 0;
      case 3:
        return true;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleSwitchToFull = () => {
    setIsQuickCreate(false);
    setCurrentStep(1);
  };

  const handleModeSelect = (mode: 'express' | 'complete') => {
    setIsQuickCreate(mode === 'express');
    setShowModeSelector(false);
    if (mode === 'complete') {
      setCurrentStep(1);
    }
  };

  const handleBackToModeSelector = () => {
    setShowModeSelector(true);
    setIsQuickCreate(false);
    setCurrentStep(1);
  };

  const handleQuickCreateEvent = () => {
    const quickEventData = {
      ...formData,
      id: Date.now(),
      createdAt: new Date()
    };
    onEventCreated(quickEventData);
    onClose();
  };

  const renderCurrentStep = () => {
    if (showModeSelector) {
      return <EventCreationModeSelector onSelectMode={handleModeSelect} />;
    }

    if (isQuickCreate) {
      return (
        <QuickCreateStep
          formData={formData}
          onUpdate={handleUpdateFormData}
          onCreateEvent={handleQuickCreateEvent}
          onSwitchToFull={handleSwitchToFull}
        />
      );
    }

    switch (currentStep) {
      case 1:
        return (
          <EventBasicsStep
            formData={formData}
            onUpdate={handleUpdateFormData}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <ModuleSelectionStep
            formData={formData}
            onUpdate={handleUpdateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <EventPhotosStep
            formData={formData}
            onUpdate={handleUpdateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <EventConfigurationStep
            formData={formData}
            onUpdate={handleUpdateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 5:
        return (
          <LaunchMonitoringStep
            formData={formData}
            onUpdate={handleUpdateFormData}
            onSaveAsDraft={handleSaveAsDraft}
            onPublish={handlePublish}
            onBack={handleBack}
            onEditStep={(stepNumber) => setCurrentStep(stepNumber)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-5xl mx-auto bg-white rounded-2xl max-h-[95vh] overflow-hidden flex flex-col">
        {!showModeSelector && (
          <>
            <DialogHeader className="pb-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <DialogTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-purple-600" />
                    {isQuickCreate ? "Express Event Setup" : "Complete Event Setup"}
                  </DialogTitle>
                  
                  {/* Mode Badge */}
                  <div className="flex items-center gap-3">
                    <Badge 
                      variant="secondary" 
                      className={isQuickCreate ? "bg-orange-100 text-orange-700" : "bg-purple-100 text-purple-700"}
                    >
                      {isQuickCreate ? (
                        <span className="flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5" />
                          Express Setup
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5">
                          <Settings2 className="w-3.5 h-3.5" />
                          Complete Setup
                        </span>
                      )}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBackToModeSelector}
                      className="text-xs text-gray-500 hover:text-gray-700"
                    >
                      Change Mode
                    </Button>
                  </div>

                  {!isQuickCreate && (
                <>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${getProgressPercentage()}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-500">Step {currentStep} of {steps.length}</p>
                </>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSaveAsDraft}
                  className="flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Draft
                </Button>
              </div>
            </DialogHeader>

            {/* Step Navigation - Only show for full setup */}
            {!isQuickCreate && (
          <div className="py-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const isCompleted = completedSteps.includes(step.id);
                const isCurrent = currentStep === step.id;
                const isAccessible = step.id <= Math.max(...completedSteps, currentStep);
                
                return (
                  <div key={step.id} className="flex items-center flex-1">
                    <button
                      onClick={() => handleStepNavigation(step.id)}
                      disabled={!isAccessible}
                      className={cn(
                        "flex flex-col items-center space-y-2 p-3 rounded-lg transition-all duration-200 w-full",
                        isCurrent && "bg-purple-50 border border-purple-200",
                        isCompleted && "text-green-600",
                        !isAccessible && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all",
                        isCompleted && "bg-green-100 border-green-500",
                        isCurrent && "border-purple-500 bg-purple-100",
                        !isCurrent && !isCompleted && "border-gray-300"
                      )}>
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <span className={cn(
                            "text-sm font-medium",
                            isCurrent && "text-purple-600",
                            !isCurrent && "text-gray-500"
                          )}>
                            {step.id}
                          </span>
                        )}
                      </div>
                      <div className="text-center">
                        <p className={cn(
                          "text-sm font-medium",
                          isCurrent && "text-purple-700",
                          isCompleted && "text-green-700",
                          !isCurrent && !isCompleted && "text-gray-600"
                        )}>
                          {step.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {step.description}
                        </p>
                      </div>
                    </button>
                    {index < steps.length - 1 && (
                      <div className={cn(
                        "h-0.5 flex-1 mx-4",
                        completedSteps.includes(step.id + 1) ? "bg-green-300" : "bg-gray-200"
                      )} />
                    )}
                  </div>
                );
              })}
              </div>
            </div>
          )}
        </>
        )}

        {/* Step Content */}
        <div className="flex-1 overflow-y-auto">
          {renderCurrentStep()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EnhancedEventCreationDialog;
