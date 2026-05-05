import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import type { Table } from "@/types/venue";
import { useState } from "react";

interface TableConfig {
	name: string;
	seats: number;
	shape: "round" | "rectangular" | "long-rectangular" | "square" | "booth";
	targetGroup?: string;
	scale: number;
	notes?: string;
	rotation: number;
	mode?: "single" | "multiple";
	quantity?: number;
}

interface EnhancedTableConfigDialogProps {
	table?: Table;
	onSave: (config: TableConfig) => void;
	onClose: () => void;
	isCreating?: boolean;
	availableGroups: string[];
	existingTables?: Table[];
}

const generateNextTableNumber = (existingTables: Table[] = []): number => {
	// Get all existing table names that are just numbers
	const existingTableNumbers = existingTables
		.map((t) => t.name)
		.map((name) => parseInt(name))
		.filter((num) => !isNaN(num));

	// Find the next available number starting from 1
	let nextNumber = 1;
	while (existingTableNumbers.includes(nextNumber)) {
		nextNumber++;
	}

	return nextNumber;
};

const EnhancedTableConfigDialog = ({
	table,
	onSave,
	onClose,
	isCreating = false,
	availableGroups,
	existingTables = [],
}: EnhancedTableConfigDialogProps) => {
	const [config, setConfig] = useState<TableConfig>({
		name: table?.name || (isCreating ? String(generateNextTableNumber(existingTables)) : "1"),
		seats: table?.seats || 8,
		shape: table?.shape || "round",
		targetGroup: table?.targetGroup || "all",
		scale: table?.scale || 1,
		notes: table?.notes || "",
		rotation: table?.rotation || 0,
		mode: isCreating ? "single" : "single",
		quantity: 1,
	});

	const handleSave = () => {
		onSave(config);
	};

	return (
		<Dialog open={true} onOpenChange={onClose}>
			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle>
						{isCreating ? "Create New Table" : "Configure Table"}
					</DialogTitle>
				</DialogHeader>

				<div className="space-y-4">
					{isCreating && (
						<div className="flex items-center justify-between rounded-lg border p-4">
							<div className="space-y-0.5">
								<Label htmlFor="multiple-mode">Create Multiple Tables</Label>
								<p className="text-muted-foreground text-sm">
									Toggle to create multiple tables at once
								</p>
							</div>
							<Switch
								id="multiple-mode"
								checked={config.mode === "multiple"}
								onCheckedChange={(checked) =>
									setConfig({
										...config,
										mode: checked ? "multiple" : "single",
										quantity: checked ? config.quantity || 2 : 1,
									})
								}
							/>
						</div>
					)}

					{isCreating && config.mode === "multiple" && (
						<div>
							<Label htmlFor="quantity">Number of Tables</Label>
							<Input
								id="quantity"
								type="number"
								min="2"
								max="50"
								value={config.quantity || 2}
								onChange={(e) => {
									const value = Math.max(2, Math.min(50, parseInt(e.target.value) || 2));
									setConfig({ ...config, quantity: value });
								}}
								className="mt-2 w-full"
							/>
							<p className="text-muted-foreground mt-1 text-xs">
								Tables will be auto-numbered sequentially (1, 2, 3, ...)
							</p>
						</div>
					)}

					<div>
						<Label htmlFor="shape">Table Shape</Label>
						<Select
							value={config.shape}
							onValueChange={(
								value: "round" | "rectangular" | "long-rectangular",
							) => setConfig({ ...config, shape: value })}
						>
							<SelectTrigger className="w-full">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="round">Round</SelectItem>
								<SelectItem value="rectangular">Rectangular</SelectItem>
								<SelectItem value="long-rectangular">
									Long Rectangular
								</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div>
						<Label htmlFor="seats">Number of Seats: {config.seats}</Label>
						<Slider
							value={[config.seats]}
							onValueChange={(value) =>
								setConfig({ ...config, seats: value[0] })
							}
							max={20}
							min={2}
							step={1}
							className="mt-2"
						/>
					</div>

					<div>
						<Label htmlFor="targetGroup">Target Group</Label>
						<Select
							value={config.targetGroup || "all"}
							onValueChange={(value) =>
								setConfig({ ...config, targetGroup: value })
							}
						>
							<SelectTrigger className="w-full">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Groups</SelectItem>
								{availableGroups
									.filter((group) => group && group.trim())
									.map((group) => (
										<SelectItem key={group} value={group}>
											{group}
										</SelectItem>
									))}
							</SelectContent>
						</Select>
					</div>

					<div>
						<Label htmlFor="notes">Notes (Optional)</Label>
						<Textarea
							id="notes"
							value={config.notes}
							onChange={(e) => setConfig({ ...config, notes: e.target.value })}
							placeholder="Special requirements, accessibility needs, etc."
							rows={3}
						/>
					</div>
				</div>

				<DialogFooter>
					<Button variant="outline" onClick={onClose}>
						Cancel
					</Button>
					<Button onClick={handleSave}>
						{isCreating
							? config.mode === "multiple"
								? `Create ${config.quantity || 2} Tables`
								: "Create Table"
							: "Save Changes"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default EnhancedTableConfigDialog;
