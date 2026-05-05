"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Plus } from "lucide-react";
import { Service } from "./use-services-form";

interface ServicesGroupedCardProps {
  title: string;
  description: string;
  groupedServices: Record<string, Service[]>;
  categories: string[];
  serviceInput: string;
  serviceCategory: string;
  onServiceInputChange: (value: string) => void;
  onServiceCategoryChange: (value: string) => void;
  onAdd: (category?: string) => void;
  onRemove: (serviceId: string) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  isEditMode: boolean;
}

export default function ServicesGroupedCard({
  title,
  description,
  groupedServices,
  categories,
  serviceInput,
  serviceCategory,
  onServiceInputChange,
  onServiceCategoryChange,
  onAdd,
  onRemove,
  onKeyPress,
  isEditMode,
}: ServicesGroupedCardProps) {
  const hasServices = Object.values(groupedServices).some((services) => services.length > 0);

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

          {isEditMode && categories.length > 0 && (
            <div className="space-y-2">
              <div className="grid gap-2 sm:grid-cols-[1fr_200px_auto]">
                <Input
                  value={serviceInput}
                  onChange={(e) => onServiceInputChange(e.target.value)}
                  onKeyPress={onKeyPress}
                  placeholder="Add a service"
                  className="flex-1"
                />
                <Select
                  value={serviceCategory}
                  onValueChange={onServiceCategoryChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  onClick={() => onAdd()}
                  size="icon"
                  className="shrink-0"
                  disabled={!serviceInput.trim() || !serviceCategory}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {categories.length === 0 && (
                <p className="text-sm text-amber-600 dark:text-amber-400">
                  Please select at least one category in Basic Info to add services.
                </p>
              )}
            </div>
          )}

          {!hasServices && !isEditMode && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No {title.toLowerCase()} added yet
            </p>
          )}

          {hasServices && (
            <div className="space-y-6">
              {Object.entries(groupedServices).map(([category, services]) => (
                <div key={category} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {category}
                    </h4>
                    <Badge variant="outline" className="text-xs">
                      {services.length}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {services.map((service) => (
                      <Badge
                        key={service.id}
                        variant="secondary"
                        className="flex items-center gap-1.5 px-3 py-1.5 text-sm"
                      >
                        <span>{service.name}</span>
                        {isEditMode && (
                          <button
                            type="button"
                            onClick={() => onRemove(service.id)}
                            className="ml-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

