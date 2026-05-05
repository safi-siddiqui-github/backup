"use client";

import { ReactNode } from "react";

export type QuestionType = "multiple-choice" | "checkboxes" | "text" | "rating";

export type SurveyQuestionType =
	| "Rating"
	| "MultipleChoice"
	| "Checkbox"
	| "Text"
	| "Date";

export type Priority = "low" | "medium" | "high";

export type Question = {
	id: string;
	type: QuestionType;
	title: string;
	required: boolean;
	options?: string[];
	minRating?: number;
	maxRating?: number;
};

export type QuestionTypeOption = {
	type: QuestionType;
	label: string;
	description: string;
	icon: ReactNode;
};

export type StatCardProps = {
	icon: ReactNode;
	value: string;
	title: string;
	color?: string;
};

export type SurveyCardProps = {
	title: string;
	description: string;
	created: string;
	scheduleTime?: string;
	sendTo?: string[];
	lastSent?: string;
	questions: number;
	responses: number;
	completed: number;
	isExpandedDefault?: boolean;
	defaultToggleOn?: boolean;
	status: "Active" | "Inactive";
};

export type ToggleSwitchProps = {
	defaultOn?: boolean;
	onToggle?: (isOn: boolean) => void;
	disabled?: boolean;
};

export type Respondent = {
	id?: string;
	name: string;
	date?: string;
	status?: "Completed" | "Incomplete";
	initial?: string;
	initials?: string;
	bg?: string;
	avatarColor?: string;
};

export type Survey = {
	id: number;
	name: string;
};

export type BaseResponse = {
	id: string;
	respondent: Respondent;
	timestamp: string;
};

export type RatingResponse = BaseResponse & {
	rating: number;
};

export type ChoiceResponse = BaseResponse & {
	answer: string;
};

export type CheckboxResponse = BaseResponse & {
	answers: string[];
};

export type TextResponse = BaseResponse & {
	answer: string;
};

export type DateResponse = BaseResponse & {
	answer: string;
};

export type AnyResponse =
	| RatingResponse
	| ChoiceResponse
	| CheckboxResponse
	| TextResponse
	| DateResponse;

export type BaseQuestion = {
	id: string;
	text: string;
	type: SurveyQuestionType;
	isRequired: boolean;
	totalResponses: number;
};

export type RatingQuestion = BaseQuestion & {
	type: "Rating";
	maxRating: 5 | 10;
	stats: {
		averageRating: number;
		totalRatings: number;
	};
	responses: RatingResponse[];
};

export type MultipleChoiceQuestion = BaseQuestion & {
	type: "MultipleChoice";
	options: string[];
	stats: {
		distribution: {
			option: string;
			count: number;
			percent: number;
		}[];
	};
	responses: ChoiceResponse[];
};

export type CheckboxQuestion = BaseQuestion & {
	type: "Checkbox";
	options: string[];
	responses: CheckboxResponse[];
};

export type TextQuestion = BaseQuestion & {
	type: "Text";
	stats: {
		totalResponses: number;
	};
	responses: TextResponse[];
};

export type DateQuestion = BaseQuestion & {
	type: "Date";
	stats: {
		totalResponses: number;
	};
	responses: DateResponse[];
};

export type SurveyQuestion =
	| RatingQuestion
	| MultipleChoiceQuestion
	| CheckboxQuestion
	| TextQuestion
	| DateQuestion;

export type SurveyResultsData = {
	id: string;
	title: string;
	description: string;
	status: "Active" | "Inactive";
	stats: {
		totalResponses: number;
		completionRate: number;
		questions: number;
		completed: number;
	};
	questions: SurveyQuestion[];
};

export type SurveyPreviewData = SurveyCardProps;

export type ResponseCollectionSectionProps = {
	anonymize: boolean;
	onAnonymizeChange: (value: boolean) => void;
};

export type QuestionCardProps = {
	question: Question;
	index: number;
	onUpdate: (id: string, updates: Partial<Question>) => void;
	onDelete: (id: string) => void;
	onAddOption: (id: string) => void;
	onUpdateOption: (id: string, optionIndex: number, value: string) => void;
	onDeleteOption: (id: string, optionIndex: number) => void;
	inputRef?: ((el: HTMLInputElement | null) => void) | undefined;
};

export type LargeQRModalProps = {
	isOpen: boolean;
	onClose: () => void;
	url: string;
};

export type QuestionTypeDropdownProps = {
	isOpen: boolean;
	onToggle: () => void;
	onSelectType: (type: QuestionType) => void;
	floating?: boolean;
};

export type SwitchProps = {
	checked: boolean;
	onChange: (checked: boolean) => void;
	label?: string;
};

export type SurveyLinkInputProps = {
	link: string;
};

export type SurveyPreviewModalProps = {
	survey: SurveyPreviewData;
	onClose: () => void;
};

export type ResultsSubmissionsSectionProps = {
	showResults: boolean;
	multipleSubmissions: boolean;
	onShowResultsChange: (value: boolean) => void;
	onMultipleSubmissionsChange: (value: boolean) => void;
};

export type ShareActionButtonsProps = {
	surveyUrl: string;
};

export type QRCodeSectionProps = {
	url: string;
};

export type CreateSurveyModalProps = {
	isOpen: boolean;
	onClose: () => void;
	initialSurvey?: SurveyCardProps;
};

export type QuestionsSectionProps = {
	questions: Question[];
	showDropdown: boolean;
	questionsError?: string;
	onToggleDropdown: () => void;
	onAddQuestion: (type: QuestionType) => void;
	onUpdateQuestion: (id: string, updates: Partial<Question>) => void;
	onDeleteQuestion: (id: string) => void;
	onAddOption: (id: string) => void;
	onUpdateOption: (id: string, optionIndex: number, value: string) => void;
	onDeleteOption: (id: string, optionIndex: number) => void;
	hideAddButton?: boolean;
	questionRefs?: React.MutableRefObject<Array<HTMLInputElement | null>>;
};

export type DeleteSurveyModalProps = {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	surveyTitle: string;
};

export type SurveySelectorProps = {
	surveys: Survey[];
	selectedId: number;
	onSelect: (id: number) => void;
};

export type SurveyDetailsSectionProps = {
	title: string;
	description: string;
	scheduleTime?: string;
	sendTo?: string[];
	onTitleChange: (value: string) => void;
	onDescriptionChange: (value: string) => void;
	onScheduleTimeChange?: (value: string) => void;
	onSendToChange?: (value: string[]) => void;
	titleError?: string;
};

export type ShareSurveyPreviewModalProps = {
	isOpen: boolean;
	onClose: () => void;
	survey: SurveyCardProps;
};

export type SurveyEditModalProps = {
	onClose: () => void;
};

export type SurveyResultsPageProps = {
	data: SurveyResultsData;
};

export const MOCK_SURVEYS: Survey[] = [
	{ id: 1, name: "General Event Feedback" },
	{ id: 2, name: "Food & Catering Feedback" },
	{ id: 3, name: "Speaker Session Poll" },
];
