'use client';

import { CornerDownLeft, CornerRightDown, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";

export default function NikeMainFooterDropDownComponent(
  { navData }:
    {
      navData: {
        id: number;
        title: string;
        sublinks: {
          id: number;
          title: string;
        }[];
      }
    }
) {

  const { id, title, sublinks } = navData;

  const [showDropDown, setShowDropDown] = useState(false);

  const toggleClass = useCallback(() => {
    setShowDropDown(!showDropDown);
  }, [showDropDown, setShowDropDown])

  return (
    <div className="flex flex-col gap-4 min-w-56">

      <button className="flex items-center justify-between" onClick={toggleClass}>
        <p className="text-2xl font-medium">{title}</p>
        <CornerDownLeft className={`size-4 ${showDropDown ? 'hidden' : 'inline-block'}`} />
        <CornerRightDown className={`size-4 ${showDropDown ? 'inline-block' : 'hidden'}`} />
      </button>

      <div className={`flex-col gap-2 ${showDropDown ? 'flex' : 'hidden'}`}>
        {
          sublinks.map(({ id: linkId, title: linkTitle }) => (
            <Link key={`${title}-${id}-${linkId}`} href={'/nike'} className="flex items-center gap-4 group">
              <p className="font-medium group-hover:underline">{linkTitle}</p>
              <ExternalLink className="size-4 hidden group-hover:inline-block" />
            </Link>
          ))
        }

      </div>

    </div>
  )
}