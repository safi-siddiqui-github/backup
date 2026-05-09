"use client";
import React from "react";
import { Clock, MapPin, Users, Edit, Trash2, Pencil, User, Calendar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { SessionCardData } from "./types";

type Props = {
	session: SessionCardData;
	density: "low" | "high";
	onEdit?: (s: SessionCardData) => void;
	onDelete?: (s: SessionCardData) => void;
	onClick?: (s: SessionCardData) => void;
};

type SpeakerProfile = {
	name: string;
	title?: string;
	company?: string;
	avatar?: string;
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
		"Maria Garcia": {
			name: "Maria Garcia",
			title: "MLOps Engineer",
			company: "CloudScale Inc",
			avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop",
		},
		"David Kim": {
			name: "David Kim",
			title: "Security Architect",
			company: "SecureCloud",
			avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
		},
		"Lisa Wong": {
			name: "Lisa Wong",
			title: "DevOps Lead",
			company: "InfraTech",
			avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
		},
		"Emma Thompson": {
			name: "Emma Thompson",
			title: "Frontend Architect",
			company: "ReactWorks",
			avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654d0b?w=200&h=200&fit=crop",
		},
		"Carlos Rodriguez": {
			name: "Carlos Rodriguez",
			title: "Senior Developer",
			company: "WebDev Pro",
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

const getStatusClasses = (status: SessionCardData["status"]) => {
	switch (status) {
		case "Full":
			return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200";
		case "Almost Full":
			return "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-200";
		case "Available":
		default:
			return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200";
	}
};

export default function ScheduleCard({
	session,
	density,
	onEdit,
	onDelete,
	onClick,
}: Props) {
	const utilization = Math.round((session.registered / session.capacity) * 100);
	const speakerProfiles = (session.speakers && session.speakers.length > 0)
		? session.speakers.map(getSpeakerProfile)
		: [];

	if (density === "high") {
		return (
			<div
				onClick={() => onClick?.(session)}
				className={`relative shrink-0 w-72 h-72 flex flex-col rounded-lg border shadow-sm ${onClick ? "cursor-pointer" : ""} transition-all hover:shadow-md ${session.colors.border} ${session.colors.bg} dark:${session.colors.darkBg}`}
			>
				<div className="p-4 flex-1 overflow-auto">
					<div className="flex justify-between items-start">
						<h4 className="font-bold text-gray-900 dark:text-white flex-1 mr-2">
							{session.title}
						</h4>
						<span className="px-2 py-0.5 text-xs font-medium text-gray-700 bg-gray-100 dark:text-gray-100 dark:bg-gray-700 rounded">
							{session.type}
						</span>
					</div>
					<span
						className={`mt-2 inline-block px-2 py-0.5 text-xs font-medium rounded ${session.colors.tagBg} ${session.colors.tagText} dark:${session.colors.darkTagBg} dark:${session.colors.darkTagText}`}
					>
						{session.track}
					</span>
					<div className="flex items-center gap-2 mt-2 text-sm text-gray-500 dark:text-gray-400">
						<Clock className="w-4 h-4" />
						<span>{session.time}</span>
					</div>
					<div className="flex items-center gap-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
						<MapPin className="w-4 h-4" />
						<span>{session.location}</span>
					</div>
					{/* Speakers Section - Prominent Display for High Density */}
					{speakerProfiles.length > 0 && (
						<div className="mt-3 space-y-1.5">
							<div className="flex items-center gap-1 text-xs font-semibold text-gray-700 dark:text-gray-300">
								<User className="w-3 h-3" />
								<span>Speakers</span>
							</div>
							<div className="flex flex-wrap gap-1.5">
								{speakerProfiles.slice(0, 2).map((speaker, index) => (
									<div
										key={index}
										className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow transition-shadow"
										onClick={(e) => e.stopPropagation()}
									>
										<Avatar className="h-6 w-6 flex-shrink-0">
											<AvatarImage src={speaker.avatar} alt={speaker.name} />
											<AvatarFallback className="text-[10px] font-medium">
												{getInitials(speaker.name)}
											</AvatarFallback>
										</Avatar>
										<div className="min-w-0 flex-1">
											<p className="text-xs font-medium text-gray-900 dark:text-white truncate">
												{speaker.name}
											</p>
											{speaker.title && (
												<p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">
													{speaker.title}
												</p>
											)}
										</div>
									</div>
								))}
								{speakerProfiles.length > 2 && (
									<div className="flex items-center px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
										<span className="text-xs font-medium text-gray-600 dark:text-gray-300">
											+{speakerProfiles.length - 2}
										</span>
									</div>
								)}
							</div>
						</div>
					)}
					<div className="flex items-center gap-2 mt-3">
						<Users className="w-4 h-4 text-gray-400" />
						<span className="text-sm font-medium text-gray-700 dark:text-gray-200">
							{session.registered} / {session.capacity}
						</span>
						<span
							className={`text-xs font-semibold px-2 py-0.5 rounded ${getStatusClasses(session.status)}`}
						>
							{session.status}
						</span>
					</div>
				</div>
				<div className="flex border-t border-gray-200 dark:border-gray-700">
					<button
						onClick={(e) => {
							e.stopPropagation();
							onEdit?.(session);
						}}
						className="flex-1 flex items-center justify-center gap-2 p-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
					>
						<Edit className="w-4 h-4" /> Edit
					</button>
					<div className="w-px bg-gray-200 dark:bg-gray-700"></div>
					<button
						onClick={(e) => {
							e.stopPropagation();
							onDelete?.(session);
						}}
						className="flex-1 flex items-center justify-center gap-2 p-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
					>
						<Trash2 className="w-4 h-4" /> Delete
					</button>
				</div>
			</div>
		);
	}

	return (
		<div
			onClick={() => onClick?.(session)}
			className={`rounded-xl border shadow-sm ${onClick ? "cursor-pointer hover:shadow-md transition-shadow" : ""} ${session.colors.border} ${session.colors.bg} dark:${session.colors.darkBg}`}
		>
			<div className="p-4 sm:p-5">
				<div className="flex justify-between items-start">
					<div>
						<h3 className="text-lg font-bold text-gray-900 dark:text-white">
							{session.title}
						</h3>
						<span className="px-2.5 py-1 mt-2 inline-block text-xs font-medium text-gray-800 bg-gray-100 dark:text-gray-100 dark:bg-gray-700 rounded-full">
							{session.type}
						</span>
					</div>
					<div className="flex items-center gap-2">
						<button
							onClick={(e) => {
								e.stopPropagation();
								onEdit?.(session);
							}}
							className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-white transition-colors"
						>
							<Pencil className="w-5 h-5" />
						</button>
						<button
							onClick={(e) => {
								e.stopPropagation();
								onDelete?.(session);
							}}
							className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-red-600 dark:hover:text-red-500 transition-colors"
						>
							<Trash2 className="w-5 h-5" />
						</button>
					</div>
				</div>
				<span
					className={`mt-3 inline-block px-2.5 py-1 text-xs font-medium rounded-full ${session.colors.tagBg} ${session.colors.tagText} dark:${session.colors.darkTagBg} dark:${session.colors.darkTagText}`}
				>
					{session.track}
				</span>
				{/* Speakers Section - Profile Cards */}
				{speakerProfiles.length > 0 && (
					<div className="mt-4 flex flex-wrap gap-2">
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
				)}
				<div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-sm text-gray-600 dark:text-gray-400">
					{session.date && (
						<span className="flex items-center gap-1.5">
							<Calendar className="w-4 h-4" />
							{session.date}
						</span>
					)}
					<span className="flex items-center gap-1.5">
						<Clock className="w-4 h-4" />
						{session.time}
					</span>
					<span className="flex items-center gap-1.5">
						<MapPin className="w-4 h-4" />
						{session.location}
					</span>
				</div>
				<div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mt-4">
					<div className="flex items-center gap-2">
						<Users className="w-5 h-5 text-gray-400" />
						<span className="font-bold text-gray-900 dark:text-white">
							{session.registered} / {session.capacity}
						</span>
						<span className="text-sm text-gray-600 dark:text-gray-400">
							Registered
						</span>
					</div>
					<div className="w-full sm:w-40">
						<div className="flex justify-between text-sm mb-1">
							<span
								className={`font-bold ${session.colors.tagText} dark:${session.colors.darkTagText}`}
							>
								{utilization}%
							</span>
							<span
								className={`text-xs font-semibold px-2 py-0.5 rounded ${getStatusClasses(session.status)}`}
							>
								{session.status}
							</span>
						</div>
						<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
							<div
								className={`h-2 rounded-full ${session.colors.progress}`}
								style={{ width: `${utilization}%` }}
							></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
