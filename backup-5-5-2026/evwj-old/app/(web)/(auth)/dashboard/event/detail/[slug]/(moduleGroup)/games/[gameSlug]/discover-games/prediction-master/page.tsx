import PredictionMasterSuggestionsComponent from "@/components/general/games/prediction-master/PredictionMasterSuggestionsComponent";
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
			<PredictionMasterSuggestionsComponent slug={slug} gameSlug={gameSlug} />
		</LayoutOneComponent>
	);
}
