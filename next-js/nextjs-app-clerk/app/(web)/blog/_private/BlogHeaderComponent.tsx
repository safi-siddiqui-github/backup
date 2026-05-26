import {
  HeaderComponent,
  HeadingThreeComponent,
  LinkComponent,
  NavComponent,
} from "@/components/sections/web-components";
import { ConstantRoutes } from "@/constants/constants-routes";
import NextThemesModeToggleComponent from "@/lib/next-themes/components/next-themes-mode-toggle-component";
import BlogHeaderClerkComponent from "./BlogHeaderClerkComponent";

export default function BlogHeaderComponent() {
  return (
    <HeaderComponent className="justify-between p-4">
      <NavComponent className="gap-2">
        <HeadingThreeComponent>
          <LinkComponent href={ConstantRoutes?.home}>Home</LinkComponent>
        </HeadingThreeComponent>
        <HeadingThreeComponent>
          <LinkComponent href={ConstantRoutes?.blog?.home}>Blog</LinkComponent>
        </HeadingThreeComponent>
      </NavComponent>

      <NavComponent className="gap-2">
        <NextThemesModeToggleComponent />
        <BlogHeaderClerkComponent />
      </NavComponent>
    </HeaderComponent>
  );
}
