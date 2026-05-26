import {
  FlexColComponent,
  FlexRowComponent,
  HeadingFourComponent,
  HeadingThreeComponent,
} from "@/components/sections/web-components";
import {
  FaCss3,
  FaGitAlt,
  FaGithub,
  FaGoogle,
  FaHtml5,
  FaNodeJs,
  FaReact,
  FaWhatsapp,
} from "react-icons/fa6";
import { RiNextjsLine } from "react-icons/ri";
import {
  SiAxios,
  SiGooglemaps,
  SiJavascript,
  SiPostgresql,
  SiPrisma,
  SiReacthookform,
  SiShadcnui,
  SiStripe,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiZod,
} from "react-icons/si";

export default function HomeStackComponent() {
  const skills = [
    {
      name: "HTML",
      icon: <FaHtml5 />,
    },
    {
      name: "CSS",
      icon: <FaCss3 />,
    },
    {
      name: "Tailwindcss",
      icon: <SiTailwindcss />,
    },
    {
      name: "Shadcn",
      icon: <SiShadcnui />,
    },
    {
      name: "JavaScript",
      icon: <SiJavascript />,
    },
    {
      name: "TypeScript",
      icon: <SiTypescript />,
    },
    {
      name: "React",
      icon: <FaReact />,
    },
    {
      name: "Next.js",
      icon: <RiNextjsLine />,
    },
    {
      name: "Node.js",
      icon: <FaNodeJs />,
    },
    {
      name: "Prisma",
      icon: <SiPrisma />,
    },
    {
      name: "PostgreSQL",
      icon: <SiPostgresql />,
    },
    {
      name: "Axios",
      icon: <SiAxios />,
    },
    {
      name: "Git",
      icon: <FaGitAlt />,
    },
    {
      name: "Github API",
      icon: <FaGithub />,
    },
    {
      name: "Google API",
      icon: <FaGoogle />,
    },
    {
      name: "Google Maps",
      icon: <SiGooglemaps />,
    },
    {
      name: "WhatsApp API",
      icon: <FaWhatsapp />,
    },
    {
      name: "Stripe API",
      icon: <SiStripe />,
    },
    {
      name: "Supabase",
      icon: <SiSupabase />,
    },
    {
      name: "React Hook Form",
      icon: <SiReacthookform />,
    },
    {
      name: "Zod",
      icon: <SiZod />,
    },
    {
      name: "Vercel",
      icon: <SiVercel />,
    },
  ];
  return (
    <FlexColComponent className="gap-6 p-4">
      <FlexColComponent className="items-center text-center">
        <HeadingThreeComponent>My Skill Stack</HeadingThreeComponent>
      </FlexColComponent>

      <FlexColComponent className="items-center">
        <FlexColComponent className="max-w-2xl">
          <FlexRowComponent className="justify-center gap-6 *:gap-2 *:*:nth-1:size-8">
            {skills?.map(({ icon, name }, index) => (
              <FlexRowComponent key={index}>
                {icon}
                <HeadingFourComponent>{name}</HeadingFourComponent>
              </FlexRowComponent>
            ))}
          </FlexRowComponent>
        </FlexColComponent>
      </FlexColComponent>
    </FlexColComponent>
  );
}
