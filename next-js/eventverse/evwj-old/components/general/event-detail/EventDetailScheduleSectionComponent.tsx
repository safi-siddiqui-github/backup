export default function EventDetailScheduleSectionComponent({
	slug,
}: {
	slug?: string;
}) {
	return (
		<div className="flex flex-col gap-6">
			<div className="flex flex-col gap-4">
				<h3 className="text-2xl font-semibold">Event Schedule</h3>
				<div className="flex flex-col gap-4">
					{Array.from({ length: 4 }).map((_, index) => (
						<div
							key={index}
							className="flex flex-col gap-2 border-l-2 border-purple-500 pl-4"
						>
							<p className="text-sm font-medium text-gray-400">11:50 AM</p>
							<p className="text-lg font-semibold">Registration & Welcome</p>
							<p className="text-sm text-gray-300">
								Check in and collect your event materials
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
