import WebHomeCategoryComponent from "./WebHomeCategoryComponent";
import WebHomeGalleryComponent from "./WebHomeGalleryComponent";
import WebHomeHeroComponent from "./WebHomeHeroComponent";
import WebHomeInformationComponent from "./WebHomeInformationComponent";
import WebHomeOrganizerComponent from "./WebHomeOrganizerComponent";
import WebHomeRecomendedComponent from "./WebHomeRecomendedComponent";
import WebHomeSearchComponent from "./WebHomeSearchComponent";
import WebHomeUpcomingComponent from "./WebHomeUpcomingComponent";

export default function WebHomeComponent() {
  return (
    <div className="flex flex-col gap-20 text-white">
      <WebHomeHeroComponent />

      <div className="flex flex-col gap-20 p-4">
        <WebHomeInformationComponent />
        <WebHomeUpcomingComponent />
        <WebHomeRecomendedComponent />
        <WebHomeOrganizerComponent />
        <WebHomeCategoryComponent />
      </div>

      <WebHomeGalleryComponent />

      <div className="flex flex-col p-4">
        <WebHomeSearchComponent />
      </div>

      <div />
    </div>
  );
}
