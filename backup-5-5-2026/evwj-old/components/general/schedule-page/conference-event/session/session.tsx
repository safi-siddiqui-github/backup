"use client";

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import PaginationControls from "@/components/ui/pagination-controls";
import { Button } from "@/components/ui/button";
import { ChevronDown, Filter, Plus, Search, Grid3X3, List } from "lucide-react";
import { useState, useMemo } from "react";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import SelectDropdown from "./SelectDropdown";
import SessionCard from "./SessionCard";
import SessionFormModal from "./SessionFormModal";
import SessionDetailDialog from "./SessionDetailDialog";
import type { Attendee, Session } from "./types";

// Single, clean copy of the session page with mock data
const mockAttendees: Attendee[] = [
	{
		name: "Alexander Garcia",
		title: "DevOps Engineer @ DataFlow Systems",
		tag: "AI/ML",
		status: "pending",
	},
	{
		name: "Liam Johnson",
		title: "Lead Developer @ Agile Ventures",
		tag: "Security",
		status: "pending",
	},
	{
		name: "Mia Martinez",
		title: "Backend Engineer @ CyberSphere",
		tag: "Mobile Development",
		status: "pending",
	},
	{
		name: "David Lee",
		title: "Product Manager @ TechCore",
		tag: "AI/ML",
		status: "confirmed",
	},
	{
		name: "Ava Wilson",
		title: "UX Designer @ Innovate",
		tag: "Security",
		status: "confirmed",
	},
	{
		name: "Ethan Green",
		title: "Data Scientist @ Quantex",
		tag: "AI/ML",
		status: "confirmed",
	},
	{
		name: "Lily Miller",
		title: "Frontend Developer @ CodeStack",
		tag: "Mobile Development",
		status: "confirmed",
	},
	{
		name: "Mason King",
		title: "CEO @ StartupX",
		tag: "AI/ML",
		status: "confirmed",
	},
];

const mockSessions: Session[] = [
	{
		id: 1,
		title: "Opening Keynote: The Future of AI",
		type: "keynote",
		track: "AI & Machine Learning",
		status: "90% Full",
		description:
			"Exploring the transformative potential of artificial intelligence in the next decade",
		date: "Day 1 - Nov 4, 2025",
		time: "09:00 - 10:00",
		location: "Main Hall",
		registered: 100,
		capacity: 500,
		checkedIn: 10,
		attendees: mockAttendees,
		skillLevel: "All Levels",
		speakers: ["Dr. Evelyn Reed"],
		tags: "ai, keynote, future",
		colors: {
			border: "border-purple-200 dark:border-purple-800",
			bg: "bg-purple-50 dark:bg-purple-900/20",
			darkBg: "dark:bg-purple-900/30",
			tagBg: "bg-purple-100",
			tagText: "text-purple-700",
			darkTagBg: "dark:bg-purple-800",
			darkTagText: "dark:text-purple-200",
			progress: "bg-purple-500",
		},
	},
	{
		id: 2,
		title: "Building Scalable ML Pipelines",
		type: "workshop",
		track: "AI & Machine Learning",
		status: "96% Full",
		description:
			"Hands-on workshop for creating production-ready machine learning pipelines",
		date: "Day 1 - Nov 4, 2025",
		time: "10:30 - 12:00",
		location: "Workshop Room A",
		registered: 48,
		capacity: 50,
		checkedIn: 4,
		attendees: mockAttendees.slice(2, 6),
		skillLevel: "Intermediate",
		speakers: ["Alex Johnson"],
		tags: "workshop, ml, pipelines",
		colors: {
			border: "border-orange-200 dark:border-orange-800",
			bg: "bg-orange-50 dark:bg-orange-900/20",
			darkBg: "dark:bg-orange-900/30",
			tagBg: "bg-orange-100",
			tagText: "text-orange-700",
			darkTagBg: "dark:bg-orange-800",
			darkTagText: "dark:text-orange-200",
			progress: "bg-orange-500",
		},
	},
];

