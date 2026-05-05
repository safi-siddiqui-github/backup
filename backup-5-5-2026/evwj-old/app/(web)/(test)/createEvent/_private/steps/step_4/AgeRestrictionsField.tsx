import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Users } from "lucide-react";
import { useEffect, useState } from "react";

type AgeRestrictionsData = {
	hasRestrictions: boolean;
	minAge?: number;
	maxAge?: number;
	requiresGuardian?: boolean;
	customMessage?: string;
	restrictionType?: "minimum" | "maximum" | "range" | "exact";
};

type Props = {
	data?: AgeRestrictionsData;
	onUpdate: (data: AgeRestrictionsData) => void;
};

export default function AgeRestrictionsField({
	data = { hasRestrictions: false },
	onUpdate,
}: Props) {
	const [localData, setLocalData] = useState<AgeRestrictionsData>(data);

	useEffect(() => {
		setLocalData(data);
	}, [data]);

	const handleUpdate = (updates: Partial<AgeRestrictionsData>) => {
		const newData = { ...localData, ...updates };
		setLocalData(newData);
		onUpdate(newData);
	};

	const commonAgeRestrictions = [
		{
			label: "18+ Adults Only",
			description: "Strictly for adults 18 and older",
			minAge: 18,
			type: "minimum",
		},
		{
			label: "21+ Adults Only",
			description: "Must be 21 or older to attend",
			minAge: 21,
			type: "minimum",
		},
		{
			label: "13+ Teenagers & Adults",
			description: "Open to teens and adults",
			minAge: 13,
			type: "minimum",
		},
		{
			label: "All Ages Welcome",
			description: "No age restrictions",
			type: "none",
		},
		{
			label: "Kids Event (Under 12)",
			description: "Designed for children under 12",
			maxAge: 12,
			type: "maximum",
		},
		{
			label: "Family Friendly",
			description: "Children must be with an adult",
			type: "family",
		},
	];

	const isPresetSelected = (preset: any) => {
		if (preset.type === "none") {
			return (
				!localData.minAge && !localData.maxAge && !localData.requiresGuardian
			);
		}
		if (preset.type === "family") {
			return (
				localData.requiresGuardian && !localData.minAge && !localData.maxAge
			);
		}
		if (preset.type === "minimum") {
			return localData.minAge === preset.minAge && !localData.maxAge;
		}
		if (preset.type === "maximum") {
			return localData.maxAge === preset.maxAge && !localData.minAge;
		}
		return false;
	};

	const applyPreset = (preset: any) => {
		if (preset.type === "none") {
			handleUpdate({
				restrictionType: undefined,
				minAge: undefined,
				maxAge: undefined,
				requiresGuardian: false,
			});
		} else if (preset.type === "family") {
			handleUpdate({
				restrictionType: "minimum",
				minAge: undefined,
				maxAge: undefined,
				requiresGuardian: true,
				customMessage: "Children must be accompanied by an adult",
			});
		} else {
			handleUpdate({
				restrictionType: preset.type as any,
				minAge: preset.minAge,
				maxAge: preset.maxAge,
				requiresGuardian: preset.minAge ? preset.minAge < 18 : false,
			});
		}
	};

	return (
		<div className="space-y-4">
			<div className="flex items-center space-x-3">
				<Users className="text-muted-foreground h-5 w-5" />
				<Label htmlFor="age-restrictions" className="text-base font-medium">
					Age Restrictions
				</Label>
				<Switch
					id="age-restrictions"
					checked={localData.hasRestrictions}
					onCheckedChange={(checked) =>
						handleUpdate({ hasRestrictions: checked })
					}
				/>
			</div>

			{localData.hasRestrictions && (
				<Card className="bg-muted/20">
					<CardContent className="space-y-3 pt-4">
						<Label className="text-sm font-medium">
							Select Age Requirement
						</Label>
						<div className="grid grid-cols-1 gap-2">
							{commonAgeRestrictions.map((preset, index) => (
								<button
									key={index}
									type="button"
									className={cn(
										"hover:bg-muted rounded-lg border-2 p-3 text-left text-sm transition-colors",
										isPresetSelected(preset) && "border-primary bg-primary/5",
									)}
									onClick={() => applyPreset(preset)}
								>
									<div className="font-medium">{preset.label}</div>
									{preset.description && (
										<div className="text-muted-foreground mt-0.5 text-xs">
											{preset.description}
										</div>
									)}
								</button>
							))}
						</div>

						{/* Optional custom message only */}
						{(localData.minAge ||
							localData.maxAge ||
							localData.requiresGuardian) && (
							<div className="pt-2">
								<Label className="text-sm">
									Additional Instructions (Optional)
								</Label>
								<Textarea
									value={localData.customMessage || ""}
									onChange={(e) =>
										handleUpdate({ customMessage: e.target.value })
									}
									placeholder="e.g., 'Valid ID required for age verification'"
									className="mt-1"
									rows={2}
								/>
							</div>
						)}
					</CardContent>
				</Card>
			)}
		</div>
	);
};

