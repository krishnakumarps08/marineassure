"use client";

import { FC } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";

export const ThemeChanger: FC<{ withText?: boolean }> = ({
  withText = true,
}) => {
  const { theme, setTheme } = useTheme();
  console.log(theme)

  return (
    <div>
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="flex items-center gap-x-3 my-4"
      >
        {theme === "dark" ? (
          <>
            <SunIcon className="w-4 h-4" /> {withText && "Light Mode"}
          </>
        ) : (
          <>
            <MoonIcon className="w-4 h-4" /> {withText && "Dark Mode"}
          </>
        )}
      </button>
    </div>
  );
};
