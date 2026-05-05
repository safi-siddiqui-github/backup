"use client";
import { useState } from "react";
import {
	BsCalendar,
	BsClock,
	BsListUl,
	BsChevronDown,
	BsChevronUp,
	BsEye,
	BsLink45Deg,
	BsTrash,
	BsPencil,
	BsSend,
} from "react-icons/bs";
import { toast } from "sonner";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import ToggleSwitch from "./ToggleSwitch";
import AvatarGroup from "./AvatarGroup";
import RespondentList from "../results/RespondentList";
import DeleteSurveyModal from "../core/DeleteSurveyModal";
import SendSurveyModal from "../core/SendSurveyModal";
import type { SurveyCardProps } from "../types/survey-types";
import { SURVEY_ALL_RECIPIENTS } from "../core/survey-recipient-data";

type ExtendedSurveyCardProps = SurveyCardProps & {
	onPreview: () => void;
	onEdit: () => void;
	viewMode?: "grid" | "list";
	isSelected?: boolean;
	onSelect?: () => void;
	onCardClick?: () => void;
};

export default function SurveyCard({
	title,
	description,
	created,
	scheduleTime,
	lastSent,
	sendTo,
	questions,
	responses,
	completed,
	isExpandedDefault = false,
	defaultToggleOn = true,
	status,
	onPreview,
	onEdit,
	viewMode = "list",
	isSelected = false,
	onSelect,
	onCardClick,
}: ExtendedSurveyCardProps) {
	const [isExpanded, setIsExpanded] = useState<boolean>(isExpandedDefault);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
	const [isSendModalOpen, setIsSendModalOpen] = useState<boolean>(false);

	const handleToggle = (isOn: boolean) => {
		// In real app, update survey status via API
		console.log(`Survey "${title}" is now ${isOn ? "Active" : "Inactive"}`);
	};

	const handleCopyLink = async () => {
		try {
			// Generate survey link (in real app, this would be the actual survey URL)
			const surveyLink = `${window.location.origin}/survey/${encodeURIComponent(title.toLowerCase().replace(/\s+/g, "-"))}`;

			// Copy to clipboard
			await navigator.clipboard.writeText(surveyLink);

			// Show success toast
			toast.success("Link copied successfully!", {
				description: "Survey link has been copied to clipboard",
				duration: 3000,
			});
		} catch {
			// Show error toast if copy fails
			toast.error("Failed to copy link", {
				description: "Please try again",
				duration: 3000,
			});
		}
	};

	const handleDeleteClick = () => {
		setIsDeleteModalOpen(true);
	};

	const handleDeleteConfirm = () => {
		// In real app, call API to delete survey
		toast.success("Survey deleted successfully!", {
			description: `"${title}" has been permanently deleted`,
			duration: 3000,
		});
		setIsDeleteModalOpen(false);
	};

	const handleDeleteCancel = () => {
		setIsDeleteModalOpen(false);
	};

	const handleSendClick = () => {
		setIsSendModalOpen(true);
	};

	const handleSendConfirm = () => {
		// In real app, call API to send survey
		toast.success("Survey sent successfully!", {
			description: `"${title}" has been sent to recipients`,
			duration: 3000,
		});
		setIsSendModalOpen(false);
	};

	const handleSendCancel = () => {
		setIsSendModalOpen(false);
	};

	const statusColor =
		status === "Active"
			? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-blue-200 dark:shadow-blue-900"
			: "bg-gray-200 dark:bg-[#020617] text-gray-700 dark:text-gray-300";

	const isGrid = viewMode === "grid";

	// Format schedule time for display
	const formatScheduleTime = (datetimeString: string): string => {
		if (!datetimeString) return "";
		try {
			const date = new Date(datetimeString);
			const dateStr = date.toLocaleDateString("en-US", {
				month: "short",
				day: "numeric",
				year: "numeric",
			});
			const timeStr = date.toLocaleTimeString("en-US", {
				hour: "numeric",
				minute: "2-digit",
				hour12: true,
			});
			return `${dateStr} at ${timeStr}`;
		} catch {
			return datetimeString;
		}
	};

	// Format last sent time for display
	const formatLastSent = (datetimeString: string): string => {
		if (!datetimeString) return "";
		try {
			const date = new Date(datetimeString);
			const dateStr = date.toLocaleDateString("en-US", {
				month: "short",
				day: "numeric",
				year: "numeric",
			});
			const timeStr = date.toLocaleTimeString("en-US", {
				hour: "numeric",
				minute: "2-digit",
				hour12: true,
			});
			return `${dateStr} at ${timeStr}`;
		} catch {
			return datetimeString;
		}
	};

	return (
		<div
			className={`!bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617] border ${isSelected ? "border-indigo-500 dark:border-indigo-400 ring-2 ring-indigo-500/20" : "border-gray-200 dark:border-slate-600"} rounded-xl shadow-lg hover:shadow-2xl transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.02] overflow-hidden ${isGrid ? "max-w-full" : "max-w-4xl"} ${onCardClick ? "cursor-pointer" : ""}`}
			onClick={onCardClick ? onCardClick : undefined}
		>
			<div className={`p-5 sm:p-6 ${isGrid ? "pb-4" : ""} relative`}>
				{/* Grid View Checkbox - Top Right */}
				{isGrid && onSelect && (
					<div className="absolute top-4 right-4 z-10">
						<input
							type="checkbox"
							checked={isSelected}
							onChange={(e) => {
								e.stopPropagation();
								onSelect();
							}}
							onClick={(e) => e.stopPropagation()}
							className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
						/>
					</div>
				)}
				{/* Card Header */}
				<div
					className={`flex justify-between items-start ${isGrid ? "mb-3" : "mb-4"}`}
					onClick={(e) => e.stopPropagation()}
				>
					<div className="flex-1 min-w-0 flex items-start gap-3">
						{!isGrid && onSelect && (
							<input
								type="checkbox"
								checked={isSelected}
								onChange={(e) => {
									e.stopPropagation();
									onSelect();
								}}
								onClick={(e) => e.stopPropagation()}
								className="mt-1 w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer flex-shrink-0"
							/>
						)}
						<div className="flex-1 min-w-0">
							<div className="flex items-center space-x-2 mb-2 flex-wrap">
								<h3
									className={`${isGrid ? "text-base" : "text-lg sm:text-xl"} font-bold text-gray-900 dark:text-slate-200 truncate`}
								>
									{title}
								</h3>
								<span
									className={`text-xs font-semibold px-2 py-0.5 rounded-full shadow-sm flex-shrink-0 ${statusColor}`}
								>
									{status}
								</span>
							</div>
						</div>
					</div>
					{!isGrid && (
						<div
							className="ml-4 flex-shrink-0"
							onClick={(e) => e.stopPropagation()}
						>
							<ToggleSwitch
								defaultOn={defaultToggleOn}
								onToggle={handleToggle}
							/>
						</div>
					)}
				</div>

				{/* Card Meta Info */}
				<div className={`space-y-3 ${isGrid ? "" : "mt-4"}`}>
					<div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600 dark:text-slate-400">
						<div className="flex items-center space-x-1.5">
							<BsCalendar
								className="text-gray-500 dark:text-slate-400"
								size={14}
							/>
							<span>Created {created}</span>
						</div>
						{scheduleTime && (
							<div className="flex items-center space-x-1.5">
								<BsClock
									className="text-gray-500 dark:text-slate-400"
									size={14}
								/>
								<span>Scheduled {formatScheduleTime(scheduleTime)}</span>
							</div>
						)}
						{lastSent && (
							<div className="flex items-center space-x-1.5">
								<BsSend
									className="text-gray-500 dark:text-slate-400"
									size={14}
								/>
								<span>Last sent {formatLastSent(lastSent)}</span>
							</div>
						)}
						<div className="flex items-center space-x-1.5">
							<BsListUl
								className="text-gray-500 dark:text-slate-400"
								size={14}
							/>
							<span>{questions} questions</span>
						</div>
					</div>

					{/* Recipients Accordion */}
					{sendTo && sendTo.length > 0 && (
						<div onClick={(e) => e.stopPropagation()}>
							<Accordion type="single" collapsible className="w-full">
								<AccordionItem value="recipients" className="border-0">
									<AccordionTrigger className="py-2 text-sm font-semibold text-gray-700 dark:text-slate-300 hover:no-underline [&>svg:last-child]:hidden justify-start group">
										<BsChevronDown className="h-3.5 w-3.5 mr-1.5 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
										Recipients ({sendTo.length})
									</AccordionTrigger>
									<AccordionContent className="pb-2">
										<div className="space-y-2">
											{(() => {
												const selectedRecipients = SURVEY_ALL_RECIPIENTS.filter(
													(r) => sendTo.includes(r.id),
												);
												const groups = selectedRecipients.filter(
													(r) => r.type === "group",
												);
												const ticketTiers = selectedRecipients.filter(
													(r) => r.type === "ticket-tier",
												);

												return (
													<>
														{groups.length > 0 && (
															<div>
																<p className="text-xs font-semibold text-gray-600 dark:text-slate-400 mb-1">
																	Groups
																</p>
																<div className="space-y-1">
																	{groups.map((recipient) => (
																		<div
																			key={recipient.id}
																			className="flex items-center text-sm text-gray-700 dark:text-slate-300"
																		>
																			<span>{recipient.name}</span>
																			<span className="text-xs text-gray-500 dark:text-slate-400 ml-1">
																				({recipient.count})
																			</span>
																		</div>
																	))}
																</div>
															</div>
														)}
														{ticketTiers.length > 0 && (
															<div>
																<p className="text-xs font-semibold text-gray-600 dark:text-slate-400 mb-1">
																	Ticket Tiers
																</p>
																<div className="space-y-1">
																	{ticketTiers.map((recipient) => (
																		<div
																			key={recipient.id}
																			className="flex items-center text-sm text-gray-700 dark:text-slate-300"
																		>
																			<span>{recipient.name}</span>
																			<span className="text-xs text-gray-500 dark:text-slate-400 ml-1">
																				({recipient.count})
																			</span>
																		</div>
																	))}
																</div>
															</div>
														)}
													</>
												);
											})()}
										</div>
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						</div>
					)}

					{/* Profile bubbles and responses - right below creation date */}
					<div className="flex items-center space-x-3">
						<AvatarGroup />
						<div className="text-sm">
							<span className="font-semibold text-gray-800 dark:text-slate-200">
								{responses} responses
							</span>
							<span className="text-gray-500 dark:text-slate-400">
								{" "}
								• {completed} completed
							</span>
						</div>
					</div>

					{!isGrid && (
						<button
							onClick={(e) => {
								e.stopPropagation();
								setIsExpanded(!isExpanded);
							}}
							className="flex items-center space-x-1 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors cursor-pointer"
						>
							<span>{isExpanded ? "Collapse" : "View All"}</span>
							{isExpanded ? <BsChevronUp /> : <BsChevronDown />}
						</button>
					)}
				</div>
			</div>

			{isExpanded && !isGrid && <RespondentList />}

			<div
				className={`border-t border-gray-200 dark:border-slate-600 !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617] px-5 sm:px-6 py-4 ${isGrid ? "pt-3" : ""}`}
				onClick={(e) => e.stopPropagation()}
			>
				<div
					className={`flex items-center ${isGrid ? "justify-center flex-wrap gap-2" : "flex-wrap gap-4"}`}
				>
					<button
						onClick={(e) => {
							e.stopPropagation();
							onEdit();
						}}
						className="flex items-center space-x-1.5 text-sm text-gray-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold transition-colors cursor-pointer"
					>
						<BsPencil size={16} /> <span>Edit</span>
					</button>
					<button
						onClick={(e) => {
							e.stopPropagation();
							onPreview();
						}}
						className="flex items-center space-x-1.5 text-sm text-gray-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold transition-colors cursor-pointer"
					>
						<BsEye size={16} /> <span>Preview</span>
					</button>
					<button
						onClick={(e) => {
							e.stopPropagation();
							handleCopyLink();
						}}
						className="flex items-center space-x-1.5 text-sm text-gray-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold transition-colors cursor-pointer"
					>
						<BsLink45Deg size={16} /> <span>Copy Link</span>
					</button>
					<button
						onClick={(e) => {
							e.stopPropagation();
							handleSendClick();
						}}
						className="flex items-center space-x-1.5 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500 font-semibold transition-colors cursor-pointer"
					>
						<BsSend size={16} /> <span>Send</span>
					</button>
					<button
						onClick={(e) => {
							e.stopPropagation();
							handleDeleteClick();
						}}
						className="flex items-center space-x-1.5 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-500 font-semibold transition-colors cursor-pointer"
					>
						<BsTrash size={16} /> <span>Delete</span>
					</button>
				</div>
			</div>

			<DeleteSurveyModal
				isOpen={isDeleteModalOpen}
				surveyTitle={title}
				onClose={handleDeleteCancel}
				onConfirm={handleDeleteConfirm}
			/>

			<SendSurveyModal
				isOpen={isSendModalOpen}
				surveyTitle={title}
				onClose={handleSendCancel}
				onConfirm={handleSendConfirm}
			/>
		</div>
	);
}
