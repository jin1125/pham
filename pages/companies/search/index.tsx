import Head from "next/head";
import Router from "next/router";
import React, { useEffect } from "react";
import { SearchCo } from "../../../components/organisms/main/search/SearchCo";
import { Layout } from "../../../components/templates/HeaderLayout";
import { auth } from "../../../firebase";

export default function search() {
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
        <title>Pham 企業検索</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        {/* メインページ */}
        <SearchCo />
      </Layout>
    </div>
  );
}
