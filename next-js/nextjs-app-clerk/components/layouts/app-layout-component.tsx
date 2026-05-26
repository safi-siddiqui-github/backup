import { ComponentProps } from "react";
import AppAddonComponent from "../addons/app-addon-component";
import AppProviderComponent from "../providers/app-provider-component";
import { FlexOneComponent } from "../sections/web-components";

export default function AppLayoutComponent({
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <FlexOneComponent {...props}>
      <AppProviderComponent>{children}</AppProviderComponent>
      <AppAddonComponent />
    </FlexOneComponent>
  );
}
