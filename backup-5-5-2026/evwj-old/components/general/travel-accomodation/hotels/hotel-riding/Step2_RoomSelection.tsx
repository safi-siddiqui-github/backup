"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { Plus, Minus, Check } from "lucide-react";
import { toast } from "sonner";
import type { HotelType } from "../hotels";

type RoomSelectionState = {
	qty: number;
	adults: number;
	children: number;
	childAges?: number[];
	pets?: boolean;
};

const RoomCard = ({
	room,
	state,
	onIncrement,
	onDecrement,
	onChangeAdults,
	onChangeChildren,
	onTogglePets,
	onSetChildAge,
}: {
	room: HotelType["rooms"][0];
	state: RoomSelectionState;
	onIncrement?: () => void;
	onDecrement?: () => void;
	onChangeAdults?: (delta: number) => void;
	onChangeChildren?: (v: number) => void;
	onTogglePets?: (v: boolean) => void;
	onSetChildAge?: (index: number, age: number) => void;
}) => (
	<div className="border rounded-lg overflow-hidden flex flex-col md:flex-row border-gray-200 dark:border-slate-600 !bg-white dark:!bg-slate-700/50 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
		<div className="md:w-1/3 relative h-48 md:h-auto">
			<Image
				src={
					"https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1469"
				}
				alt={room.name}
				fill
				className="object-cover"
				unoptimized
			/>
			<span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
				Only 2 left
			</span>
		</div>
		<div className="md:w-2/3 p-4 flex flex-col justify-between text-gray-800 dark:text-gray-100">
			<div>
				<h4 className="text-xl font-bold text-foreground">{room.name}</h4>
				<p className="text-sm text-muted-foreground mt-1">{room.description}</p>
				<div className="text-sm text-muted-foreground mt-2 space-x-3">
					<span>Up to {room.guests} guests</span>
					<span>•</span>
					<span>{room.sqft} sq ft</span>
					<span>•</span>
					<span>{room.bed}</span>
				</div>
				<div className="flex flex-wrap gap-2 mt-3">
					{room.amenities.map((a) => (
						<span
							key={a}
							className="text-xs text-foreground flex items-center gap-1"
						>
							<Check className="h-3 w-3 text-green-500" /> {a}
						</span>
					))}
				</div>

				{/* per-room guest selectors */}
				<div className="mt-3 grid grid-cols-2 gap-3 text-sm">
					<div>
						<label className="block text-xs text-muted-foreground">
							Adults
						</label>
						<div className="inline-flex items-center mt-1">
							<button
								onClick={() => onChangeAdults && onChangeAdults(-1)}
								className="h-8 w-8 border rounded-full flex items-center justify-center bg-white dark:bg-gray-800"
							>
								<Minus className="h-4 w-4" />
							</button>
							<span className="px-3">{state.adults || 1}</span>
							<button
								onClick={() => onChangeAdults && onChangeAdults(1)}
								className="h-8 w-8 border rounded-full flex items-center justify-center bg-white dark:bg-gray-800"
							>
								<Plus className="h-4 w-4" />
							</button>
						</div>
					</div>

					<div>
						<label className="block text-xs text-muted-foreground">
							Children
						</label>
						<div className="inline-flex items-center mt-1">
							<button
								onClick={() =>
									onChangeChildren &&
									onChangeChildren(Math.max(0, (state.children || 0) - 1))
								}
								className="h-8 w-8 border rounded-full flex items-center justify-center"
							>
								<Minus className="h-4 w-4" />
							</button>
							<span className="px-3">{state.children || 0}</span>
							<button
								onClick={() =>
									onChangeChildren &&
									onChangeChildren((state.children || 0) + 1)
								}
								className="h-8 w-8 border rounded-full flex items-center justify-center"
							>
								<Plus className="h-4 w-4" />
							</button>
						</div>
					</div>
				</div>

				{state.children > 0 && (
					<div className="mt-3 text-sm">
						<label className="block text-xs text-muted-foreground mb-1">
							Children ages (at check-out)
						</label>
						<div className="flex gap-2">
							{Array.from({ length: state.children }).map((_, i) => (
								<select
									key={i}
									value={state.childAges?.[i] ?? ""}
									onChange={(e) =>
										onSetChildAge && onSetChildAge(i, Number(e.target.value))
									}
									className="border rounded px-2 py-1 text-sm"
								>
									<option value="">Age</option>
									{Array.from({ length: 18 }).map((__, a) => (
										<option key={a} value={a}>
											{a}
										</option>
									))}
								</select>
							))}
						</div>
					</div>
				)}

				<div className="mt-3">
					<label className="inline-flex items-center text-sm">
						<input
							type="checkbox"
							checked={!!state.pets}
							onChange={(e) => onTogglePets && onTogglePets(e.target.checked)}
							className="mr-2"
						/>
						Traveling with pets?{" "}
						<span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
							Assistance animals aren’t considered pets.
						</span>
					</label>
				</div>
			</div>
			<div className="flex justify-between items-end mt-4">
				<div>
					<span className="text-2xl font-bold text-indigo-600">
						${room.price.toFixed(2)}
					</span>
					<span className="text-sm text-muted-foreground"> per night</span>
					<p className="text-xs text-muted-foreground">Each room</p>
					<p className="text-sm text-foreground mt-2">
						Subtotal for this room:{" "}
						<span className="font-semibold">
							${((room.price || 0) * (state.qty || 0)).toFixed(2)}
						</span>
					</p>
				</div>
				<div className="flex items-center gap-2">
					<button
						onClick={onDecrement}
						disabled={!onDecrement || state.qty <= 0}
						className={`h-8 w-8 border rounded-full flex items-center justify-center ${state.qty <= 0 ? "text-muted-foreground border-gray-200 dark:border-slate-600 cursor-not-allowed" : "text-foreground border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700/50"}`}
					>
						<Minus className="h-4 w-4" />
					</button>
					<span className="font-bold text-lg w-8 text-center">{state.qty}</span>
					<button
						onClick={onIncrement}
						className="h-8 w-8 border rounded-full text-foreground border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700/50 flex items-center justify-center"
					>
						<Plus className="h-4 w-4" />
					</button>
				</div>
			</div>
		</div>
	</div>
);

