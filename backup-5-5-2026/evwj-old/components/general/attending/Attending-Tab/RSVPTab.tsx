"use client";

import React, { useState } from "react";
import {
	Check,
	CircleHelp,
	X,
	Plus,
	Minus,
	Utensils,
	ChevronDown,
	Users,
	Send,
} from "lucide-react";

export default function RsvpTab() {
	const [guestCount, setGuestCount] = useState(0);
	const [rsvpStatus, setRsvpStatus] = useState<"yes" | "maybe" | "no" | null>(
		"yes",
	);
	const [mealPreference, setMealPreference] = useState("");
	const [dietaryRestrictions, setDietaryRestrictions] = useState("");
	const [specialRequests, setSpecialRequests] = useState("");

	const handleGuestChange = (type: "increment" | "decrement") => {
		setGuestCount((prev) =>
			type === "increment" ? prev + 1 : Math.max(0, prev - 1),
		);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log({
			rsvpStatus,
			guestCount,
			mealPreference,
			dietaryRestrictions,
			specialRequests,
		});
		alert("RSVP Submitted! (Check console for data)");
		// In a real app, you'd send this data to an API
	};

	return (
		<div className="font-sans     text-gray-900 dark:text-gray-100">
			<div className="space-y-6">
				{/* --- Section 2: Your RSVP Form --- */}
				<div className="bg-white dark:bg-[#090a11] rounded-xl p-6 shadow-sm">
					<form onSubmit={handleSubmit} className="space-y-6">
						<h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
							Your RSVP
						</h3>
						<p className="text-gray-600 -mt-3 dark:text-gray-300">
							Let us know if you can join us
						</p>

						{/* Will you be attending? */}
						<div>
							<p className="text-base font-medium text-gray-800 mb-3 dark:text-gray-100">
								Will you be attending?
							</p>
							<div className="grid grid-cols-3 gap-3">
								{/* Yes, I'm Going! */}
								<button
									type="button"
									onClick={() => setRsvpStatus("yes")}
									className={`flex items-center justify-center gap-2 py-5 px-4 rounded-lg transition-all ${
										rsvpStatus === "yes"
											? "bg-emerald-600 text-white shadow-md"
											: "bg-white text-gray-700 hover:shadow-sm dark:bg-[#070b1c] dark:text-gray-100 dark:border"
									}`}
								>
									<Check className="w-5 h-5" />
									<span className="font-semibold text-sm sm:text-base dark:text-gray-100">
										Yes, I'm Going!
									</span>
								</button>

								{/* Maybe */}
								<button
									type="button"
									onClick={() => setRsvpStatus("maybe")}
									className={`flex items-center justify-center gap-2 py-5 px-4 rounded-lg transition-all ${
										rsvpStatus === "maybe"
											? "bg-yellow-500 text-white shadow-md"
											: "bg-white text-gray-700 hover:shadow-sm dark:bg-[#070b1c] dark:text-gray-100 dark:border"
									}`}
								>
									<CircleHelp className="w-5 h-5" />
									<span className="font-semibold text-sm sm:text-base dark:text-gray-100">
										Maybe
									</span>
								</button>

								{/* Can't Make It */}
								<button
									type="button"
									onClick={() => setRsvpStatus("no")}
									className={`flex items-center justify-center gap-2 py-5 px-4 rounded-lg transition-all ${
										rsvpStatus === "no"
											? "bg-red-600 text-white shadow-md"
											: "bg-white text-gray-700 hover:shadow-sm dark:bg-[#070b1c] dark:text-gray-100 dark:border"
									}`}
								>
									<X className="w-5 h-5" />
									<span className="font-semibold text-sm sm:text-base dark:text-gray-100">
										Can't Make It
									</span>
								</button>
							</div>
						</div>

						{/* Bringing Guests? */}
						{rsvpStatus === "yes" && (
							<div className="flex items-center justify-between py-2">
								<p className="text-base font-medium text-gray-800 dark:text-gray-100">
									Bringing Guests?
								</p>
								<div className="flex items-center gap-2 bg-gray-50 rounded-full p-1 dark:bg-[#090a11]">
									<button
										type="button"
										onClick={() => handleGuestChange("decrement")}
										disabled={guestCount === 0}
										title="Decrease guests"
										aria-label="Decrease guests"
										className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-gray-600 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed dark:bg-[#070b1c] dark:text-gray-200 "
									>
										<Minus className="w-4 h-4" />
									</button>
									<span className="font-bold text-gray-800 min-w-5 text-center dark:text-gray-100">
										{guestCount}
									</span>
									<button
										type="button"
										onClick={() => handleGuestChange("increment")}
										title="Increase guests"
										aria-label="Increase guests"
										className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-gray-600 hover:bg-gray-100 transition dark:bg-[#070b1c] dark:text-gray-200"
									>
										<Plus className="w-4 h-4" />
									</button>
								</div>
							</div>
						)}

						{/* Meal Preference */}
						{rsvpStatus === "yes" && (
							<div>
								<label
									htmlFor="meal-preference"
									className="flex items-center gap-2 text-base font-medium text-gray-800 mb-2 dark:text-gray-100"
								>
									<Utensils className="w-5 h-5 text-gray-500" /> Meal Preference
								</label>
								<div className="relative">
									<select
										id="meal-preference"
										value={mealPreference}
										onChange={(e) => setMealPreference(e.target.value)}
										className="block w-full px-4 py-2.5 bg-gray-50 rounded-lg pr-10 text-gray-700 focus:ring-blue-500 appearance-none transition dark:bg-[#070b1c] dark:text-gray-100"
									>
										<option value="">Select your meal</option>
										<option value="chicken">Roasted Chicken</option>
										<option value="fish">Grilled Salmon</option>
										<option value="vegetarian">Vegetarian Lasagna</option>
										<option value="vegan">Vegan Stir-fry</option>
									</select>
									<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-100">
										<ChevronDown className="w-4 h-4" />
									</div>
								</div>
							</div>
						)}

						{/* Dietary Restrictions */}
						{rsvpStatus === "yes" && (
							<div>
								<label
									htmlFor="dietary-restrictions"
									className="block text-base font-medium text-gray-800 mb-2 dark:text-gray-100"
								>
									Dietary Restrictions
								</label>
								<input
									type="text"
									id="dietary-restrictions"
									value={dietaryRestrictions}
									onChange={(e) => setDietaryRestrictions(e.target.value)}
									placeholder="e.g., Vegetarian, Gluten-free, Nut allergy"
									className="block w-full px-4 py-2.5 bg-gray-50 rounded-lg text-gray-700 placeholder-gray-400 focus:ring-blue-500 transition dark:bg-[#070b1c] dark:text-gray-100 dark:placeholder-gray-400"
								/>
							</div>
						)}

						{/* Special Requests or Notes */}
						<div>
							<label
								htmlFor="special-requests"
								className="block text-base font-medium text-gray-800 mb-2 dark:text-gray-100"
							>
								Special Requests or Notes (Optional)
							</label>
							<textarea
								id="special-requests"
								value={specialRequests}
								onChange={(e) => setSpecialRequests(e.target.value)}
								rows={4}
								placeholder="Any special accommodations or messages for the host..."
								className="block w-full px-4 py-2.5 bg-gray-50 rounded-lg text-gray-700 placeholder-gray-400 focus:ring-blue-500 resize-y transition dark:bg-[#070b1c] dark:text-gray-100 dark:placeholder-gray-400"
							></textarea>
						</div>

						{/* Submit Button */}
						<button
							type="submit"
							className="w-full flex items-center justify-center gap-3 text-white font-semibold py-3 px-4 rounded-xl shadow-md bg-linear-to-r from-[#9133f4] via-[#218ac0] to-[#666fd7] hover:opacity-95 focus:ring-4 focus:ring-[#218ac0] transition"
						>
							<Send className="w-5 h-5" />
							Submit RSVP
						</button>
					</form>
				</div>

				{/* --- Section 3: Who's Coming --- */}
				<div className="bg-white dark:bg-[#090a11] rounded-xl p-6 shadow-sm">
					<div className="flex items-center gap-3 mb-2">
						<Users className="w-6 h-6 text-gray-800 dark:text-gray-200" />
						<h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
							Who's Coming
						</h3>
					</div>
					<p className="text-sm text-gray-600 mb-5 dark:text-gray-300">
						53 attending • 16 maybe
					</p>

					<div className="flex items-center gap-3">
						<div className="flex -space-x-2 overflow-hidden">
							{/* Avatar placeholders - you'd replace these with actual image `img` tags */}
							<div className="relative w-10 h-10 rounded-full bg-indigo-200 text-indigo-700 flex items-center justify-center text-sm font-bold">
								LH
							</div>
							<div className="w-10 h-10 rounded-full bg-green-200 text-green-700 flex items-center justify-center text-sm font-bold">
								<Check className="w-5 h-5" />
							</div>
							<div className="w-10 h-10 rounded-full bg-red-200 text-red-700 flex items-center justify-center text-sm font-bold">
								<X className="w-5 h-5" />
							</div>
							<div className="w-10 h-10 rounded-full bg-purple-200 text-purple-700 flex items-center justify-center text-sm font-bold">
								<CircleHelp className="w-5 h-5" />
							</div>
							<div className="w-10 h-10 rounded-full bg-pink-200 text-pink-700 flex items-center justify-center text-sm font-bold">
								<Check className="w-5 h-5" />
							</div>
							<div className="w-10 h-10 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center text-sm font-bold">
								<Check className="w-5 h-5" />
							</div>
						</div>
						<p className="text-gray-700 font-medium text-sm dark:text-gray-200">
							and <span className="font-bold">48 others</span> are coming
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
