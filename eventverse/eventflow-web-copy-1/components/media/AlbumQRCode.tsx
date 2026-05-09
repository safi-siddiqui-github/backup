"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Copy, Download, Eye, QrCode } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { MainAlbum } from "./types";

interface AlbumQRCodeProps {
  mainAlbum: MainAlbum;
}

const AlbumQRCode = ({ mainAlbum }: AlbumQRCodeProps) => {
  const [isQRDialogOpen, setIsQRDialogOpen] = useState(false);
  const { toast } = useToast();

  const qrCodeUrl = `https://90ebe2cd-fff8-4ed4-afa3-ba9cf6ca4d8f.lovableproject.com/upload/${mainAlbum.eventId}/${mainAlbum.id}`;

  // Simple QR code placeholder
  const generateQRCodeDataURL = (url: string) => {
    return `data:image/svg+xml;base64,${btoa(`
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="white"/>
        <rect x="20" y="20" width="160" height="160" fill="black"/>
        <rect x="30" y="30" width="140" height="140" fill="white"/>
        <text x="100" y="95" text-anchor="middle" font-size="10" fill="black">Event Upload</text>
        <text x="100" y="110" text-anchor="middle" font-size="8" fill="black">${mainAlbum.name}</text>
        <text x="100" y="125" text-anchor="middle" font-size="6" fill="black">Scan to Upload</text>
      </svg>
    `)}`;
  };

  const copyQRUrl = () => {
    navigator.clipboard.writeText(qrCodeUrl);
    toast({
      title: "URL copied",
      description: "Upload URL has been copied to clipboard.",
    });
  };

  const downloadQRCode = () => {
    toast({
      title: "Download started",
      description: "Downloading QR code for printing...",
    });
  };

  const previewUploadPage = () => {
    window.open(qrCodeUrl, "_blank");
  };

  return (
    <Dialog
      open={isQRDialogOpen}
      onOpenChange={setIsQRDialogOpen}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
        >
          <QrCode className="mr-2 h-4 w-4" />
          QR Code
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Event Upload QR Code</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="text-center">
            <div className="inline-block rounded-lg border-2 border-gray-200 bg-white p-4">
              {/* <img
                src={generateQRCodeDataURL(qrCodeUrl)}
                alt="Event Upload QR Code"
                className="h-48 w-48"
              /> */}
              <Image
                src={generateQRCodeDataURL(qrCodeUrl)}
                alt="Event Upload QR Code"
                className="h-48 w-48"
              />
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Guests scan this code to upload photos to your event
            </p>
          </div>

          <Card className="bg-blue-50">
            <CardContent className="p-4">
              <h4 className="mb-2 font-medium">How it works:</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Guests scan the QR code with their phone</li>
                <li>• They can choose which sub-album to upload to</li>
                <li>
                  • Upload limit: {mainAlbum.settings.maxPhotosPerGuest} photos
                  per guest
                </li>
                <li>
                  •{" "}
                  {mainAlbum.settings.allowDownloads
                    ? "Downloads allowed"
                    : "Downloads restricted"}
                </li>
              </ul>
            </CardContent>
          </Card>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={copyQRUrl}
              className="flex-1"
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy URL
            </Button>
            <Button
              variant="outline"
              onClick={downloadQRCode}
              className="flex-1"
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>

          <Button
            variant="ghost"
            onClick={previewUploadPage}
            className="w-full"
          >
            <Eye className="mr-2 h-4 w-4" />
            Preview Upload Page
          </Button>

          <div className="rounded bg-gray-50 p-3 text-xs text-gray-500">
            <strong>Print Instructions:</strong> For best results, print the QR
            code at least 2x2 inches. Place it on tables or display boards where
            guests can easily scan it.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AlbumQRCode;
