import { Skeleton } from "@/components/ui/skeleton";

export default function EventCardSkeleton() {
	return (
		<div className="relative flex h-96 w-full flex-col overflow-hidden rounded-xl bg-gray-950 shadow-2xl 2xl:h-[450px]">
			{/* Image area */}
			<div className="relative h-64 w-full overflow-hidden">
				<Skeleton className="h-full w-full rounded-none" />
				<div className="absolute inset-0 bg-linear-to-t from-gray-950 via-gray-950/50 to-transparent" />
			</div>

			{/* Content area */}
			<div className="flex flex-1 flex-col justify-between gap-3 bg-gray-950 p-5">
				{/* Date row */}
				<div className="flex items-center gap-2">
					<Skeleton className="h-4 w-4 rounded-full" />
					<Skeleton className="h-3 w-24" />
				</div>

				{/* Title lines */}
				<div className="space-y-2">
					<Skeleton className="h-4 w-3/4" />
					<Skeleton className="h-4 w-2/3" />
				</div>

				{/* Location row */}
				<div className="flex items-center gap-2">
					<Skeleton className="h-4 w-4 rounded-full" />
					<Skeleton className="h-3 w-32" />
				</div>

				{/* Organizer + price row */}
				<div className="mt-2 flex items-center justify-between border-t border-gray-800 pt-3">
					<div className="flex items-center gap-2">
						<Skeleton className="h-8 w-8 rounded-full" />
						<Skeleton className="h-4 w-24" />
					</div>
					<Skeleton className="h-6 w-16 rounded-full" />
				</div>
			</div>
		</div>
	);
}
