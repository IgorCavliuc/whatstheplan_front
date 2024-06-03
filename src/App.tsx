import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { About, Auth, Home, Main, Profile, Support } from "./page";
import "./language/index";
import useUserStore from "./zustand/user";
import { useEffect, useState } from "react";
import { themeMode } from "./theme";
import { getCookie, setCookie } from "./utils";
import { getUser, refreshToken } from "./service";
import { BigLoading } from "./component/PageLoading";

function App() {
  const [loading, setLoading] = useState(true);
  const addUser = useUserStore((state) => state.addUser);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const lang = localStorage.getItem("lang");
    if (!lang) {
      localStorage.setItem("lang", "ro");
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    const userLocal = JSON.parse(String(localStorage.getItem("user")));
    if (userLocal) addUser(userLocal);

    document.documentElement.setAttribute("data-theme", themeMode);

    setLoading(false);
    // eslint-disable-next-line
  }, [themeMode]);

  useEffect(() => {
    const accessTokenCookie = getCookie("access_token");

    const refresh = async () => {
      try {
        if (accessTokenCookie) {
          const res = await refreshToken(accessTokenCookie);
          setCookie("access_token", res.userData.refresh_access_token);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    refresh();

    const fetchData = async () => {
      try {
        if (accessTokenCookie) {
          console.log("sdfdsdfsdfd");
          const res = await getUser(accessTokenCookie);

          console.log("res", res);
          addUser(res.userData);
        }
      } catch (error) {
        console.log("sdfd");
        // window.location.href = "/";
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [addUser]);

  if (loading) {
    return <BigLoading />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {user ? (
          <>
            <Route path="profile" element={<Profile />} />
            <Route path="/" element={<Home />} />
            {/*<Route path="about" element={<About />} />*/}
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Main />} />
            <Route path="auth" element={<Auth />} />
          </>
        )}
        <Route path="about" element={<About />} />
        <Route path="support" element={<Support />} />
        {/*<Route path="*" element={<Navigate to="/" />} />*/}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
