"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { BsX, BsStarFill } from "react-icons/bs";
import getQuestionIcon from "../edit/getQuestionIcon";
import Tab from "../edit/Tab";
import StarRating from "../edit/StarRating";
import Pagination from "../edit/Pagination";

const generateMockResponses = () => {
	const names = [
		{ name: "John Smith", initials: "JS", color: "bg-blue-500" },
		{ name: "Sarah Johnson", initials: "SJ", color: "bg-pink-500" },
		{ name: "Mike Davis", initials: "MD", color: "bg-teal-500" },
		{ name: "Emily Wilson", initials: "EW", color: "bg-purple-500" },
		{ name: "David Brown", initials: "DB", color: "bg-orange-500" },
		{ name: "Lisa Martinez", initials: "LM", color: "bg-sky-500" },
		{ name: "James Taylor", initials: "JT", color: "bg-indigo-500" },
		{ name: "Anna Anderson", initials: "AA", color: "bg-green-500" },
		{ name: "Robert Thomas", initials: "RT", color: "bg-red-500" },
		{ name: "Maria Garcia", initials: "MG", color: "bg-yellow-500" },
		{ name: "William Jackson", initials: "WJ", color: "bg-cyan-500" },
		{ name: "Susan White", initials: "SW", color: "bg-violet-500" },
		{ name: "Christopher Harris", initials: "CH", color: "bg-fuchsia-500" },
		{ name: "Jennifer Martin", initials: "JM", color: "bg-rose-500" },
		{ name: "Daniel Lee", initials: "DL", color: "bg-lime-500" },
	];

	const responses = [];
	for (let i = 0; i < 45; i++) {
		const person = names[i % names.length];
		responses.push({
			id: `resp-${i + 1}`,
			name: `${person.name} ${i >= names.length ? i + 1 : ""}`.trim(),
			initials: person.initials,
			avatarColor: person.color,
			timestamp: `Oct ${10 + (i % 20)}, ${9 + (i % 12)}:${10 + (i % 50)} AM`,
			rating: Math.floor(Math.random() * 5) + 1,
		});
	}
	return responses;
};

const mockQuestions = [
	{
		id: "q1",
		number: 1,
		text: "How would you rate the overall event experience?",
		type: "Rating",
		isRequired: true,
		responses: generateMockResponses(),
		stats: {
			averageRating: 3.2,
			totalRatings: 45,
		},
	},
	{
		id: "q2",
		number: 2,
		text: "Which aspect of the event did you enjoy most?",
		type: "Multiple Choice",
		isRequired: true,
		responses: generateMockResponses(),
		stats: {
			averageRating: 4.1,
			totalRatings: 45,
		},
	},
	{
		id: "q3",
		number: 3,
		text: "What topics would you like to see in future events?",
		type: "Checkbox",
		isRequired: false,
		responses: generateMockResponses(),
		stats: {
			averageRating: 3.8,
			totalRatings: 45,
		},
	},
	{
		id: "q4",
		number: 4,
		text: "Please share your suggestions for improvement.",
		type: "Text",
		isRequired: false,
		responses: generateMockResponses(),
		stats: {
			averageRating: 4.5,
			totalRatings: 45,
		},
	},
	{
		id: "q5",
		number: 5,
		text: "How likely are you to recommend this event?",
		type: "Rating",
		isRequired: true,
		responses: generateMockResponses(),
		stats: {
			averageRating: 4.2,
			totalRatings: 45,
		},
	},
	{
		id: "q6",
		number: 6,
		text: "When would be the best time for our next event?",
		type: "Date",
		isRequired: false,
		responses: generateMockResponses(),
		stats: {
			averageRating: 3.9,
			totalRatings: 45,
		},
	},
];

type SurveyEditModalProps = {
	onClose: () => void;
};

