import { useContext } from "react";
import { UserContext } from "../../UserContext";
import HitCo from "./HitCo";

export function hitComponentCo({ hit }) {
  const { selectCompanyAddress, selectCompany, setSelectCompany } =
    useContext(UserContext);

  const click = () => {
    setSelectCompany(hit);
  };

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
          <HitCo hit={hit}/>
        ) : (
          hit.companyPrefecture === selectCompanyAddress && (
            <HitCo hit={hit}/>
          )
        )}
      </div>
    </>
  );
}
