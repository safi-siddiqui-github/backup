import React from "react";
import { StatCardProps } from "./types";

const StatCard: React.FC<StatCardProps> = ({
	icon: Icon,
	title,
	value,
	colorClass = "",
}) => (
	<div className="flex flex-col p-4 sm:p-6 bg-white rounded-xl shadow-sm transition-all duration-300 hover:shadow-md dark:bg-[#090a11]">
		<div className={`flex items-center text-lg font-semibold ${colorClass}`}>
			<Icon className="w-5 h-5 mr-2" />
			{value}
		</div>
		<div className="text-sm text-gray-500 mt-1 dark:text-gray-400">{title}</div>
	</div>
);

export default StatCard;
