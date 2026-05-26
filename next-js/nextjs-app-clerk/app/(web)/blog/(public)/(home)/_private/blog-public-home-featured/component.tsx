"use client";

import { ShadcnCarouselComponent } from "@/components/sections/shadcn-components/client";
import {
  FlexColComponent,
  HeadingTwoComponent,
  ParagraphComponent,
} from "@/components/sections/web-components";
import { Spinner } from "@/components/ui/spinner";
import { ConstantTanstackQueryKeys } from "@/constants/constants-query-keys";
import { useQuery } from "@tanstack/react-query";
import BlogPublicBlogPostCardTypeTwoComponent from "../../../_private/BlogPublicBlogPostCardTypeTwoComponent";
import BlogPublicHomeFeaturedAction from "./action";

export default function BlogPublicHomeFeaturedComponent() {
  const blogRes = useQuery({
    queryKey: [ConstantTanstackQueryKeys?.BlogPublicHomeFeaturedAction],
    queryFn: async () => await BlogPublicHomeFeaturedAction(),
  });

  return (
    <FlexColComponent className="">
      <FlexColComponent className="gap-1 p-4">
        <HeadingTwoComponent>Featured Blogs</HeadingTwoComponent>
        <ParagraphComponent>
          Discover a wide range of insightful blog posts on various topics
        </ParagraphComponent>
        {blogRes?.isLoading && <Spinner />}
      </FlexColComponent>

      <FlexColComponent>
        <ShadcnCarouselComponent
          carouselArray={[
            ...(blogRes?.data?.data?.blogPostsPrisma?.map(
              (blogPostPrisma, index) => (
                <BlogPublicBlogPostCardTypeTwoComponent
                  key={index}
                  blogPostPrisma={blogPostPrisma}
                />
              ),
            ) ?? []),
          ]}
        />
      </FlexColComponent>
    </FlexColComponent>
  );
}
