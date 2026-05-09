"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RSVPGroup, RSVPSettings } from "@/types/rsvp";
import { Edit, EyeOff, GripVertical, Settings, Trash2 } from "lucide-react";
import { useState } from "react";
import { FormFieldTwo } from "./RSVPFormBuilder";

interface FormCanvasProps {
  formFields: FormFieldTwo[];
  onUpdateField: (fieldId: string, updates: Partial<FormFieldTwo>) => void;
  onRemoveField: (fieldId: string) => void;
  onReorderFields: (draggedId: string, targetId: string) => void;
  onAddField?: (field: FormFieldTwo, insertIndex?: number) => void;
  settings: RSVPSettings;
  groups: RSVPGroup[];
}

const FormCanvas = ({
  formFields,
  onUpdateField,
  onRemoveField,
  onReorderFields,
  onAddField,
  settings,
  groups,
}: FormCanvasProps) => {
  const [draggedField, setDraggedField] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number>(-1);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragOver(false);
      setDragOverIndex(-1);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    setDragOverIndex(-1);

    try {
      const fieldData = JSON.parse(e.dataTransfer.getData("application/json"));

      // Check if it's a new field from the library
      if (!formFields.some((f) => f.id === fieldData.id)) {
        const newField: FormFieldTwo = {
          id: Date.now().toString(),
          type: fieldData.type || "predefined",
          fieldType: fieldData.id || fieldData.fieldType || fieldData.type,
          label: fieldData.label,
          required: fieldData.required || false,
          order: formFields.length + 1,
          config: fieldData.config,
        };

        if (onAddField) {
          onAddField(newField, dragOverIndex >= 0 ? dragOverIndex : undefined);
        }
      }
    } catch (error) {
      console.error("Error parsing dropped field data:", error);
    }
  };

  const handleFieldDragStart = (e: React.DragEvent, fieldId: string) => {
    setDraggedField(fieldId);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", fieldId);
  };

  const handleFieldDragEnd = (e: React.DragEvent) => {
    setDraggedField(null);
    setDragOverIndex(-1);
  };

  const handleFieldDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();

    if (draggedField) {
      e.dataTransfer.dropEffect = "move";

      // Calculate insertion point based on cursor position
      const rect = e.currentTarget.getBoundingClientRect();
      const midY = rect.top + rect.height / 2;
      const insertIndex = e.clientY < midY ? index : index + 1;

      setDragOverIndex(insertIndex);
    }
  };

  const handleFieldDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    e.stopPropagation();

    if (draggedField) {
      const targetField = sortedFields[targetIndex];
      if (targetField && draggedField !== targetField.id) {
        onReorderFields(draggedField, targetField.id);
      }
    }

    setDraggedField(null);
    setDragOverIndex(-1);
  };

  const getInsertionIndicator = (index: number) => {
    if (dragOverIndex === index && draggedField) {
      return (
        <div className="mx-4 my-2 h-1 animate-pulse rounded-full bg-blue-500 shadow-md">
          <div className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-600"></div>
        </div>
      );
    }
    return null;
  };

  const renderFieldPreview = (field: FormFieldTwo) => {
    switch (field.fieldType) {
      case "name":
      case "email":
      case "phone":
        return (
          <Input
            placeholder={`Enter ${field.label.toLowerCase()}`}
            disabled
            className="bg-gray-50"
          />
        );

      case "rsvp-response":
        return (
          <div className="space-y-2">
            <div className="flex items-center space-x-2 rounded border p-2">
              <input
                type="radio"
                disabled
              />
              <label>Yes, I&apos;ll be there!</label>
            </div>
            <div className="flex items-center space-x-2 rounded border p-2">
              <input
                type="radio"
                disabled
              />
              <label>Maybe - I&apos;m not sure yet</label>
            </div>
            <div className="flex items-center space-x-2 rounded border p-2">
              <input
                type="radio"
                disabled
              />
              <label>Sorry, I can&apos;t make it</label>
            </div>
          </div>
        );

      case "plus-ones":
        return (
          <select
            disabled
            className="w-full rounded border bg-gray-50 p-2"
          >
            <option>Just me</option>
            <option>1 additional guest</option>
            <option>2 additional guests</option>
          </select>
        );

      case "group-selection":
        return (
          <select
            disabled
            className="w-full rounded border bg-gray-50 p-2"
          >
            <option>Select your group</option>
            {groups.map((group) => (
              <option key={group.id}>{group.name}</option>
            ))}
          </select>
        );

      case "text":
        return (
          <Input
            placeholder={field.config?.placeholder || "Enter your response"}
            disabled
            className="bg-gray-50"
          />
        );

      case "textarea":
        return (
          <textarea
            placeholder={field.config?.placeholder || "Enter your response"}
            disabled
            className="w-full rounded border bg-gray-50 p-2"
            rows={3}
          />
        );

      case "dropdown":
        return (
          <select
            disabled
            className="w-full rounded border bg-gray-50 p-2"
          >
            <option>Select an option</option>
            {field.config?.options?.map((option: string, index: number) => (
              <option key={index}>{option}</option>
            ))}
          </select>
        );

      case "food-choices":
        return (
          <div className="space-y-2">
            {field.config?.choices?.slice(0, 3).map((choice, index: number) => (
              <div
                key={index}
                className="flex items-center space-x-2 rounded border p-2"
              >
                <input
                  type="radio"
                  disabled
                />
                <label>{choice.name}</label>
              </div>
            ))}
            {field.config?.choices
              ? field.config?.choices?.length > 3 && (
                  <div className="text-sm text-gray-500">
                    +{field.config.choices.length - 3} more options
                  </div>
                )
              : ""}
          </div>
        );

      default:
        return (
          <Input
            placeholder="Field preview"
            disabled
            className="bg-gray-50"
          />
        );
    }
  };

  const sortedFields = [...formFields].sort((a, b) => a.order - b.order);

  return (
    <Card className="h-full bg-white/95 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Form Builder Canvas</span>
          <Badge variant="outline">{formFields.length} fields</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[calc(100%-80px)] overflow-y-auto">
        <div
          className={`min-h-full space-y-1 transition-all ${
            isDragOver
              ? "rounded-lg border-2 border-dashed border-blue-300 bg-blue-50 p-4"
              : ""
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {sortedFields.length === 0 ? (
            <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
              <div className="text-gray-500">
                <Settings className="mx-auto mb-4 h-12 w-12 opacity-50" />
                <h3 className="mb-2 text-lg font-medium">
                  Start Building Your Form
                </h3>
                <p className="text-sm">
                  Drag fields from the library on the left to build your RSVP
                  form. You can reorder fields by dragging them within this
                  area.
                </p>
              </div>
            </div>
          ) : (
            <>
              {getInsertionIndicator(0)}
              {sortedFields.map((field, index) => (
                <div key={field.id}>
                  <div
                    draggable
                    onDragStart={(e) => handleFieldDragStart(e, field.id)}
                    onDragEnd={handleFieldDragEnd}
                    onDragOver={(e) => handleFieldDragOver(e, index)}
                    onDrop={(e) => handleFieldDrop(e, index)}
                    className={`cursor-move rounded-lg border bg-white p-4 transition-all ${
                      draggedField === field.id
                        ? "rotate-1 transform border-blue-500 opacity-50 shadow-lg"
                        : "hover:border-blue-200 hover:shadow-md"
                    } ${editingField === field.id ? "ring-2 ring-blue-500" : ""}`}
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <GripVertical className="h-4 w-4 cursor-grab text-gray-400 hover:text-blue-500" />
                        <span className="font-medium">{field.label}</span>
                        {field.required && (
                          <Badge
                            variant="secondary"
                            className="text-xs"
                          >
                            Required
                          </Badge>
                        )}
                        <Badge
                          variant="outline"
                          className="text-xs"
                        >
                          {field.type === "predefined"
                            ? "Standard"
                            : field.type === "custom"
                              ? "Custom"
                              : "Food"}
                        </Badge>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setEditingField(
                              editingField === field.id ? null : field.id,
                            )
                          }
                        >
                          {editingField === field.id ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Edit className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRemoveField(field.id)}
                          className="text-red-600 hover:bg-red-50 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {editingField === field.id ? (
                      <div className="space-y-3 rounded bg-gray-50 p-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label className="text-sm">Field Label</Label>
                            <Input
                              value={field.label}
                              onChange={(e) =>
                                onUpdateField(field.id, {
                                  label: e.target.value,
                                })
                              }
                              className="mt-1"
                            />
                          </div>
                          <div className="mt-6 flex items-center space-x-2">
                            <Switch
                              checked={field.required}
                              onCheckedChange={(checked) =>
                                onUpdateField(field.id, { required: checked })
                              }
                            />
                            <Label>Required Field</Label>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          {field.label}
                          {field.required && (
                            <span className="ml-1 text-red-500">*</span>
                          )}
                        </Label>
                        {renderFieldPreview(field)}
                      </div>
                    )}
                  </div>
                  {getInsertionIndicator(index + 1)}
                </div>
              ))}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FormCanvas;
