import ShopClientComponent from "@/components/ShopClientComponent";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="flex flex-col p-6">

      <Suspense>
        <ShopClientComponent />
      </Suspense>

    </div>
  );
}
