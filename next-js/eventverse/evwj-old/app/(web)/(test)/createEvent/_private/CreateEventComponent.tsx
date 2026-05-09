"use client";
import { sections } from "./constant/steps";

import { useState } from "react";
import { toast } from "sonner";
import { NavigationButtons } from "./steps/NavigationButtons";
import { StepperProgress } from "./steps/StepperProgress";
 
import { EventFormData } from "./types/types";
import EssentialDetails from "./steps/step_1/step_1";
import PhotoSection from "./steps/step_2/photos";
import FeaturesSection from "./steps/step_3/features";
import ExpandableEventDetails from "./steps/step_4/options";

export default function CreateEventComponent() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

   const [formData, setFormData] = useState<EventFormData>({
    visibility: "public",
    eventName: "",
    eventType: "",
    description: "",
    descriptionBlocks: [],
    theme: {
      primaryColor: "#8B5CF6",
      secondaryColor: "#3B82F6",
      accentColor: "#FF6347",
      logo: "",
      template: "",
      effects: [],
      mood: "",
      generatedName: "",
    },
    eventDates: {
      isMultiDay: false,
      startDate: null,
      endDate: null,
      startTime: "",
      endTime: "",
      timezone: "UTC",
      sessions: [],
    },
    startDate: null,
    endDate: null,
    time: "",
    timezone: "UTC",
    isRecurring: false,
    locations: [
      {
        id: "1",
        name: "",
        address: "",
        type: "physical",
        source: "manual",
        sections: [],
      },
    ],
    recurrence: {
      isRecurring: false,
      pattern: "weekly",
      frequency: 1,
      endType: "never",
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
      sendTime: "now",
    },
    eventPhotos: {
      mainPhoto: null,
      additionalPhotos: [],
      maxPhotos: 10,
    },
    status: "draft",
    softLaunch: false,
    analytics: true,
    additionalDetails: {
      ageRestrictions: { hasRestrictions: false },
      checkIn: { hasCustomCheckIn: false },
      parking: { hasParkingInfo: false },
      faqs: [],
      specialGuests: [],
      featureEvent: { isFeatured: false, featureType: "single" },
    },
  });
 

  const isStepValid = (stepIndex: number): boolean => {
    switch (stepIndex) {
      case 0:
        return !!(formData.eventName && formData.eventDates.startDate);
      case 1:
        return true;
      case 2:
        return true;
      case 3:
        return true;
      default:
        return false;
    }
  };

  const isFormValid = () => {
    return isStepValid(0);
  };

  const isStepComplete = (stepIndex: number): boolean => {
    if (stepIndex > currentStep) return false;
    return isStepValid(stepIndex);
  };

  const handleNext = () => {
    if (currentStep < 3 && isStepValid(currentStep)) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePublish = async () => {
    if (!isFormValid()) {
      toast("Incomplete Information");
      return;
    }

    try {
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("Failed to create event. Please try again.");
    }
  };

  const handleSaveAsDraft = () => {
    const savedEvents = JSON.parse(
      sessionStorage.getItem("savedEvents") || "[]",
    );
    const draftEvent = {
      ...formData,
      id: `draft-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: "draft",
    };
    savedEvents.push(draftEvent);
    sessionStorage.setItem("savedEvents", JSON.stringify(savedEvents));
    sessionStorage.removeItem("eventDraft");

    toast("Draft Saved");
 
  };

    const handleUpdateFormData = (updates: Partial<EventFormData>) => {
      setFormData((prev) => ({
        ...prev,
        ...updates,
        startDate: updates.eventDates?.startDate ?? prev.startDate,
        endDate: updates.eventDates?.endDate ?? prev.endDate,
      }));
    };
  

  const currentSection = sections[currentStep];

  const renderCurrentSection = () => {
    switch (currentSection.id) {
      case "details":
        return (
         <EssentialDetails formData={formData} onUpdate={handleUpdateFormData}  />
        );
      case "photos":
        return (
          <PhotoSection
                    formData={formData}
                    onUpdate={handleUpdateFormData}
                  />
        );
      case "modules":
        return (
        <FeaturesSection
					formData={formData}
					onUpdate={handleUpdateFormData}
				/>
        );
      case "optional":
        return (
           	<ExpandableEventDetails formData={formData} onUpdate={handleUpdateFormData} />
        );
      default:
        return  <div></div>;
    }
  };

  return (
    <>
      <div className="flex max-h-screen flex-col">
        {/* Background Glowing Effect */}
        <div className="pointer-events-none fixed inset-0 z-0 block overflow-hidden dark:hidden">
          <div className="absolute inset-0 bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50" />
          <div
            className="absolute top-1/4 left-1/4 h-96 w-96 animate-pulse rounded-full bg-blue-300/40 blur-3xl"
            style={{ animationDuration: "8s" }}
          />
          <div
            className="absolute right-1/4 bottom-1/4 h-96 w-96 animate-pulse rounded-full bg-purple-300/40 blur-3xl"
            style={{ animationDuration: "10s", animationDelay: "2s" }}
          />
        </div>

        <div className="pointer-events-none fixed inset-0 z-0 hidden overflow-hidden dark:block">
          <div className="absolute inset-0 bg-linear-to-br from-blue-950 via-indigo-950 to-purple-950" />
          <div
            className="absolute top-1/4 left-1/4 h-96 w-96 animate-pulse rounded-full bg-blue-600/20 blur-3xl"
            style={{ animationDuration: "8s" }}
          />
          <div
            className="absolute right-1/4 bottom-1/4 h-96 w-96 animate-pulse rounded-full bg-purple-600/20 blur-3xl"
            style={{ animationDuration: "10s", animationDelay: "2s" }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-size-[50px_50px]" />
        </div>

        <div className="relative z-10">
          {/* <PreviewCreateEventV2Component /> */}

          {/* <StepperProgress
            steps={sections.map((section, index) => ({
              id: section.id,
              title: section.title,
              icon: section.icon,
              isComplete: isStepComplete(index),
              isRequired: section.isRequired,
            }))}
            currentStep={currentStep}
            onStepClick={handleStepClick}
          /> */}

            {/* Main Content Area */}
			<div className="container overflow-y-auto mx-auto min-h-[calc(100vh-250px)] max-w-4xl px-4 py-8">
				{/* Page Header */}
				<div className="animate-in fade-in slide-in-from-bottom-4 mb-8 duration-500">
					<div className="mb-3 flex items-center gap-3">
						<div className="bg-primary/10 dark:bg-primary/20 rounded-lg p-2.5">
							{currentSection.icon}
						</div>
						<div>
							<h1 className="text-foreground text-3xl font-bold">
								{currentSection.title}
							</h1>
							<p className="text-muted-foreground text-sm">
								Step {currentStep + 1} of {sections.length}
							</p>
						</div>
					</div>
				</div>

				{/* Current Step Content */}
				<div
					key={currentStep}
					className="animate-in fade-in slide-in-from-right-4 duration-500"
				>
          {renderCurrentSection()}
				</div>
			</div>


          <NavigationButtons
            currentStep={currentStep}
            totalSteps={sections.length}
            isCurrentStepValid={isStepValid(currentStep)}
            isLastStep={currentStep === sections.length - 1}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onComplete={handlePublish}
            onSaveDraft={handleSaveAsDraft}
          />
        </div>
      </div>
    </>
  );
}
