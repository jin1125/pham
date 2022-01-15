import { useContext } from "react";
import { UserContext } from "../../../UserContext";
import { HitJob } from "../../atoms/search/HitJob";

export function hitComponentJob({ hit }) {
  ///////// ステートエリア /////////
  // グローバルなステート
  const {
    selectJob,
    setSelectJob,
    selectJobAddress,
    selectJobEmploymentStatus,
    pharmacyId,
    companyId,
  } = useContext(UserContext);

  ///////// 関数エリア /////////
  // 選んだ検索結果を取得
  const click = (): void => {
    setSelectJob(hit);
  };

  ///////// JSXエリア /////////
  return (
    <>
      <div
        onClick={click}
        className={
          selectJob.objectID === hit.objectID
            ? "bg-blue-100 cursor-pointer"
            : "cursor-pointer hover:bg-blue-100"
        }
      >
        {selectJobAddress === hit.jobPrefecture &&
          selectJobEmploymentStatus === hit.employmentStatus &&
          pharmacyId === hit.phId &&
          companyId === hit.coId && <HitJob hit={hit} />}

        {selectJobAddress === hit.jobPrefecture &&
          selectJobEmploymentStatus === hit.employmentStatus &&
          pharmacyId === hit.phId &&
          companyId === "" && <HitJob hit={hit} />}

        {selectJobAddress === hit.jobPrefecture &&
          selectJobEmploymentStatus === hit.employmentStatus &&
          pharmacyId === "" &&
          companyId === hit.coId && <HitJob hit={hit} />}

        {selectJobAddress === hit.jobPrefecture &&
          selectJobEmploymentStatus === hit.employmentStatus &&
          pharmacyId === "" &&
          companyId === "" && <HitJob hit={hit} />}

        {selectJobAddress === hit.jobPrefecture &&
          selectJobEmploymentStatus === "" &&
          pharmacyId === hit.phId &&
          companyId === hit.coId && <HitJob hit={hit} />}

        {selectJobAddress === hit.jobPrefecture &&
          selectJobEmploymentStatus === "" &&
          pharmacyId === hit.phId &&
          companyId === "" && <HitJob hit={hit} />}

        {selectJobAddress === hit.jobPrefecture &&
          selectJobEmploymentStatus === "" &&
          pharmacyId === "" &&
          companyId === hit.coId && <HitJob hit={hit} />}

        {selectJobAddress === hit.jobPrefecture &&
          selectJobEmploymentStatus === "" &&
          pharmacyId === "" &&
          companyId === "" && <HitJob hit={hit} />}

        {selectJobAddress === "" &&
          selectJobEmploymentStatus === hit.employmentStatus &&
          pharmacyId === hit.phId &&
          companyId === hit.coId && <HitJob hit={hit} />}

        {selectJobAddress === "" &&
          selectJobEmploymentStatus === hit.employmentStatus &&
          pharmacyId === hit.phId &&
          companyId === "" && <HitJob hit={hit} />}

        {selectJobAddress === "" &&
          selectJobEmploymentStatus === hit.employmentStatus &&
          pharmacyId === "" &&
          companyId === hit.coId && <HitJob hit={hit} />}

        {selectJobAddress === "" &&
          selectJobEmploymentStatus === hit.employmentStatus &&
          pharmacyId === "" &&
          companyId === "" && <HitJob hit={hit} />}

        {selectJobAddress === "" &&
          selectJobEmploymentStatus === "" &&
          pharmacyId === hit.phId &&
          companyId === hit.coId && <HitJob hit={hit} />}

        {selectJobAddress === "" &&
          selectJobEmploymentStatus === "" &&
          pharmacyId === hit.phId &&
          companyId === "" && <HitJob hit={hit} />}

        {selectJobAddress === "" &&
          selectJobEmploymentStatus === "" &&
          pharmacyId === "" &&
          companyId === hit.coId && <HitJob hit={hit} />}

        {selectJobAddress === "" &&
          selectJobEmploymentStatus === "" &&
          pharmacyId === "" &&
          companyId === "" && <HitJob hit={hit} />}
      </div>
    </>
  );
}
