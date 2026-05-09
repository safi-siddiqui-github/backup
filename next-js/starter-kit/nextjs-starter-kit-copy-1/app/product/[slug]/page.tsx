import ReadSingleProductAction from "@/actions/product/ReadSingleProductAction";
import ReadSingleProductComponent from "@/components/product/ReadSingleProductComponent";
import UpdateProductComponent from "@/components/product/UpdateProductComponent";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {

  const slug = (await params)?.slug;
  const product = await ReadSingleProductAction(slug);
  if(!product){
    return notFound();
  }

  return (
    <div className="p-5 flex flex-col gap-5 sm:max-w-sm sm:mx-auto">
      <ReadSingleProductComponent product={product} />
      <UpdateProductComponent product={product} />
    </div>
  );
}
