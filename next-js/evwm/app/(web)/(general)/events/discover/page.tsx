import WebEventDiscoverComponent from "./_private/WebDiscoverEventComponent";

export type CityData = {
	name: string;
	oneLiner: string;
	imageUrl: string;  
};

export type DiscoverPageParams = {
	location?: string;
	category?: string;
};

 
export const CITY_DATA: Record<string, CityData> = {
	"New York": {
		name: "New York",
		oneLiner: "The city that never sleeps",
		imageUrl: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1920&q=80",
	},
	"San Francisco": {
		name: "San Francisco",
		oneLiner: "Golden Gate to innovation",
		imageUrl: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1920&q=80",
	},
};

export const DEFAULT_CITY: CityData = CITY_DATA["New York"];
export default async function DiscoverPage(props: {
	params: DiscoverPageParams;
}) {
	const params: DiscoverPageParams = props.params;

	const location = params?.location
		? decodeURIComponent(params.location)
		: DEFAULT_CITY.name;
	const category = params?.category
		? decodeURIComponent(params.category)
		: undefined;

	return (
		<div>
			<WebEventDiscoverComponent location={location} category={category} />
		</div>
	);
}