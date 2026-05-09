import type { Route } from "./+types/home";
import Header from "components/Header";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About" },
    { name: "description", content: "Welcome to about" },
  ];
}

export default function Page() {
  return (
    <>
      <div className="">About Page</div>
    </>
  );
}
