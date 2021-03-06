import Image from "next/image";
import React, { memo, useEffect, useState, VFC } from "react";
import { Highlight } from "react-instantsearch-dom";
import { storage } from "../../../firebase";

///////// 型定義エリア /////////
type Props = {
  hit: any;
};

export const HitCo: VFC<Props> = memo(({ hit }) => {
  ///////// ステートエリア /////////
  const [companyDemoImg, setCompanyDemoImg] = useState<string>("");

  ///////// 関数エリア /////////
  // ストレージから企業デモ画像取得
  useEffect(() => {
    let isMounted = true;
    (async () => {
      const url = await storage
        .ref()
        .child("company_demo_img.png")
        .getDownloadURL();

      if (isMounted) {
        setCompanyDemoImg(url);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  ///////// JSXエリア /////////
  return (
    // 検索結果
    <div className="grid grid-cols-12 gap-3 px-3 py-2 border-b items-center">
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
          <Highlight attribute="companyPrefecture" tagName="mark" hit={hit} />
        </div>
      </div>
    </div>
  );
});
