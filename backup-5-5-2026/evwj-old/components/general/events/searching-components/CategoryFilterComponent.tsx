"use client";

import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryFilterComponentProps {
	categories: string[];
	selectedCategory: string;
	categoryFilter: string;
	onCategorySelect: (category: string) => void;
}

export default function CategoryFilterComponent({
	categories,
	selectedCategory,
	categoryFilter,
	onCategorySelect,
}: CategoryFilterComponentProps) {
	return (
		<div className="flex flex-col gap-2">
			<p className="text-lg font-medium">Category</p>
			<Popover>
				<PopoverTrigger asChild>
					<Button variant="outline" role="combobox" className="justify-between">
						<span>
							{selectedCategory || categoryFilter || "All categories"}
						</span>
						<ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="p-0">
					<Command>
						<CommandInput placeholder="Search category..." />
						<CommandList>
							<CommandEmpty>No category found.</CommandEmpty>
							<CommandGroup>
								{categories.map((cat) => (
									<CommandItem key={cat} onSelect={() => onCategorySelect(cat)}>
										<CheckIcon
											className={cn(
												"mr-2 h-4 w-4",
												categoryFilter === cat ? "opacity-100" : "opacity-0",
											)}
										/>
										{cat}
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
}
