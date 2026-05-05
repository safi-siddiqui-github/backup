"use client";

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useMemo, useState } from "react";
import DeleteConfirmationModal from "../session/DeleteConfirmationModal";
import SessionFormModal from "../session/SessionFormModal";
import SessionDetailDialog from "../session/SessionDetailDialog";
import type { Session as SessionType } from "../session/types";
import type { SessionCardData } from "./types";
import mockCalendarData from "./mockData";
import SelectDropdown from "./SelectDropdown";
import TimeSlotGroup from "./TimeSlotGroup";

export default function Calendar() {
	const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 6));
	const [searchQuery, setSearchQuery] = useState("");
	const [filterOpen, setFilterOpen] = useState<boolean>(false);
	const [isFormModalOpen, setIsFormModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
	const [editingSession, setEditingSession] = useState<SessionType | null>(
		null,
	);
	const [deletingSession, setDeletingSession] = useState<SessionType | null>(
		null,
	);
	const [selectedSession, setSelectedSession] = useState<
		SessionCardData | SessionType | null
	>(null);

	const handleCloseFormModal = () => {
		setIsFormModalOpen(false);
		setEditingSession(null);
	};

	const handleSaveSession = (session: SessionType) => {
		// In a real app we'd persist or update local state; for mock just close the modal
		void session;
		setIsFormModalOpen(false);
		setEditingSession(null);
	};

	const handleCloseDeleteModal = () => {
		setIsDeleteModalOpen(false);
		setDeletingSession(null);
	};

	const handleConfirmDelete = () => {
		// No-op for mock data; close modal
		setIsDeleteModalOpen(false);
		setDeletingSession(null);
	};

	const formattedDate = useMemo(() => {
		return currentDate.toLocaleDateString("en-US", {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	}, [currentDate]);

	return (
		<div className="min-h-screen w-full bg-gray-50 dark:bg-gray-950">
			<div className="max-w-8xl mx-auto">
				<Collapsible open={filterOpen} onOpenChange={setFilterOpen}>
					<div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
						<CollapsibleTrigger asChild>
							<button
								type="button"
								className="flex w-full items-center justify-between p-4"
								aria-label="Toggle filters"
							>
								<div className="flex items-center gap-3">
									<Search className="h-5 w-5 text-gray-400" />
									<div>
										<div className="text-sm font-medium text-gray-900 dark:text-gray-100">
											Filters
										</div>
										<div className="text-xs text-gray-500 dark:text-gray-400">
											Search and narrow schedule results
										</div>
									</div>
								</div>
								<ChevronDown
									className={`h-5 w-5 text-gray-400 transition-transform ${filterOpen ? "rotate-180" : ""}`}
								/>
							</button>
						</CollapsibleTrigger>

						<CollapsibleContent className="overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out data-[state=closed]:max-h-0 data-[state=closed]:opacity-0 data-[state=open]:max-h-[500px] data-[state=open]:opacity-100">
							<div className="p-4">
								<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
									<div className="relative sm:col-span-2 lg:col-span-1">
										<Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
										<input
											type="text"
											value={searchQuery}
											onChange={(e) => setSearchQuery(e.target.value)}
											placeholder="Search sessions..."
											className="w-full rounded-lg border border-gray-300 bg-white py-2 pr-4 pl-10 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
										/>
									</div>
									<SelectDropdown label="All Types" />
									<SelectDropdown label="All Tracks" />
									<SelectDropdown label="All Locations" />
								</div>
							</div>
						</CollapsibleContent>
					</div>
				</Collapsible>

				{/* Header / navigation */}
				<div className="mt-8 flex items-center justify-between">
					<h2 className="text-2xl font-bold text-gray-900 dark:text-white">
						Schedule for {formattedDate}
					</h2>
					<div className="flex items-center gap-2">
						<button
							onClick={() =>
								setCurrentDate((d) => new Date(d.setDate(d.getDate() - 1)))
							}
							className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
						>
							<ChevronLeft className="h-5 w-5" />
						</button>
						<button
							onClick={() => setCurrentDate(new Date(2025, 10, 6))}
							className="rounded-lg bg-blue-100 px-4 py-2 text-sm font-medium text-blue-600 dark:bg-blue-900 dark:text-blue-300"
						>
							Today
						</button>
						<button
							onClick={() =>
								setCurrentDate((d) => new Date(d.setDate(d.getDate() + 1)))
							}
							className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
						>
							<ChevronRight className="h-5 w-5" />
						</button>
					</div>
				</div>

				{/* Timeline */}
				<div className="mt-8 space-y-10">
					{mockCalendarData.map((slot) => (
						<TimeSlotGroup
							key={slot.time}
							timeslot={slot}
							density={slot.sessions.length > 4 ? "high" : "low"}
							onEdit={(s) => {
								setEditingSession(s as SessionType);
								setIsFormModalOpen(true);
							}}
							onDelete={(s) => {
								setDeletingSession(s as SessionType);
								setIsDeleteModalOpen(true);
							}}
							onClick={(s) => {
								setSelectedSession(s as SessionCardData);
								setIsDetailDialogOpen(true);
							}}
						/>
					))}
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
