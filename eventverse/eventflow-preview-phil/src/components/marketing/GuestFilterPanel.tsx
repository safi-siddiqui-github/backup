import { useState } from "react";
import { GuestSegment } from "@/types/marketing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export interface GuestFilters {
  segments: string[];
  eventTypes: string[];
  ageRange: { min: number; max: number };
  spendingRange: { min: number; max: number };
  spendingLevel: 'all' | 'high' | 'medium' | 'low';
  attendanceRange: { min: number; max: number };
  attendanceLevel: 'all' | 'frequent' | 'occasional' | 'first-time';
  lastEventPeriod: 'all' | '30days' | '6months' | '1year' | 'over1year';
  optOuts: string[];
  location: string;
  // NEW FILTERS
  avgTicketPriceRange: { min: number; max: number };
  multiTicketBuyersOnly: boolean;
  totalTicketsRange: { min: number; max: number };
  purchaseFrequency: 'all' | 'weekly' | 'monthly' | 'quarterly' | 'annually' | 'rarely';
  birthdayMonths: number[];
  daysSinceLastEvent?: number;
  lifetimeValueRange: { min: number; max: number };
  rsvpReliability: 'all' | 'high' | 'medium' | 'low';
  frequentPlusOneBringers: boolean;
  avgPlusOnesRange: { min: number; max: number };
}

interface GuestFilterPanelProps {
  segments: GuestSegment[];
  filters: GuestFilters;
  onFiltersChange: (filters: GuestFilters) => void;
  guestCount: number;
}

