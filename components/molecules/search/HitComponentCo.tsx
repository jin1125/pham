import { useContext, useEffect } from "react";
import { UserContext } from "../../../UserContext";
import { HitCo } from "../../atoms/search/HitCo";

export function hitComponentCo({ hit }) {
  ///////// ステートエリア /////////
  // グローバルなステート
  const { selectCompanyAddress, selectCompany, setSelectCompany, comId } =
    useContext(UserContext);

  ///////// 関数エリア /////////
  // 選んだ検索結果を取得
  const click = (): void => {
    setSelectCompany(hit);
  };

  // 企業詳細ボタンからの遷移時は該当企業を選択済みにする
  useEffect(() => {
    if (comId && comId === hit.objectID) {
      setSelectCompany(hit);
    }
  }, [comId]);

  ///////// JSXエリア /////////
  return (
    <>
      <div
        onClick={click}
        className={
          selectCompany.objectID === hit.objectID
            ? "bg-blue-100 cursor-pointer"
            : "cursor-pointer hover:bg-blue-100"
        }
      >
        {selectCompanyAddress === "" ? (
          <HitCo hit={hit} />
        ) : (
          hit.companyPrefecture === selectCompanyAddress && <HitCo hit={hit} />
        )}
      </div>
    </>
  );
}
