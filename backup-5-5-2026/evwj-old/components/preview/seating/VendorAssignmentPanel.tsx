import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VendorInvitation, VenueObject } from "@/types/venue";
import {
	CheckCircle,
	DollarSign,
	Mail,
	MapPin,
	Search,
	Store,
	Tent,
} from "lucide-react";
import { useState } from "react";

interface VendorAssignmentPanelProps {
	eventId: string;
	arrangementId: string;
	acceptedVendors: VendorInvitation[];
	venueObjects: VenueObject[];
	onAssignVendor: (
		venueObjectId: number,
		invitation: VendorInvitation,
		boothTypeId: string,
	) => void;
	onUnassignVendor: (venueObjectId: number) => void;
}

export function VendorAssignmentPanel({
	eventId,
	arrangementId,
	acceptedVendors,
	venueObjects,
	onAssignVendor,
	onUnassignVendor,
}: VendorAssignmentPanelProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const [draggedVendor, setDraggedVendor] = useState<VendorInvitation | null>(
		null,
	);

	// Filter vendors based on assignment status
	const unassignedVendors = acceptedVendors.filter(
		(inv) => !inv.boothAssignments || inv.boothAssignments.length === 0,
	);

	const assignedVendors = acceptedVendors.filter(
		(inv) => inv.boothAssignments && inv.boothAssignments.length > 0,
	);

	const awaitingPaymentVendors = acceptedVendors.filter(
		(inv) => inv.paymentStatus !== "paid",
	);

	// Search filter
	const filteredUnassigned = unassignedVendors.filter(
		(vendor) =>
			vendor.vendorBusinessName
				?.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			vendor.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			vendor.vendorEmail.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	const handleDragStart = (e: React.DragEvent, vendor: VendorInvitation) => {
		setDraggedVendor(vendor);
		e.dataTransfer.effectAllowed = "move";
		e.dataTransfer.setData("application/json", JSON.stringify(vendor));
	};

	const handleDragEnd = () => {
		setDraggedVendor(null);
	};

	const getBoothTypeName = (boothTypeId: string, vendor: VendorInvitation) => {
		return (
			vendor.availableBooths.find((b) => b.id === boothTypeId)?.name ||
			"Unknown"
		);
	};

	const getAssignedBooth = (vendor: VendorInvitation) => {
		if (!vendor.boothAssignments || vendor.boothAssignments.length === 0)
			return null;
		const assignment = vendor.boothAssignments[0];
		const venueObject = venueObjects.find(
			(obj) => obj.id === assignment.venueObjectId,
		);
		return venueObject;
	};

	return (
		<Card className="h-full">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Store className="h-5 w-5 text-orange-600" />
					Vendor Booth Assignment
				</CardTitle>
				<CardDescription>
					Drag vendors to tent/booth objects on the canvas to assign their
					spaces
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Tabs defaultValue="ready" className="h-full">
					<TabsList className="grid w-full grid-cols-3">
						<TabsTrigger value="ready">
							Ready ({unassignedVendors.length})
						</TabsTrigger>
						<TabsTrigger value="assigned">
							Assigned ({assignedVendors.length})
						</TabsTrigger>
						<TabsTrigger value="awaiting">
							Awaiting ({awaitingPaymentVendors.length})
						</TabsTrigger>
					</TabsList>

					<TabsContent value="ready" className="space-y-4">
						<div className="relative">
							<Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
							<Input
								placeholder="Search vendors..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-9"
							/>
						</div>

						<ScrollArea className="h-[400px]">
							<div className="space-y-3">
								{filteredUnassigned.length === 0 ? (
									<div className="text-muted-foreground py-8 text-center">
										<Store className="mx-auto mb-2 h-12 w-12 opacity-40" />
										<p>No vendors ready for assignment</p>
									</div>
								) : (
									filteredUnassigned.map((vendor) => (
										<div
											key={vendor.id}
											draggable
											onDragStart={(e) => handleDragStart(e, vendor)}
											onDragEnd={handleDragEnd}
											className="cursor-grab rounded-lg border-2 border-dashed border-gray-200 p-4 transition-all hover:border-orange-400 hover:bg-orange-50 active:cursor-grabbing"
										>
											<div className="mb-2 flex items-start justify-between">
												<div className="flex-1">
													<h4 className="text-sm font-semibold">
														{vendor.vendorBusinessName || vendor.vendorName}
													</h4>
													<div className="text-muted-foreground mt-1 flex items-center gap-2 text-xs">
														<Mail className="h-3 w-3" />
														{vendor.vendorEmail}
													</div>
												</div>
												<Badge className="bg-green-100 text-green-700">
													<CheckCircle className="mr-1 h-3 w-3" />
													Paid
												</Badge>
											</div>

											<div className="space-y-1">
												{vendor.selectedBooths?.map((booth, idx) => {
													const boothType = vendor.availableBooths.find(
														(b) => b.id === booth.boothTypeId,
													);
													return (
														<div
															key={idx}
															className="flex items-center justify-between text-xs"
														>
															<div className="flex items-center gap-1">
																{boothType?.icon === "tent" ? (
																	<Tent className="h-3 w-3 text-orange-600" />
																) : (
																	<Store className="h-3 w-3 text-orange-600" />
																)}
																<span>{boothType?.name}</span>
																{booth.quantity > 1 && (
																	<span className="text-muted-foreground">
																		× {booth.quantity}
																	</span>
																)}
															</div>
															<span className="font-medium">
																${booth.subtotal}
															</span>
														</div>
													);
												})}
											</div>

											<div className="mt-2 flex items-center justify-between border-t pt-2 text-xs font-semibold">
												<span>Total Paid:</span>
												<span className="text-green-600">
													${vendor.totalAmount?.toLocaleString()}
												</span>
											</div>
										</div>
									))
								)}
							</div>
						</ScrollArea>
					</TabsContent>

					<TabsContent value="assigned" className="space-y-4">
						<ScrollArea className="h-[400px]">
							<div className="space-y-3">
								{assignedVendors.length === 0 ? (
									<div className="text-muted-foreground py-8 text-center">
										<MapPin className="mx-auto mb-2 h-12 w-12 opacity-40" />
										<p>No vendors assigned yet</p>
									</div>
								) : (
									assignedVendors.map((vendor) => {
										const booth = getAssignedBooth(vendor);
										return (
											<div
												key={vendor.id}
												className="rounded-lg border border-green-200 bg-green-50 p-4"
											>
												<div className="mb-2 flex items-start justify-between">
													<div className="flex-1">
														<h4 className="text-sm font-semibold">
															{vendor.vendorBusinessName || vendor.vendorName}
														</h4>
														<div className="text-muted-foreground mt-1 flex items-center gap-2 text-xs">
															<Mail className="h-3 w-3" />
															{vendor.vendorEmail}
														</div>
													</div>
													<Badge className="bg-green-600 text-white">
														Assigned
													</Badge>
												</div>

												{booth && (
													<div className="mt-2 flex items-center justify-between rounded border bg-white p-2">
														<div className="flex items-center gap-2">
															<MapPin className="h-4 w-4 text-orange-600" />
															<span className="text-sm font-medium">
																{booth.name}
															</span>
														</div>
														<Button
															variant="ghost"
															size="sm"
															onClick={() => onUnassignVendor(booth.id)}
															className="h-7 text-xs"
														>
															Unassign
														</Button>
													</div>
												)}

												<div className="text-muted-foreground mt-2 text-xs">
													{vendor.selectedBooths?.map((booth, idx) => {
														const boothType = vendor.availableBooths.find(
															(b) => b.id === booth.boothTypeId,
														);
														return (
															<div key={idx}>
																{boothType?.name}{" "}
																{booth.quantity > 1 && `× ${booth.quantity}`}
															</div>
														);
													})}
												</div>
											</div>
										);
									})
								)}
							</div>
						</ScrollArea>
					</TabsContent>

					<TabsContent value="awaiting" className="space-y-4">
						<ScrollArea className="h-[400px]">
							<div className="space-y-3">
								{awaitingPaymentVendors.length === 0 ? (
									<div className="text-muted-foreground py-8 text-center">
										<DollarSign className="mx-auto mb-2 h-12 w-12 opacity-40" />
										<p>All vendors have completed payment</p>
										<p className="mt-1 text-xs">
											Payment is required before booth assignment
										</p>
									</div>
								) : (
									awaitingPaymentVendors.map((vendor) => (
										<div
											key={vendor.id}
											className="rounded-lg border border-yellow-200 bg-yellow-50 p-4"
										>
											<div className="mb-2 flex items-start justify-between">
												<div className="flex-1">
													<h4 className="text-sm font-semibold">
														{vendor.vendorBusinessName || vendor.vendorName}
													</h4>
													<div className="text-muted-foreground mt-1 flex items-center gap-2 text-xs">
														<Mail className="h-3 w-3" />
														{vendor.vendorEmail}
													</div>
												</div>
												<Badge variant="secondary">Payment Pending</Badge>
											</div>
											<p className="text-muted-foreground text-xs">
												Cannot assign booth until payment is completed
											</p>
										</div>
									))
								)}
							</div>
						</ScrollArea>
					</TabsContent>
				</Tabs>
			</CardContent>
		</Card>
	);
}
