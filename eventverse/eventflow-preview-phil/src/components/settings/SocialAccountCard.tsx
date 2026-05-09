import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CheckCircle2, XCircle, ExternalLink } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface SocialAccountCardProps {
  platform: string;
  icon: React.ReactNode;
  connected: boolean;
  profileData?: any;
  lastSync?: Date;
  connectedAt?: Date;
  onConnect: () => void;
  onDisconnect: () => void;
  color: string;
}

export const SocialAccountCard = ({
  platform,
  icon,
  connected,
  profileData,
  lastSync,
  connectedAt,
  onConnect,
  onDisconnect,
  color
}: SocialAccountCardProps) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-lg`}>
            {icon}
          </div>
          <div>
            <h3 className="font-semibold text-lg">{platform}</h3>
            {connected ? (
              <Badge variant="default" className="gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Connected
              </Badge>
            ) : (
              <Badge variant="secondary" className="gap-1">
                <XCircle className="w-3 h-3" />
                Not Connected
              </Badge>
            )}
          </div>
        </div>
      </div>

      {connected && profileData && (
        <div className="space-y-4 mb-4 pb-4 border-b">
          <div className="flex items-center gap-3">
            {profileData.profilePicture && (
              <Avatar className="w-10 h-10">
                <AvatarImage src={profileData.profilePicture} />
                <AvatarFallback>{profileData.username?.[0] || profileData.pageName?.[0] || 'U'}</AvatarFallback>
              </Avatar>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">
                {profileData.username || profileData.pageName || profileData.headline}
              </p>
              {profileData.followerCount !== undefined && (
                <p className="text-sm text-muted-foreground">
                  {profileData.followerCount.toLocaleString()} followers
                </p>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            {connectedAt && (
              <div>
                <p className="text-muted-foreground">Connected</p>
                <p className="font-medium">{formatDistanceToNow(new Date(connectedAt), { addSuffix: true })}</p>
              </div>
            )}
            {lastSync && (
              <div>
                <p className="text-muted-foreground">Last Sync</p>
                <p className="font-medium">{formatDistanceToNow(new Date(lastSync), { addSuffix: true })}</p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex gap-2">
        {connected ? (
          <>
            <Button variant="outline" size="sm" className="flex-1" onClick={onDisconnect}>
              Disconnect
            </Button>
            <Button variant="outline" size="sm">
              <ExternalLink className="w-4 h-4" />
            </Button>
          </>
        ) : (
          <Button onClick={onConnect} className="flex-1" size="sm">
            Connect {platform}
          </Button>
        )}
      </div>

      {!connected && (
        <p className="text-xs text-muted-foreground mt-3">
          Connect to use this platform for marketing campaigns
        </p>
      )}
    </Card>
  );
};
