"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Mail, Eye } from "lucide-react";
import { z } from "zod";
import { cn } from "@/lib/utils";

// Validation schema
const emailContentSchema = z.object({
	subjectLine: z
		.string()
		.min(1, "Subject line is required")
		.max(100, "Subject line must be 100 characters or less"),
	bodyContent: z
		.string()
		.min(1, "Body content is required")
		.max(5000, "Body content must be 5000 characters or less"),
	callToActionText: z
		.string()
		.min(1, "Call to action text is required")
		.max(50, "Call to action text must be 50 characters or less"),
	buttonUrl: z
		.string()
		.min(1, "Button URL is required")
		.url("Please enter a valid URL"),
});

export type EmailContentData = z.infer<typeof emailContentSchema>;

interface EmailContentFormProps {
	content: EmailContentData;
	onUpdate: (content: EmailContentData) => void;
}

const MAX_SUBJECT_LENGTH = 100;
const MAX_BODY_LENGTH = 5000;
const MAX_CTA_LENGTH = 50;

export default function EmailContentForm({
	content,
	onUpdate,
}: EmailContentFormProps) {
	const [errors, setErrors] = useState<
		Partial<Record<keyof EmailContentData, string>>
	>({});
	const [touched, setTouched] = useState<
		Partial<Record<keyof EmailContentData, boolean>>
	>({});

	// Validate a single field using Zod
	const validateField = (
		field: keyof EmailContentData,
		value: any,
	): string | undefined => {
		const fieldSchema = emailContentSchema.shape[field];
		if (!fieldSchema) return undefined;

		const result = fieldSchema.safeParse(value);
		if (!result.success) {
			return result.error.issues[0]?.message || "Invalid value";
		}
		return undefined;
	};

	const handleSubjectLineChange = (value: string) => {
		const newContent = { ...content, subjectLine: value };
		onUpdate(newContent);

		if (touched.subjectLine) {
			const error = validateField("subjectLine", value);
			setErrors((prev) => ({ ...prev, subjectLine: error }));
		}
	};

	const handleBodyContentChange = (value: string) => {
		const newContent = { ...content, bodyContent: value };
		onUpdate(newContent);

		if (touched.bodyContent) {
			const error = validateField("bodyContent", value);
			setErrors((prev) => ({ ...prev, bodyContent: error }));
		}
	};

	const handleCallToActionTextChange = (value: string) => {
		const newContent = { ...content, callToActionText: value };
		onUpdate(newContent);

		if (touched.callToActionText) {
			const error = validateField("callToActionText", value);
			setErrors((prev) => ({ ...prev, callToActionText: error }));
		}
	};

	const handleButtonUrlChange = (value: string) => {
		const newContent = { ...content, buttonUrl: value };
		onUpdate(newContent);

		if (touched.buttonUrl) {
			const error = validateField("buttonUrl", value);
			setErrors((prev) => ({ ...prev, buttonUrl: error }));
		}
	};

	// Validate fields when they are touched or when content changes
	useEffect(() => {
		if (touched.subjectLine) {
			const error = validateField("subjectLine", content.subjectLine);
			setErrors((prev) => ({ ...prev, subjectLine: error }));
		}
		if (touched.bodyContent) {
			const error = validateField("bodyContent", content.bodyContent);
			setErrors((prev) => ({ ...prev, bodyContent: error }));
		}
		if (touched.callToActionText) {
			const error = validateField("callToActionText", content.callToActionText);
			setErrors((prev) => ({ ...prev, callToActionText: error }));
		}
		if (touched.buttonUrl) {
			const error = validateField("buttonUrl", content.buttonUrl);
			setErrors((prev) => ({ ...prev, buttonUrl: error }));
		}
	}, [
		content.subjectLine,
		content.bodyContent,
		content.callToActionText,
		content.buttonUrl,
		touched.subjectLine,
		touched.bodyContent,
		touched.callToActionText,
		touched.buttonUrl,
	]);

	return (
		<div className="flex flex-col gap-6 pt-4">
			{/* Form Card */}
			<div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6 space-y-6">
				<div className="flex items-center gap-2">
					<Mail className="h-4 w-4 text-muted-foreground" />
					<h3 className="text-sm font-semibold">Email Content</h3>
				</div>

				{/* Subject Line */}
				<div className="space-y-2">
					<Label htmlFor="subjectLine" className="text-sm font-semibold">
						Subject Line <span className="text-red-500">*</span>
					</Label>
					<Input
						id="subjectLine"
						placeholder="Enter email subject line"
						value={content.subjectLine || ""}
						onChange={(e) => handleSubjectLineChange(e.target.value)}
						onBlur={() => {
							setTouched((prev) => ({ ...prev, subjectLine: true }));
							const error = validateField("subjectLine", content.subjectLine);
							setErrors((prev) => ({ ...prev, subjectLine: error }));
						}}
						className={cn(
							touched.subjectLine &&
								errors.subjectLine &&
								"border-red-500 focus-visible:ring-red-500",
						)}
					/>
					<div className="flex justify-between items-center">
						{touched.subjectLine && errors.subjectLine && (
							<p className="text-xs text-red-500">{errors.subjectLine}</p>
						)}
						<p
							className={cn(
								"text-xs ml-auto",
								(content.subjectLine?.length || 0) > MAX_SUBJECT_LENGTH
									? "text-red-500"
									: "text-muted-foreground",
							)}
						>
							{content.subjectLine?.length || 0}/{MAX_SUBJECT_LENGTH} characters
						</p>
					</div>
				</div>

				{/* Body Content */}
				<div className="space-y-2">
					<Label htmlFor="bodyContent" className="text-sm font-semibold">
						Body Content <span className="text-red-500">*</span>
					</Label>
					<Textarea
						id="bodyContent"
						placeholder="Enter email body content..."
						value={content.bodyContent || ""}
						onChange={(e) => handleBodyContentChange(e.target.value)}
						onBlur={() => {
							setTouched((prev) => ({ ...prev, bodyContent: true }));
							const error = validateField("bodyContent", content.bodyContent);
							setErrors((prev) => ({ ...prev, bodyContent: error }));
						}}
						className={cn(
							"min-h-[200px] resize-y",
							touched.bodyContent &&
								errors.bodyContent &&
								"border-red-500 focus-visible:ring-red-500",
						)}
					/>
					<div className="flex justify-between items-center">
						{touched.bodyContent && errors.bodyContent && (
							<p className="text-xs text-red-500">{errors.bodyContent}</p>
						)}
						<p
							className={cn(
								"text-xs ml-auto",
								(content.bodyContent?.length || 0) > MAX_BODY_LENGTH
									? "text-red-500"
									: "text-muted-foreground",
							)}
						>
							{content.bodyContent?.length || 0}/{MAX_BODY_LENGTH} characters
						</p>
					</div>
				</div>

				{/* Call to Action Text */}
				<div className="space-y-2">
					<Label htmlFor="callToActionText" className="text-sm font-semibold">
						Call to Action Text <span className="text-red-500">*</span>
					</Label>
					<Input
						id="callToActionText"
						placeholder="e.g., RSVP Now, Learn More, Buy Tickets"
						value={content.callToActionText || ""}
						onChange={(e) => handleCallToActionTextChange(e.target.value)}
						onBlur={() => {
							setTouched((prev) => ({ ...prev, callToActionText: true }));
							const error = validateField(
								"callToActionText",
								content.callToActionText,
							);
							setErrors((prev) => ({ ...prev, callToActionText: error }));
						}}
						className={cn(
							touched.callToActionText &&
								errors.callToActionText &&
								"border-red-500 focus-visible:ring-red-500",
						)}
					/>
					<div className="flex justify-between items-center">
						{touched.callToActionText && errors.callToActionText && (
							<p className="text-xs text-red-500">{errors.callToActionText}</p>
						)}
						<p
							className={cn(
								"text-xs ml-auto",
								(content.callToActionText?.length || 0) > MAX_CTA_LENGTH
									? "text-red-500"
									: "text-muted-foreground",
							)}
						>
							{content.callToActionText?.length || 0}/{MAX_CTA_LENGTH}{" "}
							characters
						</p>
					</div>
				</div>

				{/* Button URL */}
				<div className="space-y-2">
					<Label htmlFor="buttonUrl" className="text-sm font-semibold">
						Button URL <span className="text-red-500">*</span>
					</Label>
					<Input
						id="buttonUrl"
						type="url"
						placeholder="https://your-event-page.com"
						value={content.buttonUrl || ""}
						onChange={(e) => handleButtonUrlChange(e.target.value)}
						onBlur={() => {
							setTouched((prev) => ({ ...prev, buttonUrl: true }));
							const error = validateField("buttonUrl", content.buttonUrl);
							setErrors((prev) => ({ ...prev, buttonUrl: error }));
						}}
						className={cn(
							touched.buttonUrl &&
								errors.buttonUrl &&
								"border-red-500 focus-visible:ring-red-500",
						)}
					/>
					{touched.buttonUrl && errors.buttonUrl && (
						<p className="text-xs text-red-500">{errors.buttonUrl}</p>
					)}
				</div>
			</div>

			{/* Preview Card */}
			<div className="bg-[#F3F4F6] dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6 space-y-4">
				<div className="flex items-center gap-2">
					<Eye className="h-4 w-4 text-muted-foreground" />
					<Label className="text-sm font-semibold">Preview</Label>
				</div>
				<div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700 p-6 space-y-4">
					{/* Email Header */}
					<div className="space-y-2 border-b border-gray-200 dark:border-slate-700 pb-4">
						<div className="flex items-center justify-between">
							<p className="text-sm font-semibold">From: Your Event</p>
							<p className="text-xs text-muted-foreground">Just now</p>
						</div>
						<p className="text-sm font-semibold">
							Subject: {content.subjectLine || "Email subject line"}
						</p>
					</div>

					{/* Email Body */}
					<div className="space-y-4">
						<div className="text-sm whitespace-pre-wrap text-gray-700 dark:text-gray-300 min-h-[100px]">
							{content.bodyContent || "Email body content will appear here..."}
						</div>

						{/* Call to Action Button */}
						{content.callToActionText && content.buttonUrl && (
							<div className="pt-4">
								<a
									href={content.buttonUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-semibold transition-colors"
								>
									{content.callToActionText}
								</a>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
