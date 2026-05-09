import { Pencil, Trash2 } from 'lucide-react';

export default function BlockActions({
	onEdit,
	onDelete,
}: {
	onEdit: () => void;
	onDelete: () => void;
}) {
	return (
		// Hidden by default; shown when an ancestor with `group` is hovered
		<div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none group-hover:pointer-events-auto">
			<button
				type="button"
				onMouseDown={(e) => e.stopPropagation()}
				onPointerDown={(e) => e.stopPropagation()}
				onClick={(e) => {
					e.stopPropagation();
					onEdit();
				}}
				className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 p-1 text-gray-700 shadow-sm hover:bg-white dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 cursor-pointer"
				title="Edit block"
				aria-label="Edit block"
			>
				<Pencil size={16} />
			</button>
			<button
				type="button"
				onMouseDown={(e) => e.stopPropagation()}
				onPointerDown={(e) => e.stopPropagation()}
				onClick={(e) => {
					e.stopPropagation();
					onDelete();
				}}
				className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 p-1 text-red-600 shadow-sm hover:bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-red-900/30 cursor-pointer"
				title="Delete block"
				aria-label="Delete block"
			>
				<Trash2 size={16} />
			</button>
		</div>
	);
}

