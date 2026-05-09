// AI-enhanced photo types
export interface DetectedObject {
  label: string;
  confidence: number;
  boundingBox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface AIPhotoMetadata {
  aiTags: string[];
  faceEmbeddings: number[][];
  clipEmbedding: number[];
  detectedObjects: DetectedObject[];
  colorPalette: string[];
  sceneType: string;
  confidence: number;
  processedAt: Date;
}

export interface EnhancedPhoto {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
  uploader: string;
  timestamp: Date;
  tags: string[];
  likes: number;
  album?: string;
  aiMetadata?: AIPhotoMetadata;
}

export interface AISearchResult {
  photo: EnhancedPhoto;
  similarity: number;
  matchType: 'semantic' | 'face' | 'object' | 'color';
  matchDetails: string;
}

export interface SearchQuery {
  type: 'text' | 'face' | 'image';
  query: string;
  referenceImage?: File;
  filters?: {
    album?: string;
    dateRange?: {
      start: Date;
      end: Date;
    };
    minConfidence?: number;
  };
}