import Link from "next/link";

export default function Home() {
  return (
    <div className="p-5 flex flex-col gap-5 items-start">
      <h2 className="font-medium text-xl">Next JS Starter Kit</h2>

      <Link href={'/core/settings'} className="text-lg border px-2 py-1 rounded">Core Settings</Link>
      <Link href={'/authentication'} className="text-lg border px-2 py-1 rounded">Authentication App</Link>
      <Link href={'/product'} className="text-lg border px-2 py-1 rounded">Product App</Link>
    </div>
  );
}
