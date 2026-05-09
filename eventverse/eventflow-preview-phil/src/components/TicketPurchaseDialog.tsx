import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Users, Ticket, CreditCard, Plus, Minus, Check, Tag, Gift } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface TicketPurchaseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  event: {
    id: string;
    eventName: string;
    startDate: Date;
    time: string;
    locations: Array<{ name: string; address: string }>;
    ticketPrice: number;
    currency: string;
    maxCapacity: number;
    attendeeCount: number;
    allowsPlusOne?: boolean;
    plusOnePrice?: number;
    image: string;
  };
}

const TicketPurchaseDialog = ({ isOpen, onClose, event }: TicketPurchaseDialogProps) => {
  const [quantity, setQuantity] = useState(1);
  const [hasPlusOne, setHasPlusOne] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{code: string, discount: number, type: 'percentage' | 'fixed'} | null>(null);
  const [appliedReferral, setAppliedReferral] = useState<{code: string, bonus: number} | null>(null);
  const [guestInfo, setGuestInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [plusOneInfo, setPlusOneInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [step, setStep] = useState<"details" | "payment" | "confirmation">("details");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  // Mock promo codes
  const promoCodes = {
    "SAVE10": { discount: 10, type: 'percentage' as const },
    "EARLYBIRD": { discount: 15, type: 'percentage' as const },
    "WELCOME20": { discount: 20, type: 'fixed' as const },
    "STUDENT": { discount: 25, type: 'percentage' as const },
  };

  // Mock referral codes
  const referralCodes = {
    "FRIEND2025": { bonus: 5 },
    "SHAREMORE": { bonus: 10 },
    "INVITE10": { bonus: 15 },
  };

  const isFree = event.ticketPrice === 0;
  const spotsLeft = event.maxCapacity - event.attendeeCount;
  const totalTickets = quantity + (hasPlusOne ? 1 : 0);
  const plusOnePrice = event.plusOnePrice || event.ticketPrice;
  
  // Price calculations with discounts
  const subtotal = (quantity * event.ticketPrice) + (hasPlusOne ? plusOnePrice : 0);
  const serviceFee = isFree ? 0 : Math.max(2, subtotal * 0.05); // 5% service fee, minimum $2
  
  let promoDiscount = 0;
  if (appliedPromo) {
    if (appliedPromo.type === 'percentage') {
      promoDiscount = subtotal * (appliedPromo.discount / 100);
    } else {
      promoDiscount = Math.min(appliedPromo.discount, subtotal);
    }
  }
  
  const referralBonus = appliedReferral ? appliedReferral.bonus : 0;
  const totalPrice = Math.max(0, subtotal + serviceFee - promoDiscount - referralBonus);

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, Math.min(spotsLeft, quantity + change));
    setQuantity(newQuantity);
  };

  const handleApplyPromo = () => {
    const upperPromo = promoCode.toUpperCase();
    if (promoCodes[upperPromo]) {
      setAppliedPromo({
        code: upperPromo,
        discount: promoCodes[upperPromo].discount,
        type: promoCodes[upperPromo].type
      });
      toast({
        title: "Promo code applied!",
        description: `${upperPromo} - ${promoCodes[upperPromo].type === 'percentage' ? promoCodes[upperPromo].discount + '%' : '$' + promoCodes[upperPromo].discount} off`,
      });
    } else {
      toast({
        title: "Invalid promo code",
        description: "Please check your promo code and try again.",
        variant: "destructive",
      });
    }
  };

  const handleApplyReferral = () => {
    const upperReferral = referralCode.toUpperCase();
    if (referralCodes[upperReferral]) {
      setAppliedReferral({
        code: upperReferral,
        bonus: referralCodes[upperReferral].bonus
      });
      toast({
        title: "Referral code applied!",
        description: `${upperReferral} - $${referralCodes[upperReferral].bonus} bonus applied`,
      });
    } else {
      toast({
        title: "Invalid referral code",
        description: "Please check your referral code and try again.",
        variant: "destructive",
      });
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCode("");
    toast({
      title: "Promo code removed",
      description: "Promo discount has been removed from your order.",
    });
  };

  const handleRemoveReferral = () => {
    setAppliedReferral(null);
    setReferralCode("");
    toast({
      title: "Referral code removed",
      description: "Referral bonus has been removed from your order.",
    });
  };

  const handleNextStep = () => {
    if (step === "details") {
      if (isFree) {
        handleConfirmPurchase();
      } else {
        setStep("payment");
      }
    } else if (step === "payment") {
      handleConfirmPurchase();
    }
  };

  const handleConfirmPurchase = () => {
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setStep("confirmation");
      console.log(isFree ? "RSVP confirmed" : "Ticket purchase completed", {
        eventId: event.id,
        quantity: totalTickets,
        subtotal,
        serviceFee,
        promoDiscount,
        referralBonus,
        totalPrice: isFree ? 0 : totalPrice,
        appliedPromo,
        appliedReferral,
        guestInfo,
        plusOneInfo: hasPlusOne ? plusOneInfo : null,
      });
    }, 2000);
  };

  const resetDialog = () => {
    setStep("details");
    setQuantity(1);
    setHasPlusOne(false);
    setPromoCode("");
    setReferralCode("");
    setAppliedPromo(null);
    setAppliedReferral(null);
    setGuestInfo({ firstName: "", lastName: "", email: "", phone: "" });
    setPlusOneInfo({ firstName: "", lastName: "", email: "" });
    onClose();
  };

  const isFormValid = guestInfo.firstName && guestInfo.lastName && guestInfo.email && 
    (!hasPlusOne || (plusOneInfo.firstName && plusOneInfo.lastName && plusOneInfo.email));

  return (
    <Dialog open={isOpen} onOpenChange={resetDialog}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {step === "details" && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Ticket className="w-5 h-5" />
                {isFree ? "Get Your Free Tickets" : "Purchase Tickets"}
              </DialogTitle>
              <DialogDescription>
                Complete your {isFree ? "RSVP" : "ticket purchase"} for {event.eventName}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Event Summary */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={event.image} 
                        alt={event.eventName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{event.eventName}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {format(event.startDate, "EEE, MMM d")}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {event.time}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                        <MapPin className="w-4 h-4" />
                        {event.locations[0].name}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ticket Selection */}
              <div className="space-y-4">
                <h3 className="font-semibold">Ticket Selection</h3>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">General Admission</div>
                    <div className="text-sm text-gray-600">
                      {isFree ? "Free" : `${event.currency}${event.ticketPrice} per ticket`}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-8 text-center font-medium">{quantity}</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= spotsLeft}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Plus One Option */}
                {event.allowsPlusOne && (
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-medium">Bring a +1 Guest</div>
                        <div className="text-sm text-gray-600">
                          {isFree ? "Free" : `${event.currency}${plusOnePrice} per guest`}
                        </div>
                      </div>
                      <Button
                        variant={hasPlusOne ? "default" : "outline"}
                        size="sm"
                        onClick={() => setHasPlusOne(!hasPlusOne)}
                        disabled={totalTickets >= spotsLeft}
                      >
                        {hasPlusOne ? "Remove +1" : "Add +1"}
                      </Button>
                    </div>
                  </div>
                )}

                <div className="text-sm text-gray-500">
                  {spotsLeft} spots remaining
                </div>
              </div>

              {/* Guest Information */}
              <div className="space-y-4">
                <h3 className="font-semibold">Your Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      value={guestInfo.firstName}
                      onChange={(e) => setGuestInfo({...guestInfo, firstName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      value={guestInfo.lastName}
                      onChange={(e) => setGuestInfo({...guestInfo, lastName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      value={guestInfo.email}
                      onChange={(e) => setGuestInfo({...guestInfo, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      value={guestInfo.phone}
                      onChange={(e) => setGuestInfo({...guestInfo, phone: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              {/* Plus One Information */}
              {hasPlusOne && (
                <div className="space-y-4">
                  <h3 className="font-semibold">+1 Guest Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={plusOneInfo.firstName}
                        onChange={(e) => setPlusOneInfo({...plusOneInfo, firstName: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={plusOneInfo.lastName}
                        onChange={(e) => setPlusOneInfo({...plusOneInfo, lastName: e.target.value})}
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={plusOneInfo.email}
                        onChange={(e) => setPlusOneInfo({...plusOneInfo, email: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Promo and Referral Codes */}
              {!isFree && (
                <div className="space-y-4">
                  <h3 className="font-semibold">Discounts & Bonuses</h3>
                  
                  {/* Promo Code */}
                  <div className="p-4 border rounded-lg bg-gray-50">
                    <div className="flex items-center gap-2 mb-2">
                      <Tag className="w-4 h-4 text-gray-600" />
                      <span className="font-medium text-sm">Promo Code</span>
                    </div>
                    {appliedPromo ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            {appliedPromo.code}
                          </Badge>
                          <span className="text-sm text-green-600">
                            -{appliedPromo.type === 'percentage' ? `${appliedPromo.discount}%` : `$${appliedPromo.discount}`}
                          </span>
                        </div>
                        <Button variant="ghost" size="sm" onClick={handleRemovePromo}>
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Enter promo code"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                        />
                        <Button 
                          variant="outline" 
                          onClick={handleApplyPromo}
                          disabled={!promoCode.trim()}
                        >
                          Apply
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Referral Code */}
                  <div className="p-4 border rounded-lg bg-gray-50">
                    <div className="flex items-center gap-2 mb-2">
                      <Gift className="w-4 h-4 text-gray-600" />
                      <span className="font-medium text-sm">Referral Code</span>
                    </div>
                    {appliedReferral ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                            {appliedReferral.code}
                          </Badge>
                          <span className="text-sm text-blue-600">
                            +${appliedReferral.bonus} bonus
                          </span>
                        </div>
                        <Button variant="ghost" size="sm" onClick={handleRemoveReferral}>
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Enter referral code"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                          value={referralCode}
                          onChange={(e) => setReferralCode(e.target.value)}
                        />
                        <Button 
                          variant="outline" 
                          onClick={handleApplyReferral}
                          disabled={!referralCode.trim()}
                        >
                          Apply
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Order Summary */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Order Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>{quantity} × General Admission</span>
                      <span>{isFree ? "Free" : `${event.currency}${quantity * event.ticketPrice}`}</span>
                    </div>
                    {hasPlusOne && (
                      <div className="flex justify-between">
                        <span>1 × +1 Guest</span>
                        <span>{isFree ? "Free" : `${event.currency}${plusOnePrice}`}</span>
                      </div>
                    )}
                    {!isFree && serviceFee > 0 && (
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Service Fee</span>
                        <span>{event.currency}${serviceFee.toFixed(2)}</span>
                      </div>
                    )}
                    {!isFree && appliedPromo && promoDiscount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Promo Discount ({appliedPromo.code})</span>
                        <span>-{event.currency}${promoDiscount.toFixed(2)}</span>
                      </div>
                    )}
                    {!isFree && appliedReferral && referralBonus > 0 && (
                      <div className="flex justify-between text-blue-600">
                        <span>Referral Bonus ({appliedReferral.code})</span>
                        <span>-{event.currency}${referralBonus.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="border-t pt-2 flex justify-between font-semibold">
                      <span>Total ({totalTickets} tickets)</span>
                      <span>{isFree ? "Free" : `${event.currency}${totalPrice.toFixed(2)}`}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Button variant="outline" onClick={resetDialog} className="flex-1">
                  Cancel
                </Button>
                <Button 
                  onClick={handleNextStep}
                  disabled={!isFormValid}
                  className="flex-1 bg-orange-600 hover:bg-orange-700"
                >
                  {isFree ? "Confirm RSVP" : "Continue to Payment"}
                </Button>
              </div>
            </div>
          </>
        )}

        {step === "payment" && !isFree && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Information
              </DialogTitle>
              <DialogDescription>
                Complete your payment to secure your tickets
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Order Summary */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Order Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>{quantity} × General Admission</span>
                      <span>{event.currency}${quantity * event.ticketPrice}</span>
                    </div>
                    {hasPlusOne && (
                      <div className="flex justify-between">
                        <span>1 × +1 Guest</span>
                        <span>{event.currency}${plusOnePrice}</span>
                      </div>
                    )}
                    {serviceFee > 0 && (
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Service Fee</span>
                        <span>{event.currency}${serviceFee.toFixed(2)}</span>
                      </div>
                    )}
                    {appliedPromo && promoDiscount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Promo Discount ({appliedPromo.code})</span>
                        <span>-{event.currency}${promoDiscount.toFixed(2)}</span>
                      </div>
                    )}
                    {appliedReferral && referralBonus > 0 && (
                      <div className="flex justify-between text-blue-600">
                        <span>Referral Bonus ({appliedReferral.code})</span>
                        <span>-{event.currency}${referralBonus.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>{event.currency}${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Mock Payment Form */}
              <div className="space-y-4">
                <h3 className="font-semibold">Payment Method</h3>
                <div className="p-4 border rounded-lg">
                  <div className="text-sm text-gray-600 mb-4">
                    This is a demo payment form. No actual payment will be processed.
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="4242 4242 4242 4242"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CVC
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep("details")} className="flex-1">
                  Back
                </Button>
                <Button 
                  onClick={handleNextStep}
                  disabled={isProcessing}
                  className="flex-1 bg-orange-600 hover:bg-orange-700"
                >
                  {isProcessing ? "Processing..." : `Pay ${event.currency}${totalPrice.toFixed(2)}`}
                </Button>
              </div>
            </div>
          </>
        )}

        {step === "confirmation" && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-green-600">
                <Check className="w-5 h-5" />
                {isFree ? "RSVP Confirmed!" : "Payment Successful!"}
              </DialogTitle>
              <DialogDescription>
                Your {isFree ? "RSVP has been confirmed" : "tickets have been purchased successfully"}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Event Details</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Event:</strong> {event.eventName}</div>
                    <div><strong>Date:</strong> {format(event.startDate, "EEEE, MMMM d, yyyy")}</div>
                    <div><strong>Time:</strong> {event.time}</div>
                    <div><strong>Location:</strong> {event.locations[0].name}</div>
                    <div><strong>Tickets:</strong> {totalTickets} {totalTickets === 1 ? "ticket" : "tickets"}</div>
                    {!isFree && <div><strong>Total Paid:</strong> {event.currency}${totalPrice.toFixed(2)}</div>}
                    {appliedPromo && <div><strong>Promo Applied:</strong> {appliedPromo.code}</div>}
                    {appliedReferral && <div><strong>Referral Applied:</strong> {appliedReferral.code}</div>}
                  </div>
                </CardContent>
              </Card>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">What's Next?</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Confirmation email sent to {guestInfo.email}</li>
                  <li>• QR codes for entry included in email</li>
                  <li>• Add event to your calendar</li>
                  <li>• Share with friends on social media</li>
                </ul>
              </div>

              <Button 
                onClick={resetDialog}
                className="w-full bg-orange-600 hover:bg-orange-700"
              >
                Done
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TicketPurchaseDialog;
