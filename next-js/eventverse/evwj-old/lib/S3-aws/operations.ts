// // import {
// // 	PutObjectCommand,
// // 	GetObjectCommand,
// // 	DeleteObjectCommand,
// // 	ListObjectsV2Command,
// // 	type PutObjectCommandInput,
// // 	type GetObjectCommandInput,
// // 	type DeleteObjectCommandInput,
// // 	type ListObjectsV2CommandInput,
// // } from "@aws-sdk/client-s3";
// // import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
// import { s3Client, getBucketName } from "./client";

// // Types for S3 operations
// export interface S3File {
// 	key: string;
// 	size: number;
// 	lastModified: Date;
// 	contentType?: string;
// 	url?: string;
// }

// export interface PresignedUploadResponse {
// 	presignedUrl: string;
// 	key: string;
// 	bucket: string;
// }

// export interface PresignedDownloadResponse {
// 	presignedUrl: string;
// 	key: string;
// 	expiresIn: number;
// }

// // Get content type based on file extension
// const getContentType = (filename: string): string => {
// 	const extension = filename.toLowerCase().split(".").pop();

// 	const contentTypes: Record<string, string> = {
// 		// Images
// 		jpg: "image/jpeg",
// 		jpeg: "image/jpeg",
// 		png: "image/png",
// 		gif: "image/gif",
// 		webp: "image/webp",
// 		svg: "image/svg+xml",

// 		// Videos
// 		mp4: "video/mp4",
// 		mov: "video/quicktime",
// 		avi: "video/x-msvideo",
// 		webm: "video/webm",
// 		mkv: "video/x-matroska",

// 		// Documents
// 		pdf: "application/pdf",
// 		doc: "application/msword",
// 		docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
// 		txt: "text/plain",
// 		rtf: "application/rtf",
// 		odt: "application/vnd.oasis.opendocument.text",
// 	};

// 	return contentTypes[extension || ""] || "application/octet-stream";
// };

// // Generate unique key for file upload
// const generateUniqueKey = (filename: string): string => {
// 	const timestamp = Date.now();
// 	const randomString = Math.random().toString(36).substring(2, 15);
// 	const extension = filename.split(".").pop();
// 	return `uploads/${timestamp}-${randomString}.${extension}`;
// };

// /**
//  * Generate presigned URL for file upload
//  */
// export const generatePresignedUploadUrl = async (
// 	filename: string,
// 	contentType?: string,
// ): Promise<PresignedUploadResponse> => {
// 	try {
// 		const bucketName = getBucketName();
// 		const key = generateUniqueKey(filename);
// 		const detectedContentType = contentType || getContentType(filename);

// 		const command: PutObjectCommandInput = {
// 			Bucket: bucketName,
// 			Key: key,
// 			ContentType: detectedContentType,
// 		};

// 		const putCommand = new PutObjectCommand(command);
// 		const presignedUrl = await getSignedUrl(s3Client, putCommand, {
// 			expiresIn: 300, // 5 minutes
// 		});

// 		return {
// 			presignedUrl,
// 			key,
// 			bucket: bucketName,
// 		};
// 	} catch (error) {
// 		console.error("Error generating presigned upload URL:", error);
// 		throw new Error("Failed to generate upload URL");
// 	}
// };

// /**
//  * Generate presigned URL for file download
//  */
// export const generatePresignedDownloadUrl = async (
// 	key: string,
// 	expiresIn: number = 3600, // 1 hour default
// ): Promise<PresignedDownloadResponse> => {
// 	try {
// 		const bucketName = getBucketName();

// 		const command: GetObjectCommandInput = {
// 			Bucket: bucketName,
// 			Key: key,
// 		};

// 		const getCommand = new GetObjectCommand(command);
// 		const presignedUrl = await getSignedUrl(s3Client, getCommand, {
// 			expiresIn,
// 		});

// 		return {
// 			presignedUrl,
// 			key,
// 			expiresIn,
// 		};
// 	} catch (error) {
// 		console.error("Error generating presigned download URL:", error);
// 		throw new Error("Failed to generate download URL");
// 	}
// };

// /**
//  * Delete file from S3 bucket
//  */
// export const deleteFile = async (key: string): Promise<void> => {
// 	try {
// 		const bucketName = getBucketName();

// 		const command: DeleteObjectCommandInput = {
// 			Bucket: bucketName,
// 			Key: key,
// 		};

// 		const deleteCommand = new DeleteObjectCommand(command);
// 		await s3Client.send(deleteCommand);
// 	} catch (error) {
// 		console.error("Error deleting file:", error);
// 		throw new Error("Failed to delete file");
// 	}
// };

// /**
//  * List all files in the S3 bucket
//  */
// export const listFiles = async (prefix?: string): Promise<S3File[]> => {
// 	try {
// 		const bucketName = getBucketName();

// 		const command: ListObjectsV2CommandInput = {
// 			Bucket: bucketName,
// 			Prefix: prefix || "uploads/",
// 		};

// 		const listCommand = new ListObjectsV2Command(command);
// 		const response = await s3Client.send(listCommand);

// 		const files: S3File[] = (response.Contents || []).map((object) => ({
// 			key: object.Key || "",
// 			size: object.Size || 0,
// 			lastModified: object.LastModified || new Date(),
// 			contentType: object.Key ? getContentType(object.Key) : undefined,
// 		}));

// 		return files;
// 	} catch (error) {
// 		console.error("Error listing files:", error);
// 		throw new Error("Failed to list files");
// 	}
// };

// /**
//  * Get file metadata without downloading
//  */
// export const getFileMetadata = async (key: string): Promise<S3File | null> => {
// 	try {
// 		const files = await listFiles();
// 		return files.find((file) => file.key === key) || null;
// 	} catch (error) {
// 		console.error("Error getting file metadata:", error);
// 		throw new Error("Failed to get file metadata");
// 	}
// };
