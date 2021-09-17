import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { storage } from '../../firebase';
import { Highlight } from 'react-instantsearch-dom';


export default function HitPh({hit}) {

const [pharmacyDemoImg, setPharmacyDemoImg] = useState("");

useEffect(() => {
  (async () => {
    const url = await storage
      .ref()
      .child("pharmacy_demo_img.png")
      .getDownloadURL()
        setPharmacyDemoImg(url);
  })();
}, []);

  
  return (
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
  )
}
