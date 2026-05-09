"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Camera, Check, Upload, Video, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

interface MediaUploadProps {
  eventId: string;
}

interface UploadFile {
  file: File;
  id: string;
  progress: number;
  status: "pending" | "uploading" | "completed" | "error";
  preview?: string;
}

const MediaUpload = ({ eventId }: MediaUploadProps) => {
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [album, setAlbum] = useState("");
  const [tags, setTags] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const albums = [
    "Reception Photos",
    "Activities",
    "Setup",
    "Candid Moments",
    "Group Photos",
  ];

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newFiles: UploadFile[] = Array.from(files).map((file) => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      progress: 0,
      status: "pending",
      preview: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : undefined,
    }));

    setUploadFiles((prev) => [...prev, ...newFiles]);
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

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const removeFile = (id: string) => {
    setUploadFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const simulateUpload = (fileId: string) => {
    const interval = setInterval(() => {
      setUploadFiles((prev) =>
        prev.map((f) => {
          if (f.id === fileId) {
            const newProgress = Math.min(f.progress + Math.random() * 20, 100);
            return {
              ...f,
              progress: newProgress,
              status: newProgress >= 100 ? "completed" : "uploading",
            };
          }
          return f;
        }),
      );
    }, 500);

    setTimeout(() => {
      clearInterval(interval);
      setUploadFiles((prev) =>
        prev.map((f) =>
          f.id === fileId ? { ...f, progress: 100, status: "completed" } : f,
        ),
      );
    }, 3000);
  };

  const handleUpload = () => {
    if (uploadFiles.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select files to upload.",
        variant: "destructive",
      });
      return;
    }

    uploadFiles.forEach((file) => {
      if (file.status === "pending") {
        simulateUpload(file.id);
      }
    });

    toast({
      title: "Upload started",
      description: `Uploading ${uploadFiles.length} file(s)...`,
    });
  };

  const captureFromCamera = () => {
    cameraInputRef.current?.click();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Media</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Drag & Drop Zone */}
          <div
            className={`rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
              isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <Upload className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <p className="mb-2 text-lg font-medium">
              Drop files here or click to upload
            </p>
            <p className="mb-4 text-sm text-gray-600">
              Support for JPG, PNG, GIF, MP4 files up to 10MB
            </p>
            <div className="flex justify-center gap-2">
              <Button onClick={() => fileInputRef.current?.click()}>
                <Upload className="mr-2 h-4 w-4" />
                Choose Files
              </Button>
              <Button
                variant="outline"
                onClick={captureFromCamera}
              >
                <Camera className="mr-2 h-4 w-4" />
                Take Photo
              </Button>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/*"
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

          {/* Upload Queue */}
          {uploadFiles.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-medium">
                Files to Upload ({uploadFiles.length})
              </h3>
              {uploadFiles.map((uploadFile) => (
                <div
                  key={uploadFile.id}
                  className="flex items-center gap-3 rounded-lg border p-3"
                >
                  {uploadFile.preview && (
                    <>
                      {/* <img
                        src={uploadFile.preview}
                        alt="Preview"
                        className="h-12 w-12 rounded object-cover"
                      /> */}
                      <Image
                        src={uploadFile.preview}
                        alt="Preview"
                        className="h-12 w-12 rounded object-cover"
                      />
                    </>
                  )}
                  {!uploadFile.preview &&
                    uploadFile.file.type.startsWith("video/") && (
                      <div className="flex h-12 w-12 items-center justify-center rounded bg-gray-200">
                        <Video className="h-6 w-6 text-gray-500" />
                      </div>
                    )}
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {uploadFile.file.name}
                    </p>
                    <p className="text-xs text-gray-600">
                      {formatFileSize(uploadFile.file.size)}
                    </p>
                    {uploadFile.status !== "pending" && (
                      <Progress
                        value={uploadFile.progress}
                        className="mt-1"
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {uploadFile.status === "completed" && (
                      <Check className="h-4 w-4 text-green-600" />
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(uploadFile.id)}
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Upload Details */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter photo/video title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="album">Album</Label>
              <Select
                value={album}
                onValueChange={setAlbum}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an album" />
                </SelectTrigger>
                <SelectContent>
                  {albums.map((albumName) => (
                    <SelectItem
                      key={albumName}
                      value={albumName}
                    >
                      {albumName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Add a description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              placeholder="Enter tags separated by commas..."
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          <Button
            onClick={handleUpload}
            className="w-full"
            disabled={uploadFiles.length === 0}
          >
            Upload{" "}
            {uploadFiles.length > 0 ? `${uploadFiles.length} file(s)` : "Files"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default MediaUpload;
