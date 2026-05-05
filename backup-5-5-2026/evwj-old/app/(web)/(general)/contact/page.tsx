import ContactFormSectionComponent from "@/components/general/contact/ContactFormSectionComponent";
import ContactHeroSectionComponent from "@/components/general/contact/ContactHeroSectionComponent";
import LayoutOneComponent from "@/components/general/layout/LayoutOneComponent";

export default function Page() {
	return (
		<div className="flex flex-col">
			{/*  */}
			<ContactHeroSectionComponent />
			{/*  */}
			<LayoutOneComponent>
				{/*  */}
				<ContactFormSectionComponent />
				{/*  */}
			</LayoutOneComponent>
			{/*  */}
		</div>
	);
}
