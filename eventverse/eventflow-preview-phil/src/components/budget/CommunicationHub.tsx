import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  MessageSquare, 
  Send, 
  Phone, 
  Video, 
  Paperclip,
  Search,
  Star,
  Clock,
  CheckCircle,
  User
} from "lucide-react";
import type { Proposal } from "./ComprehensiveBudgetModule";
import type { VendorProfile } from "@/types/budget";

interface CommunicationHubProps {
  vendors: VendorProfile[];
  proposals: Proposal[];
  onSendMessage: (vendorId: string, message: string) => void;
  pendingMessageVendor?: { vendorId: string; proposalId: string } | null;
  onUnreadCountChange?: (count: number) => void;
}

interface Message {
  id: string;
  vendorId: string;
  content: string;
  timestamp: Date;
  sender: 'host' | 'vendor';
  read: boolean;
  attachments?: string[];
}

interface Conversation {
  vendorId: string;
  lastMessage: Message;
  unreadCount: number;
  messages: Message[];
}

// Mock conversation data
const MOCK_CONVERSATIONS: Conversation[] = [
  {
    vendorId: "vendor-1",
    unreadCount: 2,
    lastMessage: {
      id: "msg-5",
      vendorId: "vendor-1",
      content: "We can definitely accommodate the dietary restrictions. Would you like to schedule a tasting?",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      sender: 'vendor',
      read: false
    },
    messages: [
      {
        id: "msg-1",
        vendorId: "vendor-1",
        content: "Hello! Thank you for considering Elite Catering for your wedding. I'd love to discuss your requirements.",
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        sender: 'vendor',
        read: true
      },
      {
        id: "msg-2",
        vendorId: "vendor-1",
        content: "Hi! We're looking for catering for 100 guests. We have some dietary restrictions to consider.",
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000),
        sender: 'host',
        read: true
      },
      {
        id: "msg-3",
        vendorId: "vendor-1",
        content: "Perfect! We specialize in accommodating various dietary needs. Could you tell me more about the specific restrictions?",
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        sender: 'vendor',
        read: true
      },
      {
        id: "msg-4",
        vendorId: "vendor-1",
        content: "We need vegetarian and gluten-free options. Also, some guests have nut allergies.",
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
        sender: 'host',
        read: true
      },
      {
        id: "msg-5",
        vendorId: "vendor-1",
        content: "We can definitely accommodate the dietary restrictions. Would you like to schedule a tasting?",
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        sender: 'vendor',
        read: false
      }
    ]
  },
  {
    vendorId: "vendor-3",
    unreadCount: 0,
    lastMessage: {
      id: "msg-8",
      vendorId: "vendor-3",
      content: "Sounds great! I'll send over our detailed package information.",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      sender: 'vendor',
      read: true
    },
    messages: [
      {
        id: "msg-6",
        vendorId: "vendor-3",
        content: "Hi! Thanks for your interest in our photography services. I'd love to learn more about your wedding.",
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        sender: 'vendor',
        read: true
      },
      {
        id: "msg-7",
        vendorId: "vendor-3",
        content: "Hello! We're interested in your 8-hour wedding package. Can you provide more details?",
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000 + 30 * 60 * 1000),
        sender: 'host',
        read: true
      },
      {
        id: "msg-8",
        vendorId: "vendor-3",
        content: "Sounds great! I'll send over our detailed package information.",
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
        sender: 'vendor',
        read: true
      }
    ]
  }
];

