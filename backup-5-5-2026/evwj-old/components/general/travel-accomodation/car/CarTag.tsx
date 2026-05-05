export default function CarTag({ text }: { text: string }) {
	return (
		<span className="text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
			{text}
		</span>
	);
}
