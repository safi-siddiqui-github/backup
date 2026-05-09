import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Upload, Download, FileText, AlertTriangle } from "lucide-react";
import { EventSession, SessionTrack } from "@/types/conferenceScheduling";

interface BulkActionsToolbarProps {
  tracks: SessionTrack[];
  eventDates: Date[];
  locations: Array<{ name: string; address?: string }>;
  onSessionsImport: (sessions: EventSession[]) => void;
}

const sessionTemplates = {
  "tech-conference": {
    name: "Tech Conference",
    sessions: [
      { title: "Opening Keynote", type: "keynote" as const, startTime: "09:00", endTime: "10:00", capacity: 500, level: "all" as const },
      { title: "Coffee Break", type: "break" as const, startTime: "10:00", endTime: "10:30", capacity: 500, level: "all" as const },
      { title: "Technical Workshop", type: "workshop" as const, startTime: "10:30", endTime: "12:00", capacity: 50, level: "intermediate" as const },
      { title: "Lunch Break", type: "break" as const, startTime: "12:00", endTime: "13:00", capacity: 500, level: "all" as const },
      { title: "Panel Discussion", type: "panel" as const, startTime: "13:00", endTime: "14:00", capacity: 200, level: "all" as const },
      { title: "Networking Session", type: "networking" as const, startTime: "16:00", endTime: "17:00", capacity: 300, level: "all" as const }
    ]
  },
  "academic-conference": {
    name: "Academic Conference",
    sessions: [
      { title: "Research Presentation", type: "session" as const, startTime: "09:00", endTime: "09:30", capacity: 100, level: "advanced" as const },
      { title: "Poster Session", type: "session" as const, startTime: "10:00", endTime: "11:00", capacity: 150, level: "all" as const },
      { title: "Thesis Defense", type: "session" as const, startTime: "11:30", endTime: "12:30", capacity: 50, level: "advanced" as const }
    ]
  }
};

