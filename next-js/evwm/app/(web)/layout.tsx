import { ThemeProviderComponent } from "@/lib/lib-theme-provider";
import { LayoutFileType } from "@/type/type-layout";

export default function Page({ children }: LayoutFileType) {
  return (
    <div className="w-full flex flex-col   ">
      <ThemeProviderComponent
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProviderComponent>
    </div>
  );
}
