
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Ticket, 
  QrCode, 
  CheckCircle, 
  Clock, 
  Download, 
  Calendar,
  MapPin,
  User
} from "lucide-react";
import { format } from "date-fns";

interface GuestTicketingViewProps {
  event: any;
  guest: { name: string; email: string; isCheckedIn: boolean };
}

const GuestTicketingView = ({ event, guest }: GuestTicketingViewProps) => {
  const ticketDetails = event.ticketDetails || {
    quantity: 1,
    type: "General Admission",
    ticketNumbers: ["TK-2024-001"],
    qrCode: "QR123456789",
    purchaseDate: "2024-12-20",
    totalPaid: event.ticketPrice || 0,
    checkedIn: false,
    checkInTime: undefined
  };

  const accessInfo = event.accessInfo || {
    entryCode: "ENTRY2024",
    vipAccess: false,
    specialPerks: ["Welcome Drink"],
    notifications: 0
  };

  const eventIsInPast = new Date(event.startDate) < new Date();
  const eventIsToday = new Date(event.startDate).toDateString() === new Date().toDateString();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Ticket Status Header */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
        <CardContent className="p-6 text-center">
          <Ticket className="w-12 h-12 mx-auto mb-3" />
          <h2 className="text-2xl font-bold mb-2">Your Ticket for {event.name}</h2>
          <Badge className={`${
            ticketDetails.checkedIn ? 'bg-green-500' : 
            eventIsToday ? 'bg-orange-500' : 
            'bg-blue-500'
          } text-white text-sm px-4 py-2`}>
            {ticketDetails.checkedIn ? 'Checked In' : 
             eventIsToday ? 'Ready for Check-in' : 
             'Ticket Confirmed'}
          </Badge>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Digital Ticket */}
        <Card className="bg-white shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <Ticket className="w-5 h-5" />
              Digital Ticket
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="bg-gray-50 rounded-xl p-6 border-2 border-dashed border-gray-300">
                <QrCode className="w-20 h-20 mx-auto text-gray-400 mb-3" />
                <p className="text-sm text-gray-600 font-medium">
                  {ticketDetails.checkedIn ? 'Already Checked In' : 'Scan to Check In'}
                </p>
                <p className="text-xs text-gray-500 mt-2">QR Code: {ticketDetails.qrCode}</p>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Ticket Type:</span>
                  <span className="font-semibold text-gray-900">{ticketDetails.type}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Quantity:</span>
                  <span className="font-semibold text-gray-900">{ticketDetails.quantity}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Amount Paid:</span>
                  <span className="font-semibold text-green-600">${ticketDetails.totalPaid}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Purchase Date:</span>
                  <span className="font-semibold text-gray-900">
                    {format(new Date(ticketDetails.purchaseDate), "MMM d, yyyy")}
                  </span>
                </div>
                {ticketDetails.checkedIn && ticketDetails.checkInTime && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Checked In:</span>
                    <span className="font-semibold text-green-600">{ticketDetails.checkInTime}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-6 space-y-3">
              {!ticketDetails.checkedIn && !eventIsInPast && (
                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  <QrCode className="w-4 h-4 mr-2" />
                  Check In Now
                </Button>
              )}
              <Button variant="outline" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download Ticket
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Event Details */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Event Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-purple-600 mt-1" />
              <div>
                <p className="font-semibold text-gray-900">{format(new Date(event.startDate), "EEEE, MMMM d, yyyy")}</p>
                <p className="text-gray-600">{event.time}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-purple-600 mt-1" />
              <div>
                <p className="font-semibold text-gray-900">{event.location}</p>
                <p className="text-gray-600">{event.address}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-purple-600" />
              <div>
                <p className="font-semibold text-gray-900">Ticket Holder</p>
                <p className="text-gray-600">{guest.name}</p>
                <p className="text-gray-500 text-sm">{guest.email}</p>
              </div>
            </div>

            {accessInfo.entryCode && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800 font-medium">Entry Code</p>
                <p className="font-mono text-lg text-blue-900">{accessInfo.entryCode}</p>
              </div>
            )}

            {accessInfo.specialPerks.length > 0 && (
              <div>
                <p className="font-semibold text-gray-900 mb-2">Included Perks</p>
                <div className="space-y-2">
                  {accessInfo.specialPerks.map((perk, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
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
            <p className="text-gray-700 leading-relaxed">{event.description}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GuestTicketingView;
