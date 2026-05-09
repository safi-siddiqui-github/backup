type NikeButtonOneProps = {
  title: string;
  type: NikeButtonOneTypeEnums;
}

export enum NikeButtonOneTypeEnums {
  BUTTON = 'button',
  SUBMIT = 'submit',
}

export default function NikeButtonOneComponent(props: NikeButtonOneProps) {
  const { type, title } = props;
  return (
    <button
      type={type}
      className="bg-black rounded px-4 py-2 text-white font-medium xl:text-base rtd"
    >
      {title}
    </button>
  )
}