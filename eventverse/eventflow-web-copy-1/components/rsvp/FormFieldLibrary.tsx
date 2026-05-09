"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomField, FoodChoice } from "@/types/rsvp";
import { Grip } from "lucide-react";
import { useState } from "react";
import CustomFieldsManager from "./CustomFieldsManager";
import FoodChoicesManager from "./FoodChoicesManager";
import { FormFieldTwo } from "./RSVPFormBuilder";

interface FormFieldLibraryProps {
  predefinedFields: CustomField[];
  customFields: CustomField[];
  onUpdateCustomFields: (fields: CustomField[]) => void;
  foodChoices: FoodChoice[];
  onUpdateFoodChoices: (choices: FoodChoice[]) => void;
  // onAddField: (field: unknown) => void;
  onAddField: (field: FormFieldTwo, insertIndex?: number) => void;
}

const FormFieldLibrary = ({
  predefinedFields,
  customFields,
  onUpdateCustomFields,
  foodChoices,
  onUpdateFoodChoices,
  onAddField,
}: FormFieldLibraryProps) => {
  const [activeLibraryTab, setActiveLibraryTab] = useState("predefined");
  const [draggedField, setDraggedField] = useState<CustomField | null>(null);

  const handleDragStart = (e: React.DragEvent, field: CustomField) => {
    setDraggedField(field);

    // Create a custom drag image
    const dragImage = document.createElement("div");
    dragImage.className =
      "bg-white border-2 border-blue-500 rounded-lg p-3 shadow-xl opacity-95 max-w-xs";
    dragImage.style.position = "absolute";
    dragImage.style.top = "-1000px";
    dragImage.style.left = "-1000px";
    dragImage.innerHTML = `
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
        <span class="font-medium text-sm">${field.label}</span>
        ${field.required ? '<span class="text-xs bg-red-100 text-red-700 px-1 rounded">Required</span>' : ""}
      </div>
    `;
    document.body.appendChild(dragImage);

    e.dataTransfer.setDragImage(dragImage, 10, 10);
    e.dataTransfer.setData("application/json", JSON.stringify(field));
    e.dataTransfer.effectAllowed = "copy";

    // Clean up drag image
    setTimeout(() => {
      if (document.body.contains(dragImage)) {
        document.body.removeChild(dragImage);
      }
    }, 0);
  };

  const handleDragEnd = () => {
    setDraggedField(null);
  };

  return (
    <Card className="h-full bg-white/95 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Field Library</CardTitle>
        <p className="text-sm text-gray-600">
          Drag fields to add them to your form
        </p>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs
          value={activeLibraryTab}
          onValueChange={setActiveLibraryTab}
          className="h-full"
        >
          <TabsList className="mx-4 mb-4 grid w-full grid-cols-3">
            <TabsTrigger
              value="predefined"
              className="text-xs"
            >
              Standard
            </TabsTrigger>
            <TabsTrigger
              value="custom"
              className="text-xs"
            >
              Custom
            </TabsTrigger>
            <TabsTrigger
              value="food"
              className="text-xs"
            >
              Food
            </TabsTrigger>
          </TabsList>

          <div className="h-[calc(100%-120px)] overflow-y-auto px-4 pb-4">
            <TabsContent
              value="predefined"
              className="mt-0 space-y-2"
            >
              {predefinedFields.map((field) => (
                <div
                  key={field.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, field)}
                  onDragEnd={handleDragEnd}
                  className={`group cursor-grab rounded-lg border p-3 transition-all hover:border-blue-300 hover:bg-blue-50 active:cursor-grabbing ${
                    draggedField?.id === field.id
                      ? "scale-95 border-blue-500 bg-blue-50 opacity-50"
                      : ""
                  }`}
                >
                  <div className="mb-1 flex items-center gap-2">
                    <Grip className="h-4 w-4 text-gray-400 group-hover:text-blue-500" />
                    {field?.icon && (
                      <field.icon className="h-4 w-4 text-gray-500 group-hover:text-blue-600" />
                    )}
                    {/* <field.icon className="h-4 w-4 text-gray-500 group-hover:text-blue-600" /> */}
                    <span className="text-sm font-medium">{field.label}</span>
                    {field.required && (
                      <Badge
                        variant="secondary"
                        className="text-xs"
                      >
                        Required
                      </Badge>
                    )}
                  </div>
                  <p className="ml-8 text-xs text-gray-500">
                    {field.description}
                  </p>
                </div>
              ))}
            </TabsContent>

            <TabsContent
              value="custom"
              className="mt-0"
            >
              <div className="space-y-4">
                {customFields.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-sm font-medium">
                      Your Custom Fields:
                    </div>
                    {customFields.map((field) => (
                      <div
                        key={field.id}
                        draggable
                        onDragStart={(e) =>
                          handleDragStart(e, { ...field, type: "custom" })
                        }
                        onDragEnd={handleDragEnd}
                        className={`group cursor-grab rounded-lg border p-3 transition-all hover:border-blue-300 hover:bg-blue-50 active:cursor-grabbing ${
                          draggedField?.id === field.id
                            ? "scale-95 border-blue-500 bg-blue-50 opacity-50"
                            : ""
                        }`}
                      >
                        <div className="mb-1 flex items-center gap-2">
                          <Grip className="h-4 w-4 text-gray-400 group-hover:text-blue-500" />
                          <span className="text-sm font-medium">
                            {field.label}
                          </span>
                          {field.required && (
                            <Badge
                              variant="secondary"
                              className="text-xs"
                            >
                              Required
                            </Badge>
                          )}
                        </div>
                        <div className="ml-6 text-xs text-gray-500">
                          {field.type} • Custom field
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <CustomFieldsManager
                  fields={customFields}
                  onUpdate={onUpdateCustomFields}
                />
              </div>
            </TabsContent>

            <TabsContent
              value="food"
              className="mt-0"
            >
              <div className="space-y-4">
                {foodChoices.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Food Options:</div>
                    <div
                      draggable
                      onDragStart={(e) =>
                        handleDragStart(e, {
                          id: "food-choices",
                          type: "food",
                          label: "Meal Selection",
                          description: "Choose meal preferences",
                          config: { choices: foodChoices },
                        })
                      }
                      onDragEnd={handleDragEnd}
                      className={`group cursor-grab rounded-lg border p-3 transition-all hover:border-blue-300 hover:bg-blue-50 active:cursor-grabbing ${
                        draggedField?.id === "food-choices"
                          ? "scale-95 border-blue-500 bg-blue-50 opacity-50"
                          : ""
                      }`}
                    >
                      <div className="mb-1 flex items-center gap-2">
                        <Grip className="h-4 w-4 text-gray-400 group-hover:text-blue-500" />
                        <span className="text-sm font-medium">
                          Meal Selection
                        </span>
                      </div>
                      <div className="ml-6 text-xs text-gray-500">
                        {foodChoices.length} options available
                      </div>
                    </div>
                  </div>
                )}

                <FoodChoicesManager
                  choices={foodChoices}
                  onUpdate={onUpdateFoodChoices}
                />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FormFieldLibrary;