export default function Session() {
	const [expandedSession, setExpandedSession] = useState<
		string | number | null
	>(null);
	const [sessions, setSessions] = useState<Session[]>(mockSessions);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [viewMode, setViewMode] = useState<"grid" | "list">("list");

	const [isFormModalOpen, setIsFormModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
	const [editingSession, setEditingSession] = useState<Session | null>(null);
	const [deletingSession, setDeletingSession] = useState<Session | null>(null);
	const [selectedSession, setSelectedSession] = useState<Session | null>(null);
	const [filterOpen, setFilterOpen] = useState<boolean>(false);

	const totalPages = Math.ceil(sessions.length / itemsPerPage);
	const paginatedSessions = useMemo(() => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		return sessions.slice(startIndex, endIndex);
	}, [sessions, currentPage, itemsPerPage]);

	const handleToggle = (sessionId: string | number) =>
		setExpandedSession((prev) => (prev === sessionId ? null : sessionId));
	const handleSessionClick = (session: Session) => {
		setSelectedSession(session);
		setIsDetailDialogOpen(true);
	};
	const handleOpenCreateModal = () => {
		setEditingSession(null);
		setIsFormModalOpen(true);
	};
	const handleOpenEditModal = (session: Session) => {
		setEditingSession(session);
		setIsFormModalOpen(true);
	};
	const handleCloseFormModal = () => {
		setIsFormModalOpen(false);
		setEditingSession(null);
	};
	const handleSaveSession = (sessionToSave: Session) => {
		setSessions((prev) => {
			const exists = prev.find((s) => s.id === sessionToSave.id);
			if (exists)
				return prev.map((s) => (s.id === sessionToSave.id ? sessionToSave : s));
			return [...prev, sessionToSave];
		});
		handleCloseFormModal();
	};

	const handleOpenDeleteModal = (session: Session) => {
		setDeletingSession(session);
		setIsDeleteModalOpen(true);
	};
	const handleCloseDeleteModal = () => {
		setIsDeleteModalOpen(false);
		setDeletingSession(null);
	};
	const handleConfirmDelete = (sessionId: string | number) =>
		setSessions((prev) => prev.filter((s) => s.id !== sessionId));

	return (
		<div className="min-h-screen w-full bg-gray-50 dark:bg-gray-950">
			<div className="max-w-8xl mx-auto w-full p-4">
				<div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
						Session Management
					</h1>
					<div className="flex items-center gap-3">
						{/* View Mode Toggle */}
						<div className="flex items-center gap-1 rounded-lg border border-gray-200 dark:border-gray-700 p-1 bg-gray-50 dark:bg-gray-800">
							<Button
								variant={viewMode === "grid" ? "default" : "ghost"}
								size="sm"
								onClick={() => setViewMode("grid")}
								className={`h-8 px-3 ${
									viewMode === "grid"
										? "bg-indigo-600 text-white hover:bg-indigo-700"
										: "text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-200"
								}`}
							>
								<Grid3X3 className="h-4 w-4" />
							</Button>
							<Button
								variant={viewMode === "list" ? "default" : "ghost"}
								size="sm"
								onClick={() => setViewMode("list")}
								className={`h-8 px-3 ${
									viewMode === "list"
										? "bg-indigo-600 text-white hover:bg-indigo-700"
										: "text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-200"
								}`}
							>
								<List className="h-4 w-4" />
							</Button>
						</div>
						<button
							onClick={handleOpenCreateModal}
							className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
						>
							<Plus className="h-5 w-5" />
							Add Session
						</button>
					</div>
				</div>

				<div className="mt-6">
					<Collapsible open={filterOpen} onOpenChange={setFilterOpen}>
						<div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
							<CollapsibleTrigger asChild>
								<button
									type="button"
									className="flex w-full items-center justify-between gap-3 p-4"
									aria-label="Toggle filter section"
								>
									<div className="flex items-center gap-2">
										<Filter className="h-5 w-5 text-gray-600 dark:text-gray-300" />
										<h3 className="text-lg font-medium text-gray-900 dark:text-white">
											Filter Sessions
										</h3>
										<span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
											(click to expand)
										</span>
									</div>
									<ChevronDown
										className={`h-5 w-5 text-gray-400 transition-transform ${filterOpen ? "rotate-180" : ""}`}
									/>
								</button>
							</CollapsibleTrigger>

							<CollapsibleContent className="overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out data-[state=closed]:max-h-0 data-[state=closed]:opacity-0 data-[state=open]:max-h-[1000px] data-[state=open]:opacity-100">
								<div className="border-t border-gray-100 p-4 dark:border-gray-800">
									<div className="relative mb-4">
										<Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
										<input
											type="text"
											placeholder="Search sessions, speakers, locations..."
											className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2 pr-4 pl-10 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
										/>
									</div>

									<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
										<SelectDropdown
											label="All Types"
											value=""
											onChange={() => {}}
											options={[
												{ value: "keynote", label: "Keynote" },
												{ value: "workshop", label: "Workshop" },
											]}
											placeholder="All Types"
										/>
										<SelectDropdown
											label="All Tracks"
											value=""
											onChange={() => {}}
											options={[
												{ value: "ai", label: "AI & Machine Learning" },
												{ value: "cloud", label: "Cloud & DevOps" },
											]}
											placeholder="All Tracks"
										/>
										<SelectDropdown
											label="All Locations"
											value=""
											onChange={() => {}}
											options={[
												{ value: "main", label: "Main Hall" },
												{ value: "rooma", label: "Workshop Room A" },
											]}
											placeholder="All Locations"
										/>
										<SelectDropdown
											label="All Dates"
											value=""
											onChange={() => {}}
											options={[
												{ value: "day1", label: "Day 1 - Nov 4, 2025" },
											]}
											placeholder="All Dates"
										/>
									</div>
								</div>
							</CollapsibleContent>
						</div>
					</Collapsible>

					<div className="mt-6">
						<h2 className="text-2xl font-bold text-gray-900 dark:text-white">
							Sessions
						</h2>
						{viewMode === "grid" ? (
							<div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
								{paginatedSessions.map((session) => (
									<SessionCard
										key={session.id}
										session={session}
										isExpanded={expandedSession === session.id}
										onToggle={() => handleToggle(session.id)}
										onEdit={() => handleOpenEditModal(session)}
										onDelete={() => handleOpenDeleteModal(session)}
										onClick={() => handleSessionClick(session)}
									/>
								))}
							</div>
						) : (
							<div className="mt-4 space-y-6">
								{paginatedSessions.map((session) => (
									<SessionCard
										key={session.id}
										session={session}
										isExpanded={expandedSession === session.id}
										onToggle={() => handleToggle(session.id)}
										onEdit={() => handleOpenEditModal(session)}
										onDelete={() => handleOpenDeleteModal(session)}
										onClick={() => handleSessionClick(session)}
									/>
								))}
							</div>
						)}
					</div>

					{/* Pagination */}
					{sessions.length > 0 && (
						<div className="mt-6">
							<PaginationControls
								currentPage={currentPage}
								totalPages={totalPages}
								totalItems={sessions.length}
								itemsPerPage={itemsPerPage}
								onPageChange={setCurrentPage}
								onItemsPerPageChange={setItemsPerPage}
							/>
						</div>
					)}
				</div>
			</div>

			{isFormModalOpen && (
				<SessionFormModal
					session={editingSession}
					onClose={handleCloseFormModal}
					onSave={handleSaveSession}
				/>
			)}
			{isDeleteModalOpen && deletingSession && (
				<DeleteConfirmationModal
					session={deletingSession}
					onClose={handleCloseDeleteModal}
					onConfirm={handleConfirmDelete}
				/>
			)}
			<SessionDetailDialog
				session={selectedSession}
				isOpen={isDetailDialogOpen}
				onClose={() => {
					setIsDetailDialogOpen(false);
					setSelectedSession(null);
				}}
			/>
		</div>
	);
}
