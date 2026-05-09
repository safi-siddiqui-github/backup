"use client";
import { useEffect, useRef, useState } from "react";
import { BsX } from "react-icons/bs";
import { toast } from "sonner";
import SurveyDetailsSection from "./SurveyDetailsSection";
import ResponseCollectionSection from "./ResponseCollectionSection";
import ResultsSubmissionsSection from "./ResultsSubmissionsSection";
import QuestionsSection from "./QuestionsSection";
import { CreateSurveyModalProps, Question } from "../types/survey-types";

export default function CreateSurveyModal({
	isOpen,
	onClose,
	initialSurvey,
}: CreateSurveyModalProps) {
	// Initialize with existing survey data if editing
	const [title, setTitle] = useState(initialSurvey?.title || "");
	const [description, setDescription] = useState(
		initialSurvey?.description || "",
	);
	const [scheduleTime, setScheduleTime] = useState<string>("");
	const [sendTo, setSendTo] = useState<string[]>(initialSurvey?.sendTo || []);

	const [anonymize, setAnonymize] = useState(false);
	const [showResults, setShowResults] = useState(false);
	const [multipleSubmissions, setMultipleSubmissions] = useState(false);

	// Initialize questions - if editing, create mock questions based on question count
	const initialQuestions: Question[] = initialSurvey
		? Array.from({ length: initialSurvey.questions }, (_, i) => ({
				id: `q-${i + 1}`,
				type: "multiple-choice" as Question["type"],
				title: `Question ${i + 1}`,
				required: false,
				options: ["Option 1", "Option 2"],
			}))
		: [];

	const [questions, setQuestions] = useState<Question[]>(initialQuestions);
	const [showQuestionDropdown, setShowQuestionDropdown] = useState(false);
	const questionsSectionRef = useRef<HTMLDivElement | null>(null);
	const questionRefs = useRef<Array<HTMLInputElement | null>>([]);

	const [errors, setErrors] = useState<{ title?: string; questions?: string }>(
		{},
	);

	// Reset form when modal opens/closes or initialSurvey changes
	useEffect(() => {
		if (isOpen) {
			if (initialSurvey) {
				setTitle(initialSurvey.title);
				setDescription(initialSurvey.description);
				setQuestions(
					Array.from({ length: initialSurvey.questions }, (_, i) => ({
						id: `q-${i + 1}`,
						type: "multiple-choice" as Question["type"],
						title: `Question ${i + 1}`,
						required: false,
						options: ["Option 1", "Option 2"],
					})),
				);
			} else {
				setTitle("");
				setDescription("");
				setQuestions([]);
			}
			setErrors({});
		}
	}, [isOpen, initialSurvey]);

	const addQuestion = (type: Question["type"]) => {
		const newQuestion: Question = {
			id: `q-${Date.now()}`,
			type,
			title: "",
			required: false,
			options:
				type === "multiple-choice" || type === "checkboxes"
					? ["Option 1", "Option 2"]
					: undefined,
			minRating: type === "rating" ? 1 : undefined,
			maxRating: type === "rating" ? 5 : undefined,
		};
		setQuestions((prev) => {
			const updated = [...prev, newQuestion];
			setTimeout(() => {
				const idx = updated.length - 1;
				questionRefs.current[idx]?.focus();
			}, 100);
			return updated;
		});
		setShowQuestionDropdown(false);
	};

	const updateQuestion = (id: string, updates: Partial<Question>) => {
		setQuestions(
			questions.map((q) => (q.id === id ? { ...q, ...updates } : q)),
		);
	};

	const deleteQuestion = (id: string) => {
		setQuestions(questions.filter((q) => q.id !== id));
	};

	const addOption = (questionId: string) => {
		const question = questions.find((q) => q.id === questionId);
		if (question && question.options) {
			updateQuestion(questionId, {
				options: [...question.options, `Option ${question.options.length + 1}`],
			});
		}
	};

	const updateOption = (
		questionId: string,
		optionIndex: number,
		value: string,
	) => {
		const question = questions.find((q) => q.id === questionId);
		if (question && question.options) {
			const newOptions = [...question.options];
			newOptions[optionIndex] = value;
			updateQuestion(questionId, { options: newOptions });
		}
	};

	const deleteOption = (questionId: string, optionIndex: number) => {
		const question = questions.find((q) => q.id === questionId);
		if (question && question.options && question.options.length > 2) {
			const newOptions = question.options.filter(
				(_opt: string, i: number) => i !== optionIndex,
			);
			updateQuestion(questionId, { options: newOptions });
		}
	};

	const validateForm = (): boolean => {
		const newErrors: { title?: string; questions?: string } = {};

		if (!title.trim()) {
			newErrors.title = "Survey title is required";
		}

		if (questions.length === 0) {
			newErrors.questions = "Add at least one question";
		}

		const hasEmptyQuestions = questions.some((q) => !q.title.trim());
		if (hasEmptyQuestions) {
			newErrors.questions = "All questions must have a title";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleCreate = () => {
		if (validateForm()) {
			// Here you would typically save the survey data
			if (initialSurvey) {
				toast.success("Survey updated successfully!", {
					description: `"${title}" has been updated`,
					duration: 3000,
				});
			} else {
				toast.success("Survey created successfully!", {
					description: `"${title}" is now ready to share`,
					duration: 3000,
				});
			}
			onClose();
			// Reset form
			setTitle("");
			setDescription("");
			setQuestions([]);
			setErrors({});
			setShowQuestionDropdown(false);
		} else {
			toast.error("Please fix the errors", {
				description: "Check the form for missing information",
				duration: 3000,
			});
		}
	};

	// Ensure the question type dropdown is closed whenever the modal is closed
	useEffect(() => {
		if (!isOpen) {
			setShowQuestionDropdown(false);
		}
	}, [isOpen]);

	if (!isOpen) return null;

	return (
		// Modal Overlay
		<div
			onClick={onClose}
			className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
		>
			{/* Modal Content */}
			<div
				onClick={(e) => e.stopPropagation()}
				className="relative !bg-white dark:!bg-slate-800/95 backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:rgb(30_41_59/0.95)] rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col border border-gray-200 dark:border-slate-600 animate-in zoom-in-95 duration-200"
			>
				{/* Modal Header */}
				<div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 dark:border-slate-600 bg-indigo-50 dark:bg-indigo-950/50 rounded-t-xl">
					<div>
						<h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-slate-200">
							{initialSurvey ? "Edit Survey" : "Create New Survey"}
						</h2>
						<p className="text-sm text-gray-600 dark:text-slate-400 mt-1">
							{initialSurvey
								? "Update your survey questions and settings"
								: "Build your survey with custom questions"}
						</p>
					</div>
					<button
						onClick={onClose}
						className="text-gray-400 hover:text-gray-600 dark:hover:text-slate-200 transition-colors cursor-pointer p-1 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-lg"
						aria-label="Close modal"
					>
						<BsX size={28} />
					</button>
				</div>

				<div className="p-4 sm:p-6 space-y-6 overflow-y-auto">
					<SurveyDetailsSection
						title={title}
						description={description}
						scheduleTime={scheduleTime}
						sendTo={sendTo}
						onTitleChange={setTitle}
						onDescriptionChange={setDescription}
						onScheduleTimeChange={setScheduleTime}
						onSendToChange={setSendTo}
						titleError={errors.title}
					/>

					{/* Response Collection */}
					<ResponseCollectionSection
						anonymize={anonymize}
						onAnonymizeChange={setAnonymize}
					/>

					<ResultsSubmissionsSection
						showResults={showResults}
						multipleSubmissions={multipleSubmissions}
						onShowResultsChange={setShowResults}
						onMultipleSubmissionsChange={setMultipleSubmissions}
					/>

					<div ref={questionsSectionRef}>
						<QuestionsSection
							questions={questions}
							showDropdown={showQuestionDropdown}
							questionsError={errors.questions}
							onToggleDropdown={() =>
								setShowQuestionDropdown(!showQuestionDropdown)
							}
							onAddQuestion={addQuestion}
							onUpdateQuestion={updateQuestion}
							onDeleteQuestion={deleteQuestion}
							onAddOption={addOption}
							onUpdateOption={updateOption}
							onDeleteOption={deleteOption}
							questionRefs={questionRefs}
						/>
					</div>
				</div>

				<div className="flex flex-col sm:flex-row justify-between items-center gap-3 p-4 sm:p-6 bg-gray-50 dark:bg-[#020617]/70 border-t border-gray-200 dark:border-slate-600 rounded-b-xl">
					<div className="text-sm text-gray-600 dark:text-slate-400 hidden sm:block">
						{questions.length}{" "}
						{questions.length === 1 ? "question" : "questions"} added
					</div>
					<div className="flex gap-3 w-full sm:w-auto">
						<button
							onClick={onClose}
							className="flex-1 sm:flex-none px-6 py-3 text-sm font-semibold text-gray-700 dark:text-slate-300 !bg-white dark:!bg-[#020617] border-2 border-gray-300 dark:border-slate-600 rounded-xl shadow-sm hover:bg-gray-50 dark:hover:bg-[#020617] hover:border-gray-400 dark:hover:border-slate-500 transition-all duration-200 cursor-pointer [background-color:white] dark:[background-color:#020617]"
						>
							Cancel
						</button>
						<button
							onClick={handleCreate}
							className="flex-1 sm:flex-none px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
						>
							{initialSurvey ? "Save Changes" : "Create Survey"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
