import { ComponentProps } from "react";
import HomeHeaderComponent from "./_private/HomeHeaderComponent";

export default function Layout({ children }: ComponentProps<"div">) {
  return (
    <>
      <HomeHeaderComponent />
      {children}
    </>
  );
}
