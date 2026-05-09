"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { VendorConversation } from "./VendorCommunicationsContent";
import { cn } from "@/lib/utils";

interface VendorCommunicationsSidebarProps {
  conversations: VendorConversation[];
  selectedConversationId: string | null;
  onSelectConversation: (id: string) => void;
}

export default function VendorCommunicationsSidebar({
  conversations,
  selectedConversationId,
  onSelectConversation,
}: VendorCommunicationsSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = conversations.filter((conv) =>
    conv.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.clientEmail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-full flex-col w-full lg:w-1/3 border-r">
      {/* Header */}
      <div className="border-b p-3 lg:p-4">
        <div className="mb-3 flex items-center justify-between gap-2 lg:mb-4">
          <h2 className="text-lg font-bold lg:text-xl">Messages</h2>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search clients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 text-sm lg:text-base"
          />
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="p-4 text-center text-sm text-muted-foreground">
            {searchQuery ? "No clients found" : "No conversations yet"}
          </div>
        ) : (
          filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => onSelectConversation(conversation.id)}
              className={cn(
                "p-3 lg:p-4 border-b cursor-pointer transition-colors hover:bg-muted/50",
                selectedConversationId === conversation.id && "bg-blue-50 dark:bg-blue-900/20"
              )}
            >
              <div className="flex items-start gap-2 lg:gap-3">
                <Avatar className="h-8 w-8 lg:h-10 lg:w-10 shrink-0">
                  <AvatarFallback className="text-xs lg:text-sm bg-linear-to-r from-purple-600 to-cyan-600 text-white">
                    {conversation.clientInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1 gap-2">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <p className="font-semibold text-xs lg:text-sm truncate">
                        {conversation.clientName}
                      </p>
                      <Badge 
                        className={cn(
                          "text-xs px-2 py-0.5 shrink-0",
                          conversation.category === "Active Client" 
                            ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                            : conversation.category === "Marketplace"
                            ? "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800"
                            : "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
                        )}
                      >
                        {conversation.category}
                      </Badge>
                    </div>
                    {conversation.unreadCount > 0 && (
                      <Badge className="bg-blue-600 text-white text-xs px-2 py-0.5 shrink-0">
                        {conversation.unreadCount}
                      </Badge>
                    )}
                    {conversation.unreadCount === 0 && (
                      <span className="text-xs text-muted-foreground shrink-0">
                        {conversation.lastMessageTime}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                    {conversation.lastMessage}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

