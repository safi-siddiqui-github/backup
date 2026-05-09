import { MarketingCampaign } from "@/types/marketing";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, Image, Calendar, BarChart3, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CampaignListProps {
  campaigns: MarketingCampaign[];
  guests: any[];
  segments: any[];
  onCampaignClick: (campaign: MarketingCampaign) => void;
  onEdit: (campaign: MarketingCampaign) => void;
  onDelete: (campaignId: string) => void;
  onDuplicate: (campaign: MarketingCampaign) => void;
}

const CampaignList = ({ campaigns, onCampaignClick, onEdit, onDelete, onDuplicate }: CampaignListProps) => {
  const getStatusColor = (status: MarketingCampaign['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'scheduled':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
      case 'completed':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
      case 'draft':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
      case 'cancelled':
        return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getChannelIcon = (type: string) => {
    if (type.includes('email')) return <Mail className="w-4 h-4" />;
    if (type.includes('sms')) return <MessageSquare className="w-4 h-4" />;
    if (type.includes('post') || type.includes('ad')) return <Image className="w-4 h-4" />;
    return <Mail className="w-4 h-4" />;
  };

  return (
    <div className="space-y-4">
      {campaigns.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <BarChart3 className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No campaigns yet</h3>
            <p className="text-sm text-muted-foreground text-center mb-4">
              Create your first marketing campaign to reach your guests
            </p>
            <Button>Create Campaign</Button>
          </CardContent>
        </Card>
      ) : (
        campaigns.map((campaign) => (
          <Card 
            key={campaign.id} 
            className="hover:border-primary transition-all hover:shadow-lg cursor-pointer"
            onClick={() => onCampaignClick(campaign)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-lg">{campaign.name}</CardTitle>
                    <Badge className={getStatusColor(campaign.status)}>
                      {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                    </Badge>
                  </div>
                  <CardDescription>{campaign.description}</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-popover">
                    <DropdownMenuItem onClick={(e) => {
                      e.stopPropagation();
                      onCampaignClick(campaign);
                    }}>
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => {
                      e.stopPropagation();
                      onEdit(campaign);
                    }}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => {
                      e.stopPropagation();
                      onDuplicate(campaign);
                    }}>
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(campaign.id);
                      }}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Channels */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-muted-foreground">Channels:</span>
                  {campaign.channels.map((channel, idx) => (
                    <Badge key={idx} variant="outline" className="gap-1">
                      {getChannelIcon(channel.type)}
                      {channel.type.replace('-', ' ')}
                    </Badge>
                  ))}
                </div>

                {/* Target Segments */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-muted-foreground">Targeting:</span>
                  {campaign.targetSegments.map((segment, idx) => (
                    <Badge key={idx} variant="secondary">
                      {segment}
                    </Badge>
                  ))}
                </div>

                {/* Analytics (if available) */}
                {campaign.analytics && (
                  <div className="grid grid-cols-4 gap-4 pt-4 border-t">
                    <div>
                      <p className="text-xs text-muted-foreground">Reach</p>
                      <p className="text-lg font-semibold">{campaign.analytics.reach}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Engagement</p>
                      <p className="text-lg font-semibold">{campaign.analytics.engagementRate.toFixed(1)}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Conversions</p>
                      <p className="text-lg font-semibold">{campaign.analytics.converted}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">ROI</p>
                      <p className="text-lg font-semibold text-green-600">
                        ${campaign.analytics.roi?.toLocaleString() || 0}
                      </p>
                    </div>
                  </div>
                )}

                {/* Schedule Info */}
                {campaign.schedule?.scheduledFor && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Scheduled for {new Date(campaign.schedule.scheduledFor).toLocaleDateString()}</span>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2">
                  {campaign.status === 'draft' && (
                    <Button size="sm">Launch Campaign</Button>
                  )}
                  {campaign.status === 'completed' && (
                    <Button size="sm" variant="outline">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      View Analytics
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default CampaignList;
