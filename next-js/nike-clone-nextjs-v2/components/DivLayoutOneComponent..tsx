import { MousePointerClick } from "lucide-react";
import Link from "next/link";

export default function DivLayoutOneComponent(props: {
  componentTitle: string;
  children: React.ReactNode
}) {

  const { children, componentTitle } = props;

  return (
    <div className="flex flex-col p-6 gap-6 sm:p-8 sm:gap-8 rtd">

      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-2 rtd">
        <p className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight rtd">{componentTitle}</p>

        <div className="flex items-center gap-1">
          <Link href={'/nike'} className="font-medium lg:text-base rtd">Explore More</Link>
          <MousePointerClick className="size-5 lg:size-6 rtd" />
        </div>

      </div>

      <div className="flex gap-4 overflow-x-auto scrollbar pb-4 lg:grid lg:grid-cols-3 lg:overflow-x-hidden rtd">
        {children}
      </div>

    </div>
  )
}