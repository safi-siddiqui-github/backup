import { ShadcnAvatarComponent } from "@/components/sections/shadcn-components/general";
import {
  HeaderComponent,
  LinkComponent,
  NavComponent,
} from "@/components/sections/web-components";
import { ConstantImages } from "@/constants/constants-images";
import { ConstantRoutes } from "@/constants/constants-routes";
import NextThemesModeToggleComponent from "@/lib/next-themes/components/next-themes-mode-toggle-component";

export default function HomeHeaderComponent() {
  return (
    <HeaderComponent
      // Uncomment to make header sticky
      // className="sticky top-0 z-10 p-4 backdrop-blur"
      className="justify-between p-4"
    >
      <NavComponent>
        <LinkComponent href={ConstantRoutes?.home}>
          <ShadcnAvatarComponent
            avatarImageProps={{
              src: ConstantImages?.logoImage?.src,
            }}
          />
        </LinkComponent>
      </NavComponent>

      <NextThemesModeToggleComponent />
    </HeaderComponent>
  );
}
