import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SegmentPreview } from "./SegmentPreview";
import { ChannelContentEditor } from "./ChannelContentEditor";
import { AvatarStack } from "./AvatarStack";
import { MarketingCampaign, CampaignChannel, GuestSegment, HistoricalGuest } from "@/types/marketing";
import { 
  ArrowLeft, ArrowRight, Check, Mail, MessageSquare, Instagram, 
  Facebook, Linkedin, Send, Sparkles, Calendar, DollarSign, Users, Info 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CampaignCreatorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (campaign: Partial<MarketingCampaign>) => void;
  segments: GuestSegment[];
  guests: HistoricalGuest[];
}

const steps = [
  { id: 1, name: "Campaign Details", icon: Sparkles },
  { id: 2, name: "Choose Channels", icon: Mail },
  { id: 3, name: "Select Audience", icon: Users },
  { id: 4, name: "Create Content", icon: MessageSquare },
  { id: 5, name: "Review & Launch", icon: Check }
];

const channelOptions: { 
  type: CampaignChannel['type']; 
  label: string; 
  icon: any; 
  color: string;
  description: string;
  requiresAudience: boolean;
  group: 'direct' | 'social-post' | 'social-ad';
}[] = [
  { type: 'email', label: 'Email', icon: Mail, color: 'from-blue-500 to-blue-600', description: 'Direct communication', requiresAudience: true, group: 'direct' },
  { type: 'sms', label: 'SMS', icon: MessageSquare, color: 'from-green-500 to-green-600', description: 'Instant messaging', requiresAudience: true, group: 'direct' },
  { type: 'physical-mail', label: 'Mail', icon: Send, color: 'from-amber-500 to-orange-600', description: 'Premium touchpoint', requiresAudience: true, group: 'direct' },
  { type: 'linkedin-post', label: 'LinkedIn', icon: Linkedin, color: 'from-blue-700 to-blue-800', description: 'Professional posts', requiresAudience: false, group: 'social-post' },
  { type: 'instagram-post', label: 'Instagram', icon: Instagram, color: 'from-pink-500 to-purple-600', description: 'Visual content', requiresAudience: false, group: 'social-post' },
  { type: 'facebook-post', label: 'Facebook', icon: Facebook, color: 'from-blue-600 to-blue-700', description: 'Social posts', requiresAudience: false, group: 'social-post' },
  { type: 'linkedin-ad', label: 'LinkedIn Ads', icon: Linkedin, color: 'from-blue-700 to-blue-800', description: 'Paid campaigns', requiresAudience: false, group: 'social-ad' },
  { type: 'instagram-ad', label: 'Instagram Ads', icon: Instagram, color: 'from-pink-500 to-purple-600', description: 'Paid ads', requiresAudience: false, group: 'social-ad' },
  { type: 'facebook-ad', label: 'Facebook Ads', icon: Facebook, color: 'from-blue-600 to-blue-700', description: 'Paid ads', requiresAudience: false, group: 'social-ad' },
];

