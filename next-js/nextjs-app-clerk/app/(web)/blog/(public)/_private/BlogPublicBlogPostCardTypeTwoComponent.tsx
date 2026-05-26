import { ShadcnAvatarComponent } from "@/components/sections/shadcn-components/general";
import {
  FlexColComponent,
  FlexRowComponent,
  HeadingTwoComponent,
  ImageComponent,
  LinkComponent,
  ParagraphComponent,
} from "@/components/sections/web-components";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConstantImages } from "@/constants/constants-images";
import { ConstantRoutes } from "@/constants/constants-routes";
import { ResponseDataType } from "@/lib/responses-hanlder/response-types";

export default function BlogPublicBlogPostCardTypeTwoComponent(
  props?: ResponseDataType,
) {
  const { title, excerpt, slug } = props?.blogPostPrisma ?? {};

  return (
    <FlexColComponent className="md:gap md:flex-row md:*:nth-2:max-w-sm xl:*:nth-2:max-w-md">
      <ImageComponent
        imageProps={{
          src: ConstantImages?.logoImage,
        }}
        divProps={{
          className: "h-96 md:h-120 xl:h-150",
        }}
      />

      <FlexColComponent className="justify-center gap-4 p-4">
        <Badge># Destination</Badge>
        <HeadingTwoComponent>{title}</HeadingTwoComponent>

        <ParagraphComponent className="line-clamp-2 md:line-clamp-6">
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

        <ParagraphComponent>24 Jan 2024 - 10 mins read</ParagraphComponent>

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
