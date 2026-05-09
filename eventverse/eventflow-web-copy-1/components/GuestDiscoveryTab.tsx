"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Heart,
  MapPin,
  MessageSquare,
  Search,
  UserPlus,
  Users,
} from "lucide-react";
import React, { useState } from "react";

// Mock data - same structure as before but cleaner display
const mockGuests = [
  {
    id: "1",
    name: "Emma Thompson",
    email: "emma.thompson@email.com",
    relationToHost: "College Friend",
    rsvpStatus: "confirmed",
    tableNumber: 3,
    seatNumber: 2,
    dietaryRestrictions: ["vegetarian"],
    interests: ["photography", "travel"],
    mutualConnections: 2,
    avatar: "/api/placeholder/32/32",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    relationToHost: "Work Colleague",
    rsvpStatus: "confirmed",
    tableNumber: 5,
    seatNumber: 1,
    dietaryRestrictions: [],
    interests: ["music", "cooking"],
    mutualConnections: 1,
    avatar: "/api/placeholder/32/32",
  },
  {
    id: "3",
    name: "Sarah Williams",
    email: "sarah.williams@email.com",
    relationToHost: "Family Friend",
    rsvpStatus: "pending",
    tableNumber: 2,
    seatNumber: 4,
    dietaryRestrictions: ["gluten-free"],
    interests: ["reading", "yoga"],
    mutualConnections: 3,
    avatar: "/api/placeholder/32/32",
  },
];

interface GuestDiscoveryTabProps {
  currentGuest: {
    name: string;
    email: string;
  };
  eventId: string;
}

export const GuestDiscoveryTab: React.FC<GuestDiscoveryTabProps> = ({
  currentGuest,
  eventId,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filterOptions = [
    { value: "all", label: "All Guests", count: mockGuests.length },
    {
      value: "confirmed",
      label: "Confirmed",
      count: mockGuests.filter((g) => g.rsvpStatus === "confirmed").length,
    },
    {
      value: "mutual",
      label: "Mutual Friends",
      count: mockGuests.filter((g) => g.mutualConnections > 0).length,
    },
  ];

  const filteredGuests = mockGuests.filter((guest) => {
    const matchesSearch =
      guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.relationToHost.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "confirmed" && guest.rsvpStatus === "confirmed") ||
      (selectedFilter === "mutual" && guest.mutualConnections > 0);

    return matchesSearch && matchesFilter;
  });

  const handleConnect = (guestId: string) => {
    console.log("Connecting with guest:", guestId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-success text-success-foreground";
      case "pending":
        return "bg-warning text-warning-foreground";
      case "declined":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Clean stats header */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-foreground text-2xl font-semibold">
                {mockGuests.length}
              </div>
              <div className="text-muted-foreground text-sm">Total Guests</div>
            </div>
            <div>
              <div className="text-foreground text-2xl font-semibold">
                {mockGuests.filter((g) => g.rsvpStatus === "confirmed").length}
              </div>
              <div className="text-muted-foreground text-sm">Confirmed</div>
            </div>
            <div>
              <div className="text-foreground text-2xl font-semibold">
                {mockGuests.filter((g) => g.mutualConnections > 0).length}
              </div>
              <div className="text-muted-foreground text-sm">
                Mutual Friends
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Simple search and filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
          <Input
            placeholder="Search guests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          {filterOptions.map((option) => (
            <Button
              key={option.value}
              variant={selectedFilter === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter(option.value)}
              className="text-sm"
            >
              {option.label} ({option.count})
            </Button>
          ))}
        </div>
      </div>

      {/* Clean guest list */}
      <div className="space-y-3">
        {filteredGuests.length === 0 ? (
          <Card className="border-0 shadow-sm">
            <CardContent className="p-8 text-center">
              <Users className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
              <p className="text-muted-foreground">No guests found</p>
            </CardContent>
          </Card>
        ) : (
          filteredGuests.map((guest) => (
            <Card
              key={guest.id}
              className="border-0 shadow-sm transition-shadow hover:shadow-md"
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={guest.avatar}
                      alt={guest.name}
                    />
                    <AvatarFallback>
                      {guest.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-foreground font-medium">
                        {guest.name}
                      </h3>
                      <div
                        className={`h-2 w-2 rounded-full ${getStatusColor(guest.rsvpStatus).split(" ")[0]}`}
                      />
                    </div>

                    <p className="text-muted-foreground text-sm">
                      {guest.relationToHost}
                    </p>

                    {guest.mutualConnections > 0 && (
                      <div className="text-muted-foreground flex items-center gap-1 text-xs">
                        <Heart className="h-3 w-3" />
                        {guest.mutualConnections} mutual friend
                        {guest.mutualConnections > 1 ? "s" : ""}
                      </div>
                    )}

                    <div className="text-muted-foreground flex items-center gap-1 text-xs">
                      <MapPin className="h-3 w-3" />
                      Table {guest.tableNumber}, Seat {guest.seatNumber}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleConnect(guest.id)}
                      className="h-8 px-3"
                    >
                      <UserPlus className="mr-1 h-3 w-3" />
                      Connect
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 px-3"
                    >
                      <MessageSquare className="mr-1 h-3 w-3" />
                      Message
                    </Button>
                  </div>
                </div>

                {(guest.interests.length > 0 ||
                  guest.dietaryRestrictions.length > 0) && (
                  <div className="border-border mt-3 border-t pt-3">
                    <div className="flex flex-wrap gap-1">
                      {guest.interests.map((interest) => (
                        <Badge
                          key={interest}
                          variant="secondary"
                          className="px-2 py-0.5 text-xs"
                        >
                          {interest}
                        </Badge>
                      ))}
                      {guest.dietaryRestrictions.map((restriction) => (
                        <Badge
                          key={restriction}
                          variant="outline"
                          className="border-warning text-warning-foreground px-2 py-0.5 text-xs"
                        >
                          {restriction}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
