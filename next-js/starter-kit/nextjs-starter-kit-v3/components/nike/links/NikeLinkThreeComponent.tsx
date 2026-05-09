import Link from "next/link";

type NikeLinkThreeProps = {
  title: string;
  href: string;
}

export default function NikeLinkThreeComponent(props: NikeLinkThreeProps) {
  const { href, title} = props;
  return (
    <Link
      href={href}
      className="hover:bg-black/60 backdrop-blur-sm text-white font-medium px-4 py-2 rounded xl:text-base rtd"
    >
      {title}
    </Link>
  )
}