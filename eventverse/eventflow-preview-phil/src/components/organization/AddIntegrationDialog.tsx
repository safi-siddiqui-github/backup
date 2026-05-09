import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, CheckCircle, Star } from "lucide-react";
import { OrganizationIntegration } from "@/data/mockOrganizations";
import { getIntegrationIcon, getIntegrationDescription, getIntegrationName } from "@/lib/organizationUtils";
import MicrosoftTeamsConfigDialog from "./integrations/MicrosoftTeamsConfigDialog";
import SlackConfigDialog from "./integrations/SlackConfigDialog";
import GoogleWorkspaceConfigDialog from "./integrations/GoogleWorkspaceConfigDialog";
import GenericIntegrationConfigDialog from "./integrations/GenericIntegrationConfigDialog";

interface AddIntegrationDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (integration: OrganizationIntegration) => void;
  existingIntegrations: OrganizationIntegration[];
}

const POPULAR_PLATFORMS = [
  { type: 'microsoft_teams', popular: true },
  { type: 'slack', popular: true },
  { type: 'google_workspace', popular: true },
  { type: 'microsoft_365', popular: true }
];

const ALL_PLATFORMS = [
  ...POPULAR_PLATFORMS,
  { type: 'zoom', popular: false },
  { type: 'discord', popular: false },
  { type: 'cisco_webex', popular: false },
  { type: 'okta', popular: false }
];

const AddIntegrationDialog = ({ open, onClose, onAdd, existingIntegrations }: AddIntegrationDialogProps) => {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  
  const isConnected = (type: string) => {
    return existingIntegrations.some(int => int.integrationType === type);
  };

  const handleConnect = (type: string) => {
    setSelectedPlatform(type);
  };

  const handleConfigComplete = (integration: OrganizationIntegration) => {
    onAdd(integration);
    setSelectedPlatform(null);
    onClose();
  };

  const handleConfigClose = () => {
    setSelectedPlatform(null);
  };

  const renderPlatformCard = (platformType: string, isPopular: boolean) => {
    const Icon = getIntegrationIcon(platformType);
    const connected = isConnected(platformType);

    return (
      <div
        key={platformType}
        className="group relative rounded-xl border border-border bg-card p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
      >
        {isPopular && (
          <div className="absolute -top-2 -right-2">
            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 shadow-lg">
              <Star className="w-3 h-3 mr-1" />
              Popular
            </Badge>
          </div>
        )}
        
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="p-4 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 group-hover:scale-110 transition-transform">
            <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-1">
              {getIntegrationName(platformType)}
            </h4>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {getIntegrationDescription(platformType)}
            </p>
          </div>

          {connected ? (
            <Badge variant="secondary" className="w-full justify-center">
              <CheckCircle className="w-3 h-3 mr-1" />
              Connected
            </Badge>
          ) : (
            <Button
              size="sm"
              className="w-full"
              onClick={() => handleConnect(platformType)}
            >
              Connect
            </Button>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <Dialog open={open && !selectedPlatform} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Integration</DialogTitle>
            <DialogDescription>
              Connect your organization's communication platform to automatically sync employee data
            </DialogDescription>
          </DialogHeader>

          <Alert className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <AlertDescription className="text-sm text-foreground">
              <strong>Benefits:</strong> Auto-sync employees, maintain up-to-date directory, streamline onboarding, and keep org charts current.
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="popular" className="mt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="all">All Platforms</TabsTrigger>
            </TabsList>

            <TabsContent value="popular" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                {POPULAR_PLATFORMS.map(platform => renderPlatformCard(platform.type, platform.popular))}
              </div>
            </TabsContent>

            <TabsContent value="all" className="mt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ALL_PLATFORMS.map(platform => renderPlatformCard(platform.type, platform.popular))}
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Platform-specific configuration dialogs */}
      {selectedPlatform === 'microsoft_teams' && (
        <MicrosoftTeamsConfigDialog
          open={true}
          onClose={handleConfigClose}
          onComplete={handleConfigComplete}
          mode="create"
        />
      )}

      {selectedPlatform === 'slack' && (
        <SlackConfigDialog
          open={true}
          onClose={handleConfigClose}
          onComplete={handleConfigComplete}
          mode="create"
        />
      )}

      {selectedPlatform === 'google_workspace' && (
        <GoogleWorkspaceConfigDialog
          open={true}
          onClose={handleConfigClose}
          onComplete={handleConfigComplete}
          mode="create"
        />
      )}

      {selectedPlatform && !['microsoft_teams', 'slack', 'google_workspace'].includes(selectedPlatform) && (
        <GenericIntegrationConfigDialog
          open={true}
          onClose={handleConfigClose}
          onComplete={handleConfigComplete}
          integrationType={selectedPlatform}
          mode="create"
        />
      )}
    </>
  );
};

export default AddIntegrationDialog;
