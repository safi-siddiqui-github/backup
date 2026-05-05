import { HomePageProp } from "@/types/home";
import HomeCarouselComponent from "./HomeCarouselComponent";
import HomeEmptyComponent from "./HomeEmptyComponent";
import HomeFilterButtonsComponent from "./HomeFilterButtonsComponent";
import HomeHeadingComponent from "./HomeHeadingComponent";
import HomeSeeMoreComponent from "./HomeSeeMoreComponent";

export default function HomeFilterSectionOneComponent(prop?: HomePageProp) {
	const { heading, events, filterButtons, sectionType, defaultFilter } =
		prop ?? {};
	return (
		<div className="flex flex-col gap-5">
			<HomeHeadingComponent heading={heading} />
			<HomeFilterButtonsComponent
				filterButtons={filterButtons}
				sectionType={sectionType}
				defaultFilter={defaultFilter}
			/>
			{(events?.length ?? 0) > 0 ? (
				<>
					<HomeCarouselComponent events={events} sectionType={sectionType} />
					<HomeSeeMoreComponent />
				</>
			) : (
				<HomeEmptyComponent />
			)}
		</div>
	);
}
