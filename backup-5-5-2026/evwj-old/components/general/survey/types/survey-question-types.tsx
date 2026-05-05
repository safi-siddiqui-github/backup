"use client";

import { FiStar, FiCheckSquare, FiAlignLeft } from "react-icons/fi";
import type { QuestionTypeOption } from "./survey-types";

export const questionTypes: QuestionTypeOption[] = [
	{
		type: "multiple-choice",
		label: "Multiple Choice",
		description: "Select one option from a list",
		icon: <FiCheckSquare className="w-5 h-5" />,
	},
	{
		type: "checkboxes",
		label: "Checkboxes",
		description: "Select multiple options",
		icon: <FiCheckSquare className="w-5 h-5" />,
	},
	{
		type: "text",
		label: "Short Text",
		description: "Brief text response",
		icon: <FiAlignLeft className="w-5 h-5" />,
	},
	{
		type: "rating",
		label: "Rating Scale",
		description: "Rate on a scale (1–5 stars)",
		icon: <FiStar className="w-5 h-5" />,
	},
];
