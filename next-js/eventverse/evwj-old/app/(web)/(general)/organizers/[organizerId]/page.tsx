import OrganizerProfileComponent from "@/components/general/organizer/OrganizerProfileComponent";

type PropType = {
	params: Promise<{ organizerId: string }>;
};

export default async function OrganizerProfilePage(props: PropType) {
	const params = await props.params;
	const organizerId = params?.organizerId || "";

	return <OrganizerProfileComponent organizerId={organizerId} />;
}
