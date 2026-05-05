export interface MediaPreview {
	file: File;
	preview: string;
}

/**
 * Creates preview URLs for an array of files
 */
export async function createMediaPreviews(
	files: File[],
): Promise<MediaPreview[]> {
	const previewPromises = files.map((file) => {
		return new Promise<MediaPreview>((resolve, reject) => {
			const reader = new FileReader();
			reader.onloadend = () => {
				resolve({ file, preview: reader.result as string });
			};
			reader.onerror = () => {
				reject(new Error(`Failed to read file: ${file.name}`));
			};
			reader.readAsDataURL(file);
		});
	});

	return Promise.all(previewPromises);
}

/**
 * Creates a preview URL for a single file
 */
export async function createSingleMediaPreview(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => {
			resolve(reader.result as string);
		};
		reader.onerror = () => {
			reject(new Error(`Failed to read file: ${file.name}`));
		};
		reader.readAsDataURL(file);
	});
}

/**
 * Validates if a file is an image or video
 */
export function isValidMediaFile(file: File): boolean {
	return file.type.startsWith("image/") || file.type.startsWith("video/");
}

/**
 * Gets file size in a human-readable format
 */
export function formatFileSize(bytes: number): string {
	if (bytes === 0) return "0 Bytes";
	const k = 1024;
	const sizes = ["Bytes", "KB", "MB", "GB"];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}
