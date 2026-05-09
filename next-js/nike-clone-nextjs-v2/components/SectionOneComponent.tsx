import Image from "next/image";
import Link from "next/link";

export type SectionOneProps = {
  image: string;
  subtitle: string;
  title: string;
  leading: string;
}

export default function SectionOneComponent(props: SectionOneProps) {

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
          <Link
            href={'/'}
            className={`hover:bg-blue-700 bg-black rounded px-4 py-2 text-white font-medium xl:text-base rtd`}
          >
            Explore More
          </Link>

          <Link
            href={'/'}
            className="border shadow rounded px-4 py-2 font-medium hover:shadow-lg xl:text-base rtd"
          >
            Shop Men
          </Link>

        </div>

      </div>

    </div>
  )
}