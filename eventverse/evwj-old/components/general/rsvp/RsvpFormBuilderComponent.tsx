"use client";

import RsvpFormBuilderCanvasComponent from "./RsvpFormBuilderCanvasComponent";
import RsvpFormBuilderFieldLibraryComponent from "./RsvpFormBuilderFieldLibraryComponent";

export default function RsvpFormBuilderComponent() {
	//
	// const rsvpSlug = props.rsvpSlug;
	//
	return (
		<div className="flex flex-col gap-6 lg:flex-row">
			{/*  */}

			{/*  */}
			<div className="flex flex-col lg:max-w-sm lg:flex-1">
				<RsvpFormBuilderFieldLibraryComponent />
			</div>
			{/*  */}

			{/*  */}
			<div className="flex flex-col lg:flex-1">
				<RsvpFormBuilderCanvasComponent />
			</div>
			{/*  */}

			{/*  */}
		</div>
	);
}
