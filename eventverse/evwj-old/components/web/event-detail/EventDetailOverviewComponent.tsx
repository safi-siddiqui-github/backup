"use client";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import EventDetailAboutComponent from "./EventDetailAboutComponent";

export default function EventDetailOverviewComponent() {
	// const [showMore, setShowMore] = useState(false);
	// const toggleShowMore = useCallback(() => {
	//   setShowMore(!showMore);
	// }, [showMore]);
	return (
		<div className="flex flex-col">
			<div className="flex flex-col gap-4">
				{/* <p className="text-lg font-semibold tracking-tight md:text-xl lg:text-2xl">
          Overview
        </p> */}
				<EventDetailAboutComponent />
				<div
					className={cn("flex flex-col gap-4 overflow-hidden", {
						// "max-h-fit": showMore,
					})}
				>
					<p className="text-sm tracking-tight">
						Enjoy an evening of smooth jazz performances by local and
						international artists. Dinner packages available.
					</p>
					<div className="flex flex-col gap-1">
						<p className="font-medium">What you'll get</p>
						<ul className="flex flex-col">
							<li className="list-inside list-disc">
								Access to all event activities
							</li>
							<li className="list-inside list-disc">
								Networking opportunities with like-minded people
							</li>
							<li className="list-inside list-disc">
								Certificate of participation
							</li>
						</ul>
					</div>

					<div className="flex flex-col gap-1">
						<p className="font-medium">Who should attend</p>
						<ul className="flex flex-col">
							<li className="list-inside list-disc">
								Enthusiasts and professionals in the field
							</li>
							<li className="list-inside list-disc">
								People looking to expand their network
							</li>
							<li className="list-inside list-disc">
								Anyone interested in learning more about Music
							</li>
						</ul>
					</div>
				</div>

				<div className="flex flex-col gap-2 lg:hidden">
					<Link
						href={"#"}
						className="flex items-center gap-2 text-sm font-medium hover:underline"
					>
						<ExternalLink className="size-4" />
						Refund Policy
					</Link>
					<Link
						href={"#"}
						className="flex items-center gap-2 text-sm font-medium hover:underline"
					>
						<ExternalLink className="size-4" />
						Terms & Condition
					</Link>
				</div>

				{/* <div className="flex">
          <button
            onClick={toggleShowMore}
            className="flex-1 cursor-pointer rounded-md bg-black/5 py-1 text-sm font-semibold hover:underline dark:bg-white/5"
          >
            {showMore ? "Show Less" : "Show More"}
          </button>
        </div> */}
			</div>
		</div>
	);
}
