"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Image as ImageIcon, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { EventFormData } from "../EnhancedEventCreationDialog";
import EventPhotoUpload from "./EventPhotoUpload";

interface Props {
  formData: EventFormData;
  onUpdate: (updates: Partial<EventFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const EventPhotosStep = ({ formData, onUpdate, onNext, onBack }: Props) => {
  const [selectedMainPhoto, setSelectedMainPhoto] = useState<string | null>(
    formData.eventPhotos?.mainPhoto || null,
  );

  const handleMainPhotoSelect = (photoId: string) => {
    setSelectedMainPhoto(photoId);
    onUpdate({
      eventPhotos: {
        ...formData.eventPhotos,
        mainPhoto: photoId,
      },
    });
  };

  type AdditionalPhotos = NonNullable<
    EventFormData["eventPhotos"]
  >["additionalPhotos"];

  const handlePhotosUpdate = (photos: AdditionalPhotos) => {
    onUpdate({
      eventPhotos: {
        ...formData.eventPhotos,
        additionalPhotos: photos,
      },
    });
  };

  const allPhotos = formData.eventPhotos?.additionalPhotos || [];
  const hasPhotos = allPhotos.length > 0;

  return (
    <div className="space-y-8 p-6">
      <div className="mb-8 text-center">
        <ImageIcon className="mx-auto mb-4 h-12 w-12 text-purple-600" />
        <h3 className="mb-2 text-2xl font-bold text-gray-900">Event Photos</h3>
        <p className="text-gray-600">
          Add photos to make your event more engaging and visual
        </p>
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
              <Star className="h-5 w-5 text-yellow-500" />
              Main Event Photo
            </CardTitle>
            <p className="text-muted-foreground text-sm">
              This photo will be used as your event&apos;s primary image on
              cards and previews
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {allPhotos.map((photo) => (
                <div
                  key={photo.id}
                  className={cn(
                    "group relative cursor-pointer overflow-hidden rounded-lg border-2 transition-all",
                    selectedMainPhoto === photo.id
                      ? "border-purple-500 ring-2 ring-purple-200"
                      : "border-gray-200 hover:border-gray-300",
                  )}
                  onClick={() => handleMainPhotoSelect(photo.id)}
                >
                  {/* <img
                    src={photo.url}
                    alt={photo.title || "Event photo"}
                    className="h-24 w-full object-cover"
                  /> */}
                  <Image
                    src={photo.url ?? ""}
                    alt={photo.title || "Event photo"}
                    className="h-24 w-full object-cover"
                  />

                  {selectedMainPhoto === photo.id && (
                    <div className="bg-opacity-20 absolute inset-0 flex items-center justify-center bg-purple-500">
                      <Badge
                        variant="secondary"
                        className="bg-purple-100 text-purple-800"
                      >
                        <Star className="mr-1 h-3 w-3" />
                        Main Photo
                      </Badge>
                    </div>
                  )}
                  <div className="bg-opacity-40 absolute inset-0 flex items-center justify-center bg-black opacity-0 transition-opacity group-hover:opacity-100">
                    <Button
                      variant="secondary"
                      size="sm"
                    >
                      {selectedMainPhoto === photo.id
                        ? "Selected"
                        : "Set as Main"}
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
            <ImageIcon className="mx-auto mb-4 h-16 w-16 text-gray-400" />
            <h4 className="mb-2 text-lg font-medium">No photos uploaded yet</h4>
            <p className="mb-4 text-gray-600">
              Add photos to make your event more visually appealing and help
              guests know what to expect
            </p>
            <div className="grid grid-cols-1 gap-4 text-sm text-gray-500 md:grid-cols-3">
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
        <Button
          variant="outline"
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Features
        </Button>
        <Button
          onClick={onNext}
          className="flex items-center gap-2"
        >
          Continue to Configuration
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default EventPhotosStep;
