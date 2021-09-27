import { useContext, useEffect } from "react";
import { UserContext } from "../../UserContext";
import { HitCo } from "./HitCo";

export function hitComponentCo({ hit }) {
  const { selectCompanyAddress, selectCompany, setSelectCompany, comId } =
    useContext(UserContext);

  const click = () => {
    setSelectCompany(hit);
  };

  useEffect(() => {
    if (comId && comId === hit.objectID) {
      setSelectCompany(hit);
    }
  }, [comId]);

  ////////////////////////// JSXエリア //////////////////////////
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
