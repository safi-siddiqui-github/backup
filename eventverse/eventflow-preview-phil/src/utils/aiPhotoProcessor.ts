import { pipeline, env } from '@huggingface/transformers';
import { EnhancedPhoto, AIPhotoMetadata, DetectedObject } from '@/types/ai-photo';

// Configure transformers.js for browser use
env.allowLocalModels = false;
env.useBrowserCache = true;

class AIPhotoProcessor {
  private clipModel: any = null;
  private objectDetector: any = null;
  private isInitialized = false;

  async initialize() {
    if (this.isInitialized) return;
    
    try {
      console.log('Initializing AI models...');
      
      // Initialize CLIP for semantic search
      this.clipModel = await pipeline(
        'feature-extraction',
        'Xenova/clip-vit-base-patch32',
        { device: 'webgpu' }
      );

      // Initialize object detection
      this.objectDetector = await pipeline(
        'object-detection',
        'Xenova/yolos-tiny',
        { device: 'webgpu' }
      );

      this.isInitialized = true;
      console.log('AI models initialized successfully');
    } catch (error) {
      console.error('Failed to initialize AI models:', error);
      throw error;
    }
  }

  async processPhoto(imageElement: HTMLImageElement): Promise<AIPhotoMetadata> {
    await this.initialize();

    try {
      console.log('Processing photo with AI...');
      
      // Convert image to canvas for processing
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      canvas.width = imageElement.naturalWidth;
      canvas.height = imageElement.naturalHeight;
      ctx.drawImage(imageElement, 0, 0);
      
      const imageData = canvas.toDataURL('image/jpeg', 0.8);

      // Process with CLIP for semantic embeddings
      const clipEmbedding = await this.getImageEmbedding(imageData);
      
      // Detect objects
      const detectedObjects = await this.detectObjects(imageData);
      
      // Extract dominant colors
      const colorPalette = this.extractColors(ctx, canvas.width, canvas.height);
      
      // Generate AI tags from detected objects
      const aiTags = detectedObjects.map(obj => obj.label);
      
      // Classify scene type
      const sceneType = this.classifyScene(aiTags);

      return {
        aiTags: [...new Set(aiTags)], // Remove duplicates
        faceEmbeddings: [], // Will be populated by face detection
        clipEmbedding,
        detectedObjects,
        colorPalette,
        sceneType,
        confidence: this.calculateOverallConfidence(detectedObjects),
        processedAt: new Date()
      };
    } catch (error) {
      console.error('Error processing photo:', error);
      throw error;
    }
  }

  async getImageEmbedding(imageData: string): Promise<number[]> {
    const result = await this.clipModel(imageData);
    return Array.from(result.data as number[]);
  }

  async detectObjects(imageData: string): Promise<DetectedObject[]> {
    const results = await this.objectDetector(imageData);
    return results.map((result: any) => ({
      label: result.label,
      confidence: result.score,
      boundingBox: {
        x: result.box.xmin,
        y: result.box.ymin,
        width: result.box.xmax - result.box.xmin,
        height: result.box.ymax - result.box.ymin
      }
    }));
  }

  extractColors(ctx: CanvasRenderingContext2D, width: number, height: number): string[] {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    const colorCounts: { [key: string]: number } = {};
    
    // Sample every 10th pixel for performance
    for (let i = 0; i < data.length; i += 40) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const alpha = data[i + 3];
      
      if (alpha > 128) { // Only count non-transparent pixels
        const color = `rgb(${r},${g},${b})`;
        colorCounts[color] = (colorCounts[color] || 0) + 1;
      }
    }
    
    // Return top 5 most common colors
    return Object.entries(colorCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([color]) => color);
  }

  classifyScene(tags: string[]): string {
    const outdoorKeywords = ['tree', 'sky', 'car', 'building', 'street', 'grass', 'mountain'];
    const indoorKeywords = ['chair', 'table', 'couch', 'bed', 'kitchen', 'room'];
    const eventKeywords = ['person', 'people', 'crowd', 'stage', 'microphone', 'food'];
    
    const outdoorScore = tags.filter(tag => outdoorKeywords.some(keyword => tag.includes(keyword))).length;
    const indoorScore = tags.filter(tag => indoorKeywords.some(keyword => tag.includes(keyword))).length;
    const eventScore = tags.filter(tag => eventKeywords.some(keyword => tag.includes(keyword))).length;
    
    if (eventScore > 2) return 'event';
    if (outdoorScore > indoorScore) return 'outdoor';
    if (indoorScore > 0) return 'indoor';
    return 'unknown';
  }

  calculateOverallConfidence(detectedObjects: DetectedObject[]): number {
    if (detectedObjects.length === 0) return 0;
    const avgConfidence = detectedObjects.reduce((sum, obj) => sum + obj.confidence, 0) / detectedObjects.length;
    return Math.round(avgConfidence * 100) / 100;
  }

  async searchBySemantic(query: string, photos: EnhancedPhoto[]): Promise<EnhancedPhoto[]> {
    await this.initialize();
    
    try {
      // Get text embedding for query
      const textModel = await pipeline(
        'feature-extraction',
        'Xenova/clip-vit-base-patch32',
        { device: 'webgpu' }
      );
      
      const queryEmbedding = await textModel(query);
      const queryVector = Array.from(queryEmbedding.data as number[]);
      
      // Calculate similarity with all photos
      const similarities = photos
        .filter(photo => photo.aiMetadata?.clipEmbedding)
        .map(photo => ({
          photo,
          similarity: this.calculateSimilarity(queryVector, photo.aiMetadata!.clipEmbedding)
        }))
        .sort((a, b) => b.similarity - a.similarity)
        .filter(result => result.similarity > 0.3); // Minimum similarity threshold
      
      return similarities.map(result => result.photo);
    } catch (error) {
      console.error('Error in semantic search:', error);
      return [];
    }
  }

  calculateSimilarity(vector1: number[], vector2: number[]): number {
    if (vector1.length !== vector2.length) return 0;
    
    let dotProduct = 0;
    let norm1 = 0;
    let norm2 = 0;
    
    for (let i = 0; i < vector1.length; i++) {
      dotProduct += vector1[i] * vector2[i];
      norm1 += vector1[i] * vector1[i];
      norm2 += vector2[i] * vector2[i];
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

export const aiPhotoProcessor = new AIPhotoProcessor();