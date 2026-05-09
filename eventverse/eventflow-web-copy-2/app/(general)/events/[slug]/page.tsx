import EventDetailSectionOneComponent from "@/components/general/event-detail/EventDetailSectionOneComponent";
import EventDetailSectionTwoComponent from "@/components/general/event-detail/EventDetailsSectionTwoComponent";
import LayoutOneComponent from "@/components/general/layout/LayoutOneComponent";

type EventsDetailPropType = {
  params: Promise<{ slug: string }>;
};

export default async function Page(props: EventsDetailPropType) {
  const slug = (await props.params)?.slug;
  return (
    <div className="flex flex-col">
      <EventDetailSectionOneComponent />
      {/*  */}
      <LayoutOneComponent>
        {/*  */}
        <EventDetailSectionTwoComponent />
      </LayoutOneComponent>
    </div>
  );
}
