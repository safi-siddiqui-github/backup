import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Users, UserCheck, Ticket } from "lucide-react";

interface RSVPGroup {
  id: string;
  name: string;
  guestCount: number;
}

interface TicketTier {
  id: string;
  name: string;
  quantity: number;
}

interface TargetAudience {
  type: 'all' | 'rsvp-groups' | 'ticket-tiers' | 'custom';
  rsvpGroupIds?: string[];
  ticketTierIds?: string[];
  customEmails?: string[];
}

interface TargetAudienceSelectorProps {
  value: TargetAudience;
  onChange: (value: TargetAudience) => void;
  rsvpGroups?: RSVPGroup[];
  ticketTiers?: TicketTier[];
}

const TargetAudienceSelector = ({ 
  value, 
  onChange, 
  rsvpGroups = [], 
  ticketTiers = [] 
}: TargetAudienceSelectorProps) => {
  
  const calculateTotalRecipients = () => {
    if (value.type === 'all') {
      const totalRsvp = rsvpGroups.reduce((sum, g) => sum + g.guestCount, 0);
      const totalTickets = ticketTiers.reduce((sum, t) => sum + t.quantity, 0);
      return Math.max(totalRsvp, totalTickets) || 250; // Fallback to 250 if no data
    }
    
    if (value.type === 'rsvp-groups' && value.rsvpGroupIds) {
      return rsvpGroups
        .filter(g => value.rsvpGroupIds?.includes(g.id))
        .reduce((sum, g) => sum + g.guestCount, 0);
    }
    
    if (value.type === 'ticket-tiers' && value.ticketTierIds) {
      return ticketTiers
        .filter(t => value.ticketTierIds?.includes(t.id))
        .reduce((sum, t) => sum + t.quantity, 0);
    }
    
    if (value.type === 'custom' && value.customEmails) {
      return value.customEmails.filter(e => e.trim()).length;
    }
    
    return 0;
  };

  const handleTypeChange = (type: TargetAudience['type']) => {
    onChange({
      type,
      rsvpGroupIds: type === 'rsvp-groups' ? [] : undefined,
      ticketTierIds: type === 'ticket-tiers' ? [] : undefined,
      customEmails: type === 'custom' ? [] : undefined
    });
  };

  const handleGroupToggle = (groupId: string) => {
    const currentIds = value.rsvpGroupIds || [];
    const newIds = currentIds.includes(groupId)
      ? currentIds.filter(id => id !== groupId)
      : [...currentIds, groupId];
    
    onChange({ ...value, rsvpGroupIds: newIds });
  };

  const handleTierToggle = (tierId: string) => {
    const currentIds = value.ticketTierIds || [];
    const newIds = currentIds.includes(tierId)
      ? currentIds.filter(id => id !== tierId)
      : [...currentIds, tierId];
    
    onChange({ ...value, ticketTierIds: newIds });
  };

  const handleCustomEmailsChange = (text: string) => {
    const emails = text.split(/[\n,]/).map(e => e.trim()).filter(Boolean);
    onChange({ ...value, customEmails: emails });
  };

  const totalRecipients = calculateTotalRecipients();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base font-semibold">Target Audience</Label>
        <Badge variant="secondary" className="text-sm">
          <Users className="w-3 h-3 mr-1" />
          {totalRecipients} recipients
        </Badge>
      </div>

      <RadioGroup value={value.type} onValueChange={handleTypeChange}>
        {/* All Attendees */}
        <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
          <RadioGroupItem value="all" id="all" className="mt-0.5" />
          <div className="flex-1">
            <Label htmlFor="all" className="font-medium cursor-pointer flex items-center gap-2">
              <Users className="w-4 h-4" />
              All Attendees
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              Send to everyone ({totalRecipients} total recipients)
            </p>
          </div>
        </div>

        {/* RSVP Groups */}
        <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
          <RadioGroupItem value="rsvp-groups" id="rsvp-groups" className="mt-0.5" />
          <div className="flex-1">
            <Label htmlFor="rsvp-groups" className="font-medium cursor-pointer flex items-center gap-2">
              <UserCheck className="w-4 h-4" />
              Specific RSVP Groups
            </Label>
            <p className="text-sm text-muted-foreground mt-1 mb-3">
              Target specific guest groups
            </p>
            
            {value.type === 'rsvp-groups' && (
              <div className="space-y-2 pl-1">
                {rsvpGroups.length > 0 ? (
                  rsvpGroups.map(group => (
                    <div key={group.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`group-${group.id}`}
                        checked={value.rsvpGroupIds?.includes(group.id)}
                        onCheckedChange={() => handleGroupToggle(group.id)}
                      />
                      <Label 
                        htmlFor={`group-${group.id}`} 
                        className="text-sm font-normal cursor-pointer flex items-center gap-2"
                      >
                        {group.name}
                        <Badge variant="outline" className="text-xs">
                          {group.guestCount}
                        </Badge>
                      </Label>
                    </div>
                  ))
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="group-vip"
                        checked={value.rsvpGroupIds?.includes('group-vip')}
                        onCheckedChange={() => handleGroupToggle('group-vip')}
                      />
                      <Label htmlFor="group-vip" className="text-sm font-normal cursor-pointer flex items-center gap-2">
                        VIP Guests <Badge variant="outline" className="text-xs">45</Badge>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="group-wedding-party"
                        checked={value.rsvpGroupIds?.includes('group-wedding-party')}
                        onCheckedChange={() => handleGroupToggle('group-wedding-party')}
                      />
                      <Label htmlFor="group-wedding-party" className="text-sm font-normal cursor-pointer flex items-center gap-2">
                        Wedding Party <Badge variant="outline" className="text-xs">12</Badge>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="group-family"
                        checked={value.rsvpGroupIds?.includes('group-family')}
                        onCheckedChange={() => handleGroupToggle('group-family')}
                      />
                      <Label htmlFor="group-family" className="text-sm font-normal cursor-pointer flex items-center gap-2">
                        Family & Close Friends <Badge variant="outline" className="text-xs">78</Badge>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="group-friends"
                        checked={value.rsvpGroupIds?.includes('group-friends')}
                        onCheckedChange={() => handleGroupToggle('group-friends')}
                      />
                      <Label htmlFor="group-friends" className="text-sm font-normal cursor-pointer flex items-center gap-2">
                        General Guests <Badge variant="outline" className="text-xs">115</Badge>
                      </Label>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Ticket Tiers */}
        <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
          <RadioGroupItem value="ticket-tiers" id="ticket-tiers" className="mt-0.5" />
          <div className="flex-1">
            <Label htmlFor="ticket-tiers" className="font-medium cursor-pointer flex items-center gap-2">
              <Ticket className="w-4 h-4" />
              Specific Ticket Tiers
            </Label>
            <p className="text-sm text-muted-foreground mt-1 mb-3">
              Target ticket holders by tier
            </p>
            
            {value.type === 'ticket-tiers' && (
              <div className="space-y-2 pl-1">
                {ticketTiers.length > 0 ? (
                  ticketTiers.map(tier => (
                    <div key={tier.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`tier-${tier.id}`}
                        checked={value.ticketTierIds?.includes(tier.id)}
                        onCheckedChange={() => handleTierToggle(tier.id)}
                      />
                      <Label 
                        htmlFor={`tier-${tier.id}`} 
                        className="text-sm font-normal cursor-pointer flex items-center gap-2"
                      >
                        {tier.name}
                        <Badge variant="outline" className="text-xs">
                          {tier.quantity}
                        </Badge>
                      </Label>
                    </div>
                  ))
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="tier-vip"
                        checked={value.ticketTierIds?.includes('tier-vip')}
                        onCheckedChange={() => handleTierToggle('tier-vip')}
                      />
                      <Label htmlFor="tier-vip" className="text-sm font-normal cursor-pointer flex items-center gap-2">
                        VIP Ticket <Badge variant="outline" className="text-xs">30</Badge>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="tier-general"
                        checked={value.ticketTierIds?.includes('tier-general')}
                        onCheckedChange={() => handleTierToggle('tier-general')}
                      />
                      <Label htmlFor="tier-general" className="text-sm font-normal cursor-pointer flex items-center gap-2">
                        General Admission <Badge variant="outline" className="text-xs">180</Badge>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="tier-early"
                        checked={value.ticketTierIds?.includes('tier-early')}
                        onCheckedChange={() => handleTierToggle('tier-early')}
                      />
                      <Label htmlFor="tier-early" className="text-sm font-normal cursor-pointer flex items-center gap-2">
                        Early Bird <Badge variant="outline" className="text-xs">40</Badge>
                      </Label>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Custom Email List */}
        <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
          <RadioGroupItem value="custom" id="custom" className="mt-0.5" />
          <div className="flex-1">
            <Label htmlFor="custom" className="font-medium cursor-pointer">
              Custom Email List
            </Label>
            <p className="text-sm text-muted-foreground mt-1 mb-3">
              Enter specific email addresses
            </p>
            
            {value.type === 'custom' && (
              <Textarea
                placeholder="Enter email addresses (one per line or comma-separated)&#10;example1@email.com&#10;example2@email.com"
                value={value.customEmails?.join('\n') || ''}
                onChange={(e) => handleCustomEmailsChange(e.target.value)}
                rows={5}
                className="font-mono text-sm"
              />
            )}
          </div>
        </div>
      </RadioGroup>
    </div>
  );
};

export default TargetAudienceSelector;
