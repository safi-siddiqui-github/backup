"use client";

import { useState } from "react";
import VendorListView from "./VendorListView";
import VendorDetailView from "./VendorDetailView";
import { Vendor } from "./VendorListView";

export default function VendorMgmtTabContent() {
	const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

	// If a vendor is selected, show detail view
	if (selectedVendor) {
		return (
			<VendorDetailView
				vendor={selectedVendor}
				onBack={() => setSelectedVendor(null)}
			/>
		);
	}

	// Otherwise show the list view
	return (
		<div className="rounded-lg border !bg-white dark:!bg-[#020617] backdrop-blur-sm p-6 [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617]">
			<div className="mb-6">
				<h2 className="text-2xl font-bold mb-2">Current Vendors</h2>
				<p className="text-muted-foreground">
					Manage your hired vendors, track project progress, and monitor
					deliverables. Stay on top of payments and milestones for each service.
				</p>
			</div>
			<VendorListView onSelectVendor={setSelectedVendor} />
		</div>
	);
}
