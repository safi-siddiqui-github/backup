import React from "react";
import { Camera, Upload } from "lucide-react";

const EmptyUploadsState: React.FC<{ onOpenUpload: () => void }> = ({
	onOpenUpload,
}) => (
	<div className="flex flex-col items-center justify-center min-h-[400px] w-full p-8 bg-white rounded-xl dark:bg-[#090a11]">
		<div className="p-4 bg-indigo-100 rounded-full mb-6 dark:bg-indigo-900/30">
			<Camera className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
		</div>

		<p className="text-lg font-bold text-gray-800 mb-2 dark:text-white">
			No photos yet
		</p>
		<p className="text-sm text-gray-500 mb-6 text-center dark:text-gray-400">
			Upload your first photo to share your memories
		</p>
		<button
			onClick={onOpenUpload}
			className="flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold text-sm rounded-full shadow-lg hover:bg-indigo-700 transition duration-150 transform hover:scale-[1.02]"
		>
			<Upload className="w-4 h-4 mr-2" />
			Upload Photos
		</button>
	</div>
);

export default EmptyUploadsState;
