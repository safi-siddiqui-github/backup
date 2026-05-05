import { CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export default function EventDetailLocationSectionComponent() {
	return (
		<div className="flex flex-col gap-4">
			{/*  */}

			{/*  */}
			<CardTitle className="text-2xl lg:text-3xl">Location</CardTitle>
			{/*  */}

			{/*  */}
			<div className="flex flex-col gap-2">
				{/*  */}

				{/*  */}
				<p className="flex gap-2">
					<MapPin className="text-primary" />
					<span className="font-medium">Central Park, New York</span>
				</p>
				{/*  */}

				{/*  */}
				<p className="tracking-tight">
					Full address and directions will be provided after registration
				</p>
				{/*  */}

				{/*  */}
			</div>
			{/*  */}

			{/*  */}
			<div className="bg-foreground text-background flex h-96 flex-col items-center justify-center gap-2 rounded">
				<div className="flex items-center gap-2">
					<MapPin />
					<span>Map loading...</span>
				</div>
			</div>
			{/*  */}

			{/*  */}
		</div>
	);
}
