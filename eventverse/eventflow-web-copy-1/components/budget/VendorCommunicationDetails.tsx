"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { VendorProfile } from "@/types/budget";
import {
  Calendar,
  FileText,
  Mail,
  MessageSquare,
  Phone,
  Send,
} from "lucide-react";
import { useState } from "react";
import type { VendorCommunication } from "./VendorManagementHub";

interface VendorCommunicationDetailsProps {
  vendor: VendorProfile;
  communications: VendorCommunication[];
  onContactVendor: (vendorId: string, message: string) => void;
}

const VendorCommunicationDetails = ({
  vendor,
  communications,
  onContactVendor,
}: VendorCommunicationDetailsProps) => {
  const [newMessage, setNewMessage] = useState("");
  const [messageType, setMessageType] = useState<"email" | "message">(
    "message",
  );

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onContactVendor(vendor.id, newMessage);
      setNewMessage("");
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail className="h-4 w-4" />;
      case "call":
        return <Phone className="h-4 w-4" />;
      case "meeting":
        return <Calendar className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "email":
        return "bg-blue-100 text-blue-800";
      case "call":
        return "bg-green-100 text-green-800";
      case "meeting":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Mock recent communications with attachments property
  const recentCommunications = [
    {
      id: "comm-1",
      type: "email" as const,
      subject: "Contract Confirmation",
      content:
        "Thank you for accepting our proposal. We've attached the final contract for your review. Please let us know if you have any questions.",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      sender: "vendor" as const,
      attachments: [
        "Final_Contract_GourmetCelebrations.pdf",
        "Terms_and_Conditions.pdf",
      ],
    },
    {
      id: "comm-2",
      type: "message" as const,
      subject: "Menu Tasting Schedule",
      content:
        "We'd like to schedule the menu tasting for next week. Are you available Tuesday or Wednesday afternoon?",
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      sender: "host" as const,
      attachments: [],
    },
    {
      id: "comm-3",
      type: "call" as const,
      subject: "Initial Consultation Call",
      content:
        "30-minute call to discuss event requirements, guest count, and initial menu preferences.",
      date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      sender: "vendor" as const,
      attachments: ["Call_Summary_Notes.pdf"],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-4">
        <Button className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          Send Message
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2"
        >
          <Mail className="h-4 w-4" />
          Send Email
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2"
        >
          <Calendar className="h-4 w-4" />
          Schedule Meeting
        </Button>
      </div>

      {/* Send New Message */}
      <Card>
        <CardHeader>
          <CardTitle>Send Message</CardTitle>
          <CardDescription>Contact {vendor.name} directly</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Input
              placeholder="Subject"
              className="mb-2"
            />
            <Textarea
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              rows={4}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Badge variant="outline">To: {vendor.contact.email}</Badge>
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
            >
              <Send className="mr-2 h-4 w-4" />
              Send Message
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Communication History */}
      <Card>
        <CardHeader>
          <CardTitle>Communication History</CardTitle>
          <CardDescription>
            All conversations and interactions with this vendor
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentCommunications.map((comm) => (
              <div
                key={comm.id}
                className="rounded-lg border p-4"
              >
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded bg-gray-100 p-2">
                      {getTypeIcon(comm.type)}
                    </div>
                    <div>
                      <h4 className="font-medium">{comm.subject}</h4>
                      <div className="mt-1 flex items-center gap-2">
                        <Badge className={getTypeColor(comm.type)}>
                          {comm.type}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {comm.sender === "host" ? "You" : vendor.name}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {comm.date.toLocaleDateString()}
                  </span>
                </div>

                <p className="text-sm leading-relaxed text-gray-700">
                  {comm.content}
                </p>

                {comm.attachments && comm.attachments.length > 0 && (
                  <div className="mt-3 border-t pt-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FileText className="h-4 w-4" />
                      <span>
                        {comm.attachments.length} attachment
                        {comm.attachments.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Communication Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Communication Summary</CardTitle>
          <CardDescription>
            Overview of interactions with this vendor
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-lg font-medium">12</div>
              <div className="text-sm text-gray-600">Total Messages</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-medium">3</div>
              <div className="text-sm text-gray-600">Email Threads</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-medium">2</div>
              <div className="text-sm text-gray-600">Phone Calls</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-medium">1.2h</div>
              <div className="text-sm text-gray-600">Avg Response</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorCommunicationDetails;
