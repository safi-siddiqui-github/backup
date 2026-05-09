"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import {
  Calendar,
  Check,
  Clock,
  CreditCard,
  Gift,
  MapPin,
  Minus,
  Plus,
  Tag,
  Ticket,
} from "lucide-react";
import { useState } from "react";

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

type FakePromoCode = "SAVE10" | "EARLYBIRD" | "WELCOME20" | "STUDENT";
type AppliedPromo = {
  discount?: number;
  // type: string;
  code?: string;
  type?: "percentage" | "fixed";
};

type FakeReferralCode = "FRIEND2025" | "SHAREMORE" | "INVITE10";
// type AppliedPromo = {
//   discount?: number;
//   // type: string;
//   code?: string;
//   type?: "percentage" | "fixed";
// };

const TicketPurchaseDialog = ({
  isOpen,
  onClose,
  event,
}: TicketPurchaseDialogProps) => {
  const [quantity, setQuantity] = useState(1);
  const [hasPlusOne, setHasPlusOne] = useState(false);
  const [promoCode, setPromoCode] = useState<FakePromoCode | null>(null);
  const [referralCode, setReferralCode] = useState<FakeReferralCode | null>(
    null,
  );
  const [appliedPromo, setAppliedPromo] = useState<AppliedPromo | null>(null);
  const [appliedReferral, setAppliedReferral] = useState<{
    code: string;
    bonus: number;
  } | null>(null);
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
  const [step, setStep] = useState<"details" | "payment" | "confirmation">(
    "details",
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  // Mock promo codes
  const promoCodes: Record<FakePromoCode, AppliedPromo> = {
    SAVE10: { discount: 10, type: "percentage" },
    EARLYBIRD: { discount: 15, type: "percentage" },
    WELCOME20: { discount: 20, type: "fixed" },
    STUDENT: { discount: 25, type: "percentage" },
  };

  // Mock referral codes
  const referralCodes: Record<FakeReferralCode, { bonus?: number }> = {
    FRIEND2025: { bonus: 5 },
    SHAREMORE: { bonus: 10 },
    INVITE10: { bonus: 15 },
  };

  const isFree = event.ticketPrice === 0;
  const spotsLeft = event.maxCapacity - event.attendeeCount;
  const totalTickets = quantity + (hasPlusOne ? 1 : 0);
  const plusOnePrice = event.plusOnePrice || event.ticketPrice;

  // Price calculations with discounts
  const subtotal =
    quantity * event.ticketPrice + (hasPlusOne ? plusOnePrice : 0);
  const serviceFee = isFree ? 0 : Math.max(2, subtotal * 0.05); // 5% service fee, minimum $2

  let promoDiscount = 0;
  if (appliedPromo) {
    if (appliedPromo.type === "percentage") {
      promoDiscount = subtotal * ((appliedPromo?.discount ?? 0) / 100);
    } else {
      promoDiscount = Math.min(appliedPromo?.discount ?? 0, subtotal);
    }
  }

  const referralBonus = appliedReferral ? appliedReferral.bonus : 0;
  const totalPrice = Math.max(
    0,
    subtotal + serviceFee - promoDiscount - referralBonus,
  );

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, Math.min(spotsLeft, quantity + change));
    setQuantity(newQuantity);
  };

  const handleApplyPromo = () => {
    // const upperPromo: FakePromoCode = promoCode?.toUpperCase();
    const upperPromo: FakePromoCode = promoCode ?? "EARLYBIRD";

    if (upperPromo && promoCodes[upperPromo]) {
      setAppliedPromo({
        code: upperPromo,
        discount: promoCodes[upperPromo].discount ?? 0,
        type: promoCodes[upperPromo].type,
      });
      toast({
        title: "Promo code applied!",
        description: `${upperPromo} - ${promoCodes[upperPromo].type === "percentage" ? promoCodes[upperPromo].discount + "%" : "$" + promoCodes[upperPromo].discount} off`,
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
    const upperReferral: FakeReferralCode = referralCode ?? "FRIEND2025";

    if (upperReferral && referralCodes[upperReferral]) {
      setAppliedReferral({
        code: upperReferral,
        bonus: referralCodes[upperReferral].bonus ?? 0,
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
    setPromoCode(null);
    toast({
      title: "Promo code removed",
      description: "Promo discount has been removed from your order.",
    });
  };

  const handleRemoveReferral = () => {
    setAppliedReferral(null);
    setReferralCode(null);
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
    setPromoCode(null);
    setReferralCode(null);
    setAppliedPromo(null);
    setAppliedReferral(null);
    setGuestInfo({ firstName: "", lastName: "", email: "", phone: "" });
    setPlusOneInfo({ firstName: "", lastName: "", email: "" });
    onClose();
  };

  const isFormValid =
    guestInfo.firstName &&
    guestInfo.lastName &&
    guestInfo.email &&
    (!hasPlusOne ||
      (plusOneInfo.firstName && plusOneInfo.lastName && plusOneInfo.email));

  return (
    <Dialog
      open={isOpen}
      onOpenChange={resetDialog}
    >
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        {step === "details" && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Ticket className="h-5 w-5" />
                {isFree ? "Get Your Free Tickets" : "Purchase Tickets"}
              </DialogTitle>
              <DialogDescription>
                Complete your {isFree ? "RSVP" : "ticket purchase"} for{" "}
                {event.eventName}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Event Summary */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-orange-400 to-red-500">
                      <img
                        src={event.image}
                        alt={event.eventName}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {event.eventName}
                      </h3>
                      <div className="mt-1 flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {format(event.startDate, "EEE, MMM d")}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {event.time}
                        </div>
                      </div>
                      <div className="mt-1 flex items-center gap-1 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        {event.locations[0].name}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ticket Selection */}
              <div className="space-y-4">
                <h3 className="font-semibold">Ticket Selection</h3>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <div className="font-medium">General Admission</div>
                    <div className="text-sm text-gray-600">
                      {isFree
                        ? "Free"
                        : `${event.currency}${event.ticketPrice} per ticket`}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-medium">
                      {quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= spotsLeft}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Plus One Option */}
                {event.allowsPlusOne && (
                  <div className="rounded-lg border p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <div>
                        <div className="font-medium">Bring a +1 Guest</div>
                        <div className="text-sm text-gray-600">
                          {isFree
                            ? "Free"
                            : `${event.currency}${plusOnePrice} per guest`}
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
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      First Name *
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                      value={guestInfo.firstName}
                      onChange={(e) =>
                        setGuestInfo({
                          ...guestInfo,
                          firstName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                      value={guestInfo.lastName}
                      onChange={(e) =>
                        setGuestInfo({ ...guestInfo, lastName: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Email *
                    </label>
                    <input
                      type="email"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                      value={guestInfo.email}
                      onChange={(e) =>
                        setGuestInfo({ ...guestInfo, email: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      type="tel"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                      value={guestInfo.phone}
                      onChange={(e) =>
                        setGuestInfo({ ...guestInfo, phone: e.target.value })
                      }
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
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        First Name *
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        value={plusOneInfo.firstName}
                        onChange={(e) =>
                          setPlusOneInfo({
                            ...plusOneInfo,
                            firstName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        value={plusOneInfo.lastName}
                        onChange={(e) =>
                          setPlusOneInfo({
                            ...plusOneInfo,
                            lastName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Email *
                      </label>
                      <input
                        type="email"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        value={plusOneInfo.email}
                        onChange={(e) =>
                          setPlusOneInfo({
                            ...plusOneInfo,
                            email: e.target.value,
                          })
                        }
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
                  <div className="rounded-lg border bg-gray-50 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Tag className="h-4 w-4 text-gray-600" />
                      <span className="text-sm font-medium">Promo Code</span>
                    </div>
                    {appliedPromo ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="secondary"
                            className="bg-green-100 text-green-800"
                          >
                            {appliedPromo.code}
                          </Badge>
                          <span className="text-sm text-green-600">
                            -
                            {appliedPromo.type === "percentage"
                              ? `${appliedPromo.discount}%`
                              : `$${appliedPromo.discount}`}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleRemovePromo}
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Enter promo code"
                          className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                          value={promoCode ?? ""}
                          onChange={(e) =>
                            setPromoCode(e.target.value as FakePromoCode)
                          }
                        />
                        <Button
                          variant="outline"
                          onClick={handleApplyPromo}
                          disabled={!promoCode?.trim()}
                        >
                          Apply
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Referral Code */}
                  <div className="rounded-lg border bg-gray-50 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Gift className="h-4 w-4 text-gray-600" />
                      <span className="text-sm font-medium">Referral Code</span>
                    </div>
                    {appliedReferral ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="secondary"
                            className="bg-blue-100 text-blue-800"
                          >
                            {appliedReferral.code}
                          </Badge>
                          <span className="text-sm text-blue-600">
                            +${appliedReferral.bonus} bonus
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleRemoveReferral}
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Enter referral code"
                          className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                          value={referralCode ?? ""}
                          onChange={(e) =>
                            setReferralCode(e.target.value as FakeReferralCode)
                          }
                        />
                        <Button
                          variant="outline"
                          onClick={handleApplyReferral}
                          disabled={!referralCode?.trim()}
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
                  <h3 className="mb-3 font-semibold">Order Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>{quantity} × General Admission</span>
                      <span>
                        {isFree
                          ? "Free"
                          : `${event.currency}${quantity * event.ticketPrice}`}
                      </span>
                    </div>
                    {hasPlusOne && (
                      <div className="flex justify-between">
                        <span>1 × +1 Guest</span>
                        <span>
                          {isFree ? "Free" : `${event.currency}${plusOnePrice}`}
                        </span>
                      </div>
                    )}
                    {!isFree && serviceFee > 0 && (
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Service Fee</span>
                        <span>
                          {event.currency}${serviceFee.toFixed(2)}
                        </span>
                      </div>
                    )}
                    {!isFree && appliedPromo && promoDiscount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Promo Discount ({appliedPromo.code})</span>
                        <span>
                          -{event.currency}${promoDiscount.toFixed(2)}
                        </span>
                      </div>
                    )}
                    {!isFree && appliedReferral && referralBonus > 0 && (
                      <div className="flex justify-between text-blue-600">
                        <span>Referral Bonus ({appliedReferral.code})</span>
                        <span>
                          -{event.currency}${referralBonus.toFixed(2)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between border-t pt-2 font-semibold">
                      <span>Total ({totalTickets} tickets)</span>
                      <span>
                        {isFree
                          ? "Free"
                          : `${event.currency}${totalPrice.toFixed(2)}`}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={resetDialog}
                  className="flex-1"
                >
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
                <CreditCard className="h-5 w-5" />
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
                  <h3 className="mb-3 font-semibold">Order Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>{quantity} × General Admission</span>
                      <span>
                        {event.currency}${quantity * event.ticketPrice}
                      </span>
                    </div>
                    {hasPlusOne && (
                      <div className="flex justify-between">
                        <span>1 × +1 Guest</span>
                        <span>
                          {event.currency}${plusOnePrice}
                        </span>
                      </div>
                    )}
                    {serviceFee > 0 && (
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Service Fee</span>
                        <span>
                          {event.currency}${serviceFee.toFixed(2)}
                        </span>
                      </div>
                    )}
                    {appliedPromo && promoDiscount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Promo Discount ({appliedPromo.code})</span>
                        <span>
                          -{event.currency}${promoDiscount.toFixed(2)}
                        </span>
                      </div>
                    )}
                    {appliedReferral && referralBonus > 0 && (
                      <div className="flex justify-between text-blue-600">
                        <span>Referral Bonus ({appliedReferral.code})</span>
                        <span>
                          -{event.currency}${referralBonus.toFixed(2)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between border-t pt-2 text-lg font-semibold">
                      <span>Total</span>
                      <span>
                        {event.currency}${totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Mock Payment Form */}
              <div className="space-y-4">
                <h3 className="font-semibold">Payment Method</h3>
                <div className="rounded-lg border p-4">
                  <div className="mb-4 text-sm text-gray-600">
                    This is a demo payment form. No actual payment will be
                    processed.
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="4242 4242 4242 4242"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          CVC
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStep("details")}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={handleNextStep}
                  disabled={isProcessing}
                  className="flex-1 bg-orange-600 hover:bg-orange-700"
                >
                  {isProcessing
                    ? "Processing..."
                    : `Pay ${event.currency}${totalPrice.toFixed(2)}`}
                </Button>
              </div>
            </div>
          </>
        )}

        {step === "confirmation" && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-green-600">
                <Check className="h-5 w-5" />
                {isFree ? "RSVP Confirmed!" : "Payment Successful!"}
              </DialogTitle>
              <DialogDescription>
                Your{" "}
                {isFree
                  ? "RSVP has been confirmed"
                  : "tickets have been purchased successfully"}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-4">
                  <h3 className="mb-3 font-semibold">Event Details</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>Event:</strong> {event.eventName}
                    </div>
                    <div>
                      <strong>Date:</strong>{" "}
                      {format(event.startDate, "EEEE, MMMM d, yyyy")}
                    </div>
                    <div>
                      <strong>Time:</strong> {event.time}
                    </div>
                    <div>
                      <strong>Location:</strong> {event.locations[0].name}
                    </div>
                    <div>
                      <strong>Tickets:</strong> {totalTickets}{" "}
                      {totalTickets === 1 ? "ticket" : "tickets"}
                    </div>
                    {!isFree && (
                      <div>
                        <strong>Total Paid:</strong> {event.currency}$
                        {totalPrice.toFixed(2)}
                      </div>
                    )}
                    {appliedPromo && (
                      <div>
                        <strong>Promo Applied:</strong> {appliedPromo.code}
                      </div>
                    )}
                    {appliedReferral && (
                      <div>
                        <strong>Referral Applied:</strong>{" "}
                        {appliedReferral.code}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="rounded-lg bg-blue-50 p-4">
                <h4 className="mb-2 font-medium text-blue-900">
                  What&apos;s Next?
                </h4>
                <ul className="space-y-1 text-sm text-blue-800">
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
