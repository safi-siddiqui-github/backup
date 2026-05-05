"use client";

import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
	Star,
	MapPin,
	Users,
	Clock,
	Calendar,
	Phone,
	Mail,
	Globe,
	Shield,
	Award,
} from "lucide-react";
import { MarketplaceVendor } from "./MarketplaceListView";
import { BudgetItem } from "../budget-tab/BudgetPlanningView";
import RequestProposalModal from "./RequestProposalModal";
import { cn } from "@/lib/utils";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import ImageViewerModal from "./ImageViewerModal";

interface VendorProfileModalProps {
	vendor: MarketplaceVendor | null;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	budgetItems?: BudgetItem[];
}

export default function VendorProfileModal({
	vendor,
	open,
	onOpenChange,
	budgetItems = [],
}: VendorProfileModalProps) {
	const [requestProposalOpen, setRequestProposalOpen] = useState(false);
	const [isViewerOpen, setIsViewerOpen] = useState(false);
	const [viewerImageIndex, setViewerImageIndex] = useState(0);

	if (!vendor) return null;

	const openViewer = (index: number) => {
		setViewerImageIndex(index);
		setIsViewerOpen(true);
	};

	const getPricingBadge = () => {
		switch (vendor.pricing) {
			case 1:
				return "$";
			case 2:
				return "$$";
			case 3:
				return "$$$";
			case 4:
				return "$$$$";
			default:
				return "$";
		}
	};

	// Mock additional data
	const mockData = {
		about: vendor.description,
		location: vendor.location,
		teamSize: "25",
		insuredAndBonded: true,
		contact: {
			phone: "212-555-1234",
			email: `info@${vendor.name.toLowerCase().replace(/\s+/g, "")}.com`,
			website: `www.${vendor.name.toLowerCase().replace(/\s+/g, "")}.com`,
		},
		servicesOffered: ["Venue Rental", "Event Planning", "Catering"],
		specialties: vendor.categories,
		certifications: ["Certified Event Planner", "Licensed Venue Operator"],
		awards: ["Best Venue 2022", "Event Excellence Award 2023"],
		responseTime: "Within 24 hours",
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-4xl! max-h-[90vh] overflow-y-auto p-0 !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:rgb(255_255_255/0.98)] dark:[background-color:#020617]">
				{/* Header */}
				<DialogHeader className="p-6 pb-4 space-y-0">
					<div className="flex items-start justify-between gap-4">
						<div>
							<div className="flex items-center gap-2 mb-2">
								<DialogTitle className="text-2xl">{vendor.name}</DialogTitle>
								{vendor.badges.verified && (
									<Badge className="bg-green-600 hover:bg-green-600">
										✓ Verified
									</Badge>
								)}
								<Badge className="bg-purple-600 hover:bg-purple-600">
									{getPricingBadge()} premium
								</Badge>
							</div>
						</div>
					</div>

					{/* Stats Bar */}
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
						<div className="text-center p-3 rounded-lg bg-yellow-50 dark:bg-yellow-950/20">
							<div className="flex items-center justify-center gap-1 mb-1">
								<Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
								<span className="text-xl font-bold">{vendor.rating}</span>
							</div>
							<p className="text-xs text-muted-foreground">
								{vendor.reviewCount} reviews
							</p>
						</div>

						<div className="text-center p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20">
							<div className="flex items-center justify-center gap-1 mb-1">
								<Users className="h-5 w-5 text-blue-600" />
								<span className="text-xl font-bold">{vendor.eventsCount}</span>
							</div>
							<p className="text-xs text-muted-foreground">Events completed</p>
						</div>

						<div className="text-center p-3 rounded-lg bg-green-50 dark:bg-green-950/20">
							<div className="flex items-center justify-center gap-1 mb-1">
								<Clock className="h-5 w-5 text-green-600" />
								<span className="text-sm font-bold">Within 24 hours</span>
							</div>
							<p className="text-xs text-muted-foreground">Response time</p>
						</div>

						<div className="text-center p-3 rounded-lg bg-purple-50 dark:bg-purple-950/20">
							<div className="flex items-center justify-center gap-1 mb-1">
								<Calendar className="h-5 w-5 text-purple-600" />
								<span className="text-xl font-bold">{vendor.established}</span>
							</div>
							<p className="text-xs text-muted-foreground">Established</p>
						</div>
					</div>
				</DialogHeader>

				<div className="px-6 pb-6 space-y-6">
					{/* About Section */}
					<div>
						<h3 className="text-lg font-semibold mb-3">About</h3>
						<p className="text-muted-foreground mb-3">{mockData.about}</p>
						<div className="space-y-2">
							<div className="flex items-center gap-2 text-sm">
								<MapPin className="h-4 w-4 text-muted-foreground" />
								<span>{mockData.location}</span>
							</div>
							<div className="flex items-center gap-2 text-sm">
								<Users className="h-4 w-4 text-muted-foreground" />
								<span>Team of {mockData.teamSize}</span>
							</div>
							{mockData.insuredAndBonded && (
								<div className="flex items-center gap-2 text-sm text-green-600">
									<Shield className="h-4 w-4" />
									<span>Insured & Bonded</span>
								</div>
							)}
						</div>
					</div>

					<Separator />

					{/* Portfolio Section */}
					<div>
						<h3 className="text-lg font-semibold mb-3">Portfolio</h3>
						<Carousel
							opts={{
								align: "start",
								loop: true,
							}}
							className="w-full"
						>
							<CarouselContent className="-ml-2 md:-ml-4">
								{vendor.images.map((image, index) => (
									<CarouselItem
										key={index}
										className="pl-2 md:pl-4 basis-1/2 md:basis-1/3"
									>
										<div
											className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 cursor-pointer hover:opacity-90 transition-opacity"
											onClick={() => openViewer(index)}
										>
											<img
												src={image}
												alt={`Portfolio ${index + 1}`}
												className="w-full h-full object-cover"
											/>
										</div>
									</CarouselItem>
								))}
							</CarouselContent>
							<CarouselPrevious className="left-2 md:left-4" />
							<CarouselNext className="right-2 md:right-4" />
						</Carousel>
					</div>

					<Separator />

					{/* Contact Information */}
					<div>
						<h3 className="text-lg font-semibold mb-3">Contact Information</h3>
						<div className="space-y-2">
							<div className="flex items-center gap-2 text-sm">
								<Phone className="h-4 w-4 text-muted-foreground" />
								<span>{mockData.contact.phone}</span>
							</div>
							<div className="flex items-center gap-2 text-sm">
								<Mail className="h-4 w-4 text-muted-foreground" />
								<span>{mockData.contact.email}</span>
							</div>
							<div className="flex items-center gap-2 text-sm">
								<Globe className="h-4 w-4 text-muted-foreground" />
								<a
									href={`https://${mockData.contact.website}`}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-600 hover:underline"
								>
									{mockData.contact.website}
								</a>
							</div>
						</div>
					</div>

					<Separator />

					{/* Services & Specialties */}
					<div className="grid md:grid-cols-2 gap-6">
						{/* Services Offered */}
						<div>
							<h3 className="text-lg font-semibold mb-3">Services Offered</h3>
							<div className="flex flex-wrap gap-2">
								{mockData.servicesOffered.map((service) => (
									<Badge key={service} variant="secondary">
										{service}
									</Badge>
								))}
							</div>
						</div>

						{/* Specialties */}
						<div>
							<h3 className="text-lg font-semibold mb-3">Specialties</h3>
							<div className="flex flex-wrap gap-2">
								{mockData.specialties.map((specialty) => (
									<Badge
										key={specialty}
										variant="outline"
										className="bg-blue-50 text-blue-700 dark:bg-blue-950/20"
									>
										{specialty}
									</Badge>
								))}
							</div>
						</div>
					</div>

					<Separator />

					{/* Credentials */}
					<div className="grid md:grid-cols-2 gap-6">
						{/* Certifications */}
						<div>
							<div className="flex items-center gap-2 mb-3">
								<Shield className="h-5 w-5 text-muted-foreground" />
								<h3 className="text-lg font-semibold">Certifications</h3>
							</div>
							<ul className="space-y-1 text-sm">
								{mockData.certifications.map((cert) => (
									<li key={cert} className="flex items-start gap-2">
										<span className="text-muted-foreground">•</span>
										<span>{cert}</span>
									</li>
								))}
							</ul>
						</div>

						{/* Awards & Recognition */}
						<div>
							<div className="flex items-center gap-2 mb-3">
								<Award className="h-5 w-5 text-yellow-600" />
								<h3 className="text-lg font-semibold">Awards & Recognition</h3>
							</div>
							<ul className="space-y-1 text-sm">
								{mockData.awards.map((award) => (
									<li key={award} className="flex items-start gap-2">
										<span className="text-muted-foreground">•</span>
										<span>{award}</span>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>

				{/* Footer Actions */}
				<div className="sticky bottom-0 bg-background border-t p-4 flex gap-3">
					<Button
						variant="outline"
						onClick={() => onOpenChange(false)}
						className="flex-1"
					>
						Close
					</Button>
					<Button variant="outline" className="flex-1">
						Contact Vendor
					</Button>
					<Button
						className="flex-1 bg-blue-600 hover:bg-blue-700"
						onClick={() => setRequestProposalOpen(true)}
					>
						Request Proposal
					</Button>
				</div>
			</DialogContent>

			{/* Request Proposal Modal */}
			<RequestProposalModal
				vendor={vendor}
				open={requestProposalOpen}
				onOpenChange={setRequestProposalOpen}
				budgetItems={budgetItems}
				onSuccess={() => {
					setRequestProposalOpen(false);
					onOpenChange(false);
				}}
			/>

			{/* Image Viewer Modal */}
			<ImageViewerModal
				images={vendor.images}
				title={vendor.name}
				open={isViewerOpen}
				onOpenChange={setIsViewerOpen}
				initialIndex={viewerImageIndex}
			/>
		</Dialog>
	);
}
