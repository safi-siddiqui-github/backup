import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CampaignChannel } from "@/types/marketing";
import { 
  TrendingUp, Heart, MessageCircle, Share2, Eye, MousePointerClick,
  DollarSign, Target, BarChart3
} from "lucide-react";

interface SocialAnalyticsTabsProps {
  channels: CampaignChannel[];
}

export const SocialAnalyticsTabs = ({ channels }: SocialAnalyticsTabsProps) => {
  const socialPosts = channels.filter(ch => 
    ch.type.endsWith('-post') && ch.analytics
  );
  
  const socialAds = channels.filter(ch => 
    ch.type.endsWith('-ad') && ch.analytics
  );
  
  const directMessages = channels.filter(ch => 
    ['email', 'sms', 'physical-mail'].includes(ch.type) && ch.analytics
  );

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="posts">Social Posts</TabsTrigger>
        <TabsTrigger value="ads">Social Ads</TabsTrigger>
        <TabsTrigger value="direct">Direct Messages</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4 mt-4">
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Total Reach</div>
            <div className="text-2xl font-bold">
              {channels.reduce((sum, ch) => sum + (ch.analytics?.reach || 0), 0).toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Across all channels</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Total Clicks</div>
            <div className="text-2xl font-bold">
              {channels.reduce((sum, ch) => sum + (ch.analytics?.clicked || 0), 0).toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Link clicks</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Total Spent</div>
            <div className="text-2xl font-bold">
              ${channels.reduce((sum, ch) => sum + (ch.analytics?.spend || 0), 0).toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Ad spend only</div>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="posts" className="space-y-4 mt-4">
        <div className="text-sm text-muted-foreground mb-3">
          Organic social media post performance
        </div>
        <div className="space-y-3">
          {socialPosts.length > 0 ? socialPosts.map((channel, idx) => (
            <Card key={idx} className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="font-semibold capitalize">
                  {channel.type.replace('-post', '').replace('-', ' ')}
                </div>
                <Badge variant={channel.status === 'published' ? 'default' : 'secondary'}>
                  {channel.status}
                </Badge>
              </div>
              <div className="grid grid-cols-5 gap-3 text-sm">
                <div>
                  <div className="flex items-center gap-1 text-muted-foreground mb-1">
                    <Eye className="w-3 h-3" />
                    <span>Impressions</span>
                  </div>
                  <div className="font-semibold">
                    {channel.analytics?.impressions?.toLocaleString() || '0'}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-muted-foreground mb-1">
                    <Heart className="w-3 h-3" />
                    <span>Likes</span>
                  </div>
                  <div className="font-semibold">
                    {channel.analytics?.likes?.toLocaleString() || '0'}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-muted-foreground mb-1">
                    <MessageCircle className="w-3 h-3" />
                    <span>Comments</span>
                  </div>
                  <div className="font-semibold">
                    {channel.analytics?.comments?.toLocaleString() || '0'}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-muted-foreground mb-1">
                    <Share2 className="w-3 h-3" />
                    <span>Shares</span>
                  </div>
                  <div className="font-semibold">
                    {channel.analytics?.shares?.toLocaleString() || '0'}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-muted-foreground mb-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>Eng. Rate</span>
                  </div>
                  <div className="font-semibold">
                    {channel.analytics?.engagementRate?.toFixed(1) || '0'}%
                  </div>
                </div>
              </div>
            </Card>
          )) : (
            <div className="text-center py-8 text-muted-foreground">
              No social posts in this campaign
            </div>
          )}
        </div>
      </TabsContent>

      <TabsContent value="ads" className="space-y-4 mt-4">
        <div className="text-sm text-muted-foreground mb-3">
          Paid social media advertising performance
        </div>
        <div className="space-y-3">
          {socialAds.length > 0 ? socialAds.map((channel, idx) => (
            <Card key={idx} className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="font-semibold capitalize">
                  {channel.type.replace('-ad', '').replace('-', ' ')} Ads
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    ${channel.budget || 0}/day
                  </Badge>
                  <Badge variant={channel.status === 'active' ? 'default' : 'secondary'}>
                    {channel.status}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-3 text-sm">
                <div>
                  <div className="flex items-center gap-1 text-muted-foreground mb-1">
                    <Eye className="w-3 h-3" />
                    <span>Reach</span>
                  </div>
                  <div className="font-semibold">
                    {channel.analytics?.reach?.toLocaleString() || '0'}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-muted-foreground mb-1">
                    <MousePointerClick className="w-3 h-3" />
                    <span>Clicks</span>
                  </div>
                  <div className="font-semibold">
                    {channel.analytics?.clicked?.toLocaleString() || '0'}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-muted-foreground mb-1">
                    <Target className="w-3 h-3" />
                    <span>CTR</span>
                  </div>
                  <div className="font-semibold">
                    {channel.analytics?.ctr?.toFixed(2) || '0'}%
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-muted-foreground mb-1">
                    <DollarSign className="w-3 h-3" />
                    <span>CPC</span>
                  </div>
                  <div className="font-semibold">
                    ${channel.analytics?.cpc?.toFixed(2) || '0'}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-muted-foreground mb-1">
                    <BarChart3 className="w-3 h-3" />
                    <span>ROAS</span>
                  </div>
                  <div className="font-semibold">
                    {channel.analytics?.roas?.toFixed(1) || '0'}x
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">
                Total Spent: ${channel.analytics?.spend?.toLocaleString() || '0'} • 
                Conversions: {channel.analytics?.conversions || 0}
              </div>
            </Card>
          )) : (
            <div className="text-center py-8 text-muted-foreground">
              No social ads in this campaign
            </div>
          )}
        </div>
      </TabsContent>

      <TabsContent value="direct" className="space-y-4 mt-4">
        <div className="text-sm text-muted-foreground mb-3">
          Direct messaging performance (Email, SMS, Mail)
        </div>
        <div className="space-y-3">
          {directMessages.length > 0 ? directMessages.map((channel, idx) => (
            <Card key={idx} className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="font-semibold capitalize">{channel.type}</div>
                <Badge variant={channel.status === 'sent' ? 'default' : 'secondary'}>
                  {channel.status}
                </Badge>
              </div>
              <div className="grid grid-cols-5 gap-3 text-sm">
                <div>
                  <div className="text-muted-foreground mb-1">Sent</div>
                  <div className="font-semibold">
                    {channel.analytics?.sent?.toLocaleString() || '0'}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">Delivered</div>
                  <div className="font-semibold">
                    {channel.analytics?.delivered?.toLocaleString() || '0'}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">Opened</div>
                  <div className="font-semibold">
                    {channel.analytics?.opened?.toLocaleString() || '0'}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">Clicked</div>
                  <div className="font-semibold">
                    {channel.analytics?.clicked?.toLocaleString() || '0'}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">Open Rate</div>
                  <div className="font-semibold">
                    {channel.analytics?.openRate?.toFixed(1) || '0'}%
                  </div>
                </div>
              </div>
            </Card>
          )) : (
            <div className="text-center py-8 text-muted-foreground">
              No direct messages in this campaign
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
};
