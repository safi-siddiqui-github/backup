"use client";

import ScheduleSimpleCardDataComponent from "./ScheduleSimpleCardDataComponent";
import ScheduleSimpleTimelineComponent from "./ScheduleSimpleTimelineComponent";
import ScheduleSimpleTimelineDayComponent from "./ScheduleSimpleTimelineDayComponent";

export default function ScheduleSimpleComponent() {
	return (
		<div className="flex flex-col gap-4">
			{/*  */}
			<ScheduleSimpleCardDataComponent />
			{/*  */}
			<ScheduleSimpleTimelineComponent />
			{/*  */}
			<ScheduleSimpleTimelineDayComponent />
			{/*  */}
		</div>
	);
}
