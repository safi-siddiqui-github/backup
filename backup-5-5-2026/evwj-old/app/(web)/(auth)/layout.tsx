import WebHeaderComponent from "@/components/general/header/WebHeaderComponent";

export default function WebAuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full flex-col">
      <WebHeaderComponent />
      {/*  */}
      {children}
      {/*  */}
    </div>
  );
}
