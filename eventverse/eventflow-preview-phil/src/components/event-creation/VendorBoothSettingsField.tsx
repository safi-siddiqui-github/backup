import { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Store, Tent, Mail, X, Star } from 'lucide-react';
import { VendorBoothSettings, BoothType } from '@/types/venue';
import { useToast } from '@/hooks/use-toast';
import { mockVendors } from '@/utils/mockVendorData';

interface VendorBoothSettingsFieldProps {
  data?: VendorBoothSettings;
  onUpdate: (data: VendorBoothSettings) => void;
}

export function VendorBoothSettingsField({ data, onUpdate }: VendorBoothSettingsFieldProps) {
  const { toast } = useToast();
  const [allowBooths, setAllowBooths] = useState(data?.allowVendorBooths || false);
  const [boothTypes, setBoothTypes] = useState<BoothType[]>(data?.boothTypes || []);
  const [maxBoothsPerVendor, setMaxBoothsPerVendor] = useState(data?.maxBoothsPerVendor || 2);
  const [additionalTerms, setAdditionalTerms] = useState(data?.additionalTerms || '');
  const [setupInstructions, setSetupInstructions] = useState(data?.setupInstructions || '');
  const [invitedVendors, setInvitedVendors] = useState<Array<{
    email: string;
    name?: string;
    businessName?: string;
  }>>(data?.invitedVendors || []);
  
  // Form fields for adding vendors
  const [vendorEmail, setVendorEmail] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [vendorBusinessName, setVendorBusinessName] = useState('');

  // Sync state changes to parent
  useEffect(() => {
    onUpdate({
      allowVendorBooths: allowBooths,
      boothTypes,
      maxBoothsPerVendor,
      paymentRequired: true,
      additionalTerms,
      setupInstructions,
      invitedVendors,
    });
  }, [allowBooths, boothTypes, maxBoothsPerVendor, additionalTerms, setupInstructions, invitedVendors]);

  const addBoothType = () => {
    const newBoothType: BoothType = {
      id: `booth_${Date.now()}`,
      name: 'New Booth Type',
      description: '',
      price: 0,
      currency: 'USD',
      dimensions: { width: 150, height: 100 },
      maxAvailable: 10,
      features: [],
      icon: 'tent',
    };
    setBoothTypes([...boothTypes, newBoothType]);
  };

  const updateBoothType = (index: number, updates: Partial<BoothType>) => {
    const updated = [...boothTypes];
    updated[index] = { ...updated[index], ...updates };
    setBoothTypes(updated);
  };

  const removeBoothType = (index: number) => {
    setBoothTypes(boothTypes.filter((_, i) => i !== index));
  };

  const addFeature = (boothIndex: number) => {
    const updated = [...boothTypes];
    if (!updated[boothIndex].features) {
      updated[boothIndex].features = [];
    }
    updated[boothIndex].features!.push('New Feature');
    setBoothTypes(updated);
  };

  const updateFeature = (boothIndex: number, featureIndex: number, value: string) => {
    const updated = [...boothTypes];
    updated[boothIndex].features![featureIndex] = value;
    setBoothTypes(updated);
  };

  const removeFeature = (boothIndex: number, featureIndex: number) => {
    const updated = [...boothTypes];
    updated[boothIndex].features = updated[boothIndex].features!.filter((_, i) => i !== featureIndex);
    setBoothTypes(updated);
  };

  const addVendor = () => {
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!vendorEmail.trim()) {
      toast({
        title: "Email required",
        description: "Please enter a vendor email address",
        variant: "destructive",
      });
      return;
    }
    if (!emailRegex.test(vendorEmail)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    // Check for duplicates
    if (invitedVendors.some(v => v.email.toLowerCase() === vendorEmail.toLowerCase())) {
      toast({
        title: "Duplicate email",
        description: "This vendor has already been invited",
        variant: "destructive",
      });
      return;
    }

    setInvitedVendors([
      ...invitedVendors,
      {
        email: vendorEmail.trim(),
        name: vendorName.trim() || undefined,
        businessName: vendorBusinessName.trim() || undefined,
      },
    ]);

    // Clear form
    setVendorEmail('');
    setVendorName('');
    setVendorBusinessName('');
    
    toast({
      title: "Vendor added",
      description: `${vendorEmail} will be invited when the event is created`,
    });
  };

  const removeVendor = (index: number) => {
    setInvitedVendors(invitedVendors.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="allow-booths">Allow Vendor Booths</Label>
          <p className="text-sm text-muted-foreground">
            Enable vendors to purchase booth spaces at your event
          </p>
        </div>
        <Switch
          id="allow-booths"
          checked={allowBooths}
          onCheckedChange={setAllowBooths}
        />
      </div>

      {allowBooths && (
        <div className="space-y-6 pt-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Booth Types</h4>
              <Button type="button" onClick={addBoothType} size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Booth Type
              </Button>
            </div>

            {boothTypes.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  <Store className="w-12 h-12 mx-auto mb-2 opacity-40" />
                  <p>No booth types defined yet. Add one to get started.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {boothTypes.map((booth, index) => (
                  <Card key={booth.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-1">
                          <Input
                            value={booth.name}
                            onChange={(e) => updateBoothType(index, { name: e.target.value })}
                            placeholder="Booth Type Name"
                            className="font-medium"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeBoothType(index)}
                          className="ml-2"
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>Description</Label>
                        <Textarea
                          value={booth.description || ''}
                          onChange={(e) => updateBoothType(index, { description: e.target.value })}
                          placeholder="Describe this booth type..."
                          rows={2}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Price</Label>
                          <Input
                            type="number"
                            value={booth.price}
                            onChange={(e) => updateBoothType(index, { price: parseFloat(e.target.value) || 0 })}
                            placeholder="0"
                          />
                        </div>
                        <div>
                          <Label>Currency</Label>
                          <Select
                            value={booth.currency}
                            onValueChange={(value) => updateBoothType(index, { currency: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="USD">USD</SelectItem>
                              <SelectItem value="EUR">EUR</SelectItem>
                              <SelectItem value="GBP">GBP</SelectItem>
                              <SelectItem value="CAD">CAD</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label>Max Available</Label>
                        <Input
                          type="number"
                          value={booth.maxAvailable}
                          onChange={(e) => updateBoothType(index, { maxAvailable: parseInt(e.target.value) || 0 })}
                          className="max-w-[200px]"
                        />
                        <p className="text-sm text-muted-foreground mt-1">
                          Number of booths available for purchase
                        </p>
                      </div>

                      <div>
                        <Label>Max People in Booth</Label>
                        <Input
                          type="number"
                          value={booth.capacity || 10}
                          onChange={(e) => updateBoothType(index, { capacity: parseInt(e.target.value) || 10 })}
                          min={1}
                          max={100}
                          className="max-w-[200px]"
                          placeholder="10"
                        />
                        <p className="text-sm text-muted-foreground mt-1">
                          Limits ticket reservations and RSVP for this booth
                        </p>
                      </div>

                      <div>
                        <Label>Icon Type</Label>
                        <div className="flex gap-4 mt-2">
                          <Button
                            type="button"
                            variant={booth.icon === 'tent' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => updateBoothType(index, { icon: 'tent' })}
                          >
                            <Tent className="w-4 h-4 mr-2" />
                            Tent
                          </Button>
                          <Button
                            type="button"
                            variant={booth.icon === 'booth' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => updateBoothType(index, { icon: 'booth' })}
                          >
                            <Store className="w-4 h-4 mr-2" />
                            Booth
                          </Button>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label>Features</Label>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => addFeature(index)}
                          >
                            <Plus className="w-3 h-3 mr-1" />
                            Add
                          </Button>
                        </div>
                        <div className="space-y-2">
                          {booth.features?.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex gap-2">
                              <Input
                                value={feature}
                                onChange={(e) => updateFeature(index, featureIndex, e.target.value)}
                                placeholder="e.g., Power outlet, WiFi"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFeature(index, featureIndex)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="max-booths">Max Booths Per Vendor</Label>
              <Input
                id="max-booths"
                type="number"
                value={maxBoothsPerVendor}
                onChange={(e) => setMaxBoothsPerVendor(parseInt(e.target.value) || 2)}
                min={1}
                max={10}
                className="max-w-[200px]"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Maximum number of booths a vendor can purchase
              </p>
            </div>

            <div>
              <Label htmlFor="terms">Additional Terms</Label>
              <Textarea
                id="terms"
                value={additionalTerms}
                onChange={(e) => setAdditionalTerms(e.target.value)}
                placeholder="Enter any additional terms and conditions for vendors..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="instructions">Setup Instructions</Label>
              <Textarea
                id="instructions"
                value={setupInstructions}
                onChange={(e) => setSetupInstructions(e.target.value)}
                placeholder="Enter setup instructions for vendors (timing, requirements, etc.)..."
                rows={3}
              />
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium">Vendor Invitations</h4>
                <p className="text-sm text-muted-foreground">
                  Add vendors you'd like to invite to your event
                </p>
              </div>
              {invitedVendors.length > 0 && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>{invitedVendors.length} invited</span>
                </div>
              )}
            </div>

            <Card>
              <CardContent className="pt-6 space-y-4">
                {/* Recent Vendor Suggestions */}
                <div>
                  <Label>Recent Vendors</Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Click to quickly add a vendor
                  </p>
                  <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto p-1">
                    {mockVendors.slice(0, 6).map((vendor) => (
                      <Button
                        key={vendor.id}
                        type="button"
                        variant="outline"
                        className="h-auto p-3 justify-start hover:bg-accent"
                        onClick={() => {
                          setVendorEmail(vendor.email);
                          setVendorBusinessName(vendor.businessName);
                          setVendorName('');
                        }}
                      >
                        <div className="flex items-start gap-2 text-left w-full">
                          <Store className="w-4 h-4 mt-0.5 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{vendor.businessName}</p>
                            <p className="text-xs text-muted-foreground truncate">{vendor.category}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs">{vendor.rating}</span>
                            </div>
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 pt-4 border-t">
                  <div>
                    <Label htmlFor="vendor-email">Vendor Email *</Label>
                    <Input
                      id="vendor-email"
                      type="email"
                      value={vendorEmail}
                      onChange={(e) => setVendorEmail(e.target.value)}
                      placeholder="vendor@example.com"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addVendor();
                        }
                      }}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="vendor-name">Vendor Name (Optional)</Label>
                      <Input
                        id="vendor-name"
                        value={vendorName}
                        onChange={(e) => setVendorName(e.target.value)}
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <Label htmlFor="vendor-business">Business Name (Optional)</Label>
                      <Input
                        id="vendor-business"
                        value={vendorBusinessName}
                        onChange={(e) => setVendorBusinessName(e.target.value)}
                        placeholder="Delicious Food Truck"
                      />
                    </div>
                  </div>

                  <Button type="button" onClick={addVendor} className="w-full" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Vendor
                  </Button>
                </div>

                {invitedVendors.length > 0 && (
                  <div className="space-y-2 pt-4 border-t">
                    <Label>Invited Vendors ({invitedVendors.length})</Label>
                    <div className="space-y-2">
                      {invitedVendors.map((vendor, index) => (
                        <Card key={index}>
                          <CardContent className="p-3">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex items-start gap-3 flex-1 min-w-0">
                                <div className="mt-0.5">
                                  <Mail className="w-4 h-4 text-muted-foreground" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium truncate">{vendor.email}</p>
                                  {vendor.name && (
                                    <p className="text-sm text-muted-foreground truncate">
                                      {vendor.name}
                                    </p>
                                  )}
                                  {vendor.businessName && (
                                    <p className="text-sm text-muted-foreground truncate">
                                      {vendor.businessName}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeVendor(index)}
                                className="shrink-0"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
