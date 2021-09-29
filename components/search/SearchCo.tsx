import Image from "next/image";
import Router from "next/router";
import { memo, useContext, useEffect, VFC } from "react";
import { auth } from "../../firebase";
import { UserContext } from "../../UserContext";
import { SearchCo_L } from "./SearchCo_L";
import { SearchCo_R } from "./SearchCo_R";

export const SearchCo: VFC = memo(() => {
  const { selectCompany } = useContext(UserContext);

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
         {/* 企業検索(ページ左)  */}
        <SearchCo_L />

         {/* 企業検索描画(ページ右)  */}
        {selectCompany && Object.keys(selectCompany).length ? (
          <SearchCo_R />
        ) : (
          <div className="h-screen md:col-span-9 col-span-12 justify-self-center self-center md:pt-24">
            {/* 未選択時表示画像 */}
            <Image
              src="/companies_search_img.png"
              alt="login_img"
              width={400}
              height={300}
            />
          </div>
        )}
      </div>
    </div>
  );
});
