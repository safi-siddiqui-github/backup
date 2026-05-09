import { mockEventCategory } from "@/lib/data";
import CategoryCard from "../card/CategoryCard";

export default function HomeSectionFiveComponent() {
  return (
    <div className="flex flex-col gap-6 py-10">
      <div>
        <p className="text-center text-xl font-semibold">
          Explore Event Category
        </p>
      </div>
      {/*  */}
      {/*  */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/*  */}
        {/*  */}
        {mockEventCategory.map((item, index) => {
          return (
            <CategoryCard
              key={index}
              item={item}
            />
          );
        })}
        {/*  */}
        {/*  */}
      </div>
    </div>
  );
}
