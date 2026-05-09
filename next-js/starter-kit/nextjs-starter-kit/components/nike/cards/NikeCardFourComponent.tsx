import NikeImageSwapTwoComponent from "../image/NikeImageSwapTwoComponent";

export type NikeCardFourProps = {
  id: string;
  title: string;
  highlight: string;
  category: string;
  color: string[];
  leadingPrice: string;
  discountedPrice: string;
  discountPercent: string;
  images: string[];
}

export default function NikeCardFourComponent(props: {
  cardFourData: NikeCardFourProps;
}) {

  const { id, title, highlight, category, color, discountPercent, discountedPrice, images, leadingPrice } = props.cardFourData;

  return (
    <div className="flex flex-col gap-1">

      <NikeImageSwapTwoComponent key={`card-four-${id}-${title}-${category}`} images={images} title={title} />

      <div className="flex flex-col">
        <p className="font-medium text-red-700">{highlight}</p>
        <p className="font-medium text-lg">{title}</p>
        <p className="">{category}</p>
        <p className="">Color {color?.length}</p>

        <div className="flex gap-2 ">
          <p className="text-lg lining-nums font-medium">${leadingPrice}</p>
          <p className="text-lg lining-nums line-through">${discountedPrice}</p>
          <p className="text-lg text-green-400">{discountPercent}% off</p>
        </div>
      </div>

    </div>

  )
}