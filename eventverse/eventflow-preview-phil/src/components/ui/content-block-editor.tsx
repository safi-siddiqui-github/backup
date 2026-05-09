import React, { useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Plus,
  Type,
  Image,
  Video,
  GripVertical,
  X,
  Sparkles,
  ChevronUp,
  ChevronDown,
  Trash2
} from "lucide-react";
import { AdvancedRichTextEditor } from "./advanced-rich-text-editor";
import { useSectionDragHandler } from "../website-builder/SectionDragHandler";
import { cn } from "@/lib/utils";

interface ContentBlock {
  id: string;
  type: "text" | "image" | "video";
  content: string;
  order: number;
}

interface ContentBlockEditorProps {
  blocks?: ContentBlock[];
  onChange?: (blocks: ContentBlock[]) => void;
  placeholder?: string;
  className?: string;
  showAISuggestions?: boolean;
}

export const ContentBlockEditor = ({
  blocks = [],
  onChange,
  placeholder = "Start writing your event description...",
  className,
  showAISuggestions = true
}: ContentBlockEditorProps) => {
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>(
    blocks.length > 0 
      ? blocks 
      : [{ id: "1", type: "text", content: "", order: 0 }]
  );
  const isInternalUpdate = useRef(false);

  const updateBlocks = useCallback((newBlocks: ContentBlock[]) => {
    // Update order property to match array index
    const blocksWithOrder = newBlocks.map((block, index) => ({
      ...block,
      order: index
    }));
    setContentBlocks(blocksWithOrder);
    if (isInternalUpdate.current) {
      onChange?.(blocksWithOrder);
    }
  }, [onChange]);

  const handleReorder = (startIndex: number, endIndex: number) => {
    const newBlocks = [...contentBlocks];
    const [movedBlock] = newBlocks.splice(startIndex, 1);
    newBlocks.splice(endIndex, 0, movedBlock);
    updateBlocks(newBlocks);
  };

  const { dragState, handleDragStart, handleDragOver, handleDrop, resetDragState } = useSectionDragHandler(handleReorder);

  const addBlock = (type: "text" | "image" | "video") => {
    const newBlock: ContentBlock = {
      id: Date.now().toString(),
      type,
      content: "",
      order: contentBlocks.length
    };
    updateBlocks([...contentBlocks, newBlock]);
  };

  const updateBlock = useCallback((id: string, content: string) => {
    const updatedBlocks = contentBlocks.map(block =>
      block.id === id ? { ...block, content } : block
    );
    isInternalUpdate.current = true;
    updateBlocks(updatedBlocks);
    setTimeout(() => {
      isInternalUpdate.current = false;
    }, 0);
  }, [contentBlocks, updateBlocks]);

  const removeBlock = (id: string) => {
    // Allow removing any block, but ensure at least one text block remains
    const filteredBlocks = contentBlocks.filter(block => block.id !== id);
    if (filteredBlocks.length === 0) {
      // If removing the last block, add a new empty text block
      updateBlocks([{ id: Date.now().toString(), type: "text", content: "", order: 0 }]);
    } else {
      updateBlocks(filteredBlocks);
    }
  };

  const moveBlock = (id: string, direction: "up" | "down") => {
    const currentIndex = contentBlocks.findIndex(block => block.id === id);
    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    
    if (newIndex < 0 || newIndex >= contentBlocks.length) return;
    
    const newBlocks = [...contentBlocks];
    [newBlocks[currentIndex], newBlocks[newIndex]] = [newBlocks[newIndex], newBlocks[currentIndex]];
    
    // Update order
    newBlocks.forEach((block, index) => {
      block.order = index;
    });
    
    updateBlocks(newBlocks);
  };

  const BlockControls = ({ blockId, blockIndex }: { 
    blockId: string; 
    blockIndex: number;
  }) => (
    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
      {/* Drag Handle */}
      <Button
        variant="ghost"
        size="sm"
        className="h-6 w-6 p-0 hover:bg-muted/60 cursor-grab active:cursor-grabbing"
        draggable
        onDragStart={(e) => handleDragStart(blockIndex, e)}
        title="Drag to reorder"
      >
        <GripVertical className="h-3 w-3" />
      </Button>
      
      {/* Move Up/Down buttons */}
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 hover:bg-muted/60"
          onClick={() => moveBlock(blockId, "up")}
          disabled={blockIndex === 0}
          title="Move up"
        >
          <ChevronUp className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 hover:bg-muted/60"
          onClick={() => moveBlock(blockId, "down")}
          disabled={blockIndex === contentBlocks.length - 1}
          title="Move down"
        >
          <ChevronDown className="h-3 w-3" />
        </Button>
      </div>
      
      {/* Delete Button - Always visible */}
      <Button
        variant="ghost"
        size="sm"
        className="h-6 w-6 p-0 hover:bg-destructive/10 text-destructive hover:text-destructive"
        onClick={() => removeBlock(blockId)}
        title="Delete block"
      >
        <Trash2 className="h-3 w-3" />
      </Button>
    </div>
  );

  const TextBlock = ({ block, blockIndex }: { block: ContentBlock; blockIndex: number }) => (
    <div className="group relative">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <Type className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">Text Block</span>
        </div>
        <BlockControls 
          blockId={block.id} 
          blockIndex={blockIndex}
        />
      </div>
      <AdvancedRichTextEditor
        content={block.content}
        onChange={(content) => updateBlock(block.id, content)}
        placeholder={blockIndex === 0 ? placeholder : "Continue writing..."}
        minHeight="140px"
        showAISuggestions={showAISuggestions && blockIndex === 0}
      />
    </div>
  );

  const MediaBlock = ({ block, blockIndex }: { block: ContentBlock; blockIndex: number }) => (
    <div className="group relative">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          {block.type === "image" ? (
            <Image className="h-4 w-4 text-muted-foreground" />
          ) : (
            <Video className="h-4 w-4 text-muted-foreground" />
          )}
          <span className="text-sm font-medium text-muted-foreground capitalize">
            {block.type} Block
          </span>
        </div>
        <BlockControls 
          blockId={block.id} 
          blockIndex={blockIndex}
        />
      </div>
      <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors">
        <div className="flex flex-col items-center gap-3">
          {block.type === "image" ? (
            <Image className="h-8 w-8 text-muted-foreground" />
          ) : (
            <Video className="h-8 w-8 text-muted-foreground" />
          )}
          <div>
            <p className="font-medium text-muted-foreground">
              Drop your {block.type} here or click to browse
            </p>
            <p className="text-sm text-muted-foreground/70">
              {block.type === "image" 
                ? "JPEG, PNG up to 10MB" 
                : "MP4, MOV up to 50MB"
              }
            </p>
          </div>
          <Button variant="outline" size="sm">
            Choose {block.type}
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={cn("space-y-4", className)}>
      {/* Content Blocks */}
      <div className="space-y-6">
        {contentBlocks.map((block, index) => (
          <Card 
            key={block.id} 
            className={cn(
              "p-4 transition-all duration-200",
              dragState.isDragging && dragState.draggedIndex === index && "opacity-50 scale-95",
              dragState.dragOverIndex === index && dragState.draggedIndex !== index && "border-primary/50 shadow-md"
            )}
            draggable={false}
            onDragOver={(e) => {
              e.preventDefault();
              handleDragOver(index);
            }}
            onDrop={(e) => {
              e.preventDefault();
              handleDrop(index);
            }}
          >
            {block.type === "text" ? (
              <TextBlock block={block} blockIndex={index} />
            ) : (
              <MediaBlock block={block} blockIndex={index} />
            )}
          </Card>
        ))}
      </div>

      {/* Add Block Controls */}
      <div className="flex items-center justify-center pt-4">
        <div className="flex items-center gap-2 p-2 border rounded-lg bg-muted/30">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => addBlock("text")}
            className="h-8 px-3 text-xs"
          >
            <Type className="h-3 w-3 mr-1" />
            Add text
          </Button>
          <Separator orientation="vertical" className="h-4" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => addBlock("image")}
            className="h-8 px-3 text-xs"
          >
            <Image className="h-3 w-3 mr-1" />
            Add image
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => addBlock("video")}
            className="h-8 px-3 text-xs"
          >
            <Video className="h-3 w-3 mr-1" />
            Add video
          </Button>
        </div>
      </div>

      {/* AI Enhancement Suggestion */}
      {showAISuggestions && contentBlocks.some(block => block.content.trim()) && (
        <div className="border border-purple-200 rounded-lg p-4 bg-gradient-to-r from-purple-50/50 to-blue-50/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-900">
                AI Suggestions Available
              </span>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              className="text-purple-700 border-purple-200 hover:bg-purple-50"
            >
              Enhance content
            </Button>
          </div>
          <p className="text-xs text-purple-700 mt-1">
            Let AI help improve your event description with better structure and compelling content
          </p>
        </div>
      )}
    </div>
  );
};