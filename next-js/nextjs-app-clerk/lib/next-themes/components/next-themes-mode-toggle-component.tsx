"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback, useEffect } from "react";
import {
  HeaderGetNextThemeCookieAction,
  HeaderSetNextThemeCookieAction,
} from "../actions";

export default function NextThemesModeToggleComponent() {
  const { setTheme, systemTheme, theme } = useTheme();
  // const [_, startTransition] = useTransition();

  const setThemeFN = useCallback(
    async (theme: string) => {
      let modified = theme;

      if (theme === "system") {
        modified = systemTheme || "light";
      }

      await HeaderSetNextThemeCookieAction(modified);
      // startTransition(() => {
      // HeaderSetThemeCookieAction(modified);
      // });

      setTheme(modified);
    },
    [setTheme, systemTheme],
  );

  useEffect(() => {
    const setThemeOnStartup = async () => {
      const getThemeFromCookie = await HeaderGetNextThemeCookieAction();

      if (!getThemeFromCookie) {
        setThemeFN(theme || "system");
      }
    };

    setThemeOnStartup();
  }, [setThemeFN, theme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setThemeFN("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setThemeFN("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setThemeFN("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
