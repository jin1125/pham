import Image from "next/image";
import Router from "next/router";
import { useContext, useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { UserContext } from "../../UserContext";
import { SearchPh_L } from "./SearchPh_L";
import { SearchPh_R } from "./SearchPh_R";

export const SearchPh = () => {
  const {
    selectPharmacy,
  } = useContext(UserContext);

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      if (!user) {
        Router.push("/login");
      }
    });

    return () => unSub();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-12">
        {/* ////// 薬局検索(ページ左) ////// */}
        <SearchPh_L/>

        {/* ////// 薬局検索描画(ページ右) ////// */}
        {selectPharmacy ? (
          <SearchPh_R/>
        ) : (
          <div className="h-screen md:col-span-9 col-span-12 justify-self-center self-center md:pt-24">
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
};
