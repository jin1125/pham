import Image from "next/image";
import Router from "next/router";
import { memo, useContext, useEffect, VFC } from "react";
import { auth } from "../../../../firebase";
import { UserContext } from "../../../../UserContext";
import { SearchPharm_L } from "./SearchPharm_L";
import { SearchPharm_R } from "./SearchPharm_R";

export const SearchPharm: VFC = memo(() => {
  ///////// ステートエリア /////////
  // グローバルなステート
  const { selectPharmacy } = useContext(UserContext);

  // 定数定義
  const loginPath = "/login";

  ///////// 関数エリア /////////
  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      if (!user) {
        Router.push(loginPath);
      }
    });

    return () => unSub();
  }, []);

  ///////// JSXエリア /////////
  return (
    <div>
      <div className="grid grid-cols-12">
        {/* 薬局検索(ページ左)  */}
        <SearchPharm_L />

        {/* 薬局検索描画(ページ右) */}
        {selectPharmacy && Object.keys(selectPharmacy).length ? (
          <SearchPharm_R />
        ) : (
          <div 
            className="h-screen md:col-span-9 col-span-12 
            justify-self-center self-center md:pt-24"
          >
            {/* 未選択時の表示画像 */}
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
