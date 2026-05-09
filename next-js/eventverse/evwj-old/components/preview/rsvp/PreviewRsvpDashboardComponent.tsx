"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Images } from "@/lib/lib-images";
import { cn } from "@/lib/utils";
import { PartyPopper } from "lucide-react";
import { useMemo } from "react";

export default function PreviewRsvpDashboardComponent() {
  //
  const dashboardData = useMemo(
    () => [
      {
        name: "Total Invited",
        content: "5",
        contentColor: "text-gray-500",
        // description: '+3 plus ones'
      },
      {
        name: "Attending",
        content: "2",
        contentColor: "text-green-500",
        description: "+3 plus ones",
      },
      {
        name: "Pending",
        content: "1",
        contentColor: "text-orange-500",
        // description: '+3 plus ones'
      },
      {
        name: "Declined",
        content: "1",
        contentColor: "text-red-500",
        // description: '+3 plus ones'
      },
      {
        name: "Response Rate",
        content: "80%",
        contentColor: "text-blue-500",
        // description: '+3 plus ones'
      },
    ],
    [],
  );
  //
  const recentData = useMemo(
    () => [
      {
        name: "Spenser Sembrat",
        avatar: Images.avatarOne,
        avatarEmoji: "🤔",
        status: "Maybe",
        statusEmoji: "🤷",
        gradient: "from-yellow-500 to-orange-500",
      },
      {
        name: "Jurica Koletić",
        avatar: Images.avatarTwo,
        avatarEmoji: "😔",
        status: "Cant make it",
        statusEmoji: "❌",
        gradient: "from-red-500 to-pink-500",
      },
      {
        name: "Cesar Rincon",
        avatar: Images.avatarThree,
        avatarEmoji: "🥳",
        status: "Coming",
        statusEmoji: "🎉",
        gradient: "from-green-500 to-cyan-500",
        plusOne: "+Maria Rodriguez, Carlos Rodriguez",
      },
      {
        name: "Joseph Gonzalez",
        avatar: Images.avatarFour,
        avatarEmoji: "🥳",
        status: "Coming",
        statusEmoji: "🎉",
        gradient: "from-green-500 to-cyan-500",
        plusOne: "+Maria Rodriguez",
      },
    ],
    [],
  );
  //
  return (
    <div className="flex flex-col gap-6">
      {/*  */}

      {/*  */}
      <div className="flex flex-wrap gap-4">
        {/*  */}
        {dashboardData?.map((item, index) => {
          return (
            <div
              key={index}
              className="bg-background flex flex-1 flex-col justify-between gap-2 rounded-md p-4 shadow 2xl:p-6"
            >
              {/*  */}
              <p className="tracking-tight">{item?.name}</p>
              {/*  */}
              <div className="flex flex-col">
                {/*  */}
                <p className={cn(`text-3xl font-bold ${item?.contentColor}`)}>
                  {item?.content}
                </p>
                {/*  */}
                <p className="text-sm tracking-tight">{item?.description}</p>
                {/*  */}
              </div>
              {/*  */}
            </div>
          );
        })}
        {/*  */}
      </div>
      {/*  */}

      {/*  */}
      <div className="from-primary/30 via-primary/10 to-primary/10 flex flex-col gap-6 rounded-md bg-linear-to-br p-4 shadow 2xl:p-6">
        {/*  */}

        {/*  */}
        <div className="text-primary flex flex-col">
          {/*  */}
          <div className="flex items-center gap-2">
            {/*  */}
            <PartyPopper />
            {/*  */}
            <p className="text-2xl font-bold">Recent Activity</p>
            {/*  */}
          </div>
          {/*  */}
          <p className="">Hot off the press! Your latest RSVP responses</p>
          {/*  */}
        </div>
        {/*  */}

        {/*  */}
        {recentData?.map((item, index) => {
          return (
            <div
              key={index}
              className="bg-background/50 hover:bg-background/80 flex flex-wrap items-center justify-between gap-4 rounded-md px-4 py-2 shadow"
            >
              {/*  */}
              <div className="flex flex-wrap items-center gap-2">
                {/*  */}
                <div className="relative flex flex-col pr-1.5 pb-1.5">
                  {/*  */}
                  <Avatar className="size-14">
                    <AvatarImage
                      src={item?.avatar}
                      alt={item?.avatar}
                      className="object-cover object-top"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  {/*  */}
                  <div
                    className={cn(
                      `absolute right-0 bottom-0 w-fit rounded-full bg-linear-to-r ${item?.gradient} p-0.5`,
                    )}
                  >
                    {item?.avatarEmoji}
                  </div>
                  {/*  */}
                </div>
                {/*  */}
                <div className="flex flex-col">
                  {/*  */}
                  <p className="text-lg font-semibold">{item?.name}</p>
                  {/*  */}
                  <p className="text-xs text-green-500 2xl:text-sm">
                    {item?.plusOne} {item?.plusOne && "👥"}
                  </p>
                  {/*  */}
                </div>
                {/*  */}
              </div>
              {/*  */}
              <div
                className={cn(
                  `flex items-center rounded-full bg-linear-to-r text-white ${item?.gradient} px-3 py-1`,
                )}
              >
                {/*  */}
                <span className="text-xl">{item?.statusEmoji}</span>
                {/*  */}
                <p className="text-xs font-medium">{item?.status}</p>
                {/*  */}
              </div>
              {/*  */}
            </div>
          );
        })}
        {/*  */}

        {/*  */}
      </div>
      {/*  */}

      {/*  */}
    </div>
  );
}
