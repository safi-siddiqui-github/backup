export type ParkingInfoData = {
  hasParkingInfo: boolean;
  parkingType?: "free" | "paid" | "valet" | "street" | "garage" | "lot";
  parkingCost?: number;
  parkingDetails?: string;
  parkingMapUrl?: string;
  validationAvailable?: boolean;
  reservationRequired?: boolean;
  alternativeOptions?: string;
};
