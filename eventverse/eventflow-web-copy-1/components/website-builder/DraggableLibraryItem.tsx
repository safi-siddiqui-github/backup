"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SectionType } from "@/types/website";
import { ElementType } from "react";

interface FloatingBlock {
  id: string;
  name: string;
  icon: ElementType;
  type: SectionType | "widget";
  category: "corners" | "floating" | "widgets" | "overlay";
  description: string;
  defaultSize: { width: number; height: number };
}

interface DraggableLibraryItemProps {
  block: FloatingBlock;
  category: {
    id: string;
    name: string;
  };
  onAddBlock: (
    block: FloatingBlock,
    position?: { x: number; y: number },
  ) => void;
  onStartDrag?: (blockType: SectionType, event: React.MouseEvent) => void;
}

export const DraggableLibraryItem = ({
  block,
  category,
  onAddBlock,
  onStartDrag,
}: DraggableLibraryItemProps) => {
  const handleMouseDown = (e: React.MouseEvent) => {
    if (onStartDrag && block.type !== "widget") {
      // Prevent click if we're starting a drag
      e.preventDefault();
      onStartDrag(block.type as SectionType, e);
    }
  };

  const handleClick = () => {
    // Only handle click if we didn't start a drag
    onAddBlock(block);
  };

  return (
    <Card
      className="cursor-pointer border-2 border-dashed transition-all select-none hover:scale-[1.02] hover:border-solid hover:border-violet-300 hover:shadow-md"
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      draggable={block.type !== "widget"}
      onDragStart={(e) => {
        // Prevent default drag behavior, we'll handle it with mouse events
        e.preventDefault();
      }}
    >
      <CardContent className="p-3">
        <div className="flex items-start gap-3">
          <div className="rounded-md bg-gradient-to-br from-violet-100 to-blue-100 p-2">
            <block.icon className="h-4 w-4 text-violet-600" />
          </div>
          <div className="min-w-0 flex-1">
            <h5 className="mb-1 text-sm font-medium">{block.name}</h5>
            <p className="text-muted-foreground mb-2 line-clamp-2 text-xs">
              {block.description}
            </p>
            <div className="flex items-center justify-between">
              <Badge
                variant="secondary"
                className="text-xs"
              >
                {block.defaultSize.width}×{block.defaultSize.height}
              </Badge>
              <Badge
                variant="outline"
                className="text-xs"
                style={{
                  backgroundColor:
                    category.id === "corners"
                      ? "#f3f4f6"
                      : category.id === "floating"
                        ? "#fef3c7"
                        : category.id === "widgets"
                          ? "#ddd6fe"
                          : "#fce7f3",
                }}
              >
                {category.name.split(" ")[0]}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
