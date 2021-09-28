import { useContext, useEffect } from "react";
import { UserContext } from "../../UserContext";
import {HitPh} from "./HitPh";

export function hitComponentPh({ hit }) {
  const {
    selectPharmacy,
    setSelectPharmacy,
    selectPharmacyAddress,
    companyId,
    pharmId,
  } = useContext(UserContext);

  const click = ():void => {
    setSelectPharmacy(hit);
  };

 useEffect(()=>{
  if(pharmId && pharmId === hit.objectID){
    setSelectPharmacy(hit);
    
  }
 },[pharmId])

  ////////////////////////// JSXエリア //////////////////////////
  return (
    <>
      <div
        onClick={click}
        className={
          selectPharmacy.objectID === hit.objectID
            ? "bg-blue-100 cursor-pointer"
            : "cursor-pointer hover:bg-blue-100"
        }
      >
        {selectPharmacyAddress === "" && companyId === hit.coId ? (
          <HitPh hit={hit} />
        ) : (
          selectPharmacyAddress === hit.pharmacyPrefecture &&
          companyId === hit.coId && <HitPh hit={hit} />
        )}


        {selectPharmacyAddress === "" && pharmId ===  hit.objectID ? (
          <HitPh hit={hit} />
        ) : (
          selectPharmacyAddress === hit.pharmacyPrefecture &&
          pharmId ===  hit.objectID && <HitPh hit={hit} />
        )}
      </div>
    </>
  );
}
