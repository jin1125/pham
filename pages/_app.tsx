import { AppProps } from "next/app";
import { useState } from "react";
import { positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import "tailwindcss/tailwind.css";
import "../styles/global.css";
import { SelectCompany } from "../types/selectCompany";
import { SelectJob } from "../types/selectJob";
import { SelectMsg } from "../types/selectMsg";
import { SelectPharmacy } from "../types/selectPharmacy";
import { SelectProfile } from "../types/selectProfile";
import { UserContext } from "../UserContext";

export default function App({ Component, pageProps }: AppProps) {
   ///////// ステートエリア /////////
  const [userId, setUserId] = useState<string>("");
  const [defaultName, setDefaultName] = useState<string>("");
  const [selectProfile, setSelectProfile] = useState<SelectProfile>({});
  const [selectHomeAddress, setSelectHomeAddress] = useState<string>("");
  const [selectCompany, setSelectCompany] = useState<SelectCompany>({});
  const [selectCompanyAddress, setSelectCompanyAddress] = useState<string>("");
  const [selectPharmacy, setSelectPharmacy] = useState<SelectPharmacy>({});
  const [selectPharmacyAddress, setSelectPharmacyAddress] =
    useState<string>("");
  const [selectJob, setSelectJob] = useState<SelectJob>({});
  const [selectJobAddress, setSelectJobAddress] = useState<string>("");
  const [selectJobEmploymentStatus, setSelectJobEmploymentStatus] =
    useState<string>("");
  const [selectMsg, setSelectMsg] = useState<SelectProfile>({});
  const [companyId, setCompanyId] = useState<string>("");
  const [pharmacyId, setPharmacyId] = useState<string>("");
  const [pharmId, setPharmId] = useState<string>("");
  const [comId, setComId] = useState<string>("");

  /// アラート設定 ///
  const options: {
    timeout: number;
    position: "top center";
  } = {
    timeout: 2000,
    position: positions.TOP_CENTER,
  };

   ///////// JSXエリア /////////
  return (
    <UserContext.Provider
      value={{
        userId,
        setUserId,
        defaultName,
        setDefaultName,
        selectHomeAddress,
        setSelectHomeAddress,
        selectProfile,
        setSelectProfile,
        selectCompanyAddress,
        setSelectCompanyAddress,
        selectCompany,
        setSelectCompany,
        selectPharmacy,
        setSelectPharmacy,
        selectPharmacyAddress,
        setSelectPharmacyAddress,
        selectJob,
        setSelectJob,
        selectJobAddress,
        setSelectJobAddress,
        selectMsg,
        setSelectMsg,
        companyId,
        setCompanyId,
        selectJobEmploymentStatus,
        setSelectJobEmploymentStatus,
        pharmacyId,
        setPharmacyId,
        pharmId,
        setPharmId,
        comId,
        setComId,
      }}
    >
      <AlertProvider template={AlertTemplate} {...options}>
        <Component {...pageProps} />
      </AlertProvider>
    </UserContext.Provider>
  );
}
