import { ReactNode } from "react";

type LayoutOneComponentType = {
  children?: ReactNode;
};

export default function LayoutOneComponent({
  children,
}: LayoutOneComponentType) {
  return (
    <div className="flex flex-col px-4 2xl:items-center">
      {/*  */}
      <div className="flex flex-col 2xl:container">
        {/*  */}
        {children}
        {/*  */}
      </div>
      {/*  */}
    </div>
  );
}
