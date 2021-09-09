import Head from "next/head";
import React from "react";
import Layout from "../../../components/layout/Layout";

export default function profiles() {
  return (
    <div className="min-h-screen">
      <Head>
        <title>Pham 薬剤師検索結果</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div>薬剤師検索結果</div>
      </Layout>
    </div>
  );
}