export default function Step2_RoomSelection({
	hotel,
	onNext,
	onBack,
}: {
	hotel: Partial<HotelType>;
	onNext: () => void;
	onBack: () => void;
}) {
	const [selections, setSelections] = useState<
		Record<string, RoomSelectionState>
	>({});

	const nights = useMemo(() => {
		const ci = hotel.checkIn ? Date.parse(hotel.checkIn) : NaN;
		const co = hotel.checkOut ? Date.parse(hotel.checkOut) : NaN;
		if (!isNaN(ci) && !isNaN(co) && co > ci) {
			return Math.max(1, Math.round((co - ci) / (1000 * 60 * 60 * 24)));
		}
		return 1;
	}, [hotel.checkIn, hotel.checkOut]);

	const totalRooms = useMemo(
		() => Object.values(selections).reduce((s, v) => s + (v.qty || 0), 0),
		[selections],
	);

	const subtotal = useMemo(() => {
		let sum = 0;
		for (const r of hotel.rooms || []) {
			const s = selections[r.name];
			const qty = s?.qty || 0;
			sum += (r.price || 0) * qty * nights;
			// future: could add per-person fees (adults/children) here if provided
		}
		return sum;
	}, [selections, hotel.rooms, nights]);

	const taxRate = 0.22;
	const taxes = +(subtotal * taxRate).toFixed(2);
	const total = +(subtotal + taxes).toFixed(2);

	const increment = (roomName: string) =>
		setSelections((s) => ({
			...s,
			[roomName]: {
				...(s[roomName] || { qty: 0, adults: 2, children: 0 }),
				qty: (s[roomName]?.qty || 0) + 1,
			},
		}));
	const decrement = (roomName: string) =>
		setSelections((s) => {
			const cur = s[roomName]?.qty || 0;
			if (cur <= 1) {
				const copy = { ...s } as Record<string, RoomSelectionState>;
				delete copy[roomName];
				return copy;
			}
			return {
				...s,
				[roomName]: {
					...(s[roomName] || { qty: 0, adults: 2, children: 0 }),
					qty: cur - 1,
				},
			};
		});

	const changeAdults = (roomName: string, delta: number) => {
		setSelections((s) => {
			const copy = { ...s };
			const cur = copy[roomName] || { qty: 0, adults: 1, children: 0 };

			// compute current totals
			const totalAdultsBefore = Object.values(s).reduce(
				(acc, v) => acc + (v.adults || 0) * (v.qty || 0),
				0,
			);

			// if no rooms yet for this type, add one
			if ((cur.qty || 0) === 0) {
				const newQty = 1;
				const desiredAdultsForThisType = (cur.adults || 1) + delta;
				// distribute across newQty
				const perRoom = Math.min(
					4,
					Math.max(1, Math.ceil(desiredAdultsForThisType / newQty)),
				);
				copy[roomName] = { ...cur, qty: newQty, adults: perRoom };
				toast("Added one room to start occupancy");
				return copy;
			}

			// attempt to add delta adults to this room type (total across its qty)
			const desiredAdultsForThisTypeBefore = (cur.adults || 1) * (cur.qty || 0);
			const desiredAdultsForThisTypeAfter =
				desiredAdultsForThisTypeBefore + delta;

			// total adults desired across all types after this change
			const totalAdultsAfter =
				totalAdultsBefore -
				desiredAdultsForThisTypeBefore +
				desiredAdultsForThisTypeAfter;

			// current capacity
			const currentCapacity = Object.values(s).reduce(
				(acc, v) => acc + (v.qty || 0) * 4,
				0,
			);

			let copyCurQty = cur.qty || 0;
			if (totalAdultsAfter > currentCapacity) {
				const needExtra = totalAdultsAfter - currentCapacity;
				const roomsToAdd = Math.ceil(needExtra / 4);
				copyCurQty = copyCurQty + roomsToAdd;
				toast(
					`Added ${roomsToAdd} room${roomsToAdd > 1 ? "s" : ""} to accommodate additional adults`,
				);
			}

			// now distribute desiredAdultsForThisTypeAfter over copyCurQty rooms
			const perRoom = Math.min(
				4,
				Math.max(1, Math.ceil(desiredAdultsForThisTypeAfter / copyCurQty)),
			);

			copy[roomName] = { ...cur, qty: copyCurQty, adults: perRoom };
			return copy;
		});
	};
	const changeChildren = (roomName: string, children: number) =>
		setSelections((s) => ({
			...s,
			[roomName]: {
				...(s[roomName] || { qty: 0, adults: 2, children: 0 }),
				children,
				childAges: Array.from({ length: children }).map(
					(_, i) => s[roomName]?.childAges?.[i] ?? 0,
				),
			},
		}));
	const togglePets = (roomName: string, pets: boolean) =>
		setSelections((s) => ({
			...s,
			[roomName]: {
				...(s[roomName] || { qty: 0, adults: 2, children: 0 }),
				pets,
			},
		}));
	const setChildAge = (roomName: string, index: number, age: number) =>
		setSelections((s) => {
			const cur = s[roomName] || {
				qty: 0,
				adults: 2,
				children: 0,
				childAges: [],
			};
			const ages = [...(cur.childAges || [])];
			ages[index] = age;
			return { ...s, [roomName]: { ...cur, childAges: ages } };
		});

	return (
		<div>
			<h2 className="text-2xl font-bold mb-4">Select Rooms</h2>
			<p className="text-muted-foreground mb-6">
				Choose your room types and quantities.
			</p>

			<div className="space-y-6">
				{hotel.rooms?.map((room) => (
					<RoomCard
						key={room.name}
						room={room}
						state={selections[room.name] || { qty: 0, adults: 2, children: 0 }}
						onIncrement={() => increment(room.name)}
						onDecrement={() => decrement(room.name)}
						onChangeAdults={(delta) => changeAdults(room.name, delta)}
						onChangeChildren={(v) => changeChildren(room.name, v)}
						onTogglePets={(v) => togglePets(room.name, v)}
						onSetChildAge={(i, age) => setChildAge(room.name, i, age)}
					/>
				))}
			</div>

			{totalRooms > 0 && (
				<div className="mt-8 pt-6 border-t">
					<h3 className="text-xl font-bold mb-4">Booking Summary</h3>
					<p className="text-sm text-muted-foreground mb-4">
						{totalRooms} room{totalRooms > 1 ? "s" : ""} • {nights} night
						{nights > 1 ? "s" : ""}
					</p>
					<div className="space-y-2">
						<div className="flex justify-between">
							<span className="text-foreground">Room Total</span>
							<span className="font-medium">${subtotal.toFixed(2)}</span>
						</div>
						<div className="flex justify-between">
							<span className="text-gray-700">Taxes & Fees</span>
							<span className="font-medium">${taxes.toFixed(2)}</span>
						</div>
						<div className="flex justify-between text-lg font-bold mt-2">
							<span>Total</span>
							<span>${total.toFixed(2)}</span>
						</div>
					</div>
				</div>
			)}

			<div
				className={`flex justify-between items-center mt-8 pt-6 border-t ${totalRooms === 0 ? "opacity-60" : ""}`}
			>
				<button
					onClick={onBack}
					className="text-foreground px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-50 dark:hover:bg-slate-700/50 transition border border-gray-200 dark:border-slate-600 !bg-white dark:!bg-slate-800/95 backdrop-blur-sm [background-color:white] dark:[background-color:rgb(30_41_59/0.95)]"
				>
					Back
				</button>
				<button
					onClick={onNext}
					disabled={totalRooms === 0}
					className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition ${totalRooms === 0 ? "!bg-white dark:!bg-slate-700/50 text-muted-foreground border border-gray-200 dark:border-slate-600 cursor-not-allowed [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]" : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"}`}
				>
					Continue to Guest Info
				</button>
			</div>
		</div>
	);
}
