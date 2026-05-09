"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Copy, Download, Eye, QrCode } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

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
    { id: "3", title: "Venue Experience Survey", isActive: false },
  ];

  const generateQRCodeDataURL = (surveyId: string) => {
    const survey = surveys.find((s) => s.id === surveyId);
    return `data:image/svg+xml;base64,${btoa(`
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="white"/>
        <rect x="20" y="20" width="160" height="160" fill="black"/>
        <rect x="30" y="30" width="140" height="140" fill="white"/>
        <text x="100" y="90" text-anchor="middle" font-size="12" fill="black">Survey</text>
        <text x="100" y="110" text-anchor="middle" font-size="8" fill="black">${survey?.title || "Survey"}</text>
        <text x="100" y="125" text-anchor="middle" font-size="6" fill="black">Scan to Participate</text>
      </svg>
    `)}`;
  };

  const copySurveyUrl = () => {
    if (!selectedSurvey) return;

    const survey = surveys.find((s) => s.id === selectedSurvey);
    const url = `${window.location.origin}/survey/${selectedSurvey}`;
    navigator.clipboard.writeText(url);

    toast({
      title: "URL copied",
      description: `Survey URL for "${survey?.title}" has been copied to clipboard.`,
    });
  };

  const downloadQRCode = () => {
    if (!selectedSurvey) return;

    toast({
      title: "Download started",
      description: "Downloading QR code for printing...",
    });
  };

  const previewSurvey = () => {
    if (!selectedSurvey) return;

    const url = `${window.location.origin}/survey/${selectedSurvey}`;
    window.open(url, "_blank");
  };

  const selectedSurveyData = surveys.find((s) => s.id === selectedSurvey);

  return (
    <div className="space-y-6">
      {/* Survey Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Survey to Share</CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={selectedSurvey}
            onValueChange={setSelectedSurvey}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose a survey" />
            </SelectTrigger>
            <SelectContent>
              {surveys.map((survey) => (
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
            <CardTitle>Share &quot;{selectedSurveyData?.title}&quot;</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* QR Code Display */}
            <div className="text-center">
              <div className="mb-4 inline-block rounded-lg border-2 border-gray-200 bg-white p-4">
                {/* <img
                  src={generateQRCodeDataURL(selectedSurvey)}
                  alt="Survey QR Code"
                  className="h-48 w-48"
                /> */}
                <Image
                  src={generateQRCodeDataURL(selectedSurvey)}
                  alt="Survey QR Code"
                  className="h-48 w-48"
                />
              </div>
              <p className="text-sm text-gray-600">
                Guests scan this code to access your survey
              </p>
            </div>

            {/* Survey URL */}
            <Card className="bg-blue-50">
              <CardContent className="p-4">
                <h4 className="mb-2 font-medium">Direct Link:</h4>
                <div className="rounded border bg-white p-3 font-mono text-sm break-all">
                  {window.location.origin}/survey/{selectedSurvey}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              <Button
                variant="outline"
                onClick={copySurveyUrl}
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy URL
              </Button>

              <Dialog
                open={isQRDialogOpen}
                onOpenChange={setIsQRDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <QrCode className="mr-2 h-4 w-4" />
                    Large QR
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>QR Code for Printing</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 text-center">
                    <div className="inline-block rounded-lg border-2 border-gray-200 bg-white p-6">
                      {/* <img
                        src={generateQRCodeDataURL(selectedSurvey)}
                        alt="Survey QR Code"
                        className="h-64 w-64"
                      /> */}
                      <Image
                        src={generateQRCodeDataURL(selectedSurvey)}
                        alt="Survey QR Code"
                        className="h-64 w-64"
                      />
                    </div>
                    <Button
                      onClick={downloadQRCode}
                      className="w-full"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download High-Res QR Code
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Button
                variant="outline"
                onClick={downloadQRCode}
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>

              <Button
                variant="outline"
                onClick={previewSurvey}
              >
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </Button>
            </div>

            {/* Usage Instructions */}
            <Card className="bg-green-50">
              <CardContent className="p-4">
                <h4 className="mb-2 font-medium">How to use:</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>
                    • Print the QR code and place it at tables or entry points
                  </li>
                  <li>
                    • Share the direct link via email, social media, or
                    messaging
                  </li>
                  <li>
                    • Guests can scan with any QR code reader or camera app
                  </li>
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
