"use client";

import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

type Question = {
	id: string;
	type: "multiple" | "checkboxes" | "text" | "rating";
	question: string;
	required?: boolean;
	options?: string[];
};

type Survey = {
	id: string;
	title: string;
	subtitle?: string;
	due?: string;
	type: "feedback" | "poll" | "rating" | "custom";
	questions: Question[];
};

// Generate 30 different questions of various types
const generateMockQuestions = (): Question[] => {
	const questions: Question[] = [
		// Multiple choice questions
		{ id: "q1", type: "multiple", question: "Which session did you like most?", options: ["Session A", "Session B", "Session C", "Session D"], required: true },
		{ id: "q2", type: "multiple", question: "What was your primary reason for attending?", options: ["Networking", "Learning", "Entertainment", "Business"], required: true },
		{ id: "q3", type: "multiple", question: "How did you hear about this event?", options: ["Social Media", "Email", "Friend/Colleague", "Website", "Other"], required: false },
		{ id: "q4", type: "multiple", question: "Which time slot worked best for you?", options: ["Morning", "Afternoon", "Evening", "All day"], required: true },
		{ id: "q5", type: "multiple", question: "What format do you prefer for future events?", options: ["In-person", "Virtual", "Hybrid", "No preference"], required: false },
		{ id: "q6", type: "multiple", question: "How would you rate the event venue?", options: ["Excellent", "Good", "Average", "Poor"], required: true },
		{ id: "q7", type: "multiple", question: "What was your favorite networking activity?", options: ["Coffee breaks", "Lunch sessions", "Evening reception", "Workshop groups"], required: false },
		{ id: "q8", type: "multiple", question: "Which speaker impressed you the most?", options: ["Keynote Speaker 1", "Keynote Speaker 2", "Panel Discussion", "Workshop Leader"], required: true },
		
		// Checkbox questions
		{ id: "q9", type: "checkboxes", question: "Which topics would you like to see in future events? (Select all that apply)", options: ["Technology Trends", "Leadership Development", "Industry Insights", "Career Growth", "Innovation", "Sustainability"], required: false },
		{ id: "q10", type: "checkboxes", question: "What aspects of the event did you enjoy? (Select all that apply)", options: ["Keynote Speakers", "Networking Sessions", "Food & Beverages", "Venue & Atmosphere", "Interactive Activities", "Workshops"], required: true },
		{ id: "q11", type: "checkboxes", question: "Which communication channels do you prefer? (Select all that apply)", options: ["Email", "SMS", "Push Notifications", "In-app Messages", "Social Media"], required: false },
		{ id: "q12", type: "checkboxes", question: "What features would you like to see improved? (Select all that apply)", options: ["Mobile App", "Registration Process", "Schedule Management", "Networking Tools", "Content Access"], required: false },
		{ id: "q13", type: "checkboxes", question: "Which social activities did you participate in? (Select all that apply)", options: ["Welcome Reception", "Coffee Breaks", "Lunch Networking", "Evening Gala", "Post-Event Meetup"], required: false },
		{ id: "q14", type: "checkboxes", question: "What resources would be helpful? (Select all that apply)", options: ["Session Recordings", "Speaker Slides", "Networking Directory", "Event Photos", "Follow-up Materials"], required: false },
		
		// Text questions
		{ id: "q15", type: "text", question: "Any suggestions for improvement?", required: false },
		{ id: "q16", type: "text", question: "What was the most valuable takeaway from this event?", required: true },
		{ id: "q17", type: "text", question: "Describe your overall platform experience", required: false },
		{ id: "q18", type: "text", question: "What topics would you like covered in future events?", required: false },
		{ id: "q19", type: "text", question: "Any specific feedback about the event organization?", required: false },
		{ id: "q20", type: "text", question: "What would make you more likely to attend again?", required: false },
		{ id: "q21", type: "text", question: "Share your thoughts on the event timing and duration", required: false },
		{ id: "q22", type: "text", question: "Any additional comments or feedback?", required: false },
		
		// Rating questions
		{ id: "q23", type: "rating", question: "Rate overall event experience", required: true },
		{ id: "q24", type: "rating", question: "How likely are you to recommend this event to a colleague?", required: true },
		{ id: "q25", type: "rating", question: "Rate the quality of the speakers", required: true },
		{ id: "q26", type: "rating", question: "Rate the event organization and logistics", required: true },
		{ id: "q27", type: "rating", question: "Rate the networking opportunities", required: false },
		{ id: "q28", type: "rating", question: "Rate the food and beverage quality", required: false },
		{ id: "q29", type: "rating", question: "Rate the value for money", required: true },
		{ id: "q30", type: "rating", question: "Rate your overall satisfaction with the event", required: true },
	];
	
	return questions;
};

