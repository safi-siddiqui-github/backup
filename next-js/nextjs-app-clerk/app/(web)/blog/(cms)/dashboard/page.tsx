import {
  FlexColComponent,
  FlexOneComponent,
  HeadingThreeComponent,
  LinkComponent,
} from "@/components/sections/web-components";
import { Button } from "@/components/ui/button";
import { ConstantRoutes } from "@/constants/constants-routes";
import { ArrowRightIcon } from "lucide-react";

export default function Page() {
  return (
    <FlexOneComponent className="gap-10 p-4">
      <FlexColComponent className="gap-4">
        <HeadingThreeComponent>Dashbaord Page</HeadingThreeComponent>
        <Button
          className="w-fit"
          asChild
        >
          <LinkComponent href={ConstantRoutes?.blog?.posts?.home}>
            My Posts
            <ArrowRightIcon />
          </LinkComponent>
        </Button>
      </FlexColComponent>
    </FlexOneComponent>
  );
}
