import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Settings, RefreshCw, AlertCircle, Trash2 } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { OrganizationIntegration } from "@/data/mockOrganizations";
import { getIntegrationIcon, getIntegrationName } from "@/lib/organizationUtils";
import { cn } from "@/lib/utils";
import MicrosoftTeamsConfigDialog from "./integrations/MicrosoftTeamsConfigDialog";
import SlackConfigDialog from "./integrations/SlackConfigDialog";
import GoogleWorkspaceConfigDialog from "./integrations/GoogleWorkspaceConfigDialog";
import GenericIntegrationConfigDialog from "./integrations/GenericIntegrationConfigDialog";
import { toast } from "sonner";

interface IntegrationCardProps {
  integration: OrganizationIntegration;
  onRemove?: (integrationId: string) => void;
  onConfigure?: (integration: OrganizationIntegration) => void;
  onSync?: (integrationId: string) => void;
}

const IntegrationCard = ({ integration, onRemove, onConfigure, onSync }: IntegrationCardProps) => {
  const IntegrationIcon = getIntegrationIcon(integration.integrationType);
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [showConfigDialog, setShowConfigDialog] = useState(false);

  const handleRemove = () => {
    if (onRemove) {
      onRemove(integration.id);
      setShowRemoveDialog(false);
      toast.success(`${getIntegrationName(integration.integrationType)} disconnected`);
    }
  };

  const handleSync = () => {
    if (onSync) {
      onSync(integration.id);
      toast.success("Sync started");
    }
  };

  const handleConfigComplete = (updatedIntegration: OrganizationIntegration) => {
    if (onConfigure) {
      onConfigure(updatedIntegration);
      setShowConfigDialog(false);
    }
  };
  
  return (
    <>
      <AlertDialog open={showRemoveDialog} onOpenChange={setShowRemoveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove {getIntegrationName(integration.integrationType)}?</AlertDialogTitle>
            <AlertDialogDescription>
              This will disconnect the integration and stop syncing employees. 
              Existing employees will remain in the system.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleRemove}
            >
              Remove Integration
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Config Dialogs */}
      {integration.integrationType === 'microsoft_teams' && (
        <MicrosoftTeamsConfigDialog
          open={showConfigDialog}
          onClose={() => setShowConfigDialog(false)}
          onComplete={handleConfigComplete}
          integration={integration}
          mode="edit"
        />
      )}

      {integration.integrationType === 'slack' && (
        <SlackConfigDialog
          open={showConfigDialog}
          onClose={() => setShowConfigDialog(false)}
          onComplete={handleConfigComplete}
          integration={integration}
          mode="edit"
        />
      )}

      {integration.integrationType === 'google_workspace' && (
        <GoogleWorkspaceConfigDialog
          open={showConfigDialog}
          onClose={() => setShowConfigDialog(false)}
          onComplete={handleConfigComplete}
          integration={integration}
          mode="edit"
        />
      )}

      {!['microsoft_teams', 'slack', 'google_workspace'].includes(integration.integrationType) && (
        <GenericIntegrationConfigDialog
          open={showConfigDialog}
          onClose={() => setShowConfigDialog(false)}
          onComplete={handleConfigComplete}
          integrationType={integration.integrationType}
          integration={integration}
          mode="edit"
        />
      )}
    <Card className={cn(
      "border-l-4 bg-card",
      integration.status === 'active' ? "border-green-500" : "border-red-500"
    )}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {/* Integration logo */}
            <div className="p-3 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
              <IntegrationIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <CardTitle className="text-foreground">{getIntegrationName(integration.integrationType)}</CardTitle>
              <CardDescription>
                Connected {format(integration.connectedAt, 'PP')}
              </CardDescription>
            </div>
          </div>
          
          {/* Status badge */}
          <Badge variant={integration.status === 'active' ? 'default' : 'destructive'}>
            {integration.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Last sync info */}
        <div className="mb-4 p-3 bg-muted rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Last Synced</span>
            <span className="text-sm font-medium text-foreground">
              {formatDistanceToNow(integration.lastSyncAt, { addSuffix: true })}
            </span>
          </div>
          <Progress value={100} className="h-2" />
        </div>
        
        {/* Sync stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <Label className="text-xs text-muted-foreground">Total Synced</Label>
            <p className="text-2xl font-bold text-foreground">{integration.stats.totalSynced}</p>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Last Sync</Label>
            <p className="text-sm">
              <span className="text-green-600 dark:text-green-400">+{integration.stats.lastSyncUsersAdded}</span>
              {' / '}
              <span className="text-blue-600 dark:text-blue-400">~{integration.stats.lastSyncUsersUpdated}</span>
            </p>
          </div>
        </div>
        
        {/* Settings summary */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Auto-add employees</span>
            <Badge variant={integration.settings.autoAddEmployees ? "default" : "outline"}>
              {integration.settings.autoAddEmployees ? "Enabled" : "Disabled"}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Sync frequency</span>
            <Badge variant="outline">{integration.settings.syncFrequency}</Badge>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex gap-2 mb-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => setShowConfigDialog(true)}
          >
            <Settings className="w-4 h-4 mr-2" />
            Configure
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={handleSync}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync Now
          </Button>
        </div>

        <Button 
          variant="ghost" 
          size="sm"
          className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
          onClick={() => setShowRemoveDialog(true)}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Remove Integration
        </Button>
        
        {/* Error indicator */}
        {integration.stats.errors > 0 && (
          <div className="mt-3 p-2 bg-red-500/10 rounded text-sm text-red-700 dark:text-red-400">
            <AlertCircle className="w-4 h-4 inline mr-1" />
            {integration.stats.errors} sync errors detected
          </div>
        )}
      </CardContent>
    </Card>
    </>
  );
};

export default IntegrationCard;
