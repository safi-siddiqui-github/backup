import PuzzleRushSuggestionsComponent from "@/components/general/games/puzzle-rush/PuzzleRushSuggestionsComponent";
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
			<PuzzleRushSuggestionsComponent slug={slug} gameSlug={gameSlug} />
		</LayoutOneComponent>
	);
}
