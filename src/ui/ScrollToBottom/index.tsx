import React from "react";
import styles from "./style.module.scss";
import classNames from "classnames";

export const ScrollToBottom: React.FC = () => {
  const scrollToBottom = () => {
    window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <button className={styles.button} onClick={scrollToBottom}>
      {" "}
      <span
        className={classNames(
          styles.material_color,
          "material-symbols-rounded",
        )}
      >
        keyboard_double_arrow_down
      </span>
    </button>
  );
};
