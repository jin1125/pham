import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { Highlight } from "react-instantsearch-dom";
import { storage } from "../../firebase";
import { UserContext } from "../../UserContext";

export function hitComponentCo({ hit }) {
  const [companyDemoImg, setCompanyDemoImg] = useState("");
  const {
    selectCompanyAddress,
    selectCompany,
    setSelectCompany,
  } = useContext(UserContext);

  useEffect(() => {
    storage
      .ref()
      .child("company_demo_img.png")
      .getDownloadURL()
      .then(function (url) {
        setCompanyDemoImg(url);
      });      
  }, []);

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
          <div className="grid grid-cols-12 px-3 py-2 border-b items-center">
            <div className="col-span-4 flex items-center">
              {hit.companyImageUrl ? (
                <Image
                  className="inline object-cover rounded-full"
                  width={50}
                  height={50}
                  src={hit.companyImageUrl}
                  alt="Company Image"
                />
              ) : (
                companyDemoImg && (
                  <Image
                    className="inline object-cover rounded-full"
                    width={50}
                    height={50}
                    src={companyDemoImg}
                    alt="Company Image"
                  />
                )
              )}
            </div>

            <div className="col-span-8 break-words">
              <div>
                <Highlight attribute="companyName" tagName="mark" hit={hit} />
              </div>
              <div className="text-xs text-blue-300 ">
                <Highlight
                  attribute="companyPrefecture"
                  tagName="mark"
                  hit={hit}
                />
              </div>
            </div>
          </div>
        ) : (
          hit.companyPrefecture === selectCompanyAddress && (
            <div className="grid grid-cols-12 px-3 py-2 border-b items-center">
              <div className="col-span-4 flex items-center">
                {hit.companyImageUrl ? (
                  <Image
                    className="inline object-cover rounded-full"
                    width={50}
                    height={50}
                    src={hit.companyImageUrl}
                    alt="Company Image"
                  />
                ) : (
                  companyDemoImg && (
                    <Image
                      className="inline object-cover rounded-full"
                      width={50}
                      height={50}
                      src={companyDemoImg}
                      alt="Company Image"
                    />
                  )
                )}
              </div>

              <div className="col-span-8 break-words">
                <div>
                  <Highlight attribute="companyName" tagName="mark" hit={hit} />
                </div>
                <div className="text-xs text-blue-300 ">
                  <Highlight
                    attribute="companyPrefecture"
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
