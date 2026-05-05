"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Image, Upload, X } from "lucide-react";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { createMediaPreviews, MediaPreview } from "../../utils/mediaUtils";

// Validation schema
const socialMediaPostSchema = z.object({
	postContent: z
		.string()
		.max(3000, "Post content must be 3000 characters or less"),
	hashtags: z.string().optional(),
	mentions: z.string().optional(),
	callToActionLink: z
		.string()
		.url("Please enter a valid URL")
		.optional()
		.or(z.literal("")),
	media: z.array(z.any()).optional(), // Array of files handled separately
});

export type SocialMediaPostData = z.infer<typeof socialMediaPostSchema>;

interface SocialMediaPostFormProps {
	content: SocialMediaPostData;
	onUpdate: (content: SocialMediaPostData) => void;
	platformName: string;
}

export default function SocialMediaPostForm({
	content,
	onUpdate,
	platformName,
}: SocialMediaPostFormProps) {
	const [errors, setErrors] = useState<
		Partial<Record<keyof SocialMediaPostData, string>>
	>({});
	const [mediaPreviews, setMediaPreviews] = useState<MediaPreview[]>([]);

	const MAX_CONTENT_LENGTH = 3000;

	const validateHashtags = (value: string): boolean => {
		if (!value.trim()) return true; // Optional field
		const words = value.trim().split(/\s+/);
		return words.every((word) => word.startsWith("#"));
	};

	const validateMentions = (value: string): boolean => {
		if (!value.trim()) return true; // Optional field
		const words = value.trim().split(/\s+/);
		return words.every((word) => word.startsWith("@"));
	};

	const handlePostContentChange = (value: string) => {
		const newContent = { ...content, postContent: value };
		onUpdate(newContent);

		// Validate
		try {
			socialMediaPostSchema.parse(newContent);
			setErrors((prev) => ({ ...prev, postContent: undefined }));
		} catch (error) {
			if (error instanceof z.ZodError) {
				const postContentError = error.issues.find(
					(issue) => issue.path[0] === "postContent",
				);
				if (postContentError) {
					setErrors((prev) => ({
						...prev,
						postContent: postContentError.message,
					}));
				}
			}
		}
	};

	const handleHashtagsChange = (value: string) => {
		const newContent = { ...content, hashtags: value };
		onUpdate(newContent);

		if (!validateHashtags(value)) {
			setErrors((prev) => ({
				...prev,
				hashtags: "Each hashtag must start with #",
			}));
		} else {
			setErrors((prev) => ({ ...prev, hashtags: undefined }));
		}
	};

	const handleMentionsChange = (value: string) => {
		const newContent = { ...content, mentions: value };
		onUpdate(newContent);

		if (!validateMentions(value)) {
			setErrors((prev) => ({
				...prev,
				mentions: "Each mention must start with @",
			}));
		} else {
			setErrors((prev) => ({ ...prev, mentions: undefined }));
		}
	};

	const handleCallToActionChange = (value: string) => {
		const newContent = { ...content, callToActionLink: value };
		onUpdate(newContent);

		if (value && !z.string().url().safeParse(value).success) {
			setErrors((prev) => ({
				...prev,
				callToActionLink: "Please enter a valid URL",
			}));
		} else {
			setErrors((prev) => ({ ...prev, callToActionLink: undefined }));
		}
	};

	// Load previews from content.media on mount or when content changes
	useEffect(() => {
		if (
			content.media &&
			Array.isArray(content.media) &&
			content.media.length > 0
		) {
			const files = content.media as File[];
			createMediaPreviews(files)
				.then(setMediaPreviews)
				.catch((error) => {
					console.error("Error creating media previews:", error);
				});
		} else {
			setMediaPreviews([]);
		}
	}, [content.media]);

	const handleMediaChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || []);
		if (files.length > 0) {
			const existingFiles = (content.media as File[]) || [];
			const newFiles = [...existingFiles, ...files];
			const newContent = { ...content, media: newFiles };
			onUpdate(newContent);

			// Create previews for new files only
			try {
				const newPreviews = await createMediaPreviews(files);
				setMediaPreviews((prev) => [...prev, ...newPreviews]);
			} catch (error) {
				console.error("Error creating media previews:", error);
			}
		}
	};

	const handleRemoveMedia = (indexToRemove: number) => {
		const currentFiles = (content.media as File[]) || [];
		const newFiles = currentFiles.filter((_, index) => index !== indexToRemove);
		const newContent = {
			...content,
			media: newFiles.length > 0 ? newFiles : undefined,
		};
		onUpdate(newContent);
		setMediaPreviews((prev) =>
			prev.filter((_, index) => index !== indexToRemove),
		);
	};

	return (
		<div className="flex flex-col gap-6 pt-4">
			{/* Post Content */}
			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<Label htmlFor="post-content" className="text-sm font-semibold">
						Post Content
					</Label>
					<span className="text-xs text-muted-foreground">
						{(content.postContent || "").length}/{MAX_CONTENT_LENGTH}
					</span>
				</div>
				<Textarea
					id="post-content"
					placeholder="Write your social media post..."
					value={content.postContent || ""}
					onChange={(e) => handlePostContentChange(e.target.value)}
					rows={6}
					className={cn(
						"resize-none",
						errors.postContent && "border-red-500 focus:border-red-500",
					)}
				/>
				{errors.postContent && (
					<p className="text-xs text-red-500">{errors.postContent}</p>
				)}
				<p className="text-xs text-muted-foreground">
					Tip: Use emojis and hashtags to increase engagement
				</p>
			</div>

			{/* Hashtags */}
			<div className="space-y-4">
				<Label htmlFor="hashtags" className="text-sm font-semibold">
					# Hashtags{" "}
					<span className="text-xs font-normal text-muted-foreground">
						(optional)
					</span>
				</Label>
				<Input
					id="hashtags"
					placeholder="#hashtag1 #hashtag2"
					value={content.hashtags || ""}
					onChange={(e) => handleHashtagsChange(e.target.value)}
					className={cn(
						errors.hashtags && "border-red-500 focus:border-red-500",
					)}
				/>
				{errors.hashtags && (
					<p className="text-xs text-red-500">{errors.hashtags}</p>
				)}
				<p className="text-xs text-muted-foreground">
					Separate hashtags with spaces
				</p>
			</div>

			{/* Mentions */}
			<div className="space-y-4">
				<Label htmlFor="mentions" className="text-sm font-semibold">
					@ Mentions{" "}
					<span className="text-xs font-normal text-muted-foreground">
						(optional)
					</span>
				</Label>
				<Input
					id="mentions"
					placeholder="@username1 @username2"
					value={content.mentions || ""}
					onChange={(e) => handleMentionsChange(e.target.value)}
					className={cn(
						errors.mentions && "border-red-500 focus:border-red-500",
					)}
				/>
				{errors.mentions && (
					<p className="text-xs text-red-500">{errors.mentions}</p>
				)}
				<p className="text-xs text-muted-foreground">
					Separate mentions with spaces
				</p>
			</div>

			{/* Call to Action Link */}
			<div className="space-y-4">
				<Label htmlFor="cta-link" className="text-sm font-semibold">
					Call to Action Link
				</Label>
				<Input
					id="cta-link"
					type="url"
					placeholder="https://your-event-link.com"
					value={content.callToActionLink || ""}
					onChange={(e) => handleCallToActionChange(e.target.value)}
					className={cn(
						errors.callToActionLink && "border-red-500 focus:border-red-500",
					)}
				/>
				{errors.callToActionLink && (
					<p className="text-xs text-red-500">{errors.callToActionLink}</p>
				)}
			</div>

			{/* Media Card */}
			<div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4 space-y-4">
				<div className="flex items-center gap-2">
					<Image className="h-4 w-4 text-muted-foreground" />
					<Label className="text-sm font-semibold">Media</Label>
				</div>
				<label
					htmlFor="media-upload"
					className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
				>
					<div className="flex flex-col items-center justify-center pt-5 pb-6">
						<Upload className="w-8 h-8 mb-2 text-muted-foreground" />
						<p className="mb-2 text-sm text-muted-foreground">
							<span className="font-semibold">Upload Image or Video</span>
						</p>
					</div>
					<input
						id="media-upload"
						type="file"
						className="hidden"
						accept="image/*,video/*"
						multiple
						onChange={handleMediaChange}
					/>
				</label>
				{mediaPreviews.length > 0 && (
					<div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-3">
						{mediaPreviews.map((item, index) => (
							<div key={index} className="relative group">
								<button
									type="button"
									onClick={() => handleRemoveMedia(index)}
									className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity"
								>
									<X className="h-4 w-4" />
								</button>
								<img
									src={item.preview}
									alt={`Preview ${index + 1}`}
									className="w-full h-32 object-cover rounded-lg"
								/>
							</div>
						))}
					</div>
				)}
				<p className="text-xs text-muted-foreground">
					Images and videos significantly increase engagement rates
				</p>
			</div>

			{/* Post Preview Card */}
			<div className="bg-[#F3F4F6] dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4 space-y-4">
				<Label className="text-sm font-semibold">Post Preview</Label>
				<div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700 p-4 space-y-3">
					{/* Profile Header */}
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
							{platformName.charAt(0).toUpperCase()}
						</div>
						<div>
							<p className="text-sm font-semibold">Your Account</p>
							<p className="text-xs text-muted-foreground">Just now</p>
						</div>
					</div>

					{/* Post Content */}
					<div className="space-y-2">
						{content.postContent ? (
							<p className="text-sm whitespace-pre-wrap break-words">
								{content.postContent}
							</p>
						) : (
							<p className="text-sm text-muted-foreground">
								Your post content will appear here...
							</p>
						)}

						{/* Hashtags */}
						{content.hashtags && (
							<p className="text-sm text-blue-600">{content.hashtags}</p>
						)}

						{/* Mentions */}
						{content.mentions && (
							<p className="text-sm text-blue-600">{content.mentions}</p>
						)}

						{/* Media Preview */}
						{mediaPreviews.length > 0 && (
							<div className="mt-2 grid grid-cols-1 gap-2">
								{mediaPreviews.map((item, index) => (
									<img
										key={index}
										src={item.preview}
										alt={`Post media ${index + 1}`}
										className="w-full rounded-lg"
									/>
								))}
							</div>
						)}

						{/* Call to Action Link */}
						{content.callToActionLink && (
							<a
								href={content.callToActionLink}
								target="_blank"
								rel="noopener noreferrer"
								className="text-sm text-blue-600 hover:underline block mt-2"
							>
								{content.callToActionLink}
							</a>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
