import Image from "next/image";
import React, { memo, useEffect, useState, VFC } from "react";
import { Highlight } from "react-instantsearch-dom";
import { storage } from "../../../firebase";

///////// 型定義エリア /////////
type Props = {
  hit: any;
};

export const HitPharm: VFC<Props> = memo(({ hit }) => {
  ///////// ステートエリア /////////
  const [pharmacyDemoImg, setPharmacyDemoImg] = useState<string>("");

  ///////// 関数エリア /////////
  //  ストレージから薬局デモ画像取得
  useEffect(() => {
    let isMounted = true;
    (async () => {
      const url = await storage
        .ref()
        .child("pharmacy_demo_img.png")
        .getDownloadURL();

      if (isMounted) {
        setPharmacyDemoImg(url);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  ///////// JSXエリア /////////
  return (
    // 検索結果
    <div className="grid grid-cols-12 gap-3  px-3 py-2 border-b items-center">
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
          <Highlight attribute="pharmacyPrefecture" tagName="mark" hit={hit} />
        </div>
      </div>
    </div>
  );
});
