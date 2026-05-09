import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password - EventFlow",
};

export default function ForgotPasswordLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="">{children}</div>;
}
