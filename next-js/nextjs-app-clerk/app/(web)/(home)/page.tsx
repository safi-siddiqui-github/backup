import { FlexOneComponent } from "@/components/sections/web-components";
import HomeConnectComponent from "./_private/HomeConnectComponent";
import HomeHeroComponent from "./_private/HomeHeroComponent";
import HomeSaasComponent from "./_private/HomeSaasComponent";
import HomeStackComponent from "./_private/HomeStackComponent";

export default function Page() {
  return (
    <FlexOneComponent className="gap-10 pt-20">
      <HomeHeroComponent />
      <HomeConnectComponent />
      <HomeStackComponent />
      <HomeSaasComponent />
    </FlexOneComponent>
  );
}
