import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
	Building2,
	Calendar,
	ChevronDown,
	Globe,
	Info,
	Lock,
	MapPin,
	User,
	Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { EventFormData } from "../../types/types";
import HeadingAndVisibility from "./heading&visibility";
import EssentialDetails from "./event-details";
import EventDateTime from "./event-date-time";
// import DateTimeManagerV2 from "./DateTimeManagerV2";
// import { EnhancedDescriptionEditor } from "./EnhancedDescriptionEditor";
// import LocationManagerV2 from "./LocationManagerV2";
// import { EventFormData } from "./PreviewCreateEventV2Component";

type Step_1Props = {
	formData: EventFormData;
	onUpdate: (updates: Partial<EventFormData>) => void;
}

export type OpenSections = {
	basicInfo: boolean;
	description: boolean;
	dateTime: boolean;
	location: boolean;
};

const Step_1 = ({ formData, onUpdate }: Step_1Props) => {
	const [openSections, setOpenSections] = useState<OpenSections>({
		basicInfo: true,
		description: false,
		dateTime: false,
		location: false,
	});
	const [organizations, setOrganizations] = useState<any[]>([]);
	const [isLoadingOrgs, setIsLoadingOrgs] = useState(false);

	useEffect(() => {
		const loadOrganizations = async () => {
			setIsLoadingOrgs(true);
		 
			setIsLoadingOrgs(false);
		};
		loadOrganizations();
	}, []);

	const handleSkipLocation = () => {
		// Reset location to default empty state
		onUpdate({
			locations: [
				{
					id: "1",
					name: "",
					address: "",
					type: "physical",
					source: "manual",
					sections: [],
				},
			],
		});
		// Collapse the location section
		setOpenSections((prev) => ({ ...prev, location: false }));
	};

	return (
		<div className=" ">
			{/* Basic Info Section */}
			<HeadingAndVisibility
				formData={formData}
				onUpdate={onUpdate}
				openSections={openSections}
				setOpenSections={setOpenSections}
				organizations={organizations}
				isLoadingOrgs={isLoadingOrgs}
			/>

			<EssentialDetails
				formData={formData}
				onUpdate={onUpdate}
				openSections={openSections}
				setOpenSections={setOpenSections}
				 
			/>

			<EventDateTime
				formData={formData}
				onUpdate={onUpdate}
				openSections={openSections}
				setOpenSections={setOpenSections}
			/>
			

		 
		</div>
	);
};

export default Step_1;
