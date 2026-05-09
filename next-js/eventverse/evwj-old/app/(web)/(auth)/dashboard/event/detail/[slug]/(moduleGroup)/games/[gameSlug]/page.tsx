import GamesActivitiesLandingComponent from "@/components/general/games/GamesActivitiesLandingComponent";
import LayoutOneComponent from "@/components/general/layout/LayoutOneComponent";
import { ServerPropType } from "@/type";

export default async function Page(props: ServerPropType) {
	const params = await props.params;
	const { gameSlug, slug } = params ? params : {};
	if (!gameSlug || !slug) {
		return null;
	}
	return (
		<LayoutOneComponent>
			<div className="pt-28 md:pt-32 pb-4 px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
				<GamesActivitiesLandingComponent slug={slug} gameSlug={gameSlug} />
			</div>
		</LayoutOneComponent>
	);
}
