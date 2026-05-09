import { pipeline } from '@huggingface/transformers';
import { EnhancedPhoto } from '@/types/ai-photo';

class FaceRecognitionService {
  private faceDetector: any = null;
  private isInitialized = false;

  async initialize() {
    if (this.isInitialized) return;
    
    try {
      console.log('Initializing face detection model...');
      this.faceDetector = await pipeline(
        'object-detection',
        'Xenova/yolov8n-face',
        { device: 'webgpu' }
      );
      this.isInitialized = true;
      console.log('Face detection model initialized');
    } catch (error) {
      console.error('Failed to initialize face detection:', error);
      throw error;
    }
  }

  async detectFaces(imageElement: HTMLImageElement): Promise<number[][]> {
    await this.initialize();
    
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      canvas.width = imageElement.naturalWidth;
      canvas.height = imageElement.naturalHeight;
      ctx.drawImage(imageElement, 0, 0);
      
      const imageData = canvas.toDataURL('image/jpeg', 0.8);
      const detections = await this.faceDetector(imageData);
      
      // Extract face embeddings (simplified - in reality would use a face recognition model)
      const faceEmbeddings: number[][] = [];
      
      for (const detection of detections) {
        if (detection.score > 0.5) { // Only confident face detections
          // Extract face region and create embedding
          const faceEmbedding = await this.extractFaceEmbedding(
            canvas, 
            detection.box,
            ctx
          );
          faceEmbeddings.push(faceEmbedding);
        }
      }
      
      return faceEmbeddings;
    } catch (error) {
      console.error('Error detecting faces:', error);
      return [];
    }
  }

  async extractFaceEmbedding(
    canvas: HTMLCanvasElement, 
    box: any, 
    ctx: CanvasRenderingContext2D
  ): Promise<number[]> {
    // Create a simplified face embedding based on face region
    const faceCanvas = document.createElement('canvas');
    const faceCtx = faceCanvas.getContext('2d')!;
    
    const width = box.xmax - box.xmin;
    const height = box.ymax - box.ymin;
    
    faceCanvas.width = 128;
    faceCanvas.height = 128;
    
    // Draw and resize face region
    faceCtx.drawImage(
      canvas,
      box.xmin, box.ymin, width, height,
      0, 0, 128, 128
    );
    
    // Generate a simple embedding from face pixel data
    const imageData = faceCtx.getImageData(0, 0, 128, 128);
    const data = imageData.data;
    const embedding: number[] = [];
    
    // Sample every 16th pixel to create a 1024-dimensional embedding
    for (let i = 0; i < data.length; i += 64) {
      const r = data[i] / 255;
      const g = data[i + 1] / 255;
      const b = data[i + 2] / 255;
      embedding.push((r + g + b) / 3);
    }
    
    // Normalize the embedding
    const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
    return embedding.map(val => magnitude === 0 ? 0 : val / magnitude);
  }

  async findSimilarFaces(
    referenceImage: HTMLImageElement, 
    photos: EnhancedPhoto[]
  ): Promise<EnhancedPhoto[]> {
    try {
      // Get face embeddings from reference image
      const referenceFaces = await this.detectFaces(referenceImage);
      
      if (referenceFaces.length === 0) {
        throw new Error('No faces detected in reference image');
      }
      
      const referenceEmbedding = referenceFaces[0]; // Use first detected face
      const similarPhotos: { photo: EnhancedPhoto; similarity: number }[] = [];
      
      // Compare with all photos that have face embeddings
      for (const photo of photos) {
        if (!photo.aiMetadata?.faceEmbeddings || photo.aiMetadata.faceEmbeddings.length === 0) {
          continue;
        }
        
        // Find best matching face in this photo
        let bestSimilarity = 0;
        for (const faceEmbedding of photo.aiMetadata.faceEmbeddings) {
          const similarity = this.calculateFaceSimilarity(referenceEmbedding, faceEmbedding);
          bestSimilarity = Math.max(bestSimilarity, similarity);
        }
        
        if (bestSimilarity > 0.7) { // Similarity threshold for face matching
          similarPhotos.push({ photo, similarity: bestSimilarity });
        }
      }
      
      // Sort by similarity and return photos
      return similarPhotos
        .sort((a, b) => b.similarity - a.similarity)
        .map(result => result.photo);
    } catch (error) {
      console.error('Error finding similar faces:', error);
      return [];
    }
  }

  calculateFaceSimilarity(embedding1: number[], embedding2: number[]): number {
    if (embedding1.length !== embedding2.length) return 0;
    
    let dotProduct = 0;
    let norm1 = 0;
    let norm2 = 0;
    
    for (let i = 0; i < embedding1.length; i++) {
      dotProduct += embedding1[i] * embedding2[i];
      norm1 += embedding1[i] * embedding1[i];
      norm2 += embedding2[i] * embedding2[i];
    }
    
    const magnitude = Math.sqrt(norm1) * Math.sqrt(norm2);
    return magnitude === 0 ? 0 : dotProduct / magnitude;
  }

  loadImage(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  }
}

export const faceRecognition = new FaceRecognitionService();