import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Camera, Upload, ArrowRight, ArrowLeft, Star, X, Image } from "lucide-react";
import { EventFormData } from "../EnhancedEventCreationDialog";
import { cn } from "@/lib/utils";
import EventPhotoUpload from "./EventPhotoUpload";

interface Props {
  formData: EventFormData;
  onUpdate: (updates: Partial<EventFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const EventPhotosStep = ({ formData, onUpdate, onNext, onBack }: Props) => {
  const [selectedMainPhoto, setSelectedMainPhoto] = useState<string | null>(
    formData.eventPhotos?.mainPhoto || null
  );

  const handleMainPhotoSelect = (photoId: string) => {
    setSelectedMainPhoto(photoId);
    onUpdate({
      eventPhotos: {
        ...formData.eventPhotos,
        mainPhoto: photoId
      }
    });
  };

  const handlePhotosUpdate = (photos: EventFormData['eventPhotos']['additionalPhotos']) => {
    onUpdate({
      eventPhotos: {
        ...formData.eventPhotos,
        additionalPhotos: photos
      }
    });
  };

  const allPhotos = formData.eventPhotos?.additionalPhotos || [];
  const hasPhotos = allPhotos.length > 0;

  return (
    <div className="space-y-8 p-6">
      <div className="text-center mb-8">
        <Image className="w-12 h-12 mx-auto text-purple-600 mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Event Photos</h3>
        <p className="text-gray-600">Add photos to make your event more engaging and visual</p>
      </div>

      {/* Upload Section */}
      <EventPhotoUpload 
        onPhotosUpdate={handlePhotosUpdate}
        existingPhotos={allPhotos}
        maxPhotos={formData.eventPhotos?.maxPhotos || 10}
      />

      {/* Main Photo Selection */}
      {hasPhotos && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Main Event Photo
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              This photo will be used as your event's primary image on cards and previews
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {allPhotos.map((photo) => (
                <div
                  key={photo.id}
                  className={cn(
                    "relative group cursor-pointer border-2 rounded-lg overflow-hidden transition-all",
                    selectedMainPhoto === photo.id
                      ? "border-purple-500 ring-2 ring-purple-200"
                      : "border-gray-200 hover:border-gray-300"
                  )}
                  onClick={() => handleMainPhotoSelect(photo.id)}
                >
                  <img
                    src={photo.url}
                    alt={photo.title || "Event photo"}
                    className="w-full h-24 object-cover"
                  />
                  {selectedMainPhoto === photo.id && (
                    <div className="absolute inset-0 bg-purple-500 bg-opacity-20 flex items-center justify-center">
                      <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                        <Star className="w-3 h-3 mr-1" />
                        Main Photo
                      </Badge>
                    </div>
                  )}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black bg-opacity-40 flex items-center justify-center transition-opacity">
                    <Button variant="secondary" size="sm">
                      {selectedMainPhoto === photo.id ? "Selected" : "Set as Main"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Photo Preview & Tips */}
      {!hasPhotos && (
        <Card>
          <CardContent className="p-6 text-center">
            <Image className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h4 className="text-lg font-medium mb-2">No photos uploaded yet</h4>
            <p className="text-gray-600 mb-4">
              Add photos to make your event more visually appealing and help guests know what to expect
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Badge variant="outline">Tip</Badge>
                <span>Use high-quality images</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">Tip</Badge>
                <span>Show venue or setup</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">Tip</Badge>
                <span>Include event highlights</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Features
        </Button>
        <Button onClick={onNext} className="flex items-center gap-2">
          Continue to Configuration
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default EventPhotosStep;