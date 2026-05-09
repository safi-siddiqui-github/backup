"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ArrowRight, Globe, Rocket } from "lucide-react";
import Phase4EcosystemHub from "../ecosystem/Phase4EcosystemHub";
import Phase5GlobalHub from "../ecosystem/Phase5GlobalHub";
import { EventFormData } from "../EnhancedEventCreationDialog";

interface Props {
  formData: EventFormData;
  onUpdate: (updates: Partial<EventFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const EcosystemStep = ({ formData, onUpdate, onNext, onBack }: Props) => {
  return (
    <div className="space-y-6 p-6">
      <div className="space-y-2 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-100 via-blue-100 to-green-100 px-4 py-2">
          <Globe className="h-4 w-4 text-purple-600" />
          <span className="text-sm font-medium text-purple-800">
            Global Event Ecosystem
          </span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          Advanced Event Technology Platform
        </h2>
        <p className="mx-auto max-w-3xl text-lg text-gray-600">
          Access the most advanced event management ecosystem with global
          infrastructure, innovation labs, and next-generation technologies.
        </p>
      </div>

      <Tabs
        defaultValue="phase4"
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            value="phase4"
            className="flex items-center gap-2"
          >
            <Globe className="h-4 w-4" />
            Phase 4: Enterprise Ecosystem
          </TabsTrigger>
          <TabsTrigger
            value="phase5"
            className="flex items-center gap-2"
          >
            <Rocket className="h-4 w-4" />
            Phase 5: Global Platform
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="phase4"
          className="space-y-6"
        >
          <Phase4EcosystemHub />
        </TabsContent>

        <TabsContent
          value="phase5"
          className="space-y-6"
        >
          <Phase5GlobalHub />
        </TabsContent>
      </Tabs>

      {/* Navigation */}
      <div className="flex justify-between border-t pt-6">
        <Button
          variant="outline"
          onClick={onBack}
          className="px-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Button
          onClick={onNext}
          className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 px-8 text-white hover:from-purple-700 hover:via-blue-700 hover:to-green-700"
        >
          Launch Global Event
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default EcosystemStep;
