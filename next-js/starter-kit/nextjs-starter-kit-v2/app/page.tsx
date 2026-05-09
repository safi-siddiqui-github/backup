import Link from "next/link";

export default function Home() {
  return (
    <div className="p-5 flex flex-col gap-5">

      <div className="flex flex-col gap-2">
        <h2 className="font-medium text-xl">
          Safi Siddiqui Projects
        </h2>

        <div className="flex flex-col">

          <p className="text-base">
            Next JS Starter Kit
          </p>

          <p className="text-xs">
            All clones available beow
          </p>

        </div>
      </div>

      <hr />

      <div className="flex ">
        <Link href={'/nike'} className="border px-4 py-1 rounded font-medium">
          Nike Clone
        </Link>
      </div>

    </div>
  );
}
