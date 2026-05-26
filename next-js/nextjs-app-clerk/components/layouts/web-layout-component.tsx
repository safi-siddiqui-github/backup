import { ComponentProps } from "react";
import { FlexColMaxWidth8XLComponent } from "../sections/web-components";
import AppLayoutComponent from "./app-layout-component";

/*
  Center Main Layout Component
*/
export default function WebLayoutComponent({
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <AppLayoutComponent
      className="items-center"
      {...props}
    >
      <FlexColMaxWidth8XLComponent>{children}</FlexColMaxWidth8XLComponent>
    </AppLayoutComponent>
  );
}
