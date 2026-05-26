import {
  FlexColComponent,
  FlexRowComponent,
  HeadingFourComponent,
  HeadingOneComponent,
  HeadingTwoComponent,
  ParagraphComponent,
} from "@/components/sections/web-components";
import { FaStar } from "react-icons/fa6";

export default function HomeHeroComponent() {
  return (
    <FlexColComponent className="gap-6">
      <FlexRowComponent className="justify-center gap-2">
        <FaStar />
        <HeadingFourComponent>
          5.0 over 25.8k+ Future Reviews
        </HeadingFourComponent>
      </FlexRowComponent>

      <FlexColComponent className="items-center text-center">
        <HeadingOneComponent className="md:text-6xl">
          Safi Siddiqui
        </HeadingOneComponent>
      </FlexColComponent>

      <FlexColComponent className="items-center gap-1 text-center">
        <HeadingTwoComponent>Full Stack Next.js Developer</HeadingTwoComponent>
        <ParagraphComponent>
          Building Encyclopedia Of SaaS System
        </ParagraphComponent>
      </FlexColComponent>
    </FlexColComponent>
  );
}
