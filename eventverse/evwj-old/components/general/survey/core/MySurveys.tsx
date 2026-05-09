"use client";
import { useState, useMemo } from "react";
import { BsPlus, BsGrid3X3, BsList, BsTrash, BsSend } from "react-icons/bs";
import { toast } from "sonner";
import SurveyCard from "../common/SurveyCard";
import SurveyPreviewModal from "../share/SurveyPreviewModal";
import type { SurveyCardProps } from "../types/survey-types";
import CreateSurveyModal from "./CreateSurvey";
import SurveyEditModal from "./SurveyEditModal";

export default function MySurveys() {
	const [isPreviewModalOpen, setIsPreviewModalOpen] = useState<boolean>(false);
	const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false); // State for new modal
	const [previewSurvey, setPreviewSurvey] = useState<SurveyCardProps | null>(
		null,
	);
	const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
	const [editingSurvey, setEditingSurvey] = useState<SurveyCardProps | null>(
		null,
	);
	const [viewMode, setViewMode] = useState<"grid" | "list">("list");
	const [selectedSurveys, setSelectedSurveys] = useState<Set<string>>(
		new Set(),
	);
	const [surveyToView, setSurveyToView] = useState<SurveyCardProps | null>(
		null,
	);

	const surveys: SurveyCardProps[] = [
		{
			title: "Event Feedback Survey",
			description:
				"Help us improve your event experience by sharing your thoughts and feedback.",
			created: "Jan 15, 2024",
			sendTo: ["vip-guests", "general-guests"],
			scheduleTime: "2024-02-15T10:00",
			lastSent: "2024-01-20T14:30:00",
			questions: 6,
			responses: 45,
			completed: 38,
			isExpandedDefault: false,
			defaultToggleOn: true,
			status: "Active",
		},
		{
			title: "Product Launch Feedback",
			description:
				"We'd love to hear your thoughts on our new product launch presentation.",
			created: "Feb 1, 2024",
			sendTo: ["vip-ticket", "general-admission"],
			scheduleTime: "2024-02-20T14:00",
			lastSent: "2024-02-05T10:15:00",
			questions: 4,
			responses: 45,
			completed: 38,
			isExpandedDefault: false,
			defaultToggleOn: true,
			status: "Active",
		},
		{
			title: "Venue & Catering Assessment",
			description:
				"Rate your experience with our venue, catering, and logistics.",
			created: "Jan 1, 2024",
			sendTo: ["early-bird", "student-ticket"],
			scheduleTime: "2024-01-25T09:30",
			lastSent: "2024-01-08T16:45:00",
			questions: 4,
			responses: 45,
			completed: 39,
			isExpandedDefault: false,
			defaultToggleOn: false,
			status: "Inactive",
		},
	];

	const allSelected = useMemo(() => {
		return selectedSurveys.size > 0 && selectedSurveys.size === surveys.length;
	}, [selectedSurveys.size, surveys.length]);

	const handleSelectAll = () => {
		if (allSelected) {
			setSelectedSurveys(new Set());
		} else {
			setSelectedSurveys(new Set(surveys.map((s) => s.title)));
		}
	};

	const handleSelectSurvey = (surveyTitle: string) => {
		const newSelected = new Set(selectedSurveys);
		if (newSelected.has(surveyTitle)) {
			newSelected.delete(surveyTitle);
		} else {
			newSelected.add(surveyTitle);
		}
		setSelectedSurveys(newSelected);
	};

	const handleBulkDelete = () => {
		if (selectedSurveys.size === 0) return;
		toast.success(`Deleted ${selectedSurveys.size} survey(s)`, {
			description: "Surveys have been permanently deleted",
			duration: 3000,
		});
		setSelectedSurveys(new Set());
	};

	const handleBulkSendToGuests = () => {
		if (selectedSurveys.size === 0) return;
		toast.success(`Sent ${selectedSurveys.size} survey(s) to guests`, {
			description: "Surveys have been shared with your guests",
			duration: 3000,
		});
		setSelectedSurveys(new Set());
	};

	const handleCardClick = (survey: SurveyCardProps) => {
		setSurveyToView(survey);
		setIsEditOpen(true);
	};

	const handleEdit = (survey: SurveyCardProps) => {
		setEditingSurvey(survey);
		setIsCreateModalOpen(true);
	};

	return (
		<div>
			<div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
				<div>
					<h2 className="text-xl font-bold text-gray-900 dark:text-slate-200">
						My Surveys
					</h2>
					<p className="text-sm text-gray-500 dark:text-slate-400">
						Create and manage your event surveys
					</p>
				</div>
				<div className="flex items-center gap-3">
					{/* View Mode Toggle */}
					<div className="flex items-center gap-1 !bg-white dark:!bg-slate-700/50 rounded-lg p-1 border border-gray-200 dark:border-slate-600 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
						<button
							onClick={() => setViewMode("grid")}
							className={`p-2 rounded-md transition-all ${
								viewMode === "grid"
									? "bg-indigo-600 text-white"
									: "text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-200"
							}`}
							aria-label="Grid view"
						>
							<BsGrid3X3 size={18} />
						</button>
						<button
							onClick={() => setViewMode("list")}
							className={`p-2 rounded-md transition-all ${
								viewMode === "list"
									? "bg-indigo-600 text-white"
									: "text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-200"
							}`}
							aria-label="List view"
						>
							<BsList size={18} />
						</button>
					</div>
					<button
						onClick={() => setIsCreateModalOpen(true)}
						className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
					>
						<BsPlus size={22} />
						<span>Create New Survey</span>
					</button>
				</div>
			</div>

			{/* Bulk Actions Bar */}
			{selectedSurveys.size > 0 && (
				<div className="!bg-white dark:!bg-slate-800/95 backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:rgb(30_41_59/0.95)] border border-gray-200 dark:border-slate-600 rounded-xl shadow-lg p-4 mb-6 flex items-center justify-between">
					<div className="flex items-center gap-4">
						<span className="text-sm font-semibold text-gray-900 dark:text-slate-200">
							{selectedSurveys.size} survey{selectedSurveys.size > 1 ? "s" : ""}{" "}
							selected
						</span>
					</div>
					<div className="flex items-center gap-3">
						<button
							onClick={handleBulkSendToGuests}
							className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-slate-200 !bg-white dark:!bg-slate-700/50 border border-gray-200 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
						>
							<BsSend size={16} />
							<span>Send to Guests</span>
						</button>
						<button
							onClick={handleBulkDelete}
							className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-600 dark:text-red-400 !bg-white dark:!bg-slate-700/50 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
						>
							<BsTrash size={16} />
							<span>Delete</span>
						</button>
					</div>
				</div>
			)}

			{viewMode === "grid" ? (
				<div>
					{/* Select All Checkbox */}
					<div className="flex items-center gap-3 mb-4">
						<input
							type="checkbox"
							checked={allSelected}
							onChange={handleSelectAll}
							className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
						/>
						<label className="text-sm font-semibold text-gray-900 dark:text-slate-200 cursor-pointer">
							Select All
						</label>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
						{surveys.map((survey) => (
							<SurveyCard
								key={survey.title}
								{...survey}
								viewMode="grid"
								isSelected={selectedSurveys.has(survey.title)}
								onSelect={() => handleSelectSurvey(survey.title)}
								onCardClick={() => handleCardClick(survey)}
								onPreview={() => {
									setPreviewSurvey(survey);
									setIsPreviewModalOpen(true);
								}}
								onEdit={() => handleEdit(survey)}
							/>
						))}
					</div>
				</div>
			) : (
				<div className="space-y-6 pl-6">
					{/* Select All Checkbox */}
					<div className="flex items-center gap-3 mb-4">
						<input
							type="checkbox"
							checked={allSelected}
							onChange={handleSelectAll}
							className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
						/>
						<label className="text-sm font-semibold text-gray-900 dark:text-slate-200 cursor-pointer">
							Select All
						</label>
					</div>
					{surveys.map((survey) => (
						<SurveyCard
							key={survey.title}
							{...survey}
							viewMode="list"
							isSelected={selectedSurveys.has(survey.title)}
							onSelect={() => handleSelectSurvey(survey.title)}
							onCardClick={() => handleCardClick(survey)}
							onPreview={() => {
								setPreviewSurvey(survey);
								setIsPreviewModalOpen(true);
							}}
							onEdit={() => handleEdit(survey)}
						/>
					))}
				</div>
			)}

			{isPreviewModalOpen && previewSurvey && (
				<SurveyPreviewModal
					survey={previewSurvey}
					onClose={() => {
						setIsPreviewModalOpen(false);
						setPreviewSurvey(null);
					}}
				/>
			)}

			<CreateSurveyModal
				isOpen={isCreateModalOpen}
				onClose={() => {
					setIsCreateModalOpen(false);
					setEditingSurvey(null);
				}}
				initialSurvey={editingSurvey || undefined}
			/>

			{isEditOpen && surveyToView && (
				<SurveyEditModal
					onClose={() => {
						setIsEditOpen(false);
						setSurveyToView(null);
					}}
				/>
			)}
		</div>
	);
}
