"use client";

import { Images } from "@/lib/lib-images";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function AvatarGroupComponent() {
  //
  return (
    <div className="flex flex-col overflow-auto">
      {/*  */}

      {/*  */}
      <div className="*:data-[slot=avatar]:ring-background flex items-center -space-x-2 *:data-[slot=avatar]:ring-2">
        {/*  */}
        {Array.from({ length: 8 })?.map((subItem, subIndex) => {
          return (
            <Avatar key={subIndex}>
              {/*  */}
              <AvatarImage src={Images.beach} />
              {/*  */}
              <AvatarFallback>CN</AvatarFallback>
              {/*  */}
            </Avatar>
          );
        })}
        {/*  */}
        <Avatar>
          {/*  */}
          <AvatarImage src={""} />
          {/*  */}
          <AvatarFallback>+51</AvatarFallback>
          {/*  */}
        </Avatar>
        {/*  */}
      </div>
      {/*  */}

      {/*  */}
    </div>
  );
}
