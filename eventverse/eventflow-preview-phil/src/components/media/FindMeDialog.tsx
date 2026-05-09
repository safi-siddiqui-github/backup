import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Camera, Upload, Loader2, X } from "lucide-react";
import { EnhancedPhoto } from "@/types/ai-photo";
import { faceRecognition } from "@/utils/faceRecognition";

interface FindMeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  photos: EnhancedPhoto[];
  onResultsFound: (results: EnhancedPhoto[], referenceImage: File) => void;
}

const FindMeDialog = ({
  open,
  onOpenChange,
  photos,
  onResultsFound,
}: FindMeDialogProps) => {
  const [referenceImage, setReferenceImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isCapturingCamera, setIsCapturingCamera] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setReferenceImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const startCamera = async () => {
    try {
      setIsCapturingCamera(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error("Camera error:", error);
      toast({
        title: "Camera Error",
        description: "Could not access camera. Please check permissions.",
        variant: "destructive",
      });
      setIsCapturingCamera(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const ctx = canvas.getContext("2d")!;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const file = new File([blob], "selfie.jpg", {
              type: "image/jpeg",
            });
            setReferenceImage(file);
            setPreviewUrl(canvas.toDataURL());
            stopCamera();
          }
        },
        "image/jpeg",
        0.8
      );
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCapturingCamera(false);
  };

  const handleSearch = async () => {
    if (!referenceImage) {
      toast({
        title: "No photo selected",
        description: "Please upload a photo or take a selfie",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);

    try {
      toast({
        title: "Analyzing your photo...",
        description: "Using AI to find matching faces",
      });

      const img = await faceRecognition.loadImage(referenceImage);
      const results = await faceRecognition.findSimilarFaces(img, photos);

      toast({
        title: "Search Complete!",
        description: `Found ${results.length} photos with matching faces`,
      });

      onResultsFound(results, referenceImage);
      onOpenChange(false);
    } catch (error) {
      console.error("Face search error:", error);
      toast({
        title: "Search Failed",
        description:
          error instanceof Error
            ? error.message
            : "Could not complete face recognition",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const clearImage = () => {
    setReferenceImage(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClose = () => {
    stopCamera();
    clearImage();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Find Me in Photos</DialogTitle>
          <DialogDescription>
            Upload a clear photo of your face or take a selfie to find all
            photos you appear in
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Preview Image */}
          {previewUrl && !isCapturingCamera && (
            <div className="relative w-full aspect-square rounded-lg overflow-hidden border-2 border-dashed border-border">
              <img
                src={previewUrl}
                alt="Reference"
                className="w-full h-full object-cover"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={clearImage}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Camera View */}
          {isCapturingCamera && (
            <div className="space-y-4">
              <video
                ref={videoRef}
                className="w-full rounded-lg"
                autoPlay
                muted
                playsInline
              />
              <div className="flex gap-2">
                <Button onClick={capturePhoto} className="flex-1">
                  <Camera className="w-4 h-4 mr-2" />
                  Capture
                </Button>
                <Button onClick={stopCamera} variant="outline" className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Upload/Camera Buttons */}
          {!isCapturingCamera && !previewUrl && (
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="w-full"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Photo
              </Button>
              <Button variant="outline" onClick={startCamera} className="w-full">
                <Camera className="w-4 h-4 mr-2" />
                Take Selfie
              </Button>
            </div>
          )}

          {/* Search Button */}
          {previewUrl && !isCapturingCamera && (
            <div className="flex gap-2">
              <Button
                onClick={handleSearch}
                disabled={isSearching}
                className="flex-1"
              >
                {isSearching ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Searching...
                  </>
                ) : (
                  "Search for Me"
                )}
              </Button>
              <Button variant="outline" onClick={clearImage}>
                Change Photo
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
      </DialogContent>
    </Dialog>
  );
};

export default FindMeDialog;
