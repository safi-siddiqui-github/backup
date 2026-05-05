"use client";

import { useMemo, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Vendor } from "../vendor-mgmt-tab/VendorListView";

interface NewChatDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	vendors: Vendor[];
	onSelectVendor: (vendor: Vendor) => void;
}

export default function NewChatDialog({
	open,
	onOpenChange,
	vendors,
	onSelectVendor,
}: NewChatDialogProps) {
	const [search, setSearch] = useState("");

	const filteredVendors = useMemo(() => {
		const query = search.toLowerCase().trim();
		if (!query) return vendors;
		return vendors.filter(
			(v) =>
				v.name.toLowerCase().includes(query) ||
				v.category.toLowerCase().includes(query),
		);
	}, [search, vendors]);

	const getInitials = (name: string) =>
		name
			.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase();

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-lg !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:rgb(255_255_255/0.98)] dark:[background-color:#020617]">
				<DialogHeader>
					<DialogTitle>Start a new chat</DialogTitle>
					<DialogDescription>
						Choose a vendor from your current vendor management list to start a
						conversation.
					</DialogDescription>
				</DialogHeader>

				<div className="mt-4 space-y-4">
					<Input
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Search vendors by name or category..."
					/>

					<ScrollArea className="max-h-80 pr-2">
						<div className="space-y-2">
							{filteredVendors.length === 0 ? (
								<p className="py-6 text-center text-sm text-muted-foreground">
									No vendors match your search.
								</p>
							) : (
								filteredVendors.map((vendor) => (
									<button
										key={vendor.id}
										type="button"
										onClick={() => onSelectVendor(vendor)}
										className="flex w-full items-center gap-3 rounded-md border !bg-white dark:!bg-[#020617] px-3 py-2 text-left text-sm hover:bg-muted [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617]"
									>
										<Avatar className="h-8 w-8">
											<AvatarFallback>
												{getInitials(vendor.name || "V")}
											</AvatarFallback>
										</Avatar>
										<div className="flex min-w-0 flex-1 flex-col">
											<span className="truncate font-semibold">
												{vendor.name}
											</span>
											<span className="truncate text-xs text-muted-foreground">
												{vendor.category} • ⭐ {vendor.rating.toFixed(1)}
											</span>
										</div>
									</button>
								))
							)}
						</div>
					</ScrollArea>
				</div>
			</DialogContent>
		</Dialog>
	);
}
