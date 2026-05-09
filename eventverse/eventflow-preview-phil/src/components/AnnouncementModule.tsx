
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EventAnnouncement } from "@/types";
import { ArrowLeft, Plus, Megaphone, BarChart3, MessageSquare } from "lucide-react";
import AnnouncementCreator from "./announcements/AnnouncementCreator";
import AnnouncementList from "./announcements/AnnouncementList";

import { useAnnouncementStorage } from "@/hooks/useAnnouncementStorage";

interface AnnouncementModuleProps {
  eventId: string;
  onBack: () => void;
}

const AnnouncementModule = ({ eventId, onBack }: AnnouncementModuleProps) => {
  
  const [showCreator, setShowCreator] = useState(false);
  const { announcements, createAnnouncement, updateAnnouncement, deleteAnnouncement } = useAnnouncementStorage(eventId);

// Local announcement interface for this component
interface LocalAnnouncement {
  id: string;
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  type: string;
  content: string;
  targetAudience: string;
  deliveryStatus: string;
  timestamp: Date;
  isRead: boolean;
  readCount: number;
  totalRecipients: number;
}

  const handleCreateAnnouncement = (announcementData: Partial<LocalAnnouncement>) => {
    createAnnouncement(announcementData as any);
    setShowCreator(false);
  };

  const handleEditAnnouncement = (id: string, data: Partial<LocalAnnouncement>) => {
    updateAnnouncement(id, data as any);
  };

  const handleDeleteAnnouncement = (id: string) => {
    deleteAnnouncement(id);
  };

  const totalAnnouncements = announcements.length;
  const urgentAnnouncements = announcements.filter(a => a.priority === 'high').length;
  const recentAnnouncements = announcements.filter(a => {
    const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return new Date(a.timestamp) > dayAgo;
  }).length;

  if (showCreator) {
    return (
      <AnnouncementCreator 
        onBack={() => setShowCreator(false)}
        onSave={handleCreateAnnouncement}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
                  <Megaphone className="w-6 h-6 text-primary" />
                  Event Announcements
                </h1>
                <p className="text-muted-foreground">Communicate with your event attendees</p>
              </div>
            </div>
            <Button 
              onClick={() => setShowCreator(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Announcement
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Announcements</p>
                  <p className="text-3xl font-bold text-foreground">{totalAnnouncements}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Urgent Messages</p>
                  <p className="text-3xl font-bold text-destructive">{urgentAnnouncements}</p>
                </div>
                <Badge className="bg-destructive text-destructive-foreground">High Priority</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Sent Today</p>
                  <p className="text-3xl font-bold text-primary">{recentAnnouncements}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Announcement Management</CardTitle>
                <CardDescription>Create, manage, and track your event announcements</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <AnnouncementList 
              announcements={announcements}
              onEdit={handleEditAnnouncement}
              onDelete={handleDeleteAnnouncement}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnnouncementModule;
