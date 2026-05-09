"use client";
import React from "react";
import {
	CalendarDays,
	Clock,
	MapPin,
	ChevronRight,
	ChevronUp,
	Pencil,
	Trash2,
	Search,
	User,
	Mail,
	Linkedin,
	Twitter,
} from "lucide-react";
import AvatarStack from "./AvatarStack";
import { Session as SessionType } from "./types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type SessionCardProps = {
	session: SessionType;
	onToggle: () => void;
	isExpanded: boolean;
	onEdit: () => void;
	onDelete: () => void;
	onClick?: () => void;
};

type SpeakerProfile = {
	name: string;
	title?: string;
	company?: string;
	bio?: string;
	avatar?: string;
	email?: string;
	linkedin?: string;
	twitter?: string;
};

// Mock speaker profiles - in real app, this would come from API
const getSpeakerProfile = (name: string): SpeakerProfile => {
	const profiles: Record<string, SpeakerProfile> = {
		"Dr. Evelyn Reed": {
			name: "Dr. Evelyn Reed",
			title: "Chief AI Scientist",
			company: "TechVision Labs",
			avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
		},
		"Alex Johnson": {
			name: "Alex Johnson",
			title: "Senior ML Engineer",
			company: "DataFlow Systems",
			avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
		},
		"Dr. Sarah Chen": {
			name: "Dr. Sarah Chen",
			title: "Research Director",
			company: "AI Innovations",
			avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
		},
		"Prof. Michael Rodriguez": {
			name: "Prof. Michael Rodriguez",
			title: "Professor of Computer Science",
			company: "Stanford University",
			avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
		},
		"Dr. Kenji Tanaka": {
			name: "Dr. Kenji Tanaka",
			title: "Principal Researcher",
			company: "Tokyo Tech",
			avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop",
		},
	};

	return (
		profiles[name] || {
			name,
			title: "Speaker",
			avatar: undefined,
		}
	);
};

const getInitials = (name: string): string => {
	if (!name) return "?";
	const parts = name.split(" ");
	if (parts.length === 1) return name[0] ? name[0].toUpperCase() : "?";
	return (parts[0][0] || "") + (parts[parts.length - 1][0] || "");
};

