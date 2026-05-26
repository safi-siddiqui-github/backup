import {
  FlexOneComponent,
  FlexRowComponent,
  HeadingThreeComponent,
  LinkComponent,
} from "@/components/sections/web-components";
import { Button } from "@/components/ui/button";
import { ConstantRoutes } from "@/constants/constants-routes";
import { PlusIcon } from "lucide-react";
import BlogCmsBlogPostsComponent from "./_private/component";

export default function Page() {
  return (
    <FlexOneComponent className="gap-10 p-4">
      <FlexRowComponent className="justify-between">
        <HeadingThreeComponent>My Posts</HeadingThreeComponent>

        <Button
          className="w-fit"
          asChild
        >
          <LinkComponent href={ConstantRoutes?.blog?.posts?.new}>
            <PlusIcon />
            <span>Create New Post</span>
          </LinkComponent>
        </Button>
      </FlexRowComponent>

      <BlogCmsBlogPostsComponent />
    </FlexOneComponent>
  );
}
