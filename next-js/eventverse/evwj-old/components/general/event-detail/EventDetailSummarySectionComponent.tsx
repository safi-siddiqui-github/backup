import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Images } from "@/lib/lib-images";
import { ClientPropType } from "@/type";
import { Info } from "lucide-react";

export default function EventDetailSummarySectionComponent(
  prop: ClientPropType,
) {
  //
  if (prop) {
  }
  //
  // const slug = props.slug;
  //
  return (
    <div className="flex h-full flex-col gap-6">
      {/*  */}

      {/*  */}
      <div
        className="hidden h-44 flex-col rounded bg-cover bg-center lg:block"
        style={{ backgroundImage: `url(${Images.mock})` }}
      ></div>
      {/*  */}

      {/*  */}
      <p className="text-lg font-medium">Order Summary</p>
      {/*  */}

      {/*  */}
      <div className="flex flex-col gap-2 divide-y overflow-y-auto px-1">
        {/*  */}

        {/*  */}
        {Array.from("12345")?.map((item, index) => {
          return (
            <div
              key={index}
              className="flex flex-col gap-1 not-last:pb-2"
            >
              <div className="flex items-center justify-between">
                <p className="">1 x Entry + $250</p>
                <p className="">$5.00</p>
              </div>
              <p className="">Giveaway Entry Ticket</p>
            </div>
          );
        })}
        {/*  */}

        {/*  */}
      </div>

      <Separator />

      {/*  */}
      <div className="flex flex-col gap-2">
        {/*  */}

        {/*  */}
        <div className="flex items-center justify-between">
          <p className="">Subtotal</p>
          <p className="">$15.00</p>
        </div>
        {/*  */}

        {/*  */}
        <div className="flex items-center justify-between">
          {/*  */}

          {/*  */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1">
                <p>Fees</p>
                <Info />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>EventVerse Fees in un-refeundable</p>
            </TooltipContent>
          </Tooltip>
          {/*  */}

          {/*  */}
          <p className="">$4.55</p>
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
