import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  Search, 
  Camera, 
  Upload, 
  Sparkles, 
  User, 
  Loader2,
  Image as ImageIcon,
  Tag,
  Clock
} from "lucide-react";
import { EnhancedPhoto, SearchQuery, AISearchResult } from "@/types/ai-photo";
import { aiPhotoProcessor } from "@/utils/aiPhotoProcessor";
import { faceRecognition } from "@/utils/faceRecognition";

interface AIPhotoSearchProps {
  eventId: string;
  photos: EnhancedPhoto[];
  onResultsFound: (results: EnhancedPhoto[]) => void;
}

const AIPhotoSearch = ({ eventId, photos, onResultsFound }: AIPhotoSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchProgress, setSearchProgress] = useState(0);
  const [searchResults, setSearchResults] = useState<EnhancedPhoto[]>([]);
  const [activeSearchType, setActiveSearchType] = useState<"text" | "face">("text");
  const [referenceImage, setReferenceImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCapturingCamera, setIsCapturingCamera] = useState(false);
  
  const { toast } = useToast();

  const handleTextSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Enter search query",
        description: "Please enter what you want to find in the photos",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    setSearchProgress(0);

    try {
      toast({
        title: "AI Search Started",
        description: "Analyzing photos with AI...",
      });

      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setSearchProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      const results = await aiPhotoProcessor.searchBySemantic(searchQuery, photos);
      
      clearInterval(progressInterval);
      setSearchProgress(100);
      
      setSearchResults(results);
      onResultsFound(results);
      
      toast({
        title: "Search Complete",
        description: `Found ${results.length} matching photos`,
      });
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Search Failed",
        description: "There was an error processing your search",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
      setSearchProgress(0);
    }
  };

  const handleFaceSearch = async () => {
    if (!referenceImage) {
      toast({
        title: "Upload reference photo",
        description: "Please upload a photo or take a selfie to find similar faces",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    setSearchProgress(0);

    try {
      toast({
        title: "Face Recognition Started",
        description: "Analyzing faces in photos...",
      });

      const progressInterval = setInterval(() => {
        setSearchProgress(prev => Math.min(prev + 5, 90));
      }, 300);

      const img = await faceRecognition.loadImage(referenceImage);
      const results = await faceRecognition.findSimilarFaces(img, photos);
      
      clearInterval(progressInterval);
      setSearchProgress(100);
      
      setSearchResults(results);
      onResultsFound(results);
      
      toast({
        title: "Face Search Complete",
        description: `Found ${results.length} photos with similar faces`,
      });
    } catch (error) {
      console.error('Face search error:', error);
      toast({
        title: "Face Search Failed",
        description: error instanceof Error ? error.message : "There was an error processing face recognition",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
      setSearchProgress(0);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setReferenceImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const startCamera = async () => {
    try {
      setIsCapturingCamera(true);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error('Camera error:', error);
      toast({
        title: "Camera Error",
        description: "Could not access camera",
        variant: "destructive",
      });
      setIsCapturingCamera(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const ctx = canvas.getContext('2d')!;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
          setReferenceImage(file);
          setPreviewUrl(canvas.toDataURL());
          stopCamera();
        }
      }, 'image/jpeg', 0.8);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCapturingCamera(false);
  };

  const suggestedQueries = [
    "people wearing red dress",
    "man in black suit",
    "person holding bottle",
    "group photo",
    "outdoor scenery",
    "food on table",
    "dancing people",
    "stage performance"
  ];

  return (
    <div className="space-y-6">
      {/* AI Search Header */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            AI-Powered Photo Search
          </CardTitle>
          <p className="text-sm text-gray-600">
            Find photos using natural language or face recognition
          </p>
        </CardHeader>
      </Card>

      {/* Search Interface */}
      <Card>
        <CardContent className="p-6">
          <Tabs value={activeSearchType} onValueChange={(value) => setActiveSearchType(value as "text" | "face")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="text" className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                Text Search
              </TabsTrigger>
              <TabsTrigger value="face" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Face Search
              </TabsTrigger>
            </TabsList>

            {/* Text Search */}
            <TabsContent value="text" className="mt-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Describe what you're looking for</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="e.g., people wearing red dresses, man holding bottle..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleTextSearch()}
                    disabled={isSearching}
                  />
                  <Button 
                    onClick={handleTextSearch} 
                    disabled={isSearching || !searchQuery.trim()}
                    className="min-w-[100px]"
                  >
                    {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                    Search
                  </Button>
                </div>
              </div>

              {/* Suggested Queries */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Quick suggestions:</label>
                <div className="flex flex-wrap gap-2">
                  {suggestedQueries.map((query) => (
                    <Badge
                      key={query}
                      variant="secondary"
                      className="cursor-pointer hover:bg-purple-100"
                      onClick={() => setSearchQuery(query)}
                    >
                      {query}
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Face Search */}
            <TabsContent value="face" className="mt-6 space-y-4">
              <div className="space-y-4">
                <label className="text-sm font-medium">Upload a reference photo or take a selfie</label>
                
                {/* Reference Image Preview */}
                {previewUrl && (
                  <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-dashed border-gray-300">
                    <img 
                      src={previewUrl} 
                      alt="Reference" 
                      className="w-full h-full object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-1 right-1"
                      onClick={() => {
                        setReferenceImage(null);
                        setPreviewUrl(null);
                      }}
                    >
                      ×
                    </Button>
                  </div>
                )}

                {/* Camera View */}
                {isCapturingCamera && (
                  <div className="space-y-4">
                    <video
                      ref={videoRef}
                      className="w-full max-w-md rounded-lg"
                      autoPlay
                      muted
                      playsInline
                    />
                    <div className="flex gap-2">
                      <Button onClick={capturePhoto} variant="default">
                        <Camera className="w-4 h-4 mr-2" />
                        Capture
                      </Button>
                      <Button onClick={stopCamera} variant="outline">
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}

                {/* Upload/Camera Buttons */}
                {!isCapturingCamera && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Photo
                    </Button>
                    <Button
                      variant="outline"
                      onClick={startCamera}
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Take Selfie
                    </Button>
                    <Button 
                      onClick={handleFaceSearch} 
                      disabled={isSearching || !referenceImage}
                      className="min-w-[100px]"
                    >
                      {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                      Find Faces
                    </Button>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                
                <canvas ref={canvasRef} className="hidden" />
              </div>
            </TabsContent>
          </Tabs>

          {/* Progress Bar */}
          {isSearching && (
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Processing photos with AI...</span>
                <span>{searchProgress}%</span>
              </div>
              <Progress value={searchProgress} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Search Results Summary */}
      {searchResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              Search Results ({searchResults.length} photos found)
            </CardTitle>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Tag className="w-4 h-4" />
                <span>Query: "{searchQuery || "Face match"}"</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>Search type: {activeSearchType === 'text' ? 'Semantic' : 'Face Recognition'}</span>
              </div>
            </div>
          </CardHeader>
        </Card>
      )}
    </div>
  );
};

export default AIPhotoSearch;