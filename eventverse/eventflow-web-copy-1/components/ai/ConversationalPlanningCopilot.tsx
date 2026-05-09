"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Bot,
  Calendar,
  DollarSign,
  Lightbulb,
  MessageSquare,
  Send,
  User,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { EventFormData } from "../EnhancedEventCreationDialog";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  suggestions?: string[];
  actionable?: boolean;
}

interface Props {
  eventData: EventFormData;
  onUpdateEvent: (updates: Partial<EventFormData>) => void;
}

const ConversationalPlanningCopilot = ({ eventData, onUpdateEvent }: Props) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content: `Hi! I'm your AI Event Planning Copilot. I can see you're planning a ${eventData.eventType || "new event"}. How can I help you make it amazing?`,
      timestamp: new Date(),
      suggestions: [
        "Help me optimize the guest experience",
        "Suggest the perfect venue layout",
        "Create a detailed timeline",
        "Recommend budget allocation",
      ],
    },
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: currentMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setCurrentMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage = generateAIResponse(currentMessage);
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): Message => {
    const input = userInput.toLowerCase();

    let response = "";
    let suggestions: string[] = [];
    let actionable = false;

    if (input.includes("guest") || input.includes("experience")) {
      response =
        "Great question about guest experience! Based on your event type and guest count, I recommend: 1) Creating a welcome area with refreshments, 2) Setting up clear signage and wayfinding, 3) Adding interactive elements like photo booths or games. Would you like me to add any of these to your event plan?";
      suggestions = [
        "Add welcome refreshment station",
        "Set up photo booth module",
        "Create interactive games area",
        "Design wayfinding signage",
      ];
      actionable = true;
    } else if (input.includes("venue") || input.includes("layout")) {
      response =
        "For venue layout optimization, I suggest arranging tables in clusters of 8 for networking, creating clear pathways for accessibility, and positioning the main stage for optimal visibility. The layout should encourage mingling while maintaining comfort.";
      suggestions = [
        "Generate optimal seating chart",
        "Create accessibility map",
        "Position entertainment areas",
        "Plan traffic flow",
      ];
      actionable = true;
    } else if (input.includes("timeline") || input.includes("schedule")) {
      response =
        "I can create a detailed timeline for your event! Based on best practices, I recommend: arrival/registration (30 min), welcome reception (45 min), main program (90 min), networking break (30 min), closing remarks (15 min). Would you like me to generate a custom timeline?";
      suggestions = [
        "Generate detailed timeline",
        "Add buffer times",
        "Schedule key moments",
        "Set reminder alerts",
      ];
      actionable = true;
    } else if (input.includes("budget") || input.includes("cost")) {
      response =
        "For budget optimization, I recommend allocating: 40% for venue & catering, 20% for entertainment, 15% for marketing, 15% for staff, 10% for contingency. Based on your ticket pricing, you're on track for a profitable event!";
      suggestions = [
        "Create detailed budget breakdown",
        "Set cost alerts",
        "Find cost-saving opportunities",
        "Track expenses",
      ];
      actionable = true;
    } else {
      response =
        "I'm here to help with all aspects of your event planning! I can assist with guest management, venue optimization, timeline creation, budget planning, vendor coordination, and much more. What specific area would you like to focus on?";
      suggestions = [
        "Optimize guest experience",
        "Plan event timeline",
        "Manage budget allocation",
        "Coordinate vendors",
      ];
    }

    return {
      id: (Date.now() + 1).toString(),
      type: "assistant",
      content: response,
      timestamp: new Date(),
      suggestions,
      actionable,
    };
  };

  const handleSuggestionClick = (suggestion: string) => {
    setCurrentMessage(suggestion);
  };

  const handleQuickAction = (action: string) => {
    // Simulate applying the action to the event
    const actionMessage: Message = {
      id: (Date.now() + 2).toString(),
      type: "assistant",
      content: `Perfect! I've ${action.toLowerCase()} for your event. You can review and modify this in the event configuration. Is there anything else you'd like me to help with?`,
      timestamp: new Date(),
      suggestions: [
        "Review current setup",
        "Add more features",
        "Optimize further",
        "Generate report",
      ],
    };

    setMessages((prev) => [...prev, actionMessage]);
  };

  return (
    <Card className="flex h-[600px] flex-col border-green-200 bg-gradient-to-br from-green-50 to-teal-50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-green-600" />
          AI Planning Copilot
          <Badge
            variant="outline"
            className="ml-auto bg-green-100 text-green-700"
          >
            <Bot className="mr-1 h-3 w-3" />
            Online
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col space-y-4 p-4">
        {/* Messages Area */}
        <ScrollArea
          ref={scrollAreaRef}
          className="flex-1 pr-4"
        >
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === "user"
                      ? "bg-green-600 text-white"
                      : "border border-gray-200 bg-white"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {message.type === "assistant" && (
                      <Bot className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                    )}
                    {message.type === "user" && (
                      <User className="mt-0.5 h-4 w-4 flex-shrink-0 text-white" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm">{message.content}</p>

                      {message.suggestions && (
                        <div className="mt-3 space-y-2">
                          <p className="flex items-center gap-1 text-xs text-gray-500">
                            <Lightbulb className="h-3 w-3" />
                            Quick suggestions:
                          </p>
                          <div className="space-y-1">
                            {message.suggestions.map((suggestion, index) => (
                              <button
                                key={index}
                                onClick={() =>
                                  message.actionable
                                    ? handleQuickAction(suggestion)
                                    : handleSuggestionClick(suggestion)
                                }
                                className={`block w-full rounded border px-2 py-1 text-left text-xs transition-colors ${
                                  message.actionable
                                    ? "border-green-300 bg-green-50 text-green-700 hover:bg-green-100"
                                    : "border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100"
                                }`}
                              >
                                {message.actionable && (
                                  <Zap className="mr-1 inline h-3 w-3" />
                                )}
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg border border-gray-200 bg-white p-3">
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4 text-green-600" />
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
                      <div
                        className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="flex gap-2">
          <Input
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            placeholder="Ask me anything about your event..."
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!currentMessage.trim() || isTyping}
            className="bg-green-600 hover:bg-green-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() =>
              handleSuggestionClick("Help me optimize the schedule")
            }
            className="flex items-center gap-1 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs hover:bg-gray-50"
          >
            <Calendar className="h-3 w-3" />
            Schedule
          </button>
          <button
            onClick={() => handleSuggestionClick("Suggest budget improvements")}
            className="flex items-center gap-1 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs hover:bg-gray-50"
          >
            <DollarSign className="h-3 w-3" />
            Budget
          </button>
          <button
            onClick={() => handleSuggestionClick("Improve guest experience")}
            className="flex items-center gap-1 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs hover:bg-gray-50"
          >
            <Users className="h-3 w-3" />
            Guests
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversationalPlanningCopilot;
