
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Upload, Users, FileText, Smartphone, Brain, CheckCircle } from "lucide-react";

interface Props {
  eventType: string;
  onGuestImport: (guests: string[]) => void;
}

const GuestImportSuggestions = ({ eventType, onGuestImport }: Props) => {
  const [importMethod, setImportMethod] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  const importMethods = [
    {
      id: "contacts",
      name: "Phone Contacts",
      icon: Smartphone,
      description: "Import from your phone's contact list",
      available: true
    },
    {
      id: "csv",
      name: "CSV File",
      icon: FileText,
      description: "Upload a spreadsheet with guest details",
      available: true
    },
    {
      id: "social",
      name: "Social Media",
      icon: Users,
      description: "Import friends from social platforms",
      available: false,
      comingSoon: true
    }
  ];

  const getSmartSuggestions = () => {
    const suggestions = {
      Wedding: [
        "Family members (both sides)",
        "College friends",
        "Work colleagues",
        "Childhood friends",
        "Wedding party members"
      ],
      Corporate: [
        "Department heads",
        "Key stakeholders",
        "Client representatives",
        "Board members",
        "Team leads"
      ],
      Birthday: [
        "Close family",
        "Best friends",
        "Neighbors",
        "School friends",
        "Work friends"
      ],
      Cultural: [
        "Community leaders",
        "Cultural organization members",
        "Local artists",
        "Cultural enthusiasts",
        "Media contacts"
      ]
    };

    return suggestions[eventType as keyof typeof suggestions] || suggestions.Corporate;
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    
    // Simulate file processing
    setTimeout(() => {
      const mockGuests = [
        "john.doe@example.com",
        "jane.smith@example.com",
        "mike.johnson@example.com",
        "sarah.williams@example.com",
        "david.brown@example.com"
      ];
      
      onGuestImport(mockGuests);
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-green-600" />
          Smart Guest Import
          <Badge className="bg-green-100 text-green-700">AI Assistant</Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <h4 className="font-medium text-gray-800">Import Methods</h4>
          <div className="grid grid-cols-1 gap-3">
            {importMethods.map((method) => {
              const Icon = method.icon;
              return (
                <div
                  key={method.id}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    method.available 
                      ? "border-green-200 hover:border-green-400 cursor-pointer" 
                      : "border-gray-200 opacity-50 cursor-not-allowed"
                  }`}
                  onClick={() => method.available && setImportMethod(method.id)}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-green-600" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{method.name}</span>
                        {method.comingSoon && (
                          <Badge variant="outline" className="text-xs">
                            Coming Soon
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{method.description}</p>
                    </div>
                    {importMethod === method.id && (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {importMethod === "csv" && (
          <div className="space-y-3">
            <label className="block">
              <span className="font-medium text-gray-700">Upload CSV File</span>
              <Input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileUpload}
                className="mt-1"
                disabled={isProcessing}
              />
            </label>
            {isProcessing && (
              <div className="text-center py-4">
                <div className="inline-flex items-center gap-2 text-green-600">
                  <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                  Processing your guest list...
                </div>
              </div>
            )}
          </div>
        )}

        <div className="bg-green-25 p-3 rounded-lg">
          <h4 className="font-medium text-green-800 mb-2">
            AI Suggestions for {eventType} Guest List:
          </h4>
          <div className="space-y-1">
            {getSmartSuggestions().map((suggestion, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-green-700">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                {suggestion}
              </div>
            ))}
          </div>
        </div>

        <Button 
          className="w-full bg-green-600 hover:bg-green-700"
          disabled={!importMethod || isProcessing}
        >
          <Upload className="w-4 h-4 mr-2" />
          {isProcessing ? "Processing..." : "Start Import"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default GuestImportSuggestions;
