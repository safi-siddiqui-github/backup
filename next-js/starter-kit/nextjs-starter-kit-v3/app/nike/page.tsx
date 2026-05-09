import NikeDivLayoutOneComponent from "@/components/nike/layouts/NikeDivLayoutOneComponent.";
import NikeCardOneComponent from "@/components/nike/cards/NikeCardOneComponent";
import NikeCardTwoComponent from "@/components/nike/cards/NikeCardTwoComponent";
import NikeCardThreeComponent from "@/components/nike/cards/NikeCardThreeComponent";
import NikeSectionOneComponent from "@/components/nike/sections/NikeSectionOneComponent";
import { categoryData, heroData, highlightData, promotionData } from "@/lib/nike/constants/data";

export default function Page() {

  return (
    <div className="flex flex-col">

      {/* Home Sections */}
      <NikeSectionOneComponent
        title={heroData.title}
        image={heroData.image}
        leading={heroData.leading}
        subtitle={heroData.subtitle}
      />

      <NikeDivLayoutOneComponent componentTitle="Shop Highlights">
        <>
          {
            highlightData.map((eachItem, index) => (
              <NikeCardOneComponent key={`highlight-${index}`} cardOneData={eachItem} />
            ))
          }
        </>
      </NikeDivLayoutOneComponent>

      <NikeDivLayoutOneComponent componentTitle="Featured Categories">
        <>
          {
            categoryData.map((eachItem, index) => (
              <NikeCardTwoComponent key={`category-${index}`} cardTwoData={eachItem} />
            ))
          }
        </>
      </NikeDivLayoutOneComponent>

      <NikeDivLayoutOneComponent componentTitle="Nike Membships">
        <>
          {
            promotionData.map((eachItem, index) => (
              <NikeCardThreeComponent key={`promotion-${index}`} cardThreeData={eachItem} />
            ))
          }
        </>
      </NikeDivLayoutOneComponent>

    </div>
  );
}
