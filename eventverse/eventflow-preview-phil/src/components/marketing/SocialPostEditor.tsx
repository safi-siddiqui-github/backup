import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CampaignChannel } from "@/types/marketing";
import { Image, Hash, AtSign } from "lucide-react";

interface SocialPostEditorProps {
  channel: CampaignChannel;
  onChange: (content: Partial<CampaignChannel['content']>) => void;
}

const characterLimits: Record<string, number> = {
  'linkedin-post': 3000,
  'instagram-post': 2200,
  'facebook-post': 63206,
  'tiktok-post': 2200,
};

export const SocialPostEditor = ({ channel, onChange }: SocialPostEditorProps) => {
  const limit = characterLimits[channel.type] || 2200;
  const currentLength = channel.content.body?.length || 0;

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <Label>Post Content</Label>
          <Badge variant={currentLength > limit ? "destructive" : "secondary"}>
            {currentLength}/{limit}
          </Badge>
        </div>
        <Textarea
          value={channel.content.body || ''}
          onChange={(e) => onChange({ body: e.target.value })}
          placeholder="Write your social media post..."
          rows={6}
          className="resize-none"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Tip: Use emojis and hashtags to increase engagement
        </p>
      </div>

      <div>
        <Label className="flex items-center gap-2">
          <Hash className="w-4 h-4" />
          Hashtags (optional)
        </Label>
        <Input
          placeholder="#event #marketing #networking"
          className="mt-1.5"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Separate hashtags with spaces
        </p>
      </div>

      <div>
        <Label className="flex items-center gap-2">
          <AtSign className="w-4 h-4" />
          Mentions (optional)
        </Label>
        <Input
          placeholder="@user1 @user2"
          className="mt-1.5"
        />
      </div>

      <div>
        <Label>Call to Action Link</Label>
        <Input
          type="url"
          value={channel.content.callToAction?.url || ''}
          onChange={(e) => onChange({ 
            callToAction: { 
              ...channel.content.callToAction,
              url: e.target.value,
              text: channel.content.callToAction?.text || 'Learn More',
              type: 'learn-more'
            } 
          })}
          placeholder="https://your-event-link.com"
          className="mt-1.5"
        />
      </div>

      <Card className="p-4 bg-muted/50">
        <div className="flex items-center gap-2 mb-2">
          <Image className="w-4 h-4" />
          <span className="text-sm font-medium">Media</span>
        </div>
        <Button variant="outline" size="sm" className="w-full">
          Upload Image or Video
        </Button>
        <p className="text-xs text-muted-foreground mt-2">
          Images and videos significantly increase engagement rates
        </p>
      </Card>

      {/* Preview */}
      <Card className="p-4 bg-background">
        <h4 className="text-sm font-semibold mb-3">Post Preview</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary/10" />
            <div>
              <p className="font-medium text-sm">Your Account</p>
              <p className="text-xs text-muted-foreground">Just now</p>
            </div>
          </div>
          <p className="text-sm whitespace-pre-wrap">{channel.content.body || 'Your post content will appear here...'}</p>
          {channel.content.callToAction?.url && (
            <div className="mt-2 p-2 border rounded text-xs">
              🔗 {channel.content.callToAction.url}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
