import React, { createContext, useState, useEffect } from "react";

interface ContextProps {
  darkTheme: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ContextProps>({
  darkTheme: true,
  toggleTheme: () => {},
});

interface Props {
  children?: React.ReactNode;
}

const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState<boolean>(
    window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches,
  );

  useEffect(() => {
    const handleThemeChange = (e: MediaQueryListEvent) => {
      setDarkTheme(e.matches);
    };

    const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQueryList.addEventListener("change", handleThemeChange);

    return () => {
      mediaQueryList.removeEventListener("change", handleThemeChange);
    };
  }, []);

  const toggleThemeHandler = () => {
    setDarkTheme((prevState) => !prevState);
  };

  return (
    <ThemeContext.Provider
      value={{
        darkTheme: darkTheme,
        toggleTheme: toggleThemeHandler,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
