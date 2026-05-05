import {
  HeadingThreeComponent,
  HeadingTwoComponent,
} from "@/app/_private/(shadcn)/TextComponent";
import GlassEffectCardComponent from "@/app/_private/(theme)/glass-effect/GlassEffectCardComponent";
import { Routes } from "@/lib/lib-routes";
import { Button } from "@/shadcn/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/shadcn/ui/input-group";
import { CopyrightIcon, SearchIcon } from "lucide-react";
import Link from "next/link";

export default function WebFooterComponent() {
  return (
    <footer className="flex flex-col bg-black p-4 text-white">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-3">
        <div className="flex flex-col gap-4">
          <HeadingTwoComponent>EventVerse</HeadingTwoComponent>
          <p className="md:w-1/2 lg:w-fit">
            We create an event website where customers can join upcoming events
            and get tickets or create new events.
          </p>
          <div className="flex items-center gap-2">
            <CopyrightIcon /> <span>EventVerse Limited, 2025</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 *:flex *:flex-col *:gap-2 *:*:nth-1:font-medium *:*:nth-2:flex *:*:nth-2:flex-col *:*:nth-2:gap-1">
          <div className="">
            <p className="">Top Links</p>
            <div className="">
              <Link href={Routes?.web?.general?.home}>Home</Link>
              <Link href={Routes?.web?.general?.home}>About</Link>
              <Link href={Routes?.web?.general?.home}>Contact</Link>
              <Link href={Routes?.web?.general?.home}>How It Works</Link>
              <Link href={Routes?.web?.general?.home}>Help</Link>
            </div>
          </div>
          <div className="">
            <p className="">Explore</p>
            <div className="">
              <Link href={Routes?.web?.general?.home}>Create</Link>
              <Link href={Routes?.web?.general?.home}>Discover</Link>
              <Link href={Routes?.web?.general?.home}>Pricing</Link>
              <Link href={Routes?.web?.general?.home}>Features</Link>
              <Link href={Routes?.web?.general?.home}>Help</Link>
            </div>
          </div>
        </div>

        <NewsletterComponent />
      </div>
    </footer>
  );
}

function NewsletterComponent() {
  return (
    <GlassEffectCardComponent className="gap-2 p-4">
      <div className="flex flex-col gap-1">
        <HeadingThreeComponent>
          Subscribe to our newsletter
        </HeadingThreeComponent>
        <p className="">
          Be the first to hear about new arrivals, promotions, style inspiration
          and exclusive sneak peeks.
        </p>
      </div>

      <InputGroup>
        <InputGroupInput placeholder="Enter your email" />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>

      <Button variant={"secondary"}>Subscribe</Button>
    </GlassEffectCardComponent>
  );
}
