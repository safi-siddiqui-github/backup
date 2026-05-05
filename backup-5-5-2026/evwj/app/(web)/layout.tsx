import { GoogleMapProvider } from "@/lib/lib-google-map";
import { TanstackQueryComponent } from "@/lib/lib-tanstack-query";
import { ThemeProviderComponent } from "@/lib/lib-theme-provider";
import { LayoutFileType } from "@/type/type-layout";

export default function Page({ children }: LayoutFileType) {
  return (
    <div className="flex flex-col">
      <ThemeProviderComponent
        attribute="class"
        // defaultTheme="system"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <TanstackQueryComponent>
          <GoogleMapProvider>{children}</GoogleMapProvider>
        </TanstackQueryComponent>
      </ThemeProviderComponent>
    </div>
  );
}
