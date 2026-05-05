import BattleOfOpinionsSuggestionsComponent from "@/components/general/games/battle-of-opinions/BattleOfOpinionsSuggestionsComponent";
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
			<BattleOfOpinionsSuggestionsComponent slug={slug} gameSlug={gameSlug} />
		</LayoutOneComponent>
	);
}
