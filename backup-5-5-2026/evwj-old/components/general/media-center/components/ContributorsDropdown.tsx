"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { ArrowUp, ChevronDown, Eye, Search, Users } from "lucide-react";
import { useState } from "react";
import { MediaCenterContributor } from "../shared";

interface ContributorsDropdownProps {
	contributors: MediaCenterContributor[];
	totalCount: number;
}

type FilterType = "all" | "uploaders" | "viewers";

export default function ContributorsDropdown({
	contributors,
	totalCount,
}: ContributorsDropdownProps) {
	const [open, setOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [filter, setFilter] = useState<FilterType>("all");

	// Filter contributors based on search term and filter type
	const filteredContributors = contributors.filter((contributor) => {
		const matchesSearch =
			contributor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			contributor.email?.toLowerCase().includes(searchTerm.toLowerCase());

		if (filter === "uploaders") {
			return matchesSearch && contributor.photoCount > 0;
		} else if (filter === "viewers") {
			return matchesSearch && contributor.photoCount === 0;
		}

		return matchesSearch;
	});

	// Get initials from name
	const getInitials = (name: string) => {
		return name
			.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase();
	};

	// Get first 5 contributors for preview
	const previewContributors = contributors.slice(0, 5);
	const remainingCount = Math.max(0, totalCount - 5);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
					<div className="flex items-center gap-2">
						<div className="flex items-center -space-x-2">
							{previewContributors.map((contributor) => (
								<Avatar
									key={contributor.id}
									className="h-8 w-8 border-2 border-white"
								>
									<AvatarImage src={contributor.avatar || undefined} />
									<AvatarFallback className="text-xs">
										{getInitials(contributor.name)}
									</AvatarFallback>
								</Avatar>
							))}
							{remainingCount > 0 && (
								<div className="bg-muted flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-xs font-medium">
									+{remainingCount}
								</div>
							)}
						</div>
						<ChevronDown className="text-muted-foreground h-4 w-4" />
					</div>
				</Button>
			</PopoverTrigger>

			<PopoverContent className="w-80 p-0" align="start">
				<div className="space-y-4 p-4">
					{/* Header */}
					<div className="flex items-center gap-2">
						<Users className="h-5 w-5 text-blue-600" />
						<h3 className="font-semibold">{totalCount} Contributors</h3>
					</div>

					{/* Search */}
					<div className="relative">
						<Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
						<Input
							placeholder="Search contributors..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="pl-10"
						/>
					</div>

					{/* Filter Tabs */}
					<div className="flex gap-1">
						<Button
							variant={filter === "all" ? "default" : "ghost"}
							size="sm"
							onClick={() => setFilter("all")}
							className="flex-1"
						>
							All
						</Button>
						<Button
							variant={filter === "uploaders" ? "default" : "ghost"}
							size="sm"
							onClick={() => setFilter("uploaders")}
							className="flex-1"
						>
							<ArrowUp className="mr-1 h-3 w-3" />
							Uploaders
						</Button>
						<Button
							variant={filter === "viewers" ? "default" : "ghost"}
							size="sm"
							onClick={() => setFilter("viewers")}
							className="flex-1"
						>
							<Eye className="mr-1 h-3 w-3" />
							Viewers
						</Button>
					</div>

					{/* Contributors List */}
					<div className="max-h-64 space-y-2 overflow-y-auto">
						{filteredContributors.map((contributor) => (
							<div
								key={contributor.id}
								className="hover:bg-muted flex items-center gap-3 rounded-lg p-2"
							>
								<div className="relative">
									<Avatar className="h-8 w-8">
										<AvatarImage src={contributor.avatar || undefined} />
										<AvatarFallback className="text-xs">
											{getInitials(contributor.name)}
										</AvatarFallback>
									</Avatar>
									{contributor.photoCount > 0 && (
										<div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600">
											<ArrowUp className="h-2 w-2 text-white" />
										</div>
									)}
								</div>

								<div className="min-w-0 flex-1">
									<div className="truncate text-sm font-medium">
										{contributor.name}
									</div>
									<div className="text-muted-foreground truncate text-xs">
										{contributor.email || "No email provided"}
									</div>
								</div>

								{contributor.photoCount > 0 && (
									<Badge variant="secondary" className="text-xs">
										{contributor.photoCount} photos
									</Badge>
								)}
							</div>
						))}

						{filteredContributors.length === 0 && (
							<div className="text-muted-foreground py-4 text-center text-sm">
								No contributors found
							</div>
						)}
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
}
