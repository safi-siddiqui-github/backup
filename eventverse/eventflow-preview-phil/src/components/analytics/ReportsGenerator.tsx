
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-picker";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Mail, Calendar, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
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
    games: false
  });
  const [format, setFormat] = useState("pdf");
  const { toast } = useToast();

  const reportTypes = [
    { id: "comprehensive", name: "Comprehensive Event Report", description: "Complete analysis of all event aspects" },
    { id: "survey", name: "Survey Analysis Report", description: "Detailed survey responses and analytics" },
    { id: "guest", name: "Guest Engagement Report", description: "Guest participation and satisfaction metrics" },
    { id: "performance", name: "Event Performance Report", description: "KPIs and performance indicators" },
    { id: "custom", name: "Custom Report", description: "Choose specific sections to include" }
  ];

  const generateReport = () => {
    if (!reportType) {
      toast({
        title: "Report type required",
        description: "Please select a report type to generate.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Report generation started",
      description: `Your ${reportTypes.find(r => r.id === reportType)?.name} is being generated...`
    });

    // Simulate report generation
    setTimeout(() => {
      toast({
        title: "Report ready",
        description: "Your report has been generated and is ready for download."
      });
    }, 3000);
  };

  const scheduleReport = () => {
    toast({
      title: "Report scheduled",
      description: "You will receive automated reports via email."
    });
  };

  const toggleSection = (section: keyof typeof includeSections) => {
    setIncludeSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <FileText className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <h4 className="font-medium">Quick Summary</h4>
            <p className="text-sm text-gray-600 mb-3">Essential metrics overview</p>
            <Button size="sm" variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Generate
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <BarChart3 className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <h4 className="font-medium">Full Analytics</h4>
            <p className="text-sm text-gray-600 mb-3">Comprehensive data analysis</p>
            <Button size="sm" variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Generate
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <Mail className="w-8 h-8 mx-auto mb-2 text-purple-600" />
            <h4 className="font-medium">Email Report</h4>
            <p className="text-sm text-gray-600 mb-3">Send to stakeholders</p>
            <Button size="sm" variant="outline">
              <Mail className="w-4 h-4 mr-2" />
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
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger>
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                {reportTypes.map(type => (
                  <SelectItem key={type.id} value={type.id}>
                    <div>
                      <div className="font-medium">{type.name}</div>
                      <div className="text-sm text-gray-600">{type.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Range */}
          <div className="space-y-3">
            <h4 className="font-medium">Date Range</h4>
            <DatePickerWithRange date={dateRange} onDateChange={setDateRange} />
          </div>

          {/* Include Sections */}
          {reportType === "custom" && (
            <div className="space-y-3">
              <h4 className="font-medium">Include Sections</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(includeSections).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      id={key}
                      checked={value}
                      onCheckedChange={() => toggleSection(key as keyof typeof includeSections)}
                    />
                    <label
                      htmlFor={key}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
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
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF Document</SelectItem>
                <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                <SelectItem value="powerpoint">PowerPoint Presentation</SelectItem>
                <SelectItem value="csv">CSV Data Export</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button onClick={generateReport}>
              <Download className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
            <Button variant="outline" onClick={scheduleReport}>
              <Calendar className="w-4 h-4 mr-2" />
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
              { name: "Event Performance Report", date: "2024-01-15", size: "2.3 MB", status: "Ready" },
              { name: "Survey Analysis Report", date: "2024-01-14", size: "1.8 MB", status: "Ready" },
              { name: "Guest Engagement Report", date: "2024-01-13", size: "3.1 MB", status: "Ready" }
            ].map((report, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium">{report.name}</p>
                    <p className="text-sm text-gray-600">Generated on {report.date} • {report.size}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{report.status}</Badge>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4" />
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
