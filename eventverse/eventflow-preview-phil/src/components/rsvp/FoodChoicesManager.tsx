import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2, Edit, Utensils } from "lucide-react";
import { FoodChoice } from "@/types/rsvp";

interface FoodChoicesManagerProps {
  choices: FoodChoice[];
  onUpdate: (choices: FoodChoice[]) => void;
}

const FoodChoicesManager = ({ choices, onUpdate }: FoodChoicesManagerProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newChoice, setNewChoice] = useState<Partial<FoodChoice>>({
    name: "",
    description: "",
    dietary: [],
    category: "main"
  });

  const categories = [
    { value: "appetizer", label: "Appetizer" },
    { value: "main", label: "Main Course" },
    { value: "dessert", label: "Dessert" },
    { value: "beverage", label: "Beverage" }
  ];

  const dietaryOptions = [
    "Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Nut-Free", 
    "Keto", "Halal", "Kosher", "Low-Carb", "Organic"
  ];

  const addChoice = () => {
    if (newChoice.name) {
      const choice: FoodChoice = {
        id: Date.now().toString(),
        name: newChoice.name,
        description: newChoice.description,
        dietary: newChoice.dietary || [],
        category: newChoice.category || "main",
        price: newChoice.price
      };
      onUpdate([...choices, choice]);
      setNewChoice({ name: "", description: "", dietary: [], category: "main" });
      setIsAdding(false);
    }
  };

  const removeChoice = (id: string) => {
    onUpdate(choices.filter(choice => choice.id !== id));
  };

  const toggleDietary = (dietary: string) => {
    const current = newChoice.dietary || [];
    if (current.includes(dietary)) {
      setNewChoice({
        ...newChoice,
        dietary: current.filter(d => d !== dietary)
      });
    } else {
      setNewChoice({
        ...newChoice,
        dietary: [...current, dietary]
      });
    }
  };

  const groupedChoices = categories.map(category => ({
    ...category,
    items: choices.filter(choice => choice.category === category.value)
  }));

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Food & Beverage Options</h3>
        <Button onClick={() => setIsAdding(true)} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Option
        </Button>
      </div>

      {/* Add New Choice Form */}
      {isAdding && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-lg">Add Food Option</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Option Name</Label>
                <Input
                  value={newChoice.name}
                  onChange={(e) => setNewChoice({...newChoice, name: e.target.value})}
                  placeholder="e.g., Grilled Salmon"
                />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={newChoice.category}
                  onValueChange={(value) => setNewChoice({...newChoice, category: value as any})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={newChoice.description}
                onChange={(e) => setNewChoice({...newChoice, description: e.target.value})}
                placeholder="Describe the dish, ingredients, preparation method..."
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label>Price per Person (Optional)</Label>
              <Input
                type="number"
                step="0.01"
                value={newChoice.price || ""}
                onChange={(e) => setNewChoice({...newChoice, price: e.target.value ? parseFloat(e.target.value) : undefined})}
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <Label>Dietary Information</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {dietaryOptions.map(dietary => (
                  <div key={dietary} className="flex items-center space-x-2">
                    <Checkbox
                      checked={(newChoice.dietary || []).includes(dietary)}
                      onCheckedChange={() => toggleDietary(dietary)}
                    />
                    <Label className="text-sm">{dietary}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={addChoice}>Add Option</Button>
              <Button variant="outline" onClick={() => setIsAdding(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Existing Choices by Category */}
      <div className="space-y-6">
        {groupedChoices.map(category => (
          <div key={category.value}>
            <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
              <Utensils className="w-4 h-4" />
              {category.label} ({category.items.length})
            </h4>
            
            {category.items.length === 0 ? (
              <Card className="border-dashed border-2 border-gray-200">
                <CardContent className="p-4 text-center text-gray-500">
                  No {category.label.toLowerCase()} options added yet
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-3">
                {category.items.map(choice => (
                  <Card key={choice.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h5 className="font-medium">{choice.name}</h5>
                            {choice.price && (
                              <Badge variant="outline">${choice.price}</Badge>
                            )}
                          </div>
                          {choice.description && (
                            <p className="text-sm text-gray-600 mb-2">{choice.description}</p>
                          )}
                          {choice.dietary.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {choice.dietary.map(dietary => (
                                <Badge key={dietary} variant="secondary" className="text-xs">
                                  {dietary}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex gap-1 ml-4">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => removeChoice(choice.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {choices.length === 0 && !isAdding && (
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="p-8 text-center">
            <Utensils className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No food options added yet</p>
            <Button onClick={() => setIsAdding(true)} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Food Option
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FoodChoicesManager;
