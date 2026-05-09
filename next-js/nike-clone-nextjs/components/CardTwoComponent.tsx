import Image from "next/image";
import Link from "next/link";

export type CardTwoProps = {
  id: string;
  title: string;
  image: string;
}

export default function CardTwoComponent(props: {
  cardTwoData: CardTwoProps,
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

        <Link
          href={'/'}
          className={`hover:bg-red-700 bg-black rounded px-4 py-2 text-white font-medium xl:text-base rtd`}
        >
          {title}
        </Link>

        <Link
          href={'/'}
          className="hover:bg-black/60 backdrop-blur-sm text-white font-medium px-4 py-2 rounded xl:text-base rtd"
        >
          Explore
        </Link>

      </div>

    </div>

  )
}