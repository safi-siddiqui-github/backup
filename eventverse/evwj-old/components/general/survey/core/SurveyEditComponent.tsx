"use client";

import React, { useMemo, useState } from "react";
import { toast } from "sonner";
import HeaderBar from "../edit/page/HeaderBar";
import StatsHeader from "../edit/page/StatsHeader";
import MainTabs from "../edit/page/MainTabs";
import QuestionTabs from "../edit/page/QuestionTabs";
import QuestionStats from "../edit/page/QuestionStats";
import ResponsesList from "../edit/page/ResponsesList";
import StarRating from "../edit/StarRating";
import {
	AnyResponse,
	SurveyResultsData,
	SurveyQuestion,
	RatingQuestion,
	MultipleChoiceQuestion,
	TextQuestion,
	Respondent,
} from "../types/survey-types";
import { questionTypes } from "../types/survey-question-types";
import getQuestionIcon from "../edit/getQuestionIcon";

const mockRespondents: Record<string, Respondent> = {
	js: {
		id: "r1",
		name: "John Smith",
		initials: "JS",
		avatarColor: "bg-blue-500",
	},
	sj: {
		id: "r2",
		name: "Sarah Johnson",
		initials: "SJ",
		avatarColor: "bg-sky-500",
	},
	md: {
		id: "r3",
		name: "Mike Davis",
		initials: "MD",
		avatarColor: "bg-teal-500",
	},
	ew: {
		id: "r4",
		name: "Emily Wilson",
		initials: "EW",
		avatarColor: "bg-purple-500",
	},
	db: {
		id: "r5",
		name: "David Brown",
		initials: "DB",
		avatarColor: "bg-orange-500",
	},
	lm: {
		id: "r6",
		name: "Lisa Martinez",
		initials: "LM",
		avatarColor: "bg-pink-500",
	},
	jt: {
		id: "r7",
		name: "James Taylor",
		initials: "JT",
		avatarColor: "bg-indigo-500",
	},
	aa: {
		id: "r8",
		name: "Anna Anderson",
		initials: "AA",
		avatarColor: "bg-green-500",
	},
	rt: {
		id: "r9",
		name: "Robert Thomas",
		initials: "RT",
		avatarColor: "bg-red-500",
	},
	mg: {
		id: "r10",
		name: "Maria Garcia",
		initials: "MG",
		avatarColor: "bg-yellow-500",
	},
	wj: {
		id: "r11",
		name: "William Jackson",
		initials: "WJ",
		avatarColor: "bg-cyan-500",
	},
	sw: {
		id: "r12",
		name: "Susan White",
		initials: "SW",
		avatarColor: "bg-violet-500",
	},
	ch: {
		id: "r13",
		name: "Christopher Harris",
		initials: "CH",
		avatarColor: "bg-fuchsia-500",
	},
	jm: {
		id: "r14",
		name: "Jennifer Martin",
		initials: "JM",
		avatarColor: "bg-rose-500",
	},
	dl: {
		id: "r15",
		name: "Daniel Lee",
		initials: "DL",
		avatarColor: "bg-lime-500",
	},
};

