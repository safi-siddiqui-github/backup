"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface UploadCardProps {
  fileInputRef: React.RefObject<HTMLInputElement  | null>;
  onUploadClick: () => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UploadCard({
  fileInputRef,
  onUploadClick,
  onFileChange,
}: UploadCardProps) {
  return (
    <Card className="group relative cursor-pointer border-2 border-dashed border-gray-300 dark:border-gray-700">
      <CardContent className="flex h-full flex-col items-center justify-center p-4 sm:p-6 min-h-[200px] sm:min-h-[250px]">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={onFileChange}
          className="hidden"
        />
        <Button
          type="button"
          variant="ghost"
          onClick={onUploadClick}
          className="flex h-auto w-auto flex-col items-center justify-center gap-3 hover:bg-transparent"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
            <Upload className="h-8 w-8 text-gray-500 dark:text-gray-400" />
          </div>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Upload Photo
          </span>
        </Button>
      </CardContent>
    </Card>
  );
}

