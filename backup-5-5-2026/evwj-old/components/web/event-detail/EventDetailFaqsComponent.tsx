"use client";

import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Accordion } from "@radix-ui/react-accordion";
import { useMemo } from "react";

export default function EventDetailFaqsComponent() {
	const faqData = useMemo(
		() => [
			{
				question: "What is this question one?",
				answer: "What you see!",
			},
			{
				question: "What is this question two?",
				answer: "What you see!",
			},
			{
				question: "What is this question three?",
				answer: "What you see!",
			},
		],
		[],
	);
	return (
		<div className="flex flex-col">
			<Accordion
				type="single"
				collapsible
				className=""
				// defaultValue="0"
			>
				{faqData?.map((item, index) => (
					<AccordionItem key={index} value={String(index)}>
						<AccordionTrigger>{item?.question}</AccordionTrigger>
						<AccordionContent>{item?.answer}</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	);
}
