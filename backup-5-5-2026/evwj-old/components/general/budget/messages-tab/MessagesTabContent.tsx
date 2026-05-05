"use client";

import { useState } from "react";
import MessagesSidebar from "./MessagesSidebar";
import { ChatView } from "@/components/common/chat";
import { ChatMessage } from "@/components/common/chat/types";
import { cn } from "@/lib/utils";
import NewChatDialog from "./NewChatDialog";
import { Vendor, mockVendors } from "../vendor-mgmt-tab/VendorListView";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";

// Types
export interface Message {
	id: string;
	text: string;
	sender: "user" | "vendor";
	timestamp: string;
	isRead?: boolean;
}

export type ConversationStatus = "recent" | "archived";

export interface Conversation {
	id: string;
	vendorId: string;
	vendorName: string;
	vendorInitials: string;
	category: string;
	rating: number;
	responseTime: string;
	lastMessage: string;
	lastMessageTime: string;
	proposalCount: number;
	messages: Message[];
	status: ConversationStatus;
}

// Mock Conversations
const mockConversations: Conversation[] = [
	{
		id: "1",
		vendorId: "vendor-1",
		vendorName: "Elegant Venues Inc.",
		vendorInitials: "EVI",
		category: "Venue",
		rating: 4.8,
		responseTime: "Responds Within 24 hours",
		lastMessage:
			"We can definitely accommodate the dietary restrictions. Would you like to schedule a tasting?",
		lastMessageTime: "1h ago",
		proposalCount: 1,
		messages: [
			{
				id: "m1",
				text: "Hello! Thank you for considering Elegant Venues Inc. for your wedding. I'd love to discuss your requirements.",
				sender: "vendor",
				timestamp: "05/11/2025",
			},
			{
				id: "m2",
				text: "Hi! We're looking for catering for 100 guests. We have some dietary restrictions to consider.",
				sender: "user",
				timestamp: "05/11/2025",
				isRead: true,
			},
			{
				id: "m3",
				text: "Perfect! We specialize in accommodating various dietary needs. Could you tell me more about the specific restrictions?",
				sender: "vendor",
				timestamp: "06/11/2025",
			},
			{
				id: "m4",
				text: "We need vegetarian and gluten-free options. Also, some guests have nut allergies.",
				sender: "user",
				timestamp: "22h ago",
				isRead: true,
			},
			{
				id: "m5",
				text: "We can definitely accommodate the dietary restrictions. Would you like to schedule a tasting?",
				sender: "vendor",
				timestamp: "1h ago",
			},
		],
		status: "recent",
	},
	{
		id: "2",
		vendorId: "vendor-2",
		vendorName: "Pixel Perfect Photography",
		vendorInitials: "PPP",
		category: "Photography",
		rating: 4.9,
		responseTime: "Responds Within 12 hours",
		lastMessage:
			"Sounds great! I'll send over our detailed package information.",
		lastMessageTime: "3h ago",
		proposalCount: 1,
		messages: [
			{
				id: "m6",
				text: "Hi there! I saw your event listing and would love to discuss photography services.",
				sender: "vendor",
				timestamp: "04/11/2025",
			},
			{
				id: "m7",
				text: "Great! We're looking for a photographer for our wedding. What packages do you offer?",
				sender: "user",
				timestamp: "04/11/2025",
				isRead: true,
			},
			{
				id: "m8",
				text: "Sounds great! I'll send over our detailed package information.",
				sender: "vendor",
				timestamp: "3h ago",
			},
		],
		status: "recent",
	},
];

