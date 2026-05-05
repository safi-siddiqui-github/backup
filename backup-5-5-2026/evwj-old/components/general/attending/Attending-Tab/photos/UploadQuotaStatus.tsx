import React from "react";
import { Upload } from "lucide-react";

const UploadQuotaStatus: React.FC<{ count: number }> = ({ count }) => (
	<div className="flex items-center text-sm font-medium text-gray-600 py-3 sm:py-0 dark:text-gray-300">
		<Upload className="w-4 h-4 mr-1 text-green-600 dark:text-green-400" />
		<span className="text-gray-900 font-semibold dark:text-white">
			Upload Photos
		</span>
		<span className="ml-2 text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">
			{count} left
		</span>
	</div>
);

export default UploadQuotaStatus;
