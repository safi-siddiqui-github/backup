"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
	BsX,
	BsStar,
	BsStarFill,
	BsSquare,
	BsCircle,
	BsRecordCircle,
	BsCheckSquare,
	BsCalendarEvent,
} from "react-icons/bs";
import type { SurveyCardProps } from "../types/types-legacy";

export type SurveyPreviewData = SurveyCardProps;

type SurveyPreviewModalProps = {
	survey: SurveyPreviewData;
	onClose: () => void;
};

// Rating input (interactive)
const StarRatingInput: React.FC<{
	count: number;
	label: string;
	required: boolean;
	value: number;
	onChange: (val: number) => void;
}> = ({ count, label, required, value, onChange }) => (
	<div className="space-y-3">
		<label className="block text-sm font-medium text-gray-800 dark:text-gray-200">
			{label} {required && <span className="text-red-500">*</span>}
		</label>
		<div className="flex gap-2" role="radiogroup" aria-label={label}>
			{[...Array(count)].map((_, i) => {
				const idx = i + 1;
				const filled = idx <= value;
				return (
					<button
						key={idx}
						type="button"
						className="focus:outline-none focus:ring-2 focus:ring-indigo-500/60 rounded"
						onClick={() => onChange(idx)}
						aria-checked={filled}
						role="radio"
					>
						{filled ? (
							<BsStarFill className="w-7 h-7 text-yellow-400" />
						) : (
							<BsStar className="w-7 h-7 text-gray-400 dark:text-gray-600" />
						)}
					</button>
				);
			})}
		</div>
	</div>
);

// Radio group input (interactive)
const RadioGroupInput: React.FC<{
	label: string;
	options: string[];
	required: boolean;
	value: string | undefined;
	onChange: (val: string) => void;
}> = ({ label, options, required, value, onChange }) => (
	<div className="space-y-3">
		<label className="block text-sm font-medium text-gray-800 dark:text-gray-200">
			{label} {required && <span className="text-red-500">*</span>}
		</label>
		<div className="space-y-3" role="radiogroup" aria-label={label}>
			{options.map((option, i) => {
				const checked = value === option;
				return (
					<button
						key={i}
						type="button"
						className="flex items-center focus:outline-none focus:ring-2 focus:ring-indigo-500/60 rounded px-1 py-0.5"
						role="radio"
						aria-checked={checked}
						onClick={() => onChange(option)}
					>
						{checked ? (
							<BsRecordCircle className="w-5 h-5 text-indigo-600" />
						) : (
							<BsCircle className="w-5 h-5 text-gray-500 dark:text-gray-500" />
						)}
						<span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
							{option}
						</span>
					</button>
				);
			})}
		</div>
	</div>
);

// Checkbox group input (interactive)
const CheckboxGroupInput: React.FC<{
	label: string;
	options: string[];
	required: boolean;
	value: string[];
	onChange: (val: string[]) => void;
}> = ({ label, options, required, value, onChange }) => {
	const toggle = (opt: string) => {
		const set = new Set(value);
		if (set.has(opt)) set.delete(opt);
		else set.add(opt);
		onChange(Array.from(set));
	};
	return (
		<div className="space-y-3">
			<label className="block text-sm font-medium text-gray-800 dark:text-gray-200">
				{label} {required && <span className="text-red-500">*</span>}
			</label>
			<div className="space-y-3">
				{options.map((option, i) => {
					const checked = value.includes(option);
					return (
						<button
							key={i}
							type="button"
							className="flex items-center focus:outline-none focus:ring-2 focus:ring-indigo-500/60 rounded px-1 py-0.5"
							role="checkbox"
							aria-checked={checked}
							onClick={() => toggle(option)}
						>
							{checked ? (
								<BsCheckSquare className="w-5 h-5 text-indigo-600" />
							) : (
								<BsSquare className="w-5 h-5 text-gray-500 dark:text-gray-500" />
							)}
							<span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
								{option}
							</span>
						</button>
					);
				})}
			</div>
		</div>
	);
};

