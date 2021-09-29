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

   ///////// 関数エリア /////////
   // 選んだ検索結果を取得
  const click = ():void => {
    setSelectPharmacy(hit);
  };

  // 薬局詳細ボタンからの遷移時は該当薬局を選択済みにする
 useEffect(()=>{
  if(pharmId && pharmId === hit.objectID){
    setSelectPharmacy(hit);
    
  }
 },[pharmId])

   ///////// JSXエリア /////////
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