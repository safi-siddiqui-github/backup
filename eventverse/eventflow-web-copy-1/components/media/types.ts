
export interface MainAlbum {
  id: string;
  name: string;
  description: string;
  eventId: string;
  coverImage?: string;
  created: Date;
  isActive: boolean;
  settings: AlbumSettings;
  subAlbums: SubAlbum[];
  totalPhotos: number;
  totalVideos: number;
  totalContributors: number;
}

export interface SubAlbum {
  id: string;
  name: string;
  description: string;
  mainAlbumId: string;
  coverImage?: string;
  photoCount: number;
  videoCount: number;
  contributors: number;
  created: Date;
  isActive: boolean;
  settings: SubAlbumSettings;
}

export interface AlbumSettings {
  maxPhotosPerGuest: number;
  allowDownloads: boolean;
  requireApproval: boolean;
  allowedFileTypes: string[];
  maxFileSize: number; // in MB
  isPublic: boolean;
}

export interface SubAlbumSettings {
  maxPhotosPerGuest: number;
  allowDownloads: boolean;
  isActive: boolean;
}

export interface GuestUploadSession {
  guestId: string;
  eventId: string;
  mainAlbumId: string;
  currentSubAlbumId?: string;
  totalUploaded: number;
  remainingQuota: number;
  uploads: GuestUpload[];
  sessionStart: Date;
}

export interface GuestUpload {
  id: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  subAlbumId: string;
  uploadedAt: Date;
  status: 'pending' | 'approved' | 'rejected';
  thumbnail?: string;
}

export interface QRCodeConfig {
  id: string;
  eventId: string;
  mainAlbumId: string;
  url: string;
  isActive: boolean;
  scans: number;
  created: Date;
}
