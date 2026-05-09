import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { MapPin, Star, Clock, Calendar, Hotel, Plane, Car, UtensilsCrossed, Navigation } from "lucide-react";
import { format } from "date-fns";
import { calculatePricing, formatCurrency } from "@/utils/bookingUtils";

interface SelectionStepProps {
  onNext: (data: any) => void;
  item: any;
  type: string;
}

const SelectionStep = ({ onNext, item, type }: SelectionStepProps) => {
  const pricing = calculatePricing(
    type === 'hotel' ? item.pricePerNight : 
    type === 'car' ? item.pricePerDay : 
    item.price || item.estimatedPrice,
    type
  );

  const getIcon = () => {
    switch (type) {
      case 'hotel': return <Hotel className="w-8 h-8" />;
      case 'flight': return <Plane className="w-8 h-8" />;
      case 'car': return <Car className="w-8 h-8" />;
      case 'restaurant': return <UtensilsCrossed className="w-8 h-8" />;
      case 'rideshare': return <Navigation className="w-8 h-8" />;
      default: return <MapPin className="w-8 h-8" />;
    }
  };

  const renderDetails = () => {
    switch (type) {
      case 'hotel':
        return (
          <>
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div>
                <p className="text-muted-foreground">Check-in</p>
                <p className="font-medium">{format(item.checkIn, 'MMM d, yyyy')}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Check-out</p>
                <p className="font-medium">{format(item.checkOut, 'MMM d, yyyy')}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Room Type</p>
                <p className="font-medium">{item.roomType}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Rating</p>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{item.rating}</span>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">Amenities</p>
              <div className="flex flex-wrap gap-2">
                {item.amenities?.map((amenity: string, i: number) => (
                  <Badge key={i} variant="secondary">{amenity}</Badge>
                ))}
              </div>
            </div>
          </>
        );
      
      case 'flight':
        return (
          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <div>
              <p className="text-muted-foreground">Airline</p>
              <p className="font-medium">{item.airline}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Flight Number</p>
              <p className="font-medium">{item.flightNumber}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Departure</p>
              <p className="font-medium">{item.departureAirportCode} - {format(item.departureTime, 'HH:mm')}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Arrival</p>
              <p className="font-medium">{item.arrivalAirportCode} - {format(item.arrivalTime, 'HH:mm')}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Duration</p>
              <p className="font-medium">{item.duration}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Stops</p>
              {item.stops === 0 ? (
                <p className="font-medium">Direct</p>
              ) : (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <p className="font-medium cursor-help underline decoration-dotted">
                        {item.stops} stop(s)
                      </p>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="text-sm">
                        <p className="font-semibold mb-1">Layover Location{item.stops > 1 ? 's' : ''}:</p>
                        {item.stopLocations ? (
                          item.stopLocations.map((stop: string, idx: number) => (
                            <p key={idx}>• {stop}</p>
                          ))
                        ) : (
                          <p>• {item.stops === 1 ? 'Connecting airport' : 'Multiple connecting airports'}</p>
                        )}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </div>
        );
      
      case 'car':
        return (
          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <div>
              <p className="text-muted-foreground">Vehicle</p>
              <p className="font-medium">{item.model || item.vehicleType}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Company</p>
              <p className="font-medium">{item.company}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Pickup</p>
              <p className="font-medium">{format(item.pickupDate, 'MMM d, yyyy')}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Dropoff</p>
              <p className="font-medium">{format(item.dropoffDate, 'MMM d, yyyy')}</p>
            </div>
          </div>
        );
      
      case 'restaurant':
        return (
          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <div>
              <p className="text-muted-foreground">Cuisine</p>
              <p className="font-medium">{item.cuisine}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Price Range</p>
              <p className="font-medium">{item.priceRange}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Rating</p>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{item.rating}</span>
              </div>
            </div>
            <div>
              <p className="text-muted-foreground">Distance</p>
              <p className="font-medium">{item.distance} miles</p>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white">
          {getIcon()}
        </div>
        <div>
          <h2 className="text-2xl font-bold">{item.name || `${item.airline} Flight`}</h2>
          <p className="text-muted-foreground">{item.address || item.from}</p>
        </div>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Booking Details</h3>
        {renderDetails()}
      </Card>

      {type !== 'hotel' && (
        <Card className="p-6 bg-muted/50">
          <h3 className="font-semibold mb-4">Pricing Breakdown</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Base Price</span>
              <span>{formatCurrency(pricing.basePrice)}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Taxes & Fees</span>
              <span>{formatCurrency(pricing.taxesAndFees)}</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-primary">{formatCurrency(pricing.total)}</span>
              </div>
            </div>
          </div>
        </Card>
      )}

      <div className="flex justify-end gap-3">
        <Button onClick={() => onNext({ pricing })} size="lg" className="px-8">
          Continue to Next Step
        </Button>
      </div>
    </div>
  );
};

export default SelectionStep;
