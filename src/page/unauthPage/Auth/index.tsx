import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { SignUpLogo } from "../../../assets/SignUpLogo";
import { useSearchParams } from "react-router-dom";
import { Congratulation } from "./Congratulation";
import MainLoyaut from "../../../component/MainLoyaut";
import { CongratulationLogo } from "../../../assets/congratulationLogo";

export const Auth = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (
      searchParams.get("type") === "congratulation" ||
      !searchParams.get("type")
    ) {
      setSearchParams({ type: "signin" });
    }
    // eslint-disable-next-line
  }, []);

  const renderComponent = () => {
    switch (searchParams.get("type")) {
      case "signin":
        return (
          <>
            <SignIn />
            <SignUpLogo />
          </>
        );
      case "signup":
        return (
          <>
            <SignUp />
            <SignUpLogo />
          </>
        );
      case "congratulation":
        return (
          <>
            <Congratulation /> <CongratulationLogo />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <MainLoyaut navigation={false}>
      <div className={styles.background__container}>{renderComponent()}</div>
    </MainLoyaut>
  );
};
