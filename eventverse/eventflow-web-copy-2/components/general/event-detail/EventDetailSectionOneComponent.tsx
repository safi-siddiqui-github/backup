import { Button } from "@/components/ui/button";
import { Images } from "@/lib/images";
import { MapPin } from "lucide-react";

export default function EventDetailSectionOneComponent() {
  return (
    <div
      className="flex flex-col gap-36 bg-cover bg-center px-10 py-20"
      style={{ backgroundImage: `url(${Images.mock})` }}
    >
      {/*  */}
      <div className="flex flex-col items-end text-white">
        <div className="flex flex-col items-end gap-1 backdrop-blur">
          {/*  */}
          <p className="text-2xl font-semibold">June 11</p>
          <p>Friday</p>Door Opens: 11:50
          {/*  */}
        </div>
      </div>
      {/*  */}
      {/*  */}
      <div className="flex flex-wrap items-center justify-center gap-8 md:justify-between">
        <Button className="bg-accent text-purple-600">EventVerse</Button>
        <div className="div flex flex-col items-center gap-4 text-center text-white md:items-end">
          <p className="flex justify-end gap-2">
            {" "}
            <MapPin /> Central Park, Newyork
          </p>
          <p className="text-4xl">Summer Music Festival 2025</p>
        </div>
      </div>
    </div>
  );
}
