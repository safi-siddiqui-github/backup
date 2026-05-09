"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Guest } from "@/types/rsvp";
import { Heart, MapPin, Users, Utensils } from "lucide-react";

interface GuestSeatingViewProps {
  // guest: { name: string };
  guest: Partial<Guest>;
  tableNumber: number;
  seatNumber: number;
}

const GuestSeatingView = ({
  guest,
  tableNumber,
  seatNumber,
}: GuestSeatingViewProps) => {
  // Mock table guests data
  const tableGuests = [
    { name: "Sarah Johnson", relation: "Bride's Sister", seat: 1 },
    { name: "Mike Chen", relation: "College Friend", seat: 2 },
    { name: guest.name, relation: "You", seat: seatNumber },
    { name: "Emma Davis", relation: "Work Colleague", seat: 4 },
    { name: "James Wilson", relation: "Childhood Friend", seat: 5 },
    { name: "Lisa Brown", relation: "Family Friend", seat: 6 },
    { name: "David Garcia", relation: "Neighbor", seat: 7 },
    { name: "Rachel Lee", relation: "University Friend", seat: 8 },
  ];

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Card className="border-0 bg-gradient-to-r from-rose-500 to-purple-600 text-white">
        <CardContent className="p-6 text-center">
          <Users className="mx-auto mb-3 h-12 w-12" />
          <h2 className="mb-2 text-2xl font-bold">Your Seating Assignment</h2>
          <p className="opacity-90">Find your place at the celebration</p>
        </CardContent>
      </Card>

      {/* Seating Assignment */}
      <Card className="border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-800">
            Table {tableNumber}
          </CardTitle>
          <CardDescription className="text-lg">
            Seat {seatNumber}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <div className="rounded-lg bg-rose-50 p-6">
            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-rose-100">
              <Heart className="h-12 w-12 text-rose-500" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-800">
              Welcome, {guest.name}!
            </h3>
            <p className="text-gray-600">
              You&apos;re seated at Table {tableNumber}, a special table with
              wonderful company.
            </p>
          </div>

          <div className="flex justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Grand Ballroom</span>
            </div>
            <div className="flex items-center gap-2">
              <Utensils className="h-4 w-4" />
              <span>Premium Dining</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table Layout */}
      <Card className="border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Your Table Companions</CardTitle>
          <CardDescription>
            Meet the wonderful people you&apos;ll be dining with
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Table visualization */}
            <div className="relative mx-auto flex h-80 w-80 items-center justify-center rounded-full border-4 border-rose-200 bg-gradient-to-br from-rose-100 to-purple-100">
              <div className="text-center">
                <div className="mb-2 text-2xl font-bold text-rose-600">
                  Table {tableNumber}
                </div>
                <div className="text-sm text-gray-600">Centerpiece</div>
              </div>

              {/* Seats around the table */}
              {tableGuests.map((tableGuest, index) => {
                const angle = index * 45 - 90; // 8 seats, 45° apart, starting from top
                const radius = 140;
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;

                return (
                  <div
                    key={index}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 transform ${
                      tableGuest.name === guest.name ? "z-10" : ""
                    }`}
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                    }}
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full border-2 text-xs font-bold ${
                        tableGuest.name === guest.name
                          ? "scale-110 border-rose-600 bg-rose-500 text-white"
                          : "border-gray-300 bg-white text-gray-700"
                      }`}
                    >
                      {tableGuest.seat}
                    </div>
                    {tableGuest.name === guest.name && (
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 transform">
                        <Badge className="bg-rose-500 text-white">You</Badge>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Guest List */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            {tableGuests.map((tableGuest, index) => (
              <div
                key={index}
                className={`rounded-lg border p-3 ${
                  tableGuest.name === guest.name
                    ? "border-rose-200 bg-rose-50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                      tableGuest.name === guest.name
                        ? "bg-rose-500 text-white"
                        : "bg-gray-300 text-gray-700"
                    }`}
                  >
                    {tableGuest.seat}
                  </div>
                  <div>
                    <div
                      className={`font-medium ${
                        tableGuest.name === guest.name
                          ? "text-rose-800"
                          : "text-gray-800"
                      }`}
                    >
                      {tableGuest.name}
                    </div>
                    <div className="text-xs text-gray-600">
                      {tableGuest.relation}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-800">Dining Information</CardTitle>
        </CardHeader>
        <CardContent className="text-blue-700">
          <ul className="space-y-2 text-sm">
            <li>• Table service begins at 6:00 PM</li>
            <li>• Your meal preference will be confirmed by our staff</li>
            <li>• Wine pairings are included with dinner</li>
            <li>• Please remain seated during the ceremony toasts</li>
            <li>• Feel free to mingle between courses</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default GuestSeatingView;
