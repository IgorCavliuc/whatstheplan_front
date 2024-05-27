import React, { useContext, useEffect } from "react";
import { ThemeContext } from "../../theme/ThemeContext";
import styles from "./styles.module.scss";

export const ThemeMode = () => {
  const { darkTheme, toggleTheme } = useContext(ThemeContext);
  const storage = localStorage.getItem("data-theme");

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkTheme ? "dark" : "light",
    );
  }, [storage, darkTheme]);

  return (
    <div className={styles.button} onClick={toggleTheme}>
      {darkTheme ? (
        <span className="material-symbols-rounded">sunny</span>
      ) : (
        <span className="material-symbols-rounded">dark_mode</span>
      )}
    </div>
  );
};
