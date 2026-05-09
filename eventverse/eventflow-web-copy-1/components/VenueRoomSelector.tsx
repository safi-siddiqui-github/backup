"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Camera,
  ChevronRight,
  Clock,
  Home,
  MapPin,
  Users,
  Utensils,
} from "lucide-react";
import React, { useState } from "react";

interface VenueRoom {
  id: string;
  name: string;
  description: string;
  capacity: number;
  currentOccupancy: number;
  roomType: "main" | "bar" | "lounge" | "garden" | "private";
  upcomingActivities: string[];
  hasBar: boolean;
  hasPhotoBooth: boolean;
  isAccessible: boolean;
}

interface VenueRoomSelectorProps {
  currentRoomId: string;
  onRoomChange: (roomId: string) => void;
  eventSchedule?: unknown[];
}

export const VenueRoomSelector: React.FC<VenueRoomSelectorProps> = ({
  currentRoomId,
  onRoomChange,
  eventSchedule = [],
}) => {
  const [selectedRoom, setSelectedRoom] = useState(currentRoomId);

  // Mock venue rooms data
  const venueRooms: VenueRoom[] = [
    {
      id: "main-hall",
      name: "Main Reception Hall",
      description: "Primary celebration space with dining and dancing",
      capacity: 150,
      currentOccupancy: 89,
      roomType: "main",
      upcomingActivities: ["Dinner Service - 7:00 PM", "First Dance - 8:30 PM"],
      hasBar: true,
      hasPhotoBooth: false,
      isAccessible: true,
    },
    {
      id: "garden-terrace",
      name: "Garden Terrace",
      description: "Outdoor space for cocktails and mingling",
      capacity: 80,
      currentOccupancy: 34,
      roomType: "garden",
      upcomingActivities: ["Cocktail Hour - 6:00 PM"],
      hasBar: true,
      hasPhotoBooth: true,
      isAccessible: true,
    },
    {
      id: "lounge",
      name: "VIP Lounge",
      description: "Intimate space for close family and friends",
      capacity: 30,
      currentOccupancy: 12,
      roomType: "lounge",
      upcomingActivities: ["Private Toast - 9:00 PM"],
      hasBar: false,
      hasPhotoBooth: false,
      isAccessible: false,
    },
  ];

  const currentRoom =
    venueRooms.find((room) => room.id === selectedRoom) || venueRooms[0];

  const getOccupancyColor = (occupancy: number, capacity: number) => {
    const percentage = (occupancy / capacity) * 100;
    if (percentage < 50) return "text-success";
    if (percentage < 80) return "text-warning";
    return "text-destructive";
  };

  const getRoomIcon = (roomType: string) => {
    switch (roomType) {
      case "main":
        return Users;
      case "bar":
        return Utensils;
      case "lounge":
        return Home;
      case "garden":
        return MapPin;
      default:
        return MapPin;
    }
  };

  const handleRoomSelect = (roomId: string) => {
    setSelectedRoom(roomId);
    onRoomChange(roomId);
  };

  const getUpcomingActivity = (activities: string[]) => {
    return activities.length > 0 ? activities[0] : "No scheduled activities";
  };

  return (
    <div className="space-y-6">
      {/* Header with current room info */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-foreground text-xl font-semibold">
            Venue Navigation
          </h2>
          <p className="text-muted-foreground text-sm">
            Explore different areas of the venue
          </p>
        </div>

        {currentRoomId !== selectedRoom && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleRoomSelect(currentRoomId)}
            className="text-xs"
          >
            <Home className="mr-1 h-3 w-3" />
            My Room
          </Button>
        )}
      </div>

      {/* Current/Selected room details */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            {React.createElement(getRoomIcon(currentRoom.roomType), {
              className: "h-6 w-6 text-primary mt-1",
            })}

            <div className="flex-1">
              <div className="mb-2 flex items-center gap-2">
                <h3 className="text-foreground text-lg font-medium">
                  {currentRoom.name}
                </h3>
                {selectedRoom === currentRoomId && (
                  <Badge
                    variant="secondary"
                    className="text-xs"
                  >
                    Current Room
                  </Badge>
                )}
              </div>

              <p className="text-muted-foreground mb-3 text-sm">
                {currentRoom.description}
              </p>

              <div className="mb-4 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Users className="text-muted-foreground h-4 w-4" />
                  <span
                    className={`text-sm font-medium ${getOccupancyColor(currentRoom.currentOccupancy, currentRoom.capacity)}`}
                  >
                    {currentRoom.currentOccupancy}/{currentRoom.capacity} guests
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="text-muted-foreground h-4 w-4" />
                  <span className="text-muted-foreground text-sm">
                    {getUpcomingActivity(currentRoom.upcomingActivities)}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                {currentRoom.hasBar && (
                  <Badge
                    variant="outline"
                    className="text-xs"
                  >
                    <Utensils className="mr-1 h-3 w-3" />
                    Bar Available
                  </Badge>
                )}
                {currentRoom.hasPhotoBooth && (
                  <Badge
                    variant="outline"
                    className="text-xs"
                  >
                    <Camera className="mr-1 h-3 w-3" />
                    Photo Booth
                  </Badge>
                )}
                {currentRoom.isAccessible && (
                  <Badge
                    variant="outline"
                    className="text-xs"
                  >
                    ♿ Accessible
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* All venue rooms */}
      <div className="space-y-3">
        <h3 className="text-foreground text-base font-medium">
          All Venue Areas
        </h3>

        <div className="grid gap-3">
          {venueRooms.map((room) => {
            const RoomIcon = getRoomIcon(room.roomType);
            const isCurrentRoom = room.id === currentRoomId;
            const isSelected = room.id === selectedRoom;

            return (
              <Card
                key={room.id}
                className={`cursor-pointer border-0 shadow-sm transition-all hover:shadow-md ${
                  isSelected ? "ring-primary ring-2 ring-offset-2" : ""
                }`}
                onClick={() => handleRoomSelect(room.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <RoomIcon className="text-muted-foreground h-5 w-5" />

                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <h4 className="text-foreground font-medium">
                          {room.name}
                        </h4>
                        {isCurrentRoom && (
                          <Badge
                            variant="secondary"
                            className="text-xs"
                          >
                            Your Location
                          </Badge>
                        )}
                      </div>

                      <p className="text-muted-foreground mb-2 text-xs">
                        {room.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs ${getOccupancyColor(room.currentOccupancy, room.capacity)}`}
                        >
                          {room.currentOccupancy}/{room.capacity} guests
                        </span>

                        <div className="text-muted-foreground flex items-center gap-1 text-xs">
                          <Clock className="h-3 w-3" />
                          Next:{" "}
                          {getUpcomingActivity(room.upcomingActivities).split(
                            " - ",
                          )[1] || "TBD"}
                        </div>
                      </div>
                    </div>

                    <ChevronRight className="text-muted-foreground h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Simple legend */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="text-muted-foreground flex items-center justify-between text-xs">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <div className="bg-success h-2 w-2 rounded-full" />
                <span>Available</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="bg-warning h-2 w-2 rounded-full" />
                <span>Busy</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="bg-destructive h-2 w-2 rounded-full" />
                <span>Full</span>
              </div>
            </div>
            <span>Live occupancy updates</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
