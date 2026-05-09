
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Globe, Rocket } from "lucide-react";
import { EventFormData } from "../EnhancedEventCreationDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Phase4EcosystemHub from "../ecosystem/Phase4EcosystemHub";
import Phase5GlobalHub from "../ecosystem/Phase5GlobalHub";

interface Props {
  formData: EventFormData;
  onUpdate: (updates: Partial<EventFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const EcosystemStep = ({ formData, onUpdate, onNext, onBack }: Props) => {
  return (
    <div className="space-y-6 p-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 via-blue-100 to-green-100 px-4 py-2 rounded-full">
          <Globe className="w-4 h-4 text-purple-600" />
          <span className="text-purple-800 text-sm font-medium">Global Event Ecosystem</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Advanced Event Technology Platform</h2>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Access the most advanced event management ecosystem with global infrastructure, innovation labs, and next-generation technologies.
        </p>
      </div>

      <Tabs defaultValue="phase4" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="phase4" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Phase 4: Enterprise Ecosystem
          </TabsTrigger>
          <TabsTrigger value="phase5" className="flex items-center gap-2">
            <Rocket className="w-4 h-4" />
            Phase 5: Global Platform
          </TabsTrigger>
        </TabsList>

        <TabsContent value="phase4" className="space-y-6">
          <Phase4EcosystemHub />
        </TabsContent>

        <TabsContent value="phase5" className="space-y-6">
          <Phase5GlobalHub />
        </TabsContent>
      </Tabs>

      {/* Navigation */}
      <div className="flex justify-between pt-6 border-t">
        <Button variant="outline" onClick={onBack} className="px-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        
        <Button 
          onClick={onNext}
          className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 hover:from-purple-700 hover:via-blue-700 hover:to-green-700 text-white px-8"
        >
          Launch Global Event
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default EcosystemStep;
