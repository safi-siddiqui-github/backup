"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageIcon, Trash2, Upload } from "lucide-react";
import { useRef, useState } from "react";
import type { OnboardingFormData } from "../VendorOnboardingWizard";

export default function Step4_BusinessDetails({
	formData,
	updateFormData,
	onBack,
	onComplete,
}: {
	formData: OnboardingFormData;
	updateFormData: (updates: Partial<OnboardingFormData>) => void;
	onBack: () => void;
	onComplete: () => void;
}) {
	const [errors, setErrors] = useState<Record<string, string>>({});
	const businessPhotoRef = useRef<HTMLInputElement>(null);
	const portfolioRef = useRef<HTMLInputElement>(null);

	const handleBusinessPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			if (file.size > 5 * 1024 * 1024) {
				setErrors({
					...errors,
					businessPhoto: "Image must be less than 5MB",
				});
				return;
			}
			if (!file.type.startsWith("image/")) {
				setErrors({
					...errors,
					businessPhoto: "Please select an image file",
				});
				return;
			}
			updateFormData({ businessPhoto: file });
			setErrors({ ...errors, businessPhoto: "" });
		}
	};

	const handlePortfolioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || []);
		if (files.length === 0) return;

		const validFiles: File[] = [];
		const newErrors: string[] = [];

		files.forEach((file) => {
			if (file.size > 5 * 1024 * 1024) {
				newErrors.push(`${file.name} is too large (max 5MB)`);
				return;
			}
			if (!file.type.startsWith("image/")) {
				newErrors.push(`${file.name} is not an image file`);
				return;
			}
			validFiles.push(file);
		});

		if (newErrors.length > 0) {
			setErrors({ ...errors, portfolio: newErrors.join(", ") });
		}

		const totalImages = formData.portfolioImages.length + validFiles.length;
		if (totalImages > 10) {
			setErrors({
				...errors,
				portfolio: `Maximum 10 images allowed. You have ${formData.portfolioImages.length} and trying to add ${validFiles.length} more.`,
			});
			return;
		}

		updateFormData({
			portfolioImages: [...formData.portfolioImages, ...validFiles],
		});
		setErrors({ ...errors, portfolio: "" });
	};

	const removePortfolioImage = (index: number) => {
		updateFormData({
			portfolioImages: formData.portfolioImages.filter((_, i) => i !== index),
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const newErrors: Record<string, string> = {};

		if (!formData.businessName.trim()) {
			newErrors.businessName = "Business name is required";
		}

		if (!formData.businessPhoto) {
			newErrors.businessPhoto = "Business photo is required";
		}

		if (formData.portfolioImages.length === 0) {
			newErrors.portfolio = "At least one portfolio image is required";
		}

		if (!formData.businessDescription.trim()) {
			newErrors.businessDescription = "Business description is required";
		} else if (formData.businessDescription.length < 50) {
			newErrors.businessDescription =
				"Description must be at least 50 characters";
		} else if (formData.businessDescription.length > 1000) {
			newErrors.businessDescription =
				"Description must be less than 1000 characters";
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		setErrors({});
		onComplete();
	};

	const getImagePreview = (file: File): string => {
		return URL.createObjectURL(file);
	};

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-2xl font-bold mb-2">Business Details</h2>
				<p className="text-muted-foreground">
					Tell us about your business and showcase your work.
				</p>
			</div>

			<form onSubmit={handleSubmit} className="space-y-6">
				{/* Business Name */}
				<div className="space-y-2">
					<Label htmlFor="businessName">Business Name *</Label>
					<Input
						id="businessName"
						type="text"
						placeholder="Your Business Name"
						value={formData.businessName}
						onChange={(e) =>
							updateFormData({ businessName: e.target.value })
						}
						aria-invalid={!!errors.businessName}
					/>
					{errors.businessName && (
						<p className="text-sm text-destructive">{errors.businessName}</p>
					)}
				</div>

				{/* Business Photo */}
				<div className="space-y-2">
					<Label>Business Photo/Logo *</Label>
					<div className="flex items-center gap-4">
						{formData.businessPhoto ? (
							<div className="relative">
								<img
									src={getImagePreview(formData.businessPhoto)}
									alt="Business photo"
									className="h-32 w-32 rounded-lg object-cover border border-border"
								/>
								<button
									type="button"
									onClick={() => {
										updateFormData({ businessPhoto: null });
										if (businessPhotoRef.current) {
											businessPhotoRef.current.value = "";
										}
									}}
									className="absolute -top-2 -right-2 p-1 bg-destructive text-white rounded-full hover:bg-destructive/90"
								>
									<Trash2 className="h-4 w-4" />
								</button>
							</div>
						) : (
							<button
								type="button"
								onClick={() => businessPhotoRef.current?.click()}
								className="flex flex-col items-center justify-center h-32 w-32 border-2 border-dashed border-border rounded-lg hover:border-purple-600 dark:hover:border-purple-400 transition-colors"
							>
								<Upload className="h-8 w-8 text-muted-foreground mb-2" />
								<span className="text-sm text-muted-foreground">
									Upload Photo
								</span>
							</button>
						)}
						<div>
							<Button
								type="button"
								variant="outline"
								onClick={() => businessPhotoRef.current?.click()}
							>
								{formData.businessPhoto ? "Change Photo" : "Select Photo"}
							</Button>
							<p className="text-xs text-muted-foreground mt-1">
								Max 5MB. JPG, PNG, or GIF
							</p>
						</div>
						<input
							ref={businessPhotoRef}
							type="file"
							accept="image/*"
							onChange={handleBusinessPhotoChange}
							className="hidden"
						/>
					</div>
					{errors.businessPhoto && (
						<p className="text-sm text-destructive">{errors.businessPhoto}</p>
					)}
				</div>

				{/* Portfolio Images */}
				<div className="space-y-2">
					<Label>Portfolio Images *</Label>
					<p className="text-sm text-muted-foreground">
						Add 1-10 images showcasing your work
					</p>
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
						{formData.portfolioImages.map((image, index) => (
							<div key={index} className="relative group">
								<img
									src={getImagePreview(image)}
									alt={`Portfolio ${index + 1}`}
									className="h-32 w-full rounded-lg object-cover border border-border"
								/>
								<button
									type="button"
									onClick={() => removePortfolioImage(index)}
									className="absolute top-2 right-2 p-1 bg-destructive text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/90"
								>
									<Trash2 className="h-4 w-4" />
								</button>
							</div>
						))}
						{formData.portfolioImages.length < 10 && (
							<button
								type="button"
								onClick={() => portfolioRef.current?.click()}
								className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-border rounded-lg hover:border-purple-600 dark:hover:border-purple-400 transition-colors"
							>
								<ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
								<span className="text-xs text-muted-foreground">
									Add Image
								</span>
							</button>
						)}
					</div>
					<input
						ref={portfolioRef}
						type="file"
						accept="image/*"
						multiple
						onChange={handlePortfolioChange}
						className="hidden"
					/>
					{errors.portfolio && (
						<p className="text-sm text-destructive">{errors.portfolio}</p>
					)}
					<p className="text-xs text-muted-foreground">
						{formData.portfolioImages.length}/10 images
					</p>
				</div>

				{/* Business Description */}
				<div className="space-y-2">
					<Label htmlFor="businessDescription">Business Description *</Label>
					<Textarea
						id="businessDescription"
						placeholder="Tell us about your business, your experience, and what makes you unique..."
						value={formData.businessDescription}
						onChange={(e) =>
							updateFormData({ businessDescription: e.target.value })
						}
						rows={6}
						maxLength={1000}
						aria-invalid={!!errors.businessDescription}
					/>
					<div className="flex justify-between">
						{errors.businessDescription && (
							<p className="text-sm text-destructive">
								{errors.businessDescription}
							</p>
						)}
						<p className="text-xs text-muted-foreground ml-auto">
							{formData.businessDescription.length}/1000 characters
						</p>
					</div>
				</div>

				{/* Navigation */}
				<div className="flex gap-4 pt-4">
					<Button type="button" variant="outline" onClick={onBack}>
						Back
					</Button>
					<Button type="submit" className="flex-1" size="lg">
						Complete Onboarding
					</Button>
				</div>
			</form>
		</div>
	);
}

