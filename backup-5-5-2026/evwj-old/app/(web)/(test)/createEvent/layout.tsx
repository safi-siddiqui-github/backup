import WebHeaderComponent from "@/components/general/header/WebHeaderComponent";

export default function EventCreateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerHeight = 80;  

  return (
    <div className="flex flex-col min-h-screen">
      {/* <WebHeaderComponent /> */}

      <div
        className="flex-1 w-full overflow-auto"
        // style={{ paddingTop: `${headerHeight}px` }}
      >
        {children}
      </div>
    </div>
  );
}
