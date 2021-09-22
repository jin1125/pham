import Head from "next/head";
import React from "react";
import { Layout } from "../../components/layout/Layout";
import {SearchMsg} from "../../components/search/SearchMsg";

export default function message() {
  ////////////////////////// JSXエリア //////////////////////////
  return (
    <div className="min-h-screen">
      <Head>
        <title>Pham メッセージ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <SearchMsg />
      </Layout>
    </div>
  );
}