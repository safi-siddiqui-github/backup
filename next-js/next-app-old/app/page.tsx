import Link from "next/link";

export default function  Home() {
  
  return (
    <div className="p-5 flex flex-col gap-5">
      <h2 className="text-xl font-semibold">Next JS App</h2>
      <hr />

      <Link href={'/todo'}>Todo App</Link>
      <Link href={'/auth'}>Auth App</Link>

      <p className="">
        Features
      </p>
      
      <p>
        Production
      </p>
    </div>
  );
}
