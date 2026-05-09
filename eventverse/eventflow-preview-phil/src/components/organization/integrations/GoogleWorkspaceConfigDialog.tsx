import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, Info, CheckCircle2, Upload } from "lucide-react";
import { OrganizationIntegration } from "@/data/mockOrganizations";
import ConfigurationWizard, { WizardStep } from "./ConfigurationWizard";
import PermissionsDisplay from "./PermissionsDisplay";
import { getRequiredPermissions } from "@/lib/organizationUtils";
import { toast } from "sonner";

interface GoogleWorkspaceConfigDialogProps {
  open: boolean;
  onClose: () => void;
  onComplete: (integration: OrganizationIntegration) => void;
  integration?: OrganizationIntegration;
  mode: 'create' | 'edit';
}

const GoogleWorkspaceConfigDialog = ({ open, onClose, onComplete, integration, mode }: GoogleWorkspaceConfigDialogProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  const [serviceAccountJson, setServiceAccountJson] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [domain, setDomain] = useState('');
  
  const [integrationName, setIntegrationName] = useState(integration?.settings.name || 'Google Workspace');
  const [syncFrequency, setSyncFrequency] = useState<'hourly' | 'daily' | 'weekly' | 'manual'>(
    integration?.settings.syncFrequency || 'daily'
  );
  const [autoAdd, setAutoAdd] = useState(integration?.settings.autoAddEmployees ?? true);
  const [syncPhotos, setSyncPhotos] = useState(integration?.settings.syncProfilePhotos ?? true);
  const [notificationEmail, setNotificationEmail] = useState(integration?.settings.notificationEmail || '');

  const handleComplete = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const newIntegration: OrganizationIntegration = {
        id: integration?.id || `int-${Date.now()}`,
        integrationType: 'google_workspace',
        status: 'active',
        connectedAt: integration?.connectedAt || new Date(),
        lastSyncAt: new Date(),
        settings: {
          name: integrationName,
          autoAddEmployees: autoAdd,
          syncFrequency,
          removeOnDelete: true,
          syncProfilePhotos: syncPhotos,
          notificationEmail
        },
        stats: integration?.stats || {
          totalSynced: 0,
          lastSyncUsersAdded: 0,
          lastSyncUsersUpdated: 0,
          errors: 0
        },
        credentials: {
          type: 'service_account',
          lastRefreshed: new Date()
        },
        permissions: getRequiredPermissions('google_workspace').map(p => p.name)
      };

      onComplete(newIntegration);
      setIsLoading(false);
      toast.success(mode === 'create' ? 'Google Workspace connected successfully!' : 'Settings updated successfully!');
    }, 1500);
  };

  const steps: WizardStep[] = [
    {
      title: "Service Account Setup",
      description: "Create and configure a service account in Google Cloud Console",
      canContinue: serviceAccountJson.trim().length > 10,
      content: (
        <div className="space-y-4">
          <Alert className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <AlertDescription className="text-sm text-foreground">
              <strong>Steps:</strong>
              <ol className="list-decimal ml-4 mt-2 space-y-1">
                <li>Go to Google Cloud Console</li>
                <li>Create a new service account</li>
                <li>Download the JSON key file</li>
                <li>Paste the contents below</li>
              </ol>
            </AlertDescription>
          </Alert>

          <div>
            <Label htmlFor="serviceAccount">Service Account JSON</Label>
            <Textarea
              id="serviceAccount"
              value={serviceAccountJson}
              onChange={(e) => setServiceAccountJson(e.target.value)}
              placeholder='{"type": "service_account", "project_id": "...", ...}'
              rows={8}
              className="font-mono text-xs"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Paste the entire JSON key file contents
            </p>
          </div>

          <Button variant="outline" className="w-full">
            <Upload className="w-4 h-4 mr-2" />
            Upload JSON File
          </Button>
        </div>
      )
    },
    {
      title: "Domain-Wide Delegation",
      description: "Configure admin access and domain settings",
      canContinue: adminEmail.trim().length > 0 && domain.trim().length > 0,
      content: (
        <div className="space-y-4">
          <PermissionsDisplay permissions={getRequiredPermissions('google_workspace')} />

          <div>
            <Label htmlFor="adminEmail">Admin Email with Delegation Rights</Label>
            <Input
              id="adminEmail"
              type="email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              placeholder="admin@example.com"
            />
            <p className="text-xs text-muted-foreground mt-1">
              An admin account that can access directory data
            </p>
          </div>

          <div>
            <Label htmlFor="domain">Domain Name</Label>
            <Input
              id="domain"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="example.com"
            />
          </div>
        </div>
      )
    },
    {
      title: "Data Selection",
      description: "Choose what data to sync from Google Workspace",
      canContinue: true,
      content: (
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div>
              <p className="text-sm font-medium text-foreground">Users</p>
              <p className="text-xs text-muted-foreground">All users in your domain</p>
            </div>
            <Switch checked={true} disabled />
          </div>

          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div>
              <p className="text-sm font-medium text-foreground">Groups</p>
              <p className="text-xs text-muted-foreground">Google Groups</p>
            </div>
            <Switch checked={true} disabled />
          </div>

          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div>
              <p className="text-sm font-medium text-foreground">Organizational Units</p>
              <p className="text-xs text-muted-foreground">OU structure</p>
            </div>
            <Switch checked={true} disabled />
          </div>

          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div>
              <p className="text-sm font-medium text-foreground">Profile Photos</p>
              <p className="text-xs text-muted-foreground">User avatars</p>
            </div>
            <Switch checked={syncPhotos} onCheckedChange={setSyncPhotos} />
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
              placeholder="e.g., Google Workspace"
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
              <span className="text-sm text-muted-foreground">Domain</span>
              <span className="text-sm font-medium text-foreground">{domain}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Admin Email</span>
              <span className="text-sm font-medium text-foreground">{adminEmail}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Integration Name</span>
              <span className="text-sm font-medium text-foreground">{integrationName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Sync Frequency</span>
              <span className="text-sm font-medium text-foreground capitalize">{syncFrequency}</span>
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
            <Mail className="w-5 h-5 text-red-600" />
            {mode === 'create' ? 'Connect' : 'Configure'} Google Workspace
          </DialogTitle>
          <DialogDescription>
            Sync your organization's directory from Google Workspace
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

export default GoogleWorkspaceConfigDialog;
