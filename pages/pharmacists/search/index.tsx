import Head from "next/head";
import Router from "next/router";
import React, { useEffect } from "react";
import { SearchPh } from "../../../components/organisms/main/search/SearchPh";
import { Layout } from "../../../components/templates/HeaderLayout";
import { auth } from "../../../firebase";

export default function profiles() {
  // 定数定義
  const loginPath = "/login";
  
  ///////// 関数エリア /////////
  // ログインしてなかったらログインページへ
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
    <div className="min-h-screen">
      <Head>
        <title>Pham 薬剤師検索</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        {/* メインページ */}
        <SearchPh />
      </Layout>
    </div>
  );
}
