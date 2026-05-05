"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Routes } from "@/lib/lib-routes";
import { CircleChevronRight } from "lucide-react";
import Link from "next/link";

export default function WebFooterComponent() {
  //
  return (
    <div className="flex flex-col gap-6 px-4 py-10 lg:px-10 xl:flex-row dark:bg-black">
      <div className="flex flex-col gap-2 xl:flex-1">
        <p className="text-primary text-2xl font-semibold">EventVerse</p>
        <p className="max-w-sm tracking-tight">
          We create an event website where customers can join upcoming events
          and get tickets or create new events.
        </p>
        <p className="">&copy; EventVerse Limited, 2025</p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4 xl:flex-1">
        <div className="flex flex-1 flex-col gap-2">
          <p className="font-medium">Top Links</p>
          <div className="flex flex-col">
            <Link href={Routes.web.general.about}>About</Link>
            <Link href={Routes.web.general.contact}>Contact</Link>
            <Link href={Routes.web.general.howItWorks}>How It Works</Link>
            <Link href={Routes.web.general.help}>Help</Link>
          </div>
        </div>
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
      <Card className="xl:flex-1">
        <CardContent className="flex flex-col gap-2">
          <CardTitle>Get Our Newsletter</CardTitle>

          <CardDescription>
            Be the first to hear about new arrivals, promotions, style
            inspiration and exclusive sneak peeks.
          </CardDescription>

          <Button className="justify-between">
            Email
            <CircleChevronRight />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
