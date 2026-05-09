import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2 } from "lucide-react";
import { OrganizationIntegration } from "@/data/mockOrganizations";
import ConfigurationWizard, { WizardStep } from "./ConfigurationWizard";
import { getIntegrationIcon, getIntegrationName } from "@/lib/organizationUtils";
import { toast } from "sonner";

interface GenericIntegrationConfigDialogProps {
  open: boolean;
  onClose: () => void;
  onComplete: (integration: OrganizationIntegration) => void;
  integrationType: string;
  integration?: OrganizationIntegration;
  mode: 'create' | 'edit';
}

const GenericIntegrationConfigDialog = ({ 
  open, 
  onClose, 
  onComplete, 
  integrationType,
  integration, 
  mode 
}: GenericIntegrationConfigDialogProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  const [apiKey, setApiKey] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');
  
  const [integrationName, setIntegrationName] = useState(
    integration?.settings.name || getIntegrationName(integrationType)
  );
  const [syncFrequency, setSyncFrequency] = useState<'hourly' | 'daily' | 'weekly' | 'manual'>(
    integration?.settings.syncFrequency || 'daily'
  );
  const [autoAdd, setAutoAdd] = useState(integration?.settings.autoAddEmployees ?? true);
  const [removeOnDelete, setRemoveOnDelete] = useState(integration?.settings.removeOnDelete ?? false);
  const [notificationEmail, setNotificationEmail] = useState(integration?.settings.notificationEmail || '');

  const Icon = getIntegrationIcon(integrationType);
  const platformName = getIntegrationName(integrationType);

  const handleComplete = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const newIntegration: OrganizationIntegration = {
        id: integration?.id || `int-${Date.now()}`,
        integrationType: integrationType as any,
        status: 'active',
        connectedAt: integration?.connectedAt || new Date(),
        lastSyncAt: new Date(),
        settings: {
          name: integrationName,
          autoAddEmployees: autoAdd,
          syncFrequency,
          removeOnDelete,
          notificationEmail,
          apiKey: apiKey ? `****${apiKey.slice(-4)}` : undefined,
          webhookUrl
        },
        stats: integration?.stats || {
          totalSynced: 0,
          lastSyncUsersAdded: 0,
          lastSyncUsersUpdated: 0,
          errors: 0
        },
        credentials: {
          type: 'api_key',
          lastRefreshed: new Date()
        }
      };

      onComplete(newIntegration);
      setIsLoading(false);
      toast.success(mode === 'create' ? `${platformName} connected successfully!` : 'Settings updated successfully!');
    }, 1500);
  };

  const steps: WizardStep[] = [
    {
      title: "API Configuration",
      description: `Enter your ${platformName} API credentials`,
      canContinue: apiKey.trim().length > 0,
      content: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="apiKey">API Key / Access Token</Label>
            <Input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your API key"
            />
            <p className="text-xs text-muted-foreground mt-1">
              This will be encrypted and stored securely
            </p>
          </div>

          <div>
            <Label htmlFor="webhookUrl">Webhook URL (Optional)</Label>
            <Input
              id="webhookUrl"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              placeholder="https://your-app.com/webhook"
            />
            <p className="text-xs text-muted-foreground mt-1">
              For real-time updates
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Data Selection",
      description: "Choose what data to sync",
      canContinue: true,
      content: (
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div>
              <p className="text-sm font-medium text-foreground">Users/Members</p>
              <p className="text-xs text-muted-foreground">All users in your organization</p>
            </div>
            <Switch checked={true} disabled />
          </div>

          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div>
              <p className="text-sm font-medium text-foreground">Groups/Teams</p>
              <p className="text-xs text-muted-foreground">User groups and teams</p>
            </div>
            <Switch checked={true} disabled />
          </div>

          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div>
              <p className="text-sm font-medium text-foreground">Contact Information</p>
              <p className="text-xs text-muted-foreground">Email, phone, etc.</p>
            </div>
            <Switch checked={true} disabled />
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
              placeholder={platformName}
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
              <p className="text-sm font-medium text-foreground">Auto-add New Users</p>
              <p className="text-xs text-muted-foreground">Automatically add new users</p>
            </div>
            <Switch checked={autoAdd} onCheckedChange={setAutoAdd} />
          </div>

          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div>
              <p className="text-sm font-medium text-foreground">Remove on Delete</p>
              <p className="text-xs text-muted-foreground">Remove users when deleted from platform</p>
            </div>
            <Switch checked={removeOnDelete} onCheckedChange={setRemoveOnDelete} />
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
              <span className="text-sm text-muted-foreground">Platform</span>
              <span className="text-sm font-medium text-foreground">{platformName}</span>
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
              <span className="text-sm text-muted-foreground">Auto-add Users</span>
              <span className="text-sm font-medium text-foreground">{autoAdd ? 'Enabled' : 'Disabled'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Remove on Delete</span>
              <span className="text-sm font-medium text-foreground">{removeOnDelete ? 'Enabled' : 'Disabled'}</span>
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
            <Icon className="w-5 h-5" />
            {mode === 'create' ? 'Connect' : 'Configure'} {platformName}
          </DialogTitle>
          <DialogDescription>
            Sync your organization's directory from {platformName}
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

export default GenericIntegrationConfigDialog;
