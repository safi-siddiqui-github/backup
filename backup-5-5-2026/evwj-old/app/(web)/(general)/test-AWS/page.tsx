"use client";

import LayoutOneComponent from "@/components/general/layout/LayoutOneComponent";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
	Download,
	File,
	FileText,
	ImageIcon,
	Loader2,
	Trash2,
	Upload,
	Video,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface S3File {
	key: string;
	size: number;
	lastModified: Date;
	contentType?: string;
	url?: string;
}

interface UploadResponse {
	success: boolean;
	data?: {
		presignedUrl: string;
		key: string;
		bucket: string;
	};
	error?: string;
}

interface ListResponse {
	success: boolean;
	data?: S3File[];
	error?: string;
}

interface DownloadResponse {
	success: boolean;
	data?: {
		presignedUrl: string;
		key: string;
		expiresIn: number;
	};
	error?: string;
}

export default function TestAWSPage() {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [uploading, setUploading] = useState(false);
	const [files, setFiles] = useState<S3File[]>([]);
	const [loading, setLoading] = useState(false);
	const [uploadedFileUrl, setUploadedFileUrl] = useState<string>("");
	const fileInputRef = useRef<HTMLInputElement>(null);

	// Load files on component mount
	useEffect(() => {
		loadFiles();
	}, []);

	const loadFiles = async () => {
		setLoading(true);
		try {
			const response = await fetch("/api/s3/list");
			const result: ListResponse = await response.json();

			if (result.success && result.data) {
				setFiles(result.data);
			} else {
				toast.error(result.error || "Failed to load files");
			}
		} catch (error) {
			toast.error("Error loading files");
			console.error("Error loading files:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setSelectedFile(file);
			setUploadedFileUrl("");
		}
	};

	const handleUpload = async () => {
		if (!selectedFile) {
			toast.error("Please select a file to upload");
			return;
		}

		setUploading(true);
		try {
			// Step 1: Get presigned upload URL
			const uploadResponse = await fetch("/api/s3/upload", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					filename: selectedFile.name,
					contentType: selectedFile.type,
				}),
			});

			const uploadResult: UploadResponse = await uploadResponse.json();

			if (!uploadResult.success || !uploadResult.data) {
				throw new Error(uploadResult.error || "Failed to get upload URL");
			}

			// Step 2: Upload file directly to S3 using presigned URL
			const uploadToS3 = await fetch(uploadResult.data.presignedUrl, {
				method: "PUT",
				body: selectedFile,
				headers: {
					"Content-Type": selectedFile.type,
				},
			});

			if (!uploadToS3.ok) {
				throw new Error("Failed to upload file to S3");
			}

			// Step 3: Get download URL for the uploaded file
			const downloadResponse = await fetch("/api/s3/download", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					key: uploadResult.data.key,
				}),
			});

			const downloadResult: DownloadResponse = await downloadResponse.json();

			if (downloadResult.success && downloadResult.data) {
				setUploadedFileUrl(downloadResult.data.presignedUrl);
				toast.success("File uploaded successfully!");
				loadFiles(); // Refresh file list
				setSelectedFile(null);
				if (fileInputRef.current) {
					fileInputRef.current.value = "";
				}
			} else {
				throw new Error(downloadResult.error || "Failed to get download URL");
			}
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Upload failed");
			console.error("Upload error:", error);
		} finally {
			setUploading(false);
		}
	};

	const handleDownload = async (key: string) => {
		try {
			const response = await fetch("/api/s3/download", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ key }),
			});

			const result: DownloadResponse = await response.json();

			if (result.success && result.data) {
				// Open download URL in new tab
				window.open(result.data.presignedUrl, "_blank");
				toast.success("Download started");
			} else {
				toast.error(result.error || "Failed to generate download URL");
			}
		} catch (error) {
			toast.error("Download failed");
			console.error("Download error:", error);
		}
	};

	const handleDelete = async (key: string) => {
		if (!confirm("Are you sure you want to delete this file?")) {
			return;
		}

		try {
			const response = await fetch("/api/s3/delete", {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ key }),
			});

			const result = await response.json();

			if (result.success) {
				toast.success("File deleted successfully");
				loadFiles(); // Refresh file list
			} else {
				toast.error(result.error || "Failed to delete file");
			}
		} catch (error) {
			toast.error("Delete failed");
			console.error("Delete error:", error);
		}
	};

	const getFileIcon = (contentType?: string) => {
		if (!contentType) return <File className="h-4 w-4" />;

		if (contentType.startsWith("image/")) {
			return <ImageIcon className="h-4 w-4" />;
		} else if (contentType.startsWith("video/")) {
			return <Video className="h-4 w-4" />;
		} else {
			return <FileText className="h-4 w-4" />;
		}
	};

	const formatFileSize = (bytes: number) => {
		if (bytes === 0) return "0 Bytes";
		const k = 1024;
		const sizes = ["Bytes", "KB", "MB", "GB"];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
	};

	const formatDate = (date: Date) => {
		return new Date(date).toLocaleString();
	};

	{
		/* */
	}
	return <></>;
	{
		/* */
	}

	return (
		<LayoutOneComponent>
			<div className="container mx-auto mt-40 max-w-4xl p-6">
				<div className="space-y-6">
					<div>
						<h1 className="text-3xl font-bold">AWS S3 Test Page</h1>
						<p className="text-muted-foreground">
							Test uploading, downloading, and deleting files from your S3
							bucket
						</p>
					</div>

					{/* Upload Section */}
					<Card>
						<CardHeader>
							<CardTitle>Upload File</CardTitle>
							<CardDescription>
								Upload images, videos, or documents to your S3 bucket
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="file-input">Select File</Label>
								<Input
									id="file-input"
									type="file"
									ref={fileInputRef}
									onChange={handleFileSelect}
									accept="image/*,video/*,.pdf,.doc,.docx,.txt,.rtf"
									className="cursor-pointer"
								/>
							</div>

							{selectedFile && (
								<div className="bg-muted rounded-lg p-3">
									<p className="text-sm">
										<strong>Selected:</strong> {selectedFile?.name}
									</p>
									<p className="text-muted-foreground text-sm">
										Size: {formatFileSize(selectedFile?.size ?? 0)} | Type:{" "}
										{selectedFile?.type}
									</p>
								</div>
							)}

							<Button
								onClick={handleUpload}
								disabled={!selectedFile || uploading}
								className="w-full"
							>
								{uploading ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Uploading...
									</>
								) : (
									<>
										<Upload className="mr-2 h-4 w-4" />
										Upload to S3
									</>
								)}
							</Button>

							{uploadedFileUrl && (
								<Alert>
									<AlertDescription>
										<strong>Upload successful!</strong> File URL:{" "}
										<a
											href={uploadedFileUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="break-all text-blue-600 hover:underline"
										>
											{uploadedFileUrl}
										</a>
									</AlertDescription>
								</Alert>
							)}
						</CardContent>
					</Card>

					<Separator />

					{/* Files List Section */}
					<Card>
						<CardHeader>
							<div className="flex items-center justify-between">
								<div>
									<CardTitle>Files in Bucket</CardTitle>
									<CardDescription>
										All files currently stored in your S3 bucket
									</CardDescription>
								</div>
								<Button
									variant="outline"
									size="sm"
									onClick={loadFiles}
									disabled={loading}
								>
									{loading ? (
										<Loader2 className="h-4 w-4 animate-spin" />
									) : (
										"Refresh"
									)}
								</Button>
							</div>
						</CardHeader>
						<CardContent>
							{loading ? (
								<div className="flex items-center justify-center py-8">
									<Loader2 className="h-6 w-6 animate-spin" />
									<span className="ml-2">Loading files...</span>
								</div>
							) : files.length === 0 ? (
								<div className="text-muted-foreground py-8 text-center">
									No files found in the bucket
								</div>
							) : (
								<div className="space-y-3">
									{files.map((file) => (
										<div
											key={file.key}
											className="hover:bg-muted/50 flex items-center justify-between rounded-lg border p-3 transition-colors"
										>
											<div className="flex min-w-0 flex-1 items-center space-x-3">
												{getFileIcon(file.contentType)}
												<div className="min-w-0 flex-1">
													<p className="truncate text-sm font-medium">
														{file.key.split("/").pop()}
													</p>
													<div className="text-muted-foreground flex items-center space-x-2 text-xs">
														<span>{formatFileSize(file.size)}</span>
														<span>•</span>
														<span>{formatDate(file.lastModified)}</span>
														{file.contentType && (
															<>
																<span>•</span>
																<Badge variant="secondary" className="text-xs">
																	{file.contentType}
																</Badge>
															</>
														)}
													</div>
												</div>
											</div>
											<div className="flex items-center space-x-2">
												<Button
													variant="outline"
													size="sm"
													onClick={() => handleDownload(file.key)}
												>
													<Download className="h-4 w-4" />
												</Button>
												<Button
													variant="outline"
													size="sm"
													onClick={() => handleDelete(file.key)}
													className="text-destructive hover:text-destructive"
												>
													<Trash2 className="h-4 w-4" />
												</Button>
											</div>
										</div>
									))}
								</div>
							)}
						</CardContent>
					</Card>
				</div>
			</div>
		</LayoutOneComponent>
	);
}
