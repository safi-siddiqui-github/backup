import { ShadcnAvatarComponent } from "@/components/sections/shadcn-components/general";
import {
  FlexColComponent,
  FlexRowComponent,
  HeadingFourComponent,
  ImageComponent,
  LinkComponent,
  ParagraphComponent,
} from "@/components/sections/web-components";
import { Button } from "@/components/ui/button";
import { ConstantImages } from "@/constants/constants-images";
import { ConstantRoutes } from "@/constants/constants-routes";
import { ResponseDataType } from "@/lib/responses-hanlder/response-types";

export default function BlogPublicBlogPostCardTypeOneComponent(
  props?: ResponseDataType,
) {
  const { title, excerpt, slug } = props?.blogPostPrisma ?? {};

  return (
    <FlexColComponent className="rounded-2xl">
      <ImageComponent
        imageProps={{
          src: ConstantImages?.logoImage,
        }}
        divProps={{
          className: "h-72",
        }}
      />
      <FlexColComponent className="gap-1 p-2">
        <HeadingFourComponent>{title}</HeadingFourComponent>
        <ParagraphComponent className="line-clamp-2">
          {excerpt}
        </ParagraphComponent>

        <LinkComponent>
          <FlexRowComponent className="gap-2">
            <ShadcnAvatarComponent
              avatarImageProps={{
                src: ConstantImages?.logoImage?.src,
              }}
            />
            <ParagraphComponent>User Link</ParagraphComponent>
          </FlexRowComponent>
        </LinkComponent>

        <Button
          variant={"outline"}
          className="w-fit rounded-full"
          asChild
        >
          <LinkComponent href={`${ConstantRoutes?.blog?.home}/${slug}`}>
            Read More
          </LinkComponent>
        </Button>
      </FlexColComponent>
    </FlexColComponent>
  );
}
