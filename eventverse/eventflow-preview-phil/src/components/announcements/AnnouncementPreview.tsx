
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Send, Edit } from "lucide-react";
import { format } from "date-fns";

interface AnnouncementPreviewProps {
  announcement: any;
  onBack: () => void;
  onSend: () => void;
}

const AnnouncementPreview = ({ announcement, onBack, onSend }: AnnouncementPreviewProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Preview Announcement</h1>
                <p className="text-gray-600">Review how your announcement will appear to attendees</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={onBack}>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button onClick={onSend} className="bg-blue-600 hover:bg-blue-700">
                <Send className="w-4 h-4 mr-2" />
                Send Announcement
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Mobile Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Mobile View</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-w-sm mx-auto bg-gray-900 rounded-[2.5rem] p-3">
                <div className="bg-white rounded-[2rem] p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Event Updates</h3>
                    <Badge className="bg-red-500 text-white text-xs">1</Badge>
                  </div>
                  
                  <div className="border rounded-lg p-4 bg-blue-50 border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={
                        announcement.priority === 'high' ? 'bg-red-500' :
                        announcement.priority === 'medium' ? 'bg-orange-500' : 'bg-blue-500'
                      }>
                        {announcement.priority}
                      </Badge>
                      <Badge variant="outline">New</Badge>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{announcement.title}</h4>
                    <p className="text-sm text-gray-700 mb-3">{announcement.content}</p>
                    <p className="text-xs text-gray-500">
                      {format(new Date(), 'MMM d, h:mm a')} • To: {announcement.targetAudience === 'all' ? 'All Attendees' : announcement.targetAudience.toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Email Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Email Notification</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg bg-white p-6">
                <div className="border-b pb-4 mb-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">EventVerse Notification</h3>
                    <span className="text-sm text-gray-500">{format(new Date(), 'MMM d, yyyy h:mm a')}</span>
                  </div>
                  <p className="text-gray-600">event-updates@eventverse.com</p>
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-gray-900">{announcement.title}</h2>
                  
                  <div className="flex gap-2">
                    <Badge className={
                      announcement.priority === 'high' ? 'bg-red-500' :
                      announcement.priority === 'medium' ? 'bg-orange-500' : 'bg-blue-500'
                    }>
                      {announcement.priority} priority
                    </Badge>
                    <Badge variant="outline">{announcement.type.replace('-', ' ')}</Badge>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed">{announcement.content}</p>
                  
                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-600">
                      This message was sent to {announcement.targetAudience === 'all' ? 'all attendees' : `${announcement.targetAudience} attendees`} 
                      of your upcoming event.
                    </p>
                  </div>
                  
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    View Event Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementPreview;
