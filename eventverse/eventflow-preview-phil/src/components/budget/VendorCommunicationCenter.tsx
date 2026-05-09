
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  Calendar, 
  Send,
  Paperclip,
  Search,
  Filter
} from "lucide-react";
import type { Proposal } from "./ComprehensiveBudgetModule";
import type { VendorProfile } from "@/types/budget";
import type { VendorCommunication } from "./VendorManagementHub";

interface VendorCommunicationCenterProps {
  communications: VendorCommunication[];
  vendors: VendorProfile[];
  onContactVendor: (vendorId: string, message: string) => void;
}

const VendorCommunicationCenter = ({
  communications,
  vendors,
  onContactVendor
}: VendorCommunicationCenterProps) => {
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [messageType, setMessageType] = useState<"email" | "message">("message");
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  // Group communications by vendor
  const communicationsByVendor = communications.reduce((acc, comm) => {
    if (!acc[comm.vendorId]) acc[comm.vendorId] = [];
    acc[comm.vendorId].push(comm);
    return acc;
  }, {} as Record<string, VendorCommunication[]>);

  // Filter communications
  const filteredCommunications = communications.filter(comm => {
    const vendor = vendors.find(v => v.id === comm.vendorId);
    const matchesSearch = vendor?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comm.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comm.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || comm.type === typeFilter;
    return matchesSearch && matchesType;
  });

  // Sort communications by date (newest first)
  const sortedCommunications = [...filteredCommunications].sort((a, b) => 
    b.date.getTime() - a.date.getTime()
  );

  const handleSendMessage = () => {
    if (!selectedVendor || !newMessage.trim()) return;
    
    onContactVendor(selectedVendor, newMessage);
    setNewMessage("");
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="w-4 h-4" />;
      case 'call': return <Phone className="w-4 h-4" />;
      case 'meeting': return <Calendar className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'email': return 'bg-blue-100 text-blue-800';
      case 'call': return 'bg-green-100 text-green-800';
      case 'meeting': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate communication stats
  const totalCommunications = communications.length;
  const recentCommunications = communications.filter(c => 
    c.date >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  ).length;
  const pendingResponses = communications.filter(c => 
    c.sender === 'vendor' && c.date >= new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  ).length;

  return (
    <div className="space-y-6">
      {/* Communication Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
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
              <Calendar className="w-5 h-5 text-green-600" />
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
              <Phone className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Active Vendors</p>
                <p className="text-2xl font-bold">{Object.keys(communicationsByVendor).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-orange-600" />
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
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search communications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vendor List */}
        <Card>
          <CardHeader>
            <CardTitle>Vendors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {vendors.map(vendor => {
                const vendorComms = communicationsByVendor[vendor.id] || [];
                const lastComm = vendorComms.sort((a, b) => b.date.getTime() - a.date.getTime())[0];
                const unreadCount = vendorComms.filter(c => 
                  c.sender === 'vendor' && c.date >= new Date(Date.now() - 24 * 60 * 60 * 1000)
                ).length;

                return (
                  <div
                    key={vendor.id}
                    className={`p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedVendor === vendor.id ? 'border-blue-500 bg-blue-50' : ''
                    }`}
                    onClick={() => setSelectedVendor(vendor.id)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium">{vendor.name}</h4>
                        <p className="text-sm text-gray-600">{vendor.category}</p>
                      </div>
                      {unreadCount > 0 && (
                        <Badge className="bg-red-100 text-red-800">
                          {unreadCount} new
                        </Badge>
                      )}
                    </div>
                    
                    {lastComm && (
                      <div>
                        <p className="text-sm text-gray-700 truncate">{lastComm.subject}</p>
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
                  <Button variant="outline" size="sm">
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                  <Button variant="outline" size="sm">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                  <Button variant="outline" size="sm">
                    <Calendar className="w-4 h-4 mr-2" />
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
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Select value={messageType} onValueChange={(value: "email" | "message") => setMessageType(value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="message">Message</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                      </SelectContent>
                    </Select>
                    <span className="text-sm text-gray-600">
                      to {vendors.find(v => v.id === selectedVendor)?.name}
                    </span>
                  </div>
                  
                  <Textarea
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="mb-3"
                    rows={3}
                  />
                  
                  <div className="flex justify-between items-center">
                    <Button variant="outline" size="sm">
                      <Paperclip className="w-4 h-4 mr-2" />
                      Attach
                    </Button>
                    <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                      <Send className="w-4 h-4 mr-2" />
                      Send
                    </Button>
                  </div>
                </div>

                {/* Message History */}
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {communicationsByVendor[selectedVendor]?.sort((a, b) => b.date.getTime() - a.date.getTime()).map(comm => (
                    <div key={comm.id} className={`p-3 rounded-lg ${
                      comm.sender === 'host' ? 'bg-blue-50 ml-8' : 'bg-gray-50 mr-8'
                    }`}>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge className={getTypeColor(comm.type)}>
                            {getTypeIcon(comm.type)}
                            {comm.type}
                          </Badge>
                          <span className="text-sm font-medium">
                            {comm.sender === 'host' ? 'You' : vendors.find(v => v.id === comm.vendorId)?.name}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {comm.date.toLocaleDateString()} {comm.date.toLocaleTimeString()}
                        </span>
                      </div>
                      
                      <h4 className="font-medium mb-1">{comm.subject}</h4>
                      <p className="text-sm text-gray-700">{comm.content}</p>
                      
                      {comm.attachments && comm.attachments.length > 0 && (
                        <div className="mt-2">
                          <p className="text-xs text-gray-500 mb-1">Attachments:</p>
                          {comm.attachments.map((attachment, index) => (
                            <span key={index} className="text-xs bg-white px-2 py-1 rounded mr-2">
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
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">Select a vendor to view communication history</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VendorCommunicationCenter;
