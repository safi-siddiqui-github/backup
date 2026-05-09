"use client";

import { Input } from "@/components/ui/input";
import InfoBanner from "../../../common/InfoBanner";

interface AddressStepProps {
	streetAddress: string;
	city: string;
	state: string;
	zipCode: string;
	onStreetAddressChange: (address: string) => void;
	onCityChange: (city: string) => void;
	onStateChange: (state: string) => void;
	onZipCodeChange: (zip: string) => void;
}

export default function AddressStep({
	streetAddress,
	city,
	state,
	zipCode,
	onStreetAddressChange,
	onCityChange,
	onStateChange,
	onZipCodeChange,
}: AddressStepProps) {
	return (
		<div className="space-y-4">
			<InfoBanner>Configure your return address for all mailings.</InfoBanner>

			<div className="space-y-4">
				<div className="space-y-2.5">
					<label htmlFor="street-address" className="text-sm font-medium">
						Street Address
					</label>
					<Input
						id="street-address"
						type="text"
						placeholder="123 Main Street"
						value={streetAddress}
						onChange={(e) => onStreetAddressChange(e.target.value)}
					/>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-2.5">
						<label htmlFor="city" className="text-sm font-medium">
							City
						</label>
						<Input
							id="city"
							type="text"
							placeholder="New York"
							value={city}
							onChange={(e) => onCityChange(e.target.value)}
						/>
					</div>

					<div className="space-y-2.5">
						<label htmlFor="state" className="text-sm font-medium">
							State
						</label>
						<Input
							id="state"
							type="text"
							placeholder="NY"
							value={state}
							onChange={(e) => onStateChange(e.target.value)}
						/>
					</div>
				</div>

				<div className="space-y-2.5">
					<label htmlFor="zip-code" className="text-sm font-medium">
						ZIP Code
					</label>
					<Input
						id="zip-code"
						type="text"
						placeholder="10001"
						value={zipCode}
						onChange={(e) => onZipCodeChange(e.target.value)}
					/>
				</div>
			</div>
		</div>
	);
}
