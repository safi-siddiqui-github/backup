
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { QrCode, Search, UserCheck, Users, Clock, CheckCircle2, Camera, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  avatar?: string;
  ticketType: string;
  ticketTypeId: string;
  quantity: number;
  totalAmount: number;
  status: 'pending' | 'paid' | 'cancelled' | 'refunded';
  purchaseDate: Date;
  checkInStatus: 'not_checked_in' | 'checked_in';
  qrCode: string;
  checkInTime?: Date;
}

interface CheckInSystemProps {
  orders: Order[];
  onOrdersChange: (orders: Order[]) => void;
  ticketTypes: any[];
}

const CheckInSystem = ({ orders, onOrdersChange, ticketTypes }: CheckInSystemProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [scannerInput, setScannerInput] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  const paidOrders = orders.filter(order => order.status === 'paid');
  const checkedInOrders = paidOrders.filter(order => order.checkInStatus === 'checked_in');
  const checkInRate = paidOrders.length > 0 ? Math.round((checkedInOrders.length / paidOrders.length) * 100) : 0;

  const filteredOrders = paidOrders.filter(order =>
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.qrCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCheckIn = (orderId: string) => {
    const updatedOrders = orders.map(order => {
      if (order.id === orderId && order.checkInStatus === 'not_checked_in') {
        return {
          ...order,
          checkInStatus: 'checked_in' as const,
          checkInTime: new Date()
        };
      }
      return order;
    });
    
    onOrdersChange(updatedOrders);
    
    const order = orders.find(o => o.id === orderId);
    toast({
      title: "Check-in Successful!",
      description: `${order?.customerName} has been checked in.`,
    });
  };

  const handleCheckOut = (orderId: string) => {
    const updatedOrders = orders.map(order => {
      if (order.id === orderId && order.checkInStatus === 'checked_in') {
        return {
          ...order,
          checkInStatus: 'not_checked_in' as const,
          checkInTime: undefined
        };
      }
      return order;
    });
    
    onOrdersChange(updatedOrders);
    
    const order = orders.find(o => o.id === orderId);
    toast({
      title: "Check-out Successful!",
      description: `${order?.customerName} has been checked out.`,
    });
  };

  const handleQRScan = () => {
    if (!scannerInput.trim()) return;
    
    const order = paidOrders.find(o => 
      o.qrCode.toLowerCase() === scannerInput.toLowerCase() ||
      o.id.toLowerCase() === scannerInput.toLowerCase()
    );
    
    if (order) {
      if (order.checkInStatus === 'checked_in') {
        toast({
          title: "Already Checked In",
          description: `${order.customerName} is already checked in.`,
          variant: "destructive"
        });
      } else {
        handleCheckIn(order.id);
      }
    } else {
      toast({
        title: "Ticket Not Found",
        description: "No valid ticket found with this QR code.",
        variant: "destructive"
      });
    }
    
    setScannerInput("");
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      toast({
        title: "Camera Access Denied",
        description: "Please allow camera access to scan QR codes.",
        variant: "destructive"
      });
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setShowScanner(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Check-in System</h2>
          <p className="text-purple-100">Manage attendee check-ins and real-time attendance</p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => {
              setShowScanner(!showScanner);
              if (!showScanner) {
                startCamera();
              } else {
                stopCamera();
              }
            }}
            className="bg-gradient-to-r from-purple-600 to-blue-600"
          >
            <QrCode className="w-4 h-4 mr-2" />
            {showScanner ? "Close Scanner" : "QR Scanner"}
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white/95 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Attendees</p>
                <p className="text-2xl font-bold text-gray-900">{paidOrders.length}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/95 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Checked In</p>
                <p className="text-2xl font-bold text-green-600">{checkedInOrders.length}</p>
              </div>
              <UserCheck className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/95 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-orange-600">
                  {paidOrders.length - checkedInOrders.length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/95 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Check-in Rate</p>
                <p className="text-2xl font-bold text-purple-600">{checkInRate}%</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* QR Scanner */}
      {showScanner && (
        <Card className="bg-white/95 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5" />
                QR Code Scanner
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={stopCamera}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Camera View */}
              <div className="flex-1">
                <div className="relative bg-black rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 border-2 border-white/30 rounded-lg">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-blue-500 rounded-lg">
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Manual Input */}
              <div className="flex-1 space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Manual Entry</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Can't scan? Enter the QR code or Order ID manually:
                  </p>
                  <div className="flex gap-2">
                    <Input
                      value={scannerInput}
                      onChange={(e) => setScannerInput(e.target.value)}
                      placeholder="QR123456789 or ORD001"
                      onKeyPress={(e) => e.key === 'Enter' && handleQRScan()}
                    />
                    <Button onClick={handleQRScan} disabled={!scannerInput.trim()}>
                      Check In
                    </Button>
                  </div>
                </div>
                
                <div className="text-xs text-gray-600">
                  <p><strong>Tips:</strong></p>
                  <p>• Position QR code within the blue square</p>
                  <p>• Ensure good lighting</p>
                  <p>• Keep camera steady</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Attendee List */}
      <Card className="bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Attendee List</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search by name, email, or order ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-80"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All ({paidOrders.length})</TabsTrigger>
              <TabsTrigger value="checked-in">Checked In ({checkedInOrders.length})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({paidOrders.length - checkedInOrders.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-4">
              <AttendeeTable 
                orders={filteredOrders}
                onCheckIn={handleCheckIn}
                onCheckOut={handleCheckOut}
              />
            </TabsContent>
            
            <TabsContent value="checked-in" className="mt-4">
              <AttendeeTable 
                orders={filteredOrders.filter(o => o.checkInStatus === 'checked_in')}
                onCheckIn={handleCheckIn}
                onCheckOut={handleCheckOut}
              />
            </TabsContent>
            
            <TabsContent value="pending" className="mt-4">
              <AttendeeTable 
                orders={filteredOrders.filter(o => o.checkInStatus === 'not_checked_in')}
                onCheckIn={handleCheckIn}
                onCheckOut={handleCheckOut}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

const AttendeeTable = ({ orders, onCheckIn, onCheckOut }: {
  orders: Order[];
  onCheckIn: (orderId: string) => void;
  onCheckOut: (orderId: string) => void;
}) => {
  if (orders.length === 0) {
    return (
      <div className="text-center py-8">
        <Users className="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <p className="text-gray-600">No attendees found</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Attendee</TableHead>
          <TableHead>Ticket Type</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Order ID</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Check-in Time</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>
              <div>
                <p className="font-medium">{order.customerName}</p>
                <p className="text-sm text-gray-600">{order.customerEmail}</p>
              </div>
            </TableCell>
            <TableCell>{order.ticketType}</TableCell>
            <TableCell>×{order.quantity}</TableCell>
            <TableCell>
              <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                {order.id}
              </code>
            </TableCell>
            <TableCell>
              {order.checkInStatus === 'checked_in' ? (
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Checked In
                </Badge>
              ) : (
                <Badge variant="outline">
                  <Clock className="w-3 h-3 mr-1" />
                  Pending
                </Badge>
              )}
            </TableCell>
            <TableCell>
              {order.checkInTime ? (
                <span className="text-sm">
                  {order.checkInTime.toLocaleDateString()} {order.checkInTime.toLocaleTimeString()}
                </span>
              ) : (
                <span className="text-gray-400">-</span>
              )}
            </TableCell>
            <TableCell>
              {order.checkInStatus === 'checked_in' ? (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onCheckOut(order.id)}
                >
                  Check Out
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={() => onCheckIn(order.id)}
                >
                  Check In
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CheckInSystem;
