"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldDescription, FieldTitle } from "@/components/ui/field";
import { Slider } from "@/components/ui/slider";
import { Coordinates } from "@/lib/geo";
import { MapPinIcon } from "lucide-react";

interface DistanceFilterComponentProps {
	radiusKm: number;
	onRadiusChange: (value: number) => void;
	anyDistance: boolean;
	onAnyDistanceChange: (value: boolean) => void;
	userLocation: Coordinates | null;
	locationPermissionDenied: boolean;
	onLocationPermissionRetry: () => void;
}

export default function DistanceFilterComponent({
	radiusKm,
	onRadiusChange,
	anyDistance,
	onAnyDistanceChange,
	userLocation,
	locationPermissionDenied,
	onLocationPermissionRetry,
}: DistanceFilterComponentProps) {
	return (
		<div className="flex flex-col gap-2">
			<Field>
				<FieldTitle className="text-lg">Distance</FieldTitle>
				<div className="mb-2 flex items-center space-x-2">
					<Checkbox
						id="any-distance"
						checked={anyDistance}
						onCheckedChange={onAnyDistanceChange}
					/>
					<label
						htmlFor="any-distance"
						className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						Any distance
					</label>
				</div>
				{!userLocation && locationPermissionDenied && (
					<Button
						variant="outline"
						size="sm"
						onClick={onLocationPermissionRetry}
						className="mb-2"
					>
						<MapPinIcon className="mr-2 h-4 w-4" />
						Enable Location
					</Button>
				)}
				{!anyDistance && (
					<>
						<FieldDescription>Within {radiusKm} km</FieldDescription>
						<Slider
							value={[radiusKm]}
							onValueChange={([value]) => onRadiusChange(value)}
							max={500}
							min={5}
							step={5}
							className="mt-2 w-full"
							aria-label="Distance Radius"
						/>
					</>
				)}
			</Field>
		</div>
	);
}
