import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { CheckCircle, Circle, ArrowLeft, ArrowRight, Save, Sparkles, Zap, Eye, Monitor, Smartphone, Tablet, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { EventFormData } from "@/components/EnhancedEventCreationDialog";
import EventBasicsStep from "@/components/event-creation/EventBasicsStep";
import ModuleSelectionStep from "@/components/event-creation/ModuleSelectionStep";
import EventPhotosStep from "@/components/event-creation/EventPhotosStep";
import EventConfigurationStep from "@/components/event-creation/EventConfigurationStep";
import LaunchMonitoringStep from "@/components/event-creation/LaunchMonitoringStep";
import QuickCreateStep from "@/components/event-creation/QuickCreateStep";
import EventCardPreview from "@/components/event-creation/EventCardPreview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

const EventCreation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editingEvent = location.state?.editingEvent;

  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isQuickCreate, setIsQuickCreate] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [previewMode, setPreviewMode] = useState<'card' | 'page' | 'journey'>('card');
  
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
    
    // Store in sessionStorage for demonstration
    sessionStorage.setItem('currentEvent', JSON.stringify(draftData));
    navigate('/');
  };

  const handlePublish = () => {
    const publishedData = {
      ...formData,
      status: 'published' as const,
      id: Date.now(),
      createdAt: new Date()
    };
    
    // Store in sessionStorage for demonstration
    sessionStorage.setItem('currentEvent', JSON.stringify(publishedData));
    navigate('/');
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

  const renderCurrentStep = () => {
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
            onPublish={handlePublish}
            onSaveAsDraft={handleSaveAsDraft}
            onBack={handleBack}
          />
        );
      default:
        return null;
    }
  };

  const renderPreview = () => {
    const deviceClasses = {
      desktop: "w-full max-w-md mx-auto",
      tablet: "w-full max-w-sm mx-auto",
      mobile: "w-full max-w-xs mx-auto"
    };

    return (
      <Card className="h-full">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Live Preview</CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant={previewDevice === 'desktop' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPreviewDevice('desktop')}
              >
                <Monitor className="w-4 h-4" />
              </Button>
              <Button
                variant={previewDevice === 'tablet' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPreviewDevice('tablet')}
              >
                <Tablet className="w-4 h-4" />
              </Button>
              <Button
                variant={previewDevice === 'mobile' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPreviewDevice('mobile')}
              >
                <Smartphone className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs value={previewMode} onValueChange={(value) => setPreviewMode(value as any)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="card">Card View</TabsTrigger>
              <TabsTrigger value="page">Full Page</TabsTrigger>
              <TabsTrigger value="journey">Guest Journey</TabsTrigger>
            </TabsList>
            
            <TabsContent value="card" className="mt-4">
              <div className={cn("transition-all duration-300", deviceClasses[previewDevice])}>
                <EventCardPreview
                  formData={formData}
                  onEditStep={handleStepNavigation}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="page" className="mt-4">
              <div className={cn("transition-all duration-300", deviceClasses[previewDevice])}>
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-4 rounded-lg min-h-[400px] flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <Eye className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                    <p>Full page preview will show here</p>
                    <p className="text-sm">Complete event website layout</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="journey" className="mt-4">
              <div className={cn("transition-all duration-300", deviceClasses[previewDevice])}>
                <div className="bg-gradient-to-br from-green-50 to-blue-50 p-4 rounded-lg min-h-[400px] flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <Users className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                    <p>Guest journey preview</p>
                    <p className="text-sm">See the complete guest experience</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Exit to Dashboard
              </Button>
              <div className="h-6 border-l border-gray-300" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {editingEvent ? 'Edit Event' : 'Create New Event'}
                </h1>
                <p className="text-sm text-gray-600">
                  {formData.eventName || 'Untitled Event'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-gray-700">Quick Create</span>
                <Switch
                  checked={isQuickCreate}
                  onCheckedChange={setIsQuickCreate}
                />
              </div>
              <Button
                variant="outline"
                onClick={handleSaveAsDraft}
              >
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardContent className="p-0">
                {isQuickCreate ? (
                  <QuickCreateStep
                    formData={formData}
                    onUpdate={handleUpdateFormData}
                    onCreateEvent={handlePublish}
                    onSwitchToFull={handleSwitchToFull}
                  />
                ) : (
                  <div>
                    {/* Progress Bar */}
                    <div className="p-6 border-b border-gray-200">
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span>Step {currentStep} of {steps.length}</span>
                          <span>{Math.round(getProgressPercentage())}% Complete</span>
                        </div>
                        <Progress value={getProgressPercentage()} className="w-full" />
                      </div>

                      {/* Step Navigation */}
                      <div className="flex items-center justify-between">
                        {steps.map((step) => {
                          const isCompleted = completedSteps.includes(step.id);
                          const isCurrent = currentStep === step.id;
                          const isAccessible = step.id <= Math.max(...completedSteps, currentStep);

                          return (
                            <div key={step.id} className="flex flex-col items-center">
                              <button
                                onClick={() => isAccessible && handleStepNavigation(step.id)}
                                className={cn(
                                  "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all",
                                  {
                                    "bg-green-500 border-green-500 text-white": isCompleted,
                                    "bg-purple-600 border-purple-600 text-white": isCurrent,
                                    "border-gray-300 text-gray-400 cursor-not-allowed": !isAccessible,
                                    "border-gray-400 text-gray-600 hover:border-purple-300 cursor-pointer": isAccessible && !isCurrent && !isCompleted
                                  }
                                )}
                                disabled={!isAccessible}
                              >
                                {isCompleted ? (
                                  <CheckCircle className="w-5 h-5" />
                                ) : (
                                  <span className="text-sm font-medium">{step.id}</span>
                                )}
                              </button>
                              <div className="mt-2 text-center">
                                <div className={cn("text-xs font-medium", {
                                  "text-green-600": isCompleted,
                                  "text-purple-600": isCurrent,
                                  "text-gray-400": !isAccessible,
                                  "text-gray-600": isAccessible && !isCurrent && !isCompleted
                                })}>
                                  {step.title}
                                </div>
                                <div className="text-xs text-gray-500">{step.description}</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Step Content */}
                    <div className="p-0">
                      {renderCurrentStep()}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {renderPreview()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCreation;