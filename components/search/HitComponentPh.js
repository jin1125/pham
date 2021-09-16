import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { Highlight } from "react-instantsearch-dom";
import { storage } from "../../firebase";
import { UserContext } from "../../UserContext";

export function hitComponentPh({ hit }) {
  const [pharmacyDemoImg, setPharmacyDemoImg] = useState("");
  const {
    selectPharmacy,
    setSelectPharmacy,
    selectPharmacyAddress,
    companyId
  } = useContext(UserContext);

  useEffect(() => {
    storage
      .ref()
      .child("pharmacy_demo_img.png")
      .getDownloadURL()
      .then(function (url) {
      setPharmacyDemoImg(url);
      });
  }, []);

  const click = () => {
    setSelectPharmacy(hit);
  };

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
          <div className="grid grid-cols-12 px-3 py-2 border-b items-center">
            <div className="col-span-4 flex items-center">
              {pharmacyDemoImg && (
                <Image
                  className="inline object-cover rounded-full"
                  width={50}
                  height={50}
                  src={pharmacyDemoImg}
                  alt="Company Image"
                />
              )}
            </div>

            <div className="col-span-8 break-words">
              <div>
                <Highlight attribute="pharmacyName" tagName="mark" hit={hit} />
              </div>
              <div className="text-xs text-blue-300 ">
                <Highlight
                  attribute="pharmacyPrefecture"
                  tagName="mark"
                  hit={hit}
                />
              </div>
            </div>
          </div>
        ) : (
          hit.pharmacyPrefecture === selectPharmacyAddress && companyId === hit.coId &&  (
            <div className="grid grid-cols-12 px-3 py-2 border-b items-center">
            <div className="col-span-4 flex items-center">
              {pharmacyDemoImg && (
                <Image
                  className="inline object-cover rounded-full"
                  width={50}
                  height={50}
                  src={pharmacyDemoImg}
                  alt="Company Image"
                />
              )}
            </div>

            <div className="col-span-8 break-words">
              <div>
                <Highlight attribute="pharmacyName" tagName="mark" hit={hit} />
              </div>
              <div className="text-xs text-blue-300">
                <Highlight
                  attribute="pharmacyPrefecture"
                  tagName="mark"
                  hit={hit}
                />
              </div>
            </div>
          </div>
          )
        )}
      </div>
    </>
  );
}
