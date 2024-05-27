import { NavLink, useNavigate } from "react-router-dom";
import styles from "./style.module.scss";
import classNames from "classnames";
import React from "react";
import useUserStore from "../../zustand/user";
import { useTranslation } from "react-i18next";

export const Navigation = () => {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  const { i18n } = useTranslation();

  const link = [
    {
      name: "че за платформа?",
      path: "/about",
      icon: "help",
      auth: false,
    },
    {
      name: "поддержка",
      path: "/support",
      icon: "call_quality",
      auth: true,
    },
  ];
  const handleNavigation = () => {
    user ? navigate("/profile") : navigate("/auth?type=signin");
  };

  return (
    <header
      className={user ? styles.cc_navigation__user : styles.cc_navigation}
    >
      <NavLink to={"/"} className={styles.cc_logo}>
        <span>{i18n.t("main_name_first")}</span>
        <span className={styles.logo__span}>
          {i18n.t("main_name_second")}
        </span>{" "}
      </NavLink>

      <nav className={styles.cc_navigation_list}>
        {user
          ? link?.map((item, index) => {
              return (
                <NavLink
                  key={index}
                  className={({ isActive }) =>
                    classNames(
                      styles.cc_navigation_item,
                      isActive && styles.cc_navigation_item__active,
                    )
                  }
                  to={item.path ?? ""}
                >
                  {item.name}
                </NavLink>
              );
            })
          : link
              ?.filter((el) => !el.auth)
              .map((item, index) => {
                return (
                  <NavLink
                    key={index}
                    className={({ isActive }) =>
                      classNames(
                        styles.cc_navigation_item,
                        isActive && styles.cc_navigation_item__active,
                      )
                    }
                    to={item.path ?? ""}
                  >
                    {item.name}
                  </NavLink>
                );
              })}
      </nav>
      <div className={styles.cc_navigation_tool}>
        <p className={styles.cc__profile_link} onClick={handleNavigation}>
          <span className={"material-symbols-rounded"}>person_add</span>
          {user?.surename}
        </p>
      </div>
    </header>
  );
};

export default Navigation;
