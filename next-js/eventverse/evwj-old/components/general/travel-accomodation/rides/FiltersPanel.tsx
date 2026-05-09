"use client";

import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

type Props = {
	optionsCount: number;
};

export default function FiltersPanel({ optionsCount }: Props) {
	return (
		<div className="rounded-xl bg-white p-5 shadow-lg sm:p-6 !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
			<div className="mb-6 flex items-center gap-2">
				<Send className="h-5 w-5 text-gray-700 dark:text-gray-300" />
				<h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
					Schedule Your Ride
				</h3>
			</div>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
				<div>
					<label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
						Ride Date
					</label>
					<div className="relative">
						<Input
							readOnly
							value="Jul 20, 2024"
							className="w-full rounded-md border border-gray-300 p-2.5"
						/>
					</div>
				</div>

				<div>
					<label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
						Pickup Location
					</label>
					<Input
						placeholder="Enter pickup address"
						value=""
						onChange={() => {}}
						className="w-full rounded-md border border-gray-300 p-2.5"
					/>
				</div>

				<div>
					<label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
						Pickup Time
					</label>
					<div className="relative">
						<Input
							readOnly
							value="06:00 PM"
							className="w-full rounded-md border border-gray-300 p-2.5"
						/>
					</div>
				</div>
			</div>

			<div className="mt-6 flex items-center justify-between">
				<div className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-800 dark:bg-[#020617]">
					{optionsCount} options
				</div>
			</div>
		</div>
	);
}
