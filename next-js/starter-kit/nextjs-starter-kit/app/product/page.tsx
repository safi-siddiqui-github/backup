import CreateProductComponent from "@/components/product/CreateProductComponent";
import ReadProductComponent from "@/components/product/ReadProductComponent";
import Link from "next/link";

export default async function Page() {
  return (
    <div className="p-5 flex flex-col gap-5">

      <div className="flex flex-col gap-1 items-center">
        <Link href={'/'}>Go Back</Link>
        <h2 className="font-medium text-xl">Product CRUD</h2>
      </div>

      <div className="flex flex-col gap-5 sm:min-w-96 sm:mx-auto">
        <CreateProductComponent />
        <ReadProductComponent />
      </div>

    </div>
  );
}
