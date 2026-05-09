import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { CampaignChannel } from "@/types/marketing";
import { DollarSign, Target, TrendingUp } from "lucide-react";

interface SocialAdEditorProps {
  channel: CampaignChannel;
  onChange: (updates: Partial<CampaignChannel>) => void;
}

export const SocialAdEditor = ({ channel, onChange }: SocialAdEditorProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label>Ad Headline *</Label>
        <Input
          value={channel.content.headline || ''}
          onChange={(e) => onChange({ 
            content: { ...channel.content, headline: e.target.value } 
          })}
          placeholder="Grab attention with a powerful headline"
          className="mt-1.5"
          maxLength={100}
        />
        <p className="text-xs text-muted-foreground mt-1">
          {channel.content.headline?.length || 0}/100 characters
        </p>
      </div>

      <div>
        <Label>Ad Description *</Label>
        <Textarea
          value={channel.content.body || ''}
          onChange={(e) => onChange({ 
            content: { ...channel.content, body: e.target.value } 
          })}
          placeholder="Describe your event and why people should attend..."
          rows={4}
          className="mt-1.5"
        />
      </div>

      <div>
        <Label>Call to Action Button</Label>
        <Select 
          value={channel.content.callToAction?.type || 'learn-more'}
          onValueChange={(value) => onChange({
            content: {
              ...channel.content,
              callToAction: {
                ...channel.content.callToAction,
                text: value === 'buy-ticket' ? 'Buy Tickets' : value === 'rsvp' ? 'RSVP Now' : 'Learn More',
                url: channel.content.callToAction?.url || '',
                type: value as any
              }
            }
          })}
        >
          <SelectTrigger className="mt-1.5">
            <SelectValue placeholder="Select CTA" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="learn-more">Learn More</SelectItem>
            <SelectItem value="rsvp">RSVP Now</SelectItem>
            <SelectItem value="buy-ticket">Buy Tickets</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Destination URL *</Label>
        <Input
          type="url"
          value={channel.content.callToAction?.url || ''}
          onChange={(e) => onChange({
            content: {
              ...channel.content,
              callToAction: {
                ...channel.content.callToAction,
                url: e.target.value,
                text: channel.content.callToAction?.text || 'Learn More',
                type: channel.content.callToAction?.type || 'learn-more'
              }
            }
          })}
          placeholder="https://your-event-page.com"
          className="mt-1.5"
        />
      </div>

      <Card className="p-4 bg-primary/5 border-primary/20">
        <div className="flex items-center gap-2 mb-3">
          <DollarSign className="w-4 h-4 text-primary" />
          <h4 className="font-semibold text-sm">Budget & Targeting</h4>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label>Daily Budget</Label>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-sm">$</span>
              <Input
                type="number"
                value={channel.budget || 0}
                onChange={(e) => onChange({ budget: parseFloat(e.target.value) || 0 })}
                placeholder="50"
                min="0"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Recommended: $50-200/day for optimal reach
            </p>
          </div>

          <div>
            <Label className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Target Audience
            </Label>
            <Select defaultValue="auto">
              <SelectTrigger className="mt-1.5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto (Based on your guests)</SelectItem>
                <SelectItem value="custom">Custom Audience</SelectItem>
                <SelectItem value="lookalike">Lookalike Audience</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Ad Placement</Label>
            <Select defaultValue="automatic">
              <SelectTrigger className="mt-1.5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="automatic">Automatic (Recommended)</SelectItem>
                <SelectItem value="feed">Feed Only</SelectItem>
                <SelectItem value="stories">Stories Only</SelectItem>
                <SelectItem value="both">Feed + Stories</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-muted/50">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-4 h-4" />
          <h4 className="font-semibold text-sm">Estimated Results</h4>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-muted-foreground">Daily Reach</p>
            <p className="font-semibold">1,500 - 3,000</p>
          </div>
          <div>
            <p className="text-muted-foreground">Expected Clicks</p>
            <p className="font-semibold">45 - 90</p>
          </div>
          <div>
            <p className="text-muted-foreground">Cost Per Click</p>
            <p className="font-semibold">$0.55 - $2.20</p>
          </div>
          <div>
            <p className="text-muted-foreground">Est. Conversions</p>
            <p className="font-semibold">5 - 15</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
