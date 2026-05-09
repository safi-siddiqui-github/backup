import { Button } from "@/components/ui/button";
import {
  Calendar,
  ChevronRight,
  Heart,
  MapPin,
  Share,
  Ticket,
} from "lucide-react";
import Link from "next/link";

export default function EventDetailSectionTwoComponent() {
  return (
    <div className="flex flex-col gap-4 py-10">
      {/*  */}
      {/*  */}

      {/*  */}
      <div className="flex flex-wrap justify-between gap-6">
        {/*  */}
        <div className="flex flex-wrap items-center gap-2">
          {/*  */}
          {/*  */}
          <Button
            variant={"default"}
            className="rounded-full bg-purple-600 hover:bg-purple-700"
          >
            About
          </Button>
          <Button
            variant={"outline"}
            className="rounded-full"
          >
            Location
          </Button>
          <Button
            variant={"outline"}
            className="rounded-full"
          >
            Organizer
          </Button>
        </div>
        {/*  */}
        <div className="flex gap-2">
          <Button className="rounded-full bg-purple-600">
            {" "}
            <Heart />{" "}
          </Button>
          <Button className="rounded-full bg-purple-600">
            {" "}
            <Share />{" "}
          </Button>
        </div>

        {/*  */}
      </div>
      {/*  */}
      {/*  */}
      <div className="flex flex-col gap-6 lg:flex-row">
        {/*  */}
        <div className="flex flex-col gap-4 lg:flex-1">
          {/*  */}
          {/*  */}
          <div className="flex flex-col gap-2">
            {/*  */}
            <p className="text-2xl font-semibold">Summer Music Festival 2025</p>
            {/*  */}
            <Button
              variant={"outline"}
              className="w-fit rounded-full text-purple-600"
            >
              Music
            </Button>
            {/*  */}
            <p className="flex max-w-sm tracking-tight">
              Enjoy an evening of smooth jazz performances by local and
              international artists. Dinner packages available.
            </p>
            {/*  */}
          </div>
          {/*  */}
          {/*  */}
          <div className="flex flex-col gap-4 p-2">
            <div className="flex flex-col">
              <p className="font-semibold">What you will get</p>
              <li>Access to all event activities</li>
              <li>Networking opportunities with like-minded people</li>
              <li>Certificate of participation</li>
            </div>
            {/*  */}
            {/*  */}
            <div className="flex flex-col">
              <p className="font-semibold">Who should attend </p>

              <li> Enthusiasts and professionals in the field</li>
              <li>People looking to expand their network</li>
              <li>Anyone interested in learning more about Music</li>
            </div>
          </div>
          {/*  */}
          {/*  */}
          <div className="flex flex-col gap-8">
            <p className="text-2xl font-semibold">Event Schedule</p>
            <div>
              <p>11:50 AM</p>
              <p className="font-semibold">Registration & Welcome</p>
              <p>
                11:50 AM Registration & Welcome Check in and collect your event
                materials
              </p>
            </div>
            {/*  */}
            {/*  */}
            <div>
              <p>11:50 AM</p>
              <p className="font-semibold">Registration & Welcome</p>
              <p>
                11:50 AM Registration & Welcome Check in and collect your event
                materials
              </p>
            </div>
            {/*  */}
            {/*  */}
            <div>
              <p>11:50 AM</p>
              <p className="font-semibold">Registration & Welcome</p>
              <p>
                11:50 AM Registration & Welcome Check in and collect your event
                materials
              </p>
            </div>
            {/*  */}
            {/*  */}
          </div>
          {/*  */}
        </div>
        {/*  */}

        <div className="flex flex-col gap-4 lg:max-w-xs lg:flex-1">
          {/*  */}
          <div className="flex items-center gap-2">
            <Calendar />
            <p className="font-medium">Friday 11 June, 11:50 AM</p>
          </div>
          {/*  */}
          <div className="flex items-center gap-2">
            <MapPin />
            <p className="font-medium">Central Park, New York</p>
          </div>
          {/*  */}
          <Button className="bg-purple-600">
            <Ticket />
            Get Tickets
          </Button>
          {/*  */}
          <p className="">
            <span className="font-medium">Refund Policy: </span>
            <span>Refunds available up to 7 days before the event.</span>
          </p>
          {/*  */}
          <Link
            href={"./"}
            className="flex items-center gap-2 font-medium text-purple-600"
          >
            Terms &amp; Condition
            <ChevronRight />
          </Link>
          {/*  */}
        </div>

        {/*  */}
      </div>
      {/*  */}
    </div>
  );
}
