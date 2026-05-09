import ExpandableEventDetails from "./ExpandableEventDetails";
import { EventFormData } from "./PreviewCreateEventV2Component";

interface OptionalDetailsProps {
	formData: EventFormData;
	onUpdate: (updates: Partial<EventFormData>) => void;
}

const OptionalDetails = ({ formData, onUpdate }: OptionalDetailsProps) => {
	return (
		<div className="space-y-4">
			<ExpandableEventDetails formData={formData} onUpdate={onUpdate} />
		</div>
	);
};

export default OptionalDetails;
