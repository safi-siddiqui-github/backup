import CardOneComponent from "@/components/CardOneComponent";
import CardThreeComponent from "@/components/CardThreeComponent";
import CardTwoComponent from "@/components/CardTwoComponent";
import DivLayoutOneComponent from "@/components/DivLayoutOneComponent.";
import SectionOneComponent from "@/components/SectionOneComponent";
import { categoryData, heroData, highlightData, promotionData } from "@/utils/data";

export default function Home() {
  return (
    <div className="flex flex-col">

      {/* Home Sections */}
      <SectionOneComponent
        title={heroData.title}
        image={heroData.image}
        leading={heroData.leading}
        subtitle={heroData.subtitle}
      />

      <DivLayoutOneComponent componentTitle="Shop Highlights">
        <>
          {
            highlightData.map((eachItem, index) => (
              <CardOneComponent key={`highlight-${index}`} cardOneData={eachItem} />
            ))
          }
        </>
      </DivLayoutOneComponent>

      <DivLayoutOneComponent componentTitle="Featured Categories">
        <>
          {
            categoryData.map((eachItem, index) => (
              <CardTwoComponent key={`category-${index}`} cardTwoData={eachItem} />
            ))
          }
        </>
      </DivLayoutOneComponent>

      <DivLayoutOneComponent componentTitle="Nike Membships">
        <>
          {
            promotionData.map((eachItem, index) => (
              <CardThreeComponent key={`promotion-${index}`} cardThreeData={eachItem} />
            ))
          }
        </>
      </DivLayoutOneComponent>

    </div>
  );
}
