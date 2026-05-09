import { Images } from "@/lib/lib-images";
import Image from "next/image";

export default function EventDetailMediaSectionComponent({
  slug,
}: {
  slug?: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <h3 className="text-2xl font-semibold">Media Gallery</h3>
        <div className="grid max-h-64 grid-cols-3 gap-2 overflow-hidden md:grid-cols-4 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="relative h-20 w-full overflow-hidden rounded-md"
            >
              <Image
                src={Images.mock}
                alt={`Event media ${index + 1}`}
                // fill
                className="h-full w-full object-cover"
                width={100}
                height={100}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