const SURVEYS: Survey[] = [
	{
		id: "survey1",
		title: "Event Feedback Survey",
		subtitle: "Share your feedback about the event sessions",
		type: "feedback",
		due: "Due 11/30/2025",
		questions: generateMockQuestions(),
	},
	{
		id: "survey2",
		title: "Pre-Event Poll",
		subtitle: "Tell us about your expectations",
		type: "poll",
		due: "Due 11/25/2025",
		questions: [
			{
				id: "q1",
				type: "multiple",
				question: "What do you expect from the event?",
				options: ["Networking", "Learning", "Fun"],
				required: true,
			},
			{
				id: "q2",
				type: "checkboxes",
				question: "Which topics interest you?",
				options: ["Tech", "Marketing", "Leadership"],
				required: false,
			},
		],
	},
	{
		id: "survey3",
		title: "Speaker Rating",
		subtitle: "Evaluate the keynote speakers",
		type: "rating",
		due: "Due 12/01/2025",
		questions: [
			{ id: "q1", type: "rating", question: "Rate speaker A", required: true },
			{ id: "q2", type: "rating", question: "Rate speaker B", required: true },
		],
	},
	{
		id: "survey4",
		title: "Technology Feedback",
		subtitle: "Help us improve the event platform",
		type: "custom",
		questions: [
			{
				id: "q1",
				type: "text",
				question: "Describe your platform experience",
				required: true,
			},
			{
				id: "q2",
				type: "checkboxes",
				question: "Which features did you use?",
				options: ["Agenda", "Networking", "Q&A"],
				required: false,
			},
		],
	},
	{
		id: "survey5",
		title: "Quick Poll",
		subtitle: "Single question poll for fun",
		type: "poll",
		questions: [
			{
				id: "q1",
				type: "multiple",
				question: "Pick your favorite color",
				options: ["Red", "Blue", "Green"],
				required: true,
			},
		],
	},
];

