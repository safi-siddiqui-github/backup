import { Button } from "@/components/ui/button";
import { Images } from "@/lib/images";
import { ArrowUpRight, Globe, Star, Users } from "lucide-react";

export default function HomeSectionOneComponent() {
  return (
    <div
    className="flex flex-col items-center bg-cover bg-center px-4 py-20 xl:py-40"
    style={{ backgroundImage: `url(${Images.landingPage})` }}
    >
      {/*  */}
      <div className="flex flex-col items-center gap-8 lg:gap-10">
        {/*  */}
        <p className="text-center text-4xl font-semibold lg:text-6xl lg:tracking-tight text-white">
          Create Unforgettable Experience
        </p>

        <p className="max-w-sm text-center lg:max-w-xl  text-white">
          From intimate gatherings to large-scale conferences, EventFlow
          provides everything you need to plan, manage, and execute memorable
          events with ease.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2 text-white">
          <Button className="bg-purple-600 hover:bg-purple-700">
            Create Your Own Event
            <ArrowUpRight />
          </Button>
          <Button className="bg-transparent hover:bg-white/5">Join Event</Button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-8  text-white">
          <div className="flex items-center gap-2">
            <Users />
            <p>10,000+ Happy Event Planners</p>
          </div>

          <div className="flex items-center gap-2">
            <Star />
            <p>4.9/5 Average Rating</p>
          </div>

          <div className="flex items-center gap-2">
            <Globe />
            <p>50+ Countries Worldwide</p>
          </div>
        </div>
      </div>
    </div>
  );
}
