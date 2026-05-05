"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Image as ImageIcon } from "lucide-react";
import { PortfolioItem } from "./types";

interface PortfolioItemCardProps {
  item: PortfolioItem;
  isEditMode: boolean;
  onRemove: (id: string) => void;
}

export default function PortfolioItemCard({
  item,
  isEditMode,
  onRemove,
}: PortfolioItemCardProps) {
  return (
    <Card className="group relative overflow-hidden border">
      <CardContent className="p-0">
        <div className="relative min-h-[200px] sm:min-h-[250px]">
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.title || "Portfolio item"}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex min-h-[200px] items-center justify-center bg-gray-200 dark:bg-gray-800">
              <ImageIcon className="h-12 w-12 text-gray-400 dark:text-gray-600" />
            </div>
          )}
        </div>

        {/* Remove Button - Only in Edit Mode */}
        {isEditMode && (
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute right-2 top-2 h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
            onClick={() => onRemove(item.id)}
          >
            <X className="h-4 w-4" />
          </Button>
        )}

        {/* Title Overlay */}
        {item.title && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <p className="text-sm font-semibold text-white">{item.title}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

