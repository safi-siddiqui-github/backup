"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	CreateOrganizationSchema,
	CreateOrganizationSchemaInfer,
} from "@/lib/validation/organization";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Plus, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { Organization } from "@/types/organization";

type CreateOrganizationDialogProps = {
	onCreate?: (organization: Organization) => void;
};

export default function CreateOrganizationDialog({
	onCreate,
}: CreateOrganizationDialogProps) {
	const [open, setOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [logoPreview, setLogoPreview] = useState<string | null>(null);
	const [logoFile, setLogoFile] = useState<File | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const form = useForm<CreateOrganizationSchemaInfer>({
		resolver: zodResolver(CreateOrganizationSchema),
		defaultValues: {
			name: "",
			description: "",
			logoUrl: "",
		},
	});

	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			if (file.size > 5 * 1024 * 1024) {
				toast.error("File size must be less than 5MB");
				return;
			}
			if (!file.type.startsWith("image/")) {
				toast.error("Please select an image file");
				return;
			}
			setLogoFile(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setLogoPreview(reader.result as string);
				form.setValue("logoUrl", reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleRemoveLogo = () => {
		setLogoFile(null);
		setLogoPreview(null);
		form.setValue("logoUrl", "");
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	const uploadLogoToS3 = async (file: File): Promise<string | null> => {
		try {
			// Get presigned URL
			const response = await fetch("/api/s3/upload", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					filename: file.name,
					contentType: file.type,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to get upload URL");
			}

			const result = await response.json();
			const { presignedUrl, key } = result.data || result;

			// Upload file to S3
			const uploadResponse = await fetch(presignedUrl, {
				method: "PUT",
				body: file,
				headers: {
					"Content-Type": file.type,
				},
			});

			if (!uploadResponse.ok) {
				throw new Error("Failed to upload file");
			}

			// Get bucket name from response or construct URL
			const bucketName = result.bucket || result.data?.bucket;
			if (bucketName) {
				// Construct the S3 URL from the key and bucket
				return `https://${bucketName}.s3.amazonaws.com/${key}`;
			}

			// Fallback: return just the key if bucket name not available
			return key;
		} catch (error) {
			console.error("Error uploading logo:", error);
			toast.error("Failed to upload logo");
			return null;
		}
	};

	const onSubmit = async (values: CreateOrganizationSchemaInfer) => {
		setIsSubmitting(true);

		// Upload logo if file is selected
		let logoUrl = values.logoUrl || "";
		if (logoFile) {
			const uploadedUrl = await uploadLogoToS3(logoFile);
			if (uploadedUrl) {
				logoUrl = uploadedUrl;
			} else {
				setIsSubmitting(false);
				return;
			}
		}

		try {
			// Create mock organization
			const newOrganization: Organization = {
				id: `org-${Date.now()}`,
				name: values.name,
				description: values.description || undefined,
				logoUrl: logoUrl || undefined,
				isVerified: false,
				createdAt: new Date().toISOString(),
				role: "OWNER",
				memberCount: 1,
			};

			// Call the onCreate callback
			if (onCreate) {
				onCreate(newOrganization);
			}

			toast.success("Organization created successfully");
			form.reset();
			setLogoPreview(null);
			setLogoFile(null);
			setOpen(false);
		} catch (error: any) {
			console.error("Unexpected error in onSubmit:", error);
			toast.error(error?.message || "An unexpected error occurred");
		}
		setIsSubmitting(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className="bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
					<Plus className="mr-2 h-4 w-4" />
					Create Organization
				</Button>
			</DialogTrigger>
			<DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<Building2 className="h-5 w-5" />
						Create New Organization
					</DialogTitle>
					<DialogDescription>
						Create a new organization. You will be the admin.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Organization Name *</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Acme Corporation" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="logoUrl"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Organization Photo</FormLabel>
									<FormControl>
										<div className="space-y-4">
											{logoPreview ? (
												<div className="relative inline-block">
													<Avatar className="border-background h-24 w-24 border-2 shadow-sm">
														<AvatarImage src={logoPreview} alt="Logo preview" />
														<AvatarFallback className="bg-linear-to-br from-purple-500 to-blue-500 text-white">
															<Building2 className="h-8 w-8" />
														</AvatarFallback>
													</Avatar>
													<Button
														type="button"
														variant="destructive"
														size="icon"
														className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
														onClick={handleRemoveLogo}
													>
														<X className="h-3 w-3" />
													</Button>
												</div>
											) : (
												<div
													className="hover:bg-accent/50 flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors"
													onClick={() => fileInputRef.current?.click()}
												>
													<Upload className="text-muted-foreground mb-2 h-8 w-8" />
													<p className="text-muted-foreground text-sm">
														Click to upload logo
													</p>
													<p className="text-muted-foreground mt-1 text-xs">
														PNG, JPG up to 5MB
													</p>
												</div>
											)}
											<input
												ref={fileInputRef}
												type="file"
												accept="image/*"
												onChange={handleFileSelect}
												className="hidden"
											/>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											placeholder="Tell us about your organization..."
											className="min-h-[100px]"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<DialogFooter>
							<Button
								type="button"
								variant="outline"
								onClick={() => setOpen(false)}
								disabled={isSubmitting}
							>
								Cancel
							</Button>
							<Button
								type="submit"
								className="bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
								disabled={isSubmitting}
							>
								{isSubmitting ? "Creating..." : "Create Organization"}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
