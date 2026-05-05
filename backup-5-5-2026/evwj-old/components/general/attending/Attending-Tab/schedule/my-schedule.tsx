import { Plus, X, User } from "lucide-react";
import React, { useState, useEffect, useMemo } from "react";
import type { MyScheduleSession, Session } from "./schedule-data";
import ScheduleCard from "@/components/general/schedule-page/conference-event/calendar/ScheduleCard";
import SessionDetailDialog from "@/components/general/schedule-page/conference-event/session/SessionDetailDialog";
import type { SessionCardData } from "@/components/general/schedule-page/conference-event/calendar/types";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
	mySchedule: MyScheduleSession[];
	onRemove: (id: string) => void;
	sessions: Session[];
	onAdd: (id: string) => void;
};

const times = [
	"09:00",
	"09:30",
	"10:00",
	"10:30",
	"11:00",
	"11:30",
	"12:00",
	"12:30",
	"13:00",
	"13:30",
	"14:00",
	"14:30",
	"15:00",
];

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
		"Maria Garcia": {
			name: "Maria Garcia",
			title: "MLOps Engineer",
			company: "CloudScale Inc",
			avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop",
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
		"Dr. James Wilson": {
			name: "Dr. James Wilson",
			title: "Cloud Solutions Architect",
			company: "CloudTech Global",
			avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
		},
		"Dr. Patricia Lee": {
			name: "Dr. Patricia Lee",
			title: "VP of Engineering",
			company: "Distributed Systems Inc",
			avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
		},
		"Robert Chen": {
			name: "Robert Chen",
			title: "Infrastructure Engineer",
			company: "TerraForm Solutions",
			avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
		},
		"Amanda Foster": {
			name: "Amanda Foster",
			title: "DevOps Specialist",
			company: "CloudOps Pro",
			avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop",
		},
		"Jessica Martinez": {
			name: "Jessica Martinez",
			title: "Senior Frontend Engineer",
			company: "NextGen Web",
			avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
		},
		"Kevin Park": {
			name: "Kevin Park",
			title: "Full-Stack Developer",
			company: "TechForward",
			avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
		},
		"Dr. Michael Zhang": {
			name: "Dr. Michael Zhang",
			title: "AI Research Lead",
			company: "ML Innovations",
			avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop",
		},
		"Dr. Lisa Anderson": {
			name: "Dr. Lisa Anderson",
			title: "Machine Learning Scientist",
			company: "DeepMind Research",
			avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
		},
		"Thomas Brown": {
			name: "Thomas Brown",
			title: "Containerization Expert",
			company: "DockerPro",
			avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
		},
		"Rachel Kim": {
			name: "Rachel Kim",
			title: "Platform Engineer",
			company: "CloudNative Systems",
			avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
		},
		"Dr. Emily Watson": {
			name: "Dr. Emily Watson",
			title: "Chief Data Scientist",
			company: "DataWorks Enterprise",
			avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
		},
		"Dr. Mark Taylor": {
			name: "Dr. Mark Taylor",
			title: "Data Platform Director",
			company: "BigData Corp",
			avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop",
		},
		"Daniel Lee": {
			name: "Daniel Lee",
			title: "TypeScript Expert",
			company: "TypeSafe Solutions",
			avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
		},
		"Sophia Chen": {
			name: "Sophia Chen",
			title: "Senior TypeScript Developer",
			company: "CodeQuality Labs",
			avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop",
		},
		"Alex Rivera": {
			name: "Alex Rivera",
			title: "GCP Solutions Architect",
			company: "Google Cloud Partner",
			avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
		},
		"Maria Santos": {
			name: "Maria Santos",
			title: "Cloud Infrastructure Lead",
			company: "CloudScale Enterprise",
			avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
		},
		"Dr. Jennifer Liu": {
			name: "Dr. Jennifer Liu",
			title: "Computer Vision Researcher",
			company: "VisionTech Labs",
			avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
		},
		"Dr. Andrew Kim": {
			name: "Dr. Andrew Kim",
			title: "Deep Learning Specialist",
			company: "NeuralNet Research",
			avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop",
		},
		"Ryan Cooper": {
			name: "Ryan Cooper",
			title: "SvelteKit Developer",
			company: "Modern Web Solutions",
			avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
		},
		"Michelle Wang": {
			name: "Michelle Wang",
			title: "Frontend Framework Expert",
			company: "WebDev Innovations",
			avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
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

// Helper function to convert MyScheduleSession to SessionCardData
const convertToSessionCardData = (
	session: MyScheduleSession,
	fullSessionData?: Session,
): SessionCardData => {
	// Map gradient colors to track colors
	const getTrackColors = (gradientFrom: string, gradientTo: string) => {
		if (gradientFrom.includes("purple") && gradientTo.includes("indigo")) {
			return {
				border: "border-purple-200",
				bg: "bg-purple-50",
				darkBg: "dark:bg-purple-900/30",
				tagBg: "bg-purple-100",
				tagText: "text-purple-700",
				darkTagBg: "dark:bg-purple-900/50",
				darkTagText: "dark:text-purple-300",
				progress: "bg-purple-500",
			};
		}
		// Default colors
		return {
			border: "border-blue-200",
			bg: "bg-blue-50",
			darkBg: "dark:bg-blue-900/30",
			tagBg: "bg-blue-100",
			tagText: "text-blue-700",
			darkTagBg: "dark:bg-blue-900/50",
			darkTagText: "dark:text-blue-300",
			progress: "bg-blue-500",
		};
	};

	const colors = getTrackColors(session.gradientFrom, session.gradientTo);

	// Parse capacity from full session data if available
	let registered = 0;
	let capacity = 100;
	let status: "Available" | "Full" | "Almost Full" = "Available";

	if (fullSessionData?.capacity) {
		const capacityMatch = fullSessionData.capacity.match(/(\d+)\/(\d+)/);
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

	return {
		id: session.id,
		title: session.title,
		type: session.type === "keynote" ? "keynote" : "session",
		track: fullSessionData?.track === "all" ? "General" : fullSessionData?.track || (session.type === "keynote" ? "Keynote" : "General"),
		time: session.timeSlot,
		location: session.location,
		registered,
		capacity,
		status,
		speakers: fullSessionData?.speakers || [session.speaker],
		description: fullSessionData?.description || "",
		date: fullSessionData?.date || "",
		colors,
	};
};

export default function MyScheduleView({
	mySchedule,
	onRemove,
	sessions,
	onAdd,
}: Props) {
	const [selectedDate, setSelectedDate] = useState<string>("Tue, Sep 10");
	const [modalOpen, setModalOpen] = useState(false);
	const [modalDay, setModalDay] = useState<
		"Tuesday" | "Wednesday" | "Thursday" | null
	>(null);
	const [modalTime, setModalTime] = useState<string | null>(null);
	const [confirmOpen, setConfirmOpen] = useState(false);
	const [confirmSessionId, setConfirmSessionId] = useState<string | null>(null);
	const [confirmSessionTitle, setConfirmSessionTitle] = useState<string | null>(
		null,
	);
	const [addConfirmOpen, setAddConfirmOpen] = useState(false);
	const [addPendingId, setAddPendingId] = useState<string | null>(null);
	const [addPendingTitle, setAddPendingTitle] = useState<string | null>(null);
	const [selectedSession, setSelectedSession] = useState<SessionCardData | null>(
		null,
	);

	// Map date labels to day names
	const dateToDay: Record<string, "Tuesday" | "Wednesday" | "Thursday"> = {
		"Tue, Sep 10": "Tuesday",
		"Wed, Sep 11": "Wednesday",
		"Thu, Sep 12": "Thursday",
	};

	// Filter mySchedule and sessions by selected date
	const filteredSchedule = useMemo(() => {
		const day = dateToDay[selectedDate];
		if (!day) return mySchedule;
		return mySchedule.filter((s) => s.day === day);
	}, [mySchedule, selectedDate]);

	const filteredSessions = useMemo(() => {
		const dateMap: Record<string, string> = {
			"Tue, Sep 10": "Sep 10",
			"Wed, Sep 11": "Sep 11",
			"Thu, Sep 12": "Sep 12",
		};
		const targetDate = dateMap[selectedDate];
		if (!targetDate) return sessions;
		return sessions.filter((s) => s.date && s.date.includes(targetDate));
	}, [sessions, selectedDate]);

	const openAddModal = (
		day: "Tuesday" | "Wednesday" | "Thursday",
		time: string,
	) => {
		setModalDay(day);
		setModalTime(time);
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
		setModalDay(null);
		setModalTime(null);
	};

	// Hide edit/delete buttons for attendee view
	useEffect(() => {
		const style = document.createElement("style");
		style.textContent = `
			.attendee-schedule-wrapper > div > div > div > div:last-child {
				display: none !important;
			}
		`;
		document.head.appendChild(style);
		return () => {
			document.head.removeChild(style);
		};
	}, []);

	return (
		<div className="mx-auto w-full p-6">
			<h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
				My Conference Schedule
			</h2>

			<Tabs value={selectedDate} onValueChange={setSelectedDate} className="w-full">
				<TabsList className="grid w-full grid-cols-3 mb-6">
					<TabsTrigger 
						value="Tue, Sep 10" 
						className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-white"
					>
						Tue, Sep 10
					</TabsTrigger>
					<TabsTrigger 
						value="Wed, Sep 11" 
						className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-white"
					>
						Wed, Sep 11
					</TabsTrigger>
					<TabsTrigger 
						value="Thu, Sep 12" 
						className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-white"
					>
						Thu, Sep 12
					</TabsTrigger>
				</TabsList>

				{["Tue, Sep 10", "Wed, Sep 11", "Thu, Sep 12"].map((date) => {
					const day = dateToDay[date];
					const dateMap: Record<string, string> = {
						"Tue, Sep 10": "Sep 10",
						"Wed, Sep 11": "Sep 11",
						"Thu, Sep 12": "Sep 12",
					};
					const targetDate = dateMap[date];

					return (
						<TabsContent key={date} value={date} className="mt-0">
							<div className="grid grid-cols-[120px_1fr] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-[#090a11]/40 dark:bg-[#090a11]">
								{/* Header */}
								<div className="bg-gray-50 p-4 font-medium text-gray-700 dark:bg-transparent dark:text-gray-100">
									Time
								</div>
								<div className="bg-gray-50 p-4 font-medium text-gray-700 dark:bg-transparent dark:text-gray-100">
									{date}
								</div>

								{/* Rows */}
								{times.map((time, idx) => {
									const session = filteredSchedule.find(
										(s) => s.timeSlot === time && s.day === day,
									);
									// Find matching full session data
									const fullSession = session
										? filteredSessions.find((s) => s.id === session.id)
										: undefined;

									return (
										<React.Fragment key={idx}>
											<div className="p-3 text-sm font-medium text-gray-700 dark:text-gray-100">
												{time}
											</div>
											<div className="relative min-h-20 p-2">
												{session ? (
													<div className="relative h-full attendee-schedule-wrapper">
														<ScheduleCard
															session={convertToSessionCardData(session, fullSession)}
															density="low"
															onClick={(sessionData) => {
																setSelectedSession(sessionData);
															}}
														/>
														<button
															onClick={(e) => {
																e.stopPropagation();
																setConfirmSessionId(session.id);
																setConfirmSessionTitle(session.title);
																setConfirmOpen(true);
															}}
															className="absolute top-2 right-2 z-10 rounded-md bg-red-500/90 hover:bg-red-600 px-2 py-1 text-xs font-medium text-white shadow-sm transition-colors"
														>
															Remove
														</button>
													</div>
												) : (
													(() => {
														const matches = filteredSessions.filter((s) => {
															const dateMatch = s.date && s.date.includes(targetDate);
															const timeMatch = s.time && s.time.includes(time);
															return dateMatch && timeMatch && !s.isAdded;
														});

														if (!matches.length) {
															return <div className="h-full w-full" />;
														}

														return (
															<button
																onClick={() =>
																	openAddModal(
																		day as "Tuesday" | "Wednesday" | "Thursday",
																		time,
																	)
																}
																className="flex h-full w-full items-center justify-center gap-2 rounded-xl border-[.5px] border-gray-200 bg-transparent px-2 transition hover:bg-gray-100 dark:border-gray-50 dark:bg-[#070b1c] dark:hover:bg-[#000311]"
																aria-label={`Add session for ${day} ${time}. ${matches.length} available`}
															>
																<Plus size={14} />
																<span className="text-xs text-gray-700 dark:text-gray-100">
																	Add ({matches.length})
																</span>
															</button>
														);
													})()
												)}
											</div>
										</React.Fragment>
									);
								})}
							</div>
						</TabsContent>
					);
				})}
			</Tabs>

			{/* Modal */}
			{modalOpen && modalDay && modalTime && (
				<div className="fixed inset-0 z-50 flex items-center justify-center">
					<div className="absolute inset-0 bg-black/40" onClick={closeModal} />
					<div className="relative z-10 mx-4 max-h-[80vh] w-full max-w-2xl overflow-auto rounded-lg bg-white p-6 shadow-lg dark:bg-[#070b1c]">
						<div className="flex items-start justify-between">
							<div>
								<h3 className="text-lg font-semibold">
									Add Session for {modalDay}, {modalTime}
								</h3>
								<p className="mt-1 text-sm text-gray-400">
									Choose a session to add to your schedule.
								</p>
							</div>
							<button
								onClick={closeModal}
								className="text-gray-500 hover:text-gray-700 dark:text-gray-200 dark:hover:text-white"
								aria-label="Close"
								title="Close"
							>
								<X />
							</button>
						</div>

						<div className="mt-4 space-y-3">
							{(() => {
								const dayToDate: Record<string, string> = {
									Tuesday: "Sep 10",
									Wednesday: "Sep 11",
									Thursday: "Sep 12",
								};
								const targetDate = dayToDate[modalDay];
								const matches = filteredSessions.filter((s) => {
									const dateMatch = s.date && s.date.includes(targetDate);
									const timeMatch = s.time && s.time.includes(modalTime || "");
									return dateMatch && timeMatch && !s.isAdded;
								});

								if (!matches.length) {
									return (
										<div className="text-sm text-gray-600 dark:text-gray-200">
											No matching sessions available for this slot.
										</div>
									);
								}

								return matches.map((sess) => {
									// Check if session is full
									const isFull = sess.capacity
										? (() => {
												const capacityMatch = sess.capacity.match(/(\d+)\s*\/\s*(\d+)/);
												if (capacityMatch) {
													const registered = parseInt(capacityMatch[1], 10);
													const capacity = parseInt(capacityMatch[2], 10);
													return registered >= capacity;
												}
												return false;
											})()
										: false;

									return (
										<div
											key={sess.id}
											className="flex flex-col gap-3 rounded-lg bg-white p-4 shadow-sm md:flex-row md:items-start md:justify-between dark:bg-[#090a11]"
										>
											<div className="md:flex-1">
												<div className="flex items-center gap-3">
													<h4 className="font-semibold">{sess.title}</h4>
													{sess.type === "keynote" && (
														<span className="text-yellow-400" title="Keynote">
															★
														</span>
													)}
												</div>
												<p className="mt-1 text-sm text-gray-600 dark:text-gray-200">
													{sess.description}
												</p>

												<div className="mt-2 flex flex-wrap gap-2 text-xs">
													{sess.tags && sess.tags.length
														? sess.tags.map((t, i) => (
																<span
																	key={i}
																	className={`${t.color} rounded-full px-2 py-1 dark:text-black`}
																>
																	{t.text}
																</span>
															))
														: null}
												</div>

												<div className="mt-2 text-sm text-gray-600 dark:text-gray-200">
													<div>
														<strong>Time:</strong> {sess.time}
													</div>
													<div>
														<strong>Location:</strong> {sess.location || "—"}
													</div>
													{sess.capacity ? (
														<div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
															Capacity: {sess.capacity}
														</div>
													) : null}
												</div>

												{/* Speakers Section with Profile Cards */}
												{sess.speakers && sess.speakers.length > 0 && (
													<div className="mt-4 space-y-2">
														<div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-100">
															<User className="h-4 w-4" />
															<span>Speakers</span>
														</div>
														<div className="flex flex-wrap gap-2">
															{sess.speakers.map((speakerName, index) => {
																const speaker = getSpeakerProfile(speakerName);
																return (
																	<div
																		key={index}
																		className="group flex items-center gap-2.5 p-2.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:shadow-md transition-all duration-200"
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
																);
															})}
														</div>
													</div>
												)}
											</div>

											<div className="shrink-0 self-center md:self-start">
												<button
													onClick={() => {
														setAddPendingId(sess.id);
														setAddPendingTitle(sess.title);
														setAddConfirmOpen(true);
													}}
													className={`flex w-full items-center justify-center gap-3 rounded px-2 py-1 font-semibold text-white shadow-md transition hover:opacity-90 focus:ring-4 ${
														isFull
															? "bg-orange-600 hover:bg-orange-700 focus:ring-orange-500"
															: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
													}`}
													aria-label={
														isFull
															? `Join waitlist for ${sess.title}`
															: `Reserve seat for ${sess.title}`
													}
												>
													{isFull ? "Join Waitlist" : "Reserve Seat"}
												</button>
											</div>
										</div>
									);
								});
							})()}
						</div>
					</div>
				</div>
			)}

			{/* Confirmation modal for removing scheduled session */}
			{confirmOpen && confirmSessionId && (
				<div className="fixed inset-0 z-60 flex items-center justify-center">
					<div
						className="absolute inset-0 bg-black/40"
						onClick={() => setConfirmOpen(false)}
					/>
					<div className="relative z-10 mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-[#070b1c]">
						<h3 className="text-lg font-semibold">Cancel scheduled session</h3>
						<p className="mt-2 text-sm text-gray-600 dark:text-gray-200">
							Are you sure you want to remove "{confirmSessionTitle}" from your
							schedule?
						</p>
						<div className="mt-4 flex justify-end gap-3">
							<button
								onClick={() => setConfirmOpen(false)}
								className="rounded-md bg-gray-100 px-3 py-1.5 text-sm dark:border dark:bg-[#00051a]"
							>
								Keep
							</button>
							<button
								onClick={() => {
									// call parent handler and close
									onRemove(confirmSessionId as string);
									setConfirmOpen(false);
									setConfirmSessionId(null);
									setConfirmSessionTitle(null);
								}}
								className="rounded-md bg-red-600 px-3 py-1.5 text-sm text-white dark:border dark:bg-[#000000]"
							>
								Yes, remove
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Confirmation modal for adding scheduled session (from modal) */}
			{addConfirmOpen && addPendingId && (
				<div className="fixed inset-0 z-60 flex items-center justify-center">
					<div
						className="absolute inset-0 bg-black/40"
						onClick={() => setAddConfirmOpen(false)}
					/>
					<div className="relative z-10 mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-[#070b1c]">
						<h3 className="text-lg font-semibold">Add session to schedule</h3>
						<p className="mt-2 text-sm text-gray-600 dark:text-gray-200">
							Do you want to add "{addPendingTitle}" to your schedule?
						</p>
						<div className="mt-4 flex justify-end gap-3">
							<button
								onClick={() => setAddConfirmOpen(false)}
								className="rounded-md border bg-white px-3 py-1.5 text-sm dark:bg-[#000418]"
							>
								Cancel
							</button>
							<button
								onClick={() => {
									if (addPendingId) {
										onAdd(addPendingId);
									}
									setAddConfirmOpen(false);
									// close add modal too
									closeModal();
									setAddPendingId(null);
									setAddPendingTitle(null);
								}}
								className="rounded-md px-3 py-1.5 text-sm text-white dark:border  bg-[#000000]"
							>
								Yes, add
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
