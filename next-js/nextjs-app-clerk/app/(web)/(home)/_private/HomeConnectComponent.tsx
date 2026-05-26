import {
  FlexColComponent,
  FlexColMaxWidthSMComponent,
  FlexRowComponent,
  HeadingFourComponent,
  HeadingThreeComponent,
  LinkComponent,
} from "@/components/sections/web-components";
import { ExternalLinkIcon } from "lucide-react";
import { FaGithub, FaGoogle, FaWhatsapp } from "react-icons/fa6";
import { SiUpwork } from "react-icons/si";

export default function HomeConnectComponent() {
  const connections = [
    {
      name: "Upwork",
      icon: <SiUpwork />,
      href: `https://www.upwork.com/freelancers/~01d057b3173e1e2c63`,
    },
    {
      name: "Github",
      icon: <FaGithub />,
      href: `https://github.com/safi-siddiqui-github`,
    },
    {
      name: "Gmail",
      icon: <FaGoogle />,
      href: `mailto:safisiddiqui.work@gmail.com`,
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp />,
      href: `https://wa.me/00923117737230`,
    },
  ];

  return (
    <FlexColComponent className="gap-6 p-4">
      <FlexColComponent className="items-center text-center">
        <HeadingThreeComponent>Connect With Me</HeadingThreeComponent>
      </FlexColComponent>

      <FlexColComponent className="items-center">
        <FlexColMaxWidthSMComponent>
          <FlexRowComponent className="justify-center gap-6 *:gap-2 *:*:nth-1:size-8 *:*:nth-3:size-4">
            {connections?.map(({ icon, name, href }, index) => (
              <FlexRowComponent key={index}>
                {icon}
                <LinkComponent
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <HeadingFourComponent>{name}</HeadingFourComponent>
                </LinkComponent>

                <ExternalLinkIcon />
              </FlexRowComponent>
            ))}
          </FlexRowComponent>
        </FlexColMaxWidthSMComponent>
      </FlexColComponent>
    </FlexColComponent>
  );
}
