import HomeSectionTwoComponent from "@/components/general/home/ HomeSectionTwoComponent";
import HomeSectionEightComponent from "@/components/general/home/HomeSectionEightComponent";
import HomeSectionFiveComponent from "@/components/general/home/HomeSectionFiveComponent";
import HomeSectionFourComponent from "@/components/general/home/HomeSectionFourComponent";
import HomeSectionNineComponent from "@/components/general/home/HomeSectionNineComponent";
import HomeSectionOneComponent from "@/components/general/home/HomeSectionOneComponent";
import HomeSectionSevenComponent from "@/components/general/home/HomeSectionSevenComponent";
import HomeSectionSixComponent from "@/components/general/home/HomeSectionSixComponent";
import HomeSectionThreeComponent from "@/components/general/home/HomeSectionThreeComponent";
import LayoutOneComponent from "@/components/general/layout/LayoutOneComponent";

export default function Page() {
  return (
    <div className="flex flex-col">
      {/*  */}
      <HomeSectionOneComponent />
      {/*  */}
      <LayoutOneComponent>
        {/*  */}
        <HomeSectionTwoComponent />
        {/*  */}
        <HomeSectionThreeComponent />
        {/*  */}
        <HomeSectionFourComponent />
        {/*  */}
        <HomeSectionFiveComponent />
        {/*  */}
        <HomeSectionSixComponent />
        {/*  */}
        <HomeSectionSevenComponent />
        {/*  */}
        <HomeSectionEightComponent />
        {/*  */}
        <HomeSectionNineComponent />
        {/*  */}
      </LayoutOneComponent>

      {/*  */}
      {/*  */}
    </div>
  );
}
