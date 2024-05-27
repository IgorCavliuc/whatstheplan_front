import React from "react";
import { LanguageSwitcher, ThemeMode } from "../../ui";
import styles from "./styles.module.scss";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>© КакойПлан?</p>
      <div className={styles.tool}>
        <LanguageSwitcher />
        <ThemeMode />
      </div>
    </footer>
  );
};
