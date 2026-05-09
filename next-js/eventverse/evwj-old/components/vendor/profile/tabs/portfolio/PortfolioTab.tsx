"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Image as ImageIcon } from "lucide-react";
import { usePortfolioManager } from "./use-portfolio-manager";
import UploadCard from "./UploadCard";
import PortfolioItemCard from "./PortfolioItemCard";
import { PortfolioTabProps } from "./types";

export default function PortfolioTab({ isEditMode }: PortfolioTabProps) {
  const {
    portfolioItems,
    fileInputRef,
    handleUploadClick,
    handleFileChange,
    removeItem,
  } = usePortfolioManager();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Portfolio
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Showcase your best work to attract clients
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Upload Button Card - Always First */}
        <UploadCard
          fileInputRef={fileInputRef}
          onUploadClick={handleUploadClick}
          onFileChange={handleFileChange}
        />

        {/* Portfolio Items */}
        {portfolioItems.map((item) => (
          <PortfolioItemCard
            key={item.id}
            item={item}
            isEditMode={isEditMode}
            onRemove={removeItem}
          />
        ))}
      </div>

      {/* Empty State */}
      {portfolioItems.length === 0 && !isEditMode && (
        <Card>
          <CardContent className="flex min-h-[400px] flex-col items-center justify-center p-12">
            <ImageIcon className="h-16 w-16 text-gray-300 dark:text-gray-600" />
            <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
              No Portfolio Items
            </h3>
            <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
              Add your best work to showcase your services
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

