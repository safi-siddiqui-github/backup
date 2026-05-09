import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function EventsSectionOneComponent() {
  return (
    <div className="flex flex-col gap-6 bg-gradient-to-br from-white to-purple-100 px-4 py-20 md:gap-10">
      {/*  */}
      <div className="flex flex-col items-center gap-4 text-center">
        {/*  */}
        <p className="text-2xl font-semibold md:text-4xl">
          Find Your Next <span className="text-purple-600">Experience</span>
        </p>
        {/*  */}
        <p className="md:max-w-sm">
          Discover amazing events happening near you or create your own to share
          with the world
        </p>
      </div>
      {/*  */}
      {/*  */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-center md:gap-2">
        {/*  */}
        <div className="flex items-center gap-2 overflow-hidden rounded-xl border bg-white px-2 md:max-w-sm md:flex-1">
          <Search />
          <input
            type="text"
            className="flex-1 truncate py-2 outline-none"
            placeholder="Search for events, venues or categories"
          />
        </div>
        {/*  */}
        <Button className="bg-purple-600">Search</Button>
        {/*  */}
      </div>
      {/*  */}
      {/*  */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button
          variant={"default"}
          className="rounded-full bg-purple-600 hover:bg-purple-700"
        >
          Food
        </Button>
        <Button
          variant={"outline"}
          className="rounded-full"
        >
          Music
        </Button>
        <Button
          variant={"outline"}
          className="rounded-full"
        >
          Business
        </Button>
        <Button
          variant={"outline"}
          className="rounded-full"
        >
          Arts & Culture
        </Button>
        <Button
          variant={"outline"}
          className="rounded-full"
        >
          Sports
        </Button>
        <Button
          variant={"outline"}
          className="rounded-full"
        >
          Education
        </Button>
        <Button
          variant={"outline"}
          className="rounded-full"
        >
          Charity
        </Button>
      </div>
      {/*  */}
    </div>
  );
}
