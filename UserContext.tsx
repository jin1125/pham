import { createContext, Dispatch } from "react";

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
    selectCompany: string;
    setSelectCompany: Dispatch<React.SetStateAction<string>>;
    selectPharmacy: string;
    setSelectPharmacy: Dispatch<React.SetStateAction<string>>;
    selectPharmacyAddress: string;
    setSelectPharmacyAddress: Dispatch<React.SetStateAction<string>>;
    selectJob: string;
    setSelectJob: Dispatch<React.SetStateAction<string>>;
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
