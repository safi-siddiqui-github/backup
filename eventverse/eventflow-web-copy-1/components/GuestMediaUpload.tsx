"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Guest } from "@/types/rsvp";
import { Camera, CheckCircle, Heart, Image, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { EventFormData } from "./EnhancedEventCreationDialog";

interface GuestMediaUploadProps {
  // event: { couple: string };
  // guest: { name: string };
  event: Partial<EventFormData>;
  guest: Partial<Guest>;
}

const GuestMediaUpload = ({ event, guest }: GuestMediaUploadProps) => {
  const [uploadedPhotos, setUploadedPhotos] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const maxPhotos = 10;
  const remainingUploads = maxPhotos - uploadedPhotos.length;

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files);
    if (newFiles.length > remainingUploads) {
      toast({
        title: "Upload limit exceeded",
        description: `You can only upload ${remainingUploads} more photo(s).`,
        variant: "destructive",
      });
      return;
    }

    setUploadedPhotos((prev) => [...prev, ...newFiles]);
    toast({
      title: "Photos added!",
      description: `${newFiles.length} photo(s) ready to upload.`,
    });
  };

  const removePhoto = (index: number) => {
    setUploadedPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (uploadedPhotos.length === 0) return;

    setIsUploading(true);

    // Simulate upload process
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsUploading(false);
    toast({
      title: "Photos uploaded successfully!",
      description: `${uploadedPhotos.length} photo(s) added to the wedding album.`,
    });

    // Clear uploaded photos
    setUploadedPhotos([]);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Card className="border-0 bg-gradient-to-r from-rose-500 to-purple-600 text-white">
        <CardContent className="p-6 text-center">
          <Camera className="mx-auto mb-3 h-12 w-12" />
          <h2 className="mb-2 text-2xl font-bold">Share Your Memories</h2>
          <p className="opacity-90">
            Upload photos to {event.couple}&apos;s wedding album
          </p>
        </CardContent>
      </Card>

      {/* Upload Stats */}
      <Card className="border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-semibold">Your Upload Quota</span>
              <p className="text-sm text-gray-600">
                Share your favorite moments from the celebration
              </p>
            </div>
            <Badge variant={remainingUploads > 5 ? "default" : "destructive"}>
              {remainingUploads} remaining
            </Badge>
          </div>
          <div className="mt-3 h-2 w-full rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-rose-500 transition-all"
              style={{
                width: `${((maxPhotos - remainingUploads) / maxPhotos) * 100}%`,
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Upload Interface */}
      {remainingUploads > 0 && (
        <Card className="border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Upload Photos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Upload Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="h-24 flex-col border-2 border-dashed"
                disabled={isUploading || remainingUploads === 0}
              >
                <Upload className="mb-2 h-8 w-8" />
                <span>Choose Photos</span>
                <span className="text-xs text-gray-500">From your device</span>
              </Button>
              <Button
                onClick={() => cameraInputRef.current?.click()}
                variant="outline"
                className="h-24 flex-col border-2 border-dashed"
                disabled={isUploading || remainingUploads === 0}
              >
                <Camera className="mb-2 h-8 w-8" />
                <span>Take Photo</span>
                <span className="text-xs text-gray-500">Use camera</span>
              </Button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileSelect(e.target.files)}
            />
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(e) => handleFileSelect(e.target.files)}
            />

            {/* Photo Queue */}
            {uploadedPhotos.length > 0 && (
              <div className="space-y-4">
                <h4 className="font-medium">
                  Ready to Upload ({uploadedPhotos.length})
                </h4>
                <div className="grid grid-cols-3 gap-3 md:grid-cols-4">
                  {uploadedPhotos.map((file, index) => (
                    <div
                      key={index}
                      className="group relative"
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Upload ${index + 1}`}
                        className="h-24 w-full rounded border object-cover"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 transition-opacity group-hover:opacity-100"
                        onClick={() => removePhoto(index)}
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={handleUpload}
                  className="w-full bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700"
                  disabled={isUploading}
                >
                  {isUploading
                    ? "Uploading..."
                    : `Upload ${uploadedPhotos.length} Photo(s)`}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Album Preview */}
      <Card className="border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="h-5 w-5" />
            Wedding Album Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3 md:grid-cols-4">
            {/* Mock existing photos */}
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <div
                key={index}
                className="relative"
              >
                <div className="flex h-24 w-full items-center justify-center rounded border bg-gradient-to-br from-rose-100 to-purple-100">
                  <Heart className="h-6 w-6 text-rose-400" />
                </div>
                <div className="absolute right-1 bottom-1">
                  <div className="rounded bg-black/50 px-1 text-xs text-white">
                    Guest Photo
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-sm text-gray-600">
            Photos from all guests will appear here throughout the celebration
          </p>
        </CardContent>
      </Card>

      {/* Guidelines */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-800">Photo Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="text-blue-700">
          <ul className="space-y-2 text-sm">
            <li>• Maximum {maxPhotos} photos per guest</li>
            <li>• Photos will be visible to all wedding guests</li>
            <li>• Please keep photos appropriate for all audiences</li>
            <li>• High-quality images are preferred</li>
            <li>• Photos may be used in the couple&apos;s wedding album</li>
          </ul>
        </CardContent>
      </Card>

      {/* Upload Complete State */}
      {remainingUploads === 0 && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6 text-center">
            <CheckCircle className="mx-auto mb-3 h-12 w-12 text-green-600" />
            <h3 className="mb-2 text-lg font-semibold text-green-800">
              Upload Limit Reached
            </h3>
            <p className="text-green-700">
              Thank you for sharing your memories! You&apos;ve uploaded all{" "}
              {maxPhotos} of your allocated photos.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GuestMediaUpload;
