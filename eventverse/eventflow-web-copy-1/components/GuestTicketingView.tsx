"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Guest } from "@/types/rsvp";
import { format } from "date-fns";
import {
  Calendar,
  CheckCircle,
  Download,
  MapPin,
  QrCode,
  Ticket,
  User,
} from "lucide-react";
import {
  AccessInfoType,
  EventFormData,
  TicketDetailType,
} from "./EnhancedEventCreationDialog";

interface GuestTicketingViewProps {
  event: Partial<EventFormData>;
  // guest: { name: string; email: string; isCheckedIn: boolean };
  guest: Partial<Guest>;
}

const GuestTicketingView = ({ event, guest }: GuestTicketingViewProps) => {
  const ticketDetails =
    event?.ticketDetails ||
    ({
      quantity: 1,
      type: "General Admission",
      ticketNumbers: ["TK-2024-001"],
      qrCode: "QR123456789",
      purchaseDate: "2024-12-20",
      totalPaid: event.ticketPrice || 0,
      checkedIn: false,
      checkInTime: undefined,
    } as TicketDetailType);

  const accessInfo =
    event.accessInfo ||
    ({
      entryCode: "ENTRY2024",
      vipAccess: false,
      specialPerks: ["Welcome Drink"],
      notifications: 0,
    } as AccessInfoType);

  const eventIsInPast = new Date(String(event.startDate)) < new Date();
  const eventIsToday =
    new Date(String(event.startDate)).toDateString() ===
    new Date().toDateString();

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Ticket Status Header */}
      <Card className="border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="p-6 text-center">
          <Ticket className="mx-auto mb-3 h-12 w-12" />
          <h2 className="mb-2 text-2xl font-bold">
            Your Ticket for {event.name}
          </h2>
          <Badge
            className={`${
              ticketDetails.checkedIn
                ? "bg-green-500"
                : eventIsToday
                  ? "bg-orange-500"
                  : "bg-blue-500"
            } px-4 py-2 text-sm text-white`}
          >
            {ticketDetails.checkedIn
              ? "Checked In"
              : eventIsToday
                ? "Ready for Check-in"
                : "Ticket Confirmed"}
          </Badge>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Digital Ticket */}
        <Card className="bg-white shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <Ticket className="h-5 w-5" />
              Digital Ticket
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4 text-center">
              <div className="rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-6">
                <QrCode className="mx-auto mb-3 h-20 w-20 text-gray-400" />
                <p className="text-sm font-medium text-gray-600">
                  {ticketDetails.checkedIn
                    ? "Already Checked In"
                    : "Scan to Check In"}
                </p>
                <p className="mt-2 text-xs text-gray-500">
                  QR Code: {ticketDetails.qrCode}
                </p>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Ticket Type:</span>
                  <span className="font-semibold text-gray-900">
                    {ticketDetails.type}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Quantity:</span>
                  <span className="font-semibold text-gray-900">
                    {ticketDetails.quantity}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Amount Paid:</span>
                  <span className="font-semibold text-green-600">
                    ${ticketDetails.totalPaid}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Purchase Date:</span>
                  <span className="font-semibold text-gray-900">
                    {format(
                      new Date(String(ticketDetails?.purchaseDate)),
                      "MMM d, yyyy",
                    )}
                  </span>
                </div>
                {ticketDetails.checkedIn && ticketDetails.checkInTime && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Checked In:</span>
                    <span className="font-semibold text-green-600">
                      {ticketDetails.checkInTime}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {!ticketDetails.checkedIn && !eventIsInPast && (
                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  <QrCode className="mr-2 h-4 w-4" />
                  Check In Now
                </Button>
              )}
              <Button
                variant="outline"
                className="w-full"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Ticket
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Event Details */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              Event Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <Calendar className="mt-1 h-5 w-5 text-purple-600" />
              <div>
                <p className="font-semibold text-gray-900">
                  {format(
                    new Date(String(event.startDate)),
                    "EEEE, MMMM d, yyyy",
                  )}
                </p>
                <p className="text-gray-600">{event.time}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 text-purple-600" />
              <div>
                <p className="font-semibold text-gray-900">{event.location}</p>
                <p className="text-gray-600">{event?.address}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-purple-600" />
              <div>
                <p className="font-semibold text-gray-900">Ticket Holder</p>
                <p className="text-gray-600">{guest.name}</p>
                <p className="text-sm text-gray-500">{guest.email}</p>
              </div>
            </div>

            {accessInfo.entryCode && (
              <div className="rounded-lg bg-blue-50 p-4">
                <p className="text-sm font-medium text-blue-800">Entry Code</p>
                <p className="font-mono text-lg text-blue-900">
                  {accessInfo.entryCode}
                </p>
              </div>
            )}

            {accessInfo?.specialPerks &&
              accessInfo?.specialPerks?.length > 0 && (
                <div>
                  <p className="mb-2 font-semibold text-gray-900">
                    Included Perks
                  </p>
                  <div className="space-y-2">
                    {accessInfo?.specialPerks?.map((perk, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-gray-700">{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </CardContent>
        </Card>
      </div>

      {/* Additional Information */}
      {event.description && (
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle>About This Event</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="leading-relaxed text-gray-700">{event.description}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GuestTicketingView;
