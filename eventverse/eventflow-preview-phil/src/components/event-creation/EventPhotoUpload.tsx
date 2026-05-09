import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Upload, Camera, X, Check, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PhotoData {
  id: string;
  url: string;
  file?: File;
  title?: string;
  description?: string;
  isUploaded: boolean;
}

interface UploadFile {
  file: File;
  id: string;
  progress: number;
  status: "pending" | "uploading" | "completed" | "error";
  preview?: string;
}

interface Props {
  onPhotosUpdate: (photos: PhotoData[]) => void;
  existingPhotos: PhotoData[];
  maxPhotos: number;
}

const EventPhotoUpload = ({ onPhotosUpdate, existingPhotos, maxPhotos }: Props) => {
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const remainingSlots = maxPhotos - existingPhotos.length;
  const canUploadMore = remainingSlots > 0;

  const handleFileSelect = (files: FileList | null) => {
    if (!files || !canUploadMore) return;

    const selectedFiles = Array.from(files).slice(0, remainingSlots);
    
    if (selectedFiles.length < files.length) {
      toast({
        title: "Upload limit reached",
        description: `You can only upload ${remainingSlots} more photo(s).`,
        variant: "destructive"
      });
    }

    const newFiles: UploadFile[] = selectedFiles
      .filter(file => file.type.startsWith('image/'))
      .map(file => ({
        file,
        id: Math.random().toString(36).substr(2, 9),
        progress: 0,
        status: "pending",
        preview: URL.createObjectURL(file)
      }));

    setUploadFiles(prev => [...prev, ...newFiles]);
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

  const removeUploadFile = (id: string) => {
    setUploadFiles(prev => prev.filter(f => f.id !== id));
  };

  const removeExistingPhoto = (id: string) => {
    const updatedPhotos = existingPhotos.filter(photo => photo.id !== id);
    onPhotosUpdate(updatedPhotos);
  };

  const simulateUpload = (fileId: string) => {
    const interval = setInterval(() => {
      setUploadFiles(prev => prev.map(f => {
        if (f.id === fileId) {
          const newProgress = Math.min(f.progress + Math.random() * 30, 100);
          return {
            ...f,
            progress: newProgress,
            status: newProgress >= 100 ? "completed" : "uploading"
          };
        }
        return f;
      }));
    }, 300);

    setTimeout(() => {
      clearInterval(interval);
      setUploadFiles(prev => prev.map(f => 
        f.id === fileId ? { ...f, progress: 100, status: "completed" } : f
      ));
    }, 2000);
  };

  const handleUpload = () => {
    if (uploadFiles.length === 0) return;

    // Simulate upload for each file
    uploadFiles.forEach(file => {
      if (file.status === "pending") {
        simulateUpload(file.id);
      }
    });

    // Convert uploaded files to photo data after simulation
    setTimeout(() => {
      const newPhotos: PhotoData[] = uploadFiles
        .filter(f => f.status === "completed")
        .map(f => ({
          id: f.id,
          url: f.preview!,
          file: f.file,
          title: f.file.name.split('.')[0],
          isUploaded: true
        }));

      onPhotosUpdate([...existingPhotos, ...newPhotos]);
      setUploadFiles([]);
      
      toast({
        title: "Photos uploaded successfully",
        description: `${newPhotos.length} photo(s) added to your event.`
      });
    }, 2500);

    toast({
      title: "Upload started",
      description: `Uploading ${uploadFiles.length} photo(s)...`
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Upload Event Photos</span>
            <span className="text-sm font-normal text-muted-foreground">
              {existingPhotos.length}/{maxPhotos} photos
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Upload Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-purple-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${(existingPhotos.length / maxPhotos) * 100}%` }}
            />
          </div>

          {canUploadMore ? (
            <>
              {/* Drag & Drop Zone */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  isDragging ? 'border-purple-500 bg-purple-50' : 'border-gray-300'
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-medium mb-2">Drop photos here or click to upload</p>
                <p className="text-sm text-gray-600 mb-4">
                  Support for JPG, PNG files up to 10MB • {remainingSlots} more photo(s) allowed
                </p>
                <div className="flex gap-2 justify-center">
                  <Button onClick={() => fileInputRef.current?.click()}>
                    <Upload className="w-4 h-4 mr-2" />
                    Choose Photos
                  </Button>
                  <Button variant="outline" onClick={() => cameraInputRef.current?.click()}>
                    <Camera className="w-4 h-4 mr-2" />
                    Take Photo
                  </Button>
                </div>
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
            </>
          ) : (
            <div className="text-center py-8">
              <ImageIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-lg font-medium mb-2">Maximum photos reached</p>
              <p className="text-sm text-gray-600">
                You've uploaded the maximum of {maxPhotos} photos. Remove some to add more.
              </p>
            </div>
          )}

          {/* Upload Queue */}
          {uploadFiles.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium">Uploading ({uploadFiles.length})</h4>
              {uploadFiles.map((uploadFile) => (
                <div key={uploadFile.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  <img
                    src={uploadFile.preview}
                    alt="Preview"
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{uploadFile.file.name}</p>
                    <p className="text-xs text-gray-600">{formatFileSize(uploadFile.file.size)}</p>
                    {uploadFile.status !== "pending" && (
                      <Progress value={uploadFile.progress} className="mt-1" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {uploadFile.status === "completed" && (
                      <Check className="w-4 h-4 text-green-600" />
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeUploadFile(uploadFile.id)}
                      className="h-8 w-8 p-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}

              {uploadFiles.some(f => f.status === "pending") && (
                <Button onClick={handleUpload} className="w-full">
                  Upload {uploadFiles.filter(f => f.status === "pending").length} Photo(s)
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Existing Photos Grid */}
      {existingPhotos.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Uploaded Photos ({existingPhotos.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {existingPhotos.map((photo) => (
                <div key={photo.id} className="relative group">
                  <img
                    src={photo.url}
                    alt={photo.title || "Event photo"}
                    className="w-full h-24 object-cover rounded-lg border"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeExistingPhoto(photo.id)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                  {photo.title && (
                    <p className="text-xs text-gray-600 mt-1 truncate">{photo.title}</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EventPhotoUpload;
