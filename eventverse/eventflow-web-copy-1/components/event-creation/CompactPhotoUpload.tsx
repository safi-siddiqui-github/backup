"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Camera, Image, Play, Star, X } from "lucide-react";
import { useRef, useState } from "react";

interface PhotoData {
  id: string;
  url: string;
  file?: File;
  type: "image" | "video";
  isUploaded: boolean;
}

interface Props {
  mainPhoto: string | null;
  onPhotoUpdate: (photoId: string | null) => void;
  className?: string;
}

const CompactPhotoUpload = ({ mainPhoto, onPhotoUpdate, className }: Props) => {
  const [uploadedPhoto, setUploadedPhoto] = useState<PhotoData | null>(
    mainPhoto
      ? { id: "main", url: mainPhoto, type: "image", isUploaded: true }
      : null,
  );
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    const isVideo = file.type.startsWith("video/");
    const isImage = file.type.startsWith("image/");

    if (!isImage && !isVideo) return;

    // Create preview URL
    const url = URL.createObjectURL(file);
    const photoData: PhotoData = {
      id: `photo_${Date.now()}`,
      url,
      file,
      type: isVideo ? "video" : "image",
      isUploaded: false,
    };

    setUploadedPhoto(photoData);
    onPhotoUpdate(photoData.id);

    // Simulate upload
    setTimeout(() => {
      setUploadedPhoto((prev) => (prev ? { ...prev, isUploaded: true } : null));
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
        <Label className="text-base font-semibold">
          Main Event Photo/Video
        </Label>
        <Badge
          variant="outline"
          className="text-xs"
        >
          Optional
        </Badge>
      </div>

      {!uploadedPhoto ? (
        <Card
          className={cn(
            "cursor-pointer border-2 border-dashed transition-colors hover:border-purple-300",
            isDragging ? "border-purple-500 bg-purple-50" : "border-gray-300",
          )}
        >
          <CardContent
            className="p-8 text-center"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="rounded-full bg-gray-100 p-3">
                  <Image className="h-8 w-8 text-gray-600" />
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700">
                  Add your main event photo or video
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Drag and drop or click to browse • Images or videos up to 50MB
                </p>
              </div>

              <div className="flex justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                >
                  <Camera className="mr-2 h-4 w-4" />
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
              <div className="group relative">
                {uploadedPhoto.type === "video" ? (
                  <div className="relative h-20 w-20 overflow-hidden rounded-lg bg-gray-100">
                    <video
                      src={uploadedPhoto.url}
                      className="h-full w-full object-cover"
                      muted
                    />
                    <div className="bg-opacity-40 absolute inset-0 flex items-center justify-center bg-black">
                      <Play className="h-6 w-6 text-white" />
                    </div>
                  </div>
                ) : (
                  <img
                    src={uploadedPhoto.url}
                    alt="Main event photo"
                    className="h-20 w-20 rounded-lg object-cover"
                  />
                )}

                <div className="absolute -top-2 -right-2">
                  <Badge
                    variant="secondary"
                    className="bg-purple-100 text-xs text-purple-800"
                  >
                    <Star className="mr-1 h-3 w-3" />
                    Main
                  </Badge>
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-gray-900">
                  {uploadedPhoto.type === "video"
                    ? "Event Video"
                    : "Event Photo"}
                </p>
                <p className="text-sm text-gray-500">
                  {uploadedPhoto.isUploaded
                    ? "Uploaded successfully"
                    : "Uploading..."}
                </p>
                {!uploadedPhoto.isUploaded && (
                  <div className="mt-2 h-1 w-full rounded-full bg-gray-200">
                    <div
                      className="h-1 animate-pulse rounded-full bg-purple-600"
                      style={{ width: "60%" }}
                    />
                  </div>
                )}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={removePhoto}
                className="text-gray-400 hover:text-red-500"
              >
                <X className="h-4 w-4" />
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
          This will be the main image shown on your event card. You can add more
          photos in the Event Photos step.
        </p>
      )}
    </div>
  );
};

export default CompactPhotoUpload;
