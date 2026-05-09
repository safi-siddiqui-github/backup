import Image from "next/image";
import Link from "next/link";

export type CardThreeProps = {
  id: string;
  title: string;
  image: string;
  category: string;
  linkText: string;
}

export default function CardThreeComponent(props: {
  cardThreeData: CardThreeProps;
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

          <Link
            href={'/'}
            className="font-medium text-xs hover:underline text-white bg-blue-700 hover:bg-black px-2 py-1 rounded rtd"
          >
            {category}
          </Link>

          <Link
            href={'/'}
            className="hover:bg-black/60 backdrop-blur-sm text-white font-medium px-4 py-2 rounded xl:text-base rtd"
          >
            {linkText}
          </Link>

          {/* <NikeLinkFourComponent href="/nike" title={category} /> */}
          {/* <NikeLinkThreeComponent href="/nike" title={linkText} /> */}

        </div>

      </div>

    </div>

  )
}