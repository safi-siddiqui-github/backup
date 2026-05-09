import { Button } from "@/components/ui/button";
import { Images } from "@/lib/lib-images";
import { MapPin } from "lucide-react";

export default function EventDetailHeroSectionComponent() {
  return (
    <div
      className="flex flex-col bg-cover bg-center 2xl:items-center"
      style={{ backgroundImage: `url(${Images.mock})` }}
    >
      {/*  */}

      <div className="py-56"></div>

      {/*  */}
      <div className="hidden flex-col gap-36 bg-black/20 px-10 pt-20 pb-10 text-white 2xl:container">
        {/*  */}

        {/*  */}
        <div className="flex flex-col items-end">
          {/*  */}

          {/*  */}
          <div className="flex flex-col items-end gap-1">
            {/*  */}

            {/*  */}
            <p className="text-2xl font-semibold">Wednesday</p>
            <p className="text-2xl font-semibold">June 11, 2024</p>
            {/*  */}

            {/*  */}
            <p>Friday Door Opens: 11:50 </p>
            {/*  */}

            {/*  */}
          </div>
          {/*  */}

          {/*  */}
        </div>
        {/*  */}

        {/*  */}
        <div className="flex flex-wrap items-end justify-end gap-8 md:justify-between">
          {/*  */}

          {/*  */}
          <Button className="bg-accent text-primary hidden md:block">
            EventVerse
          </Button>
          {/*  */}

          {/*  */}
          <div className="flex flex-col items-center gap-4 text-center md:items-end">
            {/*  */}

            {/*  */}
            <p className="flex flex-wrap items-center justify-center gap-2">
              <MapPin /> <span>Central Park, Newyork</span>
            </p>
            {/*  */}

            {/*  */}
            <p className="text-4xl">Summer Music Festival 2025</p>
            {/*  */}

            {/*  */}
          </div>
          {/*  */}

          {/*  */}
        </div>
        {/*  */}

        {/*  */}
      </div>
      {/*  */}

      {/*  */}
    </div>
  );
}
