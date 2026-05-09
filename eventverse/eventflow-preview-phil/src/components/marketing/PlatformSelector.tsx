import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CampaignChannel } from "@/types/marketing";
import { Linkedin, Instagram, Facebook, Music, Check, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlatformSelectorProps {
  connectedPlatforms: {
    linkedin: boolean;
    instagram: boolean;
    facebook: boolean;
    tiktok: boolean;
  };
  selectedChannels: CampaignChannel['type'][];
  onToggleChannel: (channel: CampaignChannel['type']) => void;
  onOpenIntegrations: () => void;
  channelType: 'post' | 'ad';
}

const platformOptions = {
  post: [
    { type: 'linkedin-post' as const, label: 'LinkedIn', icon: Linkedin, color: 'from-blue-700 to-blue-800', key: 'linkedin' },
    { type: 'instagram-post' as const, label: 'Instagram', icon: Instagram, color: 'from-pink-500 to-purple-600', key: 'instagram' },
    { type: 'facebook-post' as const, label: 'Facebook', icon: Facebook, color: 'from-blue-600 to-blue-700', key: 'facebook' },
    { type: 'tiktok-post' as const, label: 'TikTok', icon: Music, color: 'from-gray-900 to-gray-800', key: 'tiktok' },
  ],
  ad: [
    { type: 'linkedin-ad' as const, label: 'LinkedIn Ads', icon: Linkedin, color: 'from-blue-700 to-blue-800', key: 'linkedin' },
    { type: 'instagram-ad' as const, label: 'Instagram Ads', icon: Instagram, color: 'from-pink-500 to-purple-600', key: 'instagram' },
    { type: 'facebook-ad' as const, label: 'Facebook Ads', icon: Facebook, color: 'from-blue-600 to-blue-700', key: 'facebook' },
    { type: 'tiktok-ad' as const, label: 'TikTok Ads', icon: Music, color: 'from-gray-900 to-gray-800', key: 'tiktok' },
  ]
};

export const PlatformSelector = ({
  connectedPlatforms,
  selectedChannels,
  onToggleChannel,
  onOpenIntegrations,
  channelType
}: PlatformSelectorProps) => {
  const options = platformOptions[channelType];
  const hasDisconnected = options.some(opt => !connectedPlatforms[opt.key as keyof typeof connectedPlatforms]);

  return (
    <div className="space-y-4">
      {hasDisconnected && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>Some platforms are not connected yet.</span>
            <Button variant="outline" size="sm" onClick={onOpenIntegrations}>
              Connect Platforms
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {options.map((option) => {
          const Icon = option.icon;
          const isConnected = connectedPlatforms[option.key as keyof typeof connectedPlatforms];
          const isSelected = selectedChannels.includes(option.type);

          return (
            <Card
              key={option.type}
              className={cn(
                "p-4 cursor-pointer transition-all duration-200",
                isSelected && isConnected && "ring-2 ring-primary bg-primary/5",
                !isConnected && "opacity-60 cursor-not-allowed"
              )}
              onClick={() => isConnected && onToggleChannel(option.type)}
            >
              <div className="flex flex-col items-center gap-2 text-center">
                <div className={cn(
                  "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-white",
                  option.color,
                  isSelected && isConnected && "scale-110 shadow-lg"
                )}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-sm">{option.label}</p>
                  {isConnected ? (
                    isSelected ? (
                      <Badge variant="default" className="text-xs">
                        <Check className="w-3 h-3 mr-1" />
                        Selected
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs">Available</Badge>
                    )
                  ) : (
                    <Badge variant="secondary" className="text-xs">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Not Connected
                    </Badge>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
