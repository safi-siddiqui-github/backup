import { FlexOneComponent } from "@/components/sections/web-components";
import BlogPublicHomeBlogPostsComponent from "./_private/blog-public-home-blog-posts/component";
import BlogPublicHomeFeaturedComponent from "./_private/blog-public-home-featured/component";
import BlogPublicHomeHeroComponent from "./_private/BlogPublicHomeHeroComponent";

export default function Page() {
  return (
    <FlexOneComponent className="gap-10">
      <BlogPublicHomeHeroComponent />
      <BlogPublicHomeFeaturedComponent />
      <BlogPublicHomeBlogPostsComponent />
    </FlexOneComponent>
  );
}
