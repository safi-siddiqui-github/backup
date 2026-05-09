
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Phone, 
  Video, 
  Mail, 
  Send, 
  Calendar,
  Clock,
  User,
  Bot
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ClientCommunicationHubProps {
  leadId: string;
  clientName: string;
}

const ClientCommunicationHub = ({ leadId, clientName }: ClientCommunicationHubProps) => {
  const [newMessage, setNewMessage] = useState("");
  const { toast } = useToast();

  const mockCommunications = [
    {
      id: 1,
      type: "email",
      sender: "client",
      message: "Hi! I'm interested in your wedding photography services. Could we schedule a call?",
      timestamp: "2024-01-15T10:00:00Z",
      read: true
    },
    {
      id: 2,
      type: "chat",
      sender: "vendor",
      message: "Absolutely! I'd love to discuss your special day. I have availability this week for a consultation.",
      timestamp: "2024-01-15T14:30:00Z",
      read: true
    },
    {
      id: 3,
      type: "video_call",
      sender: "vendor",
      message: "Video consultation scheduled for tomorrow at 2 PM",
      timestamp: "2024-01-16T09:00:00Z",
      read: true
    },
    {
      id: 4,
      type: "ai_response",
      sender: "ai",
      message: "AI suggested follow-up: Send portfolio samples based on client's vintage theme preference",
      timestamp: "2024-01-16T15:00:00Z",
      read: false
    }
  ];

  const getMessageIcon = (type: string) => {
    switch (type) {
      case "email": return <Mail className="w-4 h-4" />;
      case "chat": return <MessageSquare className="w-4 h-4" />;
      case "phone": return <Phone className="w-4 h-4" />;
      case "video_call": return <Video className="w-4 h-4" />;
      case "ai_response": return <Bot className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getMessageColor = (type: string) => {
    switch (type) {
      case "email": return "text-blue-600";
      case "chat": return "text-green-600";
      case "phone": return "text-purple-600";
      case "video_call": return "text-orange-600";
      case "ai_response": return "text-cyan-600";
      default: return "text-gray-600";
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    toast({
      title: "Message sent",
      description: `Message sent to ${clientName}`,
    });
    setNewMessage("");
  };

  const handleQuickAction = (action: string) => {
    toast({
      title: `${action} initiated`,
      description: `${action} with ${clientName}`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Quick Communication Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Button onClick={() => handleQuickAction("Video Call")} className="flex flex-col h-20">
          <Video className="w-6 h-6 mb-1" />
          <span className="text-xs">Video Call</span>
        </Button>
        <Button onClick={() => handleQuickAction("Phone Call")} variant="outline" className="flex flex-col h-20">
          <Phone className="w-6 h-6 mb-1" />
          <span className="text-xs">Phone Call</span>
        </Button>
        <Button onClick={() => handleQuickAction("Email")} variant="outline" className="flex flex-col h-20">
          <Mail className="w-6 h-6 mb-1" />
          <span className="text-xs">Send Email</span>
        </Button>
        <Button onClick={() => handleQuickAction("Schedule Meeting")} variant="outline" className="flex flex-col h-20">
          <Calendar className="w-6 h-6 mb-1" />
          <span className="text-xs">Schedule</span>
        </Button>
      </div>

      {/* Communication History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Communication History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {mockCommunications.map((comm) => (
              <div key={comm.id} className="flex gap-3 p-3 border rounded-lg">
                <div className={`${getMessageColor(comm.type)} mt-1`}>
                  {getMessageIcon(comm.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <Badge variant={comm.sender === "client" ? "default" : comm.sender === "ai" ? "secondary" : "outline"}>
                        {comm.sender === "client" ? "Client" : comm.sender === "ai" ? "AI Assistant" : "You"}
                      </Badge>
                      <span className="text-xs text-gray-500 capitalize">{comm.type.replace("_", " ")}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      {new Date(comm.timestamp).toLocaleString()}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{comm.message}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Message Composer */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Send Quick Message</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Textarea
            placeholder={`Type your message to ${clientName}...`}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            rows={3}
          />
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Template</Button>
              <Button variant="outline" size="sm">
                <Bot className="w-4 h-4 mr-1" />
                AI Assist
              </Button>
            </div>
            <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* AI Communication Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Bot className="w-5 h-5 text-purple-600" />
            AI Communication Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Suggested Follow-up</p>
                <p className="text-sm text-gray-700">Client mentioned vintage theme - consider sending portfolio samples with vintage-style photography</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Response Sentiment</p>
                <p className="text-sm text-gray-700">Client shows high interest level - recommend scheduling in-person consultation within 48 hours</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Optimal Response Time</p>
                <p className="text-sm text-gray-700">Client typically responds within 2-4 hours during weekdays. Best contact time: 2-5 PM</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientCommunicationHub;
