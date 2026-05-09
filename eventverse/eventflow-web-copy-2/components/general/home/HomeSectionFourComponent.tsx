import { Button } from "@/components/ui/button";
import { mockEventsData } from "@/lib/data";
import EventCardOneComponent from "../card/EventCardOneComponent";

export default function HomeSectionFourComponent() {
  //
  return (
    <div className="flex flex-col gap-6 py-10">
      {/*  */}
      {/*  */}
      <div className="flex items-center justify-between">
        <p className="text-xl font-medium">Upcoming Event</p>
        <p>See all</p>
      </div>
      {/*  */}
      {/*  */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={"default"}
          className="rounded-full bg-purple-600 hover:bg-purple-700"
        >
          All Events
        </Button>
        <Button
          variant={"outline"}
          className="rounded-full"
        >
          Today
        </Button>
        <Button
          variant={"outline"}
          className="rounded-full"
        >
          This Week
        </Button>
        <Button
          variant={"outline"}
          className="rounded-full"
        >
          Online
        </Button>
        <Button
          variant={"outline"}
          className="rounded-full"
        >
          Free
        </Button>
      </div>
      {/*  */}
      {/*  */}
      <div className="flex gap-5 overflow-x-auto pb-4">
        {/*  */}
        {mockEventsData.map((item, index) => {
          return (
            <EventCardOneComponent
              key={index}
              item={item}
            />
          );
        })}
      </div>
    </div>
  );
}
