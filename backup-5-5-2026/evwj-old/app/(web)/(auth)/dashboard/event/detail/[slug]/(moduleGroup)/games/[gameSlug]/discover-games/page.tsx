import GamesCreateLandingComponent from "@/components/general/games/GamesCreateLandingComponent";
import { ServerPropType } from "@/type";

export default async function Page(props: ServerPropType) {
	const params = await props.params;
	const { gameSlug, slug } = params ? params : {};
	if (!gameSlug || !slug) {
		return null;
	}
	return (
		<div className="px-4 pt-28 pb-4 md:px-8 md:pt-32">
			<div className="mx-auto max-w-7xl">
				<GamesCreateLandingComponent slug={slug} gameSlug={gameSlug} />
			</div>
		</div>
	);
}
