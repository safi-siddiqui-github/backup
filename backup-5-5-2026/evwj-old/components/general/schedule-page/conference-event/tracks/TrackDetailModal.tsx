"use client";

import { useState, useMemo, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import {
	X,
	ClipboardList,
	Users,
	PieChart,
	Target,
	Clock,
	Calendar,
	MapPin,
	User,
	Search,
	CheckCircle,
	Briefcase,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { mockAttendees, mockSessions, Track } from "./data";
import AnimatedNumber from "./AnimatedNumber";

type SpeakerProfile = {
	name: string;
	title?: string;
	company?: string;
	avatar?: string;
};

// Mock speaker profiles - in real app, this would come from API
const getSpeakerProfile = (name: string): SpeakerProfile => {
	const profiles: Record<string, SpeakerProfile> = {
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

const modalStats = {
	sessions: 11,
	registered: 936,
	capacity: 1061,
	utilization: 88,
};

const StatCard = ({
	icon,
	label,
	value,
}: {
	icon: React.ElementType;
	label: string;
	value: number;
}) => {
	const Icon = icon;
	return (
		<div className="flex items-center gap-4 rounded-xl bg-white/60 p-4 shadow-sm backdrop-blur-sm dark:bg-[#020617]/60">
			<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-50 to-blue-100 dark:from-slate-700 dark:to-slate-600">
				<Icon className="h-5 w-5 text-blue-600 dark:text-blue-300" />
			</div>
			<div>
				<div className="text-xs font-medium uppercase text-gray-400 dark:text-gray-400">
					{label}
				</div>
				<div className="mt-1 flex items-baseline gap-1">
					<span className="text-2xl font-extrabold text-gray-900 dark:text-white">
						<AnimatedNumber end={value} />
					</span>
					{label === "Utilization" && (
						<span className="text-sm font-semibold text-gray-500 dark:text-gray-300">
							%
						</span>
					)}
				</div>
				<div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
					updated recently
				</div>
			</div>
		</div>
	);
};

const SessionCard = ({ session }: { session: (typeof mockSessions)[0] }) => {
	// Parse speakers string into array if it's a string
	const speakersArray = typeof session.speakers === "string"
		? session.speakers.split(", ").filter(Boolean)
		: Array.isArray(session.speakers)
		? session.speakers
		: [];
	
	const speakerProfiles = speakersArray.map(getSpeakerProfile);

	return (
		<div className="group rounded-2xl border border-transparent bg-white p-4 shadow hover:shadow-md dark:bg-gray-800">
			{/* Card Header */}
			<div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
				<div>
					<h4 className="text-lg font-semibold text-gray-900 dark:text-white">
						{session.title}
					</h4>
					<p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
						{session.description}
					</p>
				</div>
				<div className="flex items-start gap-2">
					<span
						className={`rounded-full px-3 py-1 text-xs font-semibold ${session.statusColor}`}
					>
						{session.status}
					</span>
				</div>
			</div>

			{/* Details Grid */}
			<div className="mt-4 grid grid-cols-2 gap-3 text-sm text-gray-500 dark:text-gray-400 md:grid-cols-3">
				<div className="flex items-center gap-2">
					<Clock className="h-4 w-4 text-gray-400" /> <span>{session.time}</span>
				</div>
				<div className="flex items-center gap-2">
					<Calendar className="h-4 w-4 text-gray-400" />{" "}
					<span>{session.date}</span>
				</div>
				<div className="flex items-center gap-2">
					<MapPin className="h-4 w-4 text-gray-400" />{" "}
					<span>{session.location}</span>
				</div>
			</div>

			{/* Speakers Section with Profile Cards */}
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
								className="group flex items-center gap-2.5 p-2.5 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-600 hover:bg-white dark:hover:bg-gray-700 hover:shadow-md transition-all duration-200"
							>
								<Avatar className="h-10 w-10 flex-shrink-0 ring-2 ring-gray-200 dark:ring-gray-600 group-hover:ring-purple-300 dark:group-hover:ring-purple-600 transition-all">
									<AvatarImage src={speaker.avatar} alt={speaker.name} />
									<AvatarFallback className="text-xs font-semibold bg-gradient-to-br from-purple-400 to-purple-600 text-white">
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

		{/* Footer */}
		<div className="mt-4 flex flex-col justify-between gap-3 border-t border-gray-100 pt-4 dark:border-gray-700 sm:flex-row sm:items-center">
			<div className="flex items-center gap-3">
				<Users className="h-4 w-4 text-gray-400" />
				<span className="text-sm font-medium text-gray-700 dark:text-gray-200">
					{session.registered} / {session.capacity}
				</span>
				<div className="relative h-2 w-28 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
					<div
						className="absolute left-0 top-0 h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all"
						style={{ width: `${session.utilization}%` }}
					/>
				</div>
			</div>
			<div className="flex flex-wrap gap-2">
				{session.tags.map((tag) => (
					<span
						key={tag}
						className="rounded-full bg-gray-100 px-3 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300"
					>
						{tag}
					</span>
				))}
			</div>
		</div>
		</div>
	);
};

const AttendeeRow = ({ attendee }: { attendee: (typeof mockAttendees)[0] }) => (
	<div className="grid grid-cols-1 items-center gap-4 rounded-lg bg-white p-4 dark:bg-gray-800 md:grid-cols-4 hover:shadow-sm">
		<div className="flex items-center gap-3">
			<div
				className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold text-white ${attendee.color}`}
			>
				{attendee.initials}
			</div>
			<div>
				<div className="font-bold text-gray-900 dark:text-white">
					{attendee.name}
				</div>
				<div className="text-sm text-gray-500 dark:text-gray-400">
					{attendee.company}
				</div>
			</div>
		</div>
		<div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 md:col-span-1">
			<Briefcase className="h-4 w-4 text-gray-400" />
			<span>{attendee.role}</span>
		</div>
		<div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 md:col-span-1">
			<ClipboardList className="h-4 w-4 text-gray-400" />
			<span>{attendee.sessions} sessions</span>
		</div>
		<div className="flex justify-start md:justify-end md:col-span-1">
			{attendee.status === "Confirmed" ? (
				<span className="flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700 dark:bg-green-900/50 dark:text-green-300">
					<CheckCircle className="h-3.5 w-3.5" />
					{attendee.status}
				</span>
			) : (
				<span className="flex items-center gap-1.5 rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-semibold text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300">
					<Clock className="h-3.5 w-3.5" />
					{attendee.status}
				</span>
			)}
		</div>
	</div>
);

// --- Main Modal Component ---
export default function TrackDetailModal({
	track,
	isOpen,
	onClose,
}: {
	track: Track;
	isOpen: boolean;
	onClose: () => void;
}) {
	const [selectedTabIndex, setSelectedTabIndex] = useState(0);
	const [sessionsPage, setSessionsPage] = useState(1);
	const [sessionsItemsPerPage, setSessionsItemsPerPage] = useState(10);
	const [attendeesPage, setAttendeesPage] = useState(1);
	const [attendeesItemsPerPage, setAttendeesItemsPerPage] = useState(10);

	// Pagination calculations for sessions
	const sessionsTotalPages = Math.ceil(mockSessions.length / sessionsItemsPerPage);
	const sessionsStartIndex = (sessionsPage - 1) * sessionsItemsPerPage;
	const sessionsEndIndex = sessionsStartIndex + sessionsItemsPerPage;
	const paginatedSessions = useMemo(
		() => mockSessions.slice(sessionsStartIndex, sessionsEndIndex),
		[sessionsStartIndex, sessionsEndIndex],
	);

	// Pagination calculations for attendees
	const attendeesTotalPages = Math.ceil(mockAttendees.length / attendeesItemsPerPage);
	const attendeesStartIndex = (attendeesPage - 1) * attendeesItemsPerPage;
	const attendeesEndIndex = attendeesStartIndex + attendeesItemsPerPage;
	const paginatedAttendees = useMemo(
		() => mockAttendees.slice(attendeesStartIndex, attendeesEndIndex),
		[attendeesStartIndex, attendeesEndIndex],
	);

	// Reset pages when items per page changes
	useEffect(() => {
		setSessionsPage(1);
	}, [sessionsItemsPerPage]);

	useEffect(() => {
		setAttendeesPage(1);
	}, [attendeesItemsPerPage]);

	return (
		<Dialog.Root open={isOpen} onOpenChange={onClose}>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 dark:bg-black/70" />
				<Dialog.Content className="fixed left-1/2 top-1/2 z-50 grid w-[90vw] max-w-5xl -translate-x-1/2 -translate-y-1/2 gap-4 rounded-2xl border bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 dark:border-gray-700 dark:bg-gray-800">
					{/* Modal Header */}
					<div>
						<Dialog.Title
							className={`text-2xl font-bold ${track.colors.text} ${track.colors.darkText}`}
						>
							{track.title}
						</Dialog.Title>
						<Dialog.Description className="text-sm text-gray-600 dark:text-gray-400">
							{track.description}
						</Dialog.Description>
						<Dialog.Close asChild>
							<button
								className="absolute right-4 top-4 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-200"
								aria-label="Close"
							>
								<X className="h-5 w-5" />
							</button>
						</Dialog.Close>
					</div>

					{/* Stats Grid */}
					<div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
						<StatCard
							icon={ClipboardList}
							label="Sessions"
							value={modalStats.sessions}
						/>
						<StatCard
							icon={Users}
							label="Registered"
							value={modalStats.registered}
						/>
						<StatCard
							icon={Target}
							label="Capacity"
							value={modalStats.capacity}
						/>
						<StatCard
							icon={PieChart}
							label="Utilization"
							value={modalStats.utilization}
						/>
					</div>

					{/* Tabs */}
					<Tabs
						className="mt-4"
						selectedIndex={selectedTabIndex}
						onSelect={(index) => setSelectedTabIndex(index ?? 0)}
					>
						<TabList className="-mb-px flex items-center border-b border-gray-200 dark:border-gray-700">
							<Tab
								className="flex cursor-pointer items-center gap-2 border-b-2 border-transparent px-4 py-3 text-sm font-medium text-gray-500 outline-none hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
								selectedClassName="!border-blue-500 !text-blue-600 dark:!text-blue-400"
							>
								<ClipboardList className="h-4 w-4" />
								Sessions
							</Tab>
							<Tab
								className="flex cursor-pointer items-center gap-2 border-b-2 border-transparent px-4 py-3 text-sm font-medium text-gray-500 outline-none hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
								selectedClassName="!border-blue-500 !text-blue-600 dark:!text-blue-400"
							>
								<Users className="h-4 w-4" />
								Attendees (936)
							</Tab>
						</TabList>

						{/* Content Area with fixed height and scrolling */}
						<div className="mt-4 max-h-[50vh] overflow-y-auto rounded-lg bg-gray-50 p-4 dark:bg-gray-900/50">
							<TabPanel>
								<div className="flex flex-col gap-4">
									<div className="relative">
										<input
											type="text"
											placeholder="Search sessions..."
											className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
										/>
										<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
									</div>
									<div className="flex flex-col gap-4">
										{paginatedSessions.map((session) => (
											<SessionCard key={session.title} session={session} />
										))}
									</div>
								</div>
							</TabPanel>
							<TabPanel>
								<div className="flex flex-col gap-4">
									<div className="relative">
										<input
											type="text"
											placeholder="Search attendees..."
											className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
										/>
										<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
									</div>
									<div className="flex flex-col gap-2">
										{paginatedAttendees.map((attendee) => (
											<AttendeeRow key={attendee.name} attendee={attendee} />
										))}
									</div>
								</div>
							</TabPanel>
						</div>

						{/* Pagination */}
						{selectedTabIndex === 0 && mockSessions.length > 0 && (
							<Card className="mt-4 !bg-white/95 [background-color:rgb(255_255_255/0.95)] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]">
								<CardContent className="p-4">
									<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
										<div className="flex items-center gap-2">
											<span className="text-sm text-gray-600 dark:text-slate-400">
												Items per page:
											</span>
											<select
												value={sessionsItemsPerPage}
												onChange={(e) => {
													setSessionsItemsPerPage(Number(e.target.value));
													setSessionsPage(1);
												}}
												className="dark:bg-background rounded-md border px-3 py-1.5 text-sm !bg-white dark:!bg-slate-700/50 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-slate-200 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
											>
												<option value={10}>10</option>
												<option value={20}>20</option>
												<option value={30}>30</option>
												<option value={40}>40</option>
												<option value={50}>50</option>
											</select>
										</div>
										<div className="flex items-center gap-2">
											<span className="text-sm text-gray-600 dark:text-slate-400">
												Showing {sessionsStartIndex + 1} -{" "}
												{Math.min(sessionsEndIndex, mockSessions.length)} of{" "}
												{mockSessions.length}
											</span>
											<div className="flex items-center gap-1">
												<Button
													variant="outline"
													size="sm"
													onClick={() =>
														setSessionsPage((prev) => Math.max(1, prev - 1))
													}
													disabled={sessionsPage === 1}
												>
													<ChevronLeft className="h-4 w-4" />
												</Button>
												<span className="px-2 text-sm text-gray-600 dark:text-slate-400">
													Page {sessionsPage} of {sessionsTotalPages}
												</span>
												<Button
													variant="outline"
													size="sm"
													onClick={() =>
														setSessionsPage((prev) =>
															Math.min(sessionsTotalPages, prev + 1),
														)
													}
													disabled={sessionsPage === sessionsTotalPages}
												>
													<ChevronRight className="h-4 w-4" />
												</Button>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						)}
						{selectedTabIndex === 1 && mockAttendees.length > 0 && (
							<Card className="mt-4 !bg-white/95 [background-color:rgb(255_255_255/0.95)] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]">
								<CardContent className="p-4">
									<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
										<div className="flex items-center gap-2">
											<span className="text-sm text-gray-600 dark:text-slate-400">
												Items per page:
											</span>
											<select
												value={attendeesItemsPerPage}
												onChange={(e) => {
													setAttendeesItemsPerPage(Number(e.target.value));
													setAttendeesPage(1);
												}}
												className="dark:bg-background rounded-md border px-3 py-1.5 text-sm !bg-white dark:!bg-slate-700/50 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-slate-200 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
											>
												<option value={10}>10</option>
												<option value={20}>20</option>
												<option value={30}>30</option>
												<option value={40}>40</option>
												<option value={50}>50</option>
											</select>
										</div>
										<div className="flex items-center gap-2">
											<span className="text-sm text-gray-600 dark:text-slate-400">
												Showing {attendeesStartIndex + 1} -{" "}
												{Math.min(attendeesEndIndex, mockAttendees.length)} of{" "}
												{mockAttendees.length}
											</span>
											<div className="flex items-center gap-1">
												<Button
													variant="outline"
													size="sm"
													onClick={() =>
														setAttendeesPage((prev) => Math.max(1, prev - 1))
													}
													disabled={attendeesPage === 1}
												>
													<ChevronLeft className="h-4 w-4" />
												</Button>
												<span className="px-2 text-sm text-gray-600 dark:text-slate-400">
													Page {attendeesPage} of {attendeesTotalPages}
												</span>
												<Button
													variant="outline"
													size="sm"
													onClick={() =>
														setAttendeesPage((prev) =>
															Math.min(attendeesTotalPages, prev + 1),
														)
													}
													disabled={attendeesPage === attendeesTotalPages}
												>
													<ChevronRight className="h-4 w-4" />
												</Button>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						)}
					</Tabs>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
