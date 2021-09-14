import { useEffect, useState } from "react";
import { positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import "tailwindcss/tailwind.css";
import { storage } from "../firebase";
import "../styles/global.css";
import { UserContext } from "../UserContext";

function MyApp({ Component, pageProps }) {
  const [profile, setProfile] = useState({}); 
  const [userId, setUserId] = useState("");
  const [defaultName, setDefaultName] = useState("");
  const [demoImg, setDemoImg] = useState("");
  const [demoImgs, setDemoImgs] = useState("");
  const [companyDemoImg, setCompanyDemoImg] = useState("");
  const [nameTrigger, setNameTrigger] = useState("");
  const [selectProfile, setSelectProfile] = useState("");
  const [selectHomeAddress, setSelectHomeAddress] = useState("");
  const [selectCompany, setSelectCompany] = useState("");
  const [selectCompanyAddress, setSelectCompanyAddress] = useState("");

  useEffect(() => {
    storage
      .ref()
      .child("demo_img.png")
      .getDownloadURL()
      .then(function (url) {
        setDemoImg(url);
      });

    storage
      .ref()
      .child("demo_imgs.jpeg")
      .getDownloadURL()
      .then(function (url) {
        setDemoImgs(url);
      });

    storage
      .ref()
      .child("company_demo_img.png")
      .getDownloadURL()
      .then(function (url) {
        setCompanyDemoImg(url);
      });
  }, []);

  /// アラート設定 ///
  const options = {
    timeout: 2000,
    position: positions.TOP_CENTER,
  };

  ////////////////////////// JSXエリア //////////////////////////
  return (
    <UserContext.Provider
      value={{
        profile,
        setProfile,
        userId,
        setUserId,
        defaultName, 
        setDefaultName,
        demoImg,
        demoImgs,
        companyDemoImg,
        nameTrigger,
        setNameTrigger,
        selectHomeAddress,
        setSelectHomeAddress,
        selectProfile,
        setSelectProfile,
        selectCompanyAddress, 
        setSelectCompanyAddress,
        selectCompany, 
        setSelectCompany,
      }}
    >
      <AlertProvider template={AlertTemplate} {...options}>
        <Component {...pageProps} />
      </AlertProvider>
    </UserContext.Provider>
  );
}

export default MyApp;
