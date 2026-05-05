import CrowdPuzzleBuilderBoard from "@/components/general/games/crowd-puzzle/CrowdPuzzleBuilderBoard";
import { ServerPropType } from "@/type";

export default async function Page(props: ServerPropType) {
	const params = await props.params;
	const { gameSlug, slug } = params ? params : {};
	if (!gameSlug || !slug) {
		return null;
	}
	return (
		<div className="pt-28 md:pt-32 pb-4 px-4 md:px-8">
			<div className="max-w-7xl mx-auto">
				<CrowdPuzzleBuilderBoard />
			</div>
		</div>
	);
}
