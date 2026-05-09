import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <h2 className="text-xl">React Course</h2>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg">Hooks</h2>

        <div className="indent-2 flex flex-col items-start">
          <Link href={"/useState"} className="p-1">UseState</Link>
          <Link href={"/useReducer"} className="p-1">UseReducer</Link>
          <Link href={"/useContext"} className="p-1">UseContext</Link>
          <Link href={"/useRef"} className="p-1">UseRef</Link>
          <Link href={"/useEffect"} className="p-1">UseEffect</Link>
        </div>
      </div>
    </div>
  );
}
