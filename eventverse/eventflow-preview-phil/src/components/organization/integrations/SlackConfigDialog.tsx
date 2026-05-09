import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Hash, Info, CheckCircle2 } from "lucide-react";
import { OrganizationIntegration } from "@/data/mockOrganizations";
import ConfigurationWizard, { WizardStep } from "./ConfigurationWizard";
import PermissionsDisplay from "./PermissionsDisplay";
import { getRequiredPermissions } from "@/lib/organizationUtils";
import { toast } from "sonner";

interface SlackConfigDialogProps {
  open: boolean;
  onClose: () => void;
  onComplete: (integration: OrganizationIntegration) => void;
  integration?: OrganizationIntegration;
  mode: 'create' | 'edit';
}

const SlackConfigDialog = ({ open, onClose, onComplete, integration, mode }: SlackConfigDialogProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  const [workspaceUrl, setWorkspaceUrl] = useState(integration?.settings.workspaceUrl || '');
  const [botToken, setBotToken] = useState('');
  
  const [integrationName, setIntegrationName] = useState(integration?.settings.name || 'Slack');
  const [syncFrequency, setSyncFrequency] = useState<'hourly' | 'daily' | 'weekly' | 'manual'>(
    integration?.settings.syncFrequency || 'daily'
  );
  const [autoAdd, setAutoAdd] = useState(integration?.settings.autoAddEmployees ?? true);
  const [includeGuests, setIncludeGuests] = useState(integration?.settings.includeGuestUsers ?? false);
  const [notificationEmail, setNotificationEmail] = useState(integration?.settings.notificationEmail || '');

  const handleComplete = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const newIntegration: OrganizationIntegration = {
        id: integration?.id || `int-${Date.now()}`,
        integrationType: 'slack',
        status: 'active',
        connectedAt: integration?.connectedAt || new Date(),
        lastSyncAt: new Date(),
        settings: {
          name: integrationName,
          autoAddEmployees: autoAdd,
          syncFrequency,
          removeOnDelete: false,
          includeGuestUsers: includeGuests,
          notificationEmail,
          workspaceUrl
        },
        stats: integration?.stats || {
          totalSynced: 0,
          lastSyncUsersAdded: 0,
          lastSyncUsersUpdated: 0,
          errors: 0
        },
        credentials: {
          type: 'oauth',
          lastRefreshed: new Date()
        },
        permissions: getRequiredPermissions('slack').map(p => p.name)
      };

      onComplete(newIntegration);
      setIsLoading(false);
      toast.success(mode === 'create' ? 'Slack connected successfully!' : 'Settings updated successfully!');
    }, 1500);
  };

  const steps: WizardStep[] = [
    {
      title: "Workspace Connection",
      description: "Connect to your Slack workspace",
      canContinue: workspaceUrl.trim().length > 0,
      content: (
        <div className="space-y-4">
          <Alert className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <AlertDescription className="text-sm text-foreground">
              You'll be redirected to Slack to authorize access to your workspace members and user groups.
            </AlertDescription>
          </Alert>

          <div>
            <Label htmlFor="workspaceUrl">Workspace URL</Label>
            <Input
              id="workspaceUrl"
              value={workspaceUrl}
              onChange={(e) => setWorkspaceUrl(e.target.value)}
              placeholder="yourcompany.slack.com"
            />
          </div>

          <Button className="w-full bg-[#4A154B] hover:bg-[#3C1040] text-white">
            <Hash className="w-4 h-4 mr-2" />
            Add to Slack
          </Button>
        </div>
      )
    },
    {
      title: "Permissions Required",
      description: "Review the permissions needed by this integration",
      canContinue: true,
      content: (
        <div className="space-y-4">
          <PermissionsDisplay permissions={getRequiredPermissions('slack')} />
          
          <Alert className="bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800">
            <Info className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
            <AlertDescription className="text-sm text-foreground">
              <strong>Note:</strong> A workspace admin must approve this app installation before it can access user data.
            </AlertDescription>
          </Alert>
        </div>
      )
    },
    {
      title: "Data Selection",
      description: "Choose what data to sync from Slack",
      canContinue: true,
      content: (
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div>
              <p className="text-sm font-medium text-foreground">Workspace Members</p>
              <p className="text-xs text-muted-foreground">All users in your workspace</p>
            </div>
            <Switch checked={true} disabled />
          </div>

          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div>
              <p className="text-sm font-medium text-foreground">User Groups</p>
              <p className="text-xs text-muted-foreground">Slack user groups and teams</p>
            </div>
            <Switch checked={true} disabled />
          </div>

          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div>
              <p className="text-sm font-medium text-foreground">Admin/Owner Roles</p>
              <p className="text-xs text-muted-foreground">Workspace role information</p>
            </div>
            <Switch checked={true} disabled />
          </div>

          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div>
              <p className="text-sm font-medium text-foreground">Guest Users</p>
              <p className="text-xs text-muted-foreground">Single and multi-channel guests</p>
            </div>
            <Switch checked={includeGuests} onCheckedChange={setIncludeGuests} />
          </div>
        </div>
      )
    },
    {
      title: "Sync Settings",
      description: "Configure synchronization preferences",
      canContinue: integrationName.trim().length > 0,
      content: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="integrationName">Integration Name</Label>
            <Input
              id="integrationName"
              value={integrationName}
              onChange={(e) => setIntegrationName(e.target.value)}
              placeholder="e.g., Slack"
            />
          </div>

          <div>
            <Label htmlFor="syncFrequency">Sync Frequency</Label>
            <Select value={syncFrequency} onValueChange={(v: any) => setSyncFrequency(v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hourly">Hourly</SelectItem>
                <SelectItem value="daily">Daily (Recommended)</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="manual">Manual Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div>
              <p className="text-sm font-medium text-foreground">Auto-add New Members</p>
              <p className="text-xs text-muted-foreground">Automatically add new users found in Slack</p>
            </div>
            <Switch checked={autoAdd} onCheckedChange={setAutoAdd} />
          </div>

          <div>
            <Label htmlFor="notificationEmail">Notification Email (Optional)</Label>
            <Input
              id="notificationEmail"
              type="email"
              value={notificationEmail}
              onChange={(e) => setNotificationEmail(e.target.value)}
              placeholder="admin@example.com"
            />
          </div>
        </div>
      )
    },
    {
      title: "Review & Connect",
      description: "Review your configuration before connecting",
      canContinue: true,
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Workspace</span>
              <span className="text-sm font-medium text-foreground">{workspaceUrl}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Integration Name</span>
              <span className="text-sm font-medium text-foreground">{integrationName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Sync Frequency</span>
              <span className="text-sm font-medium text-foreground capitalize">{syncFrequency}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Auto-add Members</span>
              <span className="text-sm font-medium text-foreground">{autoAdd ? 'Enabled' : 'Disabled'}</span>
            </div>
          </div>

          <Alert className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
            <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
            <AlertDescription className="text-sm text-foreground">
              Ready to connect! Click "Complete Setup" to finalize the integration.
            </AlertDescription>
          </Alert>
        </div>
      )
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Hash className="w-5 h-5 text-purple-600" />
            {mode === 'create' ? 'Connect' : 'Configure'} Slack
          </DialogTitle>
          <DialogDescription>
            Sync your workspace members from Slack
          </DialogDescription>
        </DialogHeader>

        <ConfigurationWizard
          steps={steps}
          currentStep={currentStep}
          onStepChange={setCurrentStep}
          onComplete={handleComplete}
          onCancel={onClose}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
};

export default SlackConfigDialog;
