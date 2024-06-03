import React from "react";
import styles from "./styles.module.scss";
import useUserStore from "../../../zustand/user";

export const Congratulation = ({ localUser }: any) => {
  const addUser = useUserStore((state) => state.addUser);

  return (
    <div className={styles.congratulation}>
      <h1>Кайф!</h1>
      <h2>Ты это сделал...</h2>
      <p onClick={() => addUser(localUser)}>теперь давай зайди в аккаунт</p>
    </div>
  );
};
