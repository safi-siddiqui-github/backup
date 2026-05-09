
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageSquare, 
  Send, 
  Search, 
  Filter, 
  Plus,
  Mail,
  Clock,
  Users,
  Zap
} from "lucide-react";

interface VendorUser {
  id: string;
  businessName: string;
  email: string;
  category: string;
  status: "active" | "pending" | "suspended";
  profileComplete: boolean;
}

interface VendorCommunicationsProps {
  vendor: VendorUser;
}

const VendorCommunications = ({ vendor }: VendorCommunicationsProps) => {
  const [activeTab, setActiveTab] = useState("messages");

  // Mock data for demonstration
  const conversations = [
    {
      id: "1",
      clientName: "Sarah Johnson",
      lastMessage: "Thank you for the proposal! When can we schedule a tasting?",
      timestamp: "2024-01-15T10:30:00Z",
      unread: true,
      status: "active"
    },
    {
      id: "2", 
      clientName: "Elite Events Inc",
      lastMessage: "The contract looks good. We'll sign and return by Friday.",
      timestamp: "2024-01-14T15:45:00Z",
      unread: false,
      status: "pending"
    }
  ];

  const templates = [
    {
      id: "1",
      name: "Initial Proposal",
      category: "Proposals",
      subject: "Your Event Catering Proposal",
      lastUsed: "2024-01-10"
    },
    {
      id: "2",
      name: "Follow-up Reminder",
      category: "Follow-ups", 
      subject: "Following up on your catering inquiry",
      lastUsed: "2024-01-08"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Communications</h2>
          <p className="text-gray-600">Manage all client communications in one place</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Message
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Unread Messages</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Conversations</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Response Time</p>
                <p className="text-2xl font-bold">2.4h</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Templates Used</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <Mail className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="messages" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Messages
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            History
          </TabsTrigger>
          <TabsTrigger value="automation" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Automation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="messages">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Conversations List */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Conversations</CardTitle>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input placeholder="Search conversations..." className="pl-10" />
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-0">
                    {conversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        className="p-4 border-b hover:bg-gray-50 cursor-pointer"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{conversation.clientName}</p>
                              {conversation.unread && (
                                <Badge variant="default" className="w-2 h-2 p-0 rounded-full" />
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                              {conversation.lastMessage}
                            </p>
                            <p className="text-xs text-gray-400 mt-2">
                              {new Date(conversation.timestamp).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Message View */}
            <div className="lg:col-span-2">
              <Card className="h-[600px] flex flex-col">
                <CardHeader>
                  <CardTitle>Sarah Johnson</CardTitle>
                  <CardDescription>Wedding Catering Inquiry</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="flex-1 p-4 bg-gray-50 rounded mb-4 overflow-y-auto">
                    <div className="space-y-4">
                      <div className="flex justify-end">
                        <div className="bg-blue-600 text-white p-3 rounded-lg max-w-xs">
                          <p className="text-sm">Thank you for your interest! I'd be happy to provide a quote for your wedding catering.</p>
                          <p className="text-xs opacity-80 mt-1">2:30 PM</p>
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="bg-white p-3 rounded-lg max-w-xs border">
                          <p className="text-sm">Thank you for the proposal! When can we schedule a tasting?</p>
                          <p className="text-xs text-gray-500 mt-1">2:45 PM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Input placeholder="Type your message..." className="flex-1" />
                    <Button>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="templates">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Email Templates</CardTitle>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    New Template
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{template.name}</p>
                          <p className="text-sm text-gray-600">{template.subject}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline">{template.category}</Badge>
                            <span className="text-xs text-gray-400">
                              Last used: {new Date(template.lastUsed).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Use Template
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Template Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {["Proposals", "Follow-ups", "Confirmations", "Invoices", "Thank You"].map((category) => (
                    <div key={category} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                      <span>{category}</span>
                      <Badge variant="secondary">
                        {category === "Proposals" ? "3" : category === "Follow-ups" ? "2" : "1"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Communication History</CardTitle>
              <CardDescription>Complete timeline of all client interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-500 text-center py-8">Communication history will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation">
          <Card>
            <CardHeader>
              <CardTitle>Automated Communications</CardTitle>
              <CardDescription>Set up auto-replies and follow-up sequences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-500 text-center py-8">Automation settings will be configured here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VendorCommunications;
