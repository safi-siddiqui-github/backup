"use client";

type QRCodeSectionProps = {
	qrCanvasRef: React.RefObject<HTMLCanvasElement | null>;
};

export default function QRCodeSection({ qrCanvasRef }: QRCodeSectionProps) {
	return (
		<div className="flex-shrink-0">
			<div className="!bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617] p-6 rounded-xl border-2 border-gray-200 dark:border-slate-600 shadow-xl">
				<canvas ref={qrCanvasRef} className="w-48 h-48 mx-auto rounded-lg" />
			</div>
			<p className="text-sm text-gray-600 dark:text-slate-400 mt-4 text-center max-w-[240px] mx-auto">
				Guests can scan this code with their phone camera to access the survey
				instantly
			</p>
		</div>
	);
}
