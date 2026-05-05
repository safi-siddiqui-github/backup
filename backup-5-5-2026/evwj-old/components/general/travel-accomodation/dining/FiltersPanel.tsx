"use client";

import React from "react";
import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import StyledSelect from "./StyledSelect";

type Props = {
	query: string;
	setQuery: (query: string) => void;
	filteredCount: number;
};

export default function FiltersPanel({
	query,
	setQuery,
	filteredCount,
}: Props) {
	return (
		<Card className="!bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
			<CardContent className="p-5 sm:p-6">
				<div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
					<h3 className="text-xl font-semibold text-foreground">
						Find Restaurants
					</h3>
					<div className="flex items-center gap-3">
						<div className="hidden md:block">
							<label htmlFor="dining-filter-search" className="sr-only">
								Filter search
							</label>
							<div className="flex items-center rounded-lg border pl-2 !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
								<Search className="h-4 w-4 text-muted-foreground" />
								<input
									id="dining-filter-search"
									type="text"
									value={query}
									onChange={(e) => setQuery(e.target.value)}
									placeholder="Search in filters"
									className="flex-1 px-2 py-1.5 outline-none bg-transparent text-foreground placeholder:text-muted-foreground text-xs"
								/>
							</div>
						</div>

						<div className="shrink-0">
							<span className="inline-flex items-center rounded-full !bg-white dark:!bg-slate-700/50 border border-gray-200 dark:border-slate-600 px-3 py-1.5 text-sm font-medium text-foreground [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
								{filteredCount} restaurants
							</span>
						</div>
					</div>
				</div>

				<div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium text-foreground mb-1">
							Cuisine
						</label>
						<StyledSelect label="Cuisine" defaultValue="all">
							<option value="all">All Cuisines</option>
							<option value="seafood">Seafood</option>
							<option value="italian">Italian</option>
							<option value="japanese">Japanese</option>
							<option value="american">American</option>
						</StyledSelect>
					</div>

					<div>
						<label className="block text-sm font-medium text-foreground mb-1">
							Price Range
						</label>
						<StyledSelect label="Price Range" defaultValue="all">
							<option value="all">All Prices</option>
							<option value="1">$</option>
							<option value="2">$$</option>
							<option value="3">$$$</option>
							<option value="4">$$$$</option>
						</StyledSelect>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
