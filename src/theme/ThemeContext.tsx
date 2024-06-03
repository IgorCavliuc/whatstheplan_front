import React, { createContext, useState, useEffect, useCallback } from "react";

interface ContextProps {
  themeMode: string;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ContextProps>({
  themeMode: "dark",
  toggleTheme: () => {},
});

interface Props {
  children?: React.ReactNode;
}

const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [themeMode, setThemeMode] = useState(
    localStorage.getItem("themeMode") || "dark",
  );

  useEffect(() => {
    const handleThemeChange = (e: MediaQueryListEvent) => {
      const newTheme = e.matches ? "dark" : "light";
      localStorage.setItem("themeMode", newTheme);
      setThemeMode(newTheme);
    };

    const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQueryList.addEventListener("change", handleThemeChange);

    return () => {
      mediaQueryList.removeEventListener("change", handleThemeChange);
    };
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeMode);
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  const toggleThemeHandler = useCallback(() => {
    const newTheme = themeMode === "dark" ? "light" : "dark";
    setThemeMode(newTheme);
  }, [themeMode]);

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        toggleTheme: toggleThemeHandler,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
