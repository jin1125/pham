import { useState } from "react";
import "tailwindcss/tailwind.css";
import "../styles/global.css";
import { UserContext } from "../UserContext";

function MyApp({ Component, pageProps }) {
  const [userName, setUserName] = useState("");

  return (
    <UserContext.Provider value={{userName, setUserName}}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
