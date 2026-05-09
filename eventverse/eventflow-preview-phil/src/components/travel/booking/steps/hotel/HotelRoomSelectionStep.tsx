import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Minus, Plus, Users, Maximize, Bed, Check } from "lucide-react";
import { RoomType, HotelBooking } from "@/types/modules";
import { formatCurrency } from "@/utils/bookingUtils";
import { differenceInDays } from "date-fns";

interface HotelRoomSelectionStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  item: HotelBooking;
}

interface RoomSelection {
  [roomTypeId: string]: number;
}

const HotelRoomSelectionStep = ({ onNext, onBack, item }: HotelRoomSelectionStepProps) => {
  const [selectedRooms, setSelectedRooms] = useState<RoomSelection>({});
  const nights = differenceInDays(item.checkOut, item.checkIn);

  const updateRoomQuantity = (roomTypeId: string, change: number) => {
    const currentQty = selectedRooms[roomTypeId] || 0;
    const newQty = Math.max(0, currentQty + change);
    const room = item.roomTypes.find(r => r.id === roomTypeId);
    
    if (room && newQty <= room.available) {
      setSelectedRooms({
        ...selectedRooms,
        [roomTypeId]: newQty
      });
    }
  };

  const getTotalPrice = () => {
    return Object.entries(selectedRooms).reduce((total, [roomTypeId, quantity]) => {
      const room = item.roomTypes.find(r => r.id === roomTypeId);
      if (room && quantity > 0) {
        return total + (room.price * quantity * nights);
      }
      return total;
    }, 0);
  };

  const getTotalRooms = () => {
    return Object.values(selectedRooms).reduce((sum, qty) => sum + qty, 0);
  };

  const handleContinue = () => {
    const selected = Object.entries(selectedRooms)
      .filter(([_, qty]) => qty > 0)
      .map(([roomTypeId, quantity]) => {
        const room = item.roomTypes.find(r => r.id === roomTypeId)!;
        return {
          roomTypeId,
          quantity,
          roomTypeName: room.name,
          pricePerNight: room.price
        };
      });

    onNext({
      selectedRooms: selected,
      totalRooms: getTotalRooms(),
      nights
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Select Rooms</h2>
        <p className="text-muted-foreground">Choose your room types and quantities</p>
      </div>

      {/* Room Type Cards */}
      <div className="space-y-4">
        {item.roomTypes.map((room) => (
          <Card key={room.id} className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Room Image */}
              <div className="relative h-48 md:h-auto">
                <img 
                  src={room.images[0]} 
                  alt={room.name}
                  className="w-full h-full object-cover"
                />
                {room.available <= 3 && room.available > 0 && (
                  <Badge className="absolute top-2 left-2 bg-orange-500">
                    Only {room.available} left
                  </Badge>
                )}
              </div>

              {/* Room Details */}
              <div className="md:col-span-2 p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{room.description}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>Up to {room.maxOccupancy} guests</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Maximize className="w-4 h-4" />
                        <span>{room.squareFeet} sq ft</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bed className="w-4 h-4" />
                        <span>{room.bedConfiguration}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {room.features.slice(0, 5).map((feature, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          <Check className="w-3 h-3 mr-1" />
                          {feature}
                        </Badge>
                      ))}
                      {room.features.length > 5 && (
                        <Badge variant="outline" className="text-xs">
                          +{room.features.length - 5} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="text-right ml-4">
                    <p className="text-3xl font-bold text-primary">
                      {formatCurrency(room.price)}
                    </p>
                    <p className="text-sm text-muted-foreground">per night</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatCurrency(room.price * nights)} total
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Quantity Selector */}
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Available: </span>
                    <span className="font-semibold">{room.available} rooms</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => updateRoomQuantity(room.id, -1)}
                      disabled={!selectedRooms[room.id] || selectedRooms[room.id] === 0}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-8 text-center font-semibold">
                      {selectedRooms[room.id] || 0}
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => updateRoomQuantity(room.id, 1)}
                      disabled={selectedRooms[room.id] >= room.available}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Summary with Pricing Breakdown */}
      {getTotalRooms() > 0 && (() => {
        const basePrice = getTotalPrice();
        const pricing = {
          basePrice,
          taxesAndFees: basePrice * 0.22, // 14% tax + 8% service fee for hotels
          total: basePrice * 1.22
        };
        
        return (
          <Card className="p-6 bg-muted/50">
            <div className="mb-4">
              <h3 className="font-semibold text-lg mb-1">Booking Summary</h3>
              <p className="text-sm text-muted-foreground">
                {getTotalRooms()} room{getTotalRooms() > 1 ? 's' : ''} × {nights} night{nights > 1 ? 's' : ''}
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Room Total</span>
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
        );
      })()}

      {/* Navigation */}
      <div className="flex justify-between gap-3">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button 
          type="button" 
          size="lg" 
          className="px-8"
          onClick={handleContinue}
          disabled={getTotalRooms() === 0}
        >
          Continue to Guest Info
        </Button>
      </div>
    </div>
  );
};

export default HotelRoomSelectionStep;
