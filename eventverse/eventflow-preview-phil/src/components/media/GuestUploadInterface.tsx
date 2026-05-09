
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Upload, Camera, Image, Users, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { MainAlbum, SubAlbum, GuestUploadSession } from "./types";

interface GuestUploadInterfaceProps {
  mainAlbum: MainAlbum;
  guestId: string;
}

const GuestUploadInterface = ({ mainAlbum, guestId }: GuestUploadInterfaceProps) => {
  const [uploadSession, setUploadSession] = useState<GuestUploadSession>({
    guestId,
    eventId: mainAlbum.eventId,
    mainAlbumId: mainAlbum.id,
    totalUploaded: 0,
    remainingQuota: mainAlbum.settings.maxPhotosPerGuest,
    uploads: [],
    sessionStart: new Date()
  });
  const [selectedSubAlbumId, setSelectedSubAlbumId] = useState<string>("");
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const activeSubAlbums = mainAlbum.subAlbums.filter(album => album.isActive);

  useEffect(() => {
    if (activeSubAlbums.length === 1) {
      setSelectedSubAlbumId(activeSubAlbums[0].id);
    }
  }, [activeSubAlbums]);

  const handleFileSelect = (files: FileList | null) => {
    if (!files || !selectedSubAlbumId) return;

    const newFiles = Array.from(files);
    const availableSlots = uploadSession.remainingQuota;

    if (newFiles.length > availableSlots) {
      toast({
        title: "Upload limit exceeded",
        description: `You can only upload ${availableSlots} more photo(s).`,
        variant: "destructive"
      });
      return;
    }

    setUploadFiles(prev => [...prev, ...newFiles.slice(0, availableSlots)]);
  };

  const removeFile = (index: number) => {
    setUploadFiles(prev => prev.filter((_, i) => i !== index));
  };

  const simulateUpload = async () => {
    if (!selectedSubAlbumId || uploadFiles.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    // Update session
    const newUploaded = uploadFiles.length;
    setUploadSession(prev => ({
      ...prev,
      totalUploaded: prev.totalUploaded + newUploaded,
      remainingQuota: prev.remainingQuota - newUploaded,
      currentSubAlbumId: selectedSubAlbumId
    }));

    setUploadFiles([]);
    setIsUploading(false);
    setUploadProgress(0);

    toast({
      title: "Upload successful!",
      description: `${newUploaded} photo(s) uploaded to ${activeSubAlbums.find(a => a.id === selectedSubAlbumId)?.name}.`
    });
  };

  const selectedSubAlbum = activeSubAlbums.find(album => album.id === selectedSubAlbumId);
  const quotaPercentage = ((mainAlbum.settings.maxPhotosPerGuest - uploadSession.remainingQuota) / mainAlbum.settings.maxPhotosPerGuest) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Image className="w-5 h-5" />
              {mainAlbum.name}
            </CardTitle>
            <p className="text-sm text-gray-600">{mainAlbum.description}</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Your Photo Quota</span>
                <Badge variant={uploadSession.remainingQuota > 5 ? "default" : "destructive"}>
                  {uploadSession.remainingQuota} left
                </Badge>
              </div>
              <Progress value={quotaPercentage} className="h-2" />
              <p className="text-xs text-gray-600 text-center">
                {uploadSession.totalUploaded} of {mainAlbum.settings.maxPhotosPerGuest} photos used
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Album Selection */}
        {activeSubAlbums.length > 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Choose Album</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedSubAlbumId} onValueChange={setSelectedSubAlbumId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an album to upload to" />
                </SelectTrigger>
                <SelectContent>
                  {activeSubAlbums.map(album => (
                    <SelectItem key={album.id} value={album.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{album.name}</span>
                        <span className="text-xs text-gray-500 ml-2">
                          {album.photoCount} photos
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedSubAlbum && (
                <p className="text-sm text-gray-600 mt-2">{selectedSubAlbum.description}</p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Upload Interface */}
        {selectedSubAlbumId && uploadSession.remainingQuota > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upload Photos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Upload Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="h-20 flex-col"
                  disabled={isUploading}
                >
                  <Upload className="w-6 h-6 mb-1" />
                  <span className="text-sm">Choose Photos</span>
                </Button>
                <Button
                  onClick={() => cameraInputRef.current?.click()}
                  variant="outline"
                  className="h-20 flex-col"
                  disabled={isUploading}
                >
                  <Camera className="w-6 h-6 mb-1" />
                  <span className="text-sm">Take Photo</span>
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

              {/* Upload Queue */}
              {uploadFiles.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-medium">Ready to Upload ({uploadFiles.length})</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {uploadFiles.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-20 object-cover rounded border"
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full"
                          onClick={() => removeFile(index)}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>

                  {isUploading && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Uploading...</span>
                        <span className="text-sm">{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} />
                    </div>
                  )}

                  <Button 
                    onClick={simulateUpload} 
                    className="w-full"
                    disabled={isUploading}
                  >
                    {isUploading ? "Uploading..." : `Upload ${uploadFiles.length} Photo(s)`}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Quota Exhausted */}
        {uploadSession.remainingQuota === 0 && (
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="pt-6 text-center">
              <AlertCircle className="w-12 h-12 mx-auto mb-3 text-orange-600" />
              <h3 className="font-medium text-orange-900 mb-2">Upload Limit Reached</h3>
              <p className="text-sm text-orange-700">
                You've used all {mainAlbum.settings.maxPhotosPerGuest} of your allocated photos for this event.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Success Summary */}
        {uploadSession.totalUploaded > 0 && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-6 text-center">
              <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <p className="text-sm text-green-700">
                Successfully uploaded {uploadSession.totalUploaded} photo(s) to {mainAlbum.name}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Event Info */}
        <Card className="bg-gray-50">
          <CardContent className="pt-4">
            <div className="text-center text-sm text-gray-600">
              <p className="font-medium">Event Guidelines</p>
              <ul className="mt-2 space-y-1 text-xs">
                <li>• Photos will be visible to all event guests</li>
                {mainAlbum.settings.requireApproval && <li>• Photos require approval before appearing</li>}
                <li>• {mainAlbum.settings.allowDownloads ? 'Downloads are allowed' : 'Downloads are restricted'}</li>
                <li>• Maximum {mainAlbum.settings.maxPhotosPerGuest} photos per person</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GuestUploadInterface;
