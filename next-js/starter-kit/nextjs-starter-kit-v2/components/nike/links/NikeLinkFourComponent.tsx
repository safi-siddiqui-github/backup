import Link from "next/link";

type NikeLinkFourProps = {
  title: string;
  href: string;
}

export default function NikeLinkFourComponent(props: NikeLinkFourProps) {
  const { href, title } = props;
  return (
    <Link
      href={href}
      className="font-medium text-xs hover:underline text-white bg-blue-700 hover:bg-black px-2 py-1 rounded rtd"
    >
      {title}
    </Link>
  )
}