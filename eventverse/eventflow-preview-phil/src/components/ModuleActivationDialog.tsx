import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Lock, Check, Star, Zap } from "lucide-react";
import { ModuleDefinition } from "@/config/moduleRegistry";
import { useToast } from "@/hooks/use-toast";

interface ModuleActivationDialogProps {
  open: boolean;
  onClose: () => void;
  module: ModuleDefinition | null;
  onActivate: (moduleId: string) => void;
}

const ModuleActivationDialog = ({ open, onClose, module, onActivate }: ModuleActivationDialogProps) => {
  const [isActivating, setIsActivating] = useState(false);
  const { toast } = useToast();

  if (!module) return null;

  const handleActivate = async () => {
    setIsActivating(true);
    
    // Simulate activation process
    setTimeout(() => {
      onActivate(module.id);
      toast({
        title: "Module Activated!",
        description: `${module.name} has been added to your event.`,
      });
      setIsActivating(false);
      onClose();
    }, 1000);
  };

  const Icon = module.icon;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${module.color}`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            Activate {module.name}
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            {module.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Features List */}
          <Card className="bg-gradient-to-br from-background to-muted/50 border-border">
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                What you'll get:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {module.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Module Details */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-lg bg-muted/50 border border-border">
              <Badge variant="outline" className="mb-2">
                {module.category}
              </Badge>
              <p className="text-xs text-muted-foreground">Category</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50 border border-border">
              <Badge 
                variant="secondary" 
                className="mb-2 bg-green-100 text-green-800 border-green-200"
              >
                {module.status === 'active' ? 'Stable' : module.status}
              </Badge>
              <p className="text-xs text-muted-foreground">Status</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50 border border-border">
              <div className="flex items-center justify-center gap-1 mb-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium">Instant</span>
              </div>
              <p className="text-xs text-muted-foreground">Setup</p>
            </div>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isActivating}
            >
              Cancel
            </Button>
            <Button
              onClick={handleActivate}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              disabled={isActivating}
            >
              {isActivating ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Activating...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Activate Module
                </div>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModuleActivationDialog;