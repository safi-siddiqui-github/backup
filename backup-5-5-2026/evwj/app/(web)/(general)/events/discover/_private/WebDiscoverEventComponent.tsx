import WebDiscoverFilterComponent from "./WebDiscoverFilterComponent";
import WebDiscoverHeroComponent from "./WebDiscoverHeroComponent";

export default function WebEventDiscoverComponent() {
  return (
    <div className="flex flex-col text-white">
      <WebDiscoverHeroComponent />
      <WebDiscoverFilterComponent />
    </div>
  );
}
