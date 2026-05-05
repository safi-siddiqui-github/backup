import BattleOfOpinionsBuilderBoard from "@/components/general/games/battle-of-opinions/BattleOfOpinionsBuilderBoard";
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
			<div className="flex flex-col gap-6 py-4">
				<BattleOfOpinionsBuilderBoard />
			</div>
		</LayoutOneComponent>
	);
}
