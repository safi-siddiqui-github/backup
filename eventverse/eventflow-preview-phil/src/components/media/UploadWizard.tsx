import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Upload,
  FolderOpen,
  Image as ImageIcon,
  X,
  Check,
  Camera,
  File,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadWizardProps {
  eventId: string;
  albums: Array<{ id: string; name: string }>;
}

interface UploadFile {
  id: string;
  file: File;
  preview: string;
  progress: number;
  status: "pending" | "uploading" | "completed" | "error";
  title?: string;
  tags?: string[];
}

const UploadWizard = ({ eventId, albums }: UploadWizardProps) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedAlbum, setSelectedAlbum] = useState<string>("");
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [commonTags, setCommonTags] = useState<string>("");
  const [commonTitle, setCommonTitle] = useState<string>("");

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newFiles: UploadFile[] = Array.from(files).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
      progress: 0,
      status: "pending",
    }));

    setUploadFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const removeFile = (id: string) => {
    setUploadFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const updateFileMetadata = (id: string, field: "title" | "tags", value: any) => {
    setUploadFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, [field]: value } : f))
    );
  };

  const applyCommonMetadata = () => {
    if (commonTitle || commonTags) {
      setUploadFiles((prev) =>
        prev.map((f) => ({
          ...f,
          title: commonTitle || f.title,
          tags: commonTags ? commonTags.split(",").map((t) => t.trim()) : f.tags,
        }))
      );
    }
  };

  const handleUpload = () => {
    uploadFiles.forEach((file) => {
      if (file.status === "pending") {
        simulateUpload(file.id);
      }
    });
  };

  const simulateUpload = (fileId: string) => {
    setUploadFiles((prev) =>
      prev.map((f) => (f.id === fileId ? { ...f, status: "uploading" } : f))
    );

    const interval = setInterval(() => {
      setUploadFiles((prev) => {
        const file = prev.find((f) => f.id === fileId);
        if (!file) return prev;

        if (file.progress >= 100) {
          clearInterval(interval);
          return prev.map((f) =>
            f.id === fileId ? { ...f, status: "completed", progress: 100 } : f
          );
        }

        return prev.map((f) =>
          f.id === fileId ? { ...f, progress: f.progress + 10 } : f
        );
      });
    }, 300);
  };

  const canProceedToStep2 = selectedAlbum && uploadFiles.length > 0;
  const canUpload = uploadFiles.some((f) => f.status === "pending");

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center font-medium",
              step >= 1
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            )}
          >
            {step > 1 ? <Check className="w-5 h-5" /> : "1"}
          </div>
          <span className="font-medium">Choose Album</span>
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground" />
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center font-medium",
              step >= 2
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            )}
          >
            2
          </div>
          <span className="font-medium">Upload Files</span>
        </div>
      </div>

      {/* Step 1: Album Selection */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderOpen className="w-5 h-5" />
              Select Destination Album
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Choose Album</Label>
              <Select value={selectedAlbum} onValueChange={setSelectedAlbum}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an album..." />
                </SelectTrigger>
                <SelectContent>
                  {albums.map((album) => (
                    <SelectItem key={album.id} value={album.id}>
                      {album.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Quick File Selection Preview */}
            <div
              className={cn(
                "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
                dragActive
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              )}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-4">
                You can also drag & drop files here to quickly add them
              </p>
              <Button
                variant="outline"
                onClick={() => document.getElementById("file-input")?.click()}
              >
                <File className="w-4 h-4 mr-2" />
                Choose Files
              </Button>
              <input
                id="file-input"
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden"
              />
            </div>

            {uploadFiles.length > 0 && (
              <div className="text-sm text-muted-foreground">
                {uploadFiles.length} file(s) ready to upload
              </div>
            )}

            <div className="flex justify-end">
              <Button
                onClick={() => setStep(2)}
                disabled={!canProceedToStep2}
                className="gap-2"
              >
                Next: Upload Files
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: File Upload & Metadata */}
      {step === 2 && (
        <div className="space-y-6">
          {/* Back Button */}
          <Button variant="outline" onClick={() => setStep(1)} className="gap-2">
            <ChevronLeft className="w-4 h-4" />
            Change Album
          </Button>

          {/* Drag & Drop Zone */}
          <Card>
            <CardContent className="pt-6">
              <div
                className={cn(
                  "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
                  dragActive
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                )}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <ImageIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="font-medium mb-2">
                  Drag & drop your photos and videos here
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  or click to browse your files
                </p>
                <div className="flex gap-2 justify-center">
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById("file-input-step2")?.click()}
                  >
                    <File className="w-4 h-4 mr-2" />
                    Choose Files
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById("camera-input")?.click()}
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Take Photo
                  </Button>
                </div>
                <input
                  id="file-input-step2"
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={(e) => handleFileSelect(e.target.files)}
                  className="hidden"
                />
                <input
                  id="camera-input"
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={(e) => handleFileSelect(e.target.files)}
                  className="hidden"
                />
              </div>
            </CardContent>
          </Card>

          {/* Common Metadata */}
          {uploadFiles.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Apply to All Files</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Common Title Prefix</Label>
                  <Input
                    placeholder="e.g., Wedding Day"
                    value={commonTitle}
                    onChange={(e) => setCommonTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Common Tags (comma-separated)</Label>
                  <Input
                    placeholder="e.g., wedding, ceremony, 2024"
                    value={commonTags}
                    onChange={(e) => setCommonTags(e.target.value)}
                  />
                </div>
                <Button onClick={applyCommonMetadata} variant="secondary">
                  Apply to All
                </Button>
              </CardContent>
            </Card>
          )}

          {/* File Queue */}
          {uploadFiles.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Upload Queue ({uploadFiles.length} files)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {uploadFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-start gap-4 p-4 border border-border rounded-lg"
                    >
                      <img
                        src={file.preview}
                        alt="Preview"
                        className="w-20 h-20 rounded object-cover"
                      />
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium text-sm">{file.file.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {(file.file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                          {file.status === "pending" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(file.id)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                          {file.status === "completed" && (
                            <Badge variant="default" className="bg-green-600">
                              <Check className="w-3 h-3 mr-1" />
                              Uploaded
                            </Badge>
                          )}
                        </div>
                        {file.status === "uploading" && (
                          <Progress value={file.progress} className="h-2" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Upload Action */}
          {uploadFiles.length > 0 && (
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setUploadFiles([])}>
                Clear All
              </Button>
              <Button onClick={handleUpload} disabled={!canUpload}>
                <Upload className="w-4 h-4 mr-2" />
                Upload {uploadFiles.filter((f) => f.status === "pending").length}{" "}
                Files
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UploadWizard;