export default function SurveyEditModal({ onClose }: SurveyEditModalProps) {
	const [isVisible, setIsVisible] = useState(false);
	const [activeQuestionId, setActiveQuestionId] = useState(mockQuestions[0].id);
	const [currentPage, setCurrentPage] = useState(1);
	const modalRef = useRef<HTMLDivElement>(null);
	const closeBtnRef = useRef<HTMLButtonElement>(null);
	const itemsPerPage = 10;

	const activeQuestion = mockQuestions.find((q) => q.id === activeQuestionId)!;
	const totalPages = Math.ceil(activeQuestion.responses.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const paginatedResponses = activeQuestion.responses.slice(
		startIndex,
		endIndex,
	);

	const handleRequestClose = useCallback(() => {
		setIsVisible(false);
		window.setTimeout(() => onClose(), 200);
	}, [onClose]);

	// Focus trap
	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLDivElement>) => {
			if (e.key !== "Tab") return;
			const root = modalRef.current;
			if (!root) return;
			const focusable = Array.from(
				root.querySelectorAll<HTMLElement>(
					'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
				),
			);
			if (focusable.length === 0) return;
			const first = focusable[0];
			const last = focusable[focusable.length - 1];
			const current = document.activeElement as HTMLElement | null;

			if (!e.shiftKey && current === last) {
				e.preventDefault();
				first.focus();
			} else if (e.shiftKey && current === first) {
				e.preventDefault();
				last.focus();
			}
		},
		[],
	);

	// Mount effects
	useEffect(() => {
		const prevOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		const t = window.setTimeout(() => {
			setIsVisible(true);
			closeBtnRef.current?.focus();
		}, 0);

		const onEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape") handleRequestClose();
		};
		document.addEventListener("keydown", onEsc);

		return () => {
			document.body.style.overflow = prevOverflow;
			document.removeEventListener("keydown", onEsc);
			window.clearTimeout(t);
		};
	}, [handleRequestClose]);

	const handlePageChange = (page: number) => {
		if (page > 0 && page <= totalPages) {
			setCurrentPage(page);
		}
	};

	const handleQuestionChange = (questionId: string) => {
		setActiveQuestionId(questionId);
		setCurrentPage(1);
	};

	return (
		<div
			className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 transition-opacity duration-200 overflow-hidden ${
				isVisible ? "opacity-100" : "opacity-0"
			} bg-black/70 backdrop-blur-md`}
			onClick={handleRequestClose}
			role="dialog"
			aria-modal="true"
			aria-labelledby="survey-edit-title"
		>
			<div
				ref={modalRef}
				className={`relative w-[90vw] max-w-5xl h-full sm:h-auto sm:max-h-[90vh] flex flex-col overflow-hidden rounded-xl shadow-2xl border border-gray-200 dark:border-slate-600 !bg-white dark:!bg-slate-800/95 backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:rgb(30_41_59/0.95)] transition-all duration-200 ${
					isVisible
						? "opacity-100 translate-y-0 scale-100"
						: "opacity-0 translate-y-2 scale-95"
				}`}
				onClick={(e) => e.stopPropagation()}
				onKeyDown={handleKeyDown}
				tabIndex={-1}
			>
				{/* Modal Header */}
				<div className="flex-shrink-0 flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 dark:border-slate-600 !bg-white dark:!bg-slate-800/95 backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:rgb(30_41_59/0.95)]">
					<div>
						<h2
							id="survey-edit-title"
							className="text-2xl font-semibold text-gray-900 dark:text-slate-200"
						>
							Event Feedback Survey - Results
						</h2>
						<p className="mt-1 text-sm text-gray-600 dark:text-slate-400">
							View and analyze survey responses
						</p>
					</div>
					<button
						ref={closeBtnRef}
						onClick={handleRequestClose}
						className="p-2 text-gray-600 transition-colors rounded-full hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
						aria-label="Close modal"
					>
						<BsX className="w-6 h-6" />
					</button>
				</div>

				{/* Modal Body */}
				<div className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-6 py-4 sm:py-5">
					{/* Summary Stats */}
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
						<div className="p-4 !bg-white dark:!bg-slate-700/50 rounded-xl border border-blue-200 dark:border-blue-700 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
							<div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
								45
							</div>
							<div className="text-sm font-medium text-blue-900 dark:text-blue-300">
								Total Responses
							</div>
						</div>
						<div className="p-4 !bg-white dark:!bg-slate-700/50 rounded-xl border border-green-200 dark:border-green-700 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
							<div className="text-3xl font-bold text-green-600 dark:text-green-400">
								84%
							</div>
							<div className="text-sm font-medium text-green-900 dark:text-green-300">
								Completion Rate
							</div>
						</div>
						<div className="p-4 !bg-white dark:!bg-slate-700/50 rounded-xl border border-purple-200 dark:border-purple-700 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
							<div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
								6
							</div>
							<div className="text-sm font-medium text-purple-900 dark:text-purple-300">
								Questions
							</div>
						</div>
						<div className="p-4 !bg-white dark:!bg-slate-700/50 rounded-xl border border-orange-200 dark:border-orange-700 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
							<div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
								38
							</div>
							<div className="text-sm font-medium text-orange-900 dark:text-orange-300">
								Completed
							</div>
						</div>
					</div>

					{/* Question Tabs */}
					<div className="mb-6">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-slate-200 mb-4">
							Survey Questions
						</h3>
						<div className="flex gap-2 overflow-x-auto pb-2">
							{mockQuestions
								.filter((q) => q.type.toLowerCase() !== "date")
								.map((q) => (
									<Tab
										key={q.id}
										isActive={activeQuestionId === q.id}
										onClick={() => handleQuestionChange(q.id)}
										count={q.responses.length}
									>
										<span className="flex items-center">
											{getQuestionIcon(q.type)}Q{q.number}
										</span>
									</Tab>
								))}
						</div>
					</div>

					{/* Active Question Content */}
					<div className="!bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617] p-6 rounded-xl border border-gray-200 dark:border-slate-600">
						{/* Question Header & Stats Section (Dynamic) */}
						<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 gap-4">
							<div className="flex-1">
								<div className="flex items-center gap-3 mb-2">
									<span className="text-sm font-medium text-gray-600 dark:text-slate-400">
										{(() => {
											switch (activeQuestion.type.toLowerCase()) {
												case "rating":
													return "Rating";
												case "multiple choice":
													return "Multiple Choice";
												case "checkbox":
													return "Checkbox";
												case "text":
													return "Text";
												case "date":
													return "Date";
												default:
													return activeQuestion.type;
											}
										})()}
									</span>
									{activeQuestion.isRequired && (
										<span className="px-2 py-0.5 text-xs font-semibold text-red-700 bg-red-100 rounded-full dark:bg-red-900 dark:text-red-300">
											Required
										</span>
									)}
								</div>
								<h4 className="text-xl font-semibold text-gray-900 dark:text-slate-200">
									{activeQuestion.text}
								</h4>
							</div>
							<div className="text-right">
								<div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
									{activeQuestion.responses.length}
								</div>
								<div className="text-sm text-gray-600 dark:text-slate-400">
									Responses
								</div>
							</div>
						</div>

						{/* Dynamic Stats Section */}
						{(() => {
							switch (activeQuestion.type.toLowerCase()) {
								case "rating":
									return (
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
											<div className="p-5 !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617] rounded-xl border border-gray-200 dark:border-slate-600 shadow-sm">
												<p className="mb-1 text-sm font-medium text-gray-600 dark:text-slate-400">
													Average Rating
												</p>
												<div className="flex items-center gap-2">
													<span className="text-3xl font-bold text-gray-900 dark:text-slate-200">
														{activeQuestion.stats.averageRating.toFixed(1)}
													</span>
													<BsStarFill className="w-6 h-6 text-yellow-400" />
												</div>
											</div>
											<div className="p-5 !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617] rounded-xl border border-gray-200 dark:border-slate-600 shadow-sm">
												<p className="mb-1 text-sm font-medium text-gray-600 dark:text-slate-400">
													Total Ratings
												</p>
												<span className="text-3xl font-bold text-gray-900 dark:text-slate-200">
													{activeQuestion.stats.totalRatings}
												</span>
											</div>
										</div>
									);
								case "multiple choice":
									// Example: show response distribution (mocked for now)
									return (
										<div className="p-5 !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617] rounded-xl border border-gray-200 dark:border-slate-600 shadow-sm mb-6">
											<p className="mb-4 text-sm font-medium text-gray-600 dark:text-slate-400">
												Response Distribution
											</p>
											<div className="space-y-4">
												{/* Replace with real data if available */}
												<div>
													<div className="flex justify-between mb-1 text-sm">
														<span className="font-medium text-gray-800 dark:text-slate-200">
															Keynote Speakers
														</span>
														<span className="text-gray-500 dark:text-slate-400">
															4 (11%)
														</span>
													</div>
													<div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-[#020617]">
														<div
															className="bg-indigo-600 h-1.5 rounded-full"
															style={{ width: "11%" }}
														></div>
													</div>
												</div>
												<div>
													<div className="flex justify-between mb-1 text-sm">
														<span className="font-medium text-gray-800 dark:text-slate-200">
															Networking Sessions
														</span>
														<span className="text-gray-500 dark:text-slate-400">
															11 (29%)
														</span>
													</div>
													<div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-[#020617]">
														<div
															className="bg-indigo-600 h-1.5 rounded-full"
															style={{ width: "29%" }}
														></div>
													</div>
												</div>
												<div>
													<div className="flex justify-between mb-1 text-sm">
														<span className="font-medium text-gray-800 dark:text-slate-200">
															Food & Beverages
														</span>
														<span className="text-gray-500 dark:text-slate-400">
															9 (24%)
														</span>
													</div>
													<div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-[#020617]">
														<div
															className="bg-indigo-600 h-1.5 rounded-full"
															style={{ width: "24%" }}
														></div>
													</div>
												</div>
												<div>
													<div className="flex justify-between mb-1 text-sm">
														<span className="font-medium text-gray-800 dark:text-slate-200">
															Venue & Atmosphere
														</span>
														<span className="text-gray-500 dark:text-slate-400">
															10 (26%)
														</span>
													</div>
													<div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-[#020617]">
														<div
															className="bg-indigo-600 h-1.5 rounded-full"
															style={{ width: "26%" }}
														></div>
													</div>
												</div>
												<div>
													<div className="flex justify-between mb-1 text-sm">
														<span className="font-medium text-gray-800 dark:text-slate-200">
															Interactive Activities
														</span>
														<span className="text-gray-500 dark:text-slate-400">
															4 (11%)
														</span>
													</div>
													<div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-[#020617]">
														<div
															className="bg-indigo-600 h-1.5 rounded-full"
															style={{ width: "11%" }}
														></div>
													</div>
												</div>
											</div>
										</div>
									);
								case "checkbox":
									// Example: show selected topics cloud and counts (mocked)
									const items = [
										{ label: "Workshops", count: 21 },
										{ label: "Panels", count: 17 },
										{ label: "Networking", count: 28 },
										{ label: "Demos", count: 12 },
										{ label: "Q&A", count: 9 },
									];
									const total = items.reduce((s, i) => s + i.count, 0);
									return (
										<div className="p-5 !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617] rounded-xl border border-gray-200 dark:border-slate-600 shadow-sm mb-6">
											<p className="mb-4 text-sm font-medium text-gray-600 dark:text-slate-400">
												Selections Overview
											</p>
											<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
												<div className="space-y-3">
													{items.map((it) => (
														<div key={it.label}>
															<div className="flex justify-between mb-1 text-sm">
																<span className="font-medium text-gray-800 dark:text-slate-200">
																	{it.label}
																</span>
																<span className="text-gray-500 dark:text-slate-400">
																	{it.count} (
																	{Math.round((it.count / total) * 100)}%)
																</span>
															</div>
															<div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-[#020617]">
																<div
																	className="bg-green-600 h-1.5 rounded-full"
																	style={{
																		width: `${Math.round((it.count / total) * 100)}%`,
																	}}
																></div>
															</div>
														</div>
													))}
												</div>
												<div className="flex flex-wrap gap-2">
													{items.flatMap((it) =>
														Array.from(
															{ length: Math.max(1, Math.round(it.count / 7)) },
															(_, idx) => (
																<span
																	key={`${it.label}-${idx}`}
																	className="px-2.5 py-1 rounded-full text-xs bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
																>
																	{it.label}
																</span>
															),
														),
													)}
												</div>
											</div>
										</div>
									);
								case "text":
								case "date":
									return (
										<div className="p-5 !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617] rounded-xl border border-gray-200 dark:border-slate-600 shadow-sm mb-6">
											<p className="mb-1 text-sm font-medium text-gray-600 dark:text-slate-400">
												Total Responses
											</p>
											<span className="text-3xl font-bold text-gray-900 dark:text-slate-200">
												{activeQuestion.responses.length}
											</span>
										</div>
									);
								default:
									return null;
							}
						})()}

						{/* Individual Responses */}
						<div>
							<h5 className="text-lg font-semibold text-gray-900 dark:text-slate-200 mb-4">
								Individual Responses
							</h5>
							<div className="!bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617] rounded-xl border border-gray-200 dark:border-slate-600 divide-y divide-gray-200 dark:divide-slate-600">
								{paginatedResponses.map((response) => (
									<div
										key={response.id}
										className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-[#020617] transition-colors"
									>
										<div className="flex items-center gap-3">
											<div
												className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${response.avatarColor}`}
											>
												{response.initials}
											</div>
											<div>
												<p className="font-semibold text-gray-900 dark:text-slate-200">
													{response.name}
												</p>
												<p className="text-sm text-gray-500 dark:text-slate-400">
													{response.timestamp}
												</p>
											</div>
										</div>
										<StarRating rating={response.rating} />
									</div>
								))}
							</div>

							{/* Pagination */}
							{totalPages > 1 && (
								<Pagination
									currentPage={currentPage}
									totalPages={totalPages}
									onPageChange={handlePageChange}
									totalItems={activeQuestion.responses.length}
									itemsPerPage={itemsPerPage}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
