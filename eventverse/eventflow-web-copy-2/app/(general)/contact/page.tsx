import ContactSectionOneComponent from "@/components/general/contact/ContactSectionOneComponent";
import ContactSectionTwoComponent from "@/components/general/contact/ContactSectionTwoComponent";
import LayoutOneComponent from "@/components/general/layout/LayoutOneComponent";

export default function Page() {
  return (
    <div className="flex flex-col">
      <ContactSectionOneComponent />
      {/*  */}
      <LayoutOneComponent>
        {/*  */}
        <ContactSectionTwoComponent />
      </LayoutOneComponent>
    </div>
  );
}
