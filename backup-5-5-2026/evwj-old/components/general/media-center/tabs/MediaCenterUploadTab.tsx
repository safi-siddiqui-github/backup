"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Upload,
	Camera,
	X,
	CheckCircle,
	AlertCircle,
	ArrowLeft,
	ArrowRight,
	FileImage,
	FileVideo,
} from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { MOCK_ALBUMS } from "../shared";

interface UploadQueueItem {
	id: string;
	file: File;
	title: string;
	tags: string[];
	status: "pending" | "uploading" | "completed" | "failed";
	progress: number;
	error?: string;
}

export default function MediaCenterUploadTab() {
	const [currentStep, setCurrentStep] = useState<1 | 2>(1);
	const [selectedAlbum, setSelectedAlbum] = useState<string>("");
	const [fileQueue, setFileQueue] = useState<UploadQueueItem[]>([]);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [commonMetadata, setCommonMetadata] = useState({
		titlePrefix: "",
		tags: "",
	});

	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(event.target.files || []);
		const newQueueItems: UploadQueueItem[] = files.map((file) => ({
			id: Math.random().toString(36).substr(2, 9),
			file,
			title: "",
			tags: [],
			status: "pending",
			progress: 0,
		}));

		setFileQueue((prev) => [...prev, ...newQueueItems]);
	};

	const handleRemoveFile = (id: string) => {
		setFileQueue((prev) => prev.filter((item) => item.id !== id));
	};

	const handleApplyToAll = () => {
		setFileQueue((prev) =>
			prev.map((item) => ({
				...item,
				title:
					commonMetadata.titlePrefix +
					(item.title || item.file.name.split(".")[0]),
				tags: commonMetadata.tags
					.split(",")
					.map((tag) => tag.trim())
					.filter(Boolean),
			})),
		);
		toast.success("Metadata applied to all files");
	};

	const handleStartUpload = async () => {
		if (!selectedAlbum) {
			toast.error("Please select an album");
			return;
		}

		if (fileQueue.length === 0) {
			toast.error("Please select files to upload");
			return;
		}

		setUploadProgress(0);

		// Simulate upload process
		for (let i = 0; i < fileQueue.length; i++) {
			const item = fileQueue[i];
			setFileQueue((prev) =>
				prev.map((f) => (f.id === item.id ? { ...f, status: "uploading" } : f)),
			);

			// Simulate upload progress
			for (let progress = 0; progress <= 100; progress += 10) {
				await new Promise((resolve) => setTimeout(resolve, 100));
				setFileQueue((prev) =>
					prev.map((f) => (f.id === item.id ? { ...f, progress } : f)),
				);
				setUploadProgress((i * 100 + progress) / fileQueue.length);
			}

			setFileQueue((prev) =>
				prev.map((f) => (f.id === item.id ? { ...f, status: "completed" } : f)),
			);
		}

		toast.success(`Successfully uploaded ${fileQueue.length} files`);
		setFileQueue([]);
		setUploadProgress(0);
	};

	const formatFileSize = (bytes: number) => {
		if (bytes === 0) return "0 Bytes";
		const k = 1024;
		const sizes = ["Bytes", "KB", "MB", "GB"];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
	};

	const getFileIcon = (file: File) => {
		if (file.type.startsWith("image/"))
			return <FileImage className="h-4 w-4 text-blue-500" />;
		if (file.type.startsWith("video/"))
			return <FileVideo className="h-4 w-4 text-purple-500" />;
		return <FileImage className="h-4 w-4 text-gray-500" />;
	};

	const getStatusIcon = (status: UploadQueueItem["status"]) => {
		switch (status) {
			case "completed":
				return <CheckCircle className="h-4 w-4 text-green-500" />;
			case "failed":
				return <AlertCircle className="h-4 w-4 text-red-500" />;
			case "uploading":
				return (
					<div className="h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
				);
			default:
				return (
					<div className="h-4 w-4 border-2 border-gray-300 rounded-full" />
				);
		}
	};

	return (
		<div className="flex flex-col gap-6">
			{/* Step 1: Select Destination Album */}
			{currentStep === 1 && (
				<Card className="from-primary/5 via-background to-secondary/5 border-border/30 relative overflow-hidden bg-linear-to-br shadow-xl backdrop-blur-xl dark:bg-[#020617] dark:from-[#020617] dark:via-[#020617] dark:to-[#020617]">
					<div className="from-primary/10 to-secondary/10 absolute inset-0 bg-linear-to-br via-transparent opacity-50"></div>
					<CardContent className="p-6 relative z-10">
						<div className="flex flex-col gap-6">
							<div>
								<CardTitle className="text-xl mb-2 text-gray-900 dark:text-slate-200">
									Select Destination Album
								</CardTitle>
								<CardDescription className="text-gray-600 dark:text-slate-400">
									Choose where you want to upload your photos and videos
								</CardDescription>
							</div>

							<div className="space-y-2">
								<Label
									htmlFor="album-select"
									className="text-gray-700 dark:text-slate-200"
								>
									Album/Sub-album
								</Label>
								<Select value={selectedAlbum} onValueChange={setSelectedAlbum}>
									<SelectTrigger className="!bg-white dark:!bg-slate-700/50 border-gray-200 dark:border-slate-600 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
										<SelectValue placeholder="Select an album" />
									</SelectTrigger>
									<SelectContent>
										{MOCK_ALBUMS.map((album) => (
											<SelectItem key={album.id} value={album.id}>
												{album.parentAlbumId ? `  ${album.name}` : album.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>

							<div className="border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg p-8 text-center from-primary/5 via-background to-secondary/5 border-border/30 relative overflow-hidden bg-linear-to-br shadow-xl backdrop-blur-xl dark:bg-[#020617] dark:from-[#020617] dark:via-[#020617] dark:to-[#020617]">
								<div className="from-primary/10 to-secondary/10 absolute inset-0 bg-linear-to-br via-transparent opacity-50"></div>
								<div className="relative z-10">
									<Upload className="h-12 w-12 text-gray-400 dark:text-slate-500 mx-auto mb-4" />
									<p className="text-lg font-medium text-gray-900 dark:text-slate-200 mb-2">
										You can also drag & drop files here to quickly add them
									</p>
									<Button
										onClick={() => fileInputRef.current?.click()}
										className="mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
									>
										<Upload className="h-4 w-4 mr-2" />
										<span className="font-semibold">Choose Files</span>
									</Button>
									<input
										ref={fileInputRef}
										type="file"
										multiple
										accept="image/*,video/*"
										onChange={handleFileSelect}
										className="hidden"
									/>
								</div>
							</div>

							{fileQueue.length > 0 && (
								<div className="text-center">
									<p className="text-sm text-gray-600 dark:text-slate-400">
										{fileQueue.length} file(s) ready to upload
									</p>
								</div>
							)}

							<div className="flex justify-end">
								<Button
									onClick={() => setCurrentStep(2)}
									disabled={!selectedAlbum || fileQueue.length === 0}
									className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
								>
									<span className="font-semibold">Next: Upload Files</span>
									<ArrowRight className="h-4 w-4 ml-2" />
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			)}

			{/* Step 2: Upload Files */}
			{currentStep === 2 && (
				<Card className="from-primary/5 via-background to-secondary/5 border-border/30 relative overflow-hidden bg-linear-to-br shadow-xl backdrop-blur-xl dark:bg-[#020617] dark:from-[#020617] dark:via-[#020617] dark:to-[#020617]">
					<div className="from-primary/10 to-secondary/10 absolute inset-0 bg-linear-to-br via-transparent opacity-50"></div>
					<CardContent className="p-6 relative z-10">
						<div className="flex flex-col gap-6">
							{/* Stepper */}
							<div className="flex items-center gap-4">
								<div className="flex items-center gap-2">
									<div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
										<CheckCircle className="h-4 w-4 text-white" />
									</div>
									<span className="text-sm font-medium text-green-600 dark:text-green-400">
										Choose Album
									</span>
								</div>
								<div className="h-px bg-gray-300 dark:bg-slate-600 flex-1" />
								<div className="flex items-center gap-2">
									<div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
										<span className="text-sm font-medium text-white">2</span>
									</div>
									<span className="text-sm font-medium text-blue-600 dark:text-blue-400">
										Upload Files
									</span>
								</div>
							</div>

							<div className="flex justify-between items-center">
								<Button
									variant="outline"
									onClick={() => setCurrentStep(1)}
									className="border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700/50 !bg-white dark:!bg-slate-700/50 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
								>
									<ArrowLeft className="h-4 w-4 mr-2" />
									Change Album
								</Button>
								<div className="text-sm text-gray-600 dark:text-slate-400">
									Album: {MOCK_ALBUMS.find((a) => a.id === selectedAlbum)?.name}
								</div>
							</div>

							{/* File Upload Area */}
							<div className="border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg p-8 text-center !bg-white dark:!bg-slate-700/50 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
								<div className="flex justify-center gap-4">
									<Button
										variant="outline"
										onClick={() => fileInputRef.current?.click()}
										className="border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700/50 !bg-white dark:!bg-slate-700/50 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
									>
										<Upload className="h-4 w-4 mr-2" />
										<span className="font-semibold">Choose Files</span>
									</Button>
									<Button
										variant="outline"
										className="border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700/50 !bg-white dark:!bg-slate-700/50 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
									>
										<Camera className="h-4 w-4 mr-2" />
										<span className="font-semibold">Take Photo</span>
									</Button>
								</div>
								<input
									ref={fileInputRef}
									type="file"
									multiple
									accept="image/*,video/*"
									onChange={handleFileSelect}
									className="hidden"
								/>
							</div>

							{/* Apply to All Files */}
							<Card className="!bg-white dark:!bg-slate-800/95 backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:rgb(30_41_59/0.95)]">
								<CardContent className="p-4">
									<CardTitle className="text-sm mb-3 text-gray-900 dark:text-slate-200">
										Apply to All Files
									</CardTitle>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div className="space-y-2">
											<Label
												htmlFor="common-title"
												className="text-gray-700 dark:text-slate-200"
											>
												Common Title Prefix
											</Label>
											<Input
												id="common-title"
												placeholder="e.g., Wedding Day - "
												value={commonMetadata.titlePrefix}
												onChange={(e) =>
													setCommonMetadata((prev) => ({
														...prev,
														titlePrefix: e.target.value,
													}))
												}
												className="!bg-white dark:!bg-slate-700/50 border-gray-200 dark:border-slate-600 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
											/>
										</div>
										<div className="space-y-2">
											<Label
												htmlFor="common-tags"
												className="text-gray-700 dark:text-slate-200"
											>
												Common Tags
											</Label>
											<Input
												id="common-tags"
												placeholder="e.g., wedding, ceremony, reception"
												value={commonMetadata.tags}
												onChange={(e) =>
													setCommonMetadata((prev) => ({
														...prev,
														tags: e.target.value,
													}))
												}
												className="!bg-white dark:!bg-slate-700/50 border-gray-200 dark:border-slate-600 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
											/>
										</div>
									</div>
									<Button
										variant="outline"
										size="sm"
										className="mt-3 border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700/50 !bg-white dark:!bg-slate-700/50 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
										onClick={handleApplyToAll}
									>
										<span className="font-semibold">Apply to All</span>
									</Button>
								</CardContent>
							</Card>

							{/* Upload Queue */}
							{fileQueue.length > 0 && (
								<Card className="!bg-white dark:!bg-slate-800/95 backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:rgb(30_41_59/0.95)]">
									<CardContent className="p-4">
										<CardTitle className="text-sm mb-3 text-gray-900 dark:text-slate-200">
											Upload Queue
										</CardTitle>
										<div className="space-y-3">
											{fileQueue.map((item) => (
												<div
													key={item.id}
													className="flex items-center gap-3 p-3 border border-gray-200 dark:border-slate-600 rounded-lg !bg-white dark:!bg-slate-700/50 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
												>
													<div className="flex items-center gap-2">
														{getFileIcon(item.file)}
														<div className="flex-1 min-w-0">
															<p className="text-sm font-medium truncate text-gray-900 dark:text-slate-200">
																{item.title || item.file.name}
															</p>
															<p className="text-xs text-gray-600 dark:text-slate-400">
																{formatFileSize(item.file.size)}
															</p>
														</div>
													</div>

													{item.status === "uploading" && (
														<div className="flex-1 mx-4">
															<Progress value={item.progress} className="h-2" />
														</div>
													)}

													<div className="flex items-center gap-2">
														{getStatusIcon(item.status)}
														<Button
															variant="ghost"
															size="sm"
															onClick={() => handleRemoveFile(item.id)}
															className="text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700/50"
														>
															<X className="h-4 w-4" />
														</Button>
													</div>
												</div>
											))}
										</div>
									</CardContent>
								</Card>
							)}

							{/* Upload Progress */}
							{uploadProgress > 0 && (
								<Card className="!bg-white dark:!bg-slate-800/95 backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:rgb(30_41_59/0.95)]">
									<CardContent className="p-4">
										<div className="space-y-2">
											<div className="flex justify-between text-sm text-gray-900 dark:text-slate-200">
												<span>Overall Progress</span>
												<span>{Math.round(uploadProgress)}%</span>
											</div>
											<Progress value={uploadProgress} className="h-2" />
										</div>
									</CardContent>
								</Card>
							)}

							<div className="flex justify-end">
								<Button
									onClick={handleStartUpload}
									disabled={fileQueue.length === 0}
									className="w-full md:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
								>
									<Upload className="h-4 w-4 mr-2" />
									<span className="font-semibold">Start Upload</span>
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			)}
		</div>
	);
}
