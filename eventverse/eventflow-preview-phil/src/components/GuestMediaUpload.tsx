
import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, Upload, Image, Heart, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GuestMediaUploadProps {
  event: { couple: string };
  guest: { name: string };
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
        variant: "destructive"
      });
      return;
    }

    setUploadedPhotos(prev => [...prev, ...newFiles]);
    toast({
      title: "Photos added!",
      description: `${newFiles.length} photo(s) ready to upload.`
    });
  };

  const removePhoto = (index: number) => {
    setUploadedPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (uploadedPhotos.length === 0) return;

    setIsUploading(true);
    
    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsUploading(false);
    toast({
      title: "Photos uploaded successfully!",
      description: `${uploadedPhotos.length} photo(s) added to the wedding album.`
    });
    
    // Clear uploaded photos
    setUploadedPhotos([]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="bg-gradient-to-r from-rose-500 to-purple-600 text-white border-0">
        <CardContent className="p-6 text-center">
          <Camera className="w-12 h-12 mx-auto mb-3" />
          <h2 className="text-2xl font-bold mb-2">Share Your Memories</h2>
          <p className="opacity-90">Upload photos to {event.couple}'s wedding album</p>
        </CardContent>
      </Card>

      {/* Upload Stats */}
      <Card className="bg-white/80 backdrop-blur-sm border-0">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-lg font-semibold">Your Upload Quota</span>
              <p className="text-sm text-gray-600">Share your favorite moments from the celebration</p>
            </div>
            <Badge variant={remainingUploads > 5 ? "default" : "destructive"}>
              {remainingUploads} remaining
            </Badge>
          </div>
          <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-rose-500 h-2 rounded-full transition-all"
              style={{ width: `${((maxPhotos - remainingUploads) / maxPhotos) * 100}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Upload Interface */}
      {remainingUploads > 0 && (
        <Card className="bg-white/80 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle>Upload Photos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Upload Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="h-24 flex-col border-dashed border-2"
                disabled={isUploading || remainingUploads === 0}
              >
                <Upload className="w-8 h-8 mb-2" />
                <span>Choose Photos</span>
                <span className="text-xs text-gray-500">From your device</span>
              </Button>
              <Button
                onClick={() => cameraInputRef.current?.click()}
                variant="outline"
                className="h-24 flex-col border-dashed border-2"
                disabled={isUploading || remainingUploads === 0}
              >
                <Camera className="w-8 h-8 mb-2" />
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
                <h4 className="font-medium">Ready to Upload ({uploadedPhotos.length})</h4>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                  {uploadedPhotos.map((file, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-24 object-cover rounded border"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
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
                  {isUploading ? "Uploading..." : `Upload ${uploadedPhotos.length} Photo(s)`}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Album Preview */}
      <Card className="bg-white/80 backdrop-blur-sm border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="w-5 h-5" />
            Wedding Album Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
            {/* Mock existing photos */}
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <div key={index} className="relative">
                <div className="w-full h-24 bg-gradient-to-br from-rose-100 to-purple-100 rounded border flex items-center justify-center">
                  <Heart className="w-6 h-6 text-rose-400" />
                </div>
                <div className="absolute bottom-1 right-1">
                  <div className="bg-black/50 text-white text-xs px-1 rounded">
                    Guest Photo
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-4 text-center">
            Photos from all guests will appear here throughout the celebration
          </p>
        </CardContent>
      </Card>

      {/* Guidelines */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">Photo Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="text-blue-700">
          <ul className="space-y-2 text-sm">
            <li>• Maximum {maxPhotos} photos per guest</li>
            <li>• Photos will be visible to all wedding guests</li>
            <li>• Please keep photos appropriate for all audiences</li>
            <li>• High-quality images are preferred</li>
            <li>• Photos may be used in the couple's wedding album</li>
          </ul>
        </CardContent>
      </Card>

      {/* Upload Complete State */}
      {remainingUploads === 0 && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6 text-center">
            <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-600" />
            <h3 className="text-lg font-semibold text-green-800 mb-2">Upload Limit Reached</h3>
            <p className="text-green-700">
              Thank you for sharing your memories! You've uploaded all {maxPhotos} of your allocated photos.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GuestMediaUpload;
