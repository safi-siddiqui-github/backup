
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Plus, Copy, Edit, Trash2, BarChart3, Percent, DollarSign, Gift } from "lucide-react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

interface PromoCode {
  id: string;
  code: string;
  name: string;
  description: string;
  type: 'percentage' | 'fixed' | 'bogo' | 'free';
  value: number;
  maxUses: number;
  usesRemaining: number;
  totalUses: number;
  minOrderAmount: number;
  validFrom: Date;
  validUntil: Date;
  isActive: boolean;
  createdDate: Date;
  totalRevenue: number;
  totalDiscount: number;
}

interface PromoCodeManagerProps {
  promoCodes: PromoCode[];
  onPromoCodesChange: (codes: PromoCode[]) => void;
}

const PromoCodeManager = ({ promoCodes, onPromoCodesChange }: PromoCodeManagerProps) => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingCode, setEditingCode] = useState<PromoCode | null>(null);
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      code: '',
      name: '',
      description: '',
      type: 'percentage',
      value: '',
      maxUses: '',
      minOrderAmount: '',
      validFrom: '',
      validUntil: ''
    }
  });

  const promoTypes = [
    { value: 'percentage', label: 'Percentage Discount', icon: Percent },
    { value: 'fixed', label: 'Fixed Amount', icon: DollarSign },
    { value: 'bogo', label: 'Buy One Get One', icon: Gift },
    { value: 'free', label: 'Free Ticket', icon: Gift }
  ];

  const generatePromoCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleCreatePromoCode = (data: any) => {
    const newPromoCode: PromoCode = {
      id: `PROMO${promoCodes.length + 1}`.padStart(8, '0'),
      code: data.code || generatePromoCode(),
      name: data.name,
      description: data.description,
      type: data.type,
      value: parseFloat(data.value),
      maxUses: parseInt(data.maxUses) || 999999,
      usesRemaining: parseInt(data.maxUses) || 999999,
      totalUses: 0,
      minOrderAmount: parseFloat(data.minOrderAmount) || 0,
      validFrom: new Date(data.validFrom),
      validUntil: new Date(data.validUntil),
      isActive: true,
      createdDate: new Date(),
      totalRevenue: 0,
      totalDiscount: 0
    };

    onPromoCodesChange([...promoCodes, newPromoCode]);
    setShowCreateDialog(false);
    form.reset();
    
    toast({
      title: "Promo Code Created!",
      description: `${newPromoCode.code} has been created successfully.`,
    });
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code Copied",
      description: "Promo code copied to clipboard",
    });
  };

  const handleToggleStatus = (codeId: string) => {
    const updatedCodes = promoCodes.map(code => 
      code.id === codeId ? { ...code, isActive: !code.isActive } : code
    );
    onPromoCodesChange(updatedCodes);
    
    const code = promoCodes.find(c => c.id === codeId);
    toast({
      title: code?.isActive ? "Code Deactivated" : "Code Activated",
      description: `${code?.code} has been ${code?.isActive ? 'deactivated' : 'activated'}.`,
    });
  };

  const getTypeIcon = (type: string) => {
    const typeConfig = promoTypes.find(t => t.value === type);
    return typeConfig?.icon || Percent;
  };

  const getTypeLabel = (type: string) => {
    return promoTypes.find(t => t.value === type)?.label || type;
  };

  const getDiscountDisplay = (code: PromoCode) => {
    switch (code.type) {
      case 'percentage':
        return `${code.value}% off`;
      case 'fixed':
        return `$${code.value} off`;
      case 'bogo':
        return 'Buy 1 Get 1';
      case 'free':
        return 'Free ticket';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Promo Codes</h2>
          <p className="text-purple-100">Create and manage promotional codes for your event</p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
              <Plus className="w-4 h-4 mr-2" />
              Create Promo Code
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Promo Code</DialogTitle>
              <DialogDescription>
                Set up a new promotional code for your event
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleCreatePromoCode)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Campaign Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Early Bird Special" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Promo Code (Optional)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Leave blank for auto-generation" 
                            {...field} 
                            onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Describe this promo code..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Discount Type</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {promoTypes.map(type => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="value"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Discount Value</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="e.g. 10 for 10% or $10"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="maxUses"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Maximum Uses</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Leave blank for unlimited"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="minOrderAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Minimum Order ($)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="0 for no minimum"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="validFrom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valid From</FormLabel>
                        <FormControl>
                          <Input type="datetime-local" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="validUntil"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valid Until</FormLabel>
                        <FormControl>
                          <Input type="datetime-local" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">
                    Create Promo Code
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowCreateDialog(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Promo Codes List */}
      <div className="space-y-4">
        {promoCodes.map((code) => {
          const IconComponent = getTypeIcon(code.type);
          return (
            <Card key={code.id} className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <IconComponent className="w-5 h-5" />
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {code.name}
                        <Badge className={code.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {code.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </CardTitle>
                      <CardDescription>{code.description}</CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCopyCode(code.code)}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Code
                    </Button>
                    <Button
                      size="sm"
                      variant={code.isActive ? "destructive" : "default"}
                      onClick={() => handleToggleStatus(code.id)}
                    >
                      {code.isActive ? 'Deactivate' : 'Activate'}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Promo Code</p>
                    <p className="font-mono text-lg font-bold">{code.code}</p>
                    <p className="text-sm text-gray-500">{getDiscountDisplay(code)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Usage</p>
                    <p className="font-medium">{code.totalUses} / {code.maxUses === 999999 ? '∞' : code.maxUses}</p>
                    <p className="text-sm text-gray-500">{code.usesRemaining} remaining</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Revenue Impact</p>
                    <p className="font-medium text-green-600">${code.totalRevenue.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">${code.totalDiscount.toFixed(2)} discounted</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Valid Period</p>
                    <p className="text-sm">{code.validFrom.toLocaleDateString()}</p>
                    <p className="text-sm text-gray-500">to {code.validUntil.toLocaleDateString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {promoCodes.length === 0 && (
        <Card className="bg-white/95 backdrop-blur-sm">
          <CardContent className="py-8 text-center">
            <Percent className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No promo codes yet</h3>
            <p className="text-gray-600 mb-4">
              Create promotional codes to offer discounts and drive sales.
            </p>
            <Button onClick={() => setShowCreateDialog(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create First Promo Code
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PromoCodeManager;
