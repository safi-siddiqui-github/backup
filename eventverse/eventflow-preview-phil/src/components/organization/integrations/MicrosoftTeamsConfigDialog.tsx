import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MessageSquare, Info, CheckCircle2 } from "lucide-react";
import { OrganizationIntegration } from "@/data/mockOrganizations";
import ConfigurationWizard, { WizardStep } from "./ConfigurationWizard";
import PermissionsDisplay from "./PermissionsDisplay";
import { getRequiredPermissions } from "@/lib/organizationUtils";
import { toast } from "sonner";

interface MicrosoftTeamsConfigDialogProps {
  open: boolean;
  onClose: () => void;
  onComplete: (integration: OrganizationIntegration) => void;
  integration?: OrganizationIntegration;
  mode: 'create' | 'edit';
}

const MicrosoftTeamsConfigDialog = ({ open, onClose, onComplete, integration, mode }: MicrosoftTeamsConfigDialogProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  const [authType, setAuthType] = useState<'oauth' | 'app_registration'>('oauth');
  const [clientId, setClientId] = useState(integration?.settings.apiKey?.replace('****', '') || '');
  const [tenantId, setTenantId] = useState(integration?.settings.tenantId || '');
  const [clientSecret, setClientSecret] = useState('');
  
  const [integrationName, setIntegrationName] = useState(integration?.settings.name || 'Microsoft Teams');
  const [syncFrequency, setSyncFrequency] = useState<'hourly' | 'daily' | 'weekly' | 'manual'>(
    integration?.settings.syncFrequency || 'daily'
  );
  const [autoAdd, setAutoAdd] = useState(integration?.settings.autoAddEmployees ?? true);
  const [removeOnDelete, setRemoveOnDelete] = useState(integration?.settings.removeOnDelete ?? true);
  const [syncPhotos, setSyncPhotos] = useState(integration?.settings.syncProfilePhotos ?? true);
  const [includeGuests, setIncludeGuests] = useState(integration?.settings.includeGuestUsers ?? false);
  const [notificationEmail, setNotificationEmail] = useState(integration?.settings.notificationEmail || '');

  const handleComplete = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const newIntegration: OrganizationIntegration = {
        id: integration?.id || `int-${Date.now()}`,
        integrationType: 'microsoft_teams',
        status: 'active',
        connectedAt: integration?.connectedAt || new Date(),
        lastSyncAt: new Date(),
        settings: {
          name: integrationName,
          autoAddEmployees: autoAdd,
          syncFrequency,
          removeOnDelete,
          syncProfilePhotos: syncPhotos,
          includeGuestUsers: includeGuests,
          notificationEmail,
          apiKey: clientId ? `****${clientId.slice(-4)}` : undefined,
          tenantId
        },
        stats: integration?.stats || {
          totalSynced: 0,
          lastSyncUsersAdded: 0,
          lastSyncUsersUpdated: 0,
          errors: 0
        },
        credentials: {
          type: authType === 'oauth' ? 'oauth' : 'api_key',
          lastRefreshed: new Date()
        },
        permissions: getRequiredPermissions('microsoft_teams').map(p => p.name)
      };

      onComplete(newIntegration);
      setIsLoading(false);
      toast.success(mode === 'create' ? 'Microsoft Teams connected successfully!' : 'Settings updated successfully!');
    }, 1500);
  };

  const steps: WizardStep[] = [
    {
      title: "Connection Method",
      description: "Choose how you want to authenticate with Microsoft Teams",
      canContinue: true,
      content: (
        <div className="space-y-4">
          <div className="grid gap-4">
            <button
              onClick={() => setAuthType('oauth')}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                authType === 'oauth'
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 className={`w-5 h-5 mt-1 ${authType === 'oauth' ? 'text-primary' : 'text-muted-foreground'}`} />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Microsoft 365 OAuth (Recommended)</h4>
                  <p className="text-sm text-muted-foreground">
                    Sign in with your Microsoft account. Quick and secure setup with automatic permission grants.
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setAuthType('app_registration')}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                authType === 'app_registration'
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 className={`w-5 h-5 mt-1 ${authType === 'app_registration' ? 'text-primary' : 'text-muted-foreground'}`} />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Azure AD App Registration</h4>
                  <p className="text-sm text-muted-foreground">
                    Use app registration credentials for enterprise deployments with custom configurations.
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>
      )
    },
    {
      title: "Authentication & Permissions",
      description: authType === 'oauth' ? "Sign in and grant permissions" : "Enter your app credentials",
      canContinue: authType === 'oauth' ? true : !!(clientId && tenantId && clientSecret),
      content: (
        <div className="space-y-4">
          {authType === 'oauth' ? (
            <>
              <Alert className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <AlertDescription className="text-sm text-foreground">
                  You'll be redirected to Microsoft to sign in and authorize access to your organization's directory.
                </AlertDescription>
              </Alert>

              <Button className="w-full bg-[#5558AF] hover:bg-[#4447A3] text-white">
                <MessageSquare className="w-4 h-4 mr-2" />
                Sign in with Microsoft
              </Button>

              <PermissionsDisplay permissions={getRequiredPermissions('microsoft_teams')} />
            </>
          ) : (
            <div className="space-y-4">
              <div>
                <Label htmlFor="clientId">Application (Client) ID</Label>
                <Input
                  id="clientId"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  placeholder="Enter your Azure AD app client ID"
                />
              </div>

              <div>
                <Label htmlFor="tenantId">Directory (Tenant) ID</Label>
                <Input
                  id="tenantId"
                  value={tenantId}
                  onChange={(e) => setTenantId(e.target.value)}
                  placeholder="Enter your Azure AD tenant ID"
                />
              </div>

              <div>
                <Label htmlFor="clientSecret">Client Secret</Label>
                <Input
                  id="clientSecret"
                  type="password"
                  value={clientSecret}
                  onChange={(e) => setClientSecret(e.target.value)}
                  placeholder="Enter your client secret"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  This will be encrypted and stored securely
                </p>
              </div>

              <PermissionsDisplay permissions={getRequiredPermissions('microsoft_teams')} />
            </div>
          )}
        </div>
      )
    },
    {
      title: "Data Selection",
      description: "Choose what data to sync from Microsoft Teams",
      canContinue: true,
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="text-sm font-medium text-foreground">Employee Directory</p>
                <p className="text-xs text-muted-foreground">All users in your organization</p>
              </div>
              <Switch checked={true} disabled />
            </div>

            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="text-sm font-medium text-foreground">Departments</p>
                <p className="text-xs text-muted-foreground">Organizational units and structure</p>
              </div>
              <Switch checked={true} disabled />
            </div>

            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="text-sm font-medium text-foreground">Team Memberships</p>
                <p className="text-xs text-muted-foreground">Teams and channels users belong to</p>
              </div>
              <Switch checked={true} disabled />
            </div>

            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="text-sm font-medium text-foreground">Profile Photos</p>
                <p className="text-xs text-muted-foreground">User profile pictures</p>
              </div>
              <Switch checked={syncPhotos} onCheckedChange={setSyncPhotos} />
            </div>

            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="text-sm font-medium text-foreground">Guest Users</p>
                <p className="text-xs text-muted-foreground">External users invited to teams</p>
              </div>
              <Switch checked={includeGuests} onCheckedChange={setIncludeGuests} />
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Sync Settings",
      description: "Configure how and when data synchronizes",
      canContinue: integrationName.trim().length > 0,
      content: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="integrationName">Integration Name</Label>
            <Input
              id="integrationName"
              value={integrationName}
              onChange={(e) => setIntegrationName(e.target.value)}
              placeholder="e.g., Microsoft Teams"
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
              <p className="text-sm font-medium text-foreground">Auto-add New Employees</p>
              <p className="text-xs text-muted-foreground">Automatically add new users found in Teams</p>
            </div>
            <Switch checked={autoAdd} onCheckedChange={setAutoAdd} />
          </div>

          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div>
              <p className="text-sm font-medium text-foreground">Remove on Delete</p>
              <p className="text-xs text-muted-foreground">Remove employees deleted from Teams</p>
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
            <p className="text-xs text-muted-foreground mt-1">
              Receive alerts about sync errors
            </p>
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
              <span className="text-sm text-muted-foreground">Integration Name</span>
              <span className="text-sm font-medium text-foreground">{integrationName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Authentication</span>
              <span className="text-sm font-medium text-foreground">
                {authType === 'oauth' ? 'Microsoft OAuth' : 'App Registration'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Sync Frequency</span>
              <span className="text-sm font-medium text-foreground capitalize">{syncFrequency}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Auto-add Employees</span>
              <span className="text-sm font-medium text-foreground">{autoAdd ? 'Enabled' : 'Disabled'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Remove on Delete</span>
              <span className="text-sm font-medium text-foreground">{removeOnDelete ? 'Enabled' : 'Disabled'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Sync Profile Photos</span>
              <span className="text-sm font-medium text-foreground">{syncPhotos ? 'Enabled' : 'Disabled'}</span>
            </div>
          </div>

          <Alert className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
            <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
            <AlertDescription className="text-sm text-foreground">
              Everything looks good! Click "Complete Setup" to connect Microsoft Teams.
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
            <MessageSquare className="w-5 h-5 text-blue-600" />
            {mode === 'create' ? 'Connect' : 'Configure'} Microsoft Teams
          </DialogTitle>
          <DialogDescription>
            Sync your organization's directory from Microsoft Teams
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

export default MicrosoftTeamsConfigDialog;
