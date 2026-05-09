"use client";

import ScheduleConferenceCardDataComponent from "./ScheduleConferenceCardDataComponent";
import ScheduleConferenceTabComponent from "./ScheduleConferenceTabComponent";

export default function ScheduleConferenceComponent() {
	return (
		<div className="flex flex-col gap-4">
			{/*  */}
			<ScheduleConferenceCardDataComponent />
			{/*  */}
			<ScheduleConferenceTabComponent />
			{/*  */}
		</div>
	);
}
