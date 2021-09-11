import Head from "next/head";
import React from "react";
import Layout from "../../../components/layout/Layout";
import Search from "../../../components/search/Search";

export default function profiles() {
  return (
    <div className="min-h-screen">
      <Head>
        <title>Pham 薬剤師検索結果</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Search name={"名前"} address={"住所"}/>
      </Layout>
    </div>
  );
}