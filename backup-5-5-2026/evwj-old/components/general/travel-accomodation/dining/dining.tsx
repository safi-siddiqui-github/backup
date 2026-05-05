"use client";

import { useMemo, useState } from "react";
import FiltersPanel from "./FiltersPanel";
import RestaurantCard from "./RestaurantCard";
import SearchBar from "./SearchBar";
import { restaurants } from "./data";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

export default function DiningTab() {
	const [query, setQuery] = useState("");

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return restaurants;
		return restaurants.filter((r) => {
			if (r.name.toLowerCase().includes(q)) return true;
			if (r.address.toLowerCase().includes(q)) return true;
			if (r.category.toLowerCase().includes(q)) return true;
			return false;
		});
	}, [query]);

	return (
		<div className="flex flex-col gap-6">
			<FiltersPanel
				query={query}
				setQuery={setQuery}
				filteredCount={filtered.length}
			/>

			<SearchBar query={query} setQuery={setQuery} />

			<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
				{filtered.map((restaurant) => (
					<RestaurantCard key={restaurant.id} restaurant={restaurant} />
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
		</div>
	);
}
