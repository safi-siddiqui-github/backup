import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ImageIcon, X } from "lucide-react";
import { useState } from "react";

interface EventPhotosGalleryProps {
	photos: string[];
}

export const EventPhotosGallery = ({ photos }: EventPhotosGalleryProps) => {
	const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

	if (!photos || photos.length === 0) {
		return (
			<Card>
				<div className="py-12 text-center">
					<ImageIcon className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
					<p className="text-muted-foreground">No photos added yet</p>
				</div>
			</Card>
		);
	}

	return (
		<>
			<div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
				{photos.map((photo, index) => (
					<Card
						key={index}
						className="group cursor-pointer overflow-hidden transition-all hover:shadow-lg"
						onClick={() => setSelectedPhoto(photo)}
					>
						<div className="relative aspect-square">
							<img
								src={photo}
								alt={`Event photo ${index + 1}`}
								className="h-full w-full object-cover transition-transform group-hover:scale-105"
							/>
							<div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
						</div>
					</Card>
				))}
			</div>

			{/* Lightbox Dialog */}
			<Dialog
				open={!!selectedPhoto}
				onOpenChange={() => setSelectedPhoto(null)}
			>
				<DialogContent className="max-w-4xl p-0">
					<div className="relative">
						<Button
							variant="ghost"
							size="icon"
							className="bg-background/80 hover:bg-background absolute top-2 right-2 z-10"
							onClick={() => setSelectedPhoto(null)}
						>
							<X className="h-4 w-4" />
						</Button>
						{selectedPhoto && (
							<img
								src={selectedPhoto}
								alt="Selected event photo"
								className="h-auto max-h-[80vh] w-full object-contain"
							/>
						)}
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
};
