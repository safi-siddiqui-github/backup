import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Upload } from "lucide-react";

// Define types locally
interface Vendor {
  id: number;
  name: string;
  category: string;
  contact: string;
  rating: number;
  description: string;
}

interface VendorFormProps {
  vendor?: Vendor;
  onSave: (vendor: Partial<Vendor>) => void;
  onClose: () => void;
  isEditing: boolean;
}

const VendorForm = ({ vendor, onSave, onClose, isEditing }: VendorFormProps) => {
  const [formData, setFormData] = useState({
    name: vendor?.name || "",
    category: vendor?.category || "",
    contact: vendor?.contact || "",
    rating: vendor?.rating || 0,
    description: vendor?.description || ""
  });

  useEffect(() => {
    if (vendor) {
      setFormData({
        name: vendor.name,
        category: vendor.category,
        contact: vendor.contact,
        rating: vendor.rating,
        description: vendor.description
      });
    }
  }, [vendor]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const categories = ["Catering", "Venue", "Photography", "Entertainment", "Florist", "Other"];

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Vendor" : "Add New Vendor"}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Vendor name"
              required
            />
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Contact */}
          <div>
            <Label htmlFor="contact">Contact</Label>
            <Input
              id="contact"
              value={formData.contact}
              onChange={(e) => handleInputChange("contact", e.target.value)}
              placeholder="Contact information"
            />
          </div>

          {/* Rating */}
          <div>
            <Label htmlFor="rating">Rating</Label>
            <Input
              id="rating"
              type="number"
              step="0.1"
              value={formData.rating}
              onChange={(e) => handleInputChange("rating", Number(e.target.value))}
              placeholder="0.0"
              min="0"
              max="5"
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Vendor description"
              rows={3}
            />
          </div>

          {/* Receipt Upload */}
          <div>
            <Label htmlFor="receipt">Upload Vendor Image</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Upload image (coming soon)</p>
              <p className="text-xs text-gray-500">Drag and drop or click to browse</p>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {isEditing ? "Update" : "Add"} Vendor
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default VendorForm;
