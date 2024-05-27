import React from "react";
import styles from "./styles.module.scss";
import { useSearchParams } from "react-router-dom";
export const Congratulation = () => {
  const [, setSearchParams] = useSearchParams();

  return (
    <div className={styles.congratulation}>
      <h1>Кайф!</h1>
      <h2>Ты это сделал...</h2>
      <p onClick={() => setSearchParams({ type: "signin" })}>
        теперь давай зайди в аккаунт
      </p>
    </div>
  );
};
