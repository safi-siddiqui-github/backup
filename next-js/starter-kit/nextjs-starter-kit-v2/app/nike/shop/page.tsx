import NikeShopClientComponent from "@/components/nike/search/NikeShopClientComponent";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="flex flex-col p-6">

      <Suspense>
        <NikeShopClientComponent />
      </Suspense>

    </div>
  );
}
