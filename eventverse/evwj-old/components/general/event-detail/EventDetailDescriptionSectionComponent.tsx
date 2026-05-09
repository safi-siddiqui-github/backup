import { Button } from "@/components/ui/button";

export default function EventDetailDescriptionSectionComponent() {
	return (
		<div className="flex flex-col gap-8">
			{/*  */}

			{/*  */}
			<div className="flex flex-col gap-2">
				{/*  */}

				{/*  */}
				<p className="text-2xl font-semibold">Summer Music Festival 2025</p>
				{/*  */}

				{/*  */}
				<Button variant={"outline"} className="text-primary w-fit rounded-full">
					Music
				</Button>
				{/*  */}

				{/*  */}
			</div>
			{/*  */}

			{/*  */}
			<div className="flex flex-col gap-4 p-2">
				{/*  */}

				{/*  */}
				<p className="max-w-sm tracking-tight">
					Enjoy an evening of smooth jazz performances by local and
					international artists. Dinner packages available.
				</p>
				{/*  */}

				{/*  */}
				<div className="flex flex-col">
					{/*  */}

					{/*  */}
					<p className="font-semibold">What you will get</p>
					{/*  */}

					{/*  */}
					<ul className="flex flex-col indent-2.5">
						{/*  */}
						<li className="list-inside list-disc">
							Access to all event activities
						</li>
						{/*  */}
						<li className="list-inside list-disc">
							Networking opportunities with like-minded people
						</li>
						{/*  */}
						<li className="list-inside list-disc">
							Certificate of participation
						</li>
						{/*  */}
					</ul>
					{/*  */}

					{/*  */}
				</div>
				{/*  */}

				{/*  */}
				<div className="flex flex-col">
					{/*  */}

					{/*  */}
					<p className="font-semibold">Who should attend </p>
					{/*  */}

					{/*  */}
					<ul className="flex flex-col indent-2.5">
						{/*  */}

						{/*  */}
						<li className="list-inside list-disc">
							Enthusiasts and professionals in the field
						</li>
						{/*  */}
						<li className="list-inside list-disc">
							People looking to expand their network
						</li>
						{/*  */}
						<li className="list-inside list-disc">
							Anyone interested in learning more about Music
						</li>
						{/*  */}

						{/*  */}
					</ul>
					{/*  */}

					{/*  */}
				</div>
				{/*  */}

				{/*  */}
			</div>
			{/*  */}

			{/*  */}
			<div className="flex flex-col gap-4">
				{/*  */}

				{/*  */}
				<p className="text-lg font-semibold">Event Schedule</p>
				{/*  */}

				{/*  */}
				{Array.from("1234")?.map((item, index) => {
					return (
						<div key={index}>
							<p>11:50 AM</p>
							<p className="font-semibold">Registration & Welcome</p>
							<p>
								11:50 AM Registration & Welcome Check in and collect your event
								materials
							</p>
						</div>
					);
				})}
				{/*  */}

				{/*  */}
			</div>
			{/*  */}

			{/*  */}
		</div>
	);
}
