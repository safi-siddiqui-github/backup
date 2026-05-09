import { Images } from "@/lib/images";
import { CalendarHeart } from "lucide-react";

export default function HomeSectionEightComponent() {
  return (
    <div className="flex flex-col gap-10 px-4 py-20">
      <div className="relative flex flex-col">
        <div className="flex items-center justify-center gap-12">
          {/*  */}
          <div
            className="h-28 w-28 rounded-full bg-cover bg-center"
            style={{ backgroundImage: `url(${Images.beach})` }}
          ></div>
          {/*  */}
          <div
            className="h-28 w-28 rounded-full bg-cover bg-center"
            style={{ backgroundImage: `url(${Images.wall})` }}
          ></div>
          {/*  */}
          <div
            className="absolute h-36 w-36 rounded-full bg-cover bg-center"
            style={{ backgroundImage: `url(${Images.mock})` }}
          ></div>
          {/*  */}
        </div>
      </div>
      {/*  */}
      <p className="text-center text-2xl font-semibold lg:text-4xl">
        Key Features
      </p>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="flex flex-col items-center gap-2 text-center">
          <CalendarHeart />
          <div className="flex flex-col">
            <p className="font-medium">Create Events Easily</p>
            <p className="lg:max-w-sm">
              Transform ideas into action by launching your own experiences to
              share with the world.
            </p>
          </div>
        </div>
        {/*  */}
        {/*  */}
        <div className="flex flex-col items-center gap-2 text-center">
          <CalendarHeart />
          <div className="flex flex-col">
            <p className="font-medium">Create Events Easily</p>
            <p className="lg:max-w-sm">
              Transform ideas into action by launching your own experiences to
              share with the world.
            </p>
          </div>
        </div>
        {/*  */}
        <div className="flex flex-col items-center gap-2 text-center">
          <CalendarHeart />
          <div className="flex flex-col">
            <p className="font-medium">Create Events Easily</p>
            <p className="lg:max-w-sm">
              Transform ideas into action by launching your own experiences to
              share with the world.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
