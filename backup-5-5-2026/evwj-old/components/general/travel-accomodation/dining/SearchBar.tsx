"use client";

import React from "react";
import { Search, X } from "lucide-react";

type Props = {
	query: string;
	setQuery: (s: string) => void;
};

export default function SearchBar({ query, setQuery }: Props) {
	return (
		<div className="flex items-center gap-3">
			<label htmlFor="dining-search" className="sr-only">
				Search restaurants
			</label>
			<div className="flex flex-1 items-center rounded-lg border pl-2 !bg-white dark:!bg-slate-800/95 backdrop-blur-sm [background-color:white] dark:[background-color:rgb(30_41_59/0.95)]">
				<Search className="h-4 w-4 text-muted-foreground" />
				<input
					id="dining-search"
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="Search restaurants, address or cuisine"
					className="flex-1 px-2 py-2 outline-none bg-transparent text-foreground placeholder:text-muted-foreground"
				/>
				{query && (
					<button
						onClick={() => setQuery("")}
						aria-label="Clear search"
						className="px-2 text-muted-foreground hover:text-foreground"
					>
						<X className="h-4 w-4" />
					</button>
				)}
			</div>
		</div>
	);
}
