import { SlidersHorizontal } from "lucide-react";

type NikeButtonTwoProps = {
  title: string;
  type: NikeButtonTwoTypeEnum;
  icon: NikeButtonTwoIconEnum;
  onClickFN?: () => void;
}

export enum NikeButtonTwoTypeEnum {
  BUTTON = 'button',
  SUBMIT = 'submit',
}

export enum NikeButtonTwoIconEnum {
  FILTER = 'filter',
}

const NikeCardOneIcons = {
  [NikeButtonTwoIconEnum.FILTER]: <SlidersHorizontal className="size-5" />,
};

export default function NikeButtonTwoComponent(props: NikeButtonTwoProps) {
  const { type, title, icon, onClickFN } = props;
  return (
    <button
      type={type}
      className="flex items-center bg-black rounded px-4 py-2 gap-2 text-white font-medium xl:text-base rtd"
      onClick={onClickFN}
    >
      {title}
      {NikeCardOneIcons[icon]}
    </button>
  )
}