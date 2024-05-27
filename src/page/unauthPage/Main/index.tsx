import MainLoyaut from "../../../component/MainLoyaut";
import { useTranslation } from "react-i18next";
import Typewriter from "../../../ui/Typewriter";
import styles from "./style.module.scss";

export const Main = () => {
  const { i18n } = useTranslation();
  return (
    <MainLoyaut>
      <div className={styles.cc__main}>
        <div className={styles.cc__main_wallpaper}>
          <strong className={styles.cc__title}>
            {i18n.t("main_name_first")}
            <span>{i18n.t("main_name_second")}</span>
          </strong>
          <p className={styles.cc__description}>
            <Typewriter text={i18n.t("main_description")} delay={50} />
          </p>
        </div>
      </div>
    </MainLoyaut>
  );
};
