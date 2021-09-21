import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Highlight } from "react-instantsearch-dom";
import { storage } from "../../firebase";

export default function HitJob({ hit }) {
  const [jobDemoImg, setJobDemoImg] = useState("");

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const url = await storage
        .ref()
        .child("job_demo_img.png")
        .getDownloadURL();

      if (isMounted) {
        setJobDemoImg(url);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="grid grid-cols-12 gap-3 px-3 py-2 border-b items-center">
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
          <Highlight attribute="employmentStatus" tagName="mark" hit={hit} />
        </div>
        <div className="text-xs text-blue-300 ">
          <Highlight attribute="jobPrefecture" tagName="mark" hit={hit} />
        </div>
      </div>
    </div>
  );
}
