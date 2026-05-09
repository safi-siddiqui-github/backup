import Image from "next/image";
import NikeLinkOneComponent, { NikeLinkOneHoverEnums } from "../links/NikeLinkOneComponent";
import NikeLinkTwoComponent from "../links/NikeLinkTwoComponent";

export type NikeSectionOneProps = {
  image: string;
  subtitle: string;
  title: string;
  leading: string;
}

export default function NikeSectionOneComponent(props: NikeSectionOneProps) {

  const { image, subtitle, title, leading } = props;

  return (
    <div className="flex flex-col">

      <div className="w-full h-96 sm:h-[400px] md:h-[450px] lg:h-[550px] xl:h-[650px] relative rtd">
        <Image priority fill src={image} alt="nike-hero-section-one" className="object-cover" />
      </div>

      <div className="flex flex-col p-4 sm:p-6 lg:p-8 items-center text-center sm:text-left gap-6 sm:gap-10 rtd">

        <div className="flex flex-col gap-2 items-center text-center">
          <p className="font-medium sm:text-base lg:text-lg rtd">{subtitle}</p>
          <p className="text-3xl sm:text-5xl lg:text-6xl font-semibold lg:font-bold uppercase rtd">{title}</p>
          <p className="sm:text-xl rtd">{leading}</p>
        </div>

        <div className="flex gap-4 items-center">
          <NikeLinkOneComponent href="/nike" title="Explore More" hoverEffect={NikeLinkOneHoverEnums.BLUE} />
          <NikeLinkTwoComponent href="/nike" title="Shop Men" />
        </div>

      </div>

    </div>
  )
}