import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Camera, Check, Image as ImageIcon, Upload, X } from "lucide-react";
import { useRef, useState } from "react";

interface PhotoData {
	id: string;
	url: string;
	file?: File;
	title?: string;
	description?: string;
	isUploaded: boolean;
}

interface UploadFile {
	file: File;
	id: string;
	progress: number;
	status: "pending" | "uploading" | "completed" | "error";
	preview?: string;
}

interface Props {
	onPhotosUpdate: (photos: PhotoData[]) => void;
	existingPhotos: PhotoData[];
	maxPhotos: number;
}

export default function EventPhotoUpload   ({
	onPhotosUpdate,
	existingPhotos,
	maxPhotos,
}: Props)   {
	const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);
	const [isDragging, setIsDragging] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const cameraInputRef = useRef<HTMLInputElement>(null);

	const remainingSlots = maxPhotos - existingPhotos.length;
	const canUploadMore = remainingSlots > 0;

	const handleFileSelect = (files: FileList | null) => {
		if (!files || !canUploadMore) return;

		const selectedFiles = Array.from(files).slice(0, remainingSlots);

		if (selectedFiles.length < files.length) {
			// toast({
			//   title: "Upload limit reached",
			//   description: `You can only upload ${remainingSlots} more photo(s).`,
			//   variant: "destructive",
			// });
		}

		const newFiles: UploadFile[] = selectedFiles
			.filter((file) => file.type.startsWith("image/"))
			.map((file) => ({
				file,
				id: Math.random().toString(36).substr(2, 9),
				progress: 0,
				status: "pending",
				preview: URL.createObjectURL(file),
			}));

		setUploadFiles((prev) => [...prev, ...newFiles]);
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(false);
		handleFileSelect(e.dataTransfer.files);
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(true);
	};

	const handleDragLeave = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(false);
	};

	const removeUploadFile = (id: string) => {
		setUploadFiles((prev) => prev.filter((f) => f.id !== id));
	};

	const removeExistingPhoto = (id: string) => {
		const updatedPhotos = existingPhotos.filter((photo) => photo.id !== id);
		onPhotosUpdate(updatedPhotos);
	};

	const simulateUpload = (fileId: string) => {
		const interval = setInterval(() => {
			setUploadFiles((prev) =>
				prev.map((f) => {
					if (f.id === fileId) {
						const newProgress = Math.min(f.progress + Math.random() * 30, 100);
						return {
							...f,
							progress: newProgress,
							status: newProgress >= 100 ? "completed" : "uploading",
						};
					}
					return f;
				}),
			);
		}, 300);

		setTimeout(() => {
			clearInterval(interval);
			setUploadFiles((prev) =>
				prev.map((f) =>
					f.id === fileId ? { ...f, progress: 100, status: "completed" } : f,
				),
			);
		}, 2000);
	};

	const handleUpload = () => {
		if (uploadFiles.length === 0) return;

		// Simulate upload for each file
		uploadFiles.forEach((file) => {
			if (file.status === "pending") {
				simulateUpload(file.id);
			}
		});

		// Convert uploaded files to photo data after simulation
		setTimeout(() => {
			const newPhotos: PhotoData[] = uploadFiles
				.filter((f) => f.status === "completed")
				.map((f) => ({
					id: f.id,
					url: f.preview!,
					file: f.file,
					title: f.file.name.split(".")[0],
					isUploaded: true,
				}));

			onPhotosUpdate([...existingPhotos, ...newPhotos]);
			setUploadFiles([]);

			// toast({
			//   title: "Photos uploaded successfully",
			//   description: `${newPhotos.length} photo(s) added to your event.`,
			// });
		}, 2500);

		// toast({
		//   title: "Upload started",
		//   description: `Uploading ${uploadFiles.length} photo(s)...`,
		// });
	};

	const formatFileSize = (bytes: number) => {
		if (bytes === 0) return "0 Bytes";
		const k = 1024;
		const sizes = ["Bytes", "KB", "MB", "GB"];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
	};

	return (
		<div className="space-y-6">
			{/* Upload Area */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center justify-between">
						<span>Upload Photos for Collage</span>
						<span className="text-muted-foreground text-sm font-normal">
							{existingPhotos.length}/{maxPhotos} photos
						</span>
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					{/* Upload Progress Bar */}
					<div className="h-2 w-full rounded-full bg-gray-200">
						<div
							className="h-2 rounded-full bg-purple-600 transition-all duration-300"
							style={{ width: `${(existingPhotos.length / maxPhotos) * 100}%` }}
						/>
					</div>

					{canUploadMore ? (
						<>
							{/* Drag & Drop Zone */}
							<div
								className={`rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
									isDragging
										? "border-purple-500 bg-purple-50"
										: "border-gray-300"
								}`}
								onDrop={handleDrop}
								onDragOver={handleDragOver}
								onDragLeave={handleDragLeave}
							>
								<Upload className="mx-auto mb-4 h-12 w-12 text-gray-400" />
								<p className="mb-2 text-lg font-medium">
									Upload photos for your event collage
								</p>
								<p className="mb-4 text-sm text-gray-600">
									Add multiple photos to create an engaging event page •{" "}
									{remainingSlots} more photo(s) allowed
								</p>
								<div className="flex justify-center gap-2">
									<Button onClick={() => fileInputRef.current?.click()}>
										<Upload className="mr-2 h-4 w-4" />
										Choose Photos
									</Button>
									<Button
										variant="outline"
										onClick={() => cameraInputRef.current?.click()}
									>
										<Camera className="mr-2 h-4 w-4" />
										Take Photo
									</Button>
								</div>
							</div>

							<input
								ref={fileInputRef}
								type="file"
								multiple
								accept="image/*"
								className="hidden"
								onChange={(e) => handleFileSelect(e.target.files)}
							/>
							<input
								ref={cameraInputRef}
								type="file"
								accept="image/*"
								capture="environment"
								className="hidden"
								onChange={(e) => handleFileSelect(e.target.files)}
							/>
						</>
					) : (
						<div className="py-8 text-center">
							<ImageIcon className="mx-auto mb-4 h-12 w-12 text-gray-400" />
							<p className="mb-2 text-lg font-medium">Maximum photos reached</p>
							<p className="text-sm text-gray-600">
								You've uploaded the maximum of {maxPhotos} photos. Remove some
								to add more.
							</p>
						</div>
					)}

					{/* Upload Queue */}
					{uploadFiles.length > 0 && (
						<div className="space-y-3">
							<h4 className="font-medium">Uploading ({uploadFiles.length})</h4>
							{uploadFiles.map((uploadFile) => (
								<div
									key={uploadFile.id}
									className="flex items-center gap-3 rounded-lg border p-3"
								>
									<img
										src={uploadFile.preview}
										alt="Preview"
										className="h-12 w-12 rounded object-cover"
									/>
									<div className="flex-1">
										<p className="text-sm font-medium">
											{uploadFile.file.name}
										</p>
										<p className="text-xs text-gray-600">
											{formatFileSize(uploadFile.file.size)}
										</p>
										{uploadFile.status !== "pending" && (
											<Progress value={uploadFile.progress} className="mt-1" />
										)}
									</div>
									<div className="flex items-center gap-2">
										{uploadFile.status === "completed" && (
											<Check className="h-4 w-4 text-green-600" />
										)}
										<Button
											variant="ghost"
											size="sm"
											onClick={() => removeUploadFile(uploadFile.id)}
											className="h-8 w-8 p-0"
										>
											<X className="h-4 w-4" />
										</Button>
									</div>
								</div>
							))}

							{uploadFiles.some((f) => f.status === "pending") && (
								<Button onClick={handleUpload} className="w-full">
									Upload{" "}
									{uploadFiles.filter((f) => f.status === "pending").length}{" "}
									Photo(s)
								</Button>
							)}
						</div>
					)}
				</CardContent>
			</Card>

			{/* Existing Photos Grid */}
			{existingPhotos.length > 0 && (
				<Card>
					<CardHeader>
						<CardTitle>Photo Collage ({existingPhotos.length})</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
							{existingPhotos.map((photo, index) => (
								<div
									key={photo.id}
									className={cn(
										"group relative",
										index === 0 && "md:col-span-2 md:row-span-2",
									)}
								>
									{index === 0 && (
										<div className="absolute top-2 left-2 z-10">
											<Badge className="bg-primary text-xs text-white">
												Cover Photo
											</Badge>
										</div>
									)}
									<img
										src={photo.url}
										alt={photo.title || "Event photo"}
										className={cn(
											"w-full rounded-lg border object-cover",
											index === 0 ? "h-48" : "h-24",
										)}
									/>
									<Button
										variant="destructive"
										size="sm"
										className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 transition-opacity group-hover:opacity-100"
										onClick={() => removeExistingPhoto(photo.id)}
									>
										<X className="h-3 w-3" />
									</Button>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			)}
		</div>
	);
};

 