const BulkActionsToolbar = ({
  tracks,
  eventDates,
  locations,
  onSessionsImport
}: BulkActionsToolbarProps) => {
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  const [importText, setImportText] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [selectedDate, setSelectedDate] = useState(eventDates[0]);
  const [selectedTrack, setSelectedTrack] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [importErrors, setImportErrors] = useState<string[]>([]);

  const handleCSVImport = () => {
    try {
      const lines = importText.trim().split('\n');
      if (lines.length < 2) {
        setImportErrors(["CSV must have at least a header and one data row"]);
        return;
      }

      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
      const requiredHeaders = ['title', 'starttime', 'endtime'];
      const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));
      
      if (missingHeaders.length > 0) {
        setImportErrors([`Missing required headers: ${missingHeaders.join(', ')}`]);
        return;
      }

      const sessions: EventSession[] = [];
      const errors: string[] = [];

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim());
        const row: Record<string, string> = {};
        
        headers.forEach((header, index) => {
          row[header] = values[index] || '';
        });

        if (!row.title || !row.starttime || !row.endtime) {
          errors.push(`Row ${i + 1}: Missing required fields`);
          continue;
        }

        const session: EventSession = {
          id: Date.now().toString() + i,
          title: row.title,
          description: row.description || "",
          type: (row.type as any) || "session",
          trackId: row.trackid || selectedTrack || undefined,
          speakerNames: row.speakers ? row.speakers.split(';').map(s => s.trim()) : [],
          date: selectedDate,
          startTime: row.starttime,
          endTime: row.endtime,
          location: row.location || selectedLocation || locations[0]?.name || "",
          capacity: parseInt(row.capacity) || 100,
          registeredCount: 0,
          waitlistCount: 0,
          level: (row.level as any) || "all",
          tags: row.tags ? row.tags.split(';').map(t => t.trim()) : []
        };

        sessions.push(session);
      }

      if (errors.length > 0) {
        setImportErrors(errors);
        return;
      }

      onSessionsImport(sessions);
      setImportText("");
      setImportErrors([]);
      setShowImportDialog(false);
    } catch (error) {
      setImportErrors(["Failed to parse CSV. Please check the format."]);
    }
  };

  const handleTemplateApply = () => {
    if (!selectedTemplate || !selectedDate || !selectedLocation) {
      setImportErrors(["Please select template, date, and location"]);
      return;
    }

    const template = sessionTemplates[selectedTemplate as keyof typeof sessionTemplates];
    if (!template) return;

    const sessions: EventSession[] = template.sessions.map((sessionTemplate, index) => ({
      id: Date.now().toString() + index,
      title: sessionTemplate.title,
      description: "",
      type: sessionTemplate.type,
      trackId: selectedTrack || undefined,
      speakerNames: [],
      date: selectedDate,
      startTime: sessionTemplate.startTime,
      endTime: sessionTemplate.endTime,
      location: selectedLocation,
      capacity: sessionTemplate.capacity,
      registeredCount: 0,
      waitlistCount: 0,
      level: sessionTemplate.level,
      tags: []
    }));

    onSessionsImport(sessions);
    setSelectedTemplate("");
    setImportErrors([]);
    setShowTemplateDialog(false);
  };

  const generateCSVTemplate = () => {
    const csvContent = "title,type,starttime,endtime,location,capacity,speakers,description,level,trackid,tags\n" +
      "Sample Session,session,09:00,10:00,Main Hall,100,John Doe;Jane Smith,Session description,intermediate,track-1,tag1;tag2\n" +
      "Coffee Break,break,10:00,10:30,Lobby,200,,15-minute break,all,,";
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'session-import-template.csv');
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowImportDialog(true)}
          className="bg-primary/5 hover:bg-primary/10 border-primary/20"
        >
          <Upload className="w-4 h-4 mr-2" />
          Import CSV
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowTemplateDialog(true)}
          className="bg-primary/5 hover:bg-primary/10 border-primary/20"
        >
          <FileText className="w-4 h-4 mr-2" />
          Use Template
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={generateCSVTemplate}
          className="bg-primary/5 hover:bg-primary/10 border-primary/20"
        >
          <Download className="w-4 h-4 mr-2" />
          Download Template
        </Button>
      </div>

      {/* CSV Import Dialog */}
      <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
        <DialogContent className="max-w-2xl bg-card border-border">
          <DialogHeader>
            <DialogTitle>Import Sessions from CSV</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Default Date</Label>
                <Select 
                  value={selectedDate ? selectedDate.toISOString() : ""} 
                  onValueChange={(value) => setSelectedDate(new Date(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select date" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventDates.map((date, index) => (
                      <SelectItem key={index} value={date.toISOString()}>
                        Day {index + 1} - {date.toLocaleDateString()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Default Location</Label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location, index) => (
                      <SelectItem key={index} value={location.name}>
                        {location.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Default Track (Optional)</Label>
              <Select value={selectedTrack} onValueChange={setSelectedTrack}>
                <SelectTrigger>
                  <SelectValue placeholder="Select track" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">No default track</SelectItem>
                  {tracks.map(track => (
                    <SelectItem key={track.id} value={track.id}>{track.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>CSV Data</Label>
              <Textarea
                placeholder="Paste your CSV data here..."
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                rows={8}
              />
            </div>

            {importErrors.length > 0 && (
              <div className="bg-destructive/10 border border-destructive/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-destructive" />
                  <span className="text-sm font-medium text-destructive">Import Errors:</span>
                </div>
                <ul className="text-sm text-destructive space-y-1">
                  {importErrors.map((error, index) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowImportDialog(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleCSVImport} className="flex-1">
                Import Sessions
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Template Dialog */}
      <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
        <DialogContent className="max-w-lg bg-card border-border">
          <DialogHeader>
            <DialogTitle>Apply Session Template</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Template</Label>
              <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                <SelectTrigger>
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(sessionTemplates).map(([key, template]) => (
                    <SelectItem key={key} value={key}>{template.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Event Date</Label>
                <Select 
                  value={selectedDate ? selectedDate.toISOString() : ""} 
                  onValueChange={(value) => setSelectedDate(new Date(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select date" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventDates.map((date, index) => (
                      <SelectItem key={index} value={date.toISOString()}>
                        Day {index + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Location</Label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location, index) => (
                      <SelectItem key={index} value={location.name}>
                        {location.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {selectedTemplate && (
              <div className="bg-muted/50 rounded-lg p-3 border border-border">
                <h5 className="font-medium text-foreground mb-2">Template Preview:</h5>
                <div className="space-y-1">
                  {sessionTemplates[selectedTemplate as keyof typeof sessionTemplates].sessions.map((session, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <Badge variant="outline" className="text-xs">
                        {session.type}
                      </Badge>
                      <span className="text-foreground">{session.title}</span>
                      <span className="text-muted-foreground">
                        {session.startTime}-{session.endTime}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {importErrors.length > 0 && (
              <div className="bg-destructive/10 border border-destructive/50 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive" />
                  <span className="text-sm text-destructive">{importErrors[0]}</span>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowTemplateDialog(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleTemplateApply} className="flex-1">
                Apply Template
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BulkActionsToolbar;
