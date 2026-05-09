"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Camera,
  DoorOpen,
  Eye,
  EyeOff,
  MapPin,
  RotateCcw,
  User,
  Users,
  Utensils,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import React, { useState } from "react";
import { GuestDiscoveryTab } from "./GuestDiscoveryTab";
import { VenueRoomSelector } from "./VenueRoomSelector";

interface EnhancedGuestSeatingViewProps {
  guestName: string;
  guestEmail: string;
  tableNumber: number;
  seatNumber: number;
}

interface VenueFeature {
  id: string;
  name: string;
  type: "bar" | "restroom" | "exit" | "stage" | "photo_booth" | "gift_table";
  x: number;
  y: number;
}

interface TableGuest {
  id: string;
  name: string;
  avatar?: string;
  relationToHost: string;
  dietaryRestrictions: string[];
}

export const EnhancedGuestSeatingView: React.FC<
  EnhancedGuestSeatingViewProps
> = ({ guestName, guestEmail, tableNumber, seatNumber }) => {
  const [activeRoom, setActiveRoom] = useState("main-hall");
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [showVenueInfo, setShowVenueInfo] = useState(true);

  // Mock venue features
  const venueFeatures: VenueFeature[] = [
    { id: "1", name: "Main Bar", type: "bar", x: 100, y: 50 },
    { id: "2", name: "Men's Restroom", type: "restroom", x: 300, y: 30 },
    { id: "3", name: "Women's Restroom", type: "restroom", x: 320, y: 30 },
    { id: "4", name: "Emergency Exit", type: "exit", x: 400, y: 100 },
    { id: "5", name: "Main Stage", type: "stage", x: 200, y: 250 },
    { id: "6", name: "Photo Booth", type: "photo_booth", x: 50, y: 200 },
    { id: "7", name: "Gift Table", type: "gift_table", x: 350, y: 180 },
  ];

  // Mock tables (simplified positions)
  const tables = [
    { number: 1, x: 150, y: 100, guests: 8 },
    { number: 2, x: 250, y: 100, guests: 6 },
    { number: 3, x: 150, y: 150, guests: 8 }, // Guest's table
    { number: 4, x: 250, y: 150, guests: 8 },
    { number: 5, x: 200, y: 200, guests: 10 },
  ];

  // Mock table guests for selected table
  const tableGuests: TableGuest[] = [
    {
      id: "1",
      name: "Emma Thompson",
      avatar: "/api/placeholder/32/32",
      relationToHost: "College Friend",
      dietaryRestrictions: ["vegetarian"],
    },
    {
      id: "2",
      name: "Michael Chen",
      avatar: "/api/placeholder/32/32",
      relationToHost: "Work Colleague",
      dietaryRestrictions: [],
    },
    {
      id: "3",
      name: guestName,
      relationToHost: "Guest",
      dietaryRestrictions: [],
    },
  ];

  const getFeatureIcon = (type: string) => {
    switch (type) {
      case "bar":
        return Utensils;
      case "restroom":
        return User;
      case "exit":
        return DoorOpen;
      case "stage":
        return Camera;
      case "photo_booth":
        return Camera;
      case "gift_table":
        return MapPin;
      default:
        return MapPin;
    }
  };

  const getFeatureColor = (type: string) => {
    switch (type) {
      case "bar":
        return "text-primary";
      case "restroom":
        return "text-muted-foreground";
      case "exit":
        return "text-destructive";
      case "stage":
        return "text-warning";
      case "photo_booth":
        return "text-success";
      case "gift_table":
        return "text-accent-foreground";
      default:
        return "text-muted-foreground";
    }
  };

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.2, 0.5));
  const handleResetZoom = () => setZoomLevel(1);
  const handleTableClick = (tableNum: number) => {
    setSelectedTable(selectedTable === tableNum ? null : tableNum);
  };

  return (
    <div className="space-y-6">
      {/* Clean hero header */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="space-y-2 text-center">
            <h1 className="text-foreground text-2xl font-semibold">
              Welcome to the Celebration
            </h1>
            <p className="text-muted-foreground">
              Hi {guestName}! You&apos;re seated at Table {tableNumber}, Seat{" "}
              {seatNumber}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Main tabs */}
      <Tabs
        defaultValue="venue"
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="venue">Interactive Venue</TabsTrigger>
          <TabsTrigger value="guests">Discover Guests</TabsTrigger>
          <TabsTrigger value="details">My Details</TabsTrigger>
        </TabsList>

        <TabsContent
          value="venue"
          className="space-y-6"
        >
          {/* Room selector */}
          <VenueRoomSelector
            currentRoomId={activeRoom}
            onRoomChange={setActiveRoom}
          />

          {/* Venue map controls */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Venue Layout</CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowVenueInfo(!showVenueInfo)}
                  >
                    {showVenueInfo ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                    <span className="ml-1 text-xs">
                      {showVenueInfo ? "Hide" : "Show"} Info
                    </span>
                  </Button>
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleZoomOut}
                    >
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleResetZoom}
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleZoomIn}
                    >
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {/* Interactive venue map */}
              <div
                className="bg-muted/30 relative overflow-hidden rounded-lg"
                style={{ height: "400px" }}
              >
                <div
                  className="relative h-full w-full"
                  style={{
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: "center center",
                    transition: "transform 0.2s ease",
                  }}
                >
                  {/* Venue features */}
                  {venueFeatures.map((feature) => {
                    const FeatureIcon = getFeatureIcon(feature.type);
                    return (
                      <div
                        key={feature.id}
                        className="group absolute cursor-pointer"
                        style={{
                          left: `${feature.x}px`,
                          top: `${feature.y}px`,
                        }}
                        title={feature.name}
                      >
                        <div className="relative">
                          <FeatureIcon
                            className={`h-6 w-6 ${getFeatureColor(feature.type)} transition-transform group-hover:scale-110`}
                          />
                          {showVenueInfo && (
                            <div className="bg-card border-border absolute -top-8 left-1/2 -translate-x-1/2 transform rounded border px-2 py-1 text-xs whitespace-nowrap opacity-0 transition-opacity group-hover:opacity-100">
                              {feature.name}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {/* Tables */}
                  {tables.map((table) => (
                    <div
                      key={table.number}
                      className={`group absolute cursor-pointer`}
                      style={{ left: `${table.x}px`, top: `${table.y}px` }}
                      onClick={() => handleTableClick(table.number)}
                    >
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full border-2 text-sm font-medium transition-all ${
                          table.number === tableNumber
                            ? "bg-primary text-primary-foreground border-primary shadow-lg"
                            : selectedTable === table.number
                              ? "bg-accent text-accent-foreground border-accent"
                              : "bg-card text-card-foreground border-border hover:border-primary hover:shadow-md"
                        }`}
                      >
                        {table.number}
                      </div>
                      {showVenueInfo && (
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 transform text-center text-xs opacity-0 transition-opacity group-hover:opacity-100">
                          <div className="bg-card border-border rounded border px-2 py-1 whitespace-nowrap">
                            {table.guests} guests
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Table details when selected */}
              {selectedTable && (
                <div className="bg-muted/30 mt-4 rounded-lg p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <Users className="text-muted-foreground h-4 w-4" />
                    <span className="font-medium">Table {selectedTable}</span>
                    {selectedTable === tableNumber && (
                      <Badge
                        variant="secondary"
                        className="text-xs"
                      >
                        Your Table
                      </Badge>
                    )}
                  </div>
                  <div className="grid max-h-20 gap-2 overflow-y-auto">
                    {tableGuests.map((guest) => (
                      <div
                        key={guest.id}
                        className="flex items-center gap-3 text-sm"
                      >
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={guest.avatar}
                            alt={guest.name}
                          />
                          <AvatarFallback className="text-xs">
                            {guest.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-foreground">{guest.name}</span>
                        <span className="text-muted-foreground">
                          • {guest.relationToHost}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Simple venue guide */}
          {showVenueInfo && (
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
                  <div className="flex items-center gap-2">
                    <Utensils className="text-primary h-4 w-4" />
                    <span className="text-muted-foreground">Bar & Drinks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="text-muted-foreground h-4 w-4" />
                    <span className="text-muted-foreground">Restrooms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Camera className="text-success h-4 w-4" />
                    <span className="text-muted-foreground">Photo Booth</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DoorOpen className="text-destructive h-4 w-4" />
                    <span className="text-muted-foreground">
                      Emergency Exit
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="guests">
          <GuestDiscoveryTab
            currentGuest={{ name: guestName, email: guestEmail }}
            eventId="attend-1"
          />
        </TabsContent>

        <TabsContent
          value="details"
          className="space-y-6"
        >
          {/* My seating info */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">
                Your Seating Assignment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/30 rounded-lg p-4 text-center">
                  <div className="text-foreground text-2xl font-semibold">
                    {tableNumber}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Table Number
                  </div>
                </div>
                <div className="bg-muted/30 rounded-lg p-4 text-center">
                  <div className="text-foreground text-2xl font-semibold">
                    {seatNumber}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Seat Number
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 rounded-lg p-4">
                <h4 className="text-foreground mb-3 font-medium">
                  Your Table Companions
                </h4>
                <div className="space-y-2">
                  {tableGuests
                    .filter((guest) => guest.name !== guestName)
                    .map((guest) => (
                      <div
                        key={guest.id}
                        className="flex items-center gap-3"
                      >
                        <Avatar className="h-8 w-8">
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
                        <div>
                          <div className="text-foreground text-sm font-medium">
                            {guest.name}
                          </div>
                          <div className="text-muted-foreground text-xs">
                            {guest.relationToHost}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dining preferences */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Dining Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">
                    Menu Selection
                  </span>
                  <span className="text-foreground text-sm font-medium">
                    Chicken Marsala
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">
                    Dietary Restrictions
                  </span>
                  <span className="text-foreground text-sm font-medium">
                    None
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">
                    Beverage Preference
                  </span>
                  <span className="text-foreground text-sm font-medium">
                    Wine Package
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
