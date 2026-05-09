import { mockEventsData } from "@/lib/data";
import EventCardOneComponent from "../card/EventCardOneComponent";

export default function HomeSectionThreeComponent() {
  //
  return (
    <div className="flex flex-col gap-6 py-10">
      {/*  */}
      {/*  */}
      <div className="flex justify-between">
        <p className="text-xl font-medium">Featured Events</p>
        <p>See all</p>
      </div>
      {/*  */}
      {/*  */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {/*  */}
        {/*  */}
        {mockEventsData.map((item, index) => {
          return (
            <EventCardOneComponent
              key={index}
              item={item}
            />
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