const GuestFilterPanel = ({ segments, filters, onFiltersChange, guestCount }: GuestFilterPanelProps) => {
  const eventTypes = ['Wedding', 'Corporate', 'Festival', 'Fundraiser', 'Birthday', 'Conference'];
  
  const activeFilterCount = 
    filters.segments.length +
    filters.eventTypes.length +
    (filters.spendingLevel !== 'all' ? 1 : 0) +
    (filters.attendanceLevel !== 'all' ? 1 : 0) +
    (filters.lastEventPeriod !== 'all' ? 1 : 0) +
    filters.optOuts.length +
    (filters.location ? 1 : 0) +
    (filters.multiTicketBuyersOnly ? 1 : 0) +
    (filters.purchaseFrequency !== 'all' ? 1 : 0) +
    filters.birthdayMonths.length +
    (filters.daysSinceLastEvent ? 1 : 0) +
    (filters.rsvpReliability !== 'all' ? 1 : 0) +
    (filters.frequentPlusOneBringers ? 1 : 0);

  const clearAllFilters = () => {
    onFiltersChange({
      segments: [],
      eventTypes: [],
      ageRange: { min: 18, max: 65 },
      spendingRange: { min: 0, max: 10000 },
      spendingLevel: 'all',
      attendanceRange: { min: 0, max: 100 },
      attendanceLevel: 'all',
      lastEventPeriod: 'all',
      optOuts: [],
      location: '',
      avgTicketPriceRange: { min: 0, max: 500 },
      multiTicketBuyersOnly: false,
      totalTicketsRange: { min: 0, max: 20 },
      purchaseFrequency: 'all',
      birthdayMonths: [],
      daysSinceLastEvent: undefined,
      lifetimeValueRange: { min: 0, max: 10000 },
      rsvpReliability: 'all',
      frequentPlusOneBringers: false,
      avgPlusOnesRange: { min: 0, max: 5 }
    });
  };

  const toggleSegment = (segmentId: string) => {
    const newSegments = filters.segments.includes(segmentId)
      ? filters.segments.filter(s => s !== segmentId)
      : [...filters.segments, segmentId];
    onFiltersChange({ ...filters, segments: newSegments });
  };

  const toggleEventType = (eventType: string) => {
    const newEventTypes = filters.eventTypes.includes(eventType)
      ? filters.eventTypes.filter(e => e !== eventType)
      : [...filters.eventTypes, eventType];
    onFiltersChange({ ...filters, eventTypes: newEventTypes });
  };

  const toggleOptOut = (optOut: string) => {
    const newOptOuts = filters.optOuts.includes(optOut)
      ? filters.optOuts.filter(o => o !== optOut)
      : [...filters.optOuts, optOut];
    onFiltersChange({ ...filters, optOuts: newOptOuts });
  };

  const toggleBirthdayMonth = (month: number) => {
    const newMonths = filters.birthdayMonths.includes(month)
      ? filters.birthdayMonths.filter(m => m !== month)
      : [...filters.birthdayMonths, month];
    onFiltersChange({ ...filters, birthdayMonths: newMonths });
  };

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Filters</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {guestCount} guests match {activeFilterCount > 0 && `(${activeFilterCount} active filters)`}
            </p>
          </div>
          {activeFilterCount > 0 && (
            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" className="w-full">
          {/* Segments */}
          <AccordionItem value="segments">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                Segments
                {filters.segments.length > 0 && (
                  <Badge variant="secondary" className="ml-2">{filters.segments.length}</Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-2">
                {segments.map((segment) => (
                  <div key={segment.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`segment-${segment.id}`}
                      checked={filters.segments.includes(segment.id)}
                      onCheckedChange={() => toggleSegment(segment.id)}
                    />
                    <label
                      htmlFor={`segment-${segment.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                    >
                      {segment.name}
                      <span className="text-muted-foreground ml-2">({segment.guestCount})</span>
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Event Type */}
          <AccordionItem value="event-type">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                Event Type
                {filters.eventTypes.length > 0 && (
                  <Badge variant="secondary" className="ml-2">{filters.eventTypes.length}</Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-2">
                {eventTypes.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={`event-${type}`}
                      checked={filters.eventTypes.includes(type)}
                      onCheckedChange={() => toggleEventType(type)}
                    />
                    <label
                      htmlFor={`event-${type}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Demographics */}
          <AccordionItem value="demographics">
            <AccordionTrigger>Demographics</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                <div>
                  <Label className="text-sm mb-2 block">Age Range: {filters.ageRange.min} - {filters.ageRange.max}</Label>
                  <Slider
                    min={18}
                    max={65}
                    step={1}
                    value={[filters.ageRange.min, filters.ageRange.max]}
                    onValueChange={([min, max]) => onFiltersChange({ ...filters, ageRange: { min, max } })}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="location" className="text-sm">Location</Label>
                  <Input
                    id="location"
                    placeholder="City, State"
                    value={filters.location}
                    onChange={(e) => onFiltersChange({ ...filters, location: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Spending */}
          <AccordionItem value="spending">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                Spending
                {filters.spendingLevel !== 'all' && (
                  <Badge variant="secondary" className="ml-2">1</Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                <div>
                  <Label className="text-sm mb-2 block">
                    Range: ${filters.spendingRange.min} - ${filters.spendingRange.max}
                  </Label>
                  <Slider
                    min={0}
                    max={10000}
                    step={100}
                    value={[filters.spendingRange.min, filters.spendingRange.max]}
                    onValueChange={([min, max]) => onFiltersChange({ ...filters, spendingRange: { min, max } })}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label className="text-sm mb-2 block">Spending Level</Label>
                  <RadioGroup
                    value={filters.spendingLevel}
                    onValueChange={(value: any) => onFiltersChange({ ...filters, spendingLevel: value })}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="spend-all" />
                      <Label htmlFor="spend-all" className="font-normal cursor-pointer">All</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="high" id="spend-high" />
                      <Label htmlFor="spend-high" className="font-normal cursor-pointer">High ($1000+)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="spend-medium" />
                      <Label htmlFor="spend-medium" className="font-normal cursor-pointer">Medium ($500-$999)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="low" id="spend-low" />
                      <Label htmlFor="spend-low" className="font-normal cursor-pointer">Low (&lt;$500)</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Attendance */}
          <AccordionItem value="attendance">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                Attendance
                {filters.attendanceLevel !== 'all' && (
                  <Badge variant="secondary" className="ml-2">1</Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                <RadioGroup
                  value={filters.attendanceLevel}
                  onValueChange={(value: any) => onFiltersChange({ ...filters, attendanceLevel: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="attend-all" />
                    <Label htmlFor="attend-all" className="font-normal cursor-pointer">All</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="frequent" id="attend-frequent" />
                    <Label htmlFor="attend-frequent" className="font-normal cursor-pointer">Frequent (3+ events)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="occasional" id="attend-occasional" />
                    <Label htmlFor="attend-occasional" className="font-normal cursor-pointer">Occasional (2-3 events)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="first-time" id="attend-first" />
                    <Label htmlFor="attend-first" className="font-normal cursor-pointer">First-time (1 event)</Label>
                  </div>
                </RadioGroup>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Last Event Date */}
          <AccordionItem value="last-event">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                Last Event Date
                {filters.lastEventPeriod !== 'all' && (
                  <Badge variant="secondary" className="ml-2">1</Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2">
                <RadioGroup
                  value={filters.lastEventPeriod}
                  onValueChange={(value: any) => onFiltersChange({ ...filters, lastEventPeriod: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="date-all" />
                    <Label htmlFor="date-all" className="font-normal cursor-pointer">All time</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="30days" id="date-30" />
                    <Label htmlFor="date-30" className="font-normal cursor-pointer">Last 30 days</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="6months" id="date-6m" />
                    <Label htmlFor="date-6m" className="font-normal cursor-pointer">Last 6 months</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1year" id="date-1y" />
                    <Label htmlFor="date-1y" className="font-normal cursor-pointer">Last year</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="over1year" id="date-over" />
                    <Label htmlFor="date-over" className="font-normal cursor-pointer">More than 1 year ago</Label>
                  </div>
                </RadioGroup>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Communication Preferences */}
          <AccordionItem value="optouts">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                Opt-outs
                {filters.optOuts.length > 0 && (
                  <Badge variant="secondary" className="ml-2">{filters.optOuts.length}</Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="optout-email"
                    checked={filters.optOuts.includes('email')}
                    onCheckedChange={() => toggleOptOut('email')}
                  />
                  <label htmlFor="optout-email" className="text-sm font-medium cursor-pointer">
                    Opted out of email
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="optout-sms"
                    checked={filters.optOuts.includes('sms')}
                    onCheckedChange={() => toggleOptOut('sms')}
                  />
                  <label htmlFor="optout-sms" className="text-sm font-medium cursor-pointer">
                    Opted out of SMS
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="optout-mail"
                    checked={filters.optOuts.includes('physicalMail')}
                    onCheckedChange={() => toggleOptOut('physicalMail')}
                  />
                  <label htmlFor="optout-mail" className="text-sm font-medium cursor-pointer">
                    Opted out of physical mail
                  </label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Ticket Purchase Behavior */}
          <AccordionItem value="ticket-behavior">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                Ticket Purchase Behavior
                {(filters.multiTicketBuyersOnly || filters.avgTicketPriceRange.min > 0 || filters.avgTicketPriceRange.max < 500) && (
                  <Badge variant="secondary" className="ml-2">1</Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                <div>
                  <Label className="text-sm mb-2 block">
                    Avg Ticket Price: ${filters.avgTicketPriceRange.min} - ${filters.avgTicketPriceRange.max}
                  </Label>
                  <Slider
                    min={0}
                    max={500}
                    step={10}
                    value={[filters.avgTicketPriceRange.min, filters.avgTicketPriceRange.max]}
                    onValueChange={([min, max]) => onFiltersChange({ ...filters, avgTicketPriceRange: { min, max } })}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label className="text-sm mb-2 block">
                    Total Tickets Purchased: {filters.totalTicketsRange.min} - {filters.totalTicketsRange.max}
                  </Label>
                  <Slider
                    min={0}
                    max={20}
                    step={1}
                    value={[filters.totalTicketsRange.min, filters.totalTicketsRange.max]}
                    onValueChange={([min, max]) => onFiltersChange({ ...filters, totalTicketsRange: { min, max } })}
                    className="mt-2"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="multi-ticket"
                    checked={filters.multiTicketBuyersOnly}
                    onCheckedChange={(checked) => onFiltersChange({ ...filters, multiTicketBuyersOnly: !!checked })}
                  />
                  <label htmlFor="multi-ticket" className="text-sm font-medium cursor-pointer">
                    Multi-ticket buyers only (2+ tickets)
                  </label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Purchase Frequency */}
          <AccordionItem value="frequency">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                Purchase Frequency
                {filters.purchaseFrequency !== 'all' && (
                  <Badge variant="secondary" className="ml-2">1</Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2">
                <RadioGroup
                  value={filters.purchaseFrequency}
                  onValueChange={(value: any) => onFiltersChange({ ...filters, purchaseFrequency: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="freq-all" />
                    <Label htmlFor="freq-all" className="font-normal cursor-pointer">All</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="monthly" id="freq-monthly" />
                    <Label htmlFor="freq-monthly" className="font-normal cursor-pointer">Monthly attenders</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="quarterly" id="freq-quarterly" />
                    <Label htmlFor="freq-quarterly" className="font-normal cursor-pointer">Quarterly attenders</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="annually" id="freq-annually" />
                    <Label htmlFor="freq-annually" className="font-normal cursor-pointer">Annual attenders</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="rarely" id="freq-rarely" />
                    <Label htmlFor="freq-rarely" className="font-normal cursor-pointer">Rarely (&lt;1/year)</Label>
                  </div>
                </RadioGroup>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Birthday Targeting */}
          <AccordionItem value="birthday">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                Birthday Targeting
                {filters.birthdayMonths.length > 0 && (
                  <Badge variant="secondary" className="ml-2">{filters.birthdayMonths.length}</Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-2">
                <p className="text-xs text-muted-foreground mb-2">Select birthday months for targeted campaigns</p>
                <div className="grid grid-cols-3 gap-2">
                  {monthNames.map((month, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <Checkbox
                        id={`month-${idx}`}
                        checked={filters.birthdayMonths.includes(idx + 1)}
                        onCheckedChange={() => toggleBirthdayMonth(idx + 1)}
                      />
                      <label htmlFor={`month-${idx}`} className="text-xs font-medium cursor-pointer">
                        {month}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Engagement Recency */}
          <AccordionItem value="recency">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                Engagement Recency
                {filters.daysSinceLastEvent && (
                  <Badge variant="secondary" className="ml-2">1</Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-2">
                <div>
                  <Label className="text-sm mb-2 block">
                    Days Since Last Event: {filters.daysSinceLastEvent || 365}
                  </Label>
                  <Slider
                    min={0}
                    max={365}
                    step={5}
                    value={[filters.daysSinceLastEvent || 365]}
                    onValueChange={([value]) => onFiltersChange({ ...filters, daysSinceLastEvent: value })}
                    className="mt-2"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => onFiltersChange({ ...filters, daysSinceLastEvent: 30 })}
                  >
                    Active (0-30)
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => onFiltersChange({ ...filters, daysSinceLastEvent: 90 })}
                  >
                    Recent (31-90)
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => onFiltersChange({ ...filters, daysSinceLastEvent: 180 })}
                  >
                    At Risk (91-180)
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => onFiltersChange({ ...filters, daysSinceLastEvent: 365 })}
                  >
                    Inactive (180+)
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Lifetime Value */}
          <AccordionItem value="ltv">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                Lifetime Value
                {(filters.lifetimeValueRange.min > 0 || filters.lifetimeValueRange.max < 10000) && (
                  <Badge variant="secondary" className="ml-2">1</Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-2">
                <div>
                  <Label className="text-sm mb-2 block">
                    LTV Range: ${filters.lifetimeValueRange.min} - ${filters.lifetimeValueRange.max}
                  </Label>
                  <Slider
                    min={0}
                    max={10000}
                    step={100}
                    value={[filters.lifetimeValueRange.min, filters.lifetimeValueRange.max]}
                    onValueChange={([min, max]) => onFiltersChange({ ...filters, lifetimeValueRange: { min, max } })}
                    className="mt-2"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2 mt-3">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => onFiltersChange({ ...filters, lifetimeValueRange: { min: 5000, max: 10000 } })}
                  >
                    High ($5K+)
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => onFiltersChange({ ...filters, lifetimeValueRange: { min: 1000, max: 4999 } })}
                  >
                    Medium
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => onFiltersChange({ ...filters, lifetimeValueRange: { min: 0, max: 999 } })}
                  >
                    Low (&lt;$1K)
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* RSVP Behavior */}
          <AccordionItem value="rsvp">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                RSVP Reliability
                {filters.rsvpReliability !== 'all' && (
                  <Badge variant="secondary" className="ml-2">1</Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2">
                <RadioGroup
                  value={filters.rsvpReliability}
                  onValueChange={(value: any) => onFiltersChange({ ...filters, rsvpReliability: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="rsvp-all" />
                    <Label htmlFor="rsvp-all" className="font-normal cursor-pointer">All</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="rsvp-high" />
                    <Label htmlFor="rsvp-high" className="font-normal cursor-pointer">Reliable (always shows up)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="rsvp-medium" />
                    <Label htmlFor="rsvp-medium" className="font-normal cursor-pointer">Moderate (sometimes no-shows)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="low" id="rsvp-low" />
                    <Label htmlFor="rsvp-low" className="font-normal cursor-pointer">Unreliable (frequent no-shows)</Label>
                  </div>
                </RadioGroup>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Plus-One Patterns */}
          <AccordionItem value="plusones">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                Plus-One Patterns
                {(filters.frequentPlusOneBringers || filters.avgPlusOnesRange.min > 0 || filters.avgPlusOnesRange.max < 5) && (
                  <Badge variant="secondary" className="ml-2">1</Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                <div>
                  <Label className="text-sm mb-2 block">
                    Avg Plus-Ones: {filters.avgPlusOnesRange.min} - {filters.avgPlusOnesRange.max}
                  </Label>
                  <Slider
                    min={0}
                    max={5}
                    step={1}
                    value={[filters.avgPlusOnesRange.min, filters.avgPlusOnesRange.max]}
                    onValueChange={([min, max]) => onFiltersChange({ ...filters, avgPlusOnesRange: { min, max } })}
                    className="mt-2"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="frequent-plusone"
                    checked={filters.frequentPlusOneBringers}
                    onCheckedChange={(checked) => onFiltersChange({ ...filters, frequentPlusOneBringers: !!checked })}
                  />
                  <label htmlFor="frequent-plusone" className="text-sm font-medium cursor-pointer">
                    Frequently brings plus-ones
                  </label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default GuestFilterPanel;
