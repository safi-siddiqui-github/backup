import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Camera, Upload, X, Image, Play, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface PhotoData {
  id: string;
  url: string;
  file?: File;
  type: 'image' | 'video';
  isUploaded: boolean;
}

interface Props {
  mainPhoto: string | null;
  onPhotoUpdate: (photoId: string | null) => void;
  className?: string;
}

const CompactPhotoUpload = ({ mainPhoto, onPhotoUpdate, className }: Props) => {
  const [uploadedPhoto, setUploadedPhoto] = useState<PhotoData | null>(
    mainPhoto ? { id: 'main', url: mainPhoto, type: 'image', isUploaded: true } : null
  );
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    const file = files[0];
    const isVideo = file.type.startsWith('video/');
    const isImage = file.type.startsWith('image/');
    
    if (!isImage && !isVideo) return;

    // Create preview URL
    const url = URL.createObjectURL(file);
    const photoData: PhotoData = {
      id: `photo_${Date.now()}`,
      url,
      file,
      type: isVideo ? 'video' : 'image',
      isUploaded: false
    };

    setUploadedPhoto(photoData);
    onPhotoUpdate(photoData.id);

    // Simulate upload
    setTimeout(() => {
      setUploadedPhoto(prev => prev ? { ...prev, isUploaded: true } : null);
    }, 1500);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removePhoto = () => {
    if (uploadedPhoto?.url) {
      URL.revokeObjectURL(uploadedPhoto.url);
    }
    setUploadedPhoto(null);
    onPhotoUpdate(null);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center gap-2">
        <Label className="text-base font-semibold">Main Event Photo/Video</Label>
        <Badge variant="outline" className="text-xs">Optional</Badge>
      </div>

      {!uploadedPhoto ? (
        <Card className={cn(
          "border-2 border-dashed transition-colors cursor-pointer hover:border-purple-300",
          isDragging ? "border-purple-500 bg-purple-50" : "border-gray-300"
        )}>
          <CardContent 
            className="p-8 text-center"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="p-3 bg-gray-100 rounded-full">
                  <Image className="w-8 h-8 text-gray-600" />
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Add your main event photo or video
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Drag and drop or click to browse • Images or videos up to 50MB
                </p>
              </div>

              <div className="flex justify-center gap-2">
                <Button variant="outline" size="sm" type="button">
                  <Camera className="w-4 h-4 mr-2" />
                  Choose File
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <div className="relative group">
                {uploadedPhoto.type === 'video' ? (
                  <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                    <video 
                      src={uploadedPhoto.url}
                      className="w-full h-full object-cover"
                      muted
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                  </div>
                ) : (
                  <img
                    src={uploadedPhoto.url}
                    alt="Main event photo"
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                )}
                
                <div className="absolute -top-2 -right-2">
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800 text-xs">
                    <Star className="w-3 h-3 mr-1" />
                    Main
                  </Badge>
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">
                  {uploadedPhoto.type === 'video' ? 'Event Video' : 'Event Photo'}
                </p>
                <p className="text-sm text-gray-500">
                  {uploadedPhoto.isUploaded ? 'Uploaded successfully' : 'Uploading...'}
                </p>
                {!uploadedPhoto.isUploaded && (
                  <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                    <div className="bg-purple-600 h-1 rounded-full animate-pulse" style={{ width: '60%' }} />
                  </div>
                )}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={removePhoto}
                className="text-gray-400 hover:text-red-500"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        onChange={(e) => handleFileSelect(e.target.files)}
        className="hidden"
      />

      {uploadedPhoto && (
        <p className="text-xs text-gray-500">
          This will be the main image shown on your event card. You can add more photos in the Event Photos step.
        </p>
      )}
    </div>
  );
};

export default CompactPhotoUpload;