export default function SurveyTab() {
	const [openSurvey, setOpenSurvey] = useState<Survey | null>(null);
	const [responses, setResponses] = useState<Record<string, any>>({});
	const [submitted, setSubmitted] = useState<Record<string, boolean>>({});
	const [currentPage, setCurrentPage] = useState(1);

	const open = (s: Survey) => {
		setOpenSurvey(s);
		setCurrentPage(1);
		setResponses({});
	};
	const close = () => {
		setOpenSurvey(null);
		setCurrentPage(1);
		setResponses({});
	};

	const setAnswer = (id: string, value: any) => {
		setResponses((prev) => ({ ...prev, [id]: value }));
	};

	// Get current question and pagination info
	const currentQuestion = useMemo(() => {
		if (!openSurvey || openSurvey.questions.length === 0) return null;
		return openSurvey.questions[currentPage - 1];
	}, [openSurvey, currentPage]);

	const totalPages = openSurvey?.questions.length || 0;
	const canGoNext = currentPage < totalPages;
	const canGoPrevious = currentPage > 1;

	const goToNext = () => {
		if (canGoNext) {
			setCurrentPage((prev) => prev + 1);
		}
	};

	const goToPrevious = () => {
		if (canGoPrevious) {
			setCurrentPage((prev) => prev - 1);
		}
	};

	const submitSurvey = (survey: Survey) => {
		let valid = true;
		survey.questions.forEach((q) => {
			if (
				q.required &&
				(responses[q.id] === undefined || responses[q.id]?.length === 0)
			) {
				valid = false;
			}
		});

		if (!valid) {
			toast.error("Please answer all required questions.");
			return;
		}

		setSubmitted((prev) => ({ ...prev, [survey.id]: true }));
		toast.success("Survey submitted!");
		close();
	};

	return (
		<div className="p-4">
			<div className="mx-auto">
				<header className="mb-6">
					<h1 className="text-2xl font-bold text-gray-900 dark:text-white">
						Event Surveys
					</h1>
					<p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
						Preview and respond to sample surveys below
					</p>
				</header>

				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{SURVEYS.map((s) => (
						<div
							key={s.id}
							className="relative overflow-hidden rounded-2xl bg-white shadow-md dark:bg-[#090a11]"
						>
							{/* Decorative gradient stripe */}
							<div className="absolute top-0 bottom-0 left-0 w-1 bg-linear-to-b from-[#c999f4] to-[#7b61e6]" />

							<div className="flex h-full flex-col justify-between p-5">
								<div>
									<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
										{s.title}
									</h3>
									{s.subtitle && (
										<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
											{s.subtitle}
										</p>
									)}
									<div className="mt-2 flex flex-wrap gap-2 text-xs">
										<span className="rounded-full bg-gray-100 px-2 py-0.5 text-gray-700 dark:bg-[#070b1c] dark:text-gray-200">
											{s.questions.length} Questions
										</span>
										{s.due && (
											<span className="rounded-full bg-purple-100 px-2 py-0.5 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
												{s.due}
											</span>
										)}
										<span className="rounded-full bg-green-100 px-2 py-0.5 text-green-700 dark:bg-green-900 dark:text-green-300">
											Type: {s.type}
										</span>
									</div>

									<div className="mt-3 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
										{s.questions.length > 0
											? `Preview: ${s.questions[0].question}`
											: "No questions yet"}
									</div>
								</div>

								<div className="mt-4 flex items-center justify-between">
									<button
										className="flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#9133f4] via-[#218ac0] to-[#666fd7] px-2 py-1 font-semibold text-white shadow-md transition hover:opacity-95 focus:ring-4 focus:ring-[#218ac0]"
										onClick={() => open(s)}
									>
										Respond
									</button>
									<div className="text-xs text-gray-500 dark:text-gray-400">
										{submitted[s.id] ? "Submitted" : "Not submitted"}
									</div>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Modal */}
				{openSurvey && (
					<div className="fixed inset-0 z-50 flex items-center justify-center">
						{/* Overlay */}
						<div
							className="absolute inset-0 bg-black/40 dark:bg-black/60"
							onClick={close}
						/>

						{/* Modal container */}
						<div
							className="relative z-10 mx-4 max-h-[85vh] w-full max-w-3xl overflow-auto rounded-xl p-6 shadow-lg 
                    bg-white text-gray-900 
                    dark:bg-[#0b0e15] dark:text-gray-100"
						>
							{/* Header */}
							<div className="mb-4 flex items-start justify-between">
								<h2 className="text-xl font-semibold">{openSurvey.title}</h2>

								<button
									onClick={close}
									className="text-gray-600 hover:text-gray-900 
                     dark:text-gray-300 dark:hover:text-white"
								>
									<X />
								</button>
							</div>

							{/* Pagination Info */}
							<div className="mb-4 flex items-center justify-between">
								<div className="text-sm font-medium text-gray-600 dark:text-gray-400">
									Page {currentPage} of {totalPages}
								</div>
								<div className="flex items-center gap-2">
									<Button
										type="button"
										variant="outline"
										size="sm"
										onClick={goToPrevious}
										disabled={!canGoPrevious}
										className="flex items-center gap-1"
									>
										<ChevronLeft className="h-4 w-4" />
										Previous
									</Button>
									<Button
										type="button"
										variant="outline"
										size="sm"
										onClick={goToNext}
										disabled={!canGoNext}
										className="flex items-center gap-1"
									>
										Next
										<ChevronRight className="h-4 w-4" />
									</Button>
								</div>
							</div>

							{/* Progress Bar */}
							<div className="mb-6">
								<div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
									<div
										className="h-2 rounded-full bg-gradient-to-r from-[#9133f4] via-[#218ac0] to-[#666fd7] transition-all duration-300"
										style={{ width: `${(currentPage / totalPages) * 100}%` }}
									/>
								</div>
							</div>

							{/* Form */}
							<form
								onSubmit={(e) => {
									e.preventDefault();
									if (currentPage < totalPages) {
										goToNext();
									} else {
										submitSurvey(openSurvey);
									}
								}}
								className="space-y-4"
							>
								{currentQuestion && (
									<div
										className="rounded-lg p-4 
                       bg-gray-50 
                       dark:bg-[#10131d]"
									>
										<label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
											{currentQuestion.question}{" "}
											{currentQuestion.required && <span className="text-red-500">*</span>}
										</label>

										{/* Multiple Choice */}
										{currentQuestion.type === "multiple" && currentQuestion.options && (
											<div className="flex flex-col gap-2">
												{currentQuestion.options.map((opt, i) => (
													<label
														key={i}
														className="inline-flex items-center gap-2 cursor-pointer"
													>
														<input
															type="radio"
															name={currentQuestion.id}
															value={opt}
															checked={responses[currentQuestion.id] === opt}
															onChange={() => setAnswer(currentQuestion.id, opt)}
															className="text-blue-600 dark:text-blue-400"
														/>
														<span className="text-sm text-gray-700 dark:text-gray-300">
															{opt}
														</span>
													</label>
												))}
											</div>
										)}

										{/* Checkboxes */}
										{currentQuestion.type === "checkboxes" && currentQuestion.options && (
											<div className="flex flex-col gap-2">
												{currentQuestion.options.map((opt, i) => {
													const values = (responses[currentQuestion.id] as string[]) || [];
													const checked = values.includes(opt);
													return (
														<label
															key={i}
															className="inline-flex items-center gap-2 cursor-pointer"
														>
															<input
																type="checkbox"
																value={opt}
																checked={checked}
																onChange={() => {
																	const next = checked
																		? values.filter((v) => v !== opt)
																		: [...values, opt];
																	setAnswer(currentQuestion.id, next);
																}}
																className="text-blue-600 dark:text-blue-400"
															/>
															<span className="text-sm text-gray-700 dark:text-gray-300">
																{opt}
															</span>
														</label>
													);
												})}
											</div>
										)}

										{/* Text Field */}
										{currentQuestion.type === "text" && (
											<textarea
												value={(responses[currentQuestion.id] as string) || ""}
												onChange={(e) => setAnswer(currentQuestion.id, e.target.value)}
												className="min-h-[90px] w-full rounded-md p-3 text-sm
                           bg-white text-gray-900 
                           dark:bg-[#0d111b] dark:text-gray-100 
                           border border-gray-300 dark:border-gray-700"
												placeholder="Your answer..."
											/>
										)}

										{/* Rating */}
										{currentQuestion.type === "rating" && (
											<div className="flex items-center gap-2">
												{[1, 2, 3, 4, 5].map((n) => (
													<button
														type="button"
														key={n}
														onClick={() => setAnswer(currentQuestion.id, n)}
														className={`rounded-md px-2 py-1 text-sm transition-colors
                    ${
											(responses[currentQuestion.id] as number) >= n
												? "bg-yellow-400 text-black"
												: "bg-gray-200 text-gray-700 dark:bg-[#0f1422] dark:text-gray-300"
										}`}
													>
														★ {n}
													</button>
												))}
											</div>
										)}
									</div>
								)}

								{/* Footer */}
								<div className="flex justify-between items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
									<button
										type="button"
										onClick={close}
										className="rounded px-3 py-1.5 text-sm
                       bg-gray-100 text-gray-800 
                       dark:bg-[#0f1422] dark:text-gray-200"
									>
										Cancel
									</button>

									<button
										type="submit"
										className="flex items-center justify-center gap-3 rounded px-3 py-1.5 text-sm font-semibold text-white 
                       bg-gradient-to-r from-[#9133f4] via-[#218ac0] to-[#666fd7] 
                       hover:opacity-95 focus:ring-4 focus:ring-[#218ac0]"
									>
										{currentPage < totalPages ? "Next" : "Submit Survey"}
									</button>
								</div>
							</form>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
