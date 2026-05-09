import Link from "next/link";

type NikeLinkOneProps = {
  title: string;
  href: string;
  hoverEffect: NikeLinkOneHoverEnums;
}

export enum NikeLinkOneHoverEnums {
  BLUE = 'hover:bg-blue-700',
  RED = 'hover:bg-red-700',
}

export default function NikeLinkOneComponent(props: NikeLinkOneProps) {
  const { href, title, hoverEffect } = props;
  return (
    <Link
      href={href}
      className={`${hoverEffect} bg-black rounded px-4 py-2 text-white font-medium xl:text-base rtd`}
    >
      {title}
    </Link>
  )
}