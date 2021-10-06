import { createContext, Dispatch } from "react";
import { Data } from "./types/data";
import { SelectCompany } from "./types/selectCompany";
import { SelectJob } from "./types/selectJob";
import { SelectMsg } from "./types/selectMsg";
import { SelectPharmacy } from "./types/selectPharmacy";
import { SelectProfile } from "./types/selectProfile";

export const UserContext = createContext(
  {} as {
    userId: string;
    setUserId: Dispatch<React.SetStateAction<string>>;
    defaultName: string;
    setDefaultName: Dispatch<React.SetStateAction<string>>;
    selectHomeAddress: string;
    setSelectHomeAddress: Dispatch<React.SetStateAction<string>>;
    selectProfile: SelectProfile;
    setSelectProfile: Dispatch<React.SetStateAction<SelectProfile>>;
    selectCompanyAddress: string;
    setSelectCompanyAddress: Dispatch<React.SetStateAction<string>>;
    selectCompany: SelectCompany;
    setSelectCompany: Dispatch<React.SetStateAction<SelectCompany>>;
    selectPharmacy: SelectPharmacy;
    setSelectPharmacy: Dispatch<React.SetStateAction<SelectPharmacy>>;
    selectPharmacyAddress: string;
    setSelectPharmacyAddress: Dispatch<React.SetStateAction<string>>;
    selectJob: SelectJob;
    setSelectJob: Dispatch<React.SetStateAction<SelectJob>>;
    selectJobAddress: string;
    setSelectJobAddress: Dispatch<React.SetStateAction<string>>;
    selectMsg: SelectMsg;
    setSelectMsg: Dispatch<React.SetStateAction<SelectMsg>>;
    companyId: string;
    setCompanyId: Dispatch<React.SetStateAction<string>>;
    selectJobEmploymentStatus: string;
    setSelectJobEmploymentStatus: Dispatch<React.SetStateAction<string>>;
    pharmacyId: string;
    setPharmacyId: Dispatch<React.SetStateAction<string>>;
    pharmId: string;
    setPharmId: Dispatch<React.SetStateAction<string>>;
    comId: string;
    setComId: Dispatch<React.SetStateAction<string>>;
    passId: string;
    setPassId: Dispatch<React.SetStateAction<string>>;
    passData: Data;
    setPassData: Dispatch<React.SetStateAction<Data>>;
    receiveId: string;
    setReceiveId: Dispatch<React.SetStateAction<string>>;
    receiveData: Data;
    setReceiveData: Dispatch<React.SetStateAction<Data>>;
    disabledState: "" | "passed" | "receiveId" | "match" | "initial";
    setDisabledState: Dispatch<
      React.SetStateAction<"" | "passed" | "receiveId" | "match" | "initial">
    >;
    linking:boolean;
    setLinking: Dispatch<React.SetStateAction<boolean>>;
  }
);
