import React, { useRef } from "react";

type Props = {
	open: boolean;
	onClose: () => void;
	onUpload?: (file: File) => void;
	onSelfie?: (file: File) => void;
};

export default function FindMeModal({
	open,
	onClose,
	onUpload,
	onSelfie,
}: Props) {
	const uploadRef = useRef<HTMLInputElement | null>(null);
	const selfieRef = useRef<HTMLInputElement | null>(null);

	if (!open) return null;

	const handleUploadClick = () => {
		uploadRef.current?.click();
	};

	const handleSelfieClick = () => {
		selfieRef.current?.click();
	};

	const handleUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) onUpload?.(file);
		// reset
		e.currentTarget.value = "";
		onClose();
	};

	const handleSelfieChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) onSelfie?.(file);
		e.currentTarget.value = "";
		onClose();
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			<div className="absolute inset-0 bg-black/50" onClick={onClose} />

			<div className="relative z-10 w-full max-w-lg rounded-xl bg-white text-gray-900 dark:bg-[#090a11] dark:text-gray-100 shadow-2xl p-6">
				<h3 className="text-lg font-semibold">Find Me in Photos</h3>
				<p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
					Upload a clear photo of your face or take a selfie to find all photos
					you appear in
				</p>

				<div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
					<button
						onClick={handleUploadClick}
						className="w-full rounded-md px-4 py-2 bg-white text-gray-800 shadow-sm hover:shadow-md dark:bg-[#070b1c] dark:text-gray-100"
						aria-label="Upload photo"
					>
						Upload Photo
					</button>

					<button
						onClick={handleSelfieClick}
						className="w-full rounded-md px-4 py-2 bg-linear-to-r from-[#9133f4] via-[#218ac0] to-[#666fd7] text-white font-semibold shadow-sm hover:opacity-95"
						aria-label="Take selfie"
					>
						Take Selfie
					</button>
				</div>

				{/* Hidden inputs (accessible via aria labels) */}
				<input
					ref={uploadRef}
					type="file"
					accept="image/*"
					onChange={handleUploadChange}
					aria-label="Upload photo for face match"
					title="Upload photo for face match"
					className="hidden"
				/>

				<input
					ref={selfieRef}
					type="file"
					accept="image/*"
					onChange={handleSelfieChange}
					aria-label="Take selfie for face match"
					title="Take selfie for face match"
					className="hidden"
				/>
			</div>
		</div>
	);
}
