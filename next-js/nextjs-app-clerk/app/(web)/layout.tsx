import WebLayoutComponent from "@/components/layouts/web-layout-component";
import { ComponentProps } from "react";

export default function Layout({ children }: ComponentProps<"div">) {
  return <WebLayoutComponent>{children}</WebLayoutComponent>;
}
