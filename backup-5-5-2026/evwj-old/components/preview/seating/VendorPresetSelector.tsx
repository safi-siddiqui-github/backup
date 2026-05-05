import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useVendorPresets } from "@/hooks/useVendorPresets";
import type { VenuePreset } from "@/types/venue";
import {
	Building2,
	DollarSign,
	Eye,
	Filter,
	Search,
	Users,
} from "lucide-react";
import { useState } from "react";
import PresetPreviewCanvas from "./PresetPreviewCanvas";

interface VendorPresetSelectorProps {
	onSelectPreset: (
		preset: VenuePreset,
		usageType: "as-is" | "template" | "modified" | "hybrid",
	) => void;
	onClose: () => void;
}

const VendorPresetSelector = ({
	onSelectPreset,
	onClose,
}: VendorPresetSelectorProps) => {
	const {
		venueVendors,
		selectedVendor,
		setSelectedVendor,
		getPresetsByVendor,
		searchPresets,
		loading,
	} = useVendorPresets();
	const [searchQuery, setSearchQuery] = useState("");
	const [categoryFilter, setCategoryFilter] = useState<string>("all");
	const [selectedPreset, setSelectedPreset] = useState<VenuePreset | null>(
		null,
	);
	const [showPreview, setShowPreview] = useState(false);

	const filteredPresets = selectedVendor
		? getPresetsByVendor(selectedVendor.id)
		: searchQuery
			? searchPresets(searchQuery)
			: [];

	const finalPresets =
		categoryFilter === "all"
			? filteredPresets
			: filteredPresets.filter(
					(preset) => preset.category.id === categoryFilter,
				);

	const categories = Array.from(
		new Set(filteredPresets.map((preset) => preset.category.id)),
	)
		.map(
			(id) =>
				filteredPresets.find((preset) => preset.category.id === id)?.category,
		)
		.filter(Boolean);

	const handlePresetSelect = (
		preset: VenuePreset,
		usageType: "as-is" | "template" | "modified" | "hybrid",
	) => {
		onSelectPreset(preset, usageType);
		onClose();
	};

	const PresetCard = ({ preset }: { preset: VenuePreset }) => (
		<Card className="h-full">
			<CardHeader className="pb-3">
				<div className="flex items-start justify-between">
					<div className="flex-1">
						<CardTitle className="text-base">{preset.name}</CardTitle>
						<CardDescription className="text-sm">
							{preset.vendorBusinessName}
						</CardDescription>
					</div>
					<Badge variant="secondary">{preset.category.name}</Badge>
				</div>
			</CardHeader>
			<CardContent className="space-y-3">
				<p className="text-muted-foreground line-clamp-2 text-sm">
					{preset.description}
				</p>

				<div className="text-muted-foreground flex items-center gap-4 text-sm">
					<div className="flex items-center gap-1">
						<Users className="h-4 w-4" />
						<span>{preset.capacity} guests</span>
					</div>
					{preset.pricingInfo && (
						<div className="flex items-center gap-1">
							<DollarSign className="h-4 w-4" />
							<span>From ${preset.pricingInfo.basePrice}</span>
						</div>
					)}
				</div>

				<div className="flex flex-wrap gap-1">
					{preset.tags.slice(0, 3).map((tag) => (
						<Badge key={tag} variant="outline" className="text-xs">
							{tag}
						</Badge>
					))}
					{preset.tags.length > 3 && (
						<Badge variant="outline" className="text-xs">
							+{preset.tags.length - 3} more
						</Badge>
					)}
				</div>

				<div className="flex gap-2 pt-2">
					<Button
						size="sm"
						variant="outline"
						onClick={() => {
							setSelectedPreset(preset);
							setShowPreview(true);
						}}
						className="flex-1"
					>
						<Eye className="mr-1 h-3 w-3" />
						Preview
					</Button>
					<Dialog>
						<DialogTrigger asChild>
							<Button size="sm" className="flex-1">
								Use Preset
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>
									How would you like to use this preset?
								</DialogTitle>
								<DialogDescription>
									Choose how you want to apply "{preset.name}" to your event
									seating arrangement.
								</DialogDescription>
							</DialogHeader>
							<div className="space-y-3">
								<Button
									variant="outline"
									className="flex h-auto w-full flex-col items-start p-4 text-left"
									onClick={() => handlePresetSelect(preset, "as-is")}
								>
									<span className="font-medium">Use As-Is</span>
									<span className="text-muted-foreground text-sm">
										Import the exact layout without any modifications
									</span>
								</Button>
								<Button
									variant="outline"
									className="flex h-auto w-full flex-col items-start p-4 text-left"
									onClick={() => handlePresetSelect(preset, "template")}
								>
									<span className="font-medium">Use as Template</span>
									<span className="text-muted-foreground text-sm">
										Copy the structure and customize freely
									</span>
								</Button>
								<Button
									variant="outline"
									className="flex h-auto w-full flex-col items-start p-4 text-left"
									onClick={() => handlePresetSelect(preset, "modified")}
								>
									<span className="font-medium">Modify Layout</span>
									<span className="text-muted-foreground text-sm">
										Import and make changes while keeping vendor connection
									</span>
								</Button>
								<Button
									variant="outline"
									className="flex h-auto w-full flex-col items-start p-4 text-left"
									onClick={() => handlePresetSelect(preset, "hybrid")}
								>
									<span className="font-medium">Hybrid Approach</span>
									<span className="text-muted-foreground text-sm">
										Lock vendor elements, allow custom additions
									</span>
								</Button>
							</div>
						</DialogContent>
					</Dialog>
				</div>
			</CardContent>
		</Card>
	);

	if (loading) {
		return (
			<div className="flex h-64 items-center justify-center">
				<div className="text-center">
					<div className="border-primary mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
					<p className="text-muted-foreground text-sm">
						Loading venue presets...
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			{/* Vendor Selection */}
			{!selectedVendor && (
				<div className="space-y-4">
					<div>
						<h3 className="mb-2 text-lg font-semibold">
							Select a Venue Vendor
						</h3>
						<p className="text-muted-foreground mb-4 text-sm">
							Choose from our marketplace of verified venue vendors who offer
							pre-designed layouts.
						</p>
					</div>

					<div className="grid gap-3">
						{venueVendors.map((vendor) => (
							<Card
								key={vendor.id}
								className="hover:bg-accent/50 cursor-pointer transition-colors"
								onClick={() => setSelectedVendor(vendor)}
							>
								<CardContent className="p-4">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-3">
											<div className="bg-primary/10 rounded-lg p-2">
												<Building2 className="text-primary h-5 w-5" />
											</div>
											<div>
												<h4 className="font-medium">{vendor.name}</h4>
												<p className="text-muted-foreground text-sm">
													{vendor.location}
												</p>
											</div>
										</div>
										<div className="text-right">
											<div className="flex items-center gap-1">
												<span className="text-sm font-medium">
													{vendor.rating}
												</span>
												<span className="text-yellow-500">★</span>
											</div>
											<p className="text-muted-foreground text-xs">
												{vendor.reviewCount} reviews
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			)}

			{/* Preset Selection */}
			{selectedVendor && (
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<div>
							<h3 className="text-lg font-semibold">
								{selectedVendor.name} - Venue Presets
							</h3>
							<p className="text-muted-foreground text-sm">
								Choose from their available pre-designed layouts
							</p>
						</div>
						<Button variant="outline" onClick={() => setSelectedVendor(null)}>
							Change Vendor
						</Button>
					</div>

					{/* Search and Filters */}
					<div className="flex gap-2">
						<div className="relative flex-1">
							<Search className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
							<Input
								placeholder="Search presets..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="pl-9"
							/>
						</div>
						<Select value={categoryFilter} onValueChange={setCategoryFilter}>
							<SelectTrigger className="w-48">
								<SelectValue placeholder="Filter by category" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Categories</SelectItem>
								{categories.map((category) => (
									<SelectItem key={category!.id} value={category!.id}>
										{category!.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					{/* Presets Grid */}
					{finalPresets.length > 0 ? (
						<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
							{finalPresets.map((preset) => (
								<PresetCard key={preset.id} preset={preset} />
							))}
						</div>
					) : (
						<div className="py-8 text-center">
							<Filter className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
							<h3 className="mb-2 text-lg font-semibold">No presets found</h3>
							<p className="text-muted-foreground">
								Try adjusting your search or filter criteria
							</p>
						</div>
					)}
				</div>
			)}

			{/* Preview Dialog */}
			<Dialog open={showPreview} onOpenChange={setShowPreview}>
				<DialogContent className="max-w-4xl">
					<DialogHeader>
						<DialogTitle>{selectedPreset?.name}</DialogTitle>
						<DialogDescription>{selectedPreset?.description}</DialogDescription>
					</DialogHeader>
					{selectedPreset && (
						<div className="space-y-4">
							<PresetPreviewCanvas
								preset={selectedPreset}
								width={600}
								height={400}
							/>

							{selectedPreset.pricingInfo && (
								<Card>
									<CardHeader className="pb-3">
										<CardTitle className="text-base">
											Pricing Information
										</CardTitle>
									</CardHeader>
									<CardContent className="space-y-2">
										<div className="flex justify-between">
											<span>Base Price:</span>
											<span className="font-medium">
												${selectedPreset.pricingInfo.basePrice}
											</span>
										</div>
										{selectedPreset.pricingInfo.pricePerGuest && (
											<div className="flex justify-between">
												<span>Per Guest:</span>
												<span className="font-medium">
													${selectedPreset.pricingInfo.pricePerGuest}
												</span>
											</div>
										)}
										<div className="text-muted-foreground pt-2 text-xs">
											<p>
												Includes:{" "}
												{selectedPreset?.pricingInfo?.includes?.join(", ")}
											</p>
											<p>
												Excludes:{" "}
												{selectedPreset?.pricingInfo?.excludes?.join(", ")}
											</p>
										</div>
									</CardContent>
								</Card>
							)}
						</div>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default VendorPresetSelector;
