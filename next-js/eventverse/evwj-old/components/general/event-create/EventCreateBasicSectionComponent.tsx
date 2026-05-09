import EventCreateBasicAdditionalSectionComponent from "./EventCreateBasicAdditionalSectionComponent";
import EventCreateBasicDateSectionComponent from "./EventCreateBasicDateSectionComponent";
import EventCreateBasicDescriptionSectionComponent from "./EventCreateBasicDescriptionSectionComponent";
import EventCreateBasicNameSectionComponent from "./EventCreateBasicNameSectionComponent";
import EventCreateBasicRecurringSectionComponent from "./EventCreateBasicRecurringSectionComponent";
import EventCreateBasicTypeSectionComponent from "./EventCreateBasicTypeSectionComponent";
import EventCreateBasicVenueSectionComponent from "./EventCreateBasicVenueSectionComponent";

export default function EventCreateBasicSectionComponent() {
	//
	return (
		<div className="flex flex-col gap-6">
			{/*  */}

			{/*  */}
			<EventCreateBasicNameSectionComponent />
			{/*  */}

			{/*  */}
			<EventCreateBasicDescriptionSectionComponent />
			{/*  */}

			{/*  */}
			<EventCreateBasicTypeSectionComponent />
			{/*  */}

			{/*  */}
			<EventCreateBasicDateSectionComponent />
			{/*  */}

			{/*  */}
			<EventCreateBasicRecurringSectionComponent />
			{/*  */}

			{/*  */}
			<EventCreateBasicVenueSectionComponent />
			{/*  */}

			{/*  */}
			<EventCreateBasicAdditionalSectionComponent />
			{/*  */}

			{/*  */}
		</div>
	);
}
