"use client";

import {
  FlexColComponent,
  FlexOneComponent,
  GridComponent,
  HeadingFourComponent,
  HeadingTwoComponent,
  ImageComponent,
  ParagraphComponent,
} from "@/components/sections/web-components";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { ConstantImages } from "@/constants/constants-images";
import { ConstantTanstackQueryKeys } from "@/constants/constants-query-keys";
import { ResponseDataType } from "@/lib/responses-hanlder/response-types";
import { useQuery } from "@tanstack/react-query";
import BlogPublicBlogPostCardTypeOneComponent from "../../_private/BlogPublicBlogPostCardTypeOneComponent";
import {
  BlogPublicBlogPostSlugAction,
  BlogPublicBlogPostSlugRecomendAction,
} from "./actions";

export default function BlogPublicBlogPostSlugComponent(
  props: ResponseDataType,
) {
  const { slug } = props?.blogPostPrisma ?? {};

  const blogSlugRes = useQuery({
    queryKey: [ConstantTanstackQueryKeys?.BlogPublicBlogPostSlugAction, slug],
    queryFn: async () => await BlogPublicBlogPostSlugAction(props),
  });

  const { title, excerpt } = blogSlugRes?.data?.data?.blogPostPrisma ?? {};

  const blogRecomendRes = useQuery({
    queryKey: [
      ConstantTanstackQueryKeys?.BlogPublicBlogPostSlugRecomendAction,
      slug,
    ],
    queryFn: async () => await BlogPublicBlogPostSlugRecomendAction(),
  });

  return (
    <FlexOneComponent className="gap-10 p-4">
      {blogSlugRes?.isLoading && <Spinner />}

      <FlexColComponent className="items-center gap-2 text-center">
        <Badge>Features</Badge>
        <HeadingTwoComponent>{title}</HeadingTwoComponent>
        <ParagraphComponent>22 Jan 2026 - 10 min read</ParagraphComponent>
        <ParagraphComponent>{excerpt}</ParagraphComponent>
      </FlexColComponent>

      <ImageComponent
        divProps={{
          className: "h-96 rounded-2xl",
        }}
        imageProps={{
          src: ConstantImages?.logoImage,
        }}
      />

      <FlexColComponent className="md:flex-row">
        <FlexColComponent className="hidden gap-1 md:flex md:max-w-44 md:flex-1">
          <HeadingFourComponent>Topics</HeadingFourComponent>

          {Array.from({ length: 10 })?.map((_, index) => (
            <ParagraphComponent key={index}>Topic One</ParagraphComponent>
          ))}
        </FlexColComponent>
        <FlexColComponent className="gap-4 md:flex-1">
          {Array.from({ length: 10 })?.map((_, index) => (
            <FlexColComponent
              className="gap-1"
              key={index}
            >
              <HeadingFourComponent>Topic Title</HeadingFourComponent>
              <ParagraphComponent>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
                accusamus cupiditate aut, maxime deleniti corrupti aspernatur
                porro ratione omnis eius, qui reiciendis distinctio facilis in
                ea cum mollitia! Totam, ratione?
              </ParagraphComponent>
            </FlexColComponent>
          ))}
        </FlexColComponent>
      </FlexColComponent>

      <FlexColComponent className="gap-4">
        <HeadingTwoComponent>Recomended Articles</HeadingTwoComponent>

        {blogRecomendRes?.isLoading && <Spinner />}

        <GridComponent className="gap-4 md:grid-cols-3 xl:grid-cols-4">
          {blogRecomendRes?.data?.data?.blogPostsPrisma?.map(
            (blogPostPrismaRD, index) => (
              <BlogPublicBlogPostCardTypeOneComponent
                key={index}
                blogPostPrisma={blogPostPrismaRD}
              />
            ),
          )}
        </GridComponent>
      </FlexColComponent>
    </FlexOneComponent>
  );
}
