"use client";

import { Images } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Camera, Check, Image as ImageIcon, Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useImageStore } from "./imageStore";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { EventFormData } from "../../types/types";


/* ---------------------------- Types ---------------------------- */

export type PhotoData = {
  id: string;
  url: string;
  file?: File;
  title?: string;
  description?: string;
  isUploaded: boolean;
}

type UploadFile = {
  file: File;
  id: string;
  progress: number;
  status: "pending" | "uploading" | "completed" | "error";
  preview: string;
}

type EventPhotoUploadProps = {
  onPhotosUpdate: (photos: PhotoData[]) => void;
  existingPhotos: PhotoData[];
  maxPhotos: number;
}

type Props = {
  formData: EventFormData;
  onUpdate: (data: Partial<EventFormData>) => void;
};

export default function PhotoSection({ formData, onUpdate }: Props) {
  const photos = formData.eventPhotos?.additionalPhotos || [];

  const handlePhotosUpdate = (photos: PhotoData[]) => {
    onUpdate({
      eventPhotos: {
        ...formData.eventPhotos,
        additionalPhotos: photos,
        mainPhoto: photos[0]?.id || null,
      },
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Images className="w-5 h-5 text-primary" />
        <div>
          <h3 className="text-lg font-semibold">Event Photo Collage</h3>
          <p className="text-sm text-muted-foreground">
            Images are saved even if you refresh
          </p>
        </div>
      </div>

      <EventPhotoUpload
        existingPhotos={photos}
        maxPhotos={10}
        onPhotosUpdate={handlePhotosUpdate}
      />
    </div>
  );
}

/* ---------------------------- Component ---------------------------- */
 function EventPhotoUpload  ({
  onPhotosUpdate,
  existingPhotos,
  maxPhotos,
}: EventPhotoUploadProps)  {
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const { images, addImage, removeImage } = useImageStore();

  /* ---------------------------- Hydration & Sync ---------------------------- */

  useEffect(() => {
    const unsub = useImageStore.persist.onFinishHydration(() => setIsHydrated(true));
    if (useImageStore.persist.hasHydrated()) setIsHydrated(true);
    return () => unsub();
  }, []);

  useEffect(() => {
    if (isHydrated && existingPhotos.length === 0 && images.length > 0) {
      const restored: PhotoData[] = images.map((img) => ({
        id: img.id,
        url: img.blob,
        title: img.name.split(".")[0],
        isUploaded: true,
      }));
      onPhotosUpdate(restored);
    }
  }, [isHydrated, images, existingPhotos.length, onPhotosUpdate]);

  /* ---------------------------- Logic ---------------------------- */

  const remainingSlots = maxPhotos - existingPhotos.length;
  const canUploadMore = remainingSlots > 0;

  const handleFileSelect = (files: FileList | null) => {
    if (!files || !canUploadMore) return;

    const selectedFiles = Array.from(files).slice(0, remainingSlots);

    // Zod schema for file size validation (max 1MB)
    const fileSchema = z.instanceof(File).refine(
      (file) => file.size <= 1024 * 1024,
      { message: "Image size must be 1MB or less." }
    );

    let errorShown = false;
    const newFiles: UploadFile[] = selectedFiles
      .filter((file) => file.type.startsWith("image/"))
      .filter((file) => {
        const result = fileSchema.safeParse(file);
        if (!result.success && !errorShown) {
          toast.error(result.error.errors[0].message);
          errorShown = true;
        }
        return result.success;
      })
      .map((file) => ({
        file,
        id: Math.random().toString(36).substr(2, 9),
        progress: 0,
        status: "pending",
        preview: URL.createObjectURL(file),
      }));

    setUploadFiles((prev) => [...prev, ...newFiles]);
  };

  const simulateUpload = (fileId: string) => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress = Math.min(currentProgress + Math.random() * 30, 100);
      setUploadFiles((prev) =>
        prev.map((f) =>
          f.id === fileId
            ? {
                ...f,
                progress: currentProgress,
                status: currentProgress >= 100 ? "completed" : "uploading",
              }
            : f
        )
      );
      if (currentProgress >= 100) clearInterval(interval);
    }, 300);
  };

  const handleUpload = async () => {
    if (uploadFiles.length === 0) return;

    uploadFiles.forEach((file) => {
      if (file.status === "pending") simulateUpload(file.id);
    });

    setTimeout(async () => {
      const newPhotos: PhotoData[] = [];

      for (const f of uploadFiles) {
        // Save to IndexedDB
        const persisted = await addImage(f.file, f.id);
        newPhotos.push({
          id: persisted.id,
          url: persisted.blob,
          file: f.file,
          title: f.file.name.split(".")[0],
          isUploaded: true,
        });
      }

      onPhotosUpdate([...existingPhotos, ...newPhotos]);
      setUploadFiles([]);
    }, 2200);
  };

  const removeExistingPhoto = (id: string) => {
    onPhotosUpdate(existingPhotos.filter((p) => p.id !== id));
    removeImage(id);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  if (!isHydrated) return null;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Upload Photos for Collage</span>
            <span className="text-muted-foreground text-sm font-normal">
              {existingPhotos.length}/{maxPhotos} photos
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Main Progress Bar */}
          <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full bg-purple-600 transition-all duration-500"
              style={{ width: `${(existingPhotos.length / maxPhotos) * 100}%` }}
            />
          </div>

          {canUploadMore ? (
            <div
              className={cn(
                "rounded-lg border-2 border-dashed p-8 text-center transition-colors cursor-pointer",
                isDragging ? "border-purple-500 bg-purple-50" : "border-gray-300 hover:bg-gray-50"
              )}
              onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFileSelect(e.dataTransfer.files); }}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="mx-auto mb-4 h-12 w-12 text-gray-400" />
              <p className="mb-2 text-lg font-medium">Upload photos for your event collage</p>
              <p className="mb-4 text-sm text-gray-600">
                Add multiple photos to create an engaging event page • {remainingSlots} more photo(s) allowed
              </p>
              <div className="flex justify-center gap-2" onClick={(e) => e.stopPropagation()}>
                <Button onClick={() => fileInputRef.current?.click()}>
                  <Upload className="mr-2 h-4 w-4" />
                  Choose Photos
                </Button>
                <Button variant="outline" onClick={() => cameraInputRef.current?.click()}>
                  <Camera className="mr-2 h-4 w-4" />
                  Take Photo
                </Button>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center bg-gray-50 rounded-lg border-2 border-dashed">
              <ImageIcon className="mx-auto mb-4 h-12 w-12 text-gray-400" />
              <p className="mb-2 text-lg font-medium">Maximum photos reached</p>
              <p className="text-sm text-gray-600">Remove some to add more.</p>
            </div>
          )}

          <Input ref={fileInputRef} type="file" multiple accept="image/*" className="hidden" onChange={(e) => handleFileSelect(e.target.files)} />
          <Input ref={cameraInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => handleFileSelect(e.target.files)} />

          {/* Upload Queue */}
          {uploadFiles.length > 0 && (
            <div className="space-y-3 pt-4 border-t">
              <h4 className="font-medium text-sm">Pending Uploads ({uploadFiles.length})</h4>
              {uploadFiles.map((f) => (
                <div key={f.id} className="flex items-center gap-3 rounded-lg border p-3 bg-white shadow-sm">
                  <img src={f.preview} alt="Preview" className="h-12 w-12 rounded-md object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{f.file.name}</p>
                    <p className="text-xs text-muted-foreground">{formatFileSize(f.file.size)}</p>
                    {f.status !== "pending" && <Progress value={f.progress} className="mt-2 h-1.5" />}
                  </div>
                  <div className="flex items-center gap-2">
                    {f.status === "completed" && <Check className="h-4 w-4 text-green-600" />}
                    <Button variant="ghost" size="sm" onClick={() => setUploadFiles(prev => prev.filter(x => x.id !== f.id))} className="h-8 w-8 p-0">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

              {uploadFiles.some((f) => f.status === "pending") && (
                <Button onClick={handleUpload} className="w-full bg-purple-600 hover:bg-purple-700">
                  Upload {uploadFiles.filter((f) => f.status === "pending").length} Photo(s)
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Grid Display */}
      {existingPhotos.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Photo Collage ({existingPhotos.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-2 md:grid-cols-8 auto-rows-[36px] md:auto-rows-[48px]">
              {existingPhotos.map((photo, index) => (
                <div
                  key={photo.id}
                  className={cn(
                    "group relative rounded-lg overflow-hidden border bg-gray-100 aspect-square"
                  )}
                >
                  {index === 0 && (
                    <div className="absolute top-0.5 left-0.5 z-10">
                      <Badge className="bg-primary text-[8px] text-white">Cover Photo</Badge>
                    </div>
                  )}
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover aspect-square transition-transform duration-300 group-hover:scale-105 max-h-9 max-w-9 md:max-h-12 md:max-w-12"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex justify-end p-0.5">
                    <Button
                      variant="destructive"
                      size="icon"
                      className="h-5 w-5"
                      onClick={() => removeExistingPhoto(photo.id)}
                    >
                      <X className="h-2.5 w-2.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
