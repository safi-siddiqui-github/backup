import React, { useState, useEffect, useMemo } from "react";
import {
	ChevronDown,
	Search,
	Clock,
	Calendar,
	MapPin,
	Users,
	Plus,
	X,
	CheckCircle,
	Star,
} from "lucide-react";
import type { Session } from "./schedule-data";
import ScheduleCard from "@/components/general/schedule-page/conference-event/calendar/ScheduleCard";
import SessionDetailDialog from "@/components/general/schedule-page/conference-event/session/SessionDetailDialog";
import type { SessionCardData } from "@/components/general/schedule-page/conference-event/calendar/types";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type Props = {
	sessions: Session[];
	onAdd: (id: string) => void;
	onRemove: (id: string) => void;
};

export default function BrowseSessionsView({
	sessions,
	onAdd,
	onRemove,
}: Props) {
	const [selectedDate, setSelectedDate] = useState<string>("all");

	// Filter sessions by selected date
	const filteredSessions = useMemo(() => {
		if (selectedDate === "all") return sessions;
		
		const dateMap: Record<string, string> = {
			"Tue, Sep 10": "Sep 10",
			"Wed, Sep 11": "Sep 11",
			"Thu, Sep 12": "Sep 12",
		};
		const targetDate = dateMap[selectedDate];
		if (!targetDate) return sessions;
		
		return sessions.filter((s) => s.date && s.date.includes(targetDate));
	}, [sessions, selectedDate]);

	const computeCapacityPercent = (capacity?: string) => {
		if (!capacity) return null;
		const m = capacity.match(/(\d+)\s*\/\s*(\d+)/);
		if (!m) return null;
		const num = parseInt(m[1], 10);
		const den = parseInt(m[2], 10);
		if (!den) return null;
		const pct = Math.round((num / den) * 100);
		return `${pct}% full`;
	};

	const computeCapacityValue = (capacity?: string) => {
		if (!capacity) return null;
		const m = capacity.match(/(\d+)\s*\/\s*(\d+)/);
		if (!m) return null;
		const num = parseInt(m[1], 10);
		const den = parseInt(m[2], 10);
		if (!den) return null;
		return Math.round((num / den) * 100);
	};

	const formatDateWithYear = (dateStr?: string) => {
		if (!dateStr) return "";
		if (dateStr.includes(",")) return dateStr;
		const year = new Date().getFullYear();
		return `${dateStr}, ${year}`;
	};

	// Add confirm modal
	const [addConfirmOpen, setAddConfirmOpen] = useState(false);
	const [addPending, setAddPending] = useState<Session | null>(null);

	const openAddConfirm = (s: Session) => {
		setAddPending(s);
		setAddConfirmOpen(true);
	};

	const closeAddConfirm = () => {
		setAddPending(null);
		setAddConfirmOpen(false);
	};

	// Remove confirm modal
	const [removeConfirmOpen, setRemoveConfirmOpen] = useState(false);
	const [removePending, setRemovePending] = useState<Session | null>(null);

	const openRemoveConfirm = (s: Session) => {
		setRemovePending(s);
		setRemoveConfirmOpen(true);
	};

	const closeRemoveConfirm = () => {
		setRemovePending(null);
		setRemoveConfirmOpen(false);
	};

	// Selected session for detail dialog
	const [selectedSession, setSelectedSession] = useState<SessionCardData | null>(
		null,
	);

	// Helper function to convert Session to SessionCardData
	const convertToSessionCardData = (session: Session): SessionCardData => {
		// Parse capacity (format: "2485/2500 (+150 waitlist)" or "78/80")
		let registered = 0;
		let capacity = 100;
		let status: "Available" | "Full" | "Almost Full" = "Available";

		if (session.capacity) {
			// Match "number/number" pattern, ignoring waitlist info
			const capacityMatch = session.capacity.match(/(\d+)\s*\/\s*(\d+)/);
			if (capacityMatch) {
				registered = parseInt(capacityMatch[1], 10);
				capacity = parseInt(capacityMatch[2], 10);
				const utilization = (registered / capacity) * 100;
				if (utilization >= 100) {
					status = "Full";
				} else if (utilization >= 90) {
					status = "Almost Full";
				}
			}
		}

		// Map track to colors and display name
		const getTrackInfo = (track?: string) => {
			if (track === "ai-ml") {
				return {
					name: "AI & Machine Learning",
					colors: {
						border: "border-blue-200",
						bg: "bg-blue-50",
						darkBg: "dark:bg-blue-900/30",
						tagBg: "bg-blue-100",
						tagText: "text-blue-700",
						darkTagBg: "dark:bg-blue-900/50",
						darkTagText: "dark:text-blue-300",
						progress: "bg-blue-500",
					},
				};
			}
			if (track === "cloud-devops") {
				return {
					name: "Cloud & DevOps",
					colors: {
						border: "border-green-200",
						bg: "bg-green-50",
						darkBg: "dark:bg-green-900/30",
						tagBg: "bg-green-100",
						tagText: "text-green-700",
						darkTagBg: "dark:bg-green-900/50",
						darkTagText: "dark:text-green-300",
						progress: "bg-green-500",
					},
				};
			}
			if (track === "frontend") {
				return {
					name: "Frontend Development",
					colors: {
						border: "border-orange-200",
						bg: "bg-orange-50",
						darkBg: "dark:bg-orange-900/30",
						tagBg: "bg-orange-100",
						tagText: "text-orange-700",
						darkTagBg: "dark:bg-orange-900/50",
						darkTagText: "dark:text-orange-300",
						progress: "bg-orange-500",
					},
				};
			}
			// Default (all or undefined)
			return {
				name: "General",
				colors: {
					border: "border-purple-200",
					bg: "bg-purple-50",
					darkBg: "dark:bg-purple-900/30",
					tagBg: "bg-purple-100",
					tagText: "text-purple-700",
					darkTagBg: "dark:bg-purple-900/50",
					darkTagText: "dark:text-purple-300",
					progress: "bg-purple-500",
				},
			};
		};

		const trackInfo = getTrackInfo(session.track);

		return {
			id: session.id,
			title: session.title,
			type: session.type || "session",
			track: trackInfo.name,
			time: session.time,
			location: session.location,
			registered,
			capacity,
			status,
			speakers: session.speakers,
			description: session.description,
			date: session.date,
			colors: trackInfo.colors,
		};
	};

	// Hide edit/delete buttons for attendee view
	useEffect(() => {
		const style = document.createElement("style");
		style.textContent = `
			.attendee-browse-session > div > div > div > div:last-child {
				display: none !important;
			}
		`;
		document.head.appendChild(style);
		return () => {
			document.head.removeChild(style);
		};
	}, []);

	return (
		<div className="p-6 text-gray-900 dark:text-white">
			{/* Date Tabs */}
			<Tabs value={selectedDate} onValueChange={setSelectedDate} className="w-full mb-6">
				<TabsList className="grid w-full grid-cols-4 !bg-gray-100 dark:!bg-[#090a11]">
					<TabsTrigger 
						value="all" 
						className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-white dark:text-gray-300 dark:data-[state=inactive]:text-gray-400"
					>
						All Dates
					</TabsTrigger>
					<TabsTrigger 
						value="Tue, Sep 10" 
						className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-white dark:text-gray-300 dark:data-[state=inactive]:text-gray-400"
					>
						Tue, Sep 10
					</TabsTrigger>
					<TabsTrigger 
						value="Wed, Sep 11" 
						className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-white dark:text-gray-300 dark:data-[state=inactive]:text-gray-400"
					>
						Wed, Sep 11
					</TabsTrigger>
					<TabsTrigger 
						value="Thu, Sep 12" 
						className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-white dark:text-gray-300 dark:data-[state=inactive]:text-gray-400"
					>
						Thu, Sep 12
					</TabsTrigger>
				</TabsList>
			</Tabs>

			{/* Search + Filters */}
			<div className="mb-6 flex space-x-4">
				{/* Search */}
				<div className="relative grow">
					<Search
						size={20}
						className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300"
					/>
					<input
						type="text"
						placeholder="Search sessions, speakers, topics..."
						className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-50 dark:bg-[#090a11] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
					/>
				</div>

				{/* Track Filter */}
				<div className="relative">
					<select
						aria-label="Filter by track"
						className="appearance-none pr-8 py-2 rounded-md bg-white dark:bg-[#090a11] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
					>
						<option>All Tracks</option>
						<option>AI & Machine Learning</option>
						<option>Cloud & DevOps</option>
						<option>Frontend Development</option>
					</select>
					<ChevronDown
						size={16}
						className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300 pointer-events-none"
					/>
				</div>

				{/* Level Filter */}
				<div className="relative">
					<select
						aria-label="Filter by level"
						className="appearance-none pr-8 py-2 rounded-md bg-white dark:bg-[#090a11] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
					>
						<option>All Levels</option>
						<option>Beginner</option>
						<option>Intermediate</option>
						<option>Advanced</option>
					</select>
					<ChevronDown
						size={16}
						className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300 pointer-events-none"
					/>
				</div>
			</div>

			{/* Session Cards */}
			<div className="space-y-4">
				{filteredSessions.map((session) => {
					const sessionCardData = convertToSessionCardData(session);

					return (
						<div key={session.id} className="relative attendee-browse-session">
							<ScheduleCard
								session={sessionCardData}
								density="low"
								onClick={(sessionData) => {
									setSelectedSession(sessionData);
								}}
							/>
							{/* Add/Remove Button */}
							<div className="absolute top-4 right-4 z-10">
								{session.isAdded ? (
									<button
										onClick={(e) => {
											e.stopPropagation();
											openRemoveConfirm(session);
										}}
										className="flex items-center gap-2 px-4 py-2 bg-red-500/90 hover:bg-red-600 text-white rounded-lg text-sm font-medium shadow-sm transition-colors"
									>
										<X size={16} /> Remove
									</button>
								) : (() => {
									// Check if session is full
									const isFull = session.capacity
										? (() => {
												const capacityMatch = session.capacity.match(/(\d+)\s*\/\s*(\d+)/);
												if (capacityMatch) {
													const registered = parseInt(capacityMatch[1], 10);
													const capacity = parseInt(capacityMatch[2], 10);
													return registered >= capacity;
												}
												return false;
											})()
										: false;
									
									return (
										<button
											onClick={(e) => {
												e.stopPropagation();
												openAddConfirm(session);
											}}
											className={`flex items-center gap-2 px-4 py-2 text-white rounded-lg text-sm font-medium shadow-md transition-colors ${
												isFull
													? "bg-orange-600 hover:bg-orange-700"
													: "bg-purple-600 hover:bg-purple-700"
											}`}
										>
											<Plus size={16} /> {isFull ? "Join Waitlist" : "Reserve Seat"}
										</button>
									);
								})()}
							</div>
						</div>
					);
				})}
			</div>

			{/* Add Confirmation Modal */}
			{addConfirmOpen && addPending && (
				<div className="fixed inset-0 z-50 flex items-center justify-center">
					<div
						className="absolute inset-0 bg-black/40"
						onClick={closeAddConfirm}
					/>
					<div className="relative z-10 w-full max-w-md bg-white dark:bg-[#090a11] rounded-lg shadow-lg p-6 mx-4">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add session to schedule</h3>
						<p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
							Do you want to add "{addPending.title}" to your schedule?
						</p>

						<div className="mt-4 flex justify-end gap-3">
							<button
								onClick={closeAddConfirm}
								className="px-3 py-1.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm hover:bg-gray-200 dark:hover:bg-gray-700"
							>
								Cancel
							</button>

							<button
								onClick={() => {
									onAdd(addPending.id);
									closeAddConfirm();
								}}
								className="px-3 py-1.5 rounded-md bg-purple-600 hover:bg-purple-700 text-white text-sm"
							>
								Yes, add
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Remove Confirmation Modal */}
			{removeConfirmOpen && removePending && (
				<div className="fixed inset-0 z-50 flex items-center justify-center">
					<div
						className="absolute inset-0 bg-black/40"
						onClick={closeRemoveConfirm}
					/>
					<div className="relative z-10 w-full max-w-md bg-white dark:bg-[#090a11] rounded-lg shadow-lg p-6 mx-4">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
							Remove session from schedule
						</h3>

						<p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
							Are you sure you want to remove "{removePending.title}" from your
							schedule?
						</p>

						<div className="mt-4 flex justify-end gap-3">
							<button
								onClick={closeRemoveConfirm}
								className="px-3 py-1.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm hover:bg-gray-200 dark:hover:bg-gray-700"
							>
								Cancel
							</button>

							<button
								onClick={() => {
									onRemove(removePending.id);
									closeRemoveConfirm();
								}}
								className="px-3 py-1.5 rounded-md bg-red-600 hover:bg-red-700 text-white text-sm"
							>
								Yes, remove
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Session Detail Dialog */}
			{selectedSession && (
				<SessionDetailDialog
					session={selectedSession}
					isOpen={!!selectedSession}
					onClose={() => setSelectedSession(null)}
				/>
			)}
		</div>
	);
}
