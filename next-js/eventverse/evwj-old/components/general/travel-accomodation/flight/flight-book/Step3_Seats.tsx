import React, { useState } from "react";
import { Users, Coffee, Shirt, DoorOpen } from "lucide-react";

type SeatType = "economy" | "plus" | "preferred" | "business" | "unavailable";

const SeatIcon = ({
	type = "economy",
	className = "",
}: {
	type?: SeatType;
	className?: string;
}) => {
	const baseClasses = `w-5 h-6 md:w-6 md:h-7 rounded`;
	switch (type) {
		case "business":
			return (
				<div
					className={`${baseClasses} bg-gray-600 dark:bg-gray-400 border border-gray-800 dark:border-gray-200 ${className}`}
				/>
			);
		case "plus":
			return (
				<div
					className={`${baseClasses} bg-blue-600 border border-blue-800 ${className}`}
				/>
			);
		case "preferred":
			return (
				<div
					className={`${baseClasses} border-2 border-gray-800 dark:border-gray-300 ${className}`}
				/>
			);
		case "unavailable":
			return (
				<div
					className={`${baseClasses} relative border border-gray-300 dark:border-gray-600 ${className}`}
				>
					<span className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500 font-bold text-lg">
						×
					</span>
				</div>
			);
		case "economy":
		default:
			return (
				<div
					className={`${baseClasses} border border-gray-500 dark:border-gray-400 ${className}`}
				/>
			);
	}
};

const LegendItem = ({
	icon,
	label,
}: {
	icon: React.ReactNode;
	label: string;
}) => (
	<div className="flex items-center space-x-2">
		{icon}
		<span className="text-xs text-foreground">{label}</span>
	</div>
);
const Seat = ({
	seatId,
	type = "economy",
	onClick,
	isSelected = false,
}: {
	seatId: string;
	type: SeatType;
	onClick: (seatId: string, seatType: SeatType) => void;
	isSelected: boolean;
}) => {
	const isUnavailable = type === "unavailable";

	const baseClasses = `relative flex items-center justify-center cursor-pointer transition-all duration-150 rounded-lg transform`;
	const selectedClasses = isSelected
		? `ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-800 bg-blue-100 dark:bg-blue-900 scale-110`
		: `hover:scale-110 hover:bg-gray-100 dark:hover:bg-gray-700`;
	const unavailableClasses = `cursor-not-allowed opacity-60`;

	const seatTypeLabel = type.charAt(0).toUpperCase() + type.slice(1);

	return (
		<div
			onClick={() => !isUnavailable && onClick(seatId, type)}
			className={`${baseClasses} ${isUnavailable ? unavailableClasses : selectedClasses}`}
			title={`Seat ${seatId} - ${seatTypeLabel}`}
			aria-label={`Seat ${seatId}, Type: ${type}`}
			role="button"
			tabIndex={isUnavailable ? -1 : 0}
		>
			<SeatIcon type={type} />
		</div>
	);
};

