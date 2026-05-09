import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CreditCard, Lock, Shield } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { validateCardNumber, validateCVV, validateExpiry, simulatePaymentProcessing, maskCardNumber, getCardType } from "@/utils/bookingUtils";
import { formatCurrency } from "@/utils/bookingUtils";

const paymentSchema = z.object({
  cardNumber: z.string().refine(validateCardNumber, "Invalid card number"),
  cardName: z.string().min(3, "Cardholder name required"),
  expiry: z.string().refine(validateExpiry, "Invalid expiry date (MM/YY)"),
  cvv: z.string().refine(validateCVV, "Invalid CVV"),
  billingStreet: z.string().min(5, "Street address required"),
  billingCity: z.string().min(2, "City required"),
  billingState: z.string().min(2, "State required"),
  billingZip: z.string().min(5, "ZIP code required"),
  billingCountry: z.string().default("USA"),
});

type PaymentForm = z.infer<typeof paymentSchema>;

interface PaymentStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  bookingData: any;
}

const PaymentStep = ({ onNext, onBack, bookingData }: PaymentStepProps) => {
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm<PaymentForm>({
    resolver: zodResolver(paymentSchema),
  });

  const cardNumber = watch('cardNumber');

  const onSubmit = async (data: PaymentForm) => {
    setProcessing(true);
    
    try {
      const result = await simulatePaymentProcessing();
      
      if (result.success) {
        const paymentInfo = {
          lastFourDigits: data.cardNumber.slice(-4),
          paymentMethod: getCardType(data.cardNumber),
          billingAddress: {
            street: data.billingStreet,
            city: data.billingCity,
            state: data.billingState,
            zip: data.billingZip,
            country: data.billingCountry,
          }
        };
        
        onNext({ paymentInfo });
      } else {
        toast({
          title: "Payment Failed",
          description: result.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred processing your payment.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <Shield className="w-4 h-4 text-green-600" />
        <span>Your payment information is secure and encrypted</span>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <CreditCard className="w-5 h-5" />
          <h3 className="font-semibold">Payment Information</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label>Card Number</Label>
            <Input 
              {...register('cardNumber')}
              placeholder="1234 5678 9012 3456"
              maxLength={16}
              className={errors.cardNumber ? 'border-destructive' : ''}
            />
            {cardNumber && cardNumber.length >= 4 && (
              <p className="text-xs text-muted-foreground mt-1">{getCardType(cardNumber)}</p>
            )}
            {errors.cardNumber && (
              <p className="text-xs text-destructive mt-1">{errors.cardNumber.message}</p>
            )}
          </div>

          <div>
            <Label>Cardholder Name</Label>
            <Input 
              {...register('cardName')}
              placeholder="John Doe"
              className={errors.cardName ? 'border-destructive' : ''}
            />
            {errors.cardName && (
              <p className="text-xs text-destructive mt-1">{errors.cardName.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Expiry Date</Label>
              <Input 
                {...register('expiry')}
                placeholder="MM/YY"
                maxLength={5}
                className={errors.expiry ? 'border-destructive' : ''}
              />
              {errors.expiry && (
                <p className="text-xs text-destructive mt-1">{errors.expiry.message}</p>
              )}
            </div>
            <div>
              <Label>CVV</Label>
              <Input 
                {...register('cvv')}
                type="password"
                placeholder="123"
                maxLength={4}
                className={errors.cvv ? 'border-destructive' : ''}
              />
              {errors.cvv && (
                <p className="text-xs text-destructive mt-1">{errors.cvv.message}</p>
              )}
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Billing Address</h3>
        <div className="space-y-4">
          <div>
            <Label>Street Address</Label>
            <Input 
              {...register('billingStreet')}
              placeholder="123 Main Street"
              className={errors.billingStreet ? 'border-destructive' : ''}
            />
            {errors.billingStreet && (
              <p className="text-xs text-destructive mt-1">{errors.billingStreet.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>City</Label>
              <Input 
                {...register('billingCity')}
                placeholder="New York"
                className={errors.billingCity ? 'border-destructive' : ''}
              />
              {errors.billingCity && (
                <p className="text-xs text-destructive mt-1">{errors.billingCity.message}</p>
              )}
            </div>
            <div>
              <Label>State</Label>
              <Input 
                {...register('billingState')}
                placeholder="NY"
                className={errors.billingState ? 'border-destructive' : ''}
              />
              {errors.billingState && (
                <p className="text-xs text-destructive mt-1">{errors.billingState.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>ZIP Code</Label>
              <Input 
                {...register('billingZip')}
                placeholder="10001"
                className={errors.billingZip ? 'border-destructive' : ''}
              />
              {errors.billingZip && (
                <p className="text-xs text-destructive mt-1">{errors.billingZip.message}</p>
              )}
            </div>
            <div>
              <Label>Country</Label>
              <Input 
                {...register('billingCountry')}
                defaultValue="USA"
                readOnly
              />
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-muted/50">
        <div className="flex justify-between items-center">
          <span className="font-semibold">Total Amount</span>
          <span className="text-2xl font-bold text-primary">
            {formatCurrency(bookingData.pricing?.total || 0)}
          </span>
        </div>
      </Card>

      <div className="flex justify-between gap-3">
        <Button type="button" variant="outline" onClick={onBack} disabled={processing}>
          Back
        </Button>
        <Button type="submit" size="lg" className="px-8" disabled={processing}>
          <Lock className="w-4 h-4 mr-2" />
          {processing ? 'Processing...' : 'Complete Booking'}
        </Button>
      </div>
    </form>
  );
};

export default PaymentStep;
