import Head from "next/head";
import Router from "next/router";
import React, { useEffect } from "react";
import { SearchPharm } from "../../../components/organisms/main/search/SearchPharm";
import { Layout } from "../../../components/templates/HeaderLayout";
import { auth } from "../../../firebase";

export default function search() {
  ///////// 関数エリア /////////
  // ログインしてなかったらログインページへ
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
    <div className="min-h-screen">
      <Head>
        <title>Pham 薬局検索</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        {/* メインページ */}
        <SearchPharm />
      </Layout>
    </div>
  );
}
