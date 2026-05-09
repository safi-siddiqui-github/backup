"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { VendorProfile } from "@/types/budget";
import {
  Calendar,
  Mail,
  MessageSquare,
  Paperclip,
  Phone,
  Search,
  Send,
} from "lucide-react";
import { useState } from "react";
import type { VendorCommunication } from "./VendorManagementHub";

interface VendorCommunicationCenterProps {
  communications: VendorCommunication[];
  vendors: VendorProfile[];
  onContactVendor: (vendorId: string, message: string) => void;
}

const VendorCommunicationCenter = ({
  communications,
  vendors,
  onContactVendor,
}: VendorCommunicationCenterProps) => {
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [messageType, setMessageType] = useState<"email" | "message">(
    "message",
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  // Group communications by vendor
  const communicationsByVendor = communications.reduce(
    (acc, comm) => {
      if (!acc[comm.vendorId]) acc[comm.vendorId] = [];
      acc[comm.vendorId].push(comm);
      return acc;
    },
    {} as Record<string, VendorCommunication[]>,
  );

  // Filter communications
  const filteredCommunications = communications.filter((comm) => {
    const vendor = vendors.find((v) => v.id === comm.vendorId);
    const matchesSearch =
      vendor?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comm.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comm.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || comm.type === typeFilter;
    return matchesSearch && matchesType;
  });

  // Sort communications by date (newest first)
  const sortedCommunications = [...filteredCommunications].sort(
    (a, b) => b.date.getTime() - a.date.getTime(),
  );

  const handleSendMessage = () => {
    if (!selectedVendor || !newMessage.trim()) return;

    onContactVendor(selectedVendor, newMessage);
    setNewMessage("");
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

  // Calculate communication stats
  const totalCommunications = communications.length;
  const recentCommunications = communications.filter(
    (c) => c.date >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  ).length;
  const pendingResponses = communications.filter(
    (c) =>
      c.sender === "vendor" &&
      c.date >= new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  ).length;

  return (
    <div className="space-y-6">
      {/* Communication Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Messages</p>
                <p className="text-2xl font-bold">{totalCommunications}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">This Week</p>
                <p className="text-2xl font-bold">{recentCommunications}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Active Vendors</p>
                <p className="text-2xl font-bold">
                  {Object.keys(communicationsByVendor).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Pending Responses</p>
                <p className="text-2xl font-bold">{pendingResponses}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                <Input
                  placeholder="Search communications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select
              value={typeFilter}
              onValueChange={setTypeFilter}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="call">Phone Call</SelectItem>
                <SelectItem value="meeting">Meeting</SelectItem>
                <SelectItem value="message">Message</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Vendor List */}
        <Card>
          <CardHeader>
            <CardTitle>Vendors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {vendors.map((vendor) => {
                const vendorComms = communicationsByVendor[vendor.id] || [];
                const lastComm = vendorComms.sort(
                  (a, b) => b.date.getTime() - a.date.getTime(),
                )[0];
                const unreadCount = vendorComms.filter(
                  (c) =>
                    c.sender === "vendor" &&
                    c.date >= new Date(Date.now() - 24 * 60 * 60 * 1000),
                ).length;

                return (
                  <div
                    key={vendor.id}
                    className={`cursor-pointer rounded-lg border p-3 transition-colors hover:bg-gray-50 ${
                      selectedVendor === vendor.id
                        ? "border-blue-500 bg-blue-50"
                        : ""
                    }`}
                    onClick={() => setSelectedVendor(vendor.id)}
                  >
                    <div className="mb-2 flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{vendor.name}</h4>
                        <p className="text-sm text-gray-600">
                          {vendor.category}
                        </p>
                      </div>
                      {unreadCount > 0 && (
                        <Badge className="bg-red-100 text-red-800">
                          {unreadCount} new
                        </Badge>
                      )}
                    </div>

                    {lastComm && (
                      <div>
                        <p className="truncate text-sm text-gray-700">
                          {lastComm.subject}
                        </p>
                        <p className="text-xs text-gray-500">
                          {lastComm.date.toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Communication History */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Communication History</span>
              {selectedVendor && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Call
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule
                  </Button>
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedVendor ? (
              <div className="space-y-4">
                {/* New Message Form */}
                <div className="rounded-lg bg-gray-50 p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <Select
                      value={messageType}
                      onValueChange={(value: "email" | "message") =>
                        setMessageType(value)
                      }
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="message">Message</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                      </SelectContent>
                    </Select>
                    <span className="text-sm text-gray-600">
                      to {vendors.find((v) => v.id === selectedVendor)?.name}
                    </span>
                  </div>

                  <Textarea
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="mb-3"
                    rows={3}
                  />

                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                    >
                      <Paperclip className="mr-2 h-4 w-4" />
                      Attach
                    </Button>
                    <Button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Send
                    </Button>
                  </div>
                </div>

                {/* Message History */}
                <div className="max-h-96 space-y-3 overflow-y-auto">
                  {communicationsByVendor[selectedVendor]
                    ?.sort((a, b) => b.date.getTime() - a.date.getTime())
                    .map((comm) => (
                      <div
                        key={comm.id}
                        className={`rounded-lg p-3 ${
                          comm.sender === "host"
                            ? "ml-8 bg-blue-50"
                            : "mr-8 bg-gray-50"
                        }`}
                      >
                        <div className="mb-2 flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <Badge className={getTypeColor(comm.type)}>
                              {getTypeIcon(comm.type)}
                              {comm.type}
                            </Badge>
                            <span className="text-sm font-medium">
                              {comm.sender === "host"
                                ? "You"
                                : vendors.find((v) => v.id === comm.vendorId)
                                    ?.name}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">
                            {comm.date.toLocaleDateString()}{" "}
                            {comm.date.toLocaleTimeString()}
                          </span>
                        </div>

                        <h4 className="mb-1 font-medium">{comm.subject}</h4>
                        <p className="text-sm text-gray-700">{comm.content}</p>

                        {comm.attachments && comm.attachments.length > 0 && (
                          <div className="mt-2">
                            <p className="mb-1 text-xs text-gray-500">
                              Attachments:
                            </p>
                            {comm.attachments.map((attachment, index) => (
                              <span
                                key={index}
                                className="mr-2 rounded bg-white px-2 py-1 text-xs"
                              >
                                {attachment}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              <div className="py-8 text-center">
                <MessageSquare className="mx-auto mb-2 h-12 w-12 text-gray-300" />
                <p className="text-gray-500">
                  Select a vendor to view communication history
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VendorCommunicationCenter;