export const CampaignCreator = ({ isOpen, onClose, onSave, segments, guests }: CampaignCreatorProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignName, setCampaignName] = useState("");
  const [campaignDescription, setCampaignDescription] = useState("");
  const [selectedSegments, setSelectedSegments] = useState<string[]>([]);
  const [selectedChannels, setSelectedChannels] = useState<CampaignChannel['type'][]>([]);
  const [channels, setChannels] = useState<CampaignChannel[]>([]);

  const selectedGuests = guests.filter(g => 
    g.segments.some(s => selectedSegments.includes(s))
  );

  // Check if selected channels require audience targeting
  const hasTargetedChannels = selectedChannels.some(ch => 
    channelOptions.find(opt => opt.type === ch)?.requiresAudience
  );
  
  const hasSocialOnlyChannels = selectedChannels.length > 0 && 
    selectedChannels.every(ch => !channelOptions.find(opt => opt.type === ch)?.requiresAudience);

  // Calculate active steps (skip audience if not needed)
  const activeSteps = steps.filter(step => {
    if (step.name === "Select Audience" && hasSocialOnlyChannels) {
      return false;
    }
    return true;
  });
  
  const progress = (activeSteps.findIndex(s => s.id === currentStep) + 1) / activeSteps.length * 100;

  const handleNext = () => {
    // Step 2 (Choose Channels) -> Check if we need audience selection
    if (currentStep === 2) {
      if (hasSocialOnlyChannels) {
        // Skip audience selection, go to content creation
        setCurrentStep(4);
      } else {
        setCurrentStep(3);
      }
      return;
    }
    
    // Step 3 (Select Audience) or Step 4 (Create Content) - Initialize channels
    if ((currentStep === 3 || currentStep === 4) && channels.length === 0) {
      const newChannels: CampaignChannel[] = selectedChannels.map(type => ({
        type,
        content: { body: '', callToAction: { text: '', url: '', type: 'learn-more' } },
        status: 'pending' as const
      }));
      setChannels(newChannels);
    }
    
    if (currentStep < steps.length) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleLaunch = () => {
    const campaign: Partial<MarketingCampaign> = {
      id: `campaign-${Date.now()}`,
      name: campaignName,
      description: campaignDescription,
      status: 'active',
      targetSegments: selectedSegments,
      channels: channels,
      createdAt: new Date(),
      createdBy: 'current-user'
    };
    onSave(campaign);
    handleClose();
  };

  const handleClose = () => {
    setCampaignName("");
    setCampaignDescription("");
    setSelectedSegments([]);
    setSelectedChannels([]);
    setChannels([]);
    setCurrentStep(1);
    onClose();
  };

  const toggleSegment = (segmentId: string) => {
    setSelectedSegments(prev =>
      prev.includes(segmentId)
        ? prev.filter(id => id !== segmentId)
        : [...prev, segmentId]
    );
  };

  const toggleChannel = (channelType: CampaignChannel['type']) => {
    setSelectedChannels(prev =>
      prev.includes(channelType)
        ? prev.filter(type => type !== channelType)
        : [...prev, channelType]
    );
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return campaignName.trim().length > 0;
      case 2: return selectedChannels.length > 0;
      case 3: return selectedSegments.length > 0;
      case 4: return channels.every(ch => ch.content.body.trim().length > 0);
      default: return true;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="bg-gradient-to-r from-primary/10 via-primary/5 to-background pb-4">
          <DialogTitle className="text-2xl">Create Marketing Campaign</DialogTitle>
          <p className="text-sm text-muted-foreground">Launch multi-channel campaigns to reach your guests</p>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="space-y-3 px-1">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between">
            {activeSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted = step.id < currentStep;
              const isFuture = step.id > currentStep;
              
              return (
                <div
                  key={step.id}
                  className={cn(
                    "flex flex-col items-center gap-1.5 text-xs transition-all duration-200",
                    isActive && "text-primary font-semibold scale-110",
                    isCompleted && "text-success",
                    isFuture && "text-muted-foreground"
                  )}
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200",
                      isActive && "border-primary bg-primary/10 shadow-lg shadow-primary/20",
                      isCompleted && "border-success bg-success/10",
                      isFuture && "border-muted"
                    )}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  <span className="hidden sm:block text-center leading-tight max-w-[80px]">
                    {step.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    Step {index + 1}/{activeSteps.length}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="flex-1 overflow-y-auto py-6 px-1">
          {/* Step 1: Campaign Details */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center space-y-2 pb-4">
                <Sparkles className="w-12 h-12 mx-auto text-primary" />
                <h3 className="text-2xl font-bold">Let's Create Something Amazing</h3>
                <p className="text-muted-foreground">Start by giving your campaign a memorable name</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="campaign-name" className="text-sm font-semibold uppercase tracking-wide">
                  Campaign Name *
                </Label>
                <Input
                  id="campaign-name"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  placeholder="Summer Festival 2024 Campaign"
                  className="h-12 text-base"
                />
                <p className="text-xs text-muted-foreground">
                  {campaignName.length}/100 characters
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="campaign-description" className="text-sm font-semibold uppercase tracking-wide">
                  Description
                </Label>
                <Textarea
                  id="campaign-description"
                  value={campaignDescription}
                  onChange={(e) => setCampaignDescription(e.target.value)}
                  placeholder="Promote our upcoming summer festival to previous attendees and new potential guests. Highlight exclusive early-bird offers..."
                  rows={6}
                  className="text-base leading-relaxed"
                />
                <p className="text-xs text-muted-foreground">
                  What makes this campaign special? What's the goal?
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Choose Channels */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center space-y-2 pb-4">
                <Mail className="w-12 h-12 mx-auto text-primary" />
                <h3 className="text-2xl font-bold">Choose Your Channels</h3>
                <p className="text-muted-foreground">Select how you want to reach your audience</p>
              </div>

              {/* Direct Messaging Channels */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold uppercase tracking-wide">Direct Messaging</h4>
                  <Badge variant="secondary" className="text-xs">Target Specific Guests</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {channelOptions.filter(opt => opt.group === 'direct').map((option) => {
                    const Icon = option.icon;
                    const isSelected = selectedChannels.includes(option.type);
                    return (
                      <Card
                        key={option.type}
                        className={cn(
                          "p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02]",
                          isSelected && "ring-2 ring-primary bg-primary/5 shadow-lg"
                        )}
                        onClick={() => toggleChannel(option.type)}
                      >
                        <div className="flex flex-col items-center gap-3 text-center">
                          <div
                            className={cn(
                              "w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg transition-transform",
                              option.color,
                              isSelected && "scale-110"
                            )}
                          >
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          <div className="space-y-1">
                            <div className="font-semibold text-base">{option.label}</div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {option.description}
                            </p>
                            {isSelected && (
                              <Badge variant="default" className="mt-2">
                                <Check className="w-3 h-3 mr-1" />
                                Selected
                              </Badge>
                            )}
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Social Media Posts */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold uppercase tracking-wide">Social Media Posts</h4>
                  <Badge variant="secondary" className="text-xs">Organic Content</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {channelOptions.filter(opt => opt.group === 'social-post').map((option) => {
                    const Icon = option.icon;
                    const isSelected = selectedChannels.includes(option.type);
                    return (
                      <Card
                        key={option.type}
                        className={cn(
                          "p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02]",
                          isSelected && "ring-2 ring-primary bg-primary/5 shadow-lg"
                        )}
                        onClick={() => toggleChannel(option.type)}
                      >
                        <div className="flex flex-col items-center gap-3 text-center">
                          <div
                            className={cn(
                              "w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg transition-transform",
                              option.color,
                              isSelected && "scale-110"
                            )}
                          >
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          <div className="space-y-1">
                            <div className="font-semibold text-base">{option.label}</div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {option.description}
                            </p>
                            {isSelected && (
                              <Badge variant="default" className="mt-2">
                                <Check className="w-3 h-3 mr-1" />
                                Selected
                              </Badge>
                            )}
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Social Media Ads */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold uppercase tracking-wide">Social Media Ads</h4>
                  <Badge variant="secondary" className="text-xs">Paid Campaigns</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {channelOptions.filter(opt => opt.group === 'social-ad').map((option) => {
                    const Icon = option.icon;
                    const isSelected = selectedChannels.includes(option.type);
                    return (
                      <Card
                        key={option.type}
                        className={cn(
                          "p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02]",
                          isSelected && "ring-2 ring-primary bg-primary/5 shadow-lg"
                        )}
                        onClick={() => toggleChannel(option.type)}
                      >
                        <div className="flex flex-col items-center gap-3 text-center">
                          <div
                            className={cn(
                              "w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg transition-transform",
                              option.color,
                              isSelected && "scale-110"
                            )}
                          >
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          <div className="space-y-1">
                            <div className="font-semibold text-base">{option.label}</div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {option.description}
                            </p>
                            {isSelected && (
                              <Badge variant="default" className="mt-2">
                                <Check className="w-3 h-3 mr-1" />
                                Selected
                              </Badge>
                            )}
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Select Audience (Conditional) */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <Alert className="bg-primary/5 border-primary/20">
                <Info className="h-4 w-4 text-primary" />
                <AlertDescription className="text-sm">
                  You selected channels that support targeted messaging. Choose which guest segments to reach.
                </AlertDescription>
              </Alert>

              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Select Target Segments</h3>
                {selectedGuests.length > 0 && (
                  <div className="flex items-center gap-3 bg-primary/10 px-4 py-2 rounded-lg">
                    <AvatarStack guests={selectedGuests} max={5} size="sm" />
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        {selectedGuests.length}
                      </div>
                      <div className="text-xs text-muted-foreground">guests</div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {segments.map((segment) => (
                  <Card
                    key={segment.id}
                    className={cn(
                      "p-5 cursor-pointer transition-all duration-300 hover:shadow-xl",
                      selectedSegments.includes(segment.id)
                        ? "ring-2 ring-primary bg-primary/5 shadow-lg scale-[1.02]"
                        : "hover:scale-[1.01]"
                    )}
                    onClick={() => toggleSegment(segment.id)}
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={selectedSegments.includes(segment.id)}
                        onCheckedChange={() => toggleSegment(segment.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <SegmentPreview 
                          segment={segment} 
                          guests={guests}
                          className="border-0 shadow-none p-0"
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Create Content */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center space-y-2 pb-4">
                <MessageSquare className="w-12 h-12 mx-auto text-primary" />
                <h3 className="text-2xl font-bold">Craft Your Message</h3>
                <p className="text-muted-foreground">Create compelling content for each channel</p>
              </div>
              
              <ChannelContentEditor
                channels={channels}
                onChannelsChange={setChannels}
              />
            </div>
          )}

          {/* Step 5: Review & Launch */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <Sparkles className="w-16 h-16 mx-auto text-primary animate-pulse" />
                <h3 className="text-3xl font-bold">Ready to Launch! 🚀</h3>
                <p className="text-base text-muted-foreground">
                  Review your campaign details before launching
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left: Campaign Summary */}
                <Card className="p-6 space-y-5 bg-gradient-to-br from-background to-primary/5">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">
                      Campaign Name
                    </div>
                    <div className="text-xl font-bold">{campaignName}</div>
                  </div>
                  
                  {campaignDescription && (
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">
                        Description
                      </div>
                      <div className="text-sm leading-relaxed text-muted-foreground">
                        {campaignDescription}
                      </div>
                    </div>
                  )}
                  
                  {hasTargetedChannels && (
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                        Target Audience
                      </div>
                      <div className="flex items-center gap-3 bg-background p-3 rounded-lg">
                        <AvatarStack guests={selectedGuests} max={6} />
                        <div>
                          <div className="text-2xl font-bold text-primary">
                            {selectedGuests.length}
                          </div>
                          <div className="text-xs text-muted-foreground">guests targeted</div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                      Channels ({channels.length})
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {channels.map((channel) => {
                        const option = channelOptions.find(o => o.type === channel.type);
                        const Icon = option?.icon || Mail;
                        return (
                          <Badge 
                            key={channel.type} 
                            variant="secondary" 
                            className="gap-1.5 px-3 py-1.5 text-sm"
                          >
                            <div className={cn("w-4 h-4 rounded-full bg-gradient-to-br flex items-center justify-center", option?.color)}>
                              <Icon className="w-2.5 h-2.5 text-white" />
                            </div>
                            {option?.label}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                </Card>

                {/* Right: Content Previews */}
                <Card className="p-6 space-y-4 bg-gradient-to-br from-background to-muted/20">
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Content Preview
                  </div>
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                    {channels.map((channel) => {
                      const option = channelOptions.find(o => o.type === channel.type);
                      const Icon = option?.icon || Mail;
                      return (
                        <div key={channel.type} className="bg-background p-4 rounded-lg border space-y-2">
                          <div className="flex items-center gap-2">
                            <div className={cn("w-8 h-8 rounded-lg bg-gradient-to-br flex items-center justify-center", option?.color)}>
                              <Icon className="w-4 h-4 text-white" />
                            </div>
                            <div className="font-semibold text-sm">{option?.label}</div>
                          </div>
                          {channel.content.subject && (
                            <div className="text-xs">
                              <span className="font-medium">Subject: </span>
                              <span className="text-muted-foreground">{channel.content.subject}</span>
                            </div>
                          )}
                          <div className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                            {channel.content.body}
                          </div>
                          {channel.content.callToAction?.text && (
                            <Badge variant="outline" className="text-xs">
                              CTA: {channel.content.callToAction.text}
                            </Badge>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-6 border-t mt-4">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            size="lg"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={handleClose} size="lg">
              Cancel
            </Button>
            {currentStep < steps.length ? (
              <Button 
                onClick={handleNext} 
                disabled={!canProceed()} 
                size="lg"
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 min-w-[120px]"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button 
                onClick={handleLaunch} 
                disabled={!canProceed()}
                size="lg"
                className="bg-gradient-to-r from-success to-success/80 hover:from-success/90 hover:to-success/70 min-w-[180px]"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Launch Campaign
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
