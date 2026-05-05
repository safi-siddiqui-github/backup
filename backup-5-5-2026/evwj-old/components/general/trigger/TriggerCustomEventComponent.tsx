"use client";
import { CustomEventDetail, CustomEventType } from "@/type";
import { ReactNode } from "react";

type Props = {
	children?: ReactNode;
	eventType?: CustomEventType;
	eventDetail?: CustomEventDetail;
};
export default function TriggerCustomEventComponent(props: Props) {
	//
	const { children, eventType, eventDetail } = props;
	//
	const handleEventDispatch = () => {
		//
		if (eventType) {
			//
			window.dispatchEvent(
				new CustomEvent<CustomEventDetail>(eventType, {
					detail: eventDetail,
				}),
			);
			//
		}
		//
	};
	//
	return <div onClick={handleEventDispatch}>{children}</div>;
}
