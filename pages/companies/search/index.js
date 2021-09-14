import Head from "next/head";
import React, { useEffect } from "react";
import Layout from "../../../components/layout/Layout";
import { auth } from "../../../firebase";
import Router from "next/router";
import SearchCo from "../../../components/search/SearchCo";

export default function search() {
  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      if (!user) {
        Router.push("/login");
      }
    });
    return () => unSub();
  }, []);

  ////////////////////////// JSXエリア //////////////////////////
  return (
    <div className="min-h-screen">
      <Head>
        <title>Pham 企業検索結果</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <SearchCo/>
      </Layout>
    </div>
  )
}