import { Flame, Rocket, Star } from "lucide-react";
import Link from "next/link";
import NikeImageSwapSectionOneComponent from "../image/NikeImageSwapSectionOneComponent";

export enum NikeCardOneTypeEnum {
  LATEST = 'Latest',
  TRENDING = 'Trending',
  SELLER = 'Seller',
}

const NikeCardOneIcons = {
  [NikeCardOneTypeEnum.LATEST]: <Rocket className="size-5 group-hover:animate-pulse" />,
  [NikeCardOneTypeEnum.TRENDING]: <Flame className="size-5 group-hover:animate-pulse" />,
  [NikeCardOneTypeEnum.SELLER]: <Star className="size-5 group-hover:animate-pulse" />,
};

const NikeCardOneColors = {
  [NikeCardOneTypeEnum.LATEST]: 'bg-blue-700',
  [NikeCardOneTypeEnum.TRENDING]: 'bg-green-700',
  [NikeCardOneTypeEnum.SELLER]: 'bg-red-700',
};

export type NikeCardOneProps = {
  id: string;
  title: string;
  category: string;
  price: string;
  images: string[];
  type: NikeCardOneTypeEnum;
}

export default function NikeCardOneComponent(props: {
  cardOneData: NikeCardOneProps,
}) {

  const { id, title, price, category, images, type } = props.cardOneData;

  return (
    <div key={id} className="flex flex-col min-w-fit group">

      <NikeImageSwapSectionOneComponent images={images} title={title} />

      <div className="flex flex-col items-start py-4 gap-1">

        <Link
          href={'/nike'}
          className={`flex gap-2 items-center text-white px-4 py-1.5 font-medium rounded tracking-wide ${NikeCardOneColors[type]}`}
        >
          <span className="">{type}</span>
          {NikeCardOneIcons[type]}
        </Link>

        <Link href={'/nike'} className="font-semibold hover:underline tracking-tight text-2xl line-clamp-1">
          {title}
        </Link>

        <Link
          href={'/nike'}
          aria-label={`View ${title}`}
          className="hover:underline"
        >
          {category}
        </Link>

        <p className="font-semibold text-2xl line-clamp-1">
          ${price}
        </p>

      </div>

    </div>

  )
}