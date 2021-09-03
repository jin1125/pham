import { useEffect, useState } from "react";
import { positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import "tailwindcss/tailwind.css";
import { auth } from "../firebase";
import "../styles/global.css";
import { UserContext } from "../UserContext";

function MyApp({ Component, pageProps }) {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      setUserId(user.uid);
      setUserName(user.displayName);
      setUserEmail(user.email);
    });
    return () => unSub();
  }, []);

  const options = {
    timeout: 3000,
    position: positions.TOP_CENTER,
  };

  return (
    <UserContext.Provider value={{ userId, userName, userEmail }}>
      <AlertProvider template={AlertTemplate} {...options}>
        <Component {...pageProps} />
      </AlertProvider>
    </UserContext.Provider>
  );
}

export default MyApp;
