import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { CircleChevronRight } from "lucide-react";

export default function FooterComponent() {
  return (
    <div className="flex flex-col gap-6 px-4 py-10 lg:px-10 xl:flex-row">
      {/*  */}
      <div className="flex flex-col gap-2 xl:flex-1">
        <p className="text-2xl font-semibold text-purple-600">EventVerse</p>
        <p className="max-w-sm tracking-tight">
          We create an event website where customers can join upcoming events
          and get tickets or create new events.
        </p>
        <p className="">&copy; EventFlow Limited, 2025</p>
      </div>
      {/*  */}
      <div className="flex flex-wrap items-center justify-center gap-4 xl:flex-1">
        <div className="flex flex-1 flex-col gap-2">
          <p className="font-medium">About Event Verse</p>

          <div className="flex flex-col">
            <p>Create Event</p>
            <p>Browse Event</p>
            <p>Pricing</p>
            <p>How it works</p>
          </div>
        </div>
        {/*  */}
        <div className="flex flex-1 flex-col gap-2">
          <p className="font-medium">About Event Verse</p>

          <div className="flex flex-col">
            <p>Create Event</p>
            <p>Browse Event</p>
            <p>Pricing</p>
            <p>How it works</p>
          </div>
        </div>
      </div>
      {/*  */}
      <Card className="xl:flex-1">
        <CardContent className="flex flex-col gap-2">
          <CardTitle>Get Our Newsletter</CardTitle>
          <CardDescription>
            Be the first to hear about new arrivals, promotions, style
            inspiration and exclusive sneak peeks.
          </CardDescription>
          <Button className="justify-between bg-purple-600">
            Email
            <CircleChevronRight />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
