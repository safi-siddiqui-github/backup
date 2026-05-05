import React from "react";

type Props = {
	open: boolean;
	onClose: () => void;
	availableTags: string[];
	availableAlbums: string[];
	availableUploaders: { name: string; count: number }[];
	selected: {
		tags: string[];
		albums: string[];
		uploaders: string[];
	};
	onChange: (next: {
		tags: string[];
		albums: string[];
		uploaders: string[];
	}) => void;
};

export default function FiltersModal({
	open,
	onClose,
	availableTags,
	availableAlbums,
	availableUploaders,
	selected,
	onChange,
}: Props) {
	if (!open) return null;

	const toggle = (list: string[], val: string) => {
		return list.includes(val) ? list.filter((x) => x !== val) : [...list, val];
	};

	const setTag = (t: string) =>
		onChange({ ...selected, tags: toggle(selected.tags, t) });
	const setAlbum = (a: string) =>
		onChange({ ...selected, albums: toggle(selected.albums, a) });
	const setUploader = (u: string) =>
		onChange({ ...selected, uploaders: toggle(selected.uploaders, u) });

	const clearAll = () => onChange({ tags: [], albums: [], uploaders: [] });

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			<div className="absolute inset-0 bg-black/40" onClick={onClose} />
			<div className="relative z-10 max-w-2xl w-full bg-white dark:bg-[#090a11] text-gray-900 dark:text-gray-100 rounded-xl shadow-2xl p-6">
				<div className="flex items-start justify-between">
					<div>
						<h3 className="text-lg font-semibold">Filters</h3>
						<p className="text-sm text-gray-600 dark:text-gray-300">
							Refine the gallery by tag, album or uploader
						</p>
					</div>
					<div className="flex items-center gap-2">
						<button
							onClick={clearAll}
							className="text-sm px-3 py-1 rounded bg-gray-100 dark:bg-[#070b1c]"
						>
							Clear
						</button>
						<button
							onClick={onClose}
							className="text-sm px-3 py-1 rounded bg-gray-100 dark:bg-[#070b1c]"
						>
							Close
						</button>
					</div>
				</div>

				<div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
					<div>
						<div className="text-sm font-medium mb-2">Tags</div>
						<div className="flex flex-wrap gap-2">
							{availableTags.length === 0 && (
								<div className="text-xs text-gray-500 dark:text-gray-400">
									No tags
								</div>
							)}
							{availableTags.map((t) => (
								<button
									key={t}
									onClick={() => setTag(t)}
									className={`text-xs px-3 py-1 rounded-full ${selected.tags.includes(t) ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 dark:bg-[#070b1c] dark:text-gray-200"}`}
								>
									{t}
								</button>
							))}
						</div>
					</div>

					<div>
						<div className="text-sm font-medium mb-2">Albums</div>
						<div className="flex flex-col gap-2">
							{availableAlbums.length === 0 && (
								<div className="text-xs text-gray-500 dark:text-gray-400">
									No albums
								</div>
							)}
							{availableAlbums.map((a) => (
								<label key={a} className="inline-flex items-center gap-2">
									<input
										type="checkbox"
										checked={selected.albums.includes(a)}
										onChange={() => setAlbum(a)}
									/>
									<span className="text-sm">{a}</span>
								</label>
							))}
						</div>
					</div>

					<div>
						<div className="text-sm font-medium mb-2">Uploaded By</div>
						<div className="flex flex-col gap-2">
							{availableUploaders.length === 0 && (
								<div className="text-xs text-gray-500 dark:text-gray-400">
									No uploaders
								</div>
							)}
							{availableUploaders.map((u) => (
								<label
									key={u.name}
									className="inline-flex items-center justify-between w-full"
								>
									<div className="inline-flex items-center gap-2">
										<input
											type="checkbox"
											checked={selected.uploaders.includes(u.name)}
											onChange={() => setUploader(u.name)}
										/>
										<span className="text-sm">{u.name}</span>
									</div>
									<div className="text-xs text-gray-500">{`(${u.count})`}</div>
								</label>
							))}
						</div>
					</div>
				</div>

				<div className="mt-6 flex justify-end">
					<button
						onClick={onClose}
						className="px-4 py-2 rounded-md bg-indigo-600 text-white"
					>
						Apply
					</button>
				</div>
			</div>
		</div>
	);
}