const SessionCard: React.FC<SessionCardProps> = ({
	session,
	onToggle,
	isExpanded,
	onEdit,
	onDelete,
	onClick,
}) => {
	const speakerProfiles = session.speakers.map(getSpeakerProfile);
	const aColors = [
		"bg-blue-500",
		"bg-indigo-500",
		"bg-purple-500",
		"bg-pink-500",
		"bg-red-500",
		"bg-orange-500",
		"bg-yellow-500",
		"bg-green-500",
		"bg-teal-500",
	];
	const getInitials = (name: string): string => {
		if (!name) return "?";
		const parts = name.split(" ");
		if (parts.length === 1) return name[0] ? name[0].toUpperCase() : "?";
		return (parts[0][0] || "") + (parts[parts.length - 1][0] || "");
	};
	const getColor = (name: string): string =>
		aColors[String(name).length % aColors.length];

	return (
		<div
			className={`rounded-xl border shadow-sm ${session.colors.border} ${session.colors.bg} dark:${session.colors.darkBg} ${onClick ? "cursor-pointer hover:shadow-md transition-shadow" : ""}`}
			onClick={onClick}
		>
			<div className="p-4 sm:p-6">
				<div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
					<div className="flex-1">
						<h3 className="text-xl font-bold text-gray-900 dark:text-white">
							{session.title}
						</h3>
						<div className="mt-2 flex flex-wrap items-center gap-2">
							<span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-100">
								{session.type}
							</span>
							<span
								className={`px-2.5 py-1 text-xs font-medium ${session.colors.tagBg} ${session.colors.tagText} dark:${session.colors.darkTagBg} dark:${session.colors.darkTagText} rounded-full`}
							>
								{session.track}
							</span>
							<span className="text-sm font-semibold text-red-600 dark:text-red-400">
								{session.status}
							</span>
						</div>
					</div>
					<div className="flex items-center gap-3 self-start sm:self-center">
						<button
							onClick={(e) => {
								e.stopPropagation();
								onEdit();
							}}
							className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
						>
							<Pencil className="h-5 w-5" />
						</button>
						<button
							onClick={(e) => {
								e.stopPropagation();
								onDelete();
							}}
							className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-red-600 dark:hover:bg-gray-700 dark:hover:text-red-500"
						>
							<Trash2 className="h-5 w-5" />
						</button>
					</div>
				</div>

				<p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
					{session.description}
				</p>

				{/* Speakers Section - Prominent Display with Profile Cards */}
				{speakerProfiles.length > 0 && (
					<div className="mt-4 space-y-2">
						<div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
							<User className="h-4 w-4" />
							<span>Speakers</span>
						</div>
						<div className="flex flex-wrap gap-2">
							{speakerProfiles.map((speaker, index) => (
								<div
									key={index}
									className="group flex items-center gap-2.5 p-2.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:shadow-md transition-all duration-200"
									onClick={(e) => e.stopPropagation()}
								>
									<Avatar className="h-11 w-11 flex-shrink-0 ring-2 ring-gray-200 dark:ring-gray-700 group-hover:ring-purple-300 dark:group-hover:ring-purple-600 transition-all">
										<AvatarImage src={speaker.avatar} alt={speaker.name} />
										<AvatarFallback className="text-sm font-semibold bg-gradient-to-br from-purple-400 to-purple-600 text-white">
											{getInitials(speaker.name)}
										</AvatarFallback>
									</Avatar>
									<div className="min-w-0 flex-1">
										<p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
											{speaker.name}
										</p>
										{speaker.title && (
											<p className="text-xs text-gray-500 dark:text-gray-400 truncate">
												{speaker.title}
												{speaker.company && ` @ ${speaker.company}`}
											</p>
										)}
									</div>
								</div>
							))}
						</div>
					</div>
				)}

				<div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600 dark:text-gray-400">
					<span className="flex items-center gap-1.5">
						<CalendarDays className="h-4 w-4" />
						{session.date}
					</span>
					<span className="flex items-center gap-1.5">
						<Clock className="h-4 w-4" />
						{session.time}
					</span>
					<span className="flex items-center gap-1.5">
						<MapPin className="h-4 w-4" />
						{session.location}
					</span>
				</div>

				<div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
					<AvatarStack attendees={session.attendees} />
					<div className="flex items-center gap-4">
						<div className="text-right text-sm">
							<div className="font-bold text-gray-900 dark:text-white">
								{session.registered} / {session.capacity}{" "}
								<span className="font-medium text-gray-600 dark:text-gray-400">
									Registered
								</span>
							</div>
							<div className="text-gray-500 dark:text-gray-400">
								{session.checkedIn} checked in
							</div>
						</div>
						<button
							onClick={(e) => {
								e.stopPropagation();
								onToggle();
							}}
							className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
						>
							{isExpanded ? "Hide" : "View All"}
							{isExpanded ? (
								<ChevronUp className="h-4 w-4" />
							) : (
								<ChevronRight className="h-4 w-4" />
							)}
						</button>
					</div>
				</div>
			</div>

			<div
				className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
			>
				<div className="border-t border-gray-200 p-4 sm:p-6 dark:border-gray-700">
					<div className="relative">
						<Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
						<input
							type="text"
							placeholder="Search attendees..."
							className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2 pr-4 pl-10 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
						/>
					</div>

					<div className="mt-4 max-h-80 space-y-2 overflow-y-auto pr-2">
						{session.attendees.map((att) => (
							<div
								key={att.name}
								className="flex items-center justify-between rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50"
							>
								<div className="flex items-center gap-3">
									<span
										className={`inline-flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium text-white ${getColor(att.name)}`}
									>
										{getInitials(att.name)}
									</span>
									<div>
										<div className="font-medium text-gray-900 dark:text-white">
											{att.name}
										</div>
										<div className="text-xs text-gray-500 dark:text-gray-400">
											{att.title}
										</div>
									</div>
									{att.status === "pending" && (
										<span title="Pending" className="inline-flex items-center">
											<Clock className="h-4 w-4 text-orange-500" />
										</span>
									)}
								</div>
								<span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-100">
									{att.tag}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SessionCard;
