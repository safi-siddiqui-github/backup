import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { SocialAccountCard } from "@/components/settings/SocialAccountCard";
import { 
  Linkedin, 
  Instagram, 
  Facebook,
  Music,
  CheckCircle, 
  TrendingUp,
  RefreshCw,
  Info
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface SocialIntegrationDialogProps {
  open: boolean;
  onClose: () => void;
}

export const SocialIntegrationDialog = ({ open, onClose }: SocialIntegrationDialogProps) => {
  const { 
    user, 
    importLinkedInProfile, 
    importInstagramProfile,
    importFacebookProfile,
    importTikTokProfile,
    disconnectSocialProfile,
    syncSocialProfiles 
  } = useAuth();
  const { toast } = useToast();
  const [isImportingLinkedIn, setIsImportingLinkedIn] = useState(false);
  const [isImportingInstagram, setIsImportingInstagram] = useState(false);
  const [isImportingFacebook, setIsImportingFacebook] = useState(false);
  const [isImportingTikTok, setIsImportingTikTok] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleLinkedInImport = async () => {
    setIsImportingLinkedIn(true);
    try {
      await importLinkedInProfile();
      toast({
        title: "LinkedIn Connected",
        description: "Your LinkedIn profile has been successfully connected.",
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect LinkedIn. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsImportingLinkedIn(false);
    }
  };

  const handleInstagramImport = async () => {
    setIsImportingInstagram(true);
    try {
      await importInstagramProfile();
      toast({
        title: "Instagram Connected",
        description: "Your Instagram profile has been successfully connected.",
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect Instagram. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsImportingInstagram(false);
    }
  };

  const handleFacebookImport = async () => {
    setIsImportingFacebook(true);
    try {
      await importFacebookProfile();
      toast({
        title: "Facebook Connected",
        description: "Your Facebook page has been successfully connected.",
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect Facebook. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsImportingFacebook(false);
    }
  };

  const handleTikTokImport = async () => {
    setIsImportingTikTok(true);
    try {
      await importTikTokProfile();
      toast({
        title: "TikTok Connected",
        description: "Your TikTok profile has been successfully connected.",
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect TikTok. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsImportingTikTok(false);
    }
  };

  const handleDisconnect = (platform: 'linkedin' | 'instagram' | 'facebook' | 'tiktok') => {
    disconnectSocialProfile(platform);
    toast({
      title: "Platform Disconnected",
      description: `Your ${platform} account has been disconnected.`,
    });
  };

  const handleSyncAll = async () => {
    setIsSyncing(true);
    try {
      await syncSocialProfiles();
      toast({
        title: "Profiles Synced",
        description: "All connected profiles have been synchronized.",
      });
    } catch (error) {
      toast({
        title: "Sync Failed",
        description: "Failed to sync profiles. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Social Media Integrations</DialogTitle>
          <DialogDescription>
            Connect your social accounts to use them in marketing campaigns
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Connect your social media accounts to enable posting and advertising in the Marketing module.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SocialAccountCard
              platform="LinkedIn"
              icon={<Linkedin className="w-6 h-6" />}
              connected={!!user?.socialIntegrations?.linkedin?.connected}
              profileData={user?.socialIntegrations?.linkedin?.profileData}
              lastSync={user?.socialIntegrations?.linkedin?.lastSync}
              connectedAt={user?.socialIntegrations?.linkedin?.connectedAt}
              onConnect={handleLinkedInImport}
              onDisconnect={() => handleDisconnect('linkedin')}
              color="from-blue-700 to-blue-800"
            />

            <SocialAccountCard
              platform="Instagram"
              icon={<Instagram className="w-6 h-6" />}
              connected={!!user?.socialIntegrations?.instagram?.connected}
              profileData={user?.socialIntegrations?.instagram?.profileData}
              lastSync={user?.socialIntegrations?.instagram?.lastSync}
              connectedAt={user?.socialIntegrations?.instagram?.connectedAt}
              onConnect={handleInstagramImport}
              onDisconnect={() => handleDisconnect('instagram')}
              color="from-pink-500 to-purple-600"
            />

            <SocialAccountCard
              platform="Facebook"
              icon={<Facebook className="w-6 h-6" />}
              connected={!!user?.socialIntegrations?.facebook?.connected}
              profileData={user?.socialIntegrations?.facebook?.profileData}
              lastSync={user?.socialIntegrations?.facebook?.lastSync}
              connectedAt={user?.socialIntegrations?.facebook?.connectedAt}
              onConnect={handleFacebookImport}
              onDisconnect={() => handleDisconnect('facebook')}
              color="from-blue-600 to-blue-700"
            />

            <SocialAccountCard
              platform="TikTok"
              icon={<Music className="w-6 h-6" />}
              connected={!!user?.socialIntegrations?.tiktok?.connected}
              profileData={user?.socialIntegrations?.tiktok?.profileData}
              lastSync={user?.socialIntegrations?.tiktok?.lastSync}
              connectedAt={user?.socialIntegrations?.tiktok?.connectedAt}
              onConnect={handleTikTokImport}
              onDisconnect={() => handleDisconnect('tiktok')}
              color="from-gray-900 to-gray-800"
            />
          </div>

          <Separator />

          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold">Sync All Accounts</h3>
              <p className="text-sm text-muted-foreground">
                Refresh data from all connected platforms
              </p>
            </div>
            <Button 
              onClick={handleSyncAll} 
              disabled={isSyncing}
              variant="outline"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
              {isSyncing ? 'Syncing...' : 'Sync All'}
            </Button>
          </div>

          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Benefits of Connecting
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                <span>Post directly to your social media from campaigns</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                <span>Run targeted ads across multiple platforms</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                <span>Track engagement and campaign performance</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                <span>Unified analytics dashboard for all channels</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SocialIntegrationDialog;
