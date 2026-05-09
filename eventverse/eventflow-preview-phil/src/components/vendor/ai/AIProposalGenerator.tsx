
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, Sparkles, DollarSign, Calendar, FileText } from "lucide-react";

interface AIProposalGeneratorProps {
  children: React.ReactNode;
}

const AIProposalGenerator = ({ children }: AIProposalGeneratorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedLead, setSelectedLead] = useState("");
  const [customRequirements, setCustomRequirements] = useState("");
  const [generatedProposal, setGeneratedProposal] = useState<any>(null);

  const mockLeads = [
    { id: "1", name: "Johnson Wedding", budget: "$15,000", type: "Wedding Photography", priority: "high" },
    { id: "2", name: "Corporate Event - Tech Summit", budget: "$25,000", type: "Event Management", priority: "medium" },
    { id: "3", name: "Birthday Celebration", budget: "$5,000", type: "Party Planning", priority: "low" }
  ];

  const handleGenerateProposal = async () => {
    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const proposal = {
      title: "Wedding Photography Package - Johnson Wedding",
      totalCost: 8500,
      breakdown: [
        { item: "Full Day Photography (8 hours)", quantity: 1, unitPrice: 3500, total: 3500 },
        { item: "Engagement Session", quantity: 1, unitPrice: 800, total: 800 },
        { item: "Professional Editing (50 photos)", quantity: 1, unitPrice: 1200, total: 1200 },
        { item: "Wedding Album (Premium)", quantity: 1, unitPrice: 1500, total: 1500 },
        { item: "Online Gallery Access", quantity: 1, unitPrice: 300, total: 300 },
        { item: "USB Drive with All Photos", quantity: 1, unitPrice: 200, total: 200 },
        { item: "Second Photographer", quantity: 1, unitPrice: 1000, total: 1000 }
      ],
      timeline: "6-8 weeks for final delivery",
      deliverables: [
        "High-resolution edited photos (300+ images)",
        "Premium wedding album with custom design",
        "Online gallery for sharing with family",
        "Engagement session photos",
        "USB drive with all raw and edited photos"
      ],
      terms: "50% deposit required to secure date, remaining balance due on wedding day. Travel within 50 miles included.",
      confidence: 94
    };
    
    setGeneratedProposal(proposal);
    setIsGenerating(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-600" />
            AI Proposal Generator
          </DialogTitle>
          <DialogDescription>
            Generate intelligent, customized proposals based on client requirements and your business data
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {!generatedProposal ? (
            <>
              {/* Lead Selection */}
              <div className="space-y-2">
                <Label>Select Lead or Opportunity</Label>
                <Select value={selectedLead} onValueChange={setSelectedLead}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a lead to generate proposal for" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockLeads.map(lead => (
                      <SelectItem key={lead.id} value={lead.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{lead.name}</span>
                          <Badge variant={lead.priority === "high" ? "destructive" : lead.priority === "medium" ? "default" : "secondary"}>
                            {lead.priority}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Custom Requirements */}
              <div className="space-y-2">
                <Label>Additional Requirements or Notes</Label>
                <Textarea
                  placeholder="Add any specific requirements, preferences, or notes from the client..."
                  value={customRequirements}
                  onChange={(e) => setCustomRequirements(e.target.value)}
                  rows={4}
                />
              </div>

              {/* AI Features Preview */}
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  AI Will Analyze:
                </h4>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>• Client budget and requirements</li>
                  <li>• Your service history and pricing patterns</li>
                  <li>• Market rates for similar services</li>
                  <li>• Optimal package configurations</li>
                  <li>• Competition analysis and positioning</li>
                </ul>
              </div>

              <Button 
                onClick={handleGenerateProposal} 
                disabled={!selectedLead || isGenerating}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <Brain className="w-4 h-4 mr-2 animate-pulse" />
                    Generating Proposal...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate AI Proposal
                  </>
                )}
              </Button>
            </>
          ) : (
            <>
              {/* Generated Proposal */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{generatedProposal.title}</h3>
                  <Badge className="bg-green-100 text-green-800">
                    {generatedProposal.confidence}% AI Confidence
                  </Badge>
                </div>

                {/* Cost Breakdown */}
                <div className="space-y-3">
                  <h4 className="font-medium flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Cost Breakdown
                  </h4>
                  <div className="border rounded-lg overflow-hidden">
                    {generatedProposal.breakdown.map((item: any, index: number) => (
                      <div key={index} className="flex justify-between items-center p-3 border-b last:border-b-0">
                        <div>
                          <span className="font-medium">{item.item}</span>
                          <span className="text-sm text-gray-600 ml-2">x{item.quantity}</span>
                        </div>
                        <span className="font-medium">${item.total.toLocaleString()}</span>
                      </div>
                    ))}
                    <div className="bg-gray-50 p-3 font-bold text-lg">
                      Total: ${generatedProposal.totalCost.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Timeline and Deliverables */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4" />
                      Timeline
                    </h4>
                    <p className="text-gray-700">{generatedProposal.timeline}</p>
                  </div>
                  <div>
                    <h4 className="font-medium flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4" />
                      Deliverables
                    </h4>
                    <ul className="text-sm space-y-1 text-gray-700">
                      {generatedProposal.deliverables.map((item: string, index: number) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Terms */}
                <div>
                  <h4 className="font-medium mb-2">Terms & Conditions</h4>
                  <p className="text-gray-700 text-sm">{generatedProposal.terms}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button className="flex-1">
                    Send Proposal
                  </Button>
                  <Button variant="outline" onClick={() => setGeneratedProposal(null)}>
                    Regenerate
                  </Button>
                  <Button variant="outline">
                    Edit Manually
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIProposalGenerator;
