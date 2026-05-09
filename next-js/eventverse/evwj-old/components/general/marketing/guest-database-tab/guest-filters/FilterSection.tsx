"use client";

import { Label } from "@/components/ui/label";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterSectionProps {
	title: string;
	isOpen: boolean;
	onToggle: () => void;
	children: React.ReactNode;
}

export default function FilterSection({
	title,
	isOpen,
	onToggle,
	children,
}: FilterSectionProps) {
	return (
		<Collapsible open={isOpen} onOpenChange={onToggle}>
			<CollapsibleTrigger className="flex w-full items-center justify-between py-2 hover:bg-muted/50 rounded-md px-2 -mx-2">
				<Label className="text-sm font-medium cursor-pointer">{title}</Label>
				<ChevronDown
					className={cn(
						"h-4 w-4 text-muted-foreground transition-transform",
						isOpen && "rotate-180",
					)}
				/>
			</CollapsibleTrigger>
			<CollapsibleContent>{children}</CollapsibleContent>
		</Collapsible>
	);
}
