import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Target, Database, TrendingUp, Plus, Sparkles } from "lucide-react";
import CampaignList from "./marketing/CampaignList";
import GuestDirectory from "./marketing/GuestDirectory";
import SegmentBuilder from "./marketing/SegmentBuilder";
import { CampaignCreator } from "./marketing/CampaignCreator";
import { AvatarStack } from "./marketing/AvatarStack";
import { mockCampaigns, mockSegments, mockHistoricalGuests } from "@/utils/mockMarketingData";
import { MarketingCampaign, GuestSegment } from "@/types/marketing";
import CampaignDetailPanel from "./marketing/CampaignDetailPanel";
import SegmentDetailPanel from "./marketing/SegmentDetailPanel";

interface MarketingModuleProps {
  eventId: string;
}

const MarketingModule = ({ eventId }: MarketingModuleProps) => {
  const [activeTab, setActiveTab] = useState("campaigns");
  const [showSegmentBuilder, setShowSegmentBuilder] = useState(false);
  const [showCampaignCreator, setShowCampaignCreator] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<MarketingCampaign | null>(null);
  const [selectedSegment, setSelectedSegment] = useState<GuestSegment | null>(null);
  const [showCampaignDetail, setShowCampaignDetail] = useState(false);
  const [showSegmentDetail, setShowSegmentDetail] = useState(false);
  const [campaigns, setCampaigns] = useState(mockCampaigns);
  const [segments, setSegments] = useState(mockSegments);

  const handleSaveCampaign = (campaign: Partial<MarketingCampaign>) => {
    setCampaigns([campaign as MarketingCampaign, ...campaigns]);
    setShowCampaignCreator(false);
  };

  const handleCampaignClick = (campaign: MarketingCampaign) => {
    setSelectedCampaign(campaign);
    setShowCampaignDetail(true);
  };

  const handleEditCampaign = (campaign: MarketingCampaign) => {
    setSelectedCampaign(campaign);
    setShowCampaignCreator(true);
    setShowCampaignDetail(false);
  };

  const handleDeleteCampaign = (campaignId: string) => {
    if (confirm('Delete this campaign?')) {
      setCampaigns(campaigns.filter(c => c.id !== campaignId));
      setShowCampaignDetail(false);
    }
  };

  const handleDuplicateCampaign = (campaign: MarketingCampaign) => {
    const duplicate = { ...campaign, id: `campaign-${Date.now()}`, name: `Copy of ${campaign.name}`, status: 'draft' as const, createdAt: new Date() };
    setCampaigns([...campaigns, duplicate]);
  };

  const handleSegmentClick = (segment: GuestSegment) => {
    setSelectedSegment(segment);
    setShowSegmentDetail(true);
  };

  const handleEditSegment = (segment: GuestSegment) => {
    setSelectedSegment(segment);
    setShowSegmentBuilder(true);
    setShowSegmentDetail(false);
  };

  const handleDeleteSegment = (segmentId: string) => {
    if (confirm('Delete this segment?')) {
      setSegments(segments.filter(s => s.id !== segmentId));
      setShowSegmentDetail(false);
    }
  };

  const handleCreateCampaignFromSegment = (segment: GuestSegment) => {
    setShowCampaignCreator(true);
    setShowSegmentDetail(false);
  };

  const activeCampaigns = campaigns.filter(c => c.status === 'active').length;
  const totalGuests = mockHistoricalGuests.length;
  const avgEngagement = campaigns.length > 0
    ? campaigns.reduce((sum, c) => sum + (c.analytics?.engagementRate || 0), 0) / campaigns.length
    : 0;
  const recentGuests = mockHistoricalGuests.slice(0, 8);

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] bg-gradient-to-br from-background to-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Guests</p>
                <h3 className="text-3xl font-bold mt-2">{totalGuests.toLocaleString()}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Across all events
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
            </div>
            <AvatarStack guests={recentGuests} max={5} size="sm" showCount={false} />
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] bg-gradient-to-br from-background to-success/5 border-success/20">
          <CardContent className="pt-6">
            <div className="mb-4">
              <p className="text-sm font-medium text-muted-foreground">Campaign Channels</p>
              <h3 className="text-3xl font-bold mt-2">{campaigns.reduce((sum, c) => sum + c.channels.length, 0)}</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Total channel deployments
              </p>
            </div>
            <div className="space-y-2">
              {(() => {
                const channelCounts = campaigns.reduce((acc, campaign) => {
                  campaign.channels.forEach(ch => {
                    acc[ch.type] = (acc[ch.type] || 0) + 1;
                  });
                  return acc;
                }, {} as Record<string, number>);
                
                const channelDisplay = [
                  { type: 'email', icon: '📧', label: 'Email', color: 'text-blue-500' },
                  { type: 'instagram-post', icon: '📸', label: 'Instagram', color: 'text-pink-500' },
                  { type: 'linkedin-post', icon: '💼', label: 'LinkedIn', color: 'text-blue-600' },
                  { type: 'physical-mail', icon: '✉️', label: 'Mail', color: 'text-purple-500' },
                ];

                return channelDisplay.map(channel => {
                  const count = channelCounts[channel.type] || 0;
                  if (count === 0) return null;
                  const percentage = (count / Object.values(channelCounts).reduce((a, b) => a + b, 0)) * 100;
                  
                  return (
                    <div key={channel.type} className="flex items-center gap-2">
                      <span className="text-lg">{channel.icon}</span>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-medium">{channel.label}</span>
                          <span className="text-xs font-bold">{count}</span>
                        </div>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-success transition-all duration-300" 
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                }).filter(Boolean);
              })()}
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] bg-gradient-to-br from-background to-purple-500/5 border-purple-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Guest Segments</p>
                <h3 className="text-3xl font-bold mt-2">{segments.length}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Ready to target
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                <Database className="w-6 h-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] bg-gradient-to-br from-background to-rose-500/5 border-rose-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Engagement</p>
                <h3 className="text-3xl font-bold mt-2">{avgEngagement.toFixed(1)}%</h3>
                <p className="text-xs text-success mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Strong performance
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-rose-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="segments">Segments</TabsTrigger>
          <TabsTrigger value="database">Guest Database</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="mt-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Marketing Campaigns</h2>
            <p className="text-muted-foreground">Create and manage multi-channel campaigns</p>
          </div>
          <CampaignList
            campaigns={campaigns} 
            guests={mockHistoricalGuests} 
            segments={segments}
            onCampaignClick={handleCampaignClick}
            onEdit={handleEditCampaign}
            onDelete={handleDeleteCampaign}
            onDuplicate={handleDuplicateCampaign}
          />
        </TabsContent>

        <TabsContent value="segments" className="mt-6">
          {!showSegmentBuilder ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Guest Segments</h2>
                  <p className="text-muted-foreground">Organize guests by demographics and behavior</p>
                </div>
                <Button 
                  className="gap-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 shadow-md hover:shadow-lg transition-all" 
                  onClick={() => setShowSegmentBuilder(true)}
                >
                  <Plus className="w-4 h-4" />
                  Create Segment
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {segments.map((segment) => {
                  const segmentGuests = mockHistoricalGuests.filter(g => g.segments.includes(segment.id));
                  return (
                    <Card key={segment.id} className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer" onClick={() => handleSegmentClick(segment)}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{segment.name}</h3>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                              {segment.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 mb-3">
                          <AvatarStack guests={segmentGuests} max={4} size="sm" />
                          <div className="flex items-center gap-1 text-sm font-semibold text-primary">
                            <Users className="w-4 h-4" />
                            {segment.guestCount}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </>
          ) : (
            <SegmentBuilder
              onClose={() => setShowSegmentBuilder(false)}
              onSave={() => setShowSegmentBuilder(false)}
              guests={mockHistoricalGuests}
            />
          )}
        </TabsContent>

        <TabsContent value="database" className="mt-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Guest Database</h2>
            <p className="text-muted-foreground">Browse and filter all historical guests</p>
          </div>
          <GuestDirectory guests={mockHistoricalGuests} segments={segments} />
        </TabsContent>
      </Tabs>

      <CampaignCreator
        isOpen={showCampaignCreator}
        onClose={() => setShowCampaignCreator(false)}
        onSave={handleSaveCampaign}
        segments={segments}
        guests={mockHistoricalGuests}
      />

      <CampaignDetailPanel
        campaign={selectedCampaign}
        isOpen={showCampaignDetail}
        onClose={() => setShowCampaignDetail(false)}
        onEdit={handleEditCampaign}
        onDelete={handleDeleteCampaign}
        onDuplicate={handleDuplicateCampaign}
        segments={segments}
      />

      <SegmentDetailPanel
        segment={selectedSegment}
        guests={mockHistoricalGuests}
        campaigns={campaigns}
        isOpen={showSegmentDetail}
        onClose={() => setShowSegmentDetail(false)}
        onEdit={handleEditSegment}
        onDelete={handleDeleteSegment}
        onCreateCampaign={handleCreateCampaignFromSegment}
      />

      {/* Floating Action Button */}
      <Button 
        size="lg"
        className="fixed bottom-6 right-6 z-50 shadow-2xl h-14 px-6 rounded-full 
                   bg-gradient-to-r from-primary to-primary/80 
                   hover:scale-110 hover:shadow-primary/50 
                   transition-all duration-300"
        onClick={() => setShowCampaignCreator(true)}
      >
        <Sparkles className="w-5 h-5" />
        <span className="ml-2 hidden sm:inline">Create Campaign</span>
      </Button>
    </div>
  );
};

export default MarketingModule;