const CommunicationHub = ({ 
  vendors, 
  proposals, 
  onSendMessage,
  pendingMessageVendor,
  onUnreadCountChange
}: CommunicationHubProps) => {
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
  const [selectedVendorId, setSelectedVendorId] = useState<string | null>("vendor-1");
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Calculate and report total unread count
  useEffect(() => {
    const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);
    onUnreadCountChange?.(totalUnread);
  }, [conversations, onUnreadCountChange]);

  // Handle incoming message request from proposals
  useEffect(() => {
    if (pendingMessageVendor) {
      // Check if conversation exists
      const existingConversation = conversations.find(
        c => c.vendorId === pendingMessageVendor.vendorId
      );
      
      if (existingConversation) {
        // Select existing conversation
        setSelectedVendorId(pendingMessageVendor.vendorId);
        markAsRead(pendingMessageVendor.vendorId);
      } else {
        // Create new conversation
        const newConversation: Conversation = {
          vendorId: pendingMessageVendor.vendorId,
          unreadCount: 0,
          lastMessage: {
            id: `msg-welcome-${Date.now()}`,
            vendorId: pendingMessageVendor.vendorId,
            content: "Start a conversation about your proposal...",
            timestamp: new Date(),
            sender: 'host',
            read: true
          },
          messages: []
        };
        
        setConversations(prev => [newConversation, ...prev]);
        setSelectedVendorId(pendingMessageVendor.vendorId);
      }
    }
  }, [pendingMessageVendor]);

  const getVendorById = (vendorId: string) => {
    return vendors.find(v => v.id === vendorId);
  };

  const getActiveProposals = (vendorId: string) => {
    return proposals.filter(p => p.vendorId === vendorId && p.status !== 'declined');
  };

  const selectedConversation = conversations.find(c => c.vendorId === selectedVendorId);
  const selectedVendor = selectedVendorId ? getVendorById(selectedVendorId) : null;

  const filteredConversations = conversations.filter(conversation => {
    const vendor = getVendorById(conversation.vendorId);
    return vendor?.name.toLowerCase().includes(searchTerm.toLowerCase()) || false;
  });

  const handleSendMessage = () => {
    if (!selectedVendorId || !newMessage.trim()) return;

    const message: Message = {
      id: `msg-${Date.now()}`,
      vendorId: selectedVendorId,
      content: newMessage,
      timestamp: new Date(),
      sender: 'host',
      read: true
    };

    setConversations(prevConversations => 
      prevConversations.map(conv => 
        conv.vendorId === selectedVendorId 
          ? {
              ...conv,
              messages: [...conv.messages, message],
              lastMessage: message
            }
          : conv
      )
    );

    onSendMessage(selectedVendorId, newMessage);
    setNewMessage("");
  };

  const markAsRead = (vendorId: string) => {
    setConversations(prevConversations =>
      prevConversations.map(conv =>
        conv.vendorId === vendorId
          ? {
              ...conv,
              unreadCount: 0,
              messages: conv.messages.map(msg => ({ ...msg, read: true }))
            }
          : conv
      )
    );
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - timestamp.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return timestamp.toLocaleDateString();
    }
  };

  return (
    <div className="h-full flex">
      {/* Conversations List */}
      <div className="w-1/3 border-r bg-white">
        <div className="p-4 border-b">
          <h3 className="font-semibold mb-3">Messages</h3>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <Input
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="overflow-y-auto h-full">
          {filteredConversations.map((conversation) => {
            const vendor = getVendorById(conversation.vendorId);
            const activeProposals = getActiveProposals(conversation.vendorId);
            
            if (!vendor) return null;
            
            return (
              <div
                key={conversation.vendorId}
                className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedVendorId === conversation.vendorId ? 'bg-blue-50 border-blue-200' : ''
                }`}
                onClick={() => {
                  setSelectedVendorId(conversation.vendorId);
                  markAsRead(conversation.vendorId);
                }}
              >
                <div className="flex items-start gap-3">
                  <Avatar>
                    <AvatarFallback>
                      {vendor.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium truncate">{vendor.name}</h4>
                      <div className="flex items-center gap-1">
                        {conversation.unreadCount > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                        <span className="text-xs text-gray-500">
                          {formatTimestamp(conversation.lastMessage.timestamp)}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 truncate">
                      {conversation.lastMessage.sender === 'vendor' ? '' : 'You: '}
                      {conversation.lastMessage.content}
                    </p>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        {vendor.category}
                      </Badge>
                      {activeProposals.length > 0 && (
                        <Badge variant="outline" className="text-xs text-green-600">
                          {activeProposals.length} proposal{activeProposals.length > 1 ? 's' : ''}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          
          {filteredConversations.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No conversations found</p>
            </div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedVendor && selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>
                      {selectedVendor.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{selectedVendor.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>{selectedVendor.category}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span>{selectedVendor.rating}</span>
                      </div>
                      <span>•</span>
                      <span>Responds {selectedVendor.responseTime}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                  <Button variant="outline" size="sm">
                    <Video className="w-4 h-4 mr-2" />
                    Video
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {selectedConversation.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'host' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-2 max-w-[70%] ${message.sender === 'host' ? 'flex-row-reverse' : ''}`}>
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-xs">
                        {message.sender === 'host' ? 'YOU' : selectedVendor.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className={`rounded-lg p-3 ${
                      message.sender === 'host' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white border'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <div className={`text-xs mt-1 flex items-center gap-1 ${
                        message.sender === 'host' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        <Clock className="w-3 h-3" />
                        {formatTimestamp(message.timestamp)}
                        {message.sender === 'host' && message.read && (
                          <CheckCircle className="w-3 h-3" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t bg-white">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">Select a conversation</h3>
              <p className="text-gray-500">Choose a vendor to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunicationHub;
