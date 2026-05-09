import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Trash2, 
  Eye, 
  Settings,
  Type,
  Palette,
  Image,
  Plus,
  X
} from "lucide-react";
import { Section, ButtonContent } from "@/types/website";
import { toast } from "sonner";

interface SectionEditorProps {
  section: Section;
  onUpdate: (sectionId: string, updates: Partial<Section>) => void;
  onDelete: (sectionId: string) => void;
  onDeselect: () => void;
}

export const SectionEditor = ({ section, onUpdate, onDelete, onDeselect }: SectionEditorProps) => {
  const [activeTab, setActiveTab] = useState<'content' | 'styling'>('content');

  const handleContentChange = (field: string, value: any) => {
    onUpdate(section.id, {
      content: {
        ...section.content,
        [field]: value
      }
    });
  };

  const handleStylingChange = (field: string, value: string) => {
    onUpdate(section.id, {
      styling: {
        ...section.styling,
        [field]: value
      }
    });
  };

  const handleAddButton = () => {
    const buttons = section.content.buttons || [];
    const newButton: ButtonContent = {
      text: 'New Button',
      link: '#',
      style: 'primary'
    };
    
    handleContentChange('buttons', [...buttons, newButton]);
  };

  const handleUpdateButton = (index: number, updates: Partial<ButtonContent>) => {
    const buttons = [...(section.content.buttons || [])];
    buttons[index] = { ...buttons[index], ...updates };
    handleContentChange('buttons', buttons);
  };

  const handleRemoveButton = (index: number) => {
    const buttons = [...(section.content.buttons || [])];
    buttons.splice(index, 1);
    handleContentChange('buttons', buttons);
  };

  const handleDeleteSection = () => {
    if (confirm('Are you sure you want to delete this section?')) {
      onDelete(section.id);
      toast.success('Section deleted');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Edit Section</h3>
          <Badge variant="outline" className="text-xs mt-1">
            {section.type}
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={onDeselect}>
            <X className="w-4 h-4" />
          </Button>
          <Button variant="destructive" size="sm" onClick={handleDeleteSection}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <Separator />

      {/* Tab Navigation */}
      <div className="flex gap-2">
        <Button
          variant={activeTab === 'content' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveTab('content')}
        >
          <Type className="w-4 h-4 mr-2" />
          Content
        </Button>
        <Button
          variant={activeTab === 'styling' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveTab('styling')}
        >
          <Palette className="w-4 h-4 mr-2" />
          Style
        </Button>
      </div>

      {/* Content Tab */}
      {activeTab === 'content' && (
        <div className="space-y-4">
          {/* Title */}
          {(section.type === 'hero' || section.type === 'about' || section.type === 'text' || section.type === 'gallery' || section.type === 'contact' || section.type === 'rsvp') && (
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={section.content.title || ''}
                onChange={(e) => handleContentChange('title', e.target.value)}
                placeholder="Section title"
              />
            </div>
          )}

          {/* Subtitle */}
          {section.type === 'hero' && (
            <div>
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                value={section.content.subtitle || ''}
                onChange={(e) => handleContentChange('subtitle', e.target.value)}
                placeholder="Section subtitle"
              />
            </div>
          )}

          {/* Description */}
          {(section.type === 'hero' || section.type === 'about' || section.type === 'gallery' || section.type === 'contact' || section.type === 'rsvp') && (
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={section.content.description || ''}
                onChange={(e) => handleContentChange('description', e.target.value)}
                placeholder="Section description"
                rows={3}
              />
            </div>
          )}

          {/* Content (for text sections) */}
          {section.type === 'text' && (
            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={section.content.content || ''}
                onChange={(e) => handleContentChange('content', e.target.value)}
                placeholder="Your content here..."
                rows={5}
              />
            </div>
          )}

          {/* Images */}
          {(section.type === 'image' || section.type === 'gallery') && (
            <div>
              <Label>Images</Label>
              <div className="space-y-2">
                {(section.content.images || []).map((image, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={image}
                      onChange={(e) => {
                        const images = [...(section.content.images || [])];
                        images[index] = e.target.value;
                        handleContentChange('images', images);
                      }}
                      placeholder="Image URL"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const images = [...(section.content.images || [])];
                        images.splice(index, 1);
                        handleContentChange('images', images);
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const images = [...(section.content.images || []), ''];
                    handleContentChange('images', images);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Image
                </Button>
              </div>
            </div>
          )}

          {/* Buttons */}
          {(section.type === 'hero' || section.type === 'about') && (
            <div>
              <Label>Buttons</Label>
              <div className="space-y-3">
                {(section.content.buttons || []).map((button, index) => (
                  <Card key={index} className="p-3">
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Input
                          value={button.text}
                          onChange={(e) => handleUpdateButton(index, { text: e.target.value })}
                          placeholder="Button text"
                        />
                        <Input
                          value={button.link}
                          onChange={(e) => handleUpdateButton(index, { link: e.target.value })}
                          placeholder="Button link"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemoveButton(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      <select
                        className="w-full p-2 border rounded-md"
                        value={button.style}
                        onChange={(e) => handleUpdateButton(index, { style: e.target.value as any })}
                      >
                        <option value="primary">Primary</option>
                        <option value="secondary">Secondary</option>
                        <option value="outline">Outline</option>
                      </select>
                    </div>
                  </Card>
                ))}
                <Button variant="outline" size="sm" onClick={handleAddButton}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Button
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Styling Tab */}
      {activeTab === 'styling' && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="backgroundColor">Background Color</Label>
            <Input
              id="backgroundColor"
              type="color"
              value={section.styling?.backgroundColor?.includes('hsl') ? '#000000' : (section.styling?.backgroundColor || '#ffffff')}
              onChange={(e) => handleStylingChange('backgroundColor', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="textColor">Text Color</Label>
            <Input
              id="textColor"
              type="color"
              value={section.styling?.textColor?.includes('hsl') ? '#000000' : (section.styling?.textColor || '#000000')}
              onChange={(e) => handleStylingChange('textColor', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="padding">Padding</Label>
            <Input
              id="padding"
              value={section.styling?.padding || ''}
              onChange={(e) => handleStylingChange('padding', e.target.value)}
              placeholder="e.g., 4rem 0"
            />
          </div>

          <div>
            <Label htmlFor="backgroundImage">Background Image URL</Label>
            <Input
              id="backgroundImage"
              value={section.styling?.backgroundImage || ''}
              onChange={(e) => handleStylingChange('backgroundImage', e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <Label htmlFor="borderRadius">Border Radius</Label>
            <Input
              id="borderRadius"
              value={section.styling?.borderRadius || ''}
              onChange={(e) => handleStylingChange('borderRadius', e.target.value)}
              placeholder="e.g., 8px"
            />
          </div>
        </div>
      )}
    </div>
  );
};