// --- Main Step3_Seats Component ---
export const Step3_Seats = ({
	onNext,
	onBack,
}: {
	onNext: () => void;
	onBack: () => void;
}) => {
	const [selectedSeats, setSelectedSeats] = useState<
		Array<{ id: string; type: SeatType }>
	>([]);
	const [pricePulse, setPricePulse] = useState(0); // Key to trigger animation

	const legroomCost = 35;
	// Calculate fees based on whether any selected seat is 'plus'
	const totalSeatFees =
		selectedSeats.filter((s) => s.type === "plus").length * legroomCost;

	const handleSeatClick = (seatId: string, seatType: SeatType) => {
		if (seatType === "unavailable") return;

		const isSelected = selectedSeats.some((seat) => seat.id === seatId);

		if (isSelected) {
			// Deselect
			setSelectedSeats((prev) => prev.filter((seat) => seat.id !== seatId));
		} else {
			// Select seat (can select multiple)
			setSelectedSeats((prev) => [...prev, { id: seatId, type: seatType }]);
		}
		setPricePulse((p) => p + 1); // Trigger price animation
	};
	// This function creates a row of seats (3 seats - aisle - 3 seats)
	const createSeatRow = (rowNum: number, seatTypes: (SeatType | null)[]) => (
		<div className="grid grid-cols-7 gap-1 md:gap-2 items-center">
			{/* Left side: 3 seats (A, B, C) */}
			{seatTypes.slice(0, 3).map((type: SeatType | null, index) => {
				if (type === null) return <div key={`left-gap-${rowNum}-${index}`} />;
				const seatLetter = ["A", "B", "C"][index];
				const seatId = `${rowNum}${seatLetter}`;
				return (
					<Seat
						key={seatId}
						seatId={seatId}
						type={type}
						isSelected={selectedSeats.some((seat) => seat.id === seatId)}
						onClick={handleSeatClick}
					/>
				);
			})}

			{/* Aisle */}
			<span className="text-sm font-bold text-center text-gray-700 dark:text-gray-300">
				{rowNum}
			</span>

			{/* Right side: 3 seats (D, E, F) */}
			{seatTypes.slice(3, 6).map((type: SeatType | null, index) => {
				if (type === null) return <div key={`right-gap-${rowNum}-${index}`} />;
				const seatLetter = ["D", "E", "F"][index];
				const seatId = `${rowNum}${seatLetter}`;
				return (
					<Seat
						key={seatId}
						seatId={seatId}
						type={type}
						isSelected={selectedSeats.some((seat) => seat.id === seatId)}
						onClick={handleSeatClick}
					/>
				);
			})}
		</div>
	);

	// Header for the seat columns
	const SeatColumnHeader = () => (
		<div className="grid grid-cols-7 gap-1 md:gap-2 items-center sticky top-0 !bg-white dark:!bg-slate-700/50 z-10 py-2 rounded-md [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
			{["A", "B", "C", "", "D", "E", "F"].map((l, i) => (
				<span
					key={i}
					className="text-sm font-medium text-center text-muted-foreground"
				>
					{l}
				</span>
			))}
		</div>
	);

	return (
		<>
			{/* Animation styles */}
			<style>
				{`
          @keyframes pulse-green {
            0% { color: #10B981; transform: scale(1); }
            50% { color: #34D399; transform: scale(1.15); }
            100% { color: #10B981; transform: scale(1); }
          }
          @keyframes pulse-gray {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
          .animate-pulse-green {
            animation: pulse-green 0.4s ease-out;
          }
          .animate-pulse-gray {
            animation: pulse-gray 0.4s ease-out;
          }
        `}
			</style>

			<div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6 font-inter !bg-white dark:!bg-slate-800/95 backdrop-blur-sm rounded-lg shadow-xl [background-color:white] dark:[background-color:rgb(30_41_59/0.95)]">
				{/* Header */}
				<div className="space-y-3">
					<h2 className="text-2xl font-semibold text-foreground">Seating</h2>
					<div className="p-3 !bg-white dark:!bg-slate-700/50 border-l-4 border-indigo-500 dark:border-indigo-400 rounded-r-lg flex items-start space-x-3 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
						<svg
							className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
								clipRule="evenodd"
							/>
						</svg>
						<p className="text-sm text-foreground">
							This seat map is for viewing only. Your final seat will be
							selected at a later time.
						</p>
					</div>
				</div>

				{/* Seat Map with Plane Outline */}
				<div className="relative max-h-[500px] overflow-y-auto">
					{/* Plane Outline Container */}
					<div className="relative mx-auto" style={{ maxWidth: "600px" }}>
						{/* Plane Body Outline */}
						<div className="relative border-2 border-gray-300 dark:border-slate-600 rounded-t-3xl rounded-b-lg bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-4 md:p-6">
							{/* Plane Nose (Front) */}
							<div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-12 h-6 bg-gradient-to-b from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 rounded-t-full border-2 border-gray-300 dark:border-slate-600 border-b-0"></div>

							{/* Windows on Left Side */}
							<div className="absolute left-2 top-8 space-y-3">
								{[1, 2, 3, 4, 5, 6].map((i) => (
									<div
										key={`window-left-${i}`}
										className="w-3 h-3 rounded-full bg-blue-400 dark:bg-blue-500 opacity-60 border border-blue-600 dark:border-blue-400"
									></div>
								))}
							</div>

							{/* Windows on Right Side */}
							<div className="absolute right-2 top-8 space-y-3">
								{[1, 2, 3, 4, 5, 6].map((i) => (
									<div
										key={`window-right-${i}`}
										className="w-3 h-3 rounded-full bg-blue-400 dark:bg-blue-500 opacity-60 border border-blue-600 dark:border-blue-400"
									></div>
								))}
							</div>

							{/* Plane Front Section */}
							<div className="flex justify-between items-center pb-3 mb-3 border-b-2 border-gray-300 dark:border-slate-600">
								<div className="flex items-center gap-2">
									<Users className="w-5 h-5 text-gray-500 dark:text-gray-400" />
									<span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
										Cockpit
									</span>
								</div>
								<span className="text-xs font-bold text-gray-700 dark:text-gray-300 px-3 py-1 bg-white dark:bg-slate-700 rounded-full border border-gray-300 dark:border-slate-600">
									FRONT
								</span>
								<div className="flex items-center gap-2">
									<Coffee className="w-5 h-5 text-gray-500 dark:text-gray-400" />
									<span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
										Galley
									</span>
								</div>
							</div>

							{/* Business Class Section */}
							<div className="py-3 mb-3 border-y-2 border-indigo-400 dark:border-indigo-600 bg-gradient-to-r from-indigo-50/50 to-transparent dark:from-indigo-900/20 rounded-lg">
								<div className="text-center mb-2">
									<span className="text-xs font-semibold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider">
										Business Class
									</span>
								</div>
								<div className="grid grid-cols-5 gap-1 md:gap-2 items-center max-w-xs mx-auto">
									<Seat
										seatId="1A"
										type="business"
										isSelected={selectedSeats.some((seat) => seat.id === "1A")}
										onClick={handleSeatClick}
									/>
									<span />
									<span className="text-sm font-bold text-center text-gray-700 dark:text-gray-300">
										1
									</span>
									<span />
									<Seat
										seatId="1F"
										type="business"
										isSelected={selectedSeats.some((seat) => seat.id === "1F")}
										onClick={handleSeatClick}
									/>
								</div>
							</div>

							{/* Economy Section */}
							<div className="space-y-3">
								<SeatColumnHeader />
								<div className="space-y-2">
									<div className="flex items-center space-x-2">
										<span title="Exit Row" aria-hidden="false">
											<DoorOpen
												className="w-5 h-5 text-red-600 dark:text-red-400"
												aria-hidden="true"
											/>
										</span>
										<div className="flex-1">
											{createSeatRow(10, [
												"unavailable",
												"unavailable",
												"plus",
												"unavailable",
												"plus",
												"unavailable",
											])}
										</div>
										<span title="Exit Row" aria-hidden="false">
											<DoorOpen
												className="w-5 h-5 text-red-600 dark:text-red-400"
												aria-hidden="true"
											/>
										</span>
									</div>
									{createSeatRow(11, [
										"unavailable",
										"plus",
										"plus",
										"plus",
										"preferred",
										"unavailable",
									])}
									{createSeatRow(12, [
										"economy",
										"plus",
										"plus",
										"plus",
										"economy",
										"economy",
									])}
									{createSeatRow(13, [
										"economy",
										"economy",
										"economy",
										"economy",
										"economy",
										"economy",
									])}
									<div className="py-2 my-2 border-y border-dashed border-gray-400 dark:border-slate-500">
										<div className="text-center">
											<span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
												Wing
											</span>
										</div>
									</div>
									{createSeatRow(14, [
										"unavailable",
										"unavailable",
										"unavailable",
										"unavailable",
										"unavailable",
										"unavailable",
									])}
									{createSeatRow(15, [
										"economy",
										"economy",
										"economy",
										"economy",
										"economy",
										"economy",
									])}
									{createSeatRow(16, [
										"economy",
										"economy",
										"preferred",
										"economy",
										"economy",
										"economy",
									])}
								</div>
							</div>

							{/* Plane Rear Section */}
							<div className="flex justify-between items-center pt-4 mt-4 border-t-2 border-gray-300 dark:border-slate-600">
								<div className="flex items-center gap-2">
									<Users className="w-5 h-5 text-gray-500 dark:text-gray-400" />
									<span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
										Lavatory
									</span>
								</div>
								<Shirt className="w-5 h-5 text-gray-500 dark:text-gray-400" />
								<div className="flex items-center gap-2">
									<Coffee className="w-5 h-5 text-gray-500 dark:text-gray-400" />
									<span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
										Galley
									</span>
								</div>
							</div>
						</div>

						{/* Plane Tail (Rear) */}
						<div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-gradient-to-b from-slate-300 to-slate-400 dark:from-slate-700 dark:to-slate-800 rounded-b-lg border-2 border-gray-300 dark:border-slate-600 border-t-0"></div>
					</div>
				</div>

				{/* Legend */}
				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4 border border-gray-200 dark:border-slate-600 rounded-lg !bg-white dark:!bg-slate-700/50 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
					<LegendItem icon={<SeatIcon type="business" />} label="Business" />
					<LegendItem icon={<SeatIcon type="plus" />} label="Economy Plus" />
					<LegendItem
						icon={<SeatIcon type="preferred" />}
						label="Preferred Seat"
					/>
					<LegendItem icon={<SeatIcon type="economy" />} label="Economy" />
					<LegendItem
						icon={<SeatIcon type="unavailable" />}
						label="Unavailable"
					/>
					<LegendItem
						icon={<Users className="w-5 h-5 text-muted-foreground" />}
						label="Lavatory"
					/>
					<LegendItem
						icon={<Coffee className="w-5 h-5 text-muted-foreground" />}
						label="Galley"
					/>
					<LegendItem
						icon={
							<DoorOpen className="w-5 h-5 text-red-600 dark:text-red-400" />
						}
						label="Exit Row"
					/>
				</div>

				{/* Fees & Navigation */}
				<div className="border-t border-gray-200 dark:border-slate-600 pt-5 mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
					<div className="flex items-baseline">
						<h3 className="text-lg font-semibold text-foreground">
							Total Seat Fees:
						</h3>
						<span
							key={pricePulse} // This key forces a re-render, triggering the animation
							className={`text-2xl font-bold ml-2 ${totalSeatFees > 0 ? "animate-pulse-green text-green-600 dark:text-green-400" : "animate-pulse-gray text-foreground"}`}
						>
							${totalSeatFees}
						</span>
					</div>

					<div className="text-left sm:text-right">
						<div className="text-base font-medium text-foreground">
							{selectedSeats.length > 0
								? `Seat(s): ${selectedSeats.map((s) => s.id).join(", ")}`
								: "No Seat Selected"}
						</div>
						<div className="text-sm text-muted-foreground capitalize">
							{selectedSeats.length > 0
								? `${[...new Set(selectedSeats.map((s) => s.type))].join(" / ")} Seat(s)`
								: "Please select a seat"}
						</div>
					</div>
				</div>

				<div className="flex w-full justify-between space-x-3 pt-4 border-t border-gray-200 dark:border-slate-600">
					<button
						onClick={onBack}
						className="px-6 py-2 border border-gray-200 dark:border-slate-600 rounded-lg text-foreground hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors !bg-white dark:!bg-slate-800/95 backdrop-blur-sm w-1/2 sm:w-auto [background-color:white] dark:[background-color:rgb(30_41_59/0.95)]"
					>
						Back
					</button>
					<button
						onClick={onNext}
						className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg transition-colors w-1/2 sm:w-auto shadow-sm hover:shadow-md"
					>
						Continue
					</button>
				</div>
			</div>
		</>
	);
};

export default Step3_Seats;
