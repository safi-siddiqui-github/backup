import Image from "next/image";
import NikeLinkOneComponent, { NikeLinkOneHoverEnums } from "../links/NikeLinkOneComponent";
import NikeLinkThreeComponent from "../links/NikeLinkThreeComponent";

export type NikeCardTwoProps = {
  id: string;
  title: string;
  image: string;
}

export default function NikeCardTwoComponent(props: {
  cardTwoData: NikeCardTwoProps,
}) {

  const { id, title, image } = props.cardTwoData;

  return (
    <div key={id} className="flex flex-col min-w-fit items-start shadow rounded overflow-hidden relative">

      <Image
        priority
        src={image}
        alt={title}
        width={287}
        height={287}
        className="object-cover w-72 h-96 lg:w-full rtd"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />

      <div className="flex items-center justify-between absolute bottom-5 px-6 w-full">
        <NikeLinkOneComponent href="/nike" title={title} hoverEffect={NikeLinkOneHoverEnums.RED} />
        <NikeLinkThreeComponent href="/nike" title="Explore" />
      </div>

    </div>

  )
}