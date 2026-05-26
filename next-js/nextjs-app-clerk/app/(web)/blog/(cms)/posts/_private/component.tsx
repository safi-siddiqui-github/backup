"use client";

import {
  FlexColComponent,
  FlexRowComponent,
  GridComponent,
  ParagraphComponent,
} from "@/components/sections/web-components";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ConstantTanstackQueryKeys } from "@/constants/constants-query-keys";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import BlogCmsBlogPostCardComponent from "../../_private/blog-cms-blog-post-card/component";
import BlogCmsBlogPostsAction from "./action";

export default function BlogCmsBlogPostsComponent() {
  const { sessionId } = useAuth();
  const blogRes = useQuery({
    queryKey: [ConstantTanstackQueryKeys?.BlogCmsBlogPostsAction, sessionId],
    queryFn: async () => await BlogCmsBlogPostsAction(),
  });

  return (
    <FlexColComponent className="gap-4 p-4">
      <FlexRowComponent className="justify-between gap-2">
        <Button variant={"outline"}>Categories Filter</Button>

        <FlexRowComponent className="gap-2">
          <ParagraphComponent>Sort By</ParagraphComponent>
          <Button variant={"outline"}>Newest</Button>
        </FlexRowComponent>
      </FlexRowComponent>

      <GridComponent className="gap-6 *:gap-2 md:grid-cols-2 xl:grid-cols-3">
        {blogRes?.data?.data?.blogPostsPrisma?.map((blogPostPrisma, index) => (
          <BlogCmsBlogPostCardComponent
            key={index}
            blogPostPrisma={blogPostPrisma}
          />
        ))}

        {blogRes?.isLoading && <Spinner />}
      </GridComponent>
    </FlexColComponent>
  );
}
