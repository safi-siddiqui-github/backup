"use client";

import {
  FlexColComponent,
  FlexRowComponent,
  GridComponent,
  HeadingTwoComponent,
  ParagraphComponent,
} from "@/components/sections/web-components";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ConstantTanstackQueryKeys } from "@/constants/constants-query-keys";
import { useQuery } from "@tanstack/react-query";
import BlogPublicBlogPostCardTypeOneComponent from "../../../_private/BlogPublicBlogPostCardTypeOneComponent";
import BlogPublicHomeBlogPostsAction from "./action";

export default function BlogPublicHomeBlogPostsComponent() {
  const blogRes = useQuery({
    queryKey: [ConstantTanstackQueryKeys?.BlogPublicHomeBlogPostsAction],
    queryFn: async () => await BlogPublicHomeBlogPostsAction(),
  });

  return (
    <FlexColComponent className="gap-4 p-4">
      <FlexColComponent>
        <HeadingTwoComponent>Blog Posts</HeadingTwoComponent>
        <ParagraphComponent>
          Discover a wide range of insightful blog posts on various topics
        </ParagraphComponent>

        {blogRes?.isLoading && <Spinner />}
      </FlexColComponent>

      <FlexRowComponent className="justify-between gap-2">
        <Button variant={"outline"}>Categories Filter</Button>

        <FlexRowComponent className="gap-2">
          <ParagraphComponent>Sort By</ParagraphComponent>
          <Button variant={"outline"}>Newest</Button>
        </FlexRowComponent>
      </FlexRowComponent>

      <GridComponent className="gap-6 *:gap-2 md:grid-cols-3 xl:grid-cols-4">
        {blogRes?.data?.data?.blogPostsPrisma?.map((blogPostPrisma, index) => (
          <BlogPublicBlogPostCardTypeOneComponent
            key={index}
            blogPostPrisma={blogPostPrisma}
          />
        ))}
      </GridComponent>
    </FlexColComponent>
  );
}
