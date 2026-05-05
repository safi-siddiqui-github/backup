import { HomePageProp } from "@/types/home";

export default function HomeHeadingComponent(prop?: HomePageProp) {
	const { heading } = prop ?? {};
	return (
		<p className="text-xl text-current md:text-2xl lg:text-3xl xl:text-4xl">
			{heading}
		</p>
	);
}
