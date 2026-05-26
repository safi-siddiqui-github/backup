import {
  FlexColComponent,
  FlexOneComponent,
  HeadingThreeComponent,
} from "@/components/sections/web-components";
import BlogCmsBlogPostNewComponent from "./_private/component";

export default function Page() {
  return (
    <FlexOneComponent className="gap-10 p-4">
      <FlexColComponent>
        <HeadingThreeComponent>Create New Posts</HeadingThreeComponent>
      </FlexColComponent>

      <BlogCmsBlogPostNewComponent />
    </FlexOneComponent>
  );
}
