import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Images } from "@/lib/lib-images";
import { Routes } from "@/lib/lib-routes";
import { ExternalLink, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function EventDetailOrganizerComponent() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4">
        <p className="text-lg font-semibold tracking-tight md:text-xl lg:text-2xl">
          Organizer
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <Avatar className="size-20 lg:size-30">
            <AvatarImage
              src={Images.avatarThree}
              alt="user"
              className="object-cover"
            />
            <AvatarFallback>US</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="text-xl font-semibold tracking-tight">John Doe</p>
            <p className="text-sm tracking-tight">Event Organizer</p>
          </div>
        </div>
        <p className="line-clamp-5 text-sm tracking-tight">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore
          officia dolorum, quia odio aut soluta, quo fugit error distinctio ut,
          qui sint quae. Totam, a modi nulla dolores sunt sit eius natus qui
          excepturi impedit omnis nam sapiente aliquam dicta autem earum tempore
          rem laborum eum commodi numquam magni rerum?
        </p>
        <div className="flex flex-col">
          <p className="font-medium">Contact the Organizer</p>
          <p className="text-sm">
            Have questions about this event? Contact the organizer directly.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`${Routes.web.general.organizers}/sophia-lee`}
            className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium shadow hover:underline dark:bg-blue-900"
          >
            <ExternalLink className="size-4" />
            <span>Open Profile</span>
          </Link>
          <Link
            href={"#"}
            className="flex items-center gap-2 rounded-full bg-gray-700 px-4 py-2 text-sm font-medium text-white shadow hover:underline dark:bg-rose-900"
          >
            <MessageCircle className="size-4" />
            <span>Start Conversation</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
