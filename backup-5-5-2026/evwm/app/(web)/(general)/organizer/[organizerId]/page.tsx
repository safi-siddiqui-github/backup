import WebOrganizerProfileComponent from "./_private/WebOrganizerProfileComponent";

export default async function OrganizerProfilePage(props: {
  params: Promise<{ organizerId: string }>;
}) {
  const params = await props.params;
	const organizerId = params?.organizerId || ""; 
  return <WebOrganizerProfileComponent organizerId={organizerId} />
}