const mockFullSurveyData: SurveyResultsData = {
	id: "survey123",
	title: "Event Feedback Survey",
	description:
		"Help us improve your event experience by sharing your thoughts and feedback.",
	status: "Active",
	stats: {
		totalResponses: 45,
		completionRate: 84,
		questions: 6,
		completed: 38,
	},
	questions: [
		{
			id: "q1",
			text: "How would you rate the overall event experience?",
			type: "Rating",
			isRequired: true,
			totalResponses: 38,
			maxRating: 5,
			stats: {
				averageRating: 3.1,
				totalRatings: 38,
			},
			responses: [
				{
					id: "resp1-1",
					respondent: mockRespondents.js,
					timestamp: "Oct 10, 10:00 AM",
					rating: 4,
				},
				{
					id: "resp1-2",
					respondent: mockRespondents.sj,
					timestamp: "Sep 24, 09:34 AM",
					rating: 3,
				},
				{
					id: "resp1-3",
					respondent: mockRespondents.md,
					timestamp: "Sep 25, 06:15 PM",
					rating: 5,
				},
				{
					id: "resp1-4",
					respondent: mockRespondents.ew,
					timestamp: "Oct 15, 04:12 AM",
					rating: 5,
				},
			],
		},
		{
			id: "q2",
			text: "Which aspect of the event did you enjoy most?",
			type: "MultipleChoice",
			isRequired: true,
			totalResponses: 38,
			options: [
				"Keynote Speakers",
				"Networking Sessions",
				"Food & Beverages",
				"Venue & Atmosphere",
				"Interactive Activities",
			],
			stats: {
				distribution: [
					{ option: "Keynote Speakers", count: 4, percent: 11 },
					{ option: "Networking Sessions", count: 11, percent: 29 },
					{ option: "Food & Beverages", count: 9, percent: 24 },
					{ option: "Venue & Atmosphere", count: 10, percent: 26 },
					{ option: "Interactive Activities", count: 4, percent: 11 },
				],
			},
			responses: [
				{
					id: "resp2-1",
					respondent: mockRespondents.js,
					timestamp: "Oct 10, 10:00 AM",
					answer: "Food & Beverages",
				},
			],
		},
		{
			id: "q3",
			text: "What topics would you like to see in future events? (Select all that apply)",
			type: "Checkbox",
			isRequired: false,
			totalResponses: 38,
			options: [
				"Technology Trends",
				"Leadership Development",
				"Industry Insights",
				"Career Growth",
				"Innovation",
				"Sustainability",
			],
			responses: [
				{
					id: "resp3-1",
					respondent: mockRespondents.js,
					timestamp: "Oct 10, 10:00 AM",
					answers: ["Technology Trends", "Career Growth"],
				},
				{
					id: "resp3-2",
					respondent: mockRespondents.sj,
					timestamp: "Sep 24, 09:34 AM",
					answers: ["Technology Trends", "Career Growth"],
				},
				{
					id: "resp3-3",
					respondent: mockRespondents.md,
					timestamp: "Sep 25, 06:15 PM",
					answers: ["Career Growth", "Sustainability"],
				},
				{
					id: "resp3-4",
					respondent: mockRespondents.ew,
					timestamp: "Oct 15, 04:12 AM",
					answers: [
						"Leadership Development",
						"Technology Trends",
						"Sustainability",
					],
				},
			],
		},
		{
			id: "q4",
			text: "What could we have done better? Please share your suggestions.",
			type: "Text",
			isRequired: false,
			totalResponses: 38,
			stats: { totalResponses: 38 },
			responses: [
				{
					id: "resp4-1",
					respondent: mockRespondents.js,
					timestamp: "Oct 10, 10:00 AM",
					answer: "The speakers were very knowledgeable.",
				},
				{
					id: "resp4-2",
					respondent: mockRespondents.sj,
					timestamp: "Sep 24, 09:34 AM",
					answer: "Wonderful atmosphere and friendly staff.",
				},
				{
					id: "resp4-3",
					respondent: mockRespondents.md,
					timestamp: "Sep 25, 06:15 PM",
					answer: "Loved the networking opportunities.",
				},
			],
		},
		{
			id: "q5",
			text: "How likely are you to recommend this event to a colleague?",
			type: "Rating",
			isRequired: true,
			totalResponses: 38,
			maxRating: 10,
			stats: {
				averageRating: 5.3,
				totalRatings: 38,
			},
			responses: [
				{
					id: "resp5-1",
					respondent: mockRespondents.js,
					timestamp: "Oct 10, 10:00 AM",
					rating: 8,
				},
				{
					id: "resp5-2",
					respondent: mockRespondents.sj,
					timestamp: "Sep 24, 09:34 AM",
					rating: 9,
				},
			],
		},
		{
			id: "q6",
			text: "When would be the best time for our next event?",
			type: "Date",
			isRequired: false,
			totalResponses: 38,
			stats: { totalResponses: 38 },
			responses: [
				{
					id: "resp6-1",
					respondent: mockRespondents.js,
					timestamp: "Oct 10, 10:00 AM",
					answer: "Oct 30, 2025",
				},
			],
		},
	],
};

type Props = { onBackToSurveys: () => void };

function isRatingQuestion(q: SurveyQuestion): q is RatingQuestion {
	return q.type === "Rating";
}
function isMultipleChoiceQuestion(
	q: SurveyQuestion,
): q is MultipleChoiceQuestion {
	return q.type === "MultipleChoice";
}
function isTextQuestion(q: SurveyQuestion): q is TextQuestion {
	return q.type === "Text";
}

