import Image from "next/image";
import Link from "next/link";
import NikeLinkThreeComponent from "../links/NikeLinkThreeComponent";
import NikeLinkFourComponent from "../links/NikeLinkFourComponent";

export type NikeCardThreeProps = {
  id: string;
  title: string;
  image: string;
  category: string;
  linkText: string;
}

export default function NikeCardThreeComponent(props: {
  cardThreeData: NikeCardThreeProps;
}) {

  const { id, title, category, linkText, image } = props.cardThreeData;

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

      <div className="flex flex-col items-start absolute bottom-5 px-4 w-full">

        <Link href={'/nike'} className="font-bold hover:underline hover:backdrop-blur-md hover:p-2 text-2xl text-white rtd">
          {title}
        </Link>

        <div className="flex items-end justify-between w-full">
          <NikeLinkFourComponent href="/nike" title={category} />
          <NikeLinkThreeComponent href="/nike" title={linkText} />
        </div>

      </div>

    </div>

  )
}