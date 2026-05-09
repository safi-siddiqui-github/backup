
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { QrCode, Download, Copy, Eye, Share } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SurveyQRCodeProps {
  eventId: string;
}

const SurveyQRCode = ({ eventId }: SurveyQRCodeProps) => {
  const [selectedSurvey, setSelectedSurvey] = useState("");
  const [isQRDialogOpen, setIsQRDialogOpen] = useState(false);
  const { toast } = useToast();

  // Mock data
  const surveys = [
    { id: "1", title: "Event Feedback Survey", isActive: true },
    { id: "2", title: "Food & Catering Feedback", isActive: true },
    { id: "3", title: "Venue Experience Survey", isActive: false }
  ];

  const generateQRCodeDataURL = (surveyId: string) => {
    const survey = surveys.find(s => s.id === surveyId);
    return `data:image/svg+xml;base64,${btoa(`
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="white"/>
        <rect x="20" y="20" width="160" height="160" fill="black"/>
        <rect x="30" y="30" width="140" height="140" fill="white"/>
        <text x="100" y="90" text-anchor="middle" font-size="12" fill="black">Survey</text>
        <text x="100" y="110" text-anchor="middle" font-size="8" fill="black">${survey?.title || 'Survey'}</text>
        <text x="100" y="125" text-anchor="middle" font-size="6" fill="black">Scan to Participate</text>
      </svg>
    `)}`;
  };

  const copySurveyUrl = () => {
    if (!selectedSurvey) return;
    
    const survey = surveys.find(s => s.id === selectedSurvey);
    const url = `${window.location.origin}/survey/${selectedSurvey}`;
    navigator.clipboard.writeText(url);
    
    toast({
      title: "URL copied",
      description: `Survey URL for "${survey?.title}" has been copied to clipboard.`
    });
  };

  const downloadQRCode = () => {
    if (!selectedSurvey) return;
    
    toast({
      title: "Download started",
      description: "Downloading QR code for printing..."
    });
  };

  const previewSurvey = () => {
    if (!selectedSurvey) return;
    
    const url = `${window.location.origin}/survey/${selectedSurvey}`;
    window.open(url, '_blank');
  };

  const selectedSurveyData = surveys.find(s => s.id === selectedSurvey);

  return (
    <div className="space-y-6">
      {/* Survey Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Survey to Share</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedSurvey} onValueChange={setSelectedSurvey}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a survey" />
            </SelectTrigger>
            <SelectContent>
              {surveys.map(survey => (
                <SelectItem 
                  key={survey.id} 
                  value={survey.id}
                  disabled={!survey.isActive}
                >
                  {survey.title} {!survey.isActive && "(Inactive)"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* QR Code and Sharing */}
      {selectedSurvey && (
        <Card>
          <CardHeader>
            <CardTitle>Share "{selectedSurveyData?.title}"</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* QR Code Display */}
            <div className="text-center">
              <div className="bg-white p-4 rounded-lg border-2 border-gray-200 inline-block mb-4">
                <img
                  src={generateQRCodeDataURL(selectedSurvey)}
                  alt="Survey QR Code"
                  className="w-48 h-48"
                />
              </div>
              <p className="text-sm text-gray-600">
                Guests scan this code to access your survey
              </p>
            </div>

            {/* Survey URL */}
            <Card className="bg-blue-50">
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">Direct Link:</h4>
                <div className="bg-white p-3 rounded border text-sm font-mono break-all">
                  {window.location.origin}/survey/{selectedSurvey}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button variant="outline" onClick={copySurveyUrl}>
                <Copy className="w-4 h-4 mr-2" />
                Copy URL
              </Button>
              
              <Dialog open={isQRDialogOpen} onOpenChange={setIsQRDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <QrCode className="w-4 h-4 mr-2" />
                    Large QR
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>QR Code for Printing</DialogTitle>
                  </DialogHeader>
                  <div className="text-center space-y-4">
                    <div className="bg-white p-6 rounded-lg border-2 border-gray-200 inline-block">
                      <img
                        src={generateQRCodeDataURL(selectedSurvey)}
                        alt="Survey QR Code"
                        className="w-64 h-64"
                      />
                    </div>
                    <Button onClick={downloadQRCode} className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Download High-Res QR Code
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Button variant="outline" onClick={downloadQRCode}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>

              <Button variant="outline" onClick={previewSurvey}>
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
            </div>

            {/* Usage Instructions */}
            <Card className="bg-green-50">
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">How to use:</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Print the QR code and place it at tables or entry points</li>
                  <li>• Share the direct link via email, social media, or messaging</li>
                  <li>• Guests can scan with any QR code reader or camera app</li>
                  <li>• Survey responses are collected in real-time</li>
                  <li>• View results in the Analytics module</li>
                </ul>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SurveyQRCode;