export default function SurveyResultsPage({ onBackToSurveys }: Props) {
	const [activeMainTab, setActiveMainTab] = useState<
		"questions" | "analytics" | "settings"
	>("questions");
	const [activeQuestionId, setActiveQuestionId] = useState(
		mockFullSurveyData.questions[0].id,
	);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;

	const activeQuestion = useMemo(
		() => mockFullSurveyData.questions.find((q) => q.id === activeQuestionId),
		[activeQuestionId],
	);

	if (!activeQuestion) return <div>Error: Question not found.</div>;

	const totalResponses = activeQuestion.responses.length;
	const allResponses = activeQuestion.responses as unknown as AnyResponse[];
	const paginatedResponses = allResponses.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage,
	);

	const handleShare = () =>
		toast.success("Share functionality not implemented.");
	const handleEditSurvey = () =>
		toast.success("Edit Survey functionality not implemented.");

	const handlePageChange = (page: number) => {
		if (
			page > 0 &&
			page <= Math.ceil(activeQuestion.responses.length / itemsPerPage)
		) {
			setCurrentPage(page);
		}
	};

	return (
		<div className="fixed inset-0 z-50 overflow-y-auto bg-gray-100 dark:bg-black text-gray-900 dark:text-white">
			<HeaderBar
				status={mockFullSurveyData.status}
				onBack={onBackToSurveys}
				onEdit={handleEditSurvey}
			/>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<StatsHeader
					title={mockFullSurveyData.title}
					description={mockFullSurveyData.description}
					totalResponses={mockFullSurveyData.stats.totalResponses}
					completionRate={mockFullSurveyData.stats.completionRate}
					questions={mockFullSurveyData.stats.questions}
					completed={mockFullSurveyData.stats.completed}
					onShare={handleShare}
				/>

				<div className="mt-6">
					<MainTabs active={activeMainTab} onChange={setActiveMainTab} />
				</div>

				<div className="mt-8">
					{activeMainTab === "questions" && (
						<div>
							<h2 className="text-xl font-semibold mb-4 flex items-center">
								Survey Questions ({mockFullSurveyData.stats.questions})
							</h2>
							<QuestionTabs
								questions={mockFullSurveyData.questions.map((q) => ({
									id: q.id,
									type: q.type,
									totalResponses: q.totalResponses,
								}))}
								activeId={activeQuestionId}
								onSelect={(id) => {
									setActiveQuestionId(id);
									setCurrentPage(1);
								}}
							/>

							<div
								key={activeQuestion.id}
								className="!bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617] p-6 rounded-2xl border border-gray-200 dark:border-gray-700"
							>
								<div className="flex justify-between items-start mb-4">
									<div>
										<div className="flex items-center space-x-3 mb-2">
											<span className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-400">
												{getQuestionIcon(activeQuestion.type)}
												<span className="ml-1.5 capitalize">
													{(() => {
														const key =
															activeQuestion.type === "MultipleChoice"
																? "multiple-choice"
																: activeQuestion.type === "Checkbox"
																	? "checkboxes"
																	: activeQuestion.type.toLowerCase();
														return (
															questionTypes.find((qt) => qt.type === key)
																?.label || activeQuestion.type
														);
													})()}
												</span>
											</span>
											{activeQuestion.isRequired && (
												<span className="px-2 py-0.5 text-xs font-semibold text-red-700 bg-red-100 rounded-full dark:bg-red-900 dark:text-red-300">
													Required
												</span>
											)}
										</div>
										<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
											{activeQuestion.text}
										</h3>
									</div>
									<span className="shrink-0 text-lg font-bold text-blue-600 dark:text-blue-400">
										{activeQuestion.totalResponses}{" "}
										<span className="text-sm font-medium text-gray-500 dark:text-gray-400">
											Responses
										</span>
									</span>
								</div>

								<div className="my-6">
									{isRatingQuestion(activeQuestion) && (
										<QuestionStats
											kind="rating"
											stats={{
												averageRating: activeQuestion.stats.averageRating,
												totalRatings: activeQuestion.stats.totalRatings,
											}}
										/>
									)}
									{isMultipleChoiceQuestion(activeQuestion) && (
										<QuestionStats
											kind="multiple-choice"
											stats={{
												distribution: activeQuestion.stats.distribution,
											}}
										/>
									)}
									{isTextQuestion(activeQuestion) && (
										<QuestionStats
											kind="text"
											stats={{
												totalResponses: activeQuestion.stats.totalResponses,
											}}
										/>
									)}
									{activeQuestion.type === "Checkbox" && (
										<QuestionStats kind="none" />
									)}
								</div>

								<ResponsesList
									responses={paginatedResponses}
									renderAnswer={(response: AnyResponse) => {
										const t = activeQuestion.type.toLowerCase();
										if (t === "rating" && "rating" in response) {
											return (
												<div className="flex items-center gap-1">
													<StarRating rating={response.rating} />
													<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
														({response.rating})
													</span>
												</div>
											);
										}
										if (
											(t === "checkbox" || t === "checkboxes") &&
											"answers" in response
										) {
											return (
												<span className="text-sm text-gray-700 dark:text-gray-300">
													{response.answers.join(", ")}
												</span>
											);
										}
										if ("answer" in response) {
											return (
												<span className="text-sm font-medium text-gray-800 dark:text-gray-200">
													{response.answer}
												</span>
											);
										}
										return null;
									}}
									total={totalResponses}
									currentPage={currentPage}
									itemsPerPage={itemsPerPage}
									onPageChange={handlePageChange}
								/>
							</div>
						</div>
					)}

					{activeMainTab === "analytics" && (
						<div className="text-center p-10 !bg-white dark:!bg-[#020617] rounded-lg shadow [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617]">
							<h3 className="text-xl font-semibold">Analytics Tab</h3>
							<p className="text-gray-500 dark:text-gray-400 mt-2">
								This content is not defined in the provided images.
							</p>
						</div>
					)}

					{activeMainTab === "settings" && (
						<div className="text-center p-10 !bg-white dark:!bg-[#020617] rounded-lg shadow [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617]">
							<h3 className="text-xl font-semibold">Settings Tab</h3>
							<p className="text-gray-500 dark:text-gray-400 mt-2">
								This content is not defined in the provided images.
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
