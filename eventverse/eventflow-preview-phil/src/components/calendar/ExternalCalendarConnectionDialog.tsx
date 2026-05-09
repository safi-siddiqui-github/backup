import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Loader2 } from "lucide-react";
import { ExternalCalendarProvider } from "@/types/calendar";

interface ExternalCalendarConnectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  provider: ExternalCalendarProvider | null;
  onConnect: (provider: ExternalCalendarProvider, details: {
    email: string;
    accountName: string;
    syncAll: boolean;
    selectedColor: string;
  }) => void;
}

type ConnectionState = 'idle' | 'connecting' | 'connected';

const PROVIDER_CONFIG = {
  google: {
    name: 'Google Calendar',
    color: '#4285F4',
    steps: [
      'Connecting to Google...',
      'Authenticating...',
      'Fetching calendar list...',
      'Syncing events...',
    ],
  },
  outlook: {
    name: 'Outlook Calendar',
    color: '#0078D4',
    steps: [
      'Connecting to Outlook...',
      'Authenticating...',
      'Fetching calendar list...',
      'Syncing events...',
    ],
  },
};

export const ExternalCalendarConnectionDialog = ({
  open,
  onOpenChange,
  provider,
  onConnect,
}: ExternalCalendarConnectionDialogProps) => {
  const [email, setEmail] = useState('');
  const [accountName, setAccountName] = useState('');
  const [syncAll, setSyncAll] = useState(true);
  const [connectionState, setConnectionState] = useState<ConnectionState>('idle');
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const config = provider ? PROVIDER_CONFIG[provider] : null;

  useEffect(() => {
    if (open && provider) {
      setEmail('');
      setAccountName('');
      setSyncAll(true);
      setConnectionState('idle');
      setCurrentStep(0);
      setProgress(0);
    }
  }, [open, provider]);

  const handleConnect = async () => {
    if (!email || !provider || !config) return;

    setConnectionState('connecting');
    
    // Simulate connection steps
    for (let i = 0; i < config.steps.length; i++) {
      setCurrentStep(i);
      setProgress(0);
      
      // Animate progress for each step
      for (let p = 0; p <= 100; p += 5) {
        await new Promise(resolve => setTimeout(resolve, 40));
        setProgress(p);
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    setConnectionState('connected');
    
    // Auto-close after showing success
    setTimeout(() => {
      onConnect(provider, {
        email,
        accountName: accountName || `${config.name}`,
        syncAll,
        selectedColor: config.color,
      });
      onOpenChange(false);
    }, 1500);
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  if (!provider || !config) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${config.color}20` }}
            >
              <div
                className="w-6 h-6 rounded-full"
                style={{ backgroundColor: config.color }}
              />
            </div>
            <div>
              <DialogTitle>Connect {config.name}</DialogTitle>
              <DialogDescription>
                Grant access to sync your calendar events
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {connectionState === 'idle' && (
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder={`your.email@${provider === 'google' ? 'gmail.com' : 'outlook.com'}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountName">Account Name (Optional)</Label>
              <Input
                id="accountName"
                placeholder={`My ${config.name}`}
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="syncAll"
                checked={syncAll}
                onCheckedChange={(checked) => setSyncAll(checked as boolean)}
              />
              <Label
                htmlFor="syncAll"
                className="text-sm font-normal cursor-pointer"
              >
                Sync all events automatically
              </Label>
            </div>

            <div className="bg-muted p-3 rounded-lg text-sm text-muted-foreground">
              <p>
                ℹ️ In a live environment, you would be redirected to {config.name} to authorize access.
                This is a mock demonstration.
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConnect}
                disabled={!isValidEmail(email)}
                className="flex-1"
                style={{ backgroundColor: config.color }}
              >
                Connect
              </Button>
            </div>
          </div>
        )}

        {connectionState === 'connecting' && (
          <div className="space-y-6 mt-4">
            <div className="flex items-center gap-3">
              <Loader2 className="w-5 h-5 animate-spin" style={{ color: config.color }} />
              <div className="flex-1">
                <p className="font-medium">{config.steps[currentStep]}</p>
                <Progress value={progress} className="mt-2" />
              </div>
            </div>

            <div className="space-y-2">
              {config.steps.map((step, index) => (
                <div
                  key={step}
                  className={`flex items-center gap-2 text-sm ${
                    index < currentStep
                      ? 'text-foreground'
                      : index === currentStep
                      ? 'text-foreground font-medium'
                      : 'text-muted-foreground'
                  }`}
                >
                  {index < currentStep ? (
                    <CheckCircle2 className="w-4 h-4" style={{ color: config.color }} />
                  ) : index === currentStep ? (
                    <Loader2 className="w-4 h-4 animate-spin" style={{ color: config.color }} />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30" />
                  )}
                  {step}
                </div>
              ))}
            </div>
          </div>
        )}

        {connectionState === 'connected' && (
          <div className="space-y-4 mt-4">
            <div className="flex flex-col items-center justify-center py-8">
              <CheckCircle2 className="w-16 h-16 mb-4" style={{ color: config.color }} />
              <h3 className="text-lg font-semibold">Successfully Connected!</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Your {config.name} is now synced
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
