"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
	Phone,
	Video,
	Paperclip,
	Send,
	Check,
	ArrowLeft,
	MoreVertical,
} from "lucide-react";
import { Conversation } from "./MessagesTabContent";
import { cn } from "@/lib/utils";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChatViewProps {
	conversation: Conversation;
	onBack?: () => void;
	onArchive?: (id: string) => void;
	onDelete?: (id: string) => void;
}

export default function ChatView({
	conversation,
	onBack,
	onArchive,
	onDelete,
}: ChatViewProps) {
	const [message, setMessage] = useState("");

	const handleSend = () => {
		if (message.trim()) {
			// Handle send message logic here
			console.log("Sending message:", message);
			setMessage("");
		}
	};

	return (
		<div className="flex-1 flex flex-col min-w-0 overflow-hidden">
			{/* Chat Header */}
			<div className="border-b shrink-0">
				{/* Top Section - Vendor Info */}
				<div className="flex items-center justify-between gap-2 p-3">
					<div className="flex min-w-0 flex-1 items-center gap-2">
						{onBack && (
							<Button
								variant="ghost"
								size="icon"
								onClick={onBack}
								className="shrink-0 h-9 w-9 lg:hidden"
							>
								<ArrowLeft className="h-4 w-4" />
							</Button>
						)}
						<Avatar className="h-10 w-10 shrink-0">
							<AvatarFallback className="text-xs">
								{conversation.vendorInitials}
							</AvatarFallback>
						</Avatar>
						<div className="min-w-0 flex-1 overflow-hidden">
							<p className="truncate text-sm font-semibold">
								{conversation.vendorName}
							</p>
							<p
								className="text-xs text-muted-foreground line-clamp-2"
								style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}
							>
								{conversation.category} • ⭐ {conversation.rating} •{" "}
								{conversation.responseTime}
							</p>
						</div>
					</div>
					{/* Desktop actions - Right Side */}
					<div className="hidden shrink-0 items-center gap-2 lg:flex">
						<Button variant="outline" size="sm" className="h-8 text-xs">
							<Phone className="mr-1.5 h-3.5 w-3.5" />
							Call
						</Button>
						<Button variant="outline" size="sm" className="h-8 text-xs">
							<Video className="mr-1.5 h-3.5 w-3.5" />
							Video
						</Button>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									className="h-8 w-8"
									aria-label="Conversation actions"
								>
									<MoreVertical className="h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem onClick={() => onArchive?.(conversation.id)}>
									Archive chat
								</DropdownMenuItem>
								<DropdownMenuItem
									className="text-red-600"
									onClick={() => onDelete?.(conversation.id)}
								>
									Delete chat
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
				{/* Mobile Bottom Section - Call/Video Buttons */}
				<div className="lg:hidden px-3 pb-2 flex items-center gap-2 w-full">
					<Button variant="outline" size="sm" className="flex-1 text-xs h-8">
						<Phone className="h-3.5 w-3.5 mr-1.5" />
						Call
					</Button>
					<Button variant="outline" size="sm" className="flex-1 text-xs h-8">
						<Video className="h-3.5 w-3.5 mr-1.5" />
						Video
					</Button>
				</div>
			</div>

			{/* Messages Area */}
			<div className="flex-1 overflow-y-auto p-3 space-y-3">
				{conversation.messages.map((msg) => (
					<div
						key={msg.id}
						className={cn(
							"flex w-full px-0",
							msg.sender === "user" ? "justify-end" : "justify-start",
						)}
					>
						<div
							className={cn(
								"max-w-[95%] min-w-0 rounded-lg px-3 py-2",
								msg.sender === "user"
									? "bg-blue-600 text-white"
									: "bg-muted text-foreground",
							)}
						>
							<p
								className="text-xs leading-relaxed break-words whitespace-pre-wrap"
								style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}
							>
								{msg.text}
							</p>
							<div
								className={cn(
									"flex items-center gap-1 mt-1.5 text-[10px] shrink-0",
									msg.sender === "user"
										? "text-blue-100"
										: "text-muted-foreground",
								)}
							>
								<span className="whitespace-nowrap">{msg.timestamp}</span>
								{msg.sender === "user" && (
									<Check className="h-3 w-3 shrink-0" />
								)}
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Message Input */}
			<div className="p-3 border-t shrink-0 w-full">
				<div className="flex items-center gap-1.5 min-w-0 w-full">
					<Button variant="ghost" size="icon" className="shrink-0 h-8 w-8">
						<Paperclip className="h-4 w-4" />
					</Button>
					<Input
						placeholder="Type your message..."
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						onKeyPress={(e) => {
							if (e.key === "Enter") {
								handleSend();
							}
						}}
						className="flex-1 text-xs h-8 min-w-0"
					/>
					<Button
						onClick={handleSend}
						className="bg-blue-600 hover:bg-blue-700 text-white shrink-0 h-8 w-8"
						size="icon"
					>
						<Send className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	);
}
