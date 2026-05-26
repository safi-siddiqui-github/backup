import { ThemeProvider } from "next-themes";
import { ComponentProps } from "react";

/*
Next Themes - prevent remounting ThemeProvider on navigation
Right now your layout likely remounts providers on route change.
*/
export default function NextThemesProviderComponent({
  children,
  ...props
}: ComponentProps<typeof ThemeProvider>) {
  return (
    <ThemeProvider
      {...props}
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
