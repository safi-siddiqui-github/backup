import { Button } from "@/components/ui/button";
import { MockEventData } from "@/lib/data";
import { Images } from "@/lib/images";
import { CalendarHeart, MapPin } from "lucide-react";

//
type EventCardType = {
  key?: number;
  item: MockEventData;
  // item: {
  //   name: string;
  //   startDate: string;
  //   locationMap: string;
  //   price: number;
  // };
};
//
export default function EventCardTwoComponent(props: EventCardType) {
  //
  const item = props.item;
  //
  return (
    <div className="flex flex-col overflow-hidden rounded-xl shadow">
      {/*  */}
      {/*  */}

      <div
        className="h-45 w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${Images.mock})` }}
      ></div>
      {/*  */}
      {/*  */}
      <div className="flex flex-col gap-2 p-4">
        {/*  */}
        {/*  */}
        <div className="flex items-center gap-2">
          <CalendarHeart />
          <p className="line-clamp-1">{item.startDate}</p>
        </div>
        {/*  */}
        {/*  */}
        <p className="line-clamp-1">{item.name}</p>
        {/*  */}
        {/*  */}
        <div className="flex items-center gap-2">
          <MapPin />
          <p className="line-clamp-1">{item.locationMap}</p>
        </div>
        {/*  */}
        {/*  */}
        <div className="flex items-center justify-between">
          <Button className="bg-purple-600 hover:bg-purple-700">Music</Button>
          <p>{item.price}$</p>
        </div>
        {/*  */}
        {/*  */}
      </div>
      {/*  */}
      {/*  */}
    </div>
  );
}
