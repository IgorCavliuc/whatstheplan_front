import React from "react";
import styles from "./styles.module.scss";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { DashboardIcon } from "../../assets/DashboardIcon";
import classNames from "classnames";
import { ProductIcon } from "../../assets/ProductIcon";
import { FavoriteIcon } from "../../assets/FavoriteIcon";
import { InboxIcon } from "../../assets/InboxIcon";
import { OrderList } from "../../assets/OrderList";
import { SettingsIcon } from "../../assets/SettingsIcon";
import { PowerOfIcon } from "../../assets/PowerOfIcon";
import { removeCookie } from "../../utils";
import { LanguageSwitcher, ThemeMode } from "../../ui";
import useUserStore from "../../zustand/user";

export const Sidebar = () => {
  const { i18n } = useTranslation();
  const user = useUserStore((state) => state.user);

  const link = [
    {
      name: "Dashboard",
      path: "/",
      icon: <DashboardIcon />,
    },
    {
      name: "Products",
      path: "/products",
      icon: <ProductIcon />,
    },
    {
      name: "Favorites",
      path: "/favorites",
      icon: <FavoriteIcon />,
    },
    {
      name: "Inbox",
      path: "/inbox",
      icon: <InboxIcon />,
    },
    {
      name: "Order Lists",
      path: "/order-lists",
      icon: <OrderList />,
    },
    {
      name: "Support",
      path: "/support",
      icon: <DashboardIcon />,
    },
    {
      name: "About",
      path: "/about",
      icon: <DashboardIcon />,
    },
  ];

  return (
    <div className={styles.wallpaper}>
      <NavLink to={"/"} className={styles.cc_logo}>
        <span>{i18n.t("main_name_first")}</span>
        <span className={styles.logo__span}>
          {i18n.t("main_name_second")}
        </span>{" "}
      </NavLink>

      <div className={styles.navigation}>
        {link.map((item, index) => {
          return (
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                classNames(
                  styles.cc_navigation_item,
                  isActive && styles.cc_navigation_item__active,
                )
              }
            >
              <div className={styles.cc_navigation_item_core}>
                {item.icon}
                <p>{item?.name}</p>
              </div>
            </NavLink>
          );
        })}
      </div>
      <div className={styles.settings}>
        <NavLink
          to={"/settings"}
          className={({ isActive }) =>
            classNames(
              styles.cc_navigation_item,
              isActive && styles.cc_navigation_item__active,
            )
          }
        >
          <div className={styles.cc_navigation_item_core}>
            <SettingsIcon />
            <p>Settings</p>
          </div>
        </NavLink>
        <div
          className={styles.cc_navigation_item}
          onClick={() => {
            removeCookie("access_token");
            window.location.reload();
          }}
        >
          <div className={styles.cc_navigation_item_core}>
            <PowerOfIcon />
            <p>Logout</p>
          </div>
        </div>
        <div className={styles.settings_tool}>
          <ThemeMode />
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
};
