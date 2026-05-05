import WebEventDetailComponent, { ServerPropType } from "./_private/WebEventDetailComponent";

export default async function EventDetailsPage(props: ServerPropType) {
  const slug = (await props.params)?.slug;
  return <WebEventDetailComponent slug={slug} />;
}
