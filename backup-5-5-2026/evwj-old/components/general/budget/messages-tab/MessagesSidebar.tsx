"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Conversation } from "./MessagesTabContent";
import { cn } from "@/lib/utils";

interface MessagesSidebarProps {
	conversations: Conversation[];
	selectedConversationId: string | null;
	onSelectConversation: (id: string) => void;
	onNewChat: () => void;
}

export default function MessagesSidebar({
	conversations,
	selectedConversationId,
	onSelectConversation,
	onNewChat,
}: MessagesSidebarProps) {
	const [searchQuery, setSearchQuery] = useState("");

	const filteredConversations = conversations.filter((conv) =>
		conv.vendorName.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	return (
		<div className="flex h-full flex-col">
			{/* Header */}
			<div className="border-b p-3 lg:p-4">
				<div className="mb-3 flex items-center justify-between gap-2 lg:mb-4">
					<h2 className="text-lg font-bold lg:text-xl">Messages</h2>
					<Button
						size="sm"
						className="h-8 px-3 text-xs lg:h-9 lg:px-4 lg:text-sm bg-blue-600 hover:bg-blue-700 text-white"
						onClick={onNewChat}
					>
						New Chat
					</Button>
				</div>
				<div className="relative">
					<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
					<Input
						placeholder="Search conversations..."
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
						No conversations found
					</div>
				) : (
					filteredConversations.map((conversation) => (
						<div
							key={conversation.id}
							onClick={() => onSelectConversation(conversation.id)}
							className={cn(
								"p-3 lg:p-4 border-b cursor-pointer transition-colors hover:bg-muted/50",
								selectedConversationId === conversation.id &&
									"bg-blue-50 dark:bg-blue-900/20",
							)}
						>
							<div className="flex items-start gap-2 lg:gap-3">
								<Avatar className="h-8 w-8 lg:h-10 lg:w-10 shrink-0">
									<AvatarFallback className="text-xs lg:text-sm">
										{conversation.vendorInitials}
									</AvatarFallback>
								</Avatar>
								<div className="flex-1 min-w-0">
									<div className="flex items-center justify-between mb-1">
										<p className="font-semibold text-xs lg:text-sm truncate">
											{conversation.vendorName}
										</p>
										<span className="text-xs text-muted-foreground shrink-0 ml-2">
											{conversation.lastMessageTime}
										</span>
									</div>
									<p className="text-xs text-muted-foreground line-clamp-2 mb-2">
										{conversation.lastMessage}
									</p>
									<div className="flex items-center gap-1 lg:gap-2 flex-wrap">
										<Badge variant="secondary" className="text-xs">
											{conversation.category}
										</Badge>
										<Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 text-xs">
											{conversation.proposalCount} proposal
										</Badge>
									</div>
								</div>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
}
