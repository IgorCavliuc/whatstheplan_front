import { useNavigate } from "react-router-dom";
import styles from "./style.module.scss";
import React from "react";
import useUserStore from "../../zustand/user";
import { useTranslation } from "react-i18next";

export const Navigation = () => {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  const { i18n } = useTranslation();

  const handleNavigation = () => {
    user ? navigate("/profile") : navigate("/auth?type=signin");
  };

  return (
    <header
      className={user ? styles.cc_navigation__user : styles.cc_navigation}
    >
      <div className={styles.cc_navigation_tool}>
        <div className={styles.cc__profile_link} onClick={handleNavigation}>
          <div className={styles.name_role}>
            <p>
              {user?.surename} {user?.name}
            </p>
            <span>{user?.profession?.label}</span>
          </div>
          {user?.image.profile ? (
            <div className={styles?.profile_icon}>
              <img src={user?.image?.profile} alt="profile_logo" />
            </div>
          ) : (
            <span className={"material-symbols-rounded"}>person_add</span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navigation;
