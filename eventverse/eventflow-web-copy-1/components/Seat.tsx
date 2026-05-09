
export interface Seat {
  id: number;
  sectionId: string;
  row: number;
  seatNumber: number;
  x: number;
  y: number;
  guest?: {
    id: number;
    name: string;
    email: string;
    group: string;
    dietary: string;
  };
  status: "available" | "assigned" | "reserved" | "blocked";
  priceTier?: "VIP" | "Premium" | "General" | "Budget";
  isAccessible?: boolean;
}

export interface SeatSection {
  id: string;
  name: string;
  rows: number;
  seatsPerRow: number;
  startX: number;
  startY: number;
  rotation?: number;
  priceTier?: "VIP" | "Premium" | "General" | "Budget";
  color?: string;
}
