"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Download, Filter, Heart, Search, Share, ZoomIn } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface Photo {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
  uploader: string;
  timestamp: Date;
  tags: string[];
  likes: number;
  album?: string;
}

interface PhotoGalleryProps {
  eventId: string;
  viewMode: "grid" | "list";
}

const PhotoGallery = ({ eventId, viewMode }: PhotoGalleryProps) => {
  const [photos] = useState<Photo[]>([
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      thumbnail:
        "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=300&fit=crop",
      title: "Welcome Reception",
      uploader: "John Doe",
      timestamp: new Date(),
      tags: ["reception", "guests", "arrival"],
      likes: 15,
      album: "Reception Photos",
    },
    {
      id: "2",
      url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      thumbnail:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=300&fit=crop",
      title: "Team Building Activity",
      uploader: "Jane Smith",
      timestamp: new Date(),
      tags: ["activity", "team", "fun"],
      likes: 23,
      album: "Activities",
    },
    {
      id: "3",
      url: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      thumbnail:
        "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=300&fit=crop",
      title: "Venue Setup",
      uploader: "Event Team",
      timestamp: new Date(),
      tags: ["venue", "setup", "decor"],
      likes: 8,
      album: "Setup",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const allTags = Array.from(new Set(photos.flatMap((photo) => photo.tags)));

  const filteredPhotos = photos.filter((photo) => {
    const matchesSearch =
      photo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      photo.uploader.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || photo.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const handleLike = (photoId: string) => {
    console.log(`Liked photo ${photoId}`);
  };

  const handleDownload = (photo: Photo) => {
    console.log(`Downloading photo ${photo.id}`);
  };

  const handleShare = (photo: Photo) => {
    console.log(`Sharing photo ${photo.id}`);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
          <Input
            placeholder="Search photos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedTag === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTag(null)}
            >
              All
            </Button>
            {allTags.map((tag) => (
              <Button
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Photo Grid */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredPhotos.map((photo) => (
            <Card
              key={photo.id}
              className="group cursor-pointer transition-shadow hover:shadow-lg"
            >
              <CardContent className="p-0">
                <div className="relative">
                  {/* <img
                    src={photo.thumbnail}
                    alt={photo.title}
                    className="h-48 w-full rounded-t-lg object-cover"
                    onClick={() => setSelectedPhoto(photo)}
                  /> */}
                  <Image
                    src={photo.thumbnail}
                    alt={photo.title}
                    className="h-48 w-full rounded-t-lg object-cover"
                    onClick={() => setSelectedPhoto(photo)}
                  />
                  <div className="bg-opacity-0 group-hover:bg-opacity-30 absolute inset-0 flex items-center justify-center rounded-t-lg bg-black transition-all">
                    <ZoomIn className="h-6 w-6 text-white opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <div className="absolute top-2 right-2 flex gap-1">
                    {photo.tags.slice(0, 2).map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="truncate text-sm font-medium">
                    {photo.title}
                  </h3>
                  <p className="mb-2 text-xs text-gray-600">
                    by {photo.uploader}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(photo.id)}
                        className="h-8 px-2"
                      >
                        <Heart className="mr-1 h-3 w-3" />
                        {photo.likes}
                      </Button>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownload(photo)}
                        className="h-8 w-8 p-0"
                      >
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleShare(photo)}
                        className="h-8 w-8 p-0"
                      >
                        <Share className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPhotos.map((photo) => (
            <Card
              key={photo.id}
              className="transition-shadow hover:shadow-lg"
            >
              <CardContent className="p-4">
                <div className="flex gap-4">
                  {/* <img
                    src={photo.thumbnail}
                    alt={photo.title}
                    className="h-24 w-24 cursor-pointer rounded object-cover"
                    onClick={() => setSelectedPhoto(photo)}
                  /> */}
                  <Image
                    src={photo.thumbnail}
                    alt={photo.title}
                    className="h-24 w-24 cursor-pointer rounded object-cover"
                    onClick={() => setSelectedPhoto(photo)}
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{photo.title}</h3>
                    <p className="mb-2 text-sm text-gray-600">
                      Uploaded by {photo.uploader}
                    </p>
                    <div className="mb-2 flex gap-2">
                      {photo.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLike(photo.id)}
                          className="h-8 px-2"
                        >
                          <Heart className="mr-1 h-3 w-3" />
                          {photo.likes}
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownload(photo)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleShare(photo)}
                        >
                          <Share className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Photo Detail Modal */}
      <Dialog
        open={!!selectedPhoto}
        onOpenChange={() => setSelectedPhoto(null)}
      >
        <DialogContent className="max-h-[90vh] w-full max-w-4xl overflow-hidden">
          <DialogHeader>
            <DialogTitle>{selectedPhoto?.title}</DialogTitle>
          </DialogHeader>
          {selectedPhoto && (
            <div className="space-y-4">
              {/* <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                className="max-h-[60vh] w-full rounded object-contain"
              /> */}
              <Image
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                className="max-h-[60vh] w-full rounded object-contain"
              />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">
                    Uploaded by {selectedPhoto.uploader}
                  </p>
                  <p className="text-xs text-gray-500">
                    {selectedPhoto.timestamp.toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => handleLike(selectedPhoto.id)}>
                    <Heart className="mr-2 h-4 w-4" />
                    {selectedPhoto.likes}
                  </Button>
                  <Button onClick={() => handleDownload(selectedPhoto)}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button onClick={() => handleShare(selectedPhoto)}>
                    <Share className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PhotoGallery;
