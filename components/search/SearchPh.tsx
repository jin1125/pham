import Image from "next/image";
import Router from "next/router";
import { memo, useContext, useEffect, VFC } from "react";
import { auth } from "../../firebase";
import { UserContext } from "../../UserContext";
import { SearchPh_L } from "./SearchPh_L";
import { SearchPh_R } from "./SearchPh_R";

export const SearchPh: VFC = memo(() => {
  const { selectPharmacy } = useContext(UserContext);

  ///////// 関数エリア /////////
  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      if (!user) {
        Router.push("/login");
      }
    });

    return () => unSub();
  }, []);

  ///////// JSXエリア /////////
  return (
    <div>
      <div className="grid grid-cols-12">
        {/* 薬局検索(ページ左)  */}
        <SearchPh_L />

        {/* 薬局検索描画(ページ右) */}
        {selectPharmacy && Object.keys(selectPharmacy).length ? (
          <SearchPh_R />
        ) : (
          <div className="h-screen md:col-span-9 col-span-12 justify-self-center self-center md:pt-24">
            {/* 未選択時表示画像 */}
            <Image
              src="/pharmacy_search_img.png"
              alt="login_img"
              width={300}
              height={300}
            />
          </div>
        )}
      </div>
    </div>
  );
});
