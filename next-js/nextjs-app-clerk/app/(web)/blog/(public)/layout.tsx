import { FlexOneComponent } from "@/components/sections/web-components";
import { ComponentProps } from "react";
import BlogHeaderComponent from "../_private/BlogHeaderComponent";

export default function Layout({ children }: ComponentProps<"div">) {
  return (
    <FlexOneComponent>
      <BlogHeaderComponent />
      {children}
    </FlexOneComponent>
  );
}
