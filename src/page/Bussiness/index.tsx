import MainLoyaut from "../../component/MainLoyaut";
import { useTranslation } from "react-i18next";

export const Bussiness = () => {
  const { i18n } = useTranslation();
  return (
    <MainLoyaut>
      <h1>{i18n.t("Hi")}</h1>
    </MainLoyaut>
  );
};
