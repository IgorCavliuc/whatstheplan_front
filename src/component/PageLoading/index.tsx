import React from "react";
import usePortal from "react-useportal";
import { Loading } from "../../ui/Loading";
import styles from "./styles.module.scss";

export const BigLoading = () => {
  const { Portal } = usePortal();

  return (
    <Portal>
      <div className={styles.container_loading}>
        <Loading />
      </div>
    </Portal>
  );
};
