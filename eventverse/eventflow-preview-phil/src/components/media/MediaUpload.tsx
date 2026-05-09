import { useState } from "react";
import UploadWizard from "./UploadWizard";

interface MediaUploadProps {
  eventId: string;
}

const MediaUpload = ({ eventId }: MediaUploadProps) => {
  // Mock albums data - in real app, fetch from backend
  const mockAlbums = [
    { id: "1", name: "Wedding Ceremony" },
    { id: "2", name: "Reception" },
    { id: "3", name: "Photo Booth Fun" },
    { id: "4", name: "Guest Uploads" },
  ];

  return <UploadWizard eventId={eventId} albums={mockAlbums} />;
};

export default MediaUpload;
