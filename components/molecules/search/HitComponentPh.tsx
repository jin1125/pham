import { useContext, useEffect } from "react";
import { auth } from "../../../firebase";
import { Data } from "../../../types/data";
import { UserContext } from "../../../context/UserContext";
import { HitPh } from "../../atoms/search/HitPh";

export function hitComponentPh({ hit }) {
  ///////// ステートエリア /////////
  // グローバルなステート
  const {
    selectHomeAddress,
    setSelectProfile,
    selectProfile,
    userId,
    setUserId,
    setPassId,
    setPassData,
    setReceiveId,
    setReceiveData,
    setDisabledState,
    setLinking,
  } = useContext(UserContext);

  ///////// 関数エリア /////////
  // ユーザーID取得
  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      }
    });
    return () => unSub();
  }, []);

  // 選んだ検索結果を取得
  const click = (): void => {
    if (selectProfile.objectID === hit.objectID) {
      return;
    }
    setSelectProfile(hit);
    setPassId("");
    setPassData({} as Data);
    setReceiveId("");
    setReceiveData({} as Data);
    setDisabledState("");
    setLinking(false)
  };

  ///////// JSXエリア /////////
  return (
    <>
      <div
        onClick={click}
        className={
          selectProfile.objectID === hit.objectID
            ? "bg-blue-100 cursor-pointer"
            : "cursor-pointer hover:bg-blue-100"
        }
      >
        {selectHomeAddress === "" && hit.objectID !== userId ? (
          <HitPh hit={hit} />
        ) : (
          hit.homeAddress === selectHomeAddress &&
          hit.objectID !== userId && <HitPh hit={hit} />
        )}
      </div>
    </>
  );
}
