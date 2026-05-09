"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  Camera,
  Crown,
  Download,
  Heart,
  RotateCcw,
  Smile,
  Sparkles,
  Star,
} from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

interface PhotoBoothProps {
  eventId: string;
}

interface Filter {
  id: string;
  name: string;
  icon: React.ReactNode;
  cssFilter: string;
  overlay?: string;
}

interface Frame {
  id: string;
  name: string;
  preview: string;
  style: React.CSSProperties;
}

const PhotoBooth = ({ eventId }: PhotoBoothProps) => {
  const [isCamera, setIsCamera] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<Filter | null>(null);
  const [selectedFrame, setSelectedFrame] = useState<Frame | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const filters: Filter[] = [
    {
      id: "none",
      name: "Normal",
      icon: <Camera className="h-4 w-4" />,
      cssFilter: "none",
    },
    {
      id: "vintage",
      name: "Vintage",
      icon: <Star className="h-4 w-4" />,
      cssFilter: "sepia(50%) contrast(120%) brightness(90%)",
    },
    {
      id: "bw",
      name: "B&W",
      icon: <Smile className="h-4 w-4" />,
      cssFilter: "grayscale(100%) contrast(120%)",
    },
    {
      id: "warm",
      name: "Warm",
      icon: <Heart className="h-4 w-4" />,
      cssFilter: "sepia(30%) saturate(140%) hue-rotate(15deg)",
    },
    {
      id: "cool",
      name: "Cool",
      icon: <Sparkles className="h-4 w-4" />,
      cssFilter: "hue-rotate(180deg) saturate(120%) brightness(110%)",
    },
    {
      id: "glamour",
      name: "Glamour",
      icon: <Crown className="h-4 w-4" />,
      cssFilter: "contrast(110%) brightness(110%) saturate(130%)",
    },
  ];

  const frames: Frame[] = [
    {
      id: "none",
      name: "No Frame",
      preview: "🚫",
      style: {},
    },
    {
      id: "classic",
      name: "Classic",
      preview: "🖼️",
      style: {
        border: "8px solid #8B4513",
        borderRadius: "4px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
      },
    },
    {
      id: "elegant",
      name: "Elegant",
      preview: "✨",
      style: {
        border: "12px solid #FFD700",
        borderRadius: "8px",
        boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
      },
    },
    {
      id: "fun",
      name: "Fun",
      preview: "🎉",
      style: {
        border: "6px solid #FF69B4",
        borderRadius: "16px",
        boxShadow: "0 0 20px rgba(255,105,180,0.5)",
      },
    },
  ];

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCamera(true);
      }
    } catch (error) {
      toast({
        title: "Camera access denied",
        description: "Please allow camera access to use the photo booth.",
        variant: "destructive",
      });
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCamera(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext("2d");

    if (context) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Apply filter
      if (selectedFilter && selectedFilter.cssFilter !== "none") {
        context.filter = selectedFilter.cssFilter;
      }

      context.drawImage(video, 0, 0);

      const photoDataUrl = canvas.toDataURL("image/jpeg", 0.9);
      setCapturedPhoto(photoDataUrl);

      toast({
        title: "Photo captured!",
        description: "Your photo has been taken successfully.",
      });
    }
  };

  const savePhoto = () => {
    if (!capturedPhoto) return;

    setPhotos((prev) => [...prev, capturedPhoto]);
    setCapturedPhoto(null);

    toast({
      title: "Photo saved!",
      description: "Your photo has been added to the gallery.",
    });
  };

  const downloadPhoto = (photoUrl: string) => {
    const link = document.createElement("a");
    link.download = `photo-booth-${Date.now()}.jpg`;
    link.href = photoUrl;
    link.click();

    toast({
      title: "Download started",
      description: "Your photo is being downloaded.",
    });
  };

  const retakePhoto = () => {
    setCapturedPhoto(null);
  };

  return (
    <div className="space-y-6">
      {/* Photo Booth Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Camera className="h-6 w-6" />
            Digital Photo Booth
          </CardTitle>
          <p className="text-sm text-gray-600">
            Take fun photos with filters and frames • {photos.length} photos
            taken
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Camera Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Camera</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Camera View */}
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-900">
              {!isCamera && !capturedPhoto && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Camera className="mx-auto mb-4 h-16 w-16 opacity-50" />
                    <p className="mb-2 text-lg">Ready to take photos?</p>
                    <Button
                      onClick={startCamera}
                      size="lg"
                    >
                      Start Camera
                    </Button>
                  </div>
                </div>
              )}

              {isCamera && !capturedPhoto && (
                <div
                  className="relative"
                  style={selectedFrame?.style}
                >
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="h-full w-full object-cover"
                    style={{
                      filter: selectedFilter?.cssFilter || "none",
                      transform: "scaleX(-1)", // Mirror effect
                    }}
                  />
                </div>
              )}

              {capturedPhoto && (
                <div
                  className="relative"
                  style={selectedFrame?.style}
                >
                  {/* <img
                    src={capturedPhoto}
                    alt="Captured photo"
                    className="h-full w-full object-cover"
                    style={{ filter: selectedFilter?.cssFilter || "none" }}
                  /> */}
                  <Image
                    src={capturedPhoto}
                    alt="Captured photo"
                    className="h-full w-full object-cover"
                    style={{ filter: selectedFilter?.cssFilter || "none" }}
                  />
                </div>
              )}

              {/* Overlay for frames */}
              {selectedFrame && selectedFrame.id !== "none" && (
                <div className="pointer-events-none absolute inset-0" />
              )}
            </div>

            <canvas
              ref={canvasRef}
              className="hidden"
            />

            {/* Camera Controls */}
            <div className="flex justify-center gap-2">
              {isCamera && !capturedPhoto && (
                <>
                  <Button
                    onClick={capturePhoto}
                    size="lg"
                    className="bg-red-500 hover:bg-red-600"
                  >
                    <Camera className="mr-2 h-5 w-5" />
                    Capture
                  </Button>
                  <Button
                    onClick={stopCamera}
                    variant="outline"
                  >
                    Stop Camera
                  </Button>
                </>
              )}

              {capturedPhoto && (
                <>
                  <Button
                    onClick={savePhoto}
                    size="lg"
                    className="bg-green-500 hover:bg-green-600"
                  >
                    Save Photo
                  </Button>
                  <Button
                    onClick={retakePhoto}
                    variant="outline"
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Retake
                  </Button>
                  <Button
                    onClick={() => downloadPhoto(capturedPhoto)}
                    variant="outline"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Controls Section */}
        <div className="space-y-6">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2">
                {filters.map((filter) => (
                  <Button
                    key={filter.id}
                    variant={
                      selectedFilter?.id === filter.id ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setSelectedFilter(filter)}
                    className="h-16 flex-col gap-1"
                  >
                    {filter.icon}
                    <span className="text-xs">{filter.name}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Frames */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Frames</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {frames.map((frame) => (
                  <Button
                    key={frame.id}
                    variant={
                      selectedFrame?.id === frame.id ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setSelectedFrame(frame)}
                    className="h-16 flex-col gap-1"
                  >
                    <span className="text-2xl">{frame.preview}</span>
                    <span className="text-xs">{frame.name}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Photos */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Recent Photos ({photos.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {photos.length === 0 ? (
                <p className="py-4 text-center text-gray-500">
                  No photos taken yet
                </p>
              ) : (
                <div className="grid max-h-64 grid-cols-2 gap-2 overflow-y-auto">
                  {photos
                    .slice()
                    .reverse()
                    .map((photo, index) => (
                      <div
                        key={index}
                        className="group relative"
                      >
                        {/* <img
                          src={photo}
                          alt={`Photo ${index + 1}`}
                          className="aspect-square w-full cursor-pointer rounded object-cover transition-transform hover:scale-105"
                        /> */}
                        <Image
                          src={photo}
                          alt={`Photo ${index + 1}`}
                          className="aspect-square w-full cursor-pointer rounded object-cover transition-transform hover:scale-105"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => downloadPhoto(photo)}
                          className="bg-opacity-50 absolute top-1 right-1 h-8 w-8 bg-black p-0 text-white opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PhotoBooth;
