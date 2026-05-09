import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

type CheckInTimeData = {
	hasCustomCheckIn: boolean;
	checkInTime?: string;
	checkInInstructions?: string;
};

type Props = {
	data?: CheckInTimeData;
	onUpdate: (data: CheckInTimeData) => void;
};

export default function CheckInTimeField({
	data = { hasCustomCheckIn: false },
	onUpdate,
}: Props) {
	const [localData, setLocalData] = useState<CheckInTimeData>(data);

	useEffect(() => {
		setLocalData(data);
	}, [data]);

	const handleUpdate = (updates: Partial<CheckInTimeData>) => {
		const newData = { ...localData, ...updates };
		setLocalData(newData);
		onUpdate(newData);
	};

	return (
		<div className="space-y-4">
			<div className="flex items-center space-x-3">
				<Clock className="text-muted-foreground h-5 w-5" />
				<Label htmlFor="check-in-time" className="text-base font-medium">
					Check-in Time & Instructions
				</Label>
				<Switch
					id="check-in-time"
					checked={localData.hasCustomCheckIn}
					onCheckedChange={(checked) =>
						handleUpdate({ hasCustomCheckIn: checked })
					}
				/>
			</div>

			{localData.hasCustomCheckIn && (
				<Card className="bg-muted/20">
					<CardContent className="space-y-4 pt-4">
						<div>
							<Label className="text-sm font-medium">Check-in Time</Label>
							<Input
								type="time"
								value={localData.checkInTime || ""}
								onChange={(e) => handleUpdate({ checkInTime: e.target.value })}
								className="mt-1"
							/>
							<p className="text-muted-foreground mt-1 text-xs">
								What time should guests arrive?
							</p>
						</div>

						<div>
							<Label className="text-sm font-medium">
								Check-in Instructions (Optional)
							</Label>
							<Textarea
								value={localData.checkInInstructions || ""}
								onChange={(e) =>
									handleUpdate({ checkInInstructions: e.target.value })
								}
								placeholder="e.g., 'Check-in at the main entrance with your ticket'"
								className="mt-1"
								rows={3}
							/>
						</div>
					</CardContent>
				</Card>
			)}
		</div>
	);
};

