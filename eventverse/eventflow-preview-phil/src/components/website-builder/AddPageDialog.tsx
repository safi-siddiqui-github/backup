import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { FileText, Phone, Image, Calendar, MessageSquare, Users } from "lucide-react";

interface AddPageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreatePage: (name: string, path: string, template?: string) => void;
}

const pageTemplates = [
  {
    id: "blank",
    name: "Blank Page",
    description: "Start with an empty page",
    icon: FileText,
    path: "page",
  },
  {
    id: "about",
    name: "About",
    description: "Tell your story",
    icon: Users,
    path: "about",
  },
  {
    id: "contact",
    name: "Contact",
    description: "Contact information and form",
    icon: Phone,
    path: "contact",
  },
  {
    id: "gallery",
    name: "Gallery",
    description: "Photo and media gallery",
    icon: Image,
    path: "gallery",
  },
  {
    id: "schedule",
    name: "Schedule",
    description: "Event timeline and agenda",
    icon: Calendar,
    path: "schedule",
  },
  {
    id: "testimonials",
    name: "Testimonials",
    description: "Customer reviews and feedback",
    icon: MessageSquare,
    path: "testimonials",
  },
];

export const AddPageDialog = ({
  open,
  onOpenChange,
  onCreatePage,
}: AddPageDialogProps) => {
  const [pageName, setPageName] = useState("");
  const [pagePath, setPagePath] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("blank");

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = pageTemplates.find(t => t.id === templateId);
    if (template && !pageName) {
      setPageName(template.name);
      setPagePath(template.path);
    }
  };

  const handleCreate = () => {
    if (!pageName.trim()) return;
    
    const cleanPath = pagePath || pageName.toLowerCase().replace(/\s+/g, '-');
    onCreatePage(pageName.trim(), `/${cleanPath}`, selectedTemplate);
    
    // Reset form
    setPageName("");
    setPagePath("");
    setSelectedTemplate("blank");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Page</DialogTitle>
          <DialogDescription>
            Choose a template and configure your new page
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-3 py-4">
          {pageTemplates.map((template) => {
            const Icon = template.icon;
            return (
              <Card
                key={template.id}
                className={`p-3 cursor-pointer transition-all hover:border-primary ${
                  selectedTemplate === template.id
                    ? "border-primary bg-primary/5"
                    : "border-border"
                }`}
                onClick={() => handleTemplateSelect(template.id)}
              >
                <div className="flex flex-col items-center text-center space-y-2">
                  <Icon className="h-6 w-6 text-muted-foreground" />
                  <div>
                    <h4 className="text-sm font-medium">{template.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      {template.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="page-name">Page Name</Label>
              <Input
                id="page-name"
                placeholder="e.g., About Us"
                value={pageName}
                onChange={(e) => setPageName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="page-path">Page Path</Label>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">/</span>
                <Input
                  id="page-path"
                  placeholder="about-us"
                  value={pagePath}
                  onChange={(e) => setPagePath(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={!pageName.trim()}>
            Create Page
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};