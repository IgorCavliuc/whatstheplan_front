import React from "react";
import MainLoyaut from "../../../component/MainLoyaut";
import useUserStore from "../../../zustand/user";

export const Home = () => {
  const user = useUserStore((state) => state.user);

  return (
    <MainLoyaut>
      <div>
        <h1>Салам алейкум {user?.surename + " " + user?.name}!</h1>
        <h2>как сам?</h2>
      </div>
    </MainLoyaut>
  );
};