export default function MessagesTabContent() {
	const [conversations, setConversations] =
		useState<Conversation[]>(mockConversations);
	const [selectedConversationId, setSelectedConversationId] = useState<
		string | null
	>(conversations[0]?.id || null);
	const [showChatOnMobile, setShowChatOnMobile] = useState(false);
	const [isNewChatOpen, setIsNewChatOpen] = useState(false);
	const [viewTab, setViewTab] = useState<ConversationStatus>("recent");
	const [pendingArchiveId, setPendingArchiveId] = useState<string | null>(null);
	const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

	const filteredConversations = conversations.filter(
		(c) => c.status === viewTab,
	);

	const selectedConversation = conversations.find(
		(c) => c.id === selectedConversationId,
	);

	const handleSelectConversation = (id: string) => {
		setSelectedConversationId(id);
		setShowChatOnMobile(true);
	};

	const handleBackToSidebar = () => {
		setShowChatOnMobile(false);
	};

	const handleStartChatWithVendor = (vendor: Vendor) => {
		setConversations((prev) => {
			// Check for existing conversation with this vendor
			const existing = prev.find((c) => c.vendorId === vendor.id);
			if (existing) {
				setSelectedConversationId(existing.id);
				setShowChatOnMobile(true);
				return prev;
			}

			const initials =
				vendor.name
					?.split(" ")
					.map((n) => n[0])
					.join("")
					.toUpperCase() || "";

			const newConversation: Conversation = {
				id: `vendor-${vendor.id}`,
				vendorId: vendor.id,
				vendorName: vendor.name,
				vendorInitials: initials,
				category: vendor.category,
				rating: vendor.rating,
				responseTime: "Typically responds within 24 hours",
				lastMessage: "New conversation started",
				lastMessageTime: "Just now",
				proposalCount: 0,
				messages: [],
				status: "recent",
			};

			const updated = [newConversation, ...prev];
			setSelectedConversationId(newConversation.id);
			setShowChatOnMobile(true);
			return updated;
		});
	};

	const handleArchiveConversation = (id: string) => {
		setConversations((prev) =>
			prev.map((c) =>
				c.id === id
					? {
							...c,
							status: "archived",
						}
					: c,
			),
		);

		if (selectedConversationId === id && viewTab === "recent") {
			setSelectedConversationId(null);
			setShowChatOnMobile(false);
		}
	};

	const handleDeleteConversation = (id: string) => {
		setConversations((prev) => prev.filter((c) => c.id !== id));

		if (selectedConversationId === id) {
			setSelectedConversationId(null);
			setShowChatOnMobile(false);
		}
	};

  const handleSendMessage = (messageText: string) => {
    if (!selectedConversationId) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: "user",
      timestamp: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
      isRead: false,
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === selectedConversationId
          ? {
              ...c,
              messages: [...c.messages, newMessage],
              lastMessage: messageText,
              lastMessageTime: "Just now",
            }
          : c
      )
    );
  };

  return (
    <>
      <div className="overflow-hidden rounded-lg border !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617]">
        {/* Recent / Archived tabs */}
        <div className="flex items-center justify-between border-b bg-muted/40 dark:bg-transparent px-3 py-2 lg:px-4">
          <div className="inline-flex gap-2 rounded-full bg-muted/60 dark:bg-[#020617] p-1 text-xs lg:text-sm">
            <button
              type="button"
              onClick={() => setViewTab("recent")}
              className={cn(
                "rounded-full px-3 py-1",
                viewTab === "recent"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-muted-foreground hover:bg-muted",
              )}
            >
              Recent
            </button>
            <button
              type="button"
              onClick={() => setViewTab("archived")}
              className={cn(
                "rounded-full px-3 py-1",
                viewTab === "archived"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-muted-foreground hover:bg-muted",
              )}
            >
              Archived
            </button>
          </div>
        </div>

				<div className="flex min-h-[500px] h-[calc(100vh-24rem)] lg:h-[650px]">
					{/* Left Sidebar - Hidden on mobile when chat is shown */}
					<div
						className={cn(
							"flex h-full w-full flex-col border-r bg-muted/30 dark:bg-transparent lg:w-1/3",
							showChatOnMobile && "hidden lg:flex",
						)}
					>
						<MessagesSidebar
							conversations={filteredConversations}
							selectedConversationId={selectedConversationId}
							onSelectConversation={handleSelectConversation}
							onNewChat={() => setIsNewChatOpen(true)}
						/>
					</div>

          {/* Right Chat View - Hidden on mobile when sidebar is shown */}
          {selectedConversation ? (
            <div
              className={cn(
                "flex min-w-0 flex-1 flex-col",
                !showChatOnMobile && "hidden lg:flex",
              )}
            >
              <ChatView
                contactName={selectedConversation.vendorName}
                contactInitials={selectedConversation.vendorInitials}
                contactSubtitle={`${selectedConversation.category} • ⭐ ${selectedConversation.rating} • ${selectedConversation.responseTime}`}
                messages={selectedConversation.messages.map((msg): ChatMessage => ({
                  id: msg.id,
                  text: msg.text,
                  sender: msg.sender === "user" ? "user" : "vendor",
                  timestamp: msg.timestamp,
                  isRead: msg.isRead,
                }))}
                onSendMessage={handleSendMessage}
                showCallButtons={true}
                showBackButton={true}
                onBack={handleBackToSidebar}
                autoScroll={true}
                autoScrollOnMount={false}
                conversationKey={selectedConversation.id}
                vendorSenderType="vendor"
                headerActions={
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-muted"
                        aria-label="Conversation actions"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => setPendingArchiveId(selectedConversation.id)}
                      >
                        Archive chat
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => setPendingDeleteId(selectedConversation.id)}
                      >
                        Delete chat
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                }
              />
            </div>
          ) : (
            <div className="hidden flex-1 items-center justify-center lg:flex">
              <p className="text-muted-foreground">
                Select a conversation to start messaging
              </p>
            </div>
          )}
        </div>
      </div>

			<NewChatDialog
				open={isNewChatOpen}
				onOpenChange={setIsNewChatOpen}
				vendors={mockVendors}
				onSelectVendor={(vendor) => {
					handleStartChatWithVendor(vendor);
					setIsNewChatOpen(false);
				}}
			/>

			{/* Archive confirmation */}
			<AlertDialog
				open={!!pendingArchiveId}
				onOpenChange={(open) => {
					if (!open) setPendingArchiveId(null);
				}}
			>
				<AlertDialogContent className="!bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:rgb(255_255_255/0.98)] dark:[background-color:#020617]">
					<AlertDialogHeader>
						<AlertDialogTitle>Archive this chat?</AlertDialogTitle>
						<AlertDialogDescription>
							This conversation will be moved to the Archived tab. You can still
							view it there, but it will be hidden from Recent.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={() => {
								if (pendingArchiveId) {
									handleArchiveConversation(pendingArchiveId);
								}
								setPendingArchiveId(null);
							}}
						>
							Archive chat
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			{/* Delete confirmation */}
			<AlertDialog
				open={!!pendingDeleteId}
				onOpenChange={(open) => {
					if (!open) setPendingDeleteId(null);
				}}
			>
				<AlertDialogContent className="!bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:rgb(255_255_255/0.98)] dark:[background-color:#020617]">
					<AlertDialogHeader>
						<AlertDialogTitle>Delete this chat?</AlertDialogTitle>
						<AlertDialogDescription>
							This will permanently remove this conversation. This action cannot
							be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							className="bg-red-600 hover:bg-red-700 text-white"
							onClick={() => {
								if (pendingDeleteId) {
									handleDeleteConversation(pendingDeleteId);
								}
								setPendingDeleteId(null);
							}}
						>
							Delete chat
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
