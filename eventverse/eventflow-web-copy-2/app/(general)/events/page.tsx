import EventsSectionTwoComponent from "@/components/general/events/EventSectionTwoComponent";
import EventsSectionOneComponent from "@/components/general/events/EventsSectionOneComponent";
import LayoutOneComponent from "@/components/general/layout/LayoutOneComponent";

export default function Page() {
  return (
    <div className="flex flex-col">
      <EventsSectionOneComponent />
      {/*  */}
      <LayoutOneComponent>
        {/*  */}
        <EventsSectionTwoComponent />
      </LayoutOneComponent>
    </div>
  );
}
