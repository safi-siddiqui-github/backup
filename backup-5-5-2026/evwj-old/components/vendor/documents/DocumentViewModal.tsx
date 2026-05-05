"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Download } from "lucide-react";

interface DocumentViewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document: {
    name: string;
    fileType: string;
    type: string;
  } | null;
}

export default function DocumentViewModal({
  open,
  onOpenChange,
  document,
}: DocumentViewModalProps) {
  if (!document) return null;

  const isImage = ["JPG", "JPEG", "PNG", "GIF", "WEBP"].includes(
    document.fileType.toUpperCase()
  );
  const isPDF = document.fileType.toUpperCase() === "PDF";

  // Generate demo file URL based on file type
  const getDemoFileUrl = () => {
    if (isImage) {
      // Use a placeholder image service for demo
      return `https://picsum.photos/800/600?random=${document.name}`;
    } else if (isPDF) {
      // Use a reliable sample PDF URL for demo
      // Using a publicly accessible PDF that works in iframes
      return `https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf#${encodeURIComponent(document.name)}`;
    }
    return null;
  };

  const fileUrl = getDemoFileUrl();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl! max-h-[90vh]! !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:rgb(255_255_255/0.98)] dark:[background-color:#020617]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg sm:text-xl truncate pr-4">
              {document.name}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="mt-4 overflow-auto max-h-[calc(90vh-100px)]">
          {isImage && fileUrl ? (
            <div className="flex items-center justify-center rounded-lg p-4">
              <img
                src={fileUrl}
                alt={document.name}
                className="max-w-full max-h-[85vh] object-contain rounded-lg"
              />
            </div>
          ) : isPDF && fileUrl ? (
            <div className="w-full h-[70vh] bg-muted/30 rounded-lg">
              <iframe
                src={fileUrl}
                className="w-full h-full rounded-lg border-0"
                title={document.name}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[400px] text-center p-8">
              <p className="text-lg font-semibold text-muted-foreground mb-2">
                Preview not available
              </p>
              <p className="text-sm text-muted-foreground">
                This file type ({document.fileType}) cannot be previewed in the browser.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  if (fileUrl) {
                    window.open(fileUrl, "_blank");
                  }
                }}
              >
                <Download className="mr-2 h-4 w-4" />
                Download to view
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

