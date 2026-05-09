import { MarketingCampaign, GuestSegment } from "@/types/marketing";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Mail, MessageSquare, Image, Calendar, DollarSign, 
  Target, TrendingUp, Users, Eye, MousePointerClick,
  CheckCircle2, XCircle, Download, Edit, Copy, Trash2
} from "lucide-react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { AvatarStack } from "./AvatarStack";

interface CampaignDetailPanelProps {
  campaign: MarketingCampaign | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (campaign: MarketingCampaign) => void;
  onDelete: (campaignId: string) => void;
  onDuplicate: (campaign: MarketingCampaign) => void;
  segments: GuestSegment[];
}

const CampaignDetailPanel = ({
  campaign,
  isOpen,
  onClose,
  onEdit,
  onDelete,
  onDuplicate,
  segments
}: CampaignDetailPanelProps) => {
  if (!campaign) return null;

  const getStatusColor = (status: MarketingCampaign['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'scheduled': return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
      case 'completed': return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
      case 'draft': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
      case 'cancelled': return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getChannelIcon = (type: string) => {
    if (type.includes('email')) return <Mail className="w-4 h-4" />;
    if (type.includes('sms')) return <MessageSquare className="w-4 h-4" />;
    if (type.includes('post') || type.includes('ad')) return <Image className="w-4 h-4" />;
    return <Mail className="w-4 h-4" />;
  };

  const channelPerformanceData = campaign.analytics ? 
    Object.entries(campaign.analytics.costPerChannel).map(([channel, cost]) => ({
      name: channel.replace('-', ' '),
      cost: cost,
      reach: Math.floor(campaign.analytics!.reach / Object.keys(campaign.analytics!.costPerChannel).length)
    })) : [];

  const engagementFunnelData = campaign.analytics ? [
    { name: 'Sent', value: campaign.analytics.sent, fill: 'hsl(var(--primary))' },
    { name: 'Delivered', value: campaign.analytics.delivered, fill: 'hsl(var(--chart-2))' },
    { name: 'Opened', value: campaign.analytics.opened, fill: 'hsl(var(--chart-3))' },
    { name: 'Clicked', value: campaign.analytics.clicked, fill: 'hsl(var(--chart-4))' },
    { name: 'Converted', value: campaign.analytics.converted, fill: 'hsl(var(--chart-5))' }
  ] : [];

  const getSegmentInfo = (segmentId: string) => {
    return segments.find(s => s.id === segmentId);
  };

  const totalAudience = campaign.targetSegments.reduce((acc, segId) => {
    const seg = getSegmentInfo(segId);
    return acc + (seg?.guestCount || 0);
  }, 0);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <SheetTitle className="text-2xl">{campaign.name}</SheetTitle>
              <p className="text-sm text-muted-foreground mt-1">{campaign.description}</p>
            </div>
            <Badge className={getStatusColor(campaign.status)}>
              {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
            </Badge>
          </div>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Campaign Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="w-5 h-5" />
                Campaign Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Created</p>
                  <p className="font-medium">{new Date(campaign.createdAt).toLocaleDateString()}</p>
                </div>
                {campaign.launchedAt && (
                  <div>
                    <p className="text-sm text-muted-foreground">Launched</p>
                    <p className="font-medium">{new Date(campaign.launchedAt).toLocaleDateString()}</p>
                  </div>
                )}
                {campaign.completedAt && (
                  <div>
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <p className="font-medium">{new Date(campaign.completedAt).toLocaleDateString()}</p>
                  </div>
                )}
                {campaign.schedule?.scheduledFor && (
                  <div>
                    <p className="text-sm text-muted-foreground">Scheduled For</p>
                    <p className="font-medium">{new Date(campaign.schedule.scheduledFor).toLocaleDateString()}</p>
                  </div>
                )}
              </div>

              <Separator />

              <div>
                <p className="text-sm text-muted-foreground mb-2">Channels</p>
                <div className="flex flex-wrap gap-2">
                  {campaign.channels.map((channel, idx) => (
                    <Badge key={idx} variant="outline" className="gap-1">
                      {getChannelIcon(channel.type)}
                      {channel.type.replace('-', ' ')}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Target Audience */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="w-5 h-5" />
                Target Audience
              </CardTitle>
              <CardDescription>
                Total reach: {totalAudience.toLocaleString()} guests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {campaign.targetSegments.map((segId) => {
                  const segment = getSegmentInfo(segId);
                  if (!segment) return null;
                  
                  return (
                    <div key={segId} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <AvatarStack count={segment.guestCount} maxVisible={3} size="sm" />
                        <div>
                          <p className="font-medium">{segment.name}</p>
                          <p className="text-sm text-muted-foreground">{segment.description}</p>
                        </div>
                      </div>
                      <Badge variant="secondary">{segment.guestCount} guests</Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Performance Analytics */}
          {campaign.analytics && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-primary/10 rounded-lg">
                      <Eye className="w-6 h-6 mx-auto mb-2 text-primary" />
                      <p className="text-2xl font-bold">{campaign.analytics.reach}</p>
                      <p className="text-xs text-muted-foreground">Reach</p>
                    </div>
                    <div className="text-center p-4 bg-blue-500/10 rounded-lg">
                      <CheckCircle2 className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                      <p className="text-2xl font-bold">{campaign.analytics.delivered}</p>
                      <p className="text-xs text-muted-foreground">Delivered</p>
                    </div>
                    <div className="text-center p-4 bg-green-500/10 rounded-lg">
                      <MousePointerClick className="w-6 h-6 mx-auto mb-2 text-green-500" />
                      <p className="text-2xl font-bold">{campaign.analytics.clicked}</p>
                      <p className="text-xs text-muted-foreground">Clicked</p>
                    </div>
                    <div className="text-center p-4 bg-purple-500/10 rounded-lg">
                      <Target className="w-6 h-6 mx-auto mb-2 text-purple-500" />
                      <p className="text-2xl font-bold">{campaign.analytics.converted}</p>
                      <p className="text-xs text-muted-foreground">Conversions</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="text-center p-3 border rounded-lg">
                      <p className="text-sm text-muted-foreground">Engagement</p>
                      <p className="text-xl font-bold text-primary">{campaign.analytics.engagementRate.toFixed(1)}%</p>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <p className="text-sm text-muted-foreground">Conversion</p>
                      <p className="text-xl font-bold text-green-600">{campaign.analytics.conversionRate.toFixed(1)}%</p>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <p className="text-sm text-muted-foreground">ROI</p>
                      <p className="text-xl font-bold text-green-600">${campaign.analytics.roi?.toLocaleString() || 0}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Engagement Funnel */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Engagement Funnel</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={engagementFunnelData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Channel Performance */}
              {channelPerformanceData.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Channel Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={channelPerformanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="cost" fill="hsl(var(--chart-1))" name="Cost ($)" />
                        <Bar dataKey="reach" fill="hsl(var(--chart-2))" name="Reach" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              )}

              {/* Cost Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Cost Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(campaign.analytics.costPerChannel).map(([channel, cost]) => (
                      <div key={channel} className="flex items-center justify-between">
                        <span className="text-sm capitalize">{channel.replace('-', ' ')}</span>
                        <span className="font-semibold">${cost.toLocaleString()}</span>
                      </div>
                    ))}
                    <Separator />
                    <div className="flex items-center justify-between font-bold">
                      <span>Total Cost</span>
                      <span className="text-lg">${campaign.analytics.totalCost.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Channel Content */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Channel Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {campaign.channels.map((channel, idx) => (
                <div key={idx} className="p-4 border rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    {getChannelIcon(channel.type)}
                    <span className="font-medium capitalize">{channel.type.replace('-', ' ')}</span>
                    <Badge variant="outline" className="ml-auto">{channel.status}</Badge>
                  </div>
                  {channel.content.subject && (
                    <div>
                      <p className="text-xs text-muted-foreground">Subject</p>
                      <p className="text-sm font-medium">{channel.content.subject}</p>
                    </div>
                  )}
                  {channel.content.headline && (
                    <div>
                      <p className="text-xs text-muted-foreground">Headline</p>
                      <p className="text-sm font-medium">{channel.content.headline}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-muted-foreground">Content</p>
                    <p className="text-sm">{channel.content.body}</p>
                  </div>
                  {channel.content.callToAction && (
                    <div>
                      <p className="text-xs text-muted-foreground">Call to Action</p>
                      <Button size="sm" variant="outline">
                        {channel.content.callToAction.text}
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {(campaign.status === 'draft' || campaign.status === 'scheduled') && (
                <Button onClick={() => onEdit(campaign)} variant="default">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Campaign
                </Button>
              )}
              <Button onClick={() => onDuplicate(campaign)} variant="outline">
                <Copy className="w-4 h-4 mr-2" />
                Duplicate
              </Button>
              {campaign.analytics && (
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              )}
              <Button 
                onClick={() => onDelete(campaign.id)} 
                variant="destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Campaign
              </Button>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CampaignDetailPanel;
