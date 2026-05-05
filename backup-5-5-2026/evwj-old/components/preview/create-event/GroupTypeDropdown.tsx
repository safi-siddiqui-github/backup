"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useState } from "react";

interface GroupTypeDropdownProps {
	value: string;
	onChange: (value: string) => void;
	customTypes: string[];
	onAddCustomType: (type: string) => void;
}

const PREDEFINED_TYPES = [
	"Special Guest",
	"VIP",
	"Lineup",
	"Artist",
	"Performer",
	"Speaker",
];

export default function GroupTypeDropdown({
	value,
	onChange,
	customTypes,
	onAddCustomType,
}: GroupTypeDropdownProps) {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [customTypeInput, setCustomTypeInput] = useState("");

	const allTypes = [...PREDEFINED_TYPES, ...customTypes];

	const handleAddCustomType = () => {
		if (customTypeInput.trim() && !allTypes.includes(customTypeInput.trim())) {
			onAddCustomType(customTypeInput.trim());
			onChange(customTypeInput.trim());
			setCustomTypeInput("");
			setIsDialogOpen(false);
		}
	};

	return (
		<>
			<Select value={value} onValueChange={onChange}>
				<SelectTrigger className="w-[200px]">
					<SelectValue placeholder="Select type" />
				</SelectTrigger>
				<SelectContent>
					{PREDEFINED_TYPES.map((type) => (
						<SelectItem key={type} value={type}>
							{type}
						</SelectItem>
					))}
					{customTypes.length > 0 && (
						<>
							<div className="px-2 py-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400">
								Custom Types
							</div>
							{customTypes.map((type) => (
								<SelectItem key={type} value={type}>
									{type}
								</SelectItem>
							))}
						</>
					)}
					<div className="border-t border-gray-200 dark:border-gray-700 my-1" />
					<div
						className="px-2 py-1.5 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-sm text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2"
						onMouseDown={(e) => {
							e.preventDefault();
							e.stopPropagation();
						}}
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							setIsDialogOpen(true);
							// Close the select dropdown by clicking outside
							setTimeout(() => {
								const selectTrigger = document.activeElement as HTMLElement;
								if (selectTrigger) {
									selectTrigger.blur();
								}
							}, 0);
						}}
					>
						<Plus className="h-4 w-4" />
						<span>Add Custom Type</span>
					</div>
				</SelectContent>
			</Select>

			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Add Custom Group Type</DialogTitle>
						<DialogDescription>
							Enter a custom type for this guest group (e.g., "Headliner",
							"Panelist", "Master of Ceremonies")
						</DialogDescription>
					</DialogHeader>
					<div className="space-y-4 py-4">
						<div>
							<Label htmlFor="custom-type">Group Type</Label>
							<Input
								id="custom-type"
								value={customTypeInput}
								onChange={(e) => setCustomTypeInput(e.target.value)}
								placeholder="e.g., Headliner, Panelist, MC"
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										e.preventDefault();
										handleAddCustomType();
									}
								}}
							/>
						</div>
					</div>
					<DialogFooter>
						<Button
							variant="outline"
							onClick={() => {
								setIsDialogOpen(false);
								setCustomTypeInput("");
							}}
						>
							Cancel
						</Button>
						<Button
							onClick={handleAddCustomType}
							disabled={
								!customTypeInput.trim() ||
								allTypes.includes(customTypeInput.trim())
							}
						>
							Add Type
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
