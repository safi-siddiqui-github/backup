import {
  FlexOneComponent,
  HeadingThreeComponent,
} from "@/components/sections/web-components";
import BlogCmsBlogPostSlugEditComponent from "./_private/component";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = (await params) ?? {};

  return (
    <FlexOneComponent className="gap-10 p-4">
      <HeadingThreeComponent>Edit Post</HeadingThreeComponent>

      <BlogCmsBlogPostSlugEditComponent
        blogPostPrisma={{
          slug,
        }}
      />
    </FlexOneComponent>
  );
}
