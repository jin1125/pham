import { createContext, Dispatch } from "react";
import { SelectCompany } from "./types/selectCompany";
import { SelectJob } from "./types/selectJob";

export const UserContext = createContext(
  {} as {
    userId: string;
    setUserId: Dispatch<React.SetStateAction<string>>;
    defaultName: string;
    setDefaultName: Dispatch<React.SetStateAction<string>>;
    selectHomeAddress: string;
    setSelectHomeAddress: Dispatch<React.SetStateAction<string>>;
    selectProfile: string;
    setSelectProfile: Dispatch<React.SetStateAction<string>>;
    selectCompanyAddress: string;
    setSelectCompanyAddress: Dispatch<React.SetStateAction<string>>;
    selectCompany: SelectCompany;
    setSelectCompany: Dispatch<React.SetStateAction<SelectCompany>>;
    selectPharmacy: string;
    setSelectPharmacy: Dispatch<React.SetStateAction<string>>;
    selectPharmacyAddress: string;
    setSelectPharmacyAddress: Dispatch<React.SetStateAction<string>>;
    selectJob: SelectJob;
    setSelectJob: Dispatch<React.SetStateAction<SelectJob>>;
    selectJobAddress: string;
    setSelectJobAddress: Dispatch<React.SetStateAction<string>>;
    selectMsg: string;
    setSelectMsg: Dispatch<React.SetStateAction<string>>;
    selectCoMsg: string;
    setSelectCoMsg: Dispatch<React.SetStateAction<string>>;
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
  }
);