// Text area input (interactive)
const TextAreaInput: React.FC<{
	label: string;
	required: boolean;
	value: string;
	onChange: (val: string) => void;
}> = ({ label, required, value, onChange }) => (
	<div className="space-y-3">
		<label
			htmlFor="preview-textarea"
			className="block text-sm font-medium text-gray-800 dark:text-gray-200"
		>
			{label} {required && <span className="text-red-500">*</span>}
		</label>
		<textarea
			id="preview-textarea"
			rows={4}
			className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:text-white dark:bg-[#020617] dark:border-gray-600 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
			placeholder="Enter your response..."
			value={value}
			onChange={(e) => onChange(e.target.value)}
		/>
	</div>
);

// Date input (interactive)
const DateInput: React.FC<{
	label: string;
	required: boolean;
	value: string;
	onChange: (val: string) => void;
}> = ({ label, required, value, onChange }) => (
	<div className="space-y-3">
		<label
			htmlFor="preview-date"
			className="block text-sm font-medium text-gray-800 dark:text-gray-200"
		>
			{label} {required && <span className="text-red-500">*</span>}
		</label>
		<div className="relative">
			<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
				<BsCalendarEvent className="w-5 h-5 text-gray-400" />
			</div>
			<input
				type="date"
				id="preview-date"
				className="w-full px-3 py-2 pl-10 text-gray-900 bg-white border border-gray-300 rounded-lg dark:text-white dark:bg-[#020617] dark:border-gray-600 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
				placeholder="Select a date"
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
		</div>
	</div>
);

export default function SurveyPreviewModal({
	survey,
	onClose,
}: SurveyPreviewModalProps) {
	// Animation visibility state
	const [isVisible, setIsVisible] = useState(false);

	// Refs for accessibility and focus management
	const modalRef = useRef<HTMLDivElement | null>(null);
	const closeBtnRef = useRef<HTMLButtonElement | null>(null);

	// Focus trap for Tab/Shift+Tab within the modal
	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLDivElement>) => {
			if (e.key !== "Tab") return;
			const root = modalRef.current;
			if (!root) return;
			const focusableSelectors = [
				"a[href]",
				"button:not([disabled])",
				"textarea:not([disabled])",
				"input:not([disabled])",
				"select:not([disabled])",
				'[tabindex]:not([tabindex="-1"])',
			];
			const focusable = Array.from(
				root.querySelectorAll<HTMLElement>(focusableSelectors.join(",")),
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

	// Close with exit animation
	const handleRequestClose = useCallback(() => {
		setIsVisible(false);
		// match transition duration below (200ms) before unmounting
		window.setTimeout(() => onClose(), 200);
	}, [onClose]);

	// Mount effects: lock body scroll, focus close button, animate in
	useEffect(() => {
		const prevOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		// small timeout to ensure DOM is ready before focusing
		const t = window.setTimeout(() => {
			setIsVisible(true);
			closeBtnRef.current?.focus();
		}, 0);

		const onEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				handleRequestClose();
			}
		};
		document.addEventListener("keydown", onEsc);

		return () => {
			document.body.style.overflow = prevOverflow;
			document.removeEventListener("keydown", onEsc);
			window.clearTimeout(t);
		};
	}, [handleRequestClose]);
	// Mock data for the questions shown in the image
	const questions = [
		{
			type: "rating",
			label: "How would you rate the overall event experience?",
			required: true,
			count: 5,
		},
		{
			type: "radio",
			label: "Which aspect of the event did you enjoy most?",
			required: true,
			options: [
				"Keynote Speakers",
				"Networking Sessions",
				"Food & Beverages",
				"Venue & Atmosphere",
				"Interactive Activities",
			],
		},
		{
			type: "checkbox",
			label:
				"What topics would you like to see in future events? (Select all that apply)",
			required: false,
			options: [
				"Technology Trends",
				"Leadership Development",
				"Industry Insights",
				"Career Growth",
				"Innovation",
				"Sustainability",
			],
		},
		{
			type: "textarea",
			label: "What could we have done better? Please share your suggestions.",
			required: false,
		},
		{
			type: "rating",
			label: "How likely are you to recommend this event to a colleague?",
			required: true,
			count: 10,
		},
		{
			type: "date",
			label: "When would be the best time for our next event?",
			required: false,
		},
	];

	// Local interactive responses state
	type AnswerValue = number | string | string | string[];
	const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
	const setAnswer = (index: number, value: AnswerValue) =>
		setAnswers((prev) => ({ ...prev, [index]: value }));

	return (
		<div
			className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-200 ${
				isVisible ? "opacity-100" : "opacity-0"
			} bg-black/70 backdrop-blur-md`}
			onClick={handleRequestClose}
			role="dialog"
			aria-modal="true"
			aria-labelledby="survey-preview-title"
		>
			<div
				ref={modalRef}
				className={`relative w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden rounded-xl shadow-2xl border border-gray-200 dark:border-slate-600 !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617] transition-all duration-200 ${
					isVisible
						? "opacity-100 translate-y-0 scale-100"
						: "opacity-0 translate-y-2 scale-95"
				}`}
				onClick={(e) => e.stopPropagation()} // Prevent closing modal on content click
				onKeyDown={handleKeyDown}
				tabIndex={-1}
			>
				{/* Modal Header */}
				<div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-slate-600 !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617]">
					<h2
						id="survey-preview-title"
						className="text-xl font-semibold text-gray-900 dark:text-slate-200"
					>
						Survey Preview
					</h2>
					<button
						ref={closeBtnRef}
						onClick={handleRequestClose}
						className="p-2 text-gray-600 transition-colors rounded-full hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
						aria-label="Close modal"
					>
						<BsX className="w-6 h-6" />
					</button>
				</div>

				{/* Modal Body (Scrolling Survey Form) */}
				<div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
					{/* Survey Header */}
					<div>
						<h3 className="text-2xl font-semibold text-gray-900 dark:text-slate-200">
							{survey.title}
						</h3>
						<p className="mt-2 text-sm leading-6 text-gray-600 dark:text-slate-400">
							{survey.description}
						</p>
					</div>

					{/* Render Questions */}
					<div className="space-y-4">
						{questions.map((q, index) => (
							<div
								key={index}
								className="flex items-start p-4 gap-4 rounded-xl border border-gray-200 dark:border-slate-600 !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617] shadow-sm"
							>
								<span className="flex-shrink-0 mt-1 text-sm font-semibold text-gray-500 dark:text-slate-400">
									{index + 1}
								</span>
								<div className="flex-1">
									{q.type === "rating" && (
										<StarRatingInput
											label={q.label}
											required={q.required}
											count={q.count || 5}
											value={Number(answers[index] ?? 0)}
											onChange={(v) => setAnswer(index, v)}
										/>
									)}
									{q.type === "radio" && (
										<RadioGroupInput
											label={q.label}
											required={q.required}
											options={q.options || []}
											value={(answers[index] as string) ?? undefined}
											onChange={(v) => setAnswer(index, v)}
										/>
									)}
									{q.type === "checkbox" && (
										<CheckboxGroupInput
											label={q.label}
											required={q.required}
											options={q.options || []}
											value={(answers[index] as string[]) ?? []}
											onChange={(v) => setAnswer(index, v)}
										/>
									)}
									{q.type === "textarea" && (
										<TextAreaInput
											label={q.label}
											required={q.required}
											value={(answers[index] as string) ?? ""}
											onChange={(v) => setAnswer(index, v)}
										/>
									)}
									{q.type === "date" && (
										<DateInput
											label={q.label}
											required={q.required}
											value={(answers[index] as string) ?? ""}
											onChange={(v) => setAnswer(index, v)}
										/>
									)}
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Modal Footer */}
				<div className="flex items-center justify-end p-5 bg-gray-50 dark:bg-[#020617]/70 border-t border-gray-200 dark:border-slate-600 rounded-b-xl">
					<button
						type="button"
						className="w-full px-5 py-3 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-md hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 dark:focus:ring-offset-gray-900 opacity-60 cursor-not-allowed"
						disabled
					>
						Submit Survey
					</button>
				</div>
			</div>
		</div>
	);
}
