import React from "react";
import MainLoyaut from "../../../component/MainLoyaut";
import useUserStore from "../../../zustand/user";
import styles from "./styles.module.scss";
import { ImageEmpty } from "../../../assets/ImageEmpty";
import { DocIcon } from "../../../assets/DocIcon";
import { LinearProgress } from "../../../ui";
import { PenIcon } from "../../../assets/PenIcon";

export const Profile = () => {
  const user = useUserStore((state) => state.user);
  const detailArray = [
    { type: "country", value: "Country/City" },
    { type: "work_country", value: "Workers' country" },
    { type: "profession", value: "Profession" },
    { type: "email", value: "Email" },
    { type: "phone", value: "Persone phone" },
    { type: "insta", value: "Instagram" },
    { type: "facebook", value: "Facebook" },
    { type: "telegram", value: "Telegram" },
    { type: "viber", value: "Viber" },
    { type: "whatsapp", value: "WhatsApp" },
  ];

  console.log(user);
  return (
    <MainLoyaut>
      <div className={styles.profile__header}>
        <div className={styles.short__data}>
          <div className={styles.short__data_head}>
            <div className={styles.profile__wallpaper}>
              {user?.image?.wallpaper ? (
                <img src={user?.image?.wallpaper} />
              ) : (
                <>
                  <ImageEmpty />
                  <p>Upload logo</p>
                </>
              )}

              <input />
            </div>
            <div className={styles.header}>
              <div className={styles.main_image}>
                {user?.image?.profile ? (
                  <div className={styles?.profile_icon}>
                    <img src={user?.image?.profile} alt="profile_logo" />
                  </div>
                ) : (
                  <div className={styles.empty__profile}>
                    <ImageEmpty />
                    <p>Upload photo</p>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.small_info}>
              <div className={styles.main_info}>
                <p className={styles.name}>
                  {user?.surename + " " + user?.name}
                </p>
                <div className={styles.profession}>
                  <DocIcon />
                  <p>{user?.profession?.label}</p>
                </div>
              </div>
              {user?.scope?.voice && (
                <div className={styles.raiting}>
                  <LinearProgress
                    value={user?.scope?.value ?? 0}
                    title={`User score — Excellent ( Based on ${user?.scope?.voice} reviews)`}
                  />
                </div>
              )}
            </div>
            <div className={styles.folow}>
              <p>
                Followers —{" "}
                <span>{user?.people_data?.followers_count ?? 0}</span>
              </p>
              <p>
                Following —{" "}
                <span>{user?.people_data?.following_count ?? 0}</span>
              </p>
              <p>
                Visitors — <span>{user?.people_data?.visitor_count ?? 0}</span>
              </p>
            </div>
          </div>
        </div>
        <div className={styles.full__data}>
          <div className={styles.full__data_header}>
            <p>Your details</p>
            <PenIcon />
          </div>
          <div className={styles.more_detail}>
            <div className={styles.more_detail_name}>
              {detailArray.map((item) => (
                <p>{item?.value}</p>
              ))}
            </div>
            <div className={styles.more_detail_data}>
              <p>{user?.country_of_live?.join(", ") ?? "-"}</p>
              <p>{user?.worked_country?.join(", ") ?? "-"}</p>
              <p> {user?.profession?.label ?? "-"}</p>
              <p> {user?.email ?? "-"}</p>
              <p> {user?.contact?.phone ?? "-"}</p>
              <p> {user?.contact?.insta ?? "-"}</p>
              <p> {user?.contact?.facebook ?? "-"}</p>
              <p> {user?.contact?.telegram ?? "-"}</p>
              <p> {user?.contact?.viber ?? "-"}</p>
              <p> {user?.contact?.whatsapp ?? "-"}</p>
            </div>
          </div>
        </div>
      </div>
    </MainLoyaut>
  );
};
