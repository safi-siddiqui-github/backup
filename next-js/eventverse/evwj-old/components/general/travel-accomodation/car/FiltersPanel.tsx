"use client";

import { MapPin, RefreshCcw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import StyledSelect from "./StyledSelect";
import StyledDateInput from "./StyledDateInput";
import { toast } from "sonner";

type Props = {
	filteredCount: number;
};

export default function FiltersPanel({ filteredCount }: Props) {
	return (
		<Card className="!bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
			<CardContent className="p-5 sm:p-6">
				<div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
					<h3 className="text-xl font-semibold text-foreground">
						Search Rental Cars
					</h3>
					<div className="flex items-center gap-3">
						<button className="shrink-0 flex items-center space-x-2 rounded-full border px-3 py-1.5 text-xs font-medium !bg-white dark:!bg-[#020617] backdrop-blur-sm text-foreground border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700/50 cursor-pointer [background-color:white] dark:[background-color:#020617]">
							<MapPin className="h-4 w-4" />
							<span>Airport Rentals Only</span>
						</button>

						{/* search removed from filter panel per request */}
					</div>
				</div>

				<div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					<div>
						<label className="block text-sm font-medium text-foreground mb-1">
							Airport Location
						</label>
						<StyledSelect label="Airport Location" defaultValue="all">
							<option value="all">All Airports</option>
							<option value="sfo">SFO</option>
							<option value="oak">OAK</option>
						</StyledSelect>
					</div>

					<div>
						<label className="block text-sm font-medium text-foreground mb-1">
							Pickup Date
						</label>
						<StyledDateInput label="Pickup Date" value="Jul 19, 2024" />
					</div>

					<div>
						<label className="block text-sm font-medium text-foreground mb-1">
							Dropoff Date
						</label>
						<StyledDateInput label="Dropoff Date" value="Jul 23, 2024" />
					</div>

					<div>
						<label className="block text-sm font-medium text-foreground mb-1">
							Rental Company
						</label>
						<StyledSelect label="Rental Company" defaultValue="all">
							<option value="all">All Companies</option>
							<option value="enterprise">Enterprise</option>
							<option value="hertz">Hertz</option>
							<option value="avis">Avis</option>
						</StyledSelect>
					</div>

					<div>
						<label className="block text-sm font-medium text-foreground mb-1">
							Vehicle Type
						</label>
						<StyledSelect label="Vehicle Type" defaultValue="all">
							<option value="all">All Types</option>
							<option value="economy">Economy</option>
							<option value="full-size">Full-size</option>
							<option value="suv">SUV</option>
						</StyledSelect>
					</div>
				</div>

				{/* Sort + Reset */}
				<div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
					<div className="flex items-center gap-4 w-full md:w-auto">
						<div className="flex-1 md:flex-none">
							<label className="block text-sm font-medium text-foreground mb-1 md:sr-only">
								Sort By
							</label>
							<StyledSelect label="Sort By" defaultValue="price">
								<option value="price">Price</option>
								<option value="company">Company</option>
								<option value="type">Type</option>
							</StyledSelect>
						</div>

						<button
							onClick={() => toast("Filters reset to event dates")}
							className="flex items-center space-x-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 cursor-pointer pt-0 md:pt-5"
						>
							<RefreshCcw className="h-4 w-4" />
							<span>Reset to Event Dates</span>
						</button>
					</div>

					<div className=" shrink-0">
						<span className="text-sm font-medium text-foreground">
							{filteredCount} cars • 4 days
						</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
