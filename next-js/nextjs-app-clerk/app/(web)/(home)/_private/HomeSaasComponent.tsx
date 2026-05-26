import {
  FlexColComponent,
  GridComponent,
  HeadingFourComponent,
  HeadingTwoComponent,
  ImageComponent,
  LinkComponent,
  ParagraphComponent,
} from "@/components/sections/web-components";
import { ConstantImages } from "@/constants/constants-images";
import { ConstantRoutes } from "@/constants/constants-routes";

export default function HomeSaasComponent() {
  const sassApps = [
    {
      name: "Blog CMS",
      href: ConstantRoutes?.blog?.home,
      img: ConstantImages?.blogImgage,
      // desc: "Stack - Prisma, PostgreSQL, Clerk, Tiptap, Cloudfare R2",
      desc: "Build in Progress",
    },
    {
      name: "Ecommerce Platform",
      href: ConstantRoutes?.home,
      img: ConstantImages?.logoImage,
      desc: "Upcoming",
    },
    {
      name: "Realtime Chat App",
      href: ConstantRoutes?.home,
      img: ConstantImages?.logoImage,
      desc: "Upcoming",
    },
    {
      name: "AI SaaS",
      href: ConstantRoutes?.home,
      img: ConstantImages?.logoImage,
      desc: "Upcoming",
    },
    {
      name: "ENterprise CRM",
      href: ConstantRoutes?.home,
      img: ConstantImages?.logoImage,
      desc: "Upcoming",
    },
    {
      name: "MVP SaaS",
      href: ConstantRoutes?.home,
      img: ConstantImages?.logoImage,
      desc: "Upcoming",
    },
    {
      name: "Admin Platform",
      href: ConstantRoutes?.home,
      img: ConstantImages?.logoImage,
      desc: "Upcoming",
    },
    {
      name: "Analytics SaaS",
      href: ConstantRoutes?.home,
      img: ConstantImages?.logoImage,
      desc: "Upcoming",
    },
    {
      name: "Social Media Platform",
      href: ConstantRoutes?.home,
      img: ConstantImages?.logoImage,
      desc: "Upcoming",
    },
  ];

  return (
    <FlexColComponent className="gap-6 p-4">
      <FlexColComponent className="items-center text-center">
        <HeadingTwoComponent>My Saas Apps</HeadingTwoComponent>
      </FlexColComponent>

      <GridComponent className="gap-4 *:gap-2 md:grid-cols-2 xl:grid-cols-3">
        {sassApps.map((sassApp, index) => (
          <LinkComponent
            key={index}
            href={sassApp?.href}
          >
            <FlexColComponent className="rounded-2xl">
              <ImageComponent
                imageProps={{
                  src: sassApp?.img,
                }}
                divProps={{
                  className: "h-72",
                }}
              />
              <FlexColComponent className="p-2">
                <HeadingFourComponent>{sassApp?.name}</HeadingFourComponent>
                <ParagraphComponent>{sassApp?.desc}</ParagraphComponent>
              </FlexColComponent>
            </FlexColComponent>
          </LinkComponent>
        ))}
      </GridComponent>
    </FlexColComponent>
  );
}
