import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { TravelBooking } from "@/types/modules";
import SelectionStep from "./steps/SelectionStep";
import PaymentStep from "./steps/PaymentStep";
import ConfirmationStep from "./steps/ConfirmationStep";
import HotelGuestInfoStep from "./steps/hotel/HotelGuestInfoStep";
import HotelRoomSelectionStep from "./steps/hotel/HotelRoomSelectionStep";
import PassengerInfoStep from "./steps/flight/PassengerInfoStep";
import SeatSelectionStep from "./steps/flight/SeatSelectionStep";
import BaggageStep from "./steps/flight/BaggageStep";
import FlightExtrasStep from "./steps/flight/FlightExtrasStep";
import DriverInfoStep from "./steps/car/DriverInfoStep";
import InsuranceStep from "./steps/car/InsuranceStep";
import CarAddonsStep from "./steps/car/CarAddonsStep";
import DateTimeStep from "./steps/activity/DateTimeStep";
import ParticipantInfoStep from "./steps/activity/ParticipantInfoStep";
import WaiverStep from "./steps/activity/WaiverStep";
import ReservationDetailsStep from "./steps/restaurant/ReservationDetailsStep";
import DiningGuestInfoStep from "./steps/restaurant/DiningGuestInfoStep";
import RideDetailsStep from "./steps/rideshare/RideDetailsStep";

export type BookingType = 'hotel' | 'flight' | 'car' | 'activity' | 'restaurant' | 'rideshare';

interface BookingDialogProps {
  open: boolean;
  onClose: () => void;
  type: BookingType;
  item: any;
  eventId: string;
  guestId: string;
  onComplete: (booking: TravelBooking) => void;
}

const BookingDialog = ({ open, onClose, type, item, eventId, guestId, onComplete }: BookingDialogProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [bookingData, setBookingData] = useState<any>({});

  const getSteps = () => {
    switch (type) {
      case 'hotel':
        return ['Selection', 'Room Selection', 'Guest Info', 'Payment', 'Confirmation'];
      case 'flight':
        return ['Selection', 'Passengers', 'Seats', 'Baggage', 'Extras', 'Payment', 'Confirmation'];
      case 'car':
        return ['Selection', 'Driver Info', 'Insurance', 'Add-ons', 'Payment', 'Confirmation'];
      case 'activity':
        return ['Selection', 'Date & Time', 'Participants', 'Waiver', 'Payment', 'Confirmation'];
      case 'restaurant':
        return ['Selection', 'Reservation', 'Guest Info', 'Payment', 'Confirmation'];
      case 'rideshare':
        return ['Details', 'Payment', 'Confirmation'];
      default:
        return [];
    }
  };

  const steps = getSteps();

  const handleNext = (data: any) => {
    setBookingData({ ...bookingData, ...data });
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleComplete = (booking: TravelBooking) => {
    onComplete(booking);
    onClose();
    setCurrentStep(0);
    setBookingData({});
  };

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      onClose();
      setCurrentStep(0);
      setBookingData({});
    }
  };

  const renderStep = () => {
    const stepName = steps[currentStep];

    // Common props
    const commonProps = {
      onNext: handleNext,
      onBack: handleBack,
      bookingData,
      item,
      eventId,
      guestId,
    };

    // Selection step (shared for most)
    if (stepName === 'Selection') {
      return <SelectionStep {...commonProps} type={type} />;
    }

    // Payment step (shared)
    if (stepName === 'Payment') {
      return <PaymentStep onNext={handleNext} onBack={handleBack} bookingData={bookingData} />;
    }

    // Confirmation step (shared)
    if (stepName === 'Confirmation') {
      return <ConfirmationStep {...commonProps} type={type} onComplete={handleComplete} />;
    }

    // Hotel-specific steps
    if (type === 'hotel') {
      if (stepName === 'Room Selection') return <HotelRoomSelectionStep {...commonProps} />;
      if (stepName === 'Guest Info') return <HotelGuestInfoStep {...commonProps} />;
    }

    // Flight-specific steps
    if (type === 'flight') {
      if (stepName === 'Passengers') return <PassengerInfoStep {...commonProps} />;
      if (stepName === 'Seats') return <SeatSelectionStep {...commonProps} />;
      if (stepName === 'Baggage') return <BaggageStep {...commonProps} />;
      if (stepName === 'Extras') return <FlightExtrasStep {...commonProps} />;
    }

    // Car-specific steps
    if (type === 'car') {
      if (stepName === 'Driver Info') return <DriverInfoStep {...commonProps} />;
      if (stepName === 'Insurance') return <InsuranceStep {...commonProps} />;
      if (stepName === 'Add-ons') return <CarAddonsStep {...commonProps} />;
    }

    // Activity-specific steps
    if (type === 'activity') {
      if (stepName === 'Date & Time') return <DateTimeStep {...commonProps} />;
      if (stepName === 'Participants') return <ParticipantInfoStep {...commonProps} />;
      if (stepName === 'Waiver') return <WaiverStep {...commonProps} />;
    }

    // Restaurant-specific steps
    if (type === 'restaurant') {
      if (stepName === 'Reservation') return <ReservationDetailsStep {...commonProps} />;
      if (stepName === 'Guest Info') return <DiningGuestInfoStep {...commonProps} />;
    }

    // Rideshare-specific
    if (type === 'rideshare' && stepName === 'Details') {
      return <RideDetailsStep {...commonProps} />;
    }

    return null;
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Progress indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center flex-1">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  index < currentStep 
                    ? 'bg-primary border-primary text-primary-foreground' 
                    : index === currentStep
                    ? 'border-primary text-primary font-bold'
                    : 'border-border text-muted-foreground'
                }`}>
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 ${
                    index < currentStep ? 'bg-primary' : 'bg-border'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step} className="flex-1 text-center">
                <p className={`text-xs ${
                  index === currentStep ? 'font-semibold' : 'text-muted-foreground'
                }`}>
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Step content */}
        {renderStep()}
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
