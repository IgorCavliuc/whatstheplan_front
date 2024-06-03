import React, { useContext, useEffect } from "react";
import { ThemeContext } from "../../theme/ThemeContext";
import styles from "./styles.module.scss";

export const ThemeMode = () => {
  const { themeMode, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const theme = localStorage.getItem("themeMode");
    if (!theme) {
      localStorage.setItem("themeMode", themeMode);
      document.documentElement.setAttribute("data-theme", themeMode);
    }
  }, [themeMode]);

  return (
    <div className={styles.button} onClick={toggleTheme}>
      {themeMode === "dark" ? (
        <span className="material-symbols-rounded">sunny</span>
      ) : (
        <span className="material-symbols-rounded">dark_mode</span>
      )}
    </div>
  );
};
