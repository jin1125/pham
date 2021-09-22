import Head from "next/head";
import Router from "next/router";
import React, { useEffect } from "react";
import { Layout } from "../../../components/layout/Layout";
import {SearchPh} from "../../../components/search/SearchPh";
import { auth } from "../../../firebase";

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
        <title>Pham 薬局検索</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <SearchPh />
      </Layout>
    </div>
  );
}
