import {
  FlexColComponent,
  FlexRowComponent,
  HeadingOneComponent,
  ParagraphComponent,
} from "@/components/sections/web-components";
import { Button } from "@/components/ui/button";

export default function BlogPublicHomeHeroComponent() {
  return (
    <FlexColComponent className="gap-4 px-4 py-40">
      <FlexColComponent className="gap-2 text-center">
        <HeadingOneComponent>Discover our blogs</HeadingOneComponent>
        <ParagraphComponent>
          Discover a wide range of insightful blog posts on various topics
        </ParagraphComponent>
      </FlexColComponent>

      <FlexRowComponent className="justify-center gap-2">
        <Button>Show Blogs</Button>
        <Button variant={"outline"}>View More</Button>
      </FlexRowComponent>
    </FlexColComponent>
  );
}
