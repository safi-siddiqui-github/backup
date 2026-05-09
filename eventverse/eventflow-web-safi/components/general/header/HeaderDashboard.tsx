import HeaderAuth from "./HeaderAuth";
import HeaderLogo from "./HeaderLogo";

export default async function HeaderDashboard() {
  return (
    <div className="fixed z-10 flex w-full flex-col border-b bg-white lg:px-8 2xl:items-center">
      <header className="flex flex-wrap items-center justify-between gap-4 p-4 2xl:container">
        <HeaderLogo />

        <nav className="flex flex-wrap items-center gap-4">
          {/* <Button
            variant={"default"}
            asChild
          >
            <Link href={Routes.home}>
              <Component className="size-4" />
              Modules
            </Link>
          </Button> */}

          <HeaderAuth />
        </nav>
      </header>
    </div>
  );
}
