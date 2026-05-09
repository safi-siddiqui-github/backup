import { Button } from "@/components/ui/button";
import { Images } from "@/lib/images";
import { ArrowUpRight, CircleArrowLeft, CircleArrowRight } from "lucide-react";

export default function HomeSectionTwoComponent() {
  return (
    <div className="flex flex-col gap-4 py-10 lg:flex-row lg:gap-8">
      {/*  */}
      <div className="flex flex-col gap-4 lg:flex-1 lg:flex-row">
        {/*  */}
        <div
          className="h-96 bg-cover bg-center lg:h-full lg:flex-1 rounded-xl"
          style={{backgroundImage:`url(${Images.wall})`}}
        ></div>

        <div className="flex flex-col gap-4 lg:flex-1">
          <p className="text-xl font-semibold">
            Discover Your Next Great Experience
          </p>
          <p>
            Explore a diverse array of events that catre to your passion. From
            workshops to concerts, finding your perfect match has never been
            easier with out streamlined platform.
          </p>

          <Button className="bg-purple-600 hover:bg-purple-700">
            Join Upcoming Event
            <ArrowUpRight />
          </Button>

          <div className="flex items-center justify-between">
            <p>1/2</p>
            {/*  */}
            <div className="flex gap-2">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <CircleArrowLeft />
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <CircleArrowRight />
              </Button>
              {/*  */}
            </div>
          </div>
        </div>
      </div>

      {/*  */}

      <div className="flex flex-col gap-4 lg:flex-1">
        <p className="text-xl font-semibold md:text-center">
          Transform Your Experience with
          <span className="text-purple-600"> Event</span>
        </p>

        <div className="flex flex-col gap-4 md:flex-row md:items-center lg:flex-1">
          <div className="h-40 bg-center bg-cover md:flex-1 lg:h-full rounded-xl"
          style={{backgroundImage:`url(${Images.beach})`}}></div>
          <p className="md:flex-1">
            Explore a diverse array of events that catre to your passion. From
            workshops to concerts, finding your perfect match has never been
            easier with out streamlined platform.
          </p>
        </div>
      </div>
    </div>
  );
}
