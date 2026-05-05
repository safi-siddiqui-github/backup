"use client";

import { useState, useMemo } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import HotelCard from "./HotelCard";
import HotelFilters from "./HotelFilters";
import BookingModal from "./hotel-riding/BookingModal";

export type HotelType = {
	name: string;
	rating: number;
	distance: string;
	address: string;
	amenities: string[];
	description?: string;
	checkIn: string;
	checkOut: string;
	price: string;
	roomTypes: number;
	imageUrl: string[];
	rooms: {
		name: string;
		price: number;
		description: string;
		guests: number;
		sqft: number;
		bed: string;
		amenities: string[];
	}[];
};

const hotelData = [
	{
		name: "Grand Plaza Hotel",
		rating: 4.5,
		distance: "0.3 miles from venue",
		address: "123 Main Street, San Francisco, CA",
		amenities: [
			"Free WiFi",
			"Breakfast",
			"Parking",
			"Pool",
			"Gym",
			"Business Center",
		],
		checkIn: "Jul 19, 2024",
		checkOut: "Jul 23, 2024",
		price: "$159",
		roomTypes: 3,
		imageUrl: [
			"https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
			"https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470",
		],
		rooms: [
			{
				name: "Standard Queen Room",
				price: 159,
				description: "Comfortable room with modern amenities and city views",
				guests: 2,
				sqft: 300,
				bed: "1 Queen Bed",
				amenities: [
					"Free WiFi",
					"Mini Fridge",
					"Coffee Maker",
					"Work Desk",
					"Smart TV",
				],
			},
			{
				name: "Deluxe King Room",
				price: 189,
				description:
					"Spacious room with premium bedding and enhanced amenities",
				guests: 2,
				sqft: 350,
				bed: "1 King Bed",
				amenities: [
					"Free WiFi",
					"Mini Bar",
					"Coffee Maker",
					"Work Desk",
					"Smart TV",
					"+1 more",
				],
			},
			{
				name: "Executive Suite",
				price: 299,
				description:
					"Luxury suite with separate living area and stunning views",
				guests: 4,
				sqft: 550,
				bed: "1 King Bed + Sofa Bed",
				amenities: [
					"Free WiFi",
					"Full Kitchen",
					"Dining Area",
					"Living Room",
					"Smart TV",
					"+1 more",
				],
			},
		],
	},
	{
		name: "Hyatt Place Downtown",
		rating: 4.4,
		distance: "0.5 miles from venue",
		address: "555 Center Plaza, San Francisco, CA",
		amenities: ["Free WiFi", "Breakfast", "Parking", "Gym", "24/7 Market"],
		checkIn: "Jul 19, 2024",
		checkOut: "Jul 23, 2024",
		price: "$149",
		roomTypes: 2,
		imageUrl: [
			"https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80",
			"https://images.unsplash.com/photo-1746549844299-2867f09c9a37?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470",
			"https://images.unsplash.com/photo-1728488443956-528b79ef38a2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470",
		],
		rooms: [
			{
				name: "Standard Room",
				price: 149,
				description: "Modern room with all the essentials",
				guests: 2,
				sqft: 280,
				bed: "1 King Bed or 2 Queen Beds",
				amenities: ["Free WiFi", "Mini Fridge", "Coffee Maker", "Work Desk"],
			},
			{
				name: "High-Floor Room",
				price: 179,
				description: "Enjoy great city views from a higher floor",
				guests: 2,
				sqft: 280,
				bed: "1 King Bed",
				amenities: [
					"Free WiFi",
					"Mini Fridge",
					"Coffee Maker",
					"Work Desk",
					"Better View",
				],
			},
		],
	},
];

export default function Hotel({ guestView = false }: { guestView?: boolean }) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedHotel, setSelectedHotel] = useState<HotelType | null>(null);
	const [currentStep, setCurrentStep] = useState(1);
	const [query, setQuery] = useState("");
	const [selectedCheckIn, setSelectedCheckIn] = useState("Jul 19, 2024");
	const [selectedCheckOut, setSelectedCheckOut] = useState("Jul 23, 2024");

	const filteredHotels = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return hotelData;
		return hotelData.filter((h) => {
			if (h.name.toLowerCase().includes(q)) return true;
			if (h.address.toLowerCase().includes(q)) return true;
			if (h.amenities.join(" ").toLowerCase().includes(q)) return true;
			return false;
		});
	}, [query]);

	const handleOpenModal = (hotel: HotelType) => {
		setSelectedHotel(hotel);
		setCurrentStep(1);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedHotel(null);
	};

	const handleNextStep = () => {
		setCurrentStep((prev) => prev + 1);
	};

	const handlePrevStep = () => {
		setCurrentStep((prev) => prev - 1);
	};

	return (
		<div className="flex flex-col gap-6">
			<Card className="!bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
				<CardContent className="flex flex-col items-center justify-between gap-4 p-4 sm:flex-row sm:gap-0">
					<div className="flex items-center space-x-3">
						<div className="h-5 w-5" />
						<span className="font-semibold text-foreground">
							Event: Jul 20, 2024 - Jul 22, 2024
						</span>
					</div>
					<button
						onClick={() => toast("Showing 4 nights selected")}
						className="flex items-center space-x-2 rounded-lg border px-4 py-1.5 text-sm font-semibold !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617] text-foreground shadow-sm transition-colors hover:bg-gray-50 dark:hover:bg-slate-700/50 cursor-pointer"
					>
						<span>4 nights selected</span>
					</button>
				</CardContent>
			</Card>

			<HotelFilters
				query={query}
				setQuery={setQuery}
				checkIn={selectedCheckIn}
				checkOut={selectedCheckOut}
				onDateChange={(ci, co) => {
					if (ci) setSelectedCheckIn(ci);
					if (co) setSelectedCheckOut(co);
					toast("Dates updated");
				}}
			/>

			<div className="flex items-center gap-3">
				<label htmlFor="hotel-search" className="sr-only">
					Search hotels
				</label>
				<div className="flex flex-1 items-center rounded-lg border pl-2 !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
					<svg
						className="h-4 w-4 text-muted-foreground"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M21 21l-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"
						/>
					</svg>
					<input
						id="hotel-search"
						type="text"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Search hotels, address or amenities"
						className="flex-1 px-2 py-2 outline-none bg-transparent text-foreground placeholder:text-muted-foreground"
					/>
					{query && (
						<button
							onClick={() => setQuery("")}
							aria-label="Clear search"
							className="px-2 text-muted-foreground hover:text-foreground"
						>
							✕
						</button>
					)}
				</div>
			</div>

			<div className="flex flex-col gap-6">
				{filteredHotels.length === 0 && (
					<p className="text-sm text-muted-foreground">
						No hotels match your search.
					</p>
				)}
				{filteredHotels.map((hotel) => (
					<HotelCard
						key={hotel.name}
						hotel={hotel}
						onBook={() => handleOpenModal(hotel)}
						guestView={guestView}
					/>
				))}
			</div>

			<Pagination className="mt-4">
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious href="#" />
					</PaginationItem>
					<PaginationItem>
						<PaginationLink href="#">1</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
					<PaginationItem>
						<PaginationNext href="#" />
					</PaginationItem>
				</PaginationContent>
			</Pagination>

			{isModalOpen && selectedHotel && (
				<BookingModal
					hotel={selectedHotel}
					currentStep={currentStep}
					onClose={handleCloseModal}
					onNext={handleNextStep}
					onBack={handlePrevStep}
				/>
			)}
		</div>
	);
}
