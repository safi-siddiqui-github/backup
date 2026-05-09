import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Images } from "@/lib/lib-images";
import { Routes } from "@/lib/lib-routes";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

export default function ContactHeroSectionComponent() {
  return (
    <div
      className="flex flex-col items-center gap-4 bg-cover bg-center px-5 py-20 md:gap-8 md:py-40"
      style={{ backgroundImage: `url(${Images.landingPage})` }}
    >
      {/*  */}

      {/*  */}
      <div className="bg-foreground/50 flex flex-col items-center gap-8 rounded-xl p-4 py-10 lg:gap-10">
        {/*  */}

        {/*  */}
        <CardTitle className="text-background text-center text-2xl font-semibold md:text-4xl">
          Contact Information
        </CardTitle>
        {/*  */}

        {/*  */}
        <p className="text-background max-w-sm text-center font-medium tracking-tight">
          Have questions about our platform? Need technical support? Want to
          request a custom feature or partnership? Just reach out—we would love
          to hear from you.
        </p>
        {/*  */}

        {/*  */}
        <Button asChild>
          <Link href={Routes.web.general.events}>
            <SquareArrowOutUpRight />
            <span>Explore Our Events</span>
          </Link>
        </Button>
        {/*  */}

        {/*  */}
      </div>
      {/*  */}

      {/*  */}
    </div>
  );
}
