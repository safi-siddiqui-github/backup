import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Car } from "lucide-react";
import { useEffect, useState } from "react";

type ParkingInfoData = {
	hasParkingInfo: boolean;
	details?: string;
	mapUrl?: string;
};

type Props = {
	data?: ParkingInfoData;
	onUpdate: (data: ParkingInfoData) => void;
};

export default function ParkingInfoField({
	data = { hasParkingInfo: false },
	onUpdate,
}: Props) {
	const [localData, setLocalData] = useState<ParkingInfoData>(data);

	useEffect(() => {
		setLocalData(data);
	}, [data]);

	const handleUpdate = (updates: Partial<ParkingInfoData>) => {
		const newData = { ...localData, ...updates };
		setLocalData(newData);
		onUpdate(newData);
	};

	return (
		<div className="space-y-4">
			<div className="flex items-center space-x-3">
				<Car className="text-muted-foreground h-5 w-5" />
				<Label htmlFor="parking-info" className="text-base font-medium">
					Parking Information
				</Label>
				<Switch
					id="parking-info"
					checked={localData.hasParkingInfo}
					onCheckedChange={(checked) =>
						handleUpdate({ hasParkingInfo: checked })
					}
				/>
			</div>

			{localData.hasParkingInfo && (
				<Card className="bg-muted/20">
					<CardContent className="space-y-4 pt-4">
						<div>
							<Label className="text-sm font-medium">Parking Details</Label>
							<Textarea
								value={localData.details || ""}
								onChange={(e) => handleUpdate({ details: e.target.value })}
								placeholder="e.g., 'Free parking available in Lot A. Paid parking ($10) at nearby garage on Main St.'"
								className="mt-1"
								rows={3}
							/>
							<p className="text-muted-foreground mt-1 text-xs">
								Include availability, cost, and location information
							</p>
						</div>

						<div>
							<Label className="text-sm font-medium">
								Parking Map URL (Optional)
							</Label>
							<Input
								type="url"
								value={localData.mapUrl || ""}
								onChange={(e) => handleUpdate({ mapUrl: e.target.value })}
								placeholder="https://maps.google.com/..."
								className="mt-1"
							/>
						</div>
					</CardContent>
				</Card>
			)}
		</div>
	);
};

