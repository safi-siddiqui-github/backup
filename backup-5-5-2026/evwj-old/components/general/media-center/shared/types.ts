export type MediaCenterAlbum = {
	id: string;
	slug: string;
	name: string;
	description: string;
	coverPhotoUrl: string | null;
	photoCount: number;
	videoCount: number;
	subAlbumCount: number;
	maxPhotosPerGuest: number;
	allowDownloads: boolean;
	requireApproval: boolean;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
	parentAlbumId: string | null;
	eventId: string;
};

export type MediaCenterPhoto = {
	id: string;
	slug: string;
	url: string;
	thumbnailUrl: string | null;
	title: string | null;
	tags: string[];
	uploadedBy: {
		id: string;
		name: string;
		avatar: string | null;
	};
	uploadedAt: string;
	likes: number;
	downloads: number;
	albumId: string;
	fileSize: number;
	fileType: string;
	width: number | null;
	height: number | null;
	isApproved: boolean;
};

export type MediaCenterStats = {
	totalPhotos: number;
	totalVideos: number;
	totalAlbums: number;
	totalSubAlbums: number;
	totalLikes: number;
	totalDownloads: number;
	storageUsed: string;
};

export type MediaCenterContributor = {
	id: string;
	name: string;
	email: string;
	avatar: string | null;
	photoCount: number;
	videoCount: number;
};

export type UploadQueueItem = {
	id: string;
	file: File;
	albumId: string;
	title: string;
	tags: string[];
	status: "pending" | "uploading" | "completed" | "failed";
	progress: number;
	error: string | null;
};

export type UploadFormData = {
	albumId: string;
	commonTitlePrefix: string;
	commonTags: string[];
};

export type AlbumSettings = {
	maxPhotosPerGuest: number;
	allowDownloads: boolean;
	requireApproval: boolean;
};

export type MediaCenterTabValue =
	| "albums"
	| "gallery"
	| "upload"
	| "live-feed"
	| "photo-booth";

export type MediaCenterTabComponentProps = {
	mediaCenterSlug: string | null;
	slug: string | null;
};

export type AlbumCardProps = {
	album: MediaCenterAlbum;
	onEdit: (id: string) => void;
	onDelete: (id: string) => void;
	onView: (id: string) => void;
};

export type PhotoCardProps = {
	photo: MediaCenterPhoto;
	onLike: (id: string) => void;
	onDownload: (id: string) => void;
	onDelete: (id: string) => void;
};

export type CreateAlbumModalProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSubmit: (data: Partial<MediaCenterAlbum>) => void;
	isSubAlbum?: boolean;
	parentAlbumName?: string | null;
	parentAlbumSettings?: {
		maxPhotosPerGuest: number;
		allowDownloads: boolean;
		requireApproval: boolean;
	} | null;
};

export type UploadModalProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	albums: MediaCenterAlbum[];
	onUpload: (data: UploadFormData, files: File[]) => void;
};

// Photo Booth Types
export type PhotoBoothPhoto = {
	id: string;
	url: string;
	filter: string;
	frame: string;
	timestamp: string;
};

export type PhotoBoothFilter = {
	id: string;
	name: string;
	icon: React.ComponentType<{ className?: string }>;
	active: boolean;
};

export type PhotoBoothFrame = {
	id: string;
	name: string;
	icon: React.ComponentType<{ className?: string }>;
	active: boolean;
};

// Live Feed Types
export type LiveFeedPhoto = {
	id: string;
	url: string;
	thumbnailUrl: string;
	uploadedBy: {
		id: string;
		name: string;
		avatar: string | null;
	};
	uploadedAt: string;
	category: string;
	likes: number;
	comments: number;
	isNew: boolean;
	tags: string[];
};

export type FeedStats = {
	totalPhotos: number;
	newPhotos: number;
	lastUpdated: number;
};
