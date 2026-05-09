"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import ChatView, { ChatViewProps } from "./ChatView";

export interface Contact {
  id: string;
  name: string;
  initials?: string;
  subtitle?: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
  avatarClassName?: string;
}

export interface ChatWithSidebarProps {
  // Sidebar props
  contacts: Contact[];
  selectedContactId: string | null;
  onSelectContact: (contactId: string) => void;
  
  // Chat props (will be passed to ChatView)
  chatProps: Omit<ChatViewProps, "contactName" | "contactInitials" | "contactSubtitle" | "avatarClassName"> & {
    contactName?: string;
    contactInitials?: string;
    contactSubtitle?: string;
    avatarClassName?: string;
  };
  
  // Optional sidebar customization
  sidebarClassName?: string;
  showSidebar?: boolean; // Can hide sidebar for mobile/tablet
  
  // Optional sidebar header
  sidebarHeader?: React.ReactNode;
  
  // Optional empty state
  emptyStateMessage?: string;
}

export default function ChatWithSidebar({
  contacts,
  selectedContactId,
  onSelectContact,
  chatProps,
  sidebarClassName,
  showSidebar = true,
  sidebarHeader,
  emptyStateMessage = "Select a contact to start chatting",
}: ChatWithSidebarProps) {
  const selectedContact = contacts.find((c) => c.id === selectedContactId);

  return (
    <div className="flex min-h-[500px] h-[calc(100vh-24rem)] lg:h-[650px]">
      {/* Left Sidebar - Hidden on mobile when chat is shown */}
      {showSidebar && (
        <div
          className={cn(
            "flex h-full w-full flex-col border-r bg-muted/30 lg:w-1/3",
            selectedContact && "hidden lg:flex",
            sidebarClassName
          )}
        >
          {sidebarHeader}
          
          {/* Contacts List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {contacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => onSelectContact(contact.id)}
                className={cn(
                  "w-full flex items-center gap-2 p-3 rounded-lg text-left transition-colors",
                  "hover:bg-muted/50",
                  selectedContactId === contact.id && "bg-muted"
                )}
              >
                <div className="h-10 w-10 shrink-0 rounded-full bg-linear-to-r from-purple-600 to-cyan-600 flex items-center justify-center text-white text-xs font-semibold">
                  {contact.initials || contact.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold truncate">{contact.name}</p>
                    {contact.unreadCount && contact.unreadCount > 0 && (
                      <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full shrink-0">
                        {contact.unreadCount}
                      </span>
                    )}
                  </div>
                  {contact.lastMessage && (
                    <p className="text-xs text-muted-foreground truncate">{contact.lastMessage}</p>
                  )}
                  {contact.lastMessageTime && (
                    <p className="text-xs text-muted-foreground">{contact.lastMessageTime}</p>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Right Chat View - Hidden on mobile when sidebar is shown */}
      {selectedContact ? (
        <div
          className={cn(
            "flex min-w-0 flex-1 flex-col",
            !showSidebar && "w-full"
          )}
        >
          <ChatView
            {...chatProps}
            contactName={chatProps.contactName || selectedContact.name}
            contactInitials={chatProps.contactInitials || selectedContact.initials}
            contactSubtitle={chatProps.contactSubtitle || selectedContact.subtitle}
            avatarClassName={chatProps.avatarClassName || selectedContact.avatarClassName}
          />
        </div>
      ) : (
        <div className="hidden flex-1 items-center justify-center lg:flex">
          <p className="text-muted-foreground">{emptyStateMessage}</p>
        </div>
      )}
    </div>
  );
}

