"use client";

import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Country, State, City } from "country-state-city";
import { ServiceArea } from "./types";

interface ServiceAreaCardProps {
  area: ServiceArea;
  isEditMode: boolean;
  onUpdate: (id: string, field: keyof ServiceArea, value: any) => void;
  onRemove: (id: string) => void;
}

export default function ServiceAreaCard({
  area,
  isEditMode,
  onUpdate,
  onRemove,
}: ServiceAreaCardProps) {
  const countries = useMemo(() => Country.getAllCountries(), []);

  const availableStates = useMemo(() => {
    if (!area.countryCode) return [];
    return State.getStatesOfCountry(area.countryCode);
  }, [area.countryCode]);

  const availableCities = useMemo(() => {
    if (!area.countryCode || !area.stateCode) return [];
    return City.getCitiesOfState(area.countryCode, area.stateCode);
  }, [area.countryCode, area.stateCode]);

  return (
    <Card className="border-dashed">
      <CardContent className="p-4">
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          <div className="space-y-2">
            <Label>Country</Label>
            <Select
              value={area.countryCode}
              onValueChange={(value) => onUpdate(area.id, "countryCode", value)}
              disabled={!isEditMode}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {countries.map((country) => (
                  <SelectItem key={country.isoCode} value={country.isoCode}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>State</Label>
            <Select
              value={area.stateCode}
              onValueChange={(value) => onUpdate(area.id, "stateCode", value)}
              disabled={!area.countryCode || !isEditMode}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="State" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {availableStates.map((state) => (
                  <SelectItem key={state.isoCode} value={state.isoCode}>
                    {state.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>City</Label>
            <Select
              value={area.cityName}
              onValueChange={(value) => onUpdate(area.id, "cityName", value)}
              disabled={!area.stateCode || !isEditMode}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {availableCities.map((city) => (
                  <SelectItem key={city.name} value={city.name}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Service Radius (miles)</Label>
            <Input
              type="number"
              value={area.miles}
              onChange={(e) =>
                onUpdate(area.id, "miles", parseInt(e.target.value) || 0)
              }
              placeholder="miles radius of service area"
              min={0}
              disabled={!isEditMode}
            />
          </div>

          {isEditMode && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => onRemove(area.id)}
              className="text-red-600 hover:text-red-700 sm:col-span-2 lg:col-span-1"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

