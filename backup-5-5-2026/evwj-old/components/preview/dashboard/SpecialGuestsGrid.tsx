import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";

interface SpecialGuest {
	name: string;
	title?: string;
	bio?: string;
	photo?: string;
	credentials?: string[];
}

interface SpecialGuestsGridProps {
	guests: SpecialGuest[];
}

export const SpecialGuestsGrid = ({ guests }: SpecialGuestsGridProps) => {
	if (!guests || guests.length === 0) {
		return (
			<Card>
				<CardContent className="py-12 text-center">
					<User className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
					<p className="text-muted-foreground">No special guests added yet</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{guests.map((guest, index) => (
				<Card
					key={index}
					className="overflow-hidden transition-shadow hover:shadow-lg"
				>
					<CardHeader className="pb-4">
						<div className="flex items-start gap-4">
							{guest.photo ? (
								<img
									src={guest.photo}
									alt={guest.name}
									className="border-border h-16 w-16 rounded-full border-2 object-cover"
								/>
							) : (
								<div className="bg-muted border-border flex h-16 w-16 items-center justify-center rounded-full border-2">
									<User className="text-muted-foreground h-8 w-8" />
								</div>
							)}
							<div className="min-w-0 flex-1">
								<CardTitle className="mb-1 truncate text-lg">
									{guest.name}
								</CardTitle>
								{guest.title && (
									<p className="text-muted-foreground text-sm">{guest.title}</p>
								)}
							</div>
						</div>
					</CardHeader>
					<CardContent className="space-y-3">
						{guest.bio && (
							<p className="text-muted-foreground line-clamp-3 text-sm">
								{guest.bio}
							</p>
						)}
						{guest.credentials && guest.credentials.length > 0 && (
							<div className="flex flex-wrap gap-2">
								{guest.credentials.map((credential, idx) => (
									<Badge key={idx} variant="secondary" className="text-xs">
										{credential}
									</Badge>
								))}
							</div>
						)}
					</CardContent>
				</Card>
			))}
		</div>
	);
};
