import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CampaignChannel, ChannelContent } from "@/types/marketing";
import { Mail, MessageSquare, Instagram, Facebook, Linkedin, Send, Image as ImageIcon, Music } from "lucide-react";
import { SocialPostEditor } from "./SocialPostEditor";
import { SocialAdEditor } from "./SocialAdEditor";

interface ChannelContentEditorProps {
  channels: CampaignChannel[];
  onChannelsChange: (channels: CampaignChannel[]) => void;
}

const channelIcons: Record<string, any> = {
  email: Mail,
  sms: MessageSquare,
  'instagram-post': Instagram,
  'instagram-ad': Instagram,
  'facebook-post': Facebook,
  'facebook-ad': Facebook,
  'linkedin-post': Linkedin,
  'linkedin-ad': Linkedin,
  'tiktok-post': Music,
  'tiktok-ad': Music,
  'physical-mail': Send
};

export const ChannelContentEditor = ({ channels, onChannelsChange }: ChannelContentEditorProps) => {
  const [activeChannel, setActiveChannel] = useState(channels[0]?.type || 'email');

  const updateChannelContent = (channelType: string, updates: Partial<ChannelContent>) => {
    const newChannels = channels.map(ch => 
      ch.type === channelType 
        ? { ...ch, content: { ...ch.content, ...updates } }
        : ch
    );
    onChannelsChange(newChannels);
  };

  const updateChannel = (channelType: string, updates: Partial<CampaignChannel>) => {
    const newChannels = channels.map(ch => 
      ch.type === channelType 
        ? { ...ch, ...updates }
        : ch
    );
    onChannelsChange(newChannels);
  };

  const activeChannelData = channels.find(ch => ch.type === activeChannel);

  if (!activeChannelData) return null;

  return (
    <div className="space-y-4">
      <Tabs value={activeChannel} onValueChange={(value) => setActiveChannel(value as typeof activeChannel)} className="w-full">
        <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${channels.length}, 1fr)` }}>
          {channels.map((channel) => {
            const Icon = channelIcons[channel.type] || Mail;
            return (
              <TabsTrigger key={channel.type} value={channel.type} className="gap-2">
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {channel.type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                </span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {channels.map((channel) => (
          <TabsContent key={channel.type} value={channel.type} className="space-y-4">
            {/* Social Post Editor */}
            {channel.type.includes('-post') && (
              <SocialPostEditor 
                channel={channel}
                onChange={(content) => updateChannelContent(channel.type, content)}
              />
            )}

            {/* Social Ad Editor */}
            {channel.type.includes('-ad') && (
              <SocialAdEditor 
                channel={channel}
                onChange={(updates) => updateChannel(channel.type, updates)}
              />
            )}

            {/* Direct Message Channels (Email, SMS, Physical Mail) */}
            {!channel.type.includes('-post') && !channel.type.includes('-ad') && (
              <>
                <Card className="p-4">
                  {/* Email specific fields */}
                  {channel.type === 'email' && (
                    <>
                      <div className="space-y-2 mb-4">
                        <Label htmlFor="email-subject">Subject Line</Label>
                        <Input
                          id="email-subject"
                          value={channel.content.subject || ''}
                          onChange={(e) => updateChannelContent(channel.type, { subject: e.target.value })}
                          placeholder="You're invited to our exclusive event!"
                        />
                        <p className="text-xs text-muted-foreground">
                          {channel.content.subject?.length || 0}/60 characters
                        </p>
                      </div>
                    </>
                  )}

                  {/* Body content */}
                  <div className="space-y-2 mb-4">
                    <Label htmlFor="body">
                      {channel.type === 'sms' ? 'Message' : 'Body Content'}
                    </Label>
                    <Textarea
                      id="body"
                      value={channel.content.body}
                      onChange={(e) => updateChannelContent(channel.type, { body: e.target.value })}
                      placeholder={
                        channel.type === 'sms'
                          ? "Your message here..."
                          : "Write your campaign message here..."
                      }
                      rows={channel.type === 'sms' ? 3 : 6}
                      className="resize-none"
                    />
                    <p className="text-xs text-muted-foreground">
                      {channel.content.body.length}
                      {channel.type === 'sms' && '/160'} characters
                    </p>
                  </div>

                  {/* CTA */}
                  {channel.type !== 'sms' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cta-text">Call to Action Text</Label>
                        <Input
                          id="cta-text"
                          value={channel.content.callToAction?.text || ''}
                          onChange={(e) => updateChannelContent(channel.type, {
                            callToAction: {
                              ...channel.content.callToAction,
                              text: e.target.value,
                              url: channel.content.callToAction?.url || '',
                              type: channel.content.callToAction?.type || 'learn-more'
                            }
                          })}
                          placeholder="RSVP Now"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cta-url">Button URL</Label>
                        <Input
                          id="cta-url"
                          value={channel.content.callToAction?.url || ''}
                          onChange={(e) => updateChannelContent(channel.type, {
                            callToAction: {
                              ...channel.content.callToAction,
                              text: channel.content.callToAction?.text || '',
                              url: e.target.value,
                              type: channel.content.callToAction?.type || 'learn-more'
                            }
                          })}
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                  )}
                </Card>

                {/* Preview */}
                <Card className="p-4 bg-muted/30">
                  <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    Preview
                  </h4>
                  <div className="bg-background rounded-lg p-4 border border-border">
                    {channel.type === 'email' && (
                      <>
                        <div className="font-semibold mb-2">{channel.content.subject || 'Subject Line'}</div>
                        <div className="text-sm whitespace-pre-wrap">{channel.content.body || 'Email content will appear here...'}</div>
                        {channel.content.callToAction?.text && (
                          <div className="mt-4">
                            <div className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium">
                              {channel.content.callToAction.text}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                    {channel.type === 'sms' && (
                      <div className="text-sm">{channel.content.body || 'SMS message will appear here...'}</div>
                    )}
                    {channel.type === 'physical-mail' && (
                      <>
                        <div className="text-sm whitespace-pre-wrap mb-3">{channel.content.body || 'Mail content will appear here...'}</div>
                        {channel.content.callToAction?.text && (
                          <div className="inline-block px-3 py-1.5 bg-primary text-primary-foreground rounded text-xs font-medium">
                            {channel.content.callToAction.text}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </Card>
              </>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
