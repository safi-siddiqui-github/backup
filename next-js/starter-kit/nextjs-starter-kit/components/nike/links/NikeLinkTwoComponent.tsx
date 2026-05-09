import Link from "next/link";

type NikeLinkTwoProps = {
  title: string;
  href: string;
}

export default function NikeLinkTwoComponent(props: NikeLinkTwoProps) {
  const { href, title } = props;
  return (
    <Link
      href={href}
      className="border shadow rounded px-4 py-2 font-medium hover:shadow-lg xl:text-base rtd"
    >
      {title}
    </Link>
  )
}