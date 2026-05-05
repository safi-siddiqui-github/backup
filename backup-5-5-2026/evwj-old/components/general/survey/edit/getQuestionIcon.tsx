"use client";

import {
	BsStarFill,
	BsListUl,
	BsCheckSquare,
	BsFileText,
} from "react-icons/bs";

const getQuestionIcon = (type: string) => {
	const key = (type || "").toLowerCase().replace(/\s+/g, "").replace(/-/g, "");
	switch (key) {
		case "rating":
			return <BsStarFill className="w-4 h-4 mr-1.5 text-yellow-400" />;
		case "multiplechoice":
			return <BsListUl className="w-4 h-4 mr-1.5 text-indigo-500" />;
		case "checkbox":
		case "checkboxes":
			return <BsCheckSquare className="w-4 h-4 mr-1.5 text-green-500" />;
		case "text":
			return <BsFileText className="w-4 h-4 mr-1.5 text-gray-500" />;
		default:
			return null;
	}
};

export default getQuestionIcon;
