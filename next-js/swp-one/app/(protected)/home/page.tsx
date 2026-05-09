import Onboarding from "@/components/app/onboarding";
import { Button } from "@/components/ui/button";
import { featureData } from "@/lib/data";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-14">
        <div className="space-y-6">
          <h2 className="text-primary font-semibold text-4xl">
            Get maximum conversion from your webinars
          </h2>
          <Onboarding />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 place-content-center">
          {featureData.map((item, index) => (
            <Link
              href={item.link}
              className="px-8 py-6 flex flex-col items-start justify-center gap-14 rounded-xl border border-border bg-secondary backdrop-blur-xl"
              key={`feature-item-${index}`}
            >
              <item.icon />
              <p className="font-semibold text-xl text-primary">{item.title}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 rounded-xl bg-background/10">
        {/*  */}
        <div className="p-10 flex items-center justify-between flex-col gap-10 border rounded-2xl border-border bg-background/10">
          <div className="p-6 flex flex-col gap-4 items-start border border-border rounded-xl bg-background/10">
            <div className="w-full flex justify-between items-center gap-4">
              <p className="text-primary font-semibold text-sm">
                Conversations
              </p>
              <p className="text-muted-foreground font-normal text-xs">50</p>
            </div>

            <div className="flex flex-col gap-4 items-start">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  className="flex p-4 flex-col border rounded-2xl"
                  key={`feature-2-item-${index}`}
                >
                  <p className="text-lg font-semibold">John Doe</p>
                  <p className="text-sm text-muted-foreground">
                    johndoe@gmail.com
                  </p>

                  <div className="flex gap-4 mt-2">
                    <Button variant="ghost">New Customer</Button>
                    <Button variant="ghost">Tag 2</Button>
                    <Button variant="ghost">Tag 3</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full justify-between items-center flex-wrap flex gap-10">
            <h3 className="sm:w-5/6">
              See how far along are your potential customers
            </h3>

            <Link
              href={"/webinars"}
              className="text-primary font-semibold text-lg flex items-center justify-center rounded-md opacity-50"
            >
              View
              <ArrowRight />
            </Link>
          </div>
        </div>
        {/*  */}
        <div className="p-10 flex items-center justify-between flex-col gap-10 border rounded-2xl border-border bg-background/10">
          <div className="p-6 flex flex-col gap-4 items-start border border-border rounded-xl bg-background/10">
            <div className="w-full flex justify-between items-center gap-4">
              <p className="text-primary font-semibold text-sm">Customer</p>
              <p className="text-muted-foreground font-normal text-xs">140</p>
            </div>

            <div className="flex flex-col justify-between gap-4 items-start">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  className="flex p-4 flex-col border rounded-2xl"
                  key={`feature-2-item-${index}`}
                >
                  <p className="text-lg font-semibold">Customer #{index + 1}</p>
                  <p className="text-sm text-muted-foreground">
                    Webinars Booked: {(index + 1) * 20}
                  </p>

                  <div className="flex gap-4 mt-2">
                    <Button variant="ghost">Book reference</Button>
                    <Button variant="ghost">See Details</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full justify-between items-center flex-wrap flex gap-10">
            <h3 className="sm:w-5/6">See the list of your current customers</h3>

            <Link
              href={"/pipeline"}
              className="text-primary font-semibold text-lg flex items-center justify-center rounded-md opacity-50"
            >
              View
              <ArrowRight />
            </Link>
          </div>
        </div>

        {/*  */}
      </div>
    </div>
  );
}
