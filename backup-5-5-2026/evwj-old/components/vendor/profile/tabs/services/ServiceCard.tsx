"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  items: string[];
  inputValue: string;
  onInputChange: (value: string) => void;
  onAdd: () => void;
  onRemove: (item: string) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  isEditMode: boolean;
}

export default function ServiceCard({
  title,
  description,
  items,
  inputValue,
  onInputChange,
  onAdd,
  onRemove,
  onKeyPress,
  isEditMode,
}: ServiceCardProps) {
  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {description}
            </p>
          </div>

          {isEditMode && (
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => onInputChange(e.target.value)}
                onKeyPress={onKeyPress}
                placeholder={`Add a ${title.toLowerCase()}`}
                className="flex-1"
              />
              <Button
                type="button"
                onClick={onAdd}
                size="icon"
                className="shrink-0"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {items.length > 0 ? (
              items.map((item) => (
                <Badge
                  key={item}
                  variant="secondary"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm"
                >
                  <span>{item}</span>
                  {isEditMode && (
                    <button
                      type="button"
                      onClick={() => onRemove(item)}
                      className="ml-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </Badge>
              ))
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No {title.toLowerCase()} added yet
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

