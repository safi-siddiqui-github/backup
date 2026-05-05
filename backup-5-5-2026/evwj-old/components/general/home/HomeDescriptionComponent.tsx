import { HomePageProp } from "@/types/home";

export default function HomeDescriptionComponent(prop?: HomePageProp) {
	const { description } = prop ?? {};
	return (
		<p className="text-xs text-current md:text-sm lg:text-base">
			{description}
		</p>
	);
}
