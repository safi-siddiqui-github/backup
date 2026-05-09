"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePickerWithRange } from "@/components/ui/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { BarChart3, Calendar, Download, FileText, Mail } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";

interface ReportsGeneratorProps {
  eventId: string;
}

const ReportsGenerator = ({ eventId }: ReportsGeneratorProps) => {
  const [reportType, setReportType] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [includeSections, setIncludeSections] = useState({
    overview: true,
    surveys: true,
    guests: true,
    media: false,
    games: false,
  });
  const [format, setFormat] = useState("pdf");
  const { toast } = useToast();

  const reportTypes = [
    {
      id: "comprehensive",
      name: "Comprehensive Event Report",
      description: "Complete analysis of all event aspects",
    },
    {
      id: "survey",
      name: "Survey Analysis Report",
      description: "Detailed survey responses and analytics",
    },
    {
      id: "guest",
      name: "Guest Engagement Report",
      description: "Guest participation and satisfaction metrics",
    },
    {
      id: "performance",
      name: "Event Performance Report",
      description: "KPIs and performance indicators",
    },
    {
      id: "custom",
      name: "Custom Report",
      description: "Choose specific sections to include",
    },
  ];

  const generateReport = () => {
    if (!reportType) {
      toast({
        title: "Report type required",
        description: "Please select a report type to generate.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Report generation started",
      description: `Your ${reportTypes.find((r) => r.id === reportType)?.name} is being generated...`,
    });

    // Simulate report generation
    setTimeout(() => {
      toast({
        title: "Report ready",
        description:
          "Your report has been generated and is ready for download.",
      });
    }, 3000);
  };

  const scheduleReport = () => {
    toast({
      title: "Report scheduled",
      description: "You will receive automated reports via email.",
    });
  };

  const toggleSection = (section: keyof typeof includeSections) => {
    setIncludeSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="cursor-pointer transition-shadow hover:shadow-md">
          <CardContent className="p-4 text-center">
            <FileText className="mx-auto mb-2 h-8 w-8 text-blue-600" />
            <h4 className="font-medium">Quick Summary</h4>
            <p className="mb-3 text-sm text-gray-600">
              Essential metrics overview
            </p>
            <Button
              size="sm"
              variant="outline"
            >
              <Download className="mr-2 h-4 w-4" />
              Generate
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer transition-shadow hover:shadow-md">
          <CardContent className="p-4 text-center">
            <BarChart3 className="mx-auto mb-2 h-8 w-8 text-green-600" />
            <h4 className="font-medium">Full Analytics</h4>
            <p className="mb-3 text-sm text-gray-600">
              Comprehensive data analysis
            </p>
            <Button
              size="sm"
              variant="outline"
            >
              <Download className="mr-2 h-4 w-4" />
              Generate
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer transition-shadow hover:shadow-md">
          <CardContent className="p-4 text-center">
            <Mail className="mx-auto mb-2 h-8 w-8 text-purple-600" />
            <h4 className="font-medium">Email Report</h4>
            <p className="mb-3 text-sm text-gray-600">Send to stakeholders</p>
            <Button
              size="sm"
              variant="outline"
            >
              <Mail className="mr-2 h-4 w-4" />
              Send
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Custom Report Builder */}
      <Card>
        <CardHeader>
          <CardTitle>Custom Report Builder</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Report Type */}
          <div className="space-y-3">
            <h4 className="font-medium">Report Type</h4>
            <Select
              value={reportType}
              onValueChange={setReportType}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                {reportTypes.map((type) => (
                  <SelectItem
                    key={type.id}
                    value={type.id}
                  >
                    <div>
                      <div className="font-medium">{type.name}</div>
                      <div className="text-sm text-gray-600">
                        {type.description}
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Range */}
          <div className="space-y-3">
            <h4 className="font-medium">Date Range</h4>
            <DatePickerWithRange
              date={dateRange}
              onDateChange={setDateRange}
            />
          </div>

          {/* Include Sections */}
          {reportType === "custom" && (
            <div className="space-y-3">
              <h4 className="font-medium">Include Sections</h4>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {Object.entries(includeSections).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={key}
                      checked={value}
                      onCheckedChange={() =>
                        toggleSection(key as keyof typeof includeSections)
                      }
                    />
                    <label
                      htmlFor={key}
                      className="text-sm leading-none font-medium capitalize peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {key}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Output Format */}
          <div className="space-y-3">
            <h4 className="font-medium">Output Format</h4>
            <Select
              value={format}
              onValueChange={setFormat}
            >
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF Document</SelectItem>
                <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                <SelectItem value="powerpoint">
                  PowerPoint Presentation
                </SelectItem>
                <SelectItem value="csv">CSV Data Export</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button onClick={generateReport}>
              <Download className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
            <Button
              variant="outline"
              onClick={scheduleReport}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Automatic
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                name: "Event Performance Report",
                date: "2024-01-15",
                size: "2.3 MB",
                status: "Ready",
              },
              {
                name: "Survey Analysis Report",
                date: "2024-01-14",
                size: "1.8 MB",
                status: "Ready",
              },
              {
                name: "Guest Engagement Report",
                date: "2024-01-13",
                size: "3.1 MB",
                status: "Ready",
              },
            ].map((report, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">{report.name}</p>
                    <p className="text-sm text-gray-600">
                      Generated on {report.date} • {report.size}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{report.status}</Badge>
                  <Button
                    size="sm"
                    variant="outline"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsGenerator;
