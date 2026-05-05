"use client";

import Image from "next/image";

export type CarItem = {
	id: string;
	name: string;
	tags: string[];
	pricePerDay: number;
	priceTotal: number;
	totalDays: number;
	pickupLocation: string;
	pickupDate: string;
	dropoffLocation: string;
	dropoffDate: string;
	features: string[];
};

export default function Step1_Selection({
	car,
	onNext,
}: {
	car: CarItem;
	onNext: () => void;
}) {
	const nights = car.totalDays || 1;
	const base = car.pricePerDay * nights;
	const taxRate = 0.17;
	const taxes = +(base * taxRate).toFixed(2);
	const total = +(base + taxes).toFixed(2);

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
			<section className="md:col-span-2">
				<div className="flex flex-col md:flex-row gap-4 items-start">
					<div className="rounded-lg overflow-hidden shrink-0 w-full md:w-56 h-40 bg-gray-100 dark:bg-gray-800 shadow-sm">
						<Image
							width={120}
							height={120}
							src="https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=60"
							alt={car.name}
							className="object-cover w-full h-full"
						/>
					</div>

					<div className="flex-1">
						<h3 className="text-xl font-bold text-gray-900 dark:text-white">
							{car.name}
						</h3>
						<div className="flex items-center gap-2 mt-2">
							{car.tags.map((t) => (
								<span
									key={t}
									className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-md dark:bg-indigo-900/40 dark:text-indigo-300"
								>
									{t}
								</span>
							))}
						</div>

						<p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
							Pickup:{" "}
							<span className="font-medium text-gray-800 dark:text-gray-100">
								{car.pickupDate}
							</span>{" "}
							• Dropoff:{" "}
							<span className="font-medium text-gray-800 dark:text-gray-100">
								{car.dropoffDate}
							</span>
						</p>

						<div className="mt-4 grid grid-cols-2 gap-3">
							{car.features.slice(0, 4).map((f) => (
								<div
									key={f}
									className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2"
								>
									<span className="h-2 w-2 bg-green-400 rounded-full inline-block" />{" "}
									{f}
								</div>
							))}
						</div>
					</div>
				</div>

				<div className="mt-6 border-t pt-4 flex justify-end">
					<button
						onClick={onNext}
						className="inline-flex items-center gap-2 bg-linear-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl shadow hover:opacity-95 transition"
					>
						Continue to Next Step
					</button>
				</div>
			</section>

			<aside className="hidden md:block">
				<div className="sticky top-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
					<div className="text-sm text-gray-500">Price Per Day</div>
					<div className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-1">
						${car.pricePerDay.toFixed(2)}
					</div>
					<div className="text-sm text-gray-500 mt-3">
						Total ({car.totalDays} days)
					</div>
					<div className="text-lg font-bold mt-1">${total.toFixed(2)}</div>
				</div>
			</aside>
		</div>
	);
}
