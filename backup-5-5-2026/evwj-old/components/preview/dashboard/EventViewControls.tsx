import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Filter, Grid3x3, List, Search, SortAsc } from "lucide-react";

interface EventViewControlsProps {
	searchTerm: string;
	onSearchChange: (term: string) => void;
	viewMode: "grid" | "list";
	onViewModeChange: (mode: "grid" | "list") => void;
	selectedTypes: string[];
	onTypesChange: (types: string[]) => void;
	availableTypes: string[];
	sortBy: string;
	onSortChange: (sort: string) => void;
}

export const EventViewControls = ({
	searchTerm,
	onSearchChange,
	viewMode,
	onViewModeChange,
	selectedTypes,
	onTypesChange,
	availableTypes,
	sortBy,
	onSortChange,
}: EventViewControlsProps) => {
	const handleTypeToggle = (type: string) => {
		if (selectedTypes.includes(type)) {
			onTypesChange(selectedTypes.filter((t) => t !== type));
		} else {
			onTypesChange([...selectedTypes, type]);
		}
	};

	const activeFiltersCount = selectedTypes.length;

	return (
		<div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
			{/* Search */}
			<div className="relative flex-1">
				<Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
				<Input
					placeholder="Search events by name, type, location..."
					value={searchTerm}
					onChange={(e) => onSearchChange(e.target.value)}
					className="bg-card border-border/40 pl-10"
				/>
			</div>

			{/* Filters */}
			<div className="hidden md:flex gap-2 ">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="outline"
							size="sm"
							className="border-border/40 gap-2"
						>
							<Filter className="h-4 w-4" />
							Types
							{activeFiltersCount > 0 && (
								<Badge
									variant="secondary"
									className="flex h-5 w-5 items-center justify-center p-0"
								>
									{activeFiltersCount}
								</Badge>
							)}
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="w-48">
						<DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
						<DropdownMenuSeparator />
						{availableTypes.map((type) => (
							<DropdownMenuCheckboxItem
								key={type}
								checked={selectedTypes.includes(type)}
								onCheckedChange={() => handleTypeToggle(type)}
							>
								{type}
							</DropdownMenuCheckboxItem>
						))}
						{selectedTypes.length > 0 && (
							<>
								<DropdownMenuSeparator />
								<Button
									variant="ghost"
									size="sm"
									onClick={() => onTypesChange([])}
									className="w-full"
								>
									Clear All
								</Button>
							</>
						)}
					</DropdownMenuContent>
				</DropdownMenu>

				{/* Sort */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="outline"
							size="sm"
							className="border-border/40 gap-2"
						>
							<SortAsc className="h-4 w-4" />
							Sort
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Sort By</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuCheckboxItem
							checked={sortBy === "date-asc"}
							onCheckedChange={() => onSortChange("date-asc")}
						>
							Date (Earliest)
						</DropdownMenuCheckboxItem>
						<DropdownMenuCheckboxItem
							checked={sortBy === "date-desc"}
							onCheckedChange={() => onSortChange("date-desc")}
						>
							Date (Latest)
						</DropdownMenuCheckboxItem>
						<DropdownMenuCheckboxItem
							checked={sortBy === "attendees"}
							onCheckedChange={() => onSortChange("attendees")}
						>
							Attendees (Most)
						</DropdownMenuCheckboxItem>
						<DropdownMenuCheckboxItem
							checked={sortBy === "name"}
							onCheckedChange={() => onSortChange("name")}
						>
							Name (A-Z)
						</DropdownMenuCheckboxItem>
					</DropdownMenuContent>
				</DropdownMenu>

				{/* View Mode Toggle */}
				<div className="border-border/40 flex overflow-hidden rounded-md border">
					<Button
						variant={viewMode === "grid" ? "secondary" : "ghost"}
						size="sm"
						onClick={() => onViewModeChange("grid")}
						className="border-border/40 rounded-none border-r"
					>
						<Grid3x3 className="h-4 w-4" />
					</Button>
					<Button
						variant={viewMode === "list" ? "secondary" : "ghost"}
						size="sm"
						onClick={() => onViewModeChange("list")}
						className="rounded-none"
					>
						<List className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	);
};
