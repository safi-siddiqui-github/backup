import { MockEventCategory } from "@/lib/data";
import { Music } from "lucide-react";

//
type CategoryCard = {
  item: MockEventCategory;
};
//

export default function CategoryCard(props: CategoryCard) {
  //
  const item = props.item;
  //
  return (
    <div className={`flex flex-col items-center gap-2 rounded-2xl bg-black p-4 text-white  ${item.color}`}>
      <Music />
      {/*  */}
      <p>{item.name}</p>
      {/*  */}
      <p>{item.count} Event</p>
      {/*  */}

    </div>
  );
}
