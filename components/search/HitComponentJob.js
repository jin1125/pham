import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { Highlight } from "react-instantsearch-dom";
import { storage } from "../../firebase";
import { UserContext } from "../../UserContext";

export function hitComponentJob({ hit }) {
  const [jobDemoImg, setJobDemoImg] = useState("");
  const {
    selectJob,
    setSelectJob,
    selectJobAddress,
    setSelectJobAddress,
    companyId,
  } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const url = await storage
        .ref()
        .child("job_demo_img.png")
        .getDownloadURL();

      setJobDemoImg(url);
    })();
  }, []);

  const click = () => {
    setSelectJob(hit);
  };

  ////////////////////////// JSXエリア //////////////////////////
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
        {selectJobAddress === "" ? (
          <div className="grid grid-cols-12 px-3 py-2 border-b items-center">
            <div className="col-span-4 flex items-center">
              {jobDemoImg && (
                <Image
                  className="inline object-cover rounded-full"
                  width={50}
                  height={50}
                  src={jobDemoImg}
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
          hit.pharmacyPrefecture === selectJobAddress && (
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
                  <Highlight
                    attribute="pharmacyName"
                    tagName="mark"
                    hit={hit}
                  />
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
