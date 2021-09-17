import Head from "next/head";
import React, { useEffect } from "react";
import Layout from "../../../components/layout/Layout";
import { auth } from "../../../firebase";
import Router from "next/router";
import SearchJob from "../../../components/search/SearchJob";

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
        <title>Pham 求人検索</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <SearchJob/>
      </Layout>
    </div>
  )
}
