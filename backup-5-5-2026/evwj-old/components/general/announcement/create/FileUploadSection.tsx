"use client";

import {
	Trash2,
	Upload,
	File as FileIcon,
	FileImage,
	FileVideo,
} from "lucide-react";

type Props = {
	files: File[];
	onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onRemove: (index: number) => void;
};

function getFileIcon(file: File) {
	const type = file.type;
	if (type.startsWith("image/"))
		return <FileImage size={20} className="text-blue-500" />;
	if (type.startsWith("video/"))
		return <FileVideo size={20} className="text-purple-500" />;
	if (type === "application/pdf")
		return <FileIcon size={20} className="text-red-500" />;
	return <FileIcon size={20} className="text-gray-500" />;
}

function formatFileSize(bytes: number): string {
	if (bytes === 0) return "0 Bytes";
	const k = 1024;
	const sizes = ["Bytes", "KB", "MB", "GB"];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}

export default function FileUploadSection({
	files,
	onUpload,
	onRemove,
}: Props) {
	return (
		<div>
			<label className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-200">
				Attachments (Optional)
			</label>
			<div className="space-y-3">
				<div className="relative">
					<input
						type="file"
						id="file-upload"
						multiple
						accept="image/*,video/*,.pdf,.doc,.docx"
						onChange={onUpload}
						className="hidden"
					/>
					<label
						htmlFor="file-upload"
						className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 dark:border-slate-600 !bg-white dark:!bg-slate-700/50 p-6 transition-all hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
					>
						<Upload
							size={32}
							className="mb-2 text-gray-400 dark:text-slate-500"
						/>
						<p className="text-sm font-medium text-gray-700 dark:text-slate-200">
							Click to upload files
						</p>
						<p className="mt-1 text-xs text-gray-500 dark:text-slate-400">
							Images, Videos, PDFs, or Documents
						</p>
						<p className="mt-1 text-xs text-gray-400 dark:text-slate-500">
							Maximum file size: 10MB
						</p>
					</label>
				</div>
				{files.length > 0 && (
					<div className="space-y-2">
						<p className="text-xs font-medium text-gray-600 dark:text-slate-400">
							Uploaded Files ({files.length})
						</p>
						{files.map((file, index) => (
							<div
								key={index}
								className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-slate-600 !bg-white dark:!bg-slate-700/50 p-3 transition-all hover:shadow-md [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
							>
								<div className="flex items-center gap-3 flex-1 min-w-0">
									<div className="shrink-0">{getFileIcon(file)}</div>
									<div className="flex-1 min-w-0">
										<p className="text-sm font-medium text-gray-900 dark:text-slate-200 truncate">
											{file.name}
										</p>
										<p className="text-xs text-gray-500 dark:text-slate-400">
											{formatFileSize(file.size)} • {file.type.split("/")[0]}
										</p>
									</div>
								</div>
								<button
									onClick={() => onRemove(index)}
									className="shrink-0 ml-2 rounded-full p-1.5 text-gray-400 dark:text-slate-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 dark:hover:text-red-400 transition-colors"
								>
									<Trash2 size={16} />
								</button>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
