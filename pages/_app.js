import { useState } from "react";
import { positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import "tailwindcss/tailwind.css";
import "../styles/global.css";
import { UserContext } from "../UserContext";

function MyApp({ Component, pageProps }) {
  const [userId, setUserId] = useState("");
  const [defaultName, setDefaultName] = useState("");
  const [selectProfile, setSelectProfile] = useState("");
  const [selectHomeAddress, setSelectHomeAddress] = useState("");
  const [selectCompany, setSelectCompany] = useState("");
  const [selectCompanyAddress, setSelectCompanyAddress] = useState("");
  const [selectPharmacy, setSelectPharmacy] = useState("");
  const [selectPharmacyAddress, setSelectPharmacyAddress] = useState("");
  const [selectJob, setSelectJob] = useState("");
  const [selectJobAddress, setSelectJobAddress] = useState("");
  const [selectJobEmploymentStatus, setSelectJobEmploymentStatus] =
    useState("");
  const [selectMsg, setSelectMsg] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [pharmacyId, setPharmacyId] = useState("");
  const [pharmId, setPharmId] = useState("");
  const [disabledState, setDisabledState] = useState("");
  const [passId, setPassId] = useState("");
  const [passData, setPassData] = useState("");
  const [receiveId, setReceiveId] = useState("");
  const [receiveData, setReceiveData] = useState("");

  /// アラート設定 ///
  const options = {
    timeout: 2000,
    position: positions.TOP_CENTER,
  };

  ////////////////////////// JSXエリア //////////////////////////
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
        disabledState,
        setDisabledState,
        passId,
        setPassId,
        passData,
        setPassData,
        receiveId,
        setReceiveId,
        receiveData,
        setReceiveData,
      }}
    >
      <AlertProvider template={AlertTemplate} {...options}>
        <Component {...pageProps} />
      </AlertProvider>
    </UserContext.Provider>
  );
}

export default MyApp;
