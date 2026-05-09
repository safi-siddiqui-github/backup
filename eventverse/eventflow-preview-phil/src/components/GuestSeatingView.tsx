
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, MapPin, Utensils, Heart } from "lucide-react";

interface GuestSeatingViewProps {
  guest: { name: string };
  tableNumber: number;
  seatNumber: number;
}

const GuestSeatingView = ({ guest, tableNumber, seatNumber }: GuestSeatingViewProps) => {
  // Mock table guests data
  const tableGuests = [
    { name: "Sarah Johnson", relation: "Bride's Sister", seat: 1 },
    { name: "Mike Chen", relation: "College Friend", seat: 2 },
    { name: guest.name, relation: "You", seat: seatNumber },
    { name: "Emma Davis", relation: "Work Colleague", seat: 4 },
    { name: "James Wilson", relation: "Childhood Friend", seat: 5 },
    { name: "Lisa Brown", relation: "Family Friend", seat: 6 },
    { name: "David Garcia", relation: "Neighbor", seat: 7 },
    { name: "Rachel Lee", relation: "University Friend", seat: 8 }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="bg-gradient-to-r from-rose-500 to-purple-600 text-white border-0">
        <CardContent className="p-6 text-center">
          <Users className="w-12 h-12 mx-auto mb-3" />
          <h2 className="text-2xl font-bold mb-2">Your Seating Assignment</h2>
          <p className="opacity-90">Find your place at the celebration</p>
        </CardContent>
      </Card>

      {/* Seating Assignment */}
      <Card className="bg-white/80 backdrop-blur-sm border-0">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-800">
            Table {tableNumber}
          </CardTitle>
          <CardDescription className="text-lg">
            Seat {seatNumber}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="bg-rose-50 rounded-lg p-6">
            <div className="w-24 h-24 mx-auto mb-4 bg-rose-100 rounded-full flex items-center justify-center">
              <Heart className="w-12 h-12 text-rose-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Welcome, {guest.name}!</h3>
            <p className="text-gray-600">
              You're seated at Table {tableNumber}, a special table with wonderful company.
            </p>
          </div>
          
          <div className="flex justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Grand Ballroom</span>
            </div>
            <div className="flex items-center gap-2">
              <Utensils className="w-4 h-4" />
              <span>Premium Dining</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table Layout */}
      <Card className="bg-white/80 backdrop-blur-sm border-0">
        <CardHeader>
          <CardTitle>Your Table Companions</CardTitle>
          <CardDescription>Meet the wonderful people you'll be dining with</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Table visualization */}
            <div className="w-80 h-80 mx-auto relative bg-gradient-to-br from-rose-100 to-purple-100 rounded-full border-4 border-rose-200 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-rose-600 mb-2">Table {tableNumber}</div>
                <div className="text-sm text-gray-600">Centerpiece</div>
              </div>
              
              {/* Seats around the table */}
              {tableGuests.map((tableGuest, index) => {
                const angle = (index * 45) - 90; // 8 seats, 45° apart, starting from top
                const radius = 140;
                const x = Math.cos(angle * Math.PI / 180) * radius;
                const y = Math.sin(angle * Math.PI / 180) * radius;
                
                return (
                  <div
                    key={index}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
                      tableGuest.name === guest.name ? 'z-10' : ''
                    }`}
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`
                    }}
                  >
                    <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                      tableGuest.name === guest.name 
                        ? 'bg-rose-500 text-white border-rose-600 scale-110' 
                        : 'bg-white text-gray-700 border-gray-300'
                    }`}>
                      {tableGuest.seat}
                    </div>
                    {tableGuest.name === guest.name && (
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
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
                className={`p-3 rounded-lg border ${
                  tableGuest.name === guest.name 
                    ? 'bg-rose-50 border-rose-200' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    tableGuest.name === guest.name 
                      ? 'bg-rose-500 text-white' 
                      : 'bg-gray-300 text-gray-700'
                  }`}>
                    {tableGuest.seat}
                  </div>
                  <div>
                    <div className={`font-medium ${
                      tableGuest.name === guest.name ? 'text-rose-800' : 'text-gray-800'
                    }`}>
                      {tableGuest.name}
                    </div>
                    <div className="text-xs text-gray-600">{tableGuest.relation}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <Card className="bg-blue-50 border-blue-200">
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
