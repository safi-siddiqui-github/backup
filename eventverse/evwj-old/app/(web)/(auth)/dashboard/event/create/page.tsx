import PreviewCreateEventV2Component from "@/components/preview/create-event/PreviewCreateEventV2Component";

export default async function Page() {
	//
	return (
		<div className="flex flex-col relative min-h-screen">
			{/* Background gradient and effects for light mode - matching home page */}
			<div className="fixed inset-0 pointer-events-none overflow-hidden dark:hidden block z-0">
				{/* Neutral gradient background */}
				<div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-slate-50 to-zinc-50" />
				{/* Subtle gradient orbs with slow pulse animation - matching dark mode style */}
				<div
					className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-300/30 rounded-full blur-3xl animate-pulse"
					style={{ animationDuration: "8s" }}
				/>
				<div
					className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-slate-300/30 rounded-full blur-3xl animate-pulse"
					style={{ animationDuration: "10s", animationDelay: "2s" }}
				/>
			</div>

			{/* Background gradient and effects for dark mode - matching home page */}
			<div className="fixed inset-0 pointer-events-none overflow-hidden dark:block hidden z-0">
				{/* Neutral dark gradient background */}
				<div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-slate-950 to-black" />
				{/* Subtle gradient orbs with slow pulse animation */}
				<div
					className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-800/20 rounded-full blur-3xl animate-pulse"
					style={{ animationDuration: "8s" }}
				/>
				<div
					className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-slate-800/20 rounded-full blur-3xl animate-pulse"
					style={{ animationDuration: "10s", animationDelay: "2s" }}
				/>
				{/* Subtle grid pattern overlay */}
				<div className="absolute inset-0 bg-[linear-gradient(rgba(156,163,175,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(156,163,175,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
			</div>

			{/* Content wrapper with z-index */}
			<div className="relative z-10 pt-30">
				{/*  */}
				<PreviewCreateEventV2Component />
				{/*  */}
			</div>
			{/* <LayoutOneComponent>
        <div className="flex flex-col gap-6 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <Button
                variant={"outline"}
                asChild
              >
                <Link
                  href={Routes.web.general.events.name}
                  className="flex"
                >
                  <ArrowLeft />

                  <span>Back</span>
                </Link>
              </Button>

              <div className="flex flex-col">
                <p className="text-lg font-medium">Create New Event</p>

                <p className="">Event Title</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Label>
                <Sparkles />

                <span>Quick Create</span>

                <Switch />
              </Label>

              <Button variant={"outline"}>
                <Save />
                <span>Save Draft</span>
              </Button>
            </div>
          </div>

          <div className="hidden flex-col lg:flex">
            <ResizablePanelGroup
              direction="horizontal"
              className="space-x-4"
            >
              <ResizablePanel
                defaultSize={60}
                minSize={30}
              >
                <EventCreateStepSectionComponent />
              </ResizablePanel>

              <ResizableHandle
                withHandle
                className="w-1 rounded-full"
              />

              <ResizablePanel
                defaultSize={40}
                minSize={30}
              >
                <EventCreatePreviewSectionComponent />
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>

          <div className="flex flex-col gap-4 lg:hidden">
            <div className="flex flex-col">
              <EventCreateStepSectionComponent />
            </div>

            <div className="flex flex-col">
              <EventCreatePreviewSectionComponent />
            </div>
          </div>
        </div>

        <DialogEventDateComponent />

        <DialogEventVenueComponent />

        <DialogEventVenueSectionComponent />

        <DialogEventSpecialGuestComponent />

        <DialogEventSpecialGuestImportComponent />

        <DialogEventFaqComponent />
      </LayoutOneComponent> */}
			{/*  */}
		</div>
	);
}
