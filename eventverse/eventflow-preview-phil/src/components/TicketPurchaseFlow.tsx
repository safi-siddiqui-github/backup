import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Minus, Plus, CreditCard, Shield, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TicketType {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  capacity: number;
  sold: number;
  available: number;
  features: string[];
  color: string;
}

interface TicketPurchaseFlowProps {
  ticketType: TicketType;
  onBack: () => void;
  onComplete: (orderData: any) => void;
}

const TicketPurchaseFlow = ({ ticketType, onBack, onComplete }: TicketPurchaseFlowProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [referralCode, setReferralCode] = useState('');
  const [appliedPromoCode, setAppliedPromoCode] = useState<any>(null);
  const [appliedReferralCode, setAppliedReferralCode] = useState<any>(null);
  const { toast } = useToast();

  const subtotal = ticketType.price * quantity;
  const fees = Math.round(subtotal * 0.03); // 3% processing fee
  const promoDiscount = appliedPromoCode ? Math.round(subtotal * (appliedPromoCode.value / 100)) : 0;
  const total = subtotal + fees - promoDiscount;

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= Math.min(ticketType.available, 10)) {
      setQuantity(newQuantity);
    }
  };

  const handlePromoCode = () => {
    // Enhanced promo code logic with database lookup simulation
    const mockPromoCodes = [
      { code: 'SAVE10', type: 'percentage', value: 10, isActive: true },
      { code: 'EARLYBIRD', type: 'percentage', value: 15, isActive: true },
      { code: 'WELCOME20', type: 'percentage', value: 20, isActive: true }
    ];

    const foundPromo = mockPromoCodes.find(p => 
      p.code.toUpperCase() === promoCode.toUpperCase() && p.isActive
    );

    if (foundPromo) {
      setAppliedPromoCode(foundPromo);
      toast({
        title: "Promo Code Applied!",
        description: `You saved ${foundPromo.value}% on your order.`,
      });
    } else {
      toast({
        title: "Invalid Promo Code",
        description: "The promo code you entered is not valid.",
        variant: "destructive"
      });
    }
  };

  const handleReferralCode = () => {
    // Referral code validation simulation
    const mockReferralCodes = [
      { code: 'SARAH123', influencer: 'Sarah Johnson', isActive: true },
      { code: 'MIKE456', influencer: 'Mike Chen', isActive: true }
    ];

    const foundReferral = mockReferralCodes.find(r => 
      r.code.toUpperCase() === referralCode.toUpperCase() && r.isActive
    );

    if (foundReferral) {
      setAppliedReferralCode(foundReferral);
      toast({
        title: "Referral Code Applied!",
        description: `Purchase attributed to ${foundReferral.influencer}.`,
      });
    } else {
      toast({
        title: "Invalid Referral Code",
        description: "The referral code you entered is not valid.",
        variant: "destructive"
      });
    }
  };

  const handleStepNext = () => {
    if (currentStep === 1) {
      if (quantity < 1) {
        toast({
          title: "Select Quantity",
          description: "Please select at least 1 ticket.",
          variant: "destructive"
        });
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!customerInfo.firstName || !customerInfo.lastName || !customerInfo.email) {
        toast({
          title: "Complete Your Information",
          description: "Please fill in all required fields.",
          variant: "destructive"
        });
        return;
      }
      setCurrentStep(3);
    }
  };

  const handlePayment = async () => {
    if (!paymentInfo.cardNumber || !paymentInfo.expiryDate || !paymentInfo.cvv || !paymentInfo.nameOnCard) {
      toast({
        title: "Complete Payment Information",
        description: "Please fill in all payment details.",
        variant: "destructive"
      });
      return;
    }

    setProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Complete the purchase with enhanced data
    onComplete({
      ticketTypeId: ticketType.id,
      customerName: `${customerInfo.firstName} ${customerInfo.lastName}`,
      customerEmail: customerInfo.email,
      ticketType: ticketType.name,
      quantity,
      totalAmount: total,
      status: 'paid',
      promoCode: appliedPromoCode?.code || null,
      referralCode: appliedReferralCode?.code || null,
      discount: promoDiscount
    });
    
    setProcessing(false);
  };

  const steps = [
    { number: 1, title: "Select Tickets", description: "Choose quantity" },
    { number: 2, title: "Your Information", description: "Contact details" },
    { number: 3, title: "Payment", description: "Complete purchase" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/10 p-2">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-white">Purchase Tickets</h1>
              <p className="text-purple-100 text-sm">{ticketType.name}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Steps */}
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  {steps.map((step, index) => (
                    <div key={step.number} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        currentStep >= step.number 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {step.number}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium">{step.title}</p>
                        <p className="text-xs text-gray-600">{step.description}</p>
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`w-12 h-0.5 mx-4 ${
                          currentStep > step.number ? 'bg-blue-500' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Step 1: Select Tickets */}
            {currentStep === 1 && (
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Select Quantity</CardTitle>
                  <CardDescription>Choose how many tickets you want to purchase</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Ticket Type Info */}
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: ticketType.color }}
                        />
                        <div>
                          <h3 className="font-medium">{ticketType.name}</h3>
                          <p className="text-sm text-gray-600">{ticketType.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold">${(ticketType.price / 100).toFixed(2)}</p>
                        <p className="text-sm text-gray-600">{ticketType.available} available</p>
                      </div>
                    </div>
                    
                    {ticketType.features.length > 0 && (
                      <div>
                        <p className="text-sm font-medium mb-2">Included:</p>
                        <div className="flex flex-wrap gap-2">
                          {ticketType.features.map((feature, index) => (
                            <Badge key={index} variant="outline">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Quantity Selector */}
                  <div className="flex items-center justify-center gap-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <div className="text-center">
                      <p className="text-2xl font-bold">{quantity}</p>
                      <p className="text-sm text-gray-600">tickets</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= Math.min(ticketType.available, 10)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  <Button onClick={handleStepNext} className="w-full">
                    Continue to Information
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Customer Information */}
            {currentStep === 2 && (
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Your Information</CardTitle>
                  <CardDescription>We'll use this to send you your tickets</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={customerInfo.firstName}
                        onChange={(e) => setCustomerInfo({...customerInfo, firstName: e.target.value})}
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={customerInfo.lastName}
                        onChange={(e) => setCustomerInfo({...customerInfo, lastName: e.target.value})}
                        placeholder="Smith"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" onClick={() => setCurrentStep(1)}>
                      Back
                    </Button>
                    <Button onClick={handleStepNext} className="flex-1">
                      Continue to Payment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Payment */}
            {currentStep === 3 && (
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Payment Information
                  </CardTitle>
                  <CardDescription>Your payment is secure and encrypted</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="nameOnCard">Name on Card *</Label>
                    <Input
                      id="nameOnCard"
                      value={paymentInfo.nameOnCard}
                      onChange={(e) => setPaymentInfo({...paymentInfo, nameOnCard: e.target.value})}
                      placeholder="John Smith"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="cardNumber">Card Number *</Label>
                    <Input
                      id="cardNumber"
                      value={paymentInfo.cardNumber}
                      onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date *</Label>
                      <Input
                        id="expiryDate"
                        value={paymentInfo.expiryDate}
                        onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV *</Label>
                      <Input
                        id="cvv"
                        value={paymentInfo.cvv}
                        onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                        placeholder="123"
                        maxLength={4}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                    <Shield className="w-5 h-5 text-green-600" />
                    <p className="text-sm text-green-800">
                      Your payment information is encrypted and secure
                    </p>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" onClick={() => setCurrentStep(2)}>
                      Back
                    </Button>
                    <Button 
                      onClick={handlePayment} 
                      className="flex-1"
                      disabled={processing}
                    >
                      {processing ? (
                        <>
                          <Clock className="w-4 h-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        `Pay $${(total / 100).toFixed(2)}`
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-white/95 backdrop-blur-sm sticky top-6">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>{ticketType.name}</span>
                  <span>${(ticketType.price / 100).toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Quantity</span>
                  <span>× {quantity}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${(subtotal / 100).toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Service fees</span>
                  <span>${(fees / 100).toFixed(2)}</span>
                </div>
                
                {appliedPromoCode && (
                  <div className="flex justify-between text-green-600">
                    <span>Promo ({appliedPromoCode.code})</span>
                    <span>-${(promoDiscount / 100).toFixed(2)}</span>
                  </div>
                )}

                {appliedReferralCode && (
                  <div className="flex justify-between text-blue-600 text-sm">
                    <span>Referred by</span>
                    <span>{appliedReferralCode.influencer}</span>
                  </div>
                )}
                
                <Separator />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${(total / 100).toFixed(2)}</span>
                </div>

                {/* Promo Code */}
                {currentStep >= 2 && (
                  <div className="space-y-2">
                    <Label htmlFor="promoCode">Promo Code</Label>
                    <div className="flex gap-2">
                      <Input
                        id="promoCode"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter promo code"
                        disabled={!!appliedPromoCode}
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handlePromoCode}
                        disabled={!promoCode || !!appliedPromoCode}
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                )}

                {/* Referral Code */}
                {currentStep >= 2 && (
                  <div className="space-y-2">
                    <Label htmlFor="referralCode">Referral Code (Optional)</Label>
                    <div className="flex gap-2">
                      <Input
                        id="referralCode"
                        value={referralCode}
                        onChange={(e) => setReferralCode(e.target.value)}
                        placeholder="Enter referral code"
                        disabled={!!appliedReferralCode}
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleReferralCode}
                        disabled={!referralCode || !!appliedReferralCode}
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                )}

                {/* Security Info */}
                <div className="text-xs text-gray-600 pt-2">
                  <p>• Tickets will be sent to your email</p>
                  <p>• Full refund available up to 24h before event</p>
                  <p>• Questions? Contact support@eventverse.com</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketPurchaseFlow;
