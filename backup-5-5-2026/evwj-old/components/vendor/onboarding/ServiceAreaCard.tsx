"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Edit, Trash2 } from "lucide-react";

export type ServiceArea = {
	country: string;
	state: string;
	city: string;
	radius: number;
};

export default function ServiceAreaCard({
	area,
	onEdit,
	onDelete,
}: {
	area: ServiceArea;
	onEdit: () => void;
	onDelete: () => void;
}) {
	return (
		<Card className="border-border">
			<CardContent className="p-4">
				<div className="flex items-start justify-between gap-4">
					<div className="flex-1">
						<div className="space-y-1">
							<p className="font-medium">
								{area.city}, {area.state}
							</p>
							<p className="text-sm text-muted-foreground">
								{area.country}
							</p>
							<p className="text-sm text-muted-foreground">
								Service radius: {area.radius} miles
							</p>
						</div>
					</div>
					<div className="flex gap-2">
						<Button
							type="button"
							variant="outline"
							size="icon"
							onClick={onEdit}
						>
							<Edit className="h-4 w-4" />
						</Button>
						<Button
							type="button"
							variant="outline"
							size="icon"
							onClick={onDelete}
						>
							<Trash2 className="h-4 w-4" />
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

