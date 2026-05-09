import { Button } from "@/components/ui/button";
import { Images } from "@/lib/images";
import { MapPin } from "lucide-react";

export default function HomeSectionNineComponent() {
  return (
    <div className="flex flex-col gap-6 py-10 md:items-center lg:gap-10 bg-center bg-cover px-4"
    style={{backgroundImage:`url(${Images.landingPage})`}}>
      <p className="md:text-center text-2xl font-semibold lg:text-4xl text-white">Find Events in Cities You Love</p>
      <p className="md:text-center lg:max-w-xl text-white tracking-tight">
        Explore a diverse array of events that catre to your passion. From
        workshops to concerts, finding your perfect match has never been easier
        with out streamlined platform. Explore a diverse array of events that
        catre to your passion. From workshops to concerts, finding your perfect
        match has never been easier with out streamlined platform.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4 lg:max-w-md">
        <Button className="bg-purple-600">
          {" "}
          <MapPin />
          Tbilisi, Georgia
        </Button>
        <Button className="bg-purple-600">
          <MapPin />
          New York, USA
        </Button>
        <Button className="bg-purple-600">
          <MapPin />
          Paris, France
        </Button>
        <Button className="bg-purple-600">
          <MapPin />
          London, UK
        </Button>
        <Button className="bg-purple-600">
          <MapPin />
          Vienna, Austria
        </Button>
      </div>
    </div>
  );
}
