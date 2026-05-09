import { Flame, Rocket, Star } from "lucide-react";
import Link from "next/link";
import ImageSwapSectionOneComponent from "./ImageSwapSectionOneComponent";

export enum CardOneTypeEnum {
  LATEST = 'Latest',
  TRENDING = 'Trending',
  SELLER = 'Seller',
}

const CardOneIcons = {
  [CardOneTypeEnum.LATEST]: <Rocket className="size-5 group-hover:animate-pulse" />,
  [CardOneTypeEnum.TRENDING]: <Flame className="size-5 group-hover:animate-pulse" />,
  [CardOneTypeEnum.SELLER]: <Star className="size-5 group-hover:animate-pulse" />,
};

const CardOneColors = {
  [CardOneTypeEnum.LATEST]: 'bg-blue-700',
  [CardOneTypeEnum.TRENDING]: 'bg-green-700',
  [CardOneTypeEnum.SELLER]: 'bg-red-700',
};

export type CardOneProps = {
  id: string;
  title: string;
  category: string;
  price: string;
  images: string[];
  type: CardOneTypeEnum;
}

export default function CardOneComponent(props: {
  cardOneData: CardOneProps,
}) {

  const { id, title, price, category, images, type } = props.cardOneData;

  return (
    <div key={id} className="flex flex-col min-w-fit group">

      <ImageSwapSectionOneComponent images={images} title={title} />

      <div className="flex flex-col items-start py-4 gap-1">

        <Link
          href={'/'}
          className={`flex gap-2 items-center text-white px-4 py-1.5 font-medium rounded tracking-wide ${CardOneColors[type]}`}
        >
          <span className="">{type}</span>
          {CardOneIcons[type]}
        </Link>

        <Link href={'/'} className="font-semibold hover:underline tracking-tight text-2xl line-clamp-1">
          {title}
        </Link>

        <Link
          href={'/'}
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