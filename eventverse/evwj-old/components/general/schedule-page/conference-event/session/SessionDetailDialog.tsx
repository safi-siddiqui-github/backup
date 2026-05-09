"use client";
import React from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
	CalendarDays,
	Clock,
	MapPin,
	Users,
	X,
	User,
	Mail,
	Linkedin,
	Twitter,
	BookOpen,
	TrendingUp,
	CheckCircle2,
	Info,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Session } from "./types";
import type { SessionCardData } from "../calendar/types";

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
			bio: "Leading researcher in artificial intelligence with 15+ years of experience in machine learning and neural networks.",
			avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
			email: "evelyn.reed@techvision.com",
			linkedin: "linkedin.com/in/evelynreed",
			twitter: "@evelynreed",
		},
		"Alex Johnson": {
			name: "Alex Johnson",
			title: "Senior ML Engineer",
			company: "DataFlow Systems",
			bio: "Expert in building scalable machine learning pipelines and production ML systems.",
			avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
			email: "alex.johnson@dataflow.com",
			linkedin: "linkedin.com/in/alexjohnson",
		},
		"Dr. Sarah Chen": {
			name: "Dr. Sarah Chen",
			title: "Research Director",
			company: "AI Innovations",
			bio: "Pioneer in deep learning and computer vision with numerous publications in top-tier conferences.",
			avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
			email: "sarah.chen@aiinnovations.com",
			linkedin: "linkedin.com/in/sarahchen",
			twitter: "@sarahchen",
		},
		"Prof. Michael Rodriguez": {
			name: "Prof. Michael Rodriguez",
			title: "Professor of Computer Science",
			company: "Stanford University",
			bio: "Distinguished professor specializing in natural language processing and AI ethics.",
			avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
			email: "m.rodriguez@stanford.edu",
			linkedin: "linkedin.com/in/michaelrodriguez",
		},
		"Dr. Kenji Tanaka": {
			name: "Dr. Kenji Tanaka",
			title: "Principal Researcher",
			company: "Tokyo Tech",
			bio: "Leading expert in NLP and transformer architectures with breakthrough research in multilingual models.",
			avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop",
			email: "kenji.tanaka@tokyotech.ac.jp",
			linkedin: "linkedin.com/in/kenjitanaka",
		},
	};

	return (
		profiles[name] || {
			name,
			title: "Speaker",
			bio: "Expert in their field with extensive experience.",
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

// Convert SessionCardData to Session format
const convertToSession = (data: SessionCardData): Session => {
	return {
		id: data.id,
		title: data.title,
		type: data.type,
		track: data.track,
		status: data.status,
		description: data.description || "",
		date: data.date || "",
		time: data.time,
		location: data.location,
		registered: data.registered,
		capacity: data.capacity,
		checkedIn: 0,
		attendees: [],
		skillLevel: "All Levels",
		speakers: data.speakers || [],
		tags: "",
		colors: {
			border: data.colors.border,
			bg: data.colors.bg,
			darkBg: data.colors.darkBg,
			tagBg: data.colors.tagBg,
			tagText: data.colors.tagText,
			darkTagBg: data.colors.darkTagBg,
			darkTagText: data.colors.darkTagText,
			progress: data.colors.progress,
		},
	};
};

type SessionDetailDialogProps = {
	session: Session | SessionCardData | null;
	isOpen: boolean;
	onClose: () => void;
};

export default function SessionDetailDialog({
	session,
	isOpen,
	onClose,
}: SessionDetailDialogProps) {
	if (!session) return null;

	// Convert SessionCardData to Session if needed
	const sessionData: Session =
		"checkedIn" in session ? session : convertToSession(session);

	const speakerProfiles = sessionData.speakers.map(getSpeakerProfile);
	const utilization = Math.round(
		(sessionData.registered / sessionData.capacity) * 100,
	);

	// Enhanced description with more details
	const enhancedDescription = sessionData.description || "Join us for an engaging session that will provide valuable insights and practical knowledge.";

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-0" showCloseButton={false}>
				{/* Header Section with Gradient */}
				<div
					className={`relative overflow-hidden rounded-t-lg ${sessionData.colors.bg} ${sessionData.colors.darkBg} p-6 pb-8`}
				>
					<div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent dark:from-black/10" />
					<div className="relative z-10">
						<div className="flex items-start justify-between mb-4">
							<div className="flex-1 pr-4">
								<div className="flex items-center gap-3 mb-3">
									<Badge
										variant="secondary"
										className="text-xs font-semibold px-3 py-1"
									>
										{sessionData.type.toUpperCase()}
									</Badge>
									<Badge
										className={`${sessionData.colors.tagBg} ${sessionData.colors.tagText} dark:${sessionData.colors.darkTagBg} dark:${sessionData.colors.darkTagText} text-xs font-semibold px-3 py-1`}
									>
										{sessionData.track}
									</Badge>
									<Badge
										variant={sessionData.status === "Full" ? "destructive" : sessionData.status === "Almost Full" ? "default" : "secondary"}
										className="text-xs font-semibold px-3 py-1"
									>
										{sessionData.status}
									</Badge>
								</div>
								<DialogTitle className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
									{sessionData.title}
								</DialogTitle>
							</div>
							<Button
								variant="ghost"
								size="icon"
								onClick={onClose}
								className="h-9 w-9 rounded-full hover:bg-white/20 dark:hover:bg-black/20"
							>
								<X className="h-5 w-5" />
							</Button>
						</div>

						{/* Quick Info Bar */}
						<div className="flex flex-wrap items-center gap-4 text-sm">
							<div className="flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
								<CalendarDays className="h-4 w-4 text-gray-700 dark:text-gray-300" />
								<span className="font-medium text-gray-900 dark:text-white">
									{sessionData.date}
								</span>
							</div>
							<div className="flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
								<Clock className="h-4 w-4 text-gray-700 dark:text-gray-300" />
								<span className="font-medium text-gray-900 dark:text-white">
									{sessionData.time}
								</span>
							</div>
							<div className="flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
								<MapPin className="h-4 w-4 text-gray-700 dark:text-gray-300" />
								<span className="font-medium text-gray-900 dark:text-white">
									{sessionData.location}
								</span>
							</div>
							<div className="flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
								<Users className="h-4 w-4 text-gray-700 dark:text-gray-300" />
								<span className="font-medium text-gray-900 dark:text-white">
									{sessionData.registered} / {sessionData.capacity}
								</span>
							</div>
						</div>
					</div>
				</div>

				<div className="p-6 space-y-6">
					{/* Enhanced Description Section */}
					<div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
						<div className="flex items-start gap-3 mb-3">
							<div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
								<BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
							</div>
							<div className="flex-1">
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
									About This Session
								</h3>
								<p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
									{enhancedDescription}
								</p>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
									<div className="flex items-start gap-2">
										<Info className="h-4 w-4 text-gray-500 dark:text-gray-400 mt-0.5 flex-shrink-0" />
										<div>
											<p className="text-xs font-medium text-gray-500 dark:text-gray-400">
												Skill Level
											</p>
											<p className="text-sm font-semibold text-gray-900 dark:text-white">
												{sessionData.skillLevel}
											</p>
										</div>
									</div>
									<div className="flex items-start gap-2">
										<TrendingUp className="h-4 w-4 text-gray-500 dark:text-gray-400 mt-0.5 flex-shrink-0" />
										<div>
											<p className="text-xs font-medium text-gray-500 dark:text-gray-400">
												Session Type
											</p>
											<p className="text-sm font-semibold text-gray-900 dark:text-white capitalize">
												{sessionData.type}
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Speakers Section - List View */}
					{speakerProfiles.length > 0 && (
						<div className="space-y-4">
							<div className="flex items-center gap-3 mb-4">
								<div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
									<User className="h-5 w-5 text-purple-600 dark:text-purple-400" />
								</div>
								<h3 className="text-xl font-bold text-gray-900 dark:text-white">
									Meet the Speakers
								</h3>
								<span className="text-sm text-gray-500 dark:text-gray-400">
									({speakerProfiles.length} {speakerProfiles.length === 1 ? "speaker" : "speakers"})
								</span>
							</div>
							<div className="space-y-3">
								{speakerProfiles.map((speaker, index) => (
									<div
										key={index}
										className="group flex items-start gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-md transition-all duration-200"
									>
										<Avatar className="h-16 w-16 flex-shrink-0 ring-2 ring-gray-200 dark:ring-gray-700 group-hover:ring-purple-300 dark:group-hover:ring-purple-600 transition-all">
											<AvatarImage src={speaker.avatar} alt={speaker.name} />
											<AvatarFallback className="text-lg font-bold bg-gradient-to-br from-purple-400 to-purple-600 text-white">
												{getInitials(speaker.name)}
											</AvatarFallback>
										</Avatar>
										<div className="flex-1 min-w-0">
											<h4 className="text-base font-bold text-gray-900 dark:text-white mb-1">
												{speaker.name}
											</h4>
											{speaker.title && speaker.company && (
												<p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
													{speaker.title} {speaker.company && `@ ${speaker.company}`}
												</p>
											)}
											{(!speaker.title || !speaker.company) && (
												<>
													{speaker.title && (
														<p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
															{speaker.title}
														</p>
													)}
													{speaker.company && (
														<p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
															{speaker.company}
														</p>
													)}
												</>
											)}
											{speaker.bio && (
												<p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mt-2">
													{speaker.bio}
												</p>
											)}
											<div className="flex items-center gap-2 mt-3">
												{speaker.email && (
													<a
														href={`mailto:${speaker.email}`}
														className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 transition-colors"
														title={speaker.email}
													>
														<Mail className="h-4 w-4" />
													</a>
												)}
												{speaker.linkedin && (
													<a
														href={`https://${speaker.linkedin}`}
														target="_blank"
														rel="noopener noreferrer"
														className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 transition-colors"
														title="LinkedIn"
													>
														<Linkedin className="h-4 w-4" />
													</a>
												)}
												{speaker.twitter && (
													<a
														href={`https://twitter.com/${speaker.twitter.replace("@", "")}`}
														target="_blank"
														rel="noopener noreferrer"
														className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 hover:bg-blue-100 hover:text-blue-400 dark:hover:bg-blue-900/30 dark:hover:text-blue-300 transition-colors"
														title="Twitter"
													>
														<Twitter className="h-4 w-4" />
													</a>
												)}
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					)}

					{/* Capacity Utilization - Enhanced */}
					<div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
						<div className="flex items-center gap-3 mb-4">
							<div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
								<TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
							</div>
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
								Registration Status
							</h3>
						</div>
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
										Capacity Utilization
									</p>
									<p className="text-2xl font-bold text-gray-900 dark:text-white">
										{utilization}%
									</p>
								</div>
								<div className="text-right">
									<p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
										Registered
									</p>
									<p className="text-2xl font-bold text-gray-900 dark:text-white">
										{sessionData.registered}
									</p>
									<p className="text-xs text-gray-500 dark:text-gray-400">
										of {sessionData.capacity} total
									</p>
								</div>
							</div>
							<div className="relative">
								<div className="h-4 w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
									<div
										className={`h-4 rounded-full ${sessionData.colors.progress || "bg-blue-500"} transition-all duration-500 relative`}
										style={{ width: `${utilization}%` }}
									>
										<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
									</div>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-4 pt-2">
								<div className="flex items-center gap-2">
									<CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
									<div>
										<p className="text-xs text-gray-500 dark:text-gray-400">
											Checked In
										</p>
										<p className="text-sm font-semibold text-gray-900 dark:text-white">
											{sessionData.checkedIn} attendees
										</p>
									</div>
								</div>
								<div className="flex items-center gap-2">
									<Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
									<div>
										<p className="text-xs text-gray-500 dark:text-gray-400">
											Available Spots
										</p>
										<p className="text-sm font-semibold text-gray-900 dark:text-white">
											{sessionData.capacity - sessionData.registered} remaining
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

