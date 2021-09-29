import Head from "next/head";
import Router from "next/router";
import React, { useEffect } from "react";
import { Layout } from "../../../components/layout/Layout";
import { SearchCo } from "../../../components/search/SearchCo";
import { auth } from "../../../firebase";

export default function search() {
  ///////// 関数エリア /////////
  //  ログインしてなかったらログインページへ
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
