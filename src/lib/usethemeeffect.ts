"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const useThemeEffect = (): boolean => {
  const { theme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<string | undefined>(undefined);

  useEffect(() => {
    setCurrentTheme(theme);
  }, [theme]);

  // Determine if the theme is dark
  const isDarkTheme = currentTheme === "dark";

  return isDarkTheme;
};

export default useThemeEffect;
