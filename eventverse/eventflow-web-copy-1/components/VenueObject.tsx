
import { LucideIcon } from "lucide-react";

export interface VenueObject {
  id: number;
  name: string;
  type: "stage" | "podium" | "exit" | "dancefloor";
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  color?: string;
}

export interface VenueObjectType {
  type: VenueObject["type"];
  name: string;
  icon: LucideIcon;
  defaultSize: { width: number; height: number };
  color: string;
}
