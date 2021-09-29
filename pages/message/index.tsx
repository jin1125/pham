import Head from "next/head";
import Router from "next/router";
import React, { useEffect } from "react";
import { Layout } from "../../components/layout/Layout";
import { SearchMsg } from "../../components/search/SearchMsg";
import { auth } from "../../firebase";

export default function message() {
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
        <title>Pham メッセージ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        {/* メインページ */}
        <SearchMsg />
      </Layout>
    </div>
  );
}
