import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Edit, GripVertical } from "lucide-react";
import { CustomField } from "@/types/rsvp";

interface CustomFieldsManagerProps {
  fields: CustomField[];
  onUpdate: (fields: CustomField[]) => void;
}

const CustomFieldsManager = ({ fields, onUpdate }: CustomFieldsManagerProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingField, setEditingField] = useState<CustomField | null>(null);
  const [newField, setNewField] = useState<Partial<CustomField>>({
    label: "",
    type: "text",
    required: false,
    options: []
  });

  const fieldTypes = [
    { value: "text", label: "Text Input" },
    { value: "textarea", label: "Long Text" },
    { value: "dropdown", label: "Dropdown" },
    { value: "radio", label: "Multiple Choice" },
    { value: "checkbox", label: "Checkboxes" }
  ];

  const addField = () => {
    if (newField.label) {
      const field: CustomField = {
        id: Date.now().toString(),
        label: newField.label,
        type: newField.type || "text",
        required: newField.required || false,
        options: newField.options || [],
        placeholder: newField.placeholder
      };
      onUpdate([...fields, field]);
      setNewField({ label: "", type: "text", required: false, options: [] });
      setIsAdding(false);
    }
  };

  const updateField = (id: string, updates: Partial<CustomField>) => {
    onUpdate(fields.map(field => 
      field.id === id ? { ...field, ...updates } : field
    ));
  };

  const removeField = (id: string) => {
    onUpdate(fields.filter(field => field.id !== id));
  };

  const addOption = (fieldId: string, option: string) => {
    updateField(fieldId, {
      options: [...(fields.find(f => f.id === fieldId)?.options || []), option]
    });
  };

  const removeOption = (fieldId: string, optionIndex: number) => {
    const field = fields.find(f => f.id === fieldId);
    if (field) {
      updateField(fieldId, {
        options: field.options?.filter((_, index) => index !== optionIndex)
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Custom RSVP Fields</h3>
        <Button onClick={() => setIsAdding(true)} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Field
        </Button>
      </div>

      {/* Add New Field Form */}
      {isAdding && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-lg">Add Custom Field</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Field Label</Label>
                <Input
                  value={newField.label}
                  onChange={(e) => setNewField({...newField, label: e.target.value})}
                  placeholder="e.g., Transportation Needs"
                />
              </div>
              <div className="space-y-2">
                <Label>Field Type</Label>
                <Select
                  value={newField.type}
                  onValueChange={(value) => setNewField({...newField, type: value as any})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fieldTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {(newField.type === 'text' || newField.type === 'textarea') && (
              <div className="space-y-2">
                <Label>Placeholder Text</Label>
                <Input
                  value={newField.placeholder || ""}
                  onChange={(e) => setNewField({...newField, placeholder: e.target.value})}
                  placeholder="Hint text for users"
                />
              </div>
            )}

            {(newField.type === 'dropdown' || newField.type === 'radio' || newField.type === 'checkbox') && (
              <div className="space-y-2">
                <Label>Options</Label>
                <div className="space-y-2">
                  {newField.options?.map((option, index) => (
                    <div key={index} className="flex gap-2">
                      <Input value={option} readOnly />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newOptions = [...(newField.options || [])];
                          newOptions.splice(index, 1);
                          setNewField({...newField, options: newOptions});
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add option"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          const value = (e.target as HTMLInputElement).value;
                          if (value) {
                            setNewField({
                              ...newField,
                              options: [...(newField.options || []), value]
                            });
                            (e.target as HTMLInputElement).value = '';
                          }
                        }
                      }}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        const input = (e.target as HTMLElement).previousElementSibling as HTMLInputElement;
                        if (input.value) {
                          setNewField({
                            ...newField,
                            options: [...(newField.options || []), input.value]
                          });
                          input.value = '';
                        }
                      }}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Switch
                  checked={newField.required}
                  onCheckedChange={(checked) => setNewField({...newField, required: checked})}
                />
                <Label>Required Field</Label>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={addField}>Add Field</Button>
              <Button variant="outline" onClick={() => setIsAdding(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Existing Fields */}
      <div className="space-y-3">
        {fields.map((field) => (
          <Card key={field.id} className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <GripVertical className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="font-medium">{field.label}</div>
                    <div className="text-sm text-gray-500">
                      {fieldTypes.find(t => t.value === field.type)?.label}
                      {field.required && (
                        <Badge variant="secondary" className="ml-2">Required</Badge>
                      )}
                    </div>
                    {field.options && field.options.length > 0 && (
                      <div className="text-xs text-gray-400 mt-1">
                        Options: {field.options.join(", ")}
                      </div>
                    )}
                    <div className="text-xs text-green-600 mt-1 flex items-center gap-1">
                      <GripVertical className="w-3 h-3" />
                      Ready to drag to form
                    </div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => setEditingField(field)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => removeField(field.id)} className="text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {fields.length === 0 && !isAdding && (
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="p-8 text-center">
            <p className="text-gray-500 mb-4">No custom fields added yet</p>
            <Button onClick={() => setIsAdding(true)} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Custom Field
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CustomFieldsManager;
