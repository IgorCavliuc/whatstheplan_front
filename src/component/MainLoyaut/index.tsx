import { Footer, Navigation, Sidebar } from "../index";
import styles from "./styles.module.scss";
import useUserStore from "../../zustand/user";
import React from "react";
import { BgPoint } from "../../assets/BgPoint";

export const MainLoyaut = ({ children, navigation = true }: any) => {
  const user = useUserStore((state) => state.user);

  return (
    <div className={styles.cc__wrapper}>
      <p className={styles.name__background}>{user?.surename}Style</p>
      <div className={styles.point__background}>
        <BgPoint />
      </div>

      <div className={styles.wrapper_body}>
        {user && <Sidebar />}
        <div className={styles.cc__container}>
          <Navigation />
          <div className={styles.children_wrapper}>{children}</div>
        </div>
      </div>
      {/*<Footer />*/}
    </div>
  );
};

export default MainLoyaut;
