import Head from "next/head";
import React, { useEffect } from "react";
import Layout from "../../../components/layout/Layout";
import { auth } from "../../../firebase";
import Router from "next/router";
import SearchPh from "../../../components/search/SearchPh";


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
        <title>Pham 薬局検索結果</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <SearchPh/>
      </Layout>
    </div>
  )
}