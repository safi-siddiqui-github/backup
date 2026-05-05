import { Card, CardContent } from "@/components/ui/card";
import { Images } from "lucide-react";
import { EventFormData } from "./PreviewCreateEventV2Component";
import EventPhotoUpload from "./EventPhotoUpload";
// import EventPhotoUpload from "../event-creation/EventPhotoUpload";
// import { EventFormData } from "../EnhancedEventCreationDialog";

interface PhotoGallerySectionProps {
	formData: EventFormData;
	onUpdate: (updates: Partial<EventFormData>) => void;
}

const PhotoGallerySection = ({
	formData,
	onUpdate,
}: PhotoGallerySectionProps) => {
	const handlePhotosUpdate = (
		photos: EventFormData["eventPhotos"]["additionalPhotos"],
	) => {
		onUpdate({
			eventPhotos: {
				...formData.eventPhotos,
				additionalPhotos: photos,
				// Auto-set first photo as main if not set
				mainPhoto:
					formData.eventPhotos.mainPhoto ||
					(photos.length > 0 ? photos[0].id : null),
			},
		});
	};

	return (
		<div className="space-y-4">
			<div className="flex items-center gap-3 mb-4">
				<div className="p-2.5 rounded-lg bg-primary/8">
					<Images className="w-5 h-5 text-primary" />
				</div>
				<div>
					<h3 className="text-lg font-semibold">Event Photo Collage</h3>
					<p className="text-sm text-muted-foreground">
						Upload photos to showcase your event (optional)
					</p>
				</div>
			</div>

			{/* Info card about collage */}
			<Card className="border border-primary/20 bg-primary/5 dark:bg-primary/10 !bg-white dark:!bg-slate-800/95 backdrop-blur-sm [background-color:white] dark:[background-color:rgb(30_41_59/0.95)]">
				<CardContent className="p-3">
					<div className="flex gap-3">
						<Images className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
						<p className="text-xs text-muted-foreground">
							These photos will be displayed as a collage on your event page.
							The first photo will be used as the main cover image.
						</p>
					</div>
				</CardContent>
			</Card>

			<EventPhotoUpload
				onPhotosUpdate={handlePhotosUpdate}
				existingPhotos={formData.eventPhotos?.additionalPhotos || []}
				maxPhotos={formData.eventPhotos?.maxPhotos || 10}
			/>
		</div>
	);
};

export default PhotoGallerySection;
