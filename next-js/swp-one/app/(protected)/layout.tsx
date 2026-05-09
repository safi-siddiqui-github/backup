import { onAuthenticatedUser } from "@/actions/auth";
import Header from "@/components/app/header";
import Sidebar from "@/components/app/sidebar";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userExist = await onAuthenticatedUser();
  if (!userExist.user) {
    redirect("/sign-in");
  }

  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />

      <div className="flex flex-col w-full h-screen overflow-auto px-4 container mx-auto">
        <Header user={userExist?.user} />

        {children}
      </div>
    </div>
  );
}
