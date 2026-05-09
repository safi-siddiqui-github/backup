"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Announcement } from "@/hooks/useAnnouncementStorage";
import { format } from "date-fns";
import { ArrowLeft, Edit, Send } from "lucide-react";

interface AnnouncementPreviewProps {
  announcement: Partial<Announcement>;
  onBack: () => void;
  onSend: () => void;
}

const AnnouncementPreview = ({
  announcement,
  onBack,
  onSend,
}: AnnouncementPreviewProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-4xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="p-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Preview Announcement
                </h1>
                <p className="text-gray-600">
                  Review how your announcement will appear to attendees
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={onBack}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button
                onClick={onSend}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Send className="mr-2 h-4 w-4" />
                Send Announcement
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-8">
        <div className="space-y-8">
          {/* Mobile Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Mobile View</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mx-auto max-w-sm rounded-[2.5rem] bg-gray-900 p-3">
                <div className="space-y-4 rounded-[2rem] bg-white p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Event Updates</h3>
                    <Badge className="bg-red-500 text-xs text-white">1</Badge>
                  </div>

                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Badge
                        className={
                          announcement.priority === "high"
                            ? "bg-red-500"
                            : announcement.priority === "medium"
                              ? "bg-orange-500"
                              : "bg-blue-500"
                        }
                      >
                        {announcement.priority}
                      </Badge>
                      <Badge variant="outline">New</Badge>
                    </div>
                    <h4 className="mb-2 font-semibold text-gray-900">
                      {announcement.title}
                    </h4>
                    <p className="mb-3 text-sm text-gray-700">
                      {announcement.content}
                    </p>
                    <p className="text-xs text-gray-500">
                      {format(new Date(), "MMM d, h:mm a")} • To:{" "}
                      {announcement.targetAudience === "all"
                        ? "All Attendees"
                        : announcement?.targetAudience?.toUpperCase()}
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
              <div className="rounded-lg border bg-white p-6">
                <div className="mb-4 border-b pb-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">
                      EventFlow Notification
                    </h3>
                    <span className="text-sm text-gray-500">
                      {format(new Date(), "MMM d, yyyy h:mm a")}
                    </span>
                  </div>
                  <p className="text-gray-600">event-updates@eventflow.com</p>
                </div>

                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-gray-900">
                    {announcement.title}
                  </h2>

                  <div className="flex gap-2">
                    <Badge
                      className={
                        announcement.priority === "high"
                          ? "bg-red-500"
                          : announcement.priority === "medium"
                            ? "bg-orange-500"
                            : "bg-blue-500"
                      }
                    >
                      {announcement.priority} priority
                    </Badge>
                    <Badge variant="outline">
                      {announcement?.type?.replace("-", " ")}
                    </Badge>
                  </div>

                  <p className="leading-relaxed text-gray-700">
                    {announcement.content}
                  </p>

                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-600">
                      This message was sent to{" "}
                      {announcement.targetAudience === "all"
                        ? "all attendees"
                        : `${announcement.targetAudience} attendees`}